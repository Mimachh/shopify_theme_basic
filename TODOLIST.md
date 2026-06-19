# Luxury One Product — Suivi du projet

> Specs complètes : voir `TODO.md`. Ce fichier suit l'avancement, case par
> case, phase par phase.

## Conventions
- JS : **Alpine.js** en priorité pour l'interactivité (accordéons, tabs,
  sliders, variant picker, modales...), **vanilla JS** en repli, **jamais
  jQuery**. **GSAP** réservé aux animations/scroll.
- **Axios** si besoin d'appeler une API externe (vendored à la demande,
  comme Alpine/GSAP — pas de CDN).
- **tailwind-merge** (+ `clsx`/`cn()`) si besoin de composer des classes
  Tailwind dynamiquement côté JS (Alpine/vanilla), vendored à la demande.
  Côté Liquid, la composition de classes se fait directement avec des
  `{% if %}` dans le markup — pas besoin de lib.
- **i18n** : toute chaîne d'interface statique (labels, boutons, aria-labels,
  états comme "rupture de stock"...) passe par `{{ 'namespace.key' | t }}`
  avec entrée correspondante dans `locales/en.default.json` **et**
  `locales/fr.json` — jamais de texte en dur. Le contenu saisi par le
  marchand (heading, rich text...) est traduit nativement par Shopify
  ("Translate & adapt"), rien à faire côté thème.

## Phase 1 — Foundation
- [x] Arborescence du thème (assets/config/layout/locales/sections/snippets/templates)
- [x] Design system : `config/settings_schema.json` (typographie, couleurs, spacing, toggles animations)
- [x] `snippets/css-variables.liquid` (tokens) + Tailwind v3 (`tailwind.config.js`, `src/tailwind.css` → `assets/application.css`) + composants `.btn`/`.btn-primary`/`.btn-secondary`
- [x] GSAP vendored (`assets/gsap.min.js`, `assets/gsap-scrolltrigger.min.js`)
- [x] Alpine.js vendored (`assets/alpine.min.js`), inclus dans `theme.liquid`
- [x] `assets/animations.js` + `assets/theme.js` (librairie d'animations, reduced-motion)
- [x] Kit de composants : `snippets/responsive-image.liquid`, `snippets/icon.liquid`, `snippets/video.liquid`
- [x] `layout/theme.liquid`
- [x] Section 01 — Hero Premium (`sections/hero-premium.liquid`)
- [x] `templates/index.json`
- [x] Vérification `shopify theme check` (via `validate_theme` — tous les fichiers de la Phase 1 passent)

## Phase 2 — Core Sections
- [x] Section 02 — Trust Bar
- [x] Section 03 — Storytelling Intro
- [x] Section 04 — Product Features
- [x] Section 22 — Luxury Footer

## Phase 3 — Product Experience
- [x] Section 21 — Product Purchase Block

## Phase 4 — Storytelling Features
- [x] Section 05 — Sticky Storytelling (GSAP ScrollTrigger)
- [x] Section 09 — Before / After
- [ ] Section 10 — Premium Gallery
- [ ] Section 11 — Video Story
- [ ] Section 15 — Craftsmanship Timeline
- [ ] Section 16 — Materials

## Phase 5 — Conversion Features
- [ ] Section 06 — Benefits Grid
- [ ] Section 07 — Statistics / Metrics (compteurs animés)
- [ ] Section 08 — Comparison Table
- [ ] Section 12 — Testimonials
- [ ] Section 13 — Press Logos
- [ ] Section 14 — User Generated Content
- [ ] Section 17 — FAQ
- [ ] Section 18 — Guarantee
- [ ] Section 19 — Limited Offer
- [ ] Section 20 — Final CTA

## Phase 6 — Optimization
- [ ] Audit performance (Lighthouse 95+)
- [ ] Audit accessibilité
- [ ] Audit SEO

## Phase 7 — Theme Store Readiness
- [ ] Audit i18n (vérifier que toutes les chaînes UI sont bien dans `locales/en.default.json` + `fr.json`, aucun texte en dur)
- [ ] Checklist conformité Theme Store
- [ ] Ajouter `theme_documentation_url` dans `config/settings_schema.json` (`theme_info`) — requis par `shopify theme check`, à définir avec une vraie URL de doc
