# Founder page
Mode: Read, with a direct path to the product and founder contact.

Extend the existing Margevia editorial system: warm paper, DM Sans, violet links, hairline divisions, square buttons. A restrained split introduction pairs Adham’s name and developer-to-founder story with his existing suit portrait. Follow with the purchasing problem, a chronological background and a current-work section. No new identity or speculative founder story.

Use the user-confirmed biography and LinkedIn URL from 23 November 2026. Three pilot users are confirmed, with no claims of revenue, savings or production AI. STATION F Entrepreneur in Residence begins November 2026. EPSI studies are ongoing. The user previously selected the suit portrait; retain its AI-edit provenance.

Keep the existing homepage and journal behavior. Add footer discovery throughout and a Founder navigation link on editorial pages. Verify desktop 1440, mobile 390 and narrow 320, navigation and reduced motion. Canonical domain: margevia.solutions.

## Completed extension · 23 November 2026

The public route is `/founder/`, canonical `https://margevia.solutions/founder/`. It reuses the journal shell and the incumbent warm-paper palette, local DM Sans, violet accents, hairlines, square actions and inset frame. The split portrait introduction stacks on small screens. Background, current work and contact sections retain the editorial reading hierarchy. Founder-specific composition remains here rather than becoming a new global identity.

Source facts were supplied and confirmed by the user on 23 November 2026, not inferred from the portrait or editorial examples:
- Adham Ait reqba, Paris-based full-stack developer and founder of Margevia; LinkedIn: https://www.linkedin.com/in/adham-ait-reqba-20a92a451/.
- STATION F, Landing Zone, Entrepreneur in Residence: November 2026 to present.
- AliDanTek, Full Stack Engineer: January 2023 to October 2025.
- Cité de l’Innovation de Marrakech, Full Stack Developer Intern: April to August 2022; React.js and Spring Boot events/training platform.
- EPSI, Computer Science M1: February 2026 to present, ongoing. Distributed Computer Systems Licence, Faculté des Sciences et Techniques Gueliz, Marrakech: October 2018 to October 2022.
- Three pilot users; no verified revenue, savings or measurable product outcomes. Public demo records remain fictional. AI-assisted extraction and matching are being evaluated, and live document processing/accounting integrations remain in development.

The portrait is the existing user-selected AI-edited suit image, resized for the site. `content/founder-image-source.json` retains its provenance and the source of the dedicated share composition. The page includes canonical, Open Graph/Twitter and ProfilePage/Person metadata. Shared footer and editorial navigation provide discovery; primary destinations are `/#demo`, `/#pilot`, `/blog/why-we-are-building-margevia/` and the confirmed LinkedIn profile. The journal generator includes `/founder/` in the sitemap.

Build source: `scripts/build-founder.py`; local styles: `dist/founder.css`; generated page: `dist/founder/index.html`. Run `npm run build:founder` after founder source or journal shell updates. `npm run build:site` runs the journal generator first, then the founder generator. The existing checked-in static deployment workflow remains in place.

Review handoff verdict: ship. The supplied review found no material issues in the 1440px, 390px and 320px captures. Existing homepage and journal functionality must remain intact.

Incumbent evidence checked: `DESIGN.md`, founder CSS and the generated journal shell. This is an ordinary extension, so `DESIGN.md` and `.impeccable/design.json` are preserved. Preexisting documentation drift remains separate: the sidecar dates from 11 November 2026, and DESIGN.md contains an earlier no-scroll-tracking statement alongside its later active-contents description. Neither is a reason to replace the visual identity in this task.
