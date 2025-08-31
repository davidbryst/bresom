import { useEffect, useState } from "react";

export default function ShaderPrismBackground() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    if (typeof window === "undefined") return;
    if (customElements.get("shader-art")) return;
    const register = async () => {
      try {
        const { ShaderArt } = await import("https://esm.sh/shader-art");
        const { UniformPlugin } = await import("https://esm.sh/@shader-art/plugin-uniform");
        (ShaderArt as any).register([() => new (UniformPlugin as any)()]);
      } catch (_) {
        // Ignorer l'erreur réseau: le composant restera silencieux
      }
    };
    register();
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 -z-20 pointer-events-none overflow-hidden"
      aria-hidden
    >
      {/* Le web component shader-art occupe tout l'écran */}
      {/* Les scripts internes sont fournis comme contenu texte brut */}
      <shader-art autoplay controls="false">
        <script type="buffer" name="position" data-size="2">{String.raw`[-1, 1, -1,-1, 1,1, 1, 1, -1,-1, 1,-1]`}</script>
        <script type="buffer" name="uv" data-size="2">{String.raw`[ 0, 0,  0, 1, 1,0, 1, 0,  0, 1, 1, 1]`}</script>

        <script type="vert">{String.raw`precision highp float;
attribute vec4 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = position;
}`}</script>

        <script type="frag">{String.raw`precision highp float;
varying vec2 vUv;
uniform float time;
uniform vec2 resolution;

// Valeurs par défaut intégrées (plus d'uniforms personnalisés)
const float SCALE = 0.2;
const float AX = 5.0;
const float AY = 7.0;
const float AZ = 9.0;
const float AW = 13.0;
const float BX = 1.0;
const float BY = 1.0;

// Palette alignée au background particles: magenta, vert, cyan, jaune, bleu, violet + backgrounds
// const vec3 COLOR1 = vec3(1.0, 0.31, 0.86); // magenta (255, 80, 220)
// const vec3 COLOR2 = vec3(0.47, 1.0, 0.47); // vert (120, 255, 120)
// const vec3 COLOR3 = vec3(0.0, 0.78, 1.0); // cyan (0, 200, 255)
// const vec3 COLOR4 = vec3(1.0, 0.94, 0.47); // jaune (255, 240, 120)
// const vec3 COLOR5 = vec3(0.31, 0.47, 1.0); // bleu (80, 120, 255)
// const vec3 COLOR6 = vec3(0.63, 0.47, 1.0); // violet (160, 120, 255)
// const vec3 BG_COLOR1 = vec3(0.078, 0.0, 0.235); // bg1 (20, 0, 60)
// const vec3 BG_COLOR2 = vec3(0.0, 0.0, 0.0); // bg2 (0, 0, 0)

// Palette de tons violets, roses et bleus
// const vec3 COLOR1 = vec3(0.1, 0.0, 0.3);   // bleu très sombre
// const vec3 COLOR2 = vec3(0.2, 0.1, 0.6);   // violet bleuté
// const vec3 COLOR3 = vec3(0.3, 0.1, 0.8);   // violet vif
// const vec3 COLOR4 = vec3(0.8, 0.3, 1.0);   // rose clair
const vec3 COLOR1 = vec3(1.0, 0.94, 0.47);   // jaune
const vec3 COLOR2 = vec3(0.35, 0.18, 0.65);   // violet moyen
const vec3 COLOR3 = vec3(0.55, 0.22, 0.75);   // rose vif
const vec3 COLOR4 = vec3(0.85, 0.45, 0.95);   // rose pâle lumineux
const vec3 COLOR5 = vec3(0.2, 0.8, 0.9);      // bleu turquoise

float cheapNoise(vec3 stp) {
  vec3 p = vec3(stp.st, stp.p);
  vec4 a = vec4(AX, AY, AZ, AW);
  return mix(
    sin(p.z + p.x * a.x + cos(p.x * a.x - p.z)) *
    cos(p.z + p.y * a.y + cos(p.y * a.x + p.z)),
    sin(1. + p.x * a.z + p.z + cos(p.y * a.w - p.z)) *
    cos(1. + p.y * a.w + p.z + cos(p.x * a.x + p.z)),
    .436
  );
}

void main() {
  vec2 aR = vec2(resolution.x/resolution.y, 1.);
  vec2 st = vUv * aR * SCALE;
  float S = sin(time * .005);
  float C = cos(time * .005);
  vec2 v1 = vec2(cheapNoise(vec3(st, 2.)), cheapNoise(vec3(st, 1.)));
  vec2 v2 = vec2(
    cheapNoise(vec3(st + BX*v1 + vec2(C * 1.7, S * 9.2), 0.15 * time)),
    cheapNoise(vec3(st + BY*v1 + vec2(S * 8.3, C * 2.8), 0.126 * time))
  );
  float n = .5 + .5 * cheapNoise(vec3(st + v2, 0.));

  vec3 color = mix(COLOR1, COLOR2, clamp((n*n)*8.,0.0,1.0));
  color = mix(color, COLOR3, clamp(length(v1),0.0,1.0));
  color = mix(color, COLOR4, clamp(length(v2.x),0.0,1.0));
  color = mix(color, COLOR5, clamp(length(v2.y),0.0,1.0));
  // color = mix(color, COLOR5, clamp(sin(time * 0.001) * 0.5 + 0.5, 0.0, 1.0));
  // booster la saturation et le contraste
  color = pow(color, vec3(0.85));
  color *= 1.2;
  gl_FragColor = vec4(color,1.);
}`}</script>
      </shader-art>

      {/* Style de secours si Tailwind n'est pas appliqué à l'élément canvas interne */}
      <style>{String.raw`shader-art{display:block;width:100%;height:100%}shader-art canvas{display:block;width:100%;height:100%}`}</style>
    </div>
  );
}


