# Amir Lajevardi — Personal Portfolio

A simple introduction page, with a portrait-and-text layout inspired by [Tara Rezaei's website](https://www.tarark.com/), using original markup, styling and Amir's own content. A single row above the introduction text contains the résumé, LinkedIn, email and “old website” links. The old website (interactive résumé) opens at `/interactive`.

The interactive résumé uses [Shayan Pardis's original D3 implementation](https://github.com/Shayan-P/Shayan-P.github.io), under its ISC license. It lives in `original-portfolio/` and is built into `public/original-portfolio/`. The `/interactive` page embeds it full-screen so its original styles and behavior remain isolated, with a link back to the homepage.

## Run locally

You need Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Then open the local address shown in your terminal.

`npm run dev` and `npm run build` automatically build the original portfolio first. While editing its source, run `npm run dev:portfolio` in a second terminal and refresh the page after changes.

## Update the content

- Personal details, projects and links: `app/portfolio-data.ts`
- Homepage introduction: `app/page.tsx`
- Homepage styling: `app/globals.css`
- Homepage portrait: put a photo in `public/` and set `profile.portrait` to its URL (e.g. `/amir.jpg`); initials are shown until then
- Tree topics, descriptions and node pictures: `original-portfolio/src/data.ts`
- Circle illustrations and padded brand logos: `original-portfolio/src/node-art.ts`; assets and source credits: `public/node-art/`
- Original graph renderer and interactions: `original-portfolio/src/visualization.ts`
- Original tooltip: `original-portfolio/src/tooltip.ts`
- Original styling: `original-portfolio/style.css`
- Page title and sharing information: `app/layout.tsx`
- Résumé download: `public/Amir-Lajevardi-CV.pdf`

The GitHub profile URL is currently empty and is not displayed. Setting `profile.github` adds it to the contact branch automatically. The central node uses `/amir-portrait.jpeg`, independently of the homepage photo; change `rootItem.picture` to use another photo.

The original author's personal content, photographs, and analytics are not used. See `original-portfolio/NOTICE.md` for attribution, license and integration notes. The original interaction model is preserved, including hover-based tooltips; this is not a separate accessibility redesign.

