# Permanent hosting — preserve the existing site

## Current status

The original application code, CSS, image references, lockfile, and Next.js configuration are unchanged from `71f665d4d0e5ce4e37d37607ebad3af5f57cabe8` (the inspected `main`). The production build succeeds. No image has been generated, replaced, compressed, or renamed.

**This is not yet an exact copy of the working Arena preview or a completed deployment.** This checkout contains only `public/images/nipc-brand-logo.svg`. Neither its available Git history nor the inspected workspace, GitHub releases, or deployment records contains the missing original assets. Access to the original preview or its exported files is required.

Missing references:

- `nipc-banner-wide.jpg`
- `nipc-logo.png` (referenced by the existing Hero component)
- `nipc-official-poster-banner.jpg`
- `nipc-yellow-brochure.jpg`
- `real-pest-technician-commercial.jpg`
- `real-pest-technician-hallway.jpg`
- `real-pest-technician-kitchen.jpg`

## 1. Recover the originals

Preferred: export the **entire** `public/images` folder from the working Arena project. Extract it outside this repository, then run from the repository root:

```sh
node scripts/preserve-images.mjs --from-directory /absolute/path/to/export/public/images
```

Alternatively, while the original preview is live and publicly accessible:

```sh
node scripts/preserve-images.mjs --from-url 'https://YOUR-ORIGINAL-PREVIEW-HOST'
```

The URL must be the actual website origin, not the Arena editor/share page. The tool fetches each source-referenced `/images/...` path directly, validates image signatures to reject HTML/login pages, and writes the original response bytes with their exact filenames. It does not use image optimization endpoints. Existing files must match byte-for-byte; it refuses replacements. A missing image or conflict stops validation before any copy begins. Local directory mode copies every exported file, including unreferenced assets.

URL recovery cannot enumerate unreferenced images or filenames held only in the database. Use the full folder export for complete preservation. If an unused source reference is also missing from the original preview, URL recovery will stop rather than invent a replacement; investigate that reference with the project owner.

Audit all source references and print SHA-256 hashes of **every** local asset:

```sh
node scripts/preserve-images.mjs --check
```

Once complete, save those hashes for comparison with the original export:

```sh
node scripts/preserve-images.mjs --check > deployment/images.sha256
```

Add the recovered originals and manifest to Git on the current Arena branch. Do not commit a partial or failing manifest. External Pexels URLs and Google Fonts remain exactly as they were; their continued availability depends on those services. This tool does not replace them.

## 2. Preserve the working database

The site is a full Next.js app, not a static site. Contacts, quotes/cart submissions, newsletter subscriptions, reviews, products, and blog content use PostgreSQL. Configure `DATABASE_URL` using the hosting provider's encrypted environment settings. Never paste credentials into chat or commit them.

To match the working preview, migrate its **existing database**, including all current rows and image URLs, using the database provider's export/restore tools. Protect that export: it may contain customer data. Do not put database dumps in Git. A fresh database with default seeds cannot guarantee identical content or ordering.

For a deliberately **new, empty** database only, set `DATABASE_URL` in your secure shell environment and run from the repository root:

```sh
npx drizzle-kit push --config=deployment/drizzle.config.ts
```

This uses the unchanged schema and a separate environment-based deployment config. Do not use the original `drizzle.config.json` for production: it targets local development PostgreSQL. Do not run schema push blindly against an existing live database. Back up and review changes first. No database setup runs automatically during a build.

## 3. Hosting options

### Vercel (native Next.js)

1. Import the GitHub repository and select the current Arena branch containing the recovered files. This session works only on `arena/01a0d027-pest-control-website`; merging into `main` later is a separate owner decision.
2. Framework: **Next.js**; root: repository root; Node.js: **22.x**.
3. Install command: `npm ci`.
4. Build command: `node scripts/preserve-images.mjs --check && npm run build`.
5. Leave the output directory at the Next.js default. Do not use static export or GitHub Pages: that would lose server functionality.
6. Configure production and preview `DATABASE_URL` securely, with the database provider's recommended TLS/pooling settings.
7. Deploy only after image recovery and database migration. Record the provider's permanent HTTPS URL, not the temporary Arena preview URL.

### Docker-capable Node hosting (Render, Railway, VPS, etc.)

The root Dockerfile builds the unchanged Next.js app and copies the entire `public` directory. It runs as a non-root user, listens on `0.0.0.0`, and respects the provider's `PORT` environment variable (default 3000). It intentionally fails if source-referenced images are missing. No secrets are baked into the image.

```sh
docker build -t nipc-website .
# DATABASE_URL must already be exported securely in this shell.
docker run --rm -p 3000:3000 -e DATABASE_URL nipc-website
```

Configure the host's HTTPS endpoint and supply `DATABASE_URL` at runtime. Docker is not installed in the inspected sandbox, so the Docker image has not been built here.

## 4. Release verification

- `npm ci` and `npm run build` succeed.
- `node scripts/preserve-images.mjs --check` succeeds; all recovered files are tracked by Git.
- Compare each deployed image's downloaded SHA-256 hash to the manifest, not just its HTTP status.
- Compare desktop/mobile pages to the original preview: hero slides, gallery, logo, products, blog, services, offers, and modals.
- Verify `/api/health` returns HTTP 200 with `{"ok":true}`. A successful build does not prove database connectivity.
- Verify the existing database content matches. Coordinate any test form/review submissions because those write real data.
- Verify call, WhatsApp, cart, quote, contact, and newsletter flows. No functionality was rewritten for deployment.

### Existing findings (not silently changed)

- The baseline lint run reports four errors and two warnings in existing UI code. Build succeeds independently.
- The baseline build warns that `metadataBase` is unset; social preview image URLs may therefore resolve to localhost. This is unchanged, not a claim that social previews are production-ready.
- `npm audit --omit=dev` reports critical/high advisories in the locked Next.js/PostCSS/sharp dependency tree. Applicability needs review before public launch; dependencies have not been upgraded under the preserve-as-is constraint.
- Product creation/import routes have no authentication checks in their current route implementations. Restrict public access at the hosting/security layer or obtain approval for a separate security change before launch.

The image-recovery and database prerequisites remain blockers to claiming exact preview parity. Security findings remain release risks; hosting preparation is not a security approval.
