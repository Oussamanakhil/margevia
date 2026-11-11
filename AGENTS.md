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
- dist/video-config.js: supplied 15-second video source and poster; no dialogue captions required.
- dist/llms.txt: public product summary for readers and agents.

## Video handoff
When the user supplies the video, add it under dist/assets/ or use the authorized hosted URL, then set src in dist/video-config.js. Add English WebVTT captions for spoken content and an optional poster. The supplied film uses one accessible Play/Pause button; do not restore download, overflow, speed or fullscreen controls. Never autoplay audio. Switching back to Dashboard pauses playback.

## Product constraints
The demo uses fictional records. Do not invent customers, revenue, savings, integrations or live AI processing. Keep the website publicly accessible without a sign-in gate. Do not add secrets or personal files to the repository.

## Journal source and publishing
The journal is a Read-mode extension of the pinned incumbent visual system; read .impeccable/journal-brief.md before changing it. content/articles.json is the editorial source and scripts/build-journal.py generates dist/blog/index.html, six article routes, the homepage journal section, static sharing metadata and sitemap. Run npm run build:journal after content or generator changes and commit the generated HTML; Vercel does not run this command. Do not hand-edit generated article pages.

Preserve four practical guides and two honest building stories, fictional examples, source-backed review and the flagged-versus-recovered distinction. Maintain anonymous public access, canonical URLs, Open Graph/Twitter metadata, article BlogPosting data, sitemap entries, subject-specific alt text and mobile table hints with aria-describedby. Verify native contents links, copy-link fallback and mobile navigation. A crawler-readable preview does not prove rendering in the live WhatsApp app.

Artwork provenance lives in content/image-sources.json; optimized originals are in content/artwork/, responsive WebP files in dist/assets/journal/, social SVG masters in content/social/, and finished share JPEGs in dist/assets/social/. Preserve these sources and embedded metadata. Asset regeneration is optional tooling using Pillow, fontTools and an SVG rasterizer; production needs none of them.
