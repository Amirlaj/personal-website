# Amir Lajevardi — Personal Portfolio

A simple introduction page, with a portrait-and-text layout inspired by [Tara Rezaei's website](https://www.tarark.com/), using original markup, styling and Amir's own content. The links above the introduction text include the résumé, LinkedIn, GitHub, email and “old website”. They wrap on small screens. The old website (interactive résumé) opens at `/interactive` and includes education, projects with repository links, skills and experience from the current CV.

The interactive résumé uses [Shayan Pardis's original D3 implementation](https://github.com/Shayan-P/Shayan-P.github.io), under its ISC license. It lives in `src/interactive/` and is built into `public/original-portfolio/`. The `/interactive` page embeds it full-screen so its original styles and behavior remain isolated, with a link back to the homepage.

## Folder structure

```text
src/
  app/                Homepage, interactive route, page metadata and global CSS
  content/            Shared profile, projects, skills and links
  interactive/        D3 graph source, icons, styling and upstream licence
  worker/             Cloudflare Worker entry point
config/               Interactive build config and hosting metadata helper
public/               Photos, résumé, fonts, logos and social preview image
  original-portfolio/ Generated graph files; do not edit or commit
tests/                Page, graph and deployment checks
dist/                 Generated production output; do not edit or commit
  client/             Browser assets and files copied from public/
  server/             Compiled Worker, chunks and generated Wrangler config
wrangler.jsonc        Cloudflare Worker name and runtime settings
vite.config.ts        Main app build configuration
```

Standard package, TypeScript, Next and ESLint configuration stays at the repository root. `.openai/hosting.json` and the `sites()` build helper preserve the existing Sites integration; they are not Cloudflare account credentials. Public file URLs are unchanged.

## Run locally

Use Node.js 22.13 or newer (Node.js 24 LTS is a good choice).

```bash
npm ci
npm run dev
```

Then open the local address shown in your terminal.

`npm run dev` and `npm run build` automatically build the original portfolio first. While editing its source, run `npm run dev:portfolio` in a second terminal and refresh the page after changes.

## Build and check

```bash
npm run build
npm run typecheck
npm test
```

`npm test` builds both pages before running the page, graph and deployment checks. The build scripts work directly on macOS without Linux-only helper tools. This remains a Vinext/Cloudflare application, not a static HTML export.

`node_modules/`, `dist/`, `.wrangler/`, `.sites-runtime/` and `public/original-portfolio/` are ignored dependency, build and cache folders. They are not source code and should not be uploaded to GitHub. The graph rebuilds automatically before development and production builds. Keep the font, logo and graph licence notices when publishing.

## Deploy to Cloudflare Workers

Deploy this project as a **Worker with static assets**, not by uploading `public/` or `dist/client/` to Cloudflare Pages. The homepage and `/interactive` route need the compiled Worker as well as the browser assets.

### From your Mac

Run these from the repository root:

```bash
npm ci
npm run build
npm run deploy:check
npx wrangler login
npm run deploy
```

`deploy:check` is a local dry run; it does not publish. `deploy` publishes the Worker named `amir-lajevardi-portfolio` to the Cloudflare account you sign in to. Do not run it against an account with an unrelated Worker of the same name.

The deploy script uses `dist/server/wrangler.json`, generated from the root configuration. It uploads `dist/server/` and the static assets in `dist/client/` together. Keep both directories in place; do not select individual files. Wrangler does not upload the entire project, `node_modules/`, npm caches or Git history.

### From GitHub

First commit and push this reorganization to `Amirlaj/personal-website`. In Cloudflare's **Workers & Pages**, create a Worker connected to that repository and use:

| Setting | Value |
| --- | --- |
| Worker name | `amir-lajevardi-portfolio` (must match `wrangler.jsonc`) |
| Production branch | `main` |
| Root directory | Repository root (leave blank) |
| Build command | `npm run build` |
| Deploy command | `npm run deploy` |
| Build variable | `NODE_VERSION=24` |

Cloudflare installs the dependencies from `package.json` and `package-lock.json`. Keep `src/`, `config/`, `public/` source assets, `.openai/hosting.json`, the package files and root configuration in Git. Tests and this README should stay in Git too. Do not commit generated output or secrets. A Worker deployment does not use a Pages "build output directory" setting.

After the first deployment, test the generated workers.dev address before connecting your domain. For automatic deployments, future pushes to the production branch trigger a new build and deployment.

### Connect amirlajevardi.com

The domain must be an active zone in your Cloudflare account. If it is not, add it to Cloudflare and follow Cloudflare's assigned nameserver instructions at the domain registrar. Preserve existing email DNS records; the domain registration can remain at Hostinger.

Then open your Worker → **Settings → Domains & Routes → Add → Custom Domain** and enter `amirlajevardi.com`. Add `www.amirlajevardi.com` separately if wanted. Review existing website DNS records before switching; this changes which site visitors see. Cloudflare configures the custom-domain DNS and certificate. No domain or account changes are performed by the local build.

References: [Workers build settings](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/), [Vite integration](https://developers.cloudflare.com/workers/vite-plugin/get-started/), [custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).

## Update the content

- Personal details, projects, experience and links: `src/content/portfolio.ts`
- Homepage introduction: `src/app/page.tsx`
- Homepage styling: `src/app/globals.css`
- Homepage portrait: put a photo in `public/` and set `profile.portrait` to its URL (e.g. `/amir.jpg`); initials are shown until then
- Tree topics, descriptions and node pictures: `src/interactive/data.ts`
- Circle illustrations and padded brand logos: `src/interactive/node-art.ts`; assets and source credits: `public/node-art/`
- Original graph renderer and interactions: `src/interactive/visualization.ts`
- Original tooltip: `src/interactive/tooltip.ts`
- Original styling: `src/interactive/style.css`
- Page title and sharing information: `src/app/layout.tsx`
- Résumé download: `public/Amir-Lajevardi-CV.pdf`

The homepage and interactive résumé share the contact details in `profile`. Project repositories and experience entries also come from the shared content file. The central node uses `/amir-portrait.jpeg`, independently of the homepage photo; change `rootItem.picture` to use another photo.

The original author's personal content, photographs, and analytics are not used. See `src/interactive/NOTICE.md` for attribution, license and integration notes. The original interaction model is preserved, including hover-based tooltips; this is not a separate accessibility redesign.

