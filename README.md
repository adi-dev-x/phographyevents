# PRO EVENTS CAIRNS — Claude Frontend Design Kit

This kit is for building a premium, professional, frontend-only website for PRO EVENTS CAIRNS.

## How to use
1. Extract this folder into your project, or keep these files open beside your existing repository.
2. Open the project in Claude Code.
3. Paste the full contents of `MASTER_PROMPT.md` into Claude.
4. Ask Claude to inspect the current project first and then implement the complete frontend.
5. Give it the files in this kit as context if your agent supports project files.
6. Replace demonstration images and content with client-approved assets before launch.

## Scope
- Premium responsive website
- Cinematic, scroll-triggered animations
- Services, packages, portfolio, about, and contact sections
- Interactive frontend booking/enquiry prototype
- No backend, database, authentication, APIs, payment gateway, or real form submission

## Confirm with the client before publishing
- Whether the $300 starting package includes sound, lighting, and decoration together
- Actual package inclusions and prices
- Approved photos/videos and permission to publish them
- Exact service areas around Cairns
- Business email, address, and social links
- Whether the phone numbers support WhatsApp
- Actual testimonials, if any

---

## Running the website

Built with React 18 + TypeScript + Vite, Framer Motion (component motion) and GSAP ScrollTrigger (pinned story + horizontal gallery). Requires Node 18+.

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

### Where to edit things
| What | File |
|---|---|
| Brand name, tagline, phone numbers, WhatsApp flags, nav | `src/config/site.ts` |
| Services, event categories, story captions, gallery, booking options | `src/data/content.ts` |
| Every image path | `src/data/images.ts` |
| Colours, type, spacing tokens | `src/styles/global.css` (`:root`) |

### Demo imagery
All photos in `public/images/demo/` are Unsplash stock photos used as **demonstration placeholders only**. They are not PRO EVENTS CAIRNS' work. Replace them with client photos (same keys in `src/data/images.ts`), then set `isDemoImagery = false` to hide the on-page demo note.

### Booking form
Frontend prototype only: local React state, nothing is sent or stored, and the success screen says so. Connect it to a real service only after privacy/terms are confirmed.
