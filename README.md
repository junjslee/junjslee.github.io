# junjslee.github.io

Personal website built in Next.js and styled as a Windows XP desktop.

## Requirements

- Node.js 20+
- npm

## Local Development

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev -- --hostname 127.0.0.1 --port 3002
```

Open `http://127.0.0.1:3002`.

## Production Build

Build the static site:

```bash
npm run build
```

Preview the exported output locally:

```bash
python3 -m http.server 3001 -d out
```

Open `http://127.0.0.1:3001`.

## Deployment

This repository deploys to GitHub Pages through [`.github/workflows/nextjs.yml`](./.github/workflows/nextjs.yml) whenever `main` is updated.

## Contact Form

The contact window composes a prefilled `mailto:` draft and hands it to the visitor's own mail
client. Nothing is sent from the page and there is no send service or API key — a static export
has nowhere to hold a secret. Changing that would mean adding a hosted endpoint, not an
environment variable.
