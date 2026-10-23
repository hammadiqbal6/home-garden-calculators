# Contact form via EmailJS (FREE plan)

YardCalc’s `/contact/` page can send messages through [EmailJS](https://www.emailjs.com/) using a tiny first-party script and the public REST API. No `@emailjs/browser` SDK.

## Build env vars (public only)

Set these in `.env` (local) or Cloudflare Workers Builds / CI (deploy). All three must be non-empty to render the form; otherwise the page shows the `mailto:` fallback only.

| Variable | Example | Notes |
| --- | --- | --- |
| `PUBLIC_EMAILJS_SERVICE_ID` | `service_xxxxx` | Email service connected in EmailJS |
| `PUBLIC_EMAILJS_TEMPLATE_ID` | `template_xxxxx` | Email template ID |
| `PUBLIC_EMAILJS_PUBLIC_KEY` | `xxxxxxxxxxxx` | Account **public** key (`user_id` in the API) |

**Never** put the EmailJS **private** key in the repo, `.env.example`, Workers vars that ship to the browser, or `PUBLIC_*` names. The private key is for server-side use only; this static site does not need it.

They are read in `src/config/site.ts` as `siteConfig.emailjs` (see also `.env.example`).

## Template variables

Create a template in the EmailJS dashboard that uses these params (must match the JSON `template_params` the page sends):

| Template variable | Meaning |
| --- | --- |
| `{{from_name}}` | Visitor name |
| `{{reply_to}}` | Visitor email (set Reply-To to this in the template) |
| `{{message}}` | Message body |
| `{{page_url}}` | Full URL of the contact page when they submitted |
| `{{site_name}}` | Brand name (`YardCalc`) |

Suggested subject: `YardCalc contact from {{from_name}}`.

## Client safeguards (FREE-plan friendly)

- **Honeypot** field (`company`) — bots that fill it get a fake success; no API call.
- **Throttle** — one successful send per 60 seconds per browser (`localStorage`).
- **Message cap** — 3,000 characters.
- **HTML validation** — `required`, `type="email"`.
- Script loads **only** on `/contact/` when the form is enabled.

## CSP

`public/_headers` allows `connect-src https://api.emailjs.com` so `fetch` to the EmailJS API succeeds under the site CSP.

## Mailto fallback

- If any EmailJS env var is missing at build time → primary **Email** button uses `mailto:siteConfig.contactEmail` (no broken form).
- When the form is enabled → a secondary mailto link stays visible (works without JavaScript).

## API used

```http
POST https://api.emailjs.com/api/v1.0/email/send
Content-Type: application/json

{
  "service_id": "<PUBLIC_EMAILJS_SERVICE_ID>",
  "template_id": "<PUBLIC_EMAILJS_TEMPLATE_ID>",
  "user_id": "<PUBLIC_EMAILJS_PUBLIC_KEY>",
  "template_params": {
    "from_name": "...",
    "reply_to": "...",
    "message": "...",
    "page_url": "...",
    "site_name": "YardCalc"
  }
}
```
