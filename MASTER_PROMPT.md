# MASTER PROMPT — PRO EVENTS CAIRNS PREMIUM WEBSITE

## Your role
Act as a senior creative director, award-winning digital designer, frontend engineer, and motion designer. Build a polished, premium website for **PRO EVENTS CAIRNS**, an event services business in Cairns, Australia.

The site should look professionally art-directed, cinematic, modern, trustworthy, and premium while making the company's packages feel approachable and affordable. It must not look like a generic template.

## Non-negotiable scope
This is a **frontend-only** website/prototype.

Do not create backend code, APIs, databases, authentication, payment integrations, server actions, or real enquiry submission. Do not transmit or persist booking-form data. The booking form must use local React state and show a clearly labelled demo success state.

Inspect the existing repository before changing anything. Preserve the current framework and useful code. If no app exists, use the existing preferred setup; otherwise default to React + TypeScript + Vite or Next.js based on the repository. Use Tailwind CSS if already configured or add it only if appropriate.

## Business information
Brand: PRO EVENTS CAIRNS  
Tagline: Make Every Celebration Special  
Services: Sound • Lighting • LED Wall • Decoration  
Packages: Starting from $300 (Australian dollars; use `$300` or `A$300` consistently)  
Event types: Birthdays, Holy Communion celebrations, weddings, engagements, cultural events, corporate programs, mega events and other celebrations  
Service attribution: Light & Sound by GM | Decoration by LJ  
GM contact: 0451 316 304  
LJ contact: 0451 980 076  
Location context: Cairns, Queensland, Australia

Use only these facts. Do not invent an address, email, opening hours, social profiles, client names, testimonials, awards, years of experience, or exact package inclusions. Put editable content in a central configuration/data file. Use `tel:` links for the supplied phone numbers. Only show WhatsApp buttons if the client confirms those numbers support WhatsApp; otherwise use call buttons.

## Creative direction
Create a premium event-production identity with a cinematic dark palette, expressive typography, immersive photography, and restrained lighting-inspired color.

Suggested palette:
- Deep charcoal: #08090D
- Secondary charcoal: #11131A
- Elevated surface: #191B23
- Warm white: #F5F3EF
- Muted text: #A8A8B2
- Electric violet: #8B5CF6
- Stage blue: #4F7CFF
- Warm amber: #F4B860

Use violet, blue, and amber as accents, not as large noisy gradients everywhere. Create strong visual hierarchy, generous whitespace, asymmetric layouts, full-bleed imagery, editorial typography, fine separators, and purposeful negative space.

Use a heading font such as Space Grotesk or Manrope and a readable sans-serif body font such as Inter. Use fluid typography with `clamp()` where suitable.

Avoid:
- Generic three-card grids repeated in every section
- Excessive rounded cards and glassmorphism
- Huge gradients on every section
- Unnecessary floating shapes
- Random icons or emoji as decoration
- Fake reviews, fabricated metrics, lorem ipsum, broken links, or inert buttons
- Over-animated elements that make the page difficult to use

## Signature motion design
Scroll animation quality is a top priority. Create a cohesive motion system, not just repeated fade-ins.

Use Framer Motion for component transitions and hover effects. Use GSAP + ScrollTrigger only where advanced pinned or scrubbed animations genuinely improve the story. Avoid duplicating the same animation in multiple libraries. If the project already has a suitable animation stack, preserve it.

Implement these signature moments:
1. **Hero entrance:** stagger the wordmark, headline lines, supporting text, CTAs, and image reveal.
2. **Text reveals:** line-by-line or mask reveals for selected headings as they enter the viewport.
3. **Image reveals:** clip-path or mask transitions with restrained scale movement.
4. **Parallax:** subtle image movement in selected sections only.
5. **Pinned production story:** a desktop scroll-driven sequence that visually moves from an empty/dim venue to a vibrant, fully lit event using layered assets or a sequence of images. Do not fake a transformation with one static photo unless the layering convincingly supports it.
6. **Horizontal portfolio:** vertical scrolling drives a horizontal gallery on desktop. On mobile, replace this with a swipeable or vertically stacked gallery.
7. **Service interactions:** subtle image zoom, underline movement, arrow shifts, and hover states.
8. **Scroll progress:** a fine progress indicator, only if it fits the design.
9. **Navigation:** transparent over the hero, then a refined dark background after scrolling.
10. **Closing CTA:** strong typographic reveal and restrained background movement.

Motion requirements:
- Keep transitions smooth and intentional.
- Respect `prefers-reduced-motion`.
- Never make essential content dependent on animation.
- Avoid scroll hijacking and global forced scroll snapping.
- Avoid pinning long sections on small screens.
- Clean up ScrollTriggers and listeners.
- Use transform/opacity where possible.
- Keep scrolling natural on touch devices.
- The page must remain attractive with motion reduced or disabled.

## Site structure and content

### 1. Navigation
Create a clean, premium nav with:
- PRO EVENTS CAIRNS wordmark
- Services
- Packages
- Our Work
- About
- Contact
- Primary CTA: “Plan Your Event”

On mobile, use an accessible animated menu. All links must work and point to actual sections or pages.

### 2. Hero
Use a cinematic, high-quality event-stage image or muted video with a dark readability overlay.

Small label: `CAIRNS • SOUND • LIGHTING • LED • DECORATION`

Headline:
**MAKE EVERY  
CELEBRATION  
SPECIAL.**

Supporting copy:
“Sound, lighting, LED walls and event decoration for moments worth celebrating.”

Primary CTA: “Explore Packages”  
Secondary CTA: “Plan Your Event”

Include a subtle scroll indicator. Use striking composition and typography. Do not put too many badges or UI elements over the hero.

### 3. Brand introduction
Small label: `EVENTS, ELEVATED`

Headline:
**BIG ATMOSPHERE.  
THOUGHTFUL DETAILS.**

Copy:
“From intimate celebrations to large-scale events, PRO EVENTS CAIRNS helps bring your occasion to life with sound, lighting, LED walls and decoration.”

Use a spacious editorial layout with a large event image and staggered reveal.

### 4. Services
Show four main service areas with distinct image-led layouts:
- Professional Sound
- Stage Lighting
- LED Wall
- Event Decoration

Each needs a concise description, image, and enquiry CTA. Do not claim specific equipment models, sizes, or technical specifications unless supplied. Use varied layouts instead of identical cards.

### 5. Packages
Section headline:
**YOUR EVENT.  
YOUR VISION.  
YOUR PACKAGE.**

Show the known starting price clearly:
**Packages from $300**

Copy:
“Packages for birthdays, Holy Communion, weddings, cultural events, corporate programs, mega events and more. Contact us for a customised package to suit your event, venue and budget.”

Do not invent three package tiers, exact prices, or package inclusions. If visual package cards are useful, label them as event types or “custom package ideas” and clearly note that inclusions and pricing are confirmed after enquiry. The $300 price is a starting price, not a promise that every event can be delivered for that amount.

Create filters or category tabs for:
- Birthdays
- Holy Communion
- Weddings & Engagements
- Cultural Events
- Corporate Events
- Mega Events

Filters should actually change the visible frontend content. If details are unknown, use concise category descriptions and a “Request a custom quote” CTA.

### 6. Scroll-driven lighting story
Create a memorable pinned desktop section with a title such as:
**FROM SETUP  
TO SHOWTIME.**

Use a series of images or layered visuals to show event production coming together: venue/rigging, lighting and sound, then the finished atmosphere. Use a scrubbed scroll timeline, controlled transitions, and short supporting captions.

Do not invent the company’s actual workflow or claim the images are their past work. Use clearly replaceable demo assets. Simplify or remove pinning on mobile.

### 7. Portfolio / gallery
Headline:
**A LOOK AT THE ATMOSPHERE.**

Build a large, editorial gallery with images of:
- Birthday celebrations
- Wedding/reception stages
- Cultural events
- Corporate stages
- Concert lighting
- Sound and LED wall setups

These are visual categories, not claims of completed projects. Until the client supplies real photos, mark assets/content as demonstration placeholders in code and in the content notes. Do not create fake testimonials or attribute stock images to the company.

Each item can show category and a generic label such as “Birthday Celebration Setup” without inventing a client or venue. Add a working lightbox or detail interaction if appropriate.

### 8. Why choose this service
Create an editorial section around:
- Sound, lighting, LED wall and decoration in one place
- Packages starting from $300
- Options for different types of occasions
- Customised packages based on event, venue and budget

These points are grounded in the supplied business information. Do not add unsupported claims such as “number one,” “award-winning,” “20 years of experience,” or “hundreds of events.”

### 9. About
Headline:
**THE PEOPLE BEHIND THE CELEBRATION.**

Explain the business using only the supplied facts. Include:
“Light & Sound by GM | Decoration by LJ”

Do not invent a founder biography. Keep the layout ready for client-provided story, team photos, and company history.

### 10. Booking / event enquiry frontend
Build an elegant multi-step frontend form using local state only.

Step 1 — Event:
- Event type
- Event date
- Start time
- End time
- Cairns/venue location
- Approximate guest count

Step 2 — Services:
- Sound
- Lighting
- LED wall
- Decoration
- Multiple services
- Other requirements

Step 3 — Contact:
- Name
- Phone
- Optional email
- Message

Step 4 — Review:
- Show the selections and allow editing.
- Validate required fields.
- Display a demo completion screen after submission.

Success message:
**THANK YOU — LET’S MAKE IT SPECIAL.**

Also display a clear notice that this is a website prototype and the enquiry has not been sent. Do not transmit or store any data. Add direct call links to GM and LJ so visitors can contact the business.

### 11. Final CTA
Headline:
**LET’S MAKE YOUR NEXT  
CELEBRATION SPECIAL.**

Copy:
“Tell us what you’re planning and ask about a package tailored to your event and budget.”

Buttons:
- “Plan Your Event”
- “Call GM”
- “Call LJ”

### 12. Footer
Include:
- PRO EVENTS CAIRNS
- “Make Every Celebration Special”
- Sound • Lighting • LED Wall • Decoration
- Navigation
- GM: 0451 316 304
- LJ: 0451 980 076
- “Light & Sound by GM | Decoration by LJ”
- Cairns, Australia
- Copyright year generated dynamically if appropriate

Do not add a made-up street address, email, or social account.

## Image direction
Use authentic-looking, high-quality event photography with dark backgrounds, stage beams, atmospheric haze, warm celebration lighting, LED displays, speakers, and elegant decoration.

Use different images across the site. Prioritize image quality and appropriate cropping. Centralize image paths in one data/config file so they are easy to replace.

If using remote images:
- Use valid image URLs and configure the framework correctly.
- Provide a fallback if an image fails.
- Do not rely on random images that may disappear.
- Do not use imagery without appropriate usage rights for the intended production website.

Prefer local assets supplied by the client. If none are available, use replaceable demo assets and document the required client assets in `ASSET_CHECKLIST.md`.

## Technical quality
- Fully responsive desktop, tablet, and mobile layouts
- No horizontal overflow
- Semantic HTML
- Accessible labels and keyboard focus
- Reduced-motion support
- Optimized images and lazy loading below the fold
- Reusable components and design tokens
- No dead buttons or placeholder `href="#"` links
- Correct handling of form validation and demo success state
- Clean console
- Working production build

## Suggested project organization
Adapt to the existing repository. Do not create a second app inside an existing app.

- `src/components/layout/` — navigation, footer, page shell
- `src/components/sections/` — hero, services, packages, gallery, story, CTA
- `src/components/booking/` — frontend-only booking steps
- `src/components/ui/` — buttons, section labels, form controls
- `src/data/` — services, packages/categories, gallery demo content
- `src/config/site.ts` — brand details and contact data
- `src/lib/animations/` — reusable animation helpers
- `public/images/` — client and demo imagery
- `README.md`
- `ASSET_CHECKLIST.md`

## Execution plan
1. Inspect the current repository and identify its stack.
2. Summarize the implementation plan briefly.
3. Build the design tokens and navigation.
4. Build the hero and key visual sections.
5. Implement the scroll-driven signature animations.
6. Build services, package categories, gallery, about, CTA, and footer.
7. Build the local-state booking prototype.
8. Refine mobile behavior and reduced-motion support.
9. Run lint, type-check, and production build if available.
10. Fix the issues found and summarize what is complete.

Do not stop at the hero or create only a static mockup. Implement the complete frontend. Do not add backend functionality.

## Final design quality bar
The website should feel like a premium creative production brand: cinematic, intentional, immersive, and trustworthy. The three signature experiences are the hero reveal, the pinned lighting story, and the desktop horizontal portfolio. Make those excellent rather than adding motion to every element.

At the end, list the routes/sections, animations implemented, commands to run the project, any limitations, and the client assets still needed.
