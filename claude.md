# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Premium portfolio website for David Abraham (Full Stack Developer & UI/UX Designer). Built with Remix, TypeScript, and a focus on high-quality animations and premium aesthetics.

## Tech Stack

- **Framework**: Remix 2.16.7 with Vite, configured for Vercel deployment
- **React**: 18.3.1 with TypeScript 5.1.6
- **Styling**: Tailwind CSS 3.4.13 with custom premium palette
- **Animations**: Dual animation system (GSAP 3.14.2 + Framer Motion 12.26.2)
- **Smooth Scrolling**: Lenis 1.3.17
- **Icons**: Lucide React, React Icons, FontAwesome, Phosphor Icons
- **Email**: Resend 3.5.0 for contact form
- **PDF Generation**: @react-pdf/renderer for CV routes

## Commands

```bash
# Development server (hot reload enabled)
npm run dev

# Type checking
npm run typecheck

# Linting
npm run lint

# Production build (outputs to build/ directory)
npm run build

# Run production server
npm run start
```

## Architecture

### Dual Animation System

This project uses **both GSAP and Framer Motion** intentionally:

- **GSAP** (via custom hooks): For scroll-triggered animations, complex timelines, and performance-critical animations. Used primarily for scroll effects via ScrollTrigger plugin.
- **Framer Motion**: For component-level animations, hover effects, and React-aware transitions. Used for simpler, declarative animations.

**Custom Hooks & Utilities:**
- `app/hooks/useAdvancedGSAP.ts` - Text splitting, parallax, advanced easing functions
- `app/hooks/useGSAP.ts` - Simplified GSAP hook wrapper
- `app/hooks/useScrollAnimation.tsx` - Scroll-triggered animations
- `app/utils/animationPatterns.ts` - Reusable animation patterns (clip-path reveals, stagger effects)
- `app/config/gsapConfig.ts` - Global GSAP configuration, durations, easings, parallax presets

**Important**: GSAP is bundled into SSR output (see `vite.config.ts` `ssr.noExternal`) to resolve CJS/ESM interop issues.

### Smooth Scrolling with Lenis

`app/components/SmoothScroll.tsx` provides:
- `SmoothScrollProvider` - Wraps the app in `app/root.tsx` to enable smooth scrolling
- `useLenis()` hook - Access Lenis instance for programmatic scrolling
- `ScrollProgress` component - Global scroll progress indicator
- `SectionNav` component - Section navigation dots
- Lenis integrates with GSAP ScrollTrigger via RAF loop

### Path Aliases

TypeScript path alias configured as `"~/*": ["app/*"]` in `tsconfig.json`. Always use this alias for imports:
```typescript
import { someUtil } from "~/utils/someUtil";
```

### Design System

**Premium Color Palette** (see `tailwind.config.ts`):
- Violet: `#6D28D9` (primary), `#7C3AED` (accent), `#8B5CF6` (light)
- Dark: `#0B0B0F` (deep), `#1A1A23` (surface), `#242433` (card)
- Light: `#EDEDED` (primary), `#B8B8C0` (secondary), `#8B8B99` (muted)

**Custom Animations**:
- `animate-float` - 6s floating effect
- `animate-pulse-glow` - 2s glow pulse
- `animate-text-reveal` - 0.8s text reveal

**Custom Shadows**:
- `shadow-premium` - Deep shadow for cards
- `shadow-glow-violet` / `shadow-glow-violet-lg` - Violet glow effects

### Data Management

All content (experience, skills, projects, contact info) is centralized in:
- `app/data/content.ts` - TypeScript exports with full type definitions

This makes it easy to update content without touching component code.

### Route Structure

- `app/routes/_index.tsx` - Main portfolio page (assembles all components)
- `app/routes/api.contact.tsx` - Contact form API endpoint (Resend integration)
- `app/routes/cv[.]pdf.tsx` - Generates PDF CV using @react-pdf/renderer
- `app/routes/yscv[.]pdf.tsx` - Alternative CV format

**Note**: Square bracket syntax `[.]` escapes the dot in Remix routes.

### Component Architecture

All major sections are in `app/components/`:
- `Hero.tsx`, `About.tsx`, `Services.tsx`, `Skills.tsx`, `Projects.tsx`, `Experience.tsx`, `Contact.tsx`
- `Navbar.tsx` and `Footer.tsx` for layout
- Animation components: `AnimatedBackground.tsx`, `AnimatedSection.tsx`, `GradualBlur.tsx`, `FallingText.tsx`, `LogoLoop.tsx`
- Utility components: `Magnet.tsx`, `CardSwap.tsx`, `CircularText.tsx`, `MiniCTA.tsx`

Components use a mix of Framer Motion for mount/hover animations and GSAP custom hooks for scroll animations.

### Section Order (Story-First Approach)

The portfolio follows a **story-first flow** that creates immediate human connection:

1. **Hero** - Hook with strong first impression and immediate identity
2. **About** - Personal connection (who I am) - Positioned early to humanize and create empathy
3. **Projects** - Social proof and portfolio (concrete evidence of results)
4. **Services** - Value proposition (what I can do FOR YOU)
5. **Skills** - Technical expertise (how I deliver value)
6. **Experience** - Professional authority (career credibility)
7. **Contact** - Final call-to-action (conversion point)

**Strategic CTAs**:
- `<ProjectsCTA />` after Projects section - highest conversion point (after showing work)
- `<SkillsCTA />` after Skills section - secondary conversion point
- ScrollVelocity separators with contextual messaging between sections

**Rationale**: This "Story → Proof → Value → Expertise → Action" approach creates an emotional connection immediately after the hero section. By introducing the personal story early, visitors understand WHO is behind the work before seeing WHAT has been done. This builds trust and empathy from the start, making the subsequent portfolio pieces more impactful.

### Vite Build Configuration

`vite.config.ts` includes:
- **Vercel preset** for deployment
- **Future flags enabled** (v3_singleFetch, v3_lazyRouteDiscovery, etc.)
- **Manual chunk splitting** for optimal bundle sizes:
  - `vendor-react` - React runtime
  - `vendor-remix` - Remix runtime
  - `vendor-gsap` - GSAP
  - `vendor-motion` - Framer Motion
  - `vendor-pdf` - PDF generation
  - `vendor-icons` - All icon libraries
  - `vendor-physics` - Matter.js
  - `vendor-scroll` - Lenis

**Chunk size warning limit**: 1000kb (large due to icon libraries)

### Image Assets

Portfolio photos stored in `public/` (referenced in French):
- `face-identiter.jpg` - Identity photo (About, Contact)
- `face-identiter-large.jpg` - Large identity photo (Hero)
- `face-plonger.jpg` - Diving angle photo (Services)
- `prodile-contreplonger.jpg` - Counter-diving angle (Experience)

### Contact Form

Contact form (`Contact.tsx`) uses:
- Remix `useFetcher()` for form submission without navigation
- POST to `/api/contact` route
- Resend API for email delivery
- Styled HTML email template in `app/emails/contactTemplate.ts`
- Form state: idle, loading, success, error
- Environment variable: `RESEND_API_KEY` required (stored in `app/data/content.ts` as `contactConfig.resendApiKey`)

### Font Loading

Inter font loaded via Google Fonts in `app/root.tsx` links function. Font fallback chain includes Satoshi and Poppins (see `tailwind.config.ts`).

### Error Handling

`ErrorBoundary` in `app/root.tsx` provides styled error page with CTA to return home.

### TypeScript Configuration

- **Strict mode enabled**
- **Module resolution**: Bundler (Vite)
- **Target**: ES2022
- **JSX**: react-jsx (automatic runtime)
- **noEmit**: true (Vite handles building)

### Node Version

**Node 22.x required** (see `package.json` engines field).

## Development Notes

### When Adding New Animations

1. **Scroll-based animations**: Use GSAP via `useScrollAnimation` or `useAdvancedGSAP` hooks
2. **Component animations**: Use Framer Motion with `motion.*` components
3. **Reusable patterns**: Add to `app/utils/animationPatterns.ts`
4. **Configuration**: Use constants from `app/config/gsapConfig.ts`

### When Modifying Content

Edit `app/data/content.ts` rather than hardcoding in components. This file exports:
- `experience` - Work experience timeline
- `formations` - Education
- `projects` - Portfolio projects
- `skillsByDomain` - Skills organized by category
- `contactInfo` - Contact details
- `contactConfig` - Email configuration

### When Working with Styles

1. Prefer Tailwind utility classes
2. Use custom color palette (`violet-primary`, `dark-deep`, etc.)
3. Custom CSS animations are in `app/styles/animations.css`
4. Use `shadow-glow-violet` for premium hover effects

### SSR Considerations

- GSAP plugin registration wrapped in `typeof window !== "undefined"` checks
- Lenis only initializes client-side
- Animation hooks handle SSR gracefully
