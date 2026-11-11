# Margevia project

Read PRODUCT.md and DESIGN.md before changing product or visual behavior. The deployable static website is dist/. Vercel publishes that directory without a build.

## Run and verify
- npm run dev starts the local preview on http://127.0.0.1:4173 (Python 3).
- npm run check validates JavaScript syntax (Node.js). No npm install is needed.
- Check dashboard/video tabs with clicks and ArrowLeft/ArrowRight/Home/End.
- Keep the three sample invoice totals and flagged-versus-recovered distinction accurate.
- Verify mobile layout and reduced-motion mode after UI edits.

## Files
- dist/index.html: content and accessible structure.
- dist/style.css: visual system and responsive layout.
- dist/app.js: local demo and view tabs.
- dist/motion.js: bounded motion and preference controls.
- dist/video-config.js: video source, captions and poster; currently empty.
- dist/llms.txt: public product summary for readers and agents.

## Video handoff
When the user supplies the video, add it under dist/assets/ or use the authorized hosted URL, then set src in dist/video-config.js. Add English WebVTT captions for spoken content and an optional poster. Native video controls are prepared. Never autoplay audio. Switching back to Dashboard pauses playback.

## Product constraints
The demo uses fictional records. Do not invent customers, revenue, savings, integrations or live AI processing. Keep the website publicly accessible without a sign-in gate. Do not add secrets or personal files to the repository.
