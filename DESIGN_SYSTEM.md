# Design System — PRO EVENTS CAIRNS

## Brand feeling
Premium, cinematic, modern, celebratory, confident, approachable.

## Colors
| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#08090D` | Main page background |
| `--color-bg-secondary` | `#11131A` | Alternate sections |
| `--color-surface` | `#191B23` | Elevated elements |
| `--color-text` | `#F5F3EF` | Primary text |
| `--color-muted` | `#A8A8B2` | Supporting text |
| `--color-violet` | `#8B5CF6` | Accent |
| `--color-blue` | `#4F7CFF` | Accent |
| `--color-amber` | `#F4B860` | Warm highlight |
| `--color-border` | `rgba(255,255,255,.14)` | Subtle separators |

## Typography
- Display: Space Grotesk or Manrope
- Body: Inter
- Use large, responsive headlines and restrained uppercase labels.
- Use fluid sizing with `clamp()` where appropriate.

## Layout principles
- Use large editorial margins and clear vertical rhythm.
- Mix full-bleed photography, split layouts, large text, and image grids.
- Avoid repeated three-card grids.
- Use rounded corners sparingly.
- Keep the CTA visually prominent but not loud.
- Use high-contrast text overlays on images.

## Motion principles
- Hero: staggered entrance and image mask.
- Headings: line or mask reveal.
- Images: clip-path reveal and subtle scale.
- One pinned lighting narrative on desktop.
- One horizontal portfolio on desktop.
- Subtle parallax only on selected imagery.
- Reduce or simplify motion on mobile.
- Respect `prefers-reduced-motion`.
- Never animate all content just because it is possible.

## Components
- Primary button: high contrast, clear label, precise hover transition.
- Secondary button: subtle border or text-link treatment.
- Section label: small uppercase, tracked, restrained.
- Gallery item: image-first, title and category as metadata.
- Form fields: readable labels, visible focus states, inline errors.
- Navigation: transparent over hero, dark solid surface after scroll.

## Accessibility
- Semantic landmarks and headings.
- Keyboard-accessible menu and dialogs.
- Visible focus ring.
- Alt text for meaningful images.
- Reduced-motion fallback.
- Buttons and links must be distinguishable and usable on touch screens.
