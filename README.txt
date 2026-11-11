MARGEVIA | PUBLIC PRODUCT PREVIEW

A lightweight English landing page and interactive invoice reconciliation sample.

LOCAL PREVIEW
Run npm run dev and open http://127.0.0.1:4173. Requires Python 3. No dependencies to install.
Run npm run check to validate JavaScript syntax with Node.js.

DEPLOYMENT
Vercel publishes dist/ with no build or install step. Configuration is in vercel.json. GitHub repository: https://github.com/Oussamanakhil/margevia

JOURNAL
The public /blog/ index contains four practical purchasing/operations/finance guides and two product-building stories, each on a permanent /blog/<slug>/ route. All content is static and accessible without signing in. Examples are fictional; no actual recovery results are claimed.

Edit content/articles.json and the template in scripts/build-journal.py, then run npm run build:journal (Python 3 standard library). Commit the generated dist/blog/ pages, homepage section, metadata, sitemap.xml and robots.txt. Vercel continues to publish the checked-in dist/ directory without a build step. Presentation and local interactions live in dist/journal.css and dist/journal.js.

ARTWORK AND SHARING
Six AI-generated subject-specific editorial artworks are preserved in content/artwork/ with prompts/source identifiers in content/image-sources.json. Each has 600px and 1200px WebP derivatives. Eight distinct 1200x630 JPEG share images cover home, journal index and six articles. Seven outlined-type social SVG masters cover the index/articles in content/social/; the homepage share image is a separate generated asset. Provenance is embedded in the raster exports.

Optional asset regeneration: scripts/prepare-journal-assets.py uses Pillow; scripts/build-share-images.py uses fontTools to create SVG masters, which require an SVG rasterizer to export JPEGs. These tools are not production dependencies and are not part of npm run build:journal. Preserve the existing exports if only editing prose.

Home, index and articles expose static canonical/Open Graph/Twitter metadata; article pages also include BlogPosting data. Local metadata and image validation do not establish a successful preview in the live WhatsApp app; that app has not been tested.

DEMO VIDEO
The Demo video tab plays the supplied 15-second 1080p60 H.264 film with its matching WebP poster, configured in dist/video-config.js and stored under dist/assets/video/. It contains music and effects with no spoken dialogue, so no captions track is needed. The embedded player exposes only an accessible Play/Pause button. Native controls and the download/overflow menu are removed; inline playback, metadata-only preload and no autoplay are preserved. Switching back to Dashboard pauses playback. Optional English WebVTT captions remain supported for future spoken content.

PILOT PLANNER
Choose a team, first review focus and location range. Send brief is disabled until the owner supplies a recipient and delivery is connected. Choices stay on the page; no brief is downloaded and no information is sent.

MOTION
Motion is enabled by default at the owner’s request. Reduce motion changes this page session only; there is no Replay control.

LIMITATIONS
All invoice data is fictional. No live OCR, uploads, supplier contacts, accounting integrations, or pilot submissions. Review state lasts only for the current page visit.

DESIGN AND AGENT CONTEXT
See AGENTS.md, PRODUCT.md, DESIGN.md, and .impeccable/design.json. Public product context is available at /llms.txt. Fonts are self-hosted DM Sans, licensed under the included SIL Open Font License.
