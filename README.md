# SJGOMES

Professional sound-system rental website for SJGOMES, based in Rossas, Arouca, Portugal. The site is a static page (plus a short privacy note) with no backend and no build step.

## Website purpose

Present the rental service for parties, cultural events, and sports events in Arouca and the surrounding area, and give visitors a direct way to ask for a quote or to send their email for news and offers.

## Technologies

- HTML, CSS, and JavaScript (no framework)
- Images in `media/` as WebP, with the original JPG kept as a fallback
- Google Fonts (Plus Jakarta Sans, Syne, JetBrains Mono)
- Embedded Google Map
- Hosting target: Cloudflare Workers static assets

## Existing features

- Sections: início, serviços, como trabalhamos, eventos, equipamento, galeria, contactos
- Gallery filters (palcos, equipamento, festas) and a lightbox
- Quote form: opens WhatsApp (`wa.me`) with the filled text. Nothing is stored on the site
- Newsletter form: opens the visitor's email app (`mailto:sjgomesarouca@gmail.com`) with a prepared message. There is no mailing list
- Map embed for Travessa do Cabo, Rossas, 4540-475 Arouca
- Privacy note at `privacidade.html`, linked from the footer
- The phone number is not shown as text. WhatsApp buttons use a `wa.me` link only

## Local run instructions

From the project root, serve the files over HTTP (opening `index.html` as a file can block the map and fonts):

```bash
python3 -m http.server
```

Or:

```bash
npx serve .
```

Then open the URL printed by the server (for Python's module, `http://127.0.0.1:8000/`).

## Configuration

None. There are no environment variables, API keys, or `.dev.vars` to fill in.

## Build and deploy

There is no build. Cloudflare Workers serves the repository as static assets (no Worker script).

`wrangler.jsonc` sets `name` to `sjgomes` and `assets.directory` to `.`. `.assetsignore` keeps the README, Wrangler config, and git metadata out of the upload.

Deploy with the Cloudflare GitHub integration (Workers Builds):

- Production branch: `main`
- Every other branch gets its own preview deployment
- No build command is required

Check the asset bundle locally without logging in or deploying:

```bash
npx wrangler deploy --dry-run
```

The public base URL used for the canonical link, Open Graph tags, `robots.txt`, and `sitemap.xml` is `https://sjgomes.sjgomesarouca.workers.dev/`. If a custom domain is added, update those four places (and this note) to the new origin.

## Current status and known limitations

- The site is a static front end prepared for production. It is not wired to a custom domain yet.
- The newsletter does not join a real list. The button only opens an email to sjgomesarouca@gmail.com.
- There is no backend, database, or form storage.
- The photographs are illustrative. The owner still needs to confirm where they come from and that they can be published.
- The equipment section explains what an amplifier does. It does not list the SJGOMES inventory.
- Quotes leave the site via WhatsApp. The business email published on the site is sjgomesarouca@gmail.com only.
