SETUP (one time)
1. Deploy this folder on Vercel (drag the folder into vercel.com/new, or run `vercel` inside it).
2. In your Vercel project open Storage / Marketplace, add "Upstash Redis" (free plan available) and connect it to the project.
   This adds the KV_REST_API_URL and KV_REST_API_TOKEN environment variables automatically.
3. In Settings > Environment Variables add EDIT_PASSWORD = a password only you know.
4. Redeploy once (Deployments > Redeploy) so the new variables apply.
5. Open index.html and replace YOURDOMAIN in the og:image line with your real Vercel domain
   (for the WhatsApp preview image), then redeploy.

EDITING
Open  https://YOUR-SITE.vercel.app/#edit  -> tap "Edit invite" -> change details -> enter password -> Save.
Changes go live for everyone straight away, no redeploy needed.
Before the storage is connected, the invite still shows the details written inside index.html.

RSVP RESPONSES
Guests fill the "Will you join us?" form on the invite (name, phone, guests, events, message).
To read them: open /#edit -> "Edit invite" -> enter your password -> "View RSVP responses".
You see totals per event and every reply, and can "Download CSV" for Excel / Google Sheets.
Uses the same Upstash storage, no extra setup.
