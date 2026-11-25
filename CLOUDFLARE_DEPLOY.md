# Deploying a Next.js Site to Cloudflare (CLI, no Vercel)

How this project (Nexus Arena) was moved from Vercel to Cloudflare Workers, written so the same steps can be repeated for the next Next.js site.

Cloudflare runs Next.js through the **OpenNext adapter** (`@opennextjs/cloudflare`), which converts the Next.js build into a Cloudflare Worker. Vercel is not used anywhere in this process.

---

## Prerequisites

- Node.js and npm installed
- A Cloudflare account (free plan is fine)
- A Next.js app that builds locally (`npx next build`)

---

## Step 1 — Check the Next.js version

`@opennextjs/cloudflare` only supports these Next.js versions:

- `>=15.5.29 <16`, or
- `>=16.4.5`

Check yours:

```powershell
npm ls next
```

If it falls outside those ranges (this project was on `16.3.0`), upgrade Next.js first:

```powershell
npm view next@16 version        # list available 16.x versions
npm install next@16.4.6         # or any supported version
npx next build                  # confirm the app still builds
```

> **Do not** use `--force` or `--legacy-peer-deps` to get past the version error. That installs an adapter that does not support your Next.js version and can break the deploy.

The error you get when the version is wrong looks like:

```
Could not resolve dependency:
peer next@">=15.5.29 <16 || >=16.4.5" from @opennextjs/cloudflare
```

---

## Step 2 — Install the Cloudflare tools

```powershell
npm install @opennextjs/cloudflare@latest
npm install -D wrangler@latest
```

If npm warns that `esbuild` and `workerd` install scripts are blocked, approve them (both are needed to build and run the Worker):

```powershell
npm install-scripts approve esbuild
npm install-scripts approve workerd
npm rebuild esbuild workerd
```

---

## Step 3 — Log in to Cloudflare

```powershell
npx wrangler login      # opens the browser to authorize
npx wrangler whoami     # confirm you are logged in
```

---

## Step 4 — Generate the Cloudflare config

```powershell
npx opennextjs-cloudflare migrate
```

This one command makes all the project changes listed below.

### Files it creates

**`wrangler.jsonc`** — the Worker config:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "main": ".open-next/worker.js",
  "name": "nexus-arena",                     // Worker name -> URL becomes nexus-arena.<subdomain>.workers.dev
  "compatibility_date": "2026-11-25",
  "compatibility_flags": ["nodejs_compat", "global_fetch_strictly_public"],
  "assets": { "directory": ".open-next/assets", "binding": "ASSETS" },
  "services": [
    { "binding": "WORKER_SELF_REFERENCE", "service": "nexus-arena" }  // must match "name"
  ],
  "images": { "binding": "IMAGES" }          // Cloudflare image optimization for next/image
}
```

**`open-next.config.ts`** — adapter config (caching options go here):

```ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // incrementalCache: r2IncrementalCache   // optional, see "Caching" below
});
```

**`public/_headers`** — long-term caching for static build files:

```
/_next/static/*
  Cache-Control: public,max-age=31536000,immutable
```

**`.dev.vars`** — local environment variables for preview (`NEXTJS_ENV=development`). Not committed.

### Files it modifies

| File | Change |
|---|---|
| `next.config.ts` | Adds `import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());` at the bottom so `next dev` can use Cloudflare bindings |
| `package.json` | Adds `preview`, `deploy`, `upload` and `cf-typegen` scripts |
| `.gitignore` | Ignores `.open-next`, `.wrangler`, `.dev.vars` |

> When doing this on a new site, change `"name"` in `wrangler.jsonc` (and the matching `"service"`) to the new site's name **before** the first deploy.

---

## Step 5 — Build and test locally

```powershell
npm run preview
```

Open the URL it prints (usually `http://localhost:8787`), click through every page, then stop it with `Ctrl+C`.

To only build without serving:

```powershell
npx opennextjs-cloudflare build
```

A successful build ends with `Worker saved in .open-next\worker.js` and `OpenNext build complete.`

---

## Step 6 — Deploy

```powershell
npm run deploy
```

The site goes live at `https://<worker-name>.<your-subdomain>.workers.dev`.

Run the same command again for every update.

---

## Optional steps

### Custom domain

The domain must be added to Cloudflare (DNS managed by Cloudflare). Add to `wrangler.jsonc`:

```jsonc
"routes": [{ "pattern": "example.com", "custom_domain": true }]
```

Then `npm run deploy` again.

### Environment variables / secrets

```powershell
npx wrangler secret put MY_SECRET
```

For local preview, put them in `.dev.vars`.

### Auto-deploy on git push

Cloudflare dashboard → **Workers & Pages → (your worker) → Settings → Builds** → connect the GitHub repo.

- Build command: `npx opennextjs-cloudflare build`
- Deploy command: `npx wrangler deploy`

### Caching (ISR / revalidate)

`migrate` printed: *"Failed to set up cache for your project."* This only matters if pages use `revalidate`, ISR or on-demand revalidation. All pages in this project are static, so it was skipped. If a future site needs it, enable the R2 incremental cache — see https://opennext.js.org/cloudflare/caching.

### Shut down the old Vercel copy

Only after the Cloudflare site works: Vercel website → project → **Settings → Delete Project**. No Vercel CLI needed.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `ERESOLVE ... peer next@">=15.5.29 <16 \|\| >=16.4.5"` | Upgrade Next.js to a supported version (Step 1) |
| `esbuild` / `workerd` install scripts blocked | Approve them (Step 2) |
| Deploy fails mentioning `IMAGES` binding | Remove the `"images"` block from `wrangler.jsonc` and deploy again |
| Build fails on Windows with path / symlink errors | Run the build and deploy inside WSL (Ubuntu) |
| `npm audit` shows vulnerabilities | Review with `npm audit`; avoid `npm audit fix --force`, it can downgrade Next.js and reintroduce the version conflict |

---

## Quick checklist for the next site

```powershell
npm ls next                                   # 1. must be >=15.5.29 <16 or >=16.4.5
npm install @opennextjs/cloudflare@latest     # 2. install adapter
npm install -D wrangler@latest
npx wrangler login                            # 3. log in
npx opennextjs-cloudflare migrate             # 4. generate config (then rename worker in wrangler.jsonc)
npm run preview                               # 5. test locally
npm run deploy                                # 6. go live
```
