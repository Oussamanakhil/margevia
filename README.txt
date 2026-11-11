MARGEVIA — PUBLIC PRODUCT PREVIEW

A lightweight English landing page and interactive invoice reconciliation sample.

LOCAL PREVIEW
Run npm run dev and open http://127.0.0.1:4173. Requires Python 3. No dependencies to install.
Run npm run check to validate JavaScript syntax with Node.js.

DEPLOYMENT
Vercel publishes dist/ with no build or install step. Configuration is in vercel.json. GitHub repository: https://github.com/Oussamanakhil/margevia

DEMO VIDEO
The Dashboard / Demo video tabs are ready. Until a video is supplied, the video tab shows an honest coming-soon state. Set src in dist/video-config.js to a video asset or authorized hosted URL. Optional captions (English WebVTT) and poster are supported. The player has native controls, no autoplay, and pauses when switching back to Dashboard.

PILOT PLANNER
Choose a team, first review focus and location range. Send brief is disabled until the owner supplies a recipient and delivery is connected. Choices stay on the page; no brief is downloaded and no information is sent.

MOTION
Motion is enabled by default at the owner’s request. Reduce motion changes this page session only; there is no Replay control.

LIMITATIONS
All invoice data is fictional. No live OCR, uploads, supplier contacts, accounting integrations, or pilot submissions. Review state lasts only for the current page visit.

DESIGN AND AGENT CONTEXT
See AGENTS.md, PRODUCT.md, DESIGN.md, and .impeccable/design.json. Public product context is available at /llms.txt. Fonts are self-hosted DM Sans, licensed under the included SIL Open Font License.
