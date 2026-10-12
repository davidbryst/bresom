/**
 * ✅ Rate Limiter simple pour prévenir le spam et les abus
 *
 * Note: Cette implémentation utilise une Map en mémoire, ce qui fonctionne pour un seul serveur.
 * Pour une production multi-serveurs, utilisez Redis ou un service de rate limiting externe.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// Stockage en mémoire des tentatives par IP
const rateLimitStore = new Map<string, RateLimitEntry>();

// Configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute en millisecondes
const MAX_REQUESTS = 3; // Maximum 3 requêtes par minute

/**
 * Nettoie les entrées expirées. Appelé à chaque requête plutôt qu'avec un
 * setInterval : en serverless (Vercel) l'instance est gelée entre deux
 * requêtes, un timer n'y tourne pas de façon fiable.
 */
function cleanupExpiredEntries(now: number) {
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) rateLimitStore.delete(ip);
  }
}

/**
 * Extrait l'IP du client à partir de la requête
 */
function getClientIP(request: Request): string {
  // Vérifier les headers de proxy (Vercel, Cloudflare, etc.)
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }

  // Fallback (ne devrait pas arriver en production)
  return "unknown";
}

/**
 * Vérifie si la requête dépasse la limite de taux
 * @returns true si la limite est dépassée, false sinon
 */
export function isRateLimited(request: Request): {
  limited: boolean;
  remaining: number;
  resetIn: number;
} {
  const ip = getClientIP(request);
  const now = Date.now();
  cleanupExpiredEntries(now);

  let entry = rateLimitStore.get(ip);

  // Si pas d'entrée ou entrée expirée, créer une nouvelle
  if (!entry || now > entry.resetTime) {
    entry = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    };
    rateLimitStore.set(ip, entry);

    return {
      limited: false,
      remaining: MAX_REQUESTS - 1,
      resetIn: RATE_LIMIT_WINDOW,
    };
  }

  // Incrémenter le compteur
  entry.count++;

  // Vérifier si la limite est dépassée
  if (entry.count > MAX_REQUESTS) {
    return {
      limited: true,
      remaining: 0,
      resetIn: entry.resetTime - now,
    };
  }

  return {
    limited: false,
    remaining: MAX_REQUESTS - entry.count,
    resetIn: entry.resetTime - now,
  };
}

