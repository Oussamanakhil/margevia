# Pilot brief delivery

Recipient: support@margevia.solutions (Google Workspace).

Live deployment verified. Gmail connection 12957786 is authorized as support@margevia.solutions in Adham’s team 3588697. Scenario 8524871 is active: learned webhook -> Gmail send -> confirmed response. Production PILOT_WEBHOOK_URL is stored as a Vercel secret.

Two labelled tests were accepted by Gmail: [SETUP TEST] through the server handler and [WEBSITE TEST] through the public form at margevia.vercel.app. The mobile UI displayed Brief sent after the actual Gmail ID was returned. Inbox placement has not been independently inspected. The margevia.solutions endpoint returned available:true with valid HTTPS when resolved directly to Vercel; the in-app browser still had a DNS lookup failure for that hostname at verification time.

## Account handoff

Make onboarding is complete for Adham: organization 9606220, team 3588697. The chat connector currently belongs to a different organization (8585785, team 2284914). Its authorization request is not accessible to Adham. Build the workflow in Adham's workspace or reconnect the Make plugin to it; do not use SaliencyLab Gmail connections.

## Contract

The browser posts name, email, company, team, focus and sites to /api/pilot. GET /api/pilot reports whether a valid delivery endpoint is configured. The Send brief button stays disabled when unavailable. The email link works independently.

The Vercel Node function validates contact fields and exact pilot choices, rejects other origins and a filled honeypot, escapes email HTML, and forwards only the required fields to Make. PILOT_WEBHOOK_URL is a server-only environment variable. Never put its value in dist/ or version control.

The active Make scenario is Custom webhook -> Gmail Send an email -> Webhook response. Fix the recipient in Gmail to support@margevia.solutions. Map subject, HTML content and optional Reply-To from the validated server payload. The response must be JSON with sent:true and the actual Gmail messageId. Default webhook acceptance is not proof of email acceptance and is rejected by the server.

Provider failures preserve the visitor's entries. Network timeouts are reported as unconfirmed, not unsent. No automatic delivery retries. Success disables further submissions on that page and keeps the submitted information visible.

## Verification and limitations

Run npm run check and npm test. Tests use a mocked email transport and do not prove mailbox delivery. Verify the live endpoint with a clearly labelled test brief after authorization and configuration.

Rate limiting and duplicate suppression are best-effort, per function instance, with a ten-minute memory window and bounded maps. They are not durable across deployments or concurrent instances. Configure Vercel Firewall rate limits or a shared store if traffic or abuse warrants it. The webhook URL is a server-held capability; never publish it. The endpoint sends only to the fixed Margevia recipient, with no visitor auto-response.

Google Workspace MX routing alone does not prove a working send connection or inbox receipt. Confirm Gmail acceptance in Make execution history and inbox receipt separately.
