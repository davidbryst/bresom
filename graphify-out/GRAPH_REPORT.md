# Graph Report - .  (2026-06-17)

## Corpus Check
- Large corpus: 108 files · ~2,959,266 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 765 nodes · 921 edges · 73 communities (49 shown, 24 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 91 edges (avg confidence: 0.8)
- Token cost: 558,508 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Hero & Animated Background|Hero & Animated Background]]
- [[_COMMUNITY_NPM Dependencies|NPM Dependencies]]
- [[_COMMUNITY_Portfolio Sections & Components|Portfolio Sections & Components]]
- [[_COMMUNITY_CV PDF Generation|CV PDF Generation]]
- [[_COMMUNITY_Project Brief Requirements|Project Brief Requirements]]
- [[_COMMUNITY_Accessibility & Animation Docs|Accessibility & Animation Docs]]
- [[_COMMUNITY_Framer Motion Config|Framer Motion Config]]
- [[_COMMUNITY_Scroll Animation Components|Scroll Animation Components]]
- [[_COMMUNITY_Animation Techniques|Animation Techniques]]
- [[_COMMUNITY_Security & SEO|Security & SEO]]
- [[_COMMUNITY_App Bootstrap & Entry|App Bootstrap & Entry]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Dev Dependencies & Linting|Dev Dependencies & Linting]]
- [[_COMMUNITY_shadcnui Config|shadcn/ui Config]]
- [[_COMMUNITY_Root Layout & Smooth Scroll|Root Layout & Smooth Scroll]]
- [[_COMMUNITY_Advanced GSAP Hooks|Advanced GSAP Hooks]]
- [[_COMMUNITY_Content Data Types|Content Data Types]]
- [[_COMMUNITY_Experience & GSAP Hooks|Experience & GSAP Hooks]]
- [[_COMMUNITY_GradualBlur Component|GradualBlur Component]]
- [[_COMMUNITY_CV Data & PDF Routes|CV Data & PDF Routes]]
- [[_COMMUNITY_Contact API & Rate Limiting|Contact API & Rate Limiting]]
- [[_COMMUNITY_ScrollAdvanced Effects|ScrollAdvanced Effects]]
- [[_COMMUNITY_Projects & CTA  Spacing|Projects & CTA / Spacing]]
- [[_COMMUNITY_Services & ScrollVelocity|Services & ScrollVelocity]]
- [[_COMMUNITY_About  Navbar  Index|About / Navbar / Index]]
- [[_COMMUNITY_LogoLoop Component|LogoLoop Component]]
- [[_COMMUNITY_Contact & CircularText|Contact & CircularText]]
- [[_COMMUNITY_Skills & FallingText|Skills & FallingText]]
- [[_COMMUNITY_CardSwap Carousel|CardSwap Carousel]]
- [[_COMMUNITY_Contact Email Flow|Contact Email Flow]]
- [[_COMMUNITY_useScrollAnimation Hooks|useScrollAnimation Hooks]]
- [[_COMMUNITY_Animation Utils Overview|Animation Utils Overview]]
- [[_COMMUNITY_Identity Portrait Photos|Identity Portrait Photos]]
- [[_COMMUNITY_Theme Toggle|Theme Toggle]]
- [[_COMMUNITY_Server Entry & Security|Server Entry & Security]]
- [[_COMMUNITY_ScrollEffects Module|ScrollEffects Module]]
- [[_COMMUNITY_Footer Component|Footer Component]]
- [[_COMMUNITY_Contact Email Template|Contact Email Template]]
- [[_COMMUNITY_Animation Verify Script|Animation Verify Script]]
- [[_COMMUNITY_FreshAfrique  KoraConsult Mockups|FreshAfrique / KoraConsult Mockups]]
- [[_COMMUNITY_DavStore  QueenByDKloth Mockups|DavStore / QueenByDKloth Mockups]]
- [[_COMMUNITY_WebGL & Physics Backgrounds|WebGL & Physics Backgrounds]]
- [[_COMMUNITY_BeatsDelephants Project Images|BeatsDelephants Project Images]]
- [[_COMMUNITY_Claude Code Permissions|Claude Code Permissions]]
- [[_COMMUNITY_GradualBlur Internals|GradualBlur Internals]]
- [[_COMMUNITY_CV Profile Photos|CV Profile Photos]]
- [[_COMMUNITY_Profile Cutout Photos|Profile Cutout Photos]]
- [[_COMMUNITY_GSAP Hook Modules|GSAP Hook Modules]]
- [[_COMMUNITY_Vite Build Config|Vite Build Config]]
- [[_COMMUNITY_Tailwind Config|Tailwind Config]]
- [[_COMMUNITY_CV Decorative Accents|CV Decorative Accents]]
- [[_COMMUNITY_Projects Data & Sitemap|Projects Data & Sitemap]]
- [[_COMMUNITY_DavHotel Project Images|DavHotel Project Images]]
- [[_COMMUNITY_Story-First Page Assembly|Story-First Page Assembly]]
- [[_COMMUNITY_Remix Logo Assets|Remix Logo Assets]]
- [[_COMMUNITY_LogoLoop Internals|LogoLoop Internals]]
- [[_COMMUNITY_Navbar Navigation|Navbar Navigation]]
- [[_COMMUNITY_Low-Angle Profile Photos|Low-Angle Profile Photos]]
- [[_COMMUNITY_Silk Shader Types|Silk Shader Types]]
- [[_COMMUNITY_Shader JSX Declarations|Shader JSX Declarations]]
- [[_COMMUNITY_Magnetic Hover Hooks|Magnetic Hover Hooks]]
- [[_COMMUNITY_Split Text Hooks|Split Text Hooks]]
- [[_COMMUNITY_Theme Toggle Pair|Theme Toggle Pair]]
- [[_COMMUNITY_Local Permissions|Local Permissions]]
- [[_COMMUNITY_Root ErrorBoundary|Root ErrorBoundary]]
- [[_COMMUNITY_Contact Email Text|Contact Email Text]]

## God Nodes (most connected - your core abstractions)
1. `INDEX.md (GSAP Documentation Index)` - 22 edges
2. `compilerOptions` - 18 edges
3. `AMELIORATIONS - Portfolio Improvements Report` - 13 edges
4. `QUICK_START.md (GSAP Quick Start)` - 13 edges
5. `ANIMATIONS_SUMMARY - GSAP Improvements Summary` - 12 edges
6. `FILES_CREATED - File Inventory` - 11 edges
7. `README_ANIMATIONS.md (GSAP Final Summary)` - 10 edges
8. `Front-End Senior Brief (Project Prompt)` - 10 edges
9. `GSAP (GreenSock Animation Platform)` - 9 edges
10. `easings` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Brief: Framer Motion Mandatory` --semantically_similar_to--> `GSAP (GreenSock Animation Platform)`  [INFERRED] [semantically similar]
  app/data/Tu es un développeur front-end senior.md → ANIMATIONS_GUIDE.md
- `gsapConfig.ts (GSAP Config)` --conceptually_related_to--> `GSAP (GreenSock Animation Platform)`  [INFERRED]
  app/config/gsapConfig.ts → ANIMATIONS_GUIDE.md
- `prefers-reduced-motion Support` --references--> `usePrefersReducedMotion Hook`  [EXTRACTED]
  AMELIORATIONS.md → app/hooks/usePrefersReducedMotion.ts
- `Animation Accessibility (reduced-motion)` --semantically_similar_to--> `prefers-reduced-motion Support`  [INFERRED] [semantically similar]
  ANIMATIONS_SUMMARY.md → AMELIORATIONS.md
- `api.contact Route` --implements--> `sanitize-html Library`  [INFERRED]
  app/routes/api.contact.tsx → AMELIORATIONS.md

## Hyperedges (group relationships)
- **Scroll-Triggered Animation Stack** — about_component, contact_component, experience_component, footer_component [INFERRED 0.85]
- **Story-First Section Navigation Flow** — root_mainsections, about_component, experience_component, contact_component [INFERRED 0.75]
- **Vendor Chunk Splitting Strategy** — viteconfig_manualchunks, package_bresom, viteconfig_gsap_noexternal [INFERRED 0.80]
- **Prefers-Reduced-Motion Accessibility Pattern** — gsapconfig_prefersreducedmotion, motionconfig_getprefersreducedmotion, loadingspinner_component, logoloop_useanimationloop [INFERRED 0.85]
- **Dual GSAP + Motion Config System** — gsapconfig_gsap_config, motionconfig_module, downloadbutton_component [INFERRED 0.80]
- **Story-First Section Flow with Embedded CTAs** — navbar_navlinks, projects_component, skills_component, minicta_component [INFERRED 0.75]
- **GSAP scroll/animation hooks and utilities (overlapping toolkits)** — useadvancedgsap_module, usegsap_module, usescrollanimation_module, usescrollanimations_module, scrollanimations_util, animationpatterns_module [INFERRED 0.85]
- **react-pdf CV generation routes sharing data + font registration** — cvpdf_loader, yscv_loader, cvcontent_module [INFERRED 0.85]
- **Contact form submission pipeline (rate limit, sanitize, send)** — apicontact_action, ratelimiter_isRateLimited, content_contactConfig [EXTRACTED 0.95]
- **GSAP Scroll Animation Subsystem** — comp_animated_section, comp_scroll_effects, comp_scroll_advanced, hook_use_scroll_animations, util_animation_patterns, config_gsap, style_animations_css [EXTRACTED 0.85]
- **Security Hardening Initiative** — ameliorations_resend_key_security, ameliorations_input_sanitization, ameliorations_security_headers, ameliorations_rate_limiting [EXTRACTED 0.90]
- **Accessibility Compliance (WCAG 2.1)** — ameliorations_prefers_reduced_motion, ameliorations_skip_links, ameliorations_focus_visible, ameliorations_aria_semantics, ameliorations_wcag [EXTRACTED 0.90]
- **GSAP Scroll Animation System** — concept_gsap, comp_animatedsection, comp_scrolleffects, comp_scrolladvanced, hook_usescrollanimations, config_gsapconfig, style_animationscss [EXTRACTED 1.00]
- **Four-Photo Placement Strategy** — brief_photo_identity, brief_photo_main, brief_photo_overhead, brief_photo_lowangle, brief_face_prohibitions [EXTRACTED 1.00]
- **Spacing Optimization Across Sections** — config_spacingconfig, comp_minicta, comp_about, comp_projects, comp_services, comp_skills [INFERRED 0.85]
- **CV Profile Photo Asset Set** — profile_cv_headshot_suit, profile1_cv_portrait_blue_suit, profileysr_cv_portrait_woman [INFERRED 0.65]
- **Face-On Identity Portrait Set (Hero/About/Contact)** — 1face-identiter-large_portrait_faceon_gray, 1face-identiter-large1_portrait_faceon_gray, 1face-identiter_headshot_faceon_gray, face-identiter-large_portrait_faceon_white, face-identiter_headshot_faceon_white [INFERRED 0.85]
- **Dramatic-Angle Authority Portrait Set (Services/Experience)** — 1prodile-contreplonger_lowangle_profile_gray, prodile-contreplonger_lowangle_profile_white, face-plonger_highangle_lookup_white [INFERRED 0.75]
- **BeatsDelephants Project Asset Group** — beatsdelephants_screenshot, beatsdelephants_copy_screenshot, beatsdelephants_mockup1 [INFERRED 0.85]
- **Processed Profile Cutout Group** — s_face_identiter_large_profilecutout, s_face_identiter_profilecutout, s_prodile_contreplonger_profilecutout [INFERRED 0.75]
- **DavStore E-commerce Project Assets** — davstore_cover, davstoremockup_mobile [INFERRED 0.85]
- **Portfolio Client Project Web Mockups** — freshafriquemockup_laptop_front, koraconsultmockup_laptop_front, queenbydklothmockup_laptop_front [INFERRED 0.75]

## Communities (73 total, 24 thin omitted)

### Community 0 - "Hero & Animated Background"
Cohesion: 0.05
Nodes (16): SilkPlane, AnimatedBackgroundProps, GlowingParticles(), GlowOrbProps, MagnetProps, CodeTypingProps, GSAPTypingProps, TypingEffectProps (+8 more)

### Community 1 - "NPM Dependencies"
Cohesion: 0.05
Nodes (41): dependencies, encoding, @fortawesome/fontawesome-svg-core, @fortawesome/free-brands-svg-icons, @fortawesome/free-regular-svg-icons, @fortawesome/free-solid-svg-icons, @fortawesome/react-fontawesome, framer-motion (+33 more)

### Community 2 - "Portfolio Sections & Components"
Cohesion: 0.07
Nodes (41): About Section Component, /api/contact Route (Resend), CardSwap 3D Card Carousel, CircularText (rotating text), shadcn/ui components.json, Contact Section Component, Centralized Content Data Store, DownloadButton Component (+33 more)

### Community 3 - "CV PDF Generation"
Cohesion: 0.06
Nodes (10): aboutData, contactData, experiencesData, formationsData, heroData, projectsData, skillsData, styles (+2 more)

### Community 4 - "Project Brief Requirements"
Cohesion: 0.08
Nodes (22): Brief: Accessibility (ARIA, contrast, keyboard), Front-End Senior Brief (Project Prompt), Brief: Face Modification Prohibitions, Brief: No Lorem Ipsum / SEO-Ready, Brief: Premium Violet/Dark Palette, Brief: Identity Photo (About/Contact), Brief: Low-Angle/Contre-Plongée Photo (Experience), Brief: Main Photo (Hero, floating card) (+14 more)

### Community 5 - "Accessibility & Animation Docs"
Cohesion: 0.12
Nodes (31): Improved Focus Visible Styles, prefers-reduced-motion Support, WCAG 2.1 Compliance, ANIMATIONS_GUIDE - GSAP Usage Guide, ANIMATIONS_SUMMARY - GSAP Improvements Summary, CHANGELOG - GSAP Animations v1.0.0, claude.md - Repository Guidance, usePrefersReducedMotion Hook (+23 more)

### Community 6 - "Framer Motion Config"
Cohesion: 0.09
Nodes (24): BUTTON_ANIMATION, CARD_ANIMATION, createAccessibleTransition(), DROPDOWN_ANIMATION, DURATIONS, getPrefersReducedMotion(), LINK_ANIMATION, MODAL_ANIMATION (+16 more)

### Community 7 - "Scroll Animation Components"
Cohesion: 0.09
Nodes (14): AnimatedSection(), AnimatedSectionProps, StaggerContainer(), StaggerContainerProps, NumberCounter(), NumberCounterProps, Parallax(), ParallaxProps (+6 more)

### Community 8 - "Animation Techniques"
Cohesion: 0.12
Nodes (21): Brief: Framer Motion Mandatory, GPU Acceleration (transform/opacity), Parallax Effect, prefers-reduced-motion Accessibility, SplitText (word/letter reveal), Stagger / Cascade Animation, gsapConfig.ts (GSAP Config), AnimationIntegrationExamples.tsx (13 examples) (+13 more)

### Community 9 - "Security & SEO"
Cohesion: 0.12
Nodes (21): ARIA and Semantic Structure, AMELIORATIONS - Portfolio Improvements Report, Contact Form Input Sanitization, Open Graph Meta Tags, IP-based Rate Limiting, Resend API Key Securization, robots.txt SEO File, HTTP Security Headers (+13 more)

### Community 10 - "App Bootstrap & Entry"
Cohesion: 0.10
Nodes (23): AnimatedSection / StaggerContainer, AnimationsDemo (showcase), Client Entry (hydrateRoot), Server Entry (streaming SSR), setSecurityHeaders (CSP/HTTP security), initializeGSAP(), bresom package manifest, Root Layout & GSAPProvider (+15 more)

### Community 11 - "TypeScript Config"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 12 - "Dev Dependencies & Linting"
Cohesion: 0.10
Nodes (20): devDependencies, autoprefixer, eslint, eslint-import-resolver-typescript, eslint-plugin-import, eslint-plugin-jsx-a11y, eslint-plugin-react, eslint-plugin-react-hooks (+12 more)

### Community 13 - "shadcn/ui Config"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 14 - "Root Layout & Smooth Scroll"
Cohesion: 0.12
Nodes (11): mainSections, LenisContext, LenisContextType, ScrollProgress(), SectionNav(), SectionNavProps, SmoothScrollProvider(), SmoothScrollProviderProps (+3 more)

### Community 16 - "Content Data Types"
Cohesion: 0.22
Nodes (11): AboutInfo, ContactInfo, DomainGroup, dosInfoItem, ExperienceItem, FormationItem, HeroInfo, Project (+3 more)

### Community 19 - "GradualBlur Component"
Cohesion: 0.18
Nodes (8): CURVE_FUNCTIONS, DEFAULT_CONFIG, GradualBlur(), GradualBlurMemo, GradualBlurProps, PRESETS, useIntersectionObserver(), useResponsiveDimension()

### Community 20 - "CV Data & PDF Routes"
Cohesion: 0.17
Nodes (13): aboutData, contactData, Content type interfaces (HeroInfo, Project, etc.), content.ts (centralized site data), formationsData (education), cvContent.ts (CV data variant), cv.pdf CVDocument, cv.pdf font registration (Poppins data URIs) (+5 more)

### Community 21 - "Contact API & Rate Limiting"
Cohesion: 0.22
Nodes (10): contactConfig, action(), isValidEmail(), resend, sanitizeOptions, getClientIP(), isRateLimited(), RateLimitEntry (+2 more)

### Community 22 - "ScrollAdvanced Effects"
Cohesion: 0.18
Nodes (5): FloatingElementsProps, MouseFollowerProps, ScrollingTextProps, ScrollProgressBarProps, TextGlitchProps

### Community 24 - "Projects & CTA / Spacing"
Cohesion: 0.22
Nodes (6): MiniCTAProps, ProjectsCTA(), SkillsCTA(), SPACING, TRANSLATE, Z_INDEX

### Community 25 - "Services & ScrollVelocity"
Cohesion: 0.20
Nodes (7): ScrollVelocity(), ScrollVelocityProps, VelocityMapping, VelocityTextProps, ServiceDetail, serviceDetails, dosData

### Community 26 - "About / Navbar / Index"
Cohesion: 0.20
Nodes (3): stats, navLinks, aboutData

### Community 28 - "LogoLoop Component"
Cohesion: 0.20
Nodes (4): ANIMATION_CONFIG, LogoItem, LogoLoop, LogoLoopProps

### Community 29 - "Contact & CircularText"
Cohesion: 0.22
Nodes (6): CircularTextProps, getRotationTransition(), getTransition(), contactInfo, ContactResponse, contactData

### Community 30 - "Skills & FallingText"
Cohesion: 0.22
Nodes (5): FallingTextProps, FlatBucket, SkillBucket, SkillItem, skillsData

### Community 31 - "CardSwap Carousel"
Cohesion: 0.22
Nodes (5): Card, CardProps, CardRef, CardSwapProps, Slot

### Community 32 - "Contact Email Flow"
Cohesion: 0.33
Nodes (6): api.contact action (Resend send), api.contact inline email HTML template, buildContactEmailHtml, contactConfig (email config), cvContent contactConfig (hardcoded resendApiKey), isRateLimited (in-memory IP rate limit)

### Community 34 - "Animation Utils Overview"
Cohesion: 0.40
Nodes (6): animationPatterns (reusable reveal patterns), AnimationIntegrationExamples (doc/commented), scrollAnimations.ts (section/card/parallax utils), useScrollAnimation.tsx (gsap.context hooks), useScrollAnimations.ts (scroll/morph/hover hooks), useHoverAnimation

### Community 35 - "Identity Portrait Photos"
Cohesion: 0.53
Nodes (6): Identity Portrait (Large, Face-On, Gray BG) v2, Identity Portrait (Large, Face-On, Gray BG) v1, Identity Headshot (Tight, Face-On, Gray BG), Identity Portrait (Large, Face-On, White BG), Identity Headshot (Tight, Face-On, White BG), High-Angle Portrait (Plongé, Looking Up, White BG)

### Community 36 - "Theme Toggle"
Cohesion: 0.60
Nodes (3): ThemeToggle(), Theme, useTheme()

### Community 37 - "Server Entry & Security"
Cohesion: 0.60
Nodes (3): handleBotRequest(), handleBrowserRequest(), handleRequest()

### Community 38 - "ScrollEffects Module"
Cohesion: 0.50
Nodes (5): ScrollEffects Module, NumberCounter, ScrollEffects Parallax, ScrollReveal, ScrollTriggerAnimations Examples

### Community 42 - "Animation Verify Script"
Cohesion: 0.83
Nodes (3): check_dir(), check_file(), verify-animations.sh script

### Community 43 - "FreshAfrique / KoraConsult Mockups"
Cohesion: 0.50
Nodes (4): FreshAfrique - Food Website Dual Laptop Mockup, FreshAfrique - Food Website Laptop Mockup (Front), KoraConsult - Consulting Website Dual Laptop Mockup, KoraConsult - Consulting Website Laptop Mockup (Front)

### Community 44 - "DavStore / QueenByDKloth Mockups"
Cohesion: 0.50
Nodes (4): DavStore - E-commerce Project Cover, DavStore - Mobile App iPhone Mockup, QueenByDKloth - Fashion Website Dual Laptop Mockup, QueenByDKloth - Fashion Website Laptop Mockup (Front)

### Community 45 - "WebGL & Physics Backgrounds"
Cohesion: 0.67
Nodes (3): AnimatedBackground Component, Silk WebGL Background (three.js), FallingText (Matter.js physics)

### Community 46 - "BeatsDelephants Project Images"
Cohesion: 1.00
Nodes (3): BeatsDelephants - Catalogue Screenshot (Copy), BeatsDelephants - Laptop Mockup, BeatsDelephants - Catalogue Screenshot

### Community 48 - "GradualBlur Internals"
Cohesion: 0.67
Nodes (3): GradualBlur Component, GradualBlur CURVE_FUNCTIONS, GradualBlur PRESETS

### Community 49 - "CV Profile Photos"
Cohesion: 0.67
Nodes (3): CV Profile Portrait (Man, Blue Suit, Seated), CV Profile Headshot (Man, Black Suit), CV Profile Portrait (Young Woman, Yellow Background)

### Community 50 - "Profile Cutout Photos"
Cohesion: 1.00
Nodes (3): Profile Cutout - Front Large (Suit), Profile Cutout - Front (Suit), Profile Cutout - Low Angle Profile (Suit)

### Community 51 - "GSAP Hook Modules"
Cohesion: 0.67
Nodes (3): useAdvancedGSAP (advanced GSAP hooks), useGSAP (simplified GSAP hooks), usePrefersReducedMotion

## Ambiguous Edges - Review These
- `cvContent.ts (CV data variant)` → `yscv.pdf CVDocument`  [AMBIGUOUS]
  app/routes/yscv[.]pdf.tsx · relation: references

## Knowledge Gaps
- **253 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+248 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `cvContent.ts (CV data variant)` and `yscv.pdf CVDocument`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `GSAP (GreenSock Animation Platform)` connect `Accessibility & Animation Docs` to `Animation Techniques`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Why does `Front-End Senior Brief (Project Prompt)` connect `Project Brief Requirements` to `Animation Techniques`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `Brief: Framer Motion Mandatory` connect `Animation Techniques` to `Project Brief Requirements`, `Accessibility & Animation Docs`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _267 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Hero & Animated Background` be split into smaller, more focused modules?**
  _Cohesion score 0.0545876887340302 - nodes in this community are weakly interconnected._
- **Should `NPM Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.047619047619047616 - nodes in this community are weakly interconnected._