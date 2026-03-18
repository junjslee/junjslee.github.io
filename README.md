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

The contact window uses EmailJS when these environment variables are present:

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_USER_ID`

If they are missing, the form falls back to a prefilled `mailto:` draft.
