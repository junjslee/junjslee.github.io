# junjslee.github.io
A modern, interactive portfolio website built with Next.js, TypeScript, and Tailwind CSS, deployed on GitHub Pages with GitHub Actions.

## Features
- One-page structure: Home, About, Projects, Resume, Blog (Journal), Contact
- Responsive design with dark mode support
- Blog
- CI with GitHub Actions

## Setup

1. Install dependencies:
   ```bash
   npm install & npm init -y
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Build and export for production:
   ```bash
   npm run build
   ```

## Deployment
This project uses GitHub Actions to automate deployment to GitHub Pages. On every push to the main branch, the workflow builds the project, runs lint checks, and deploys the output to GitHub Pages.

## Notes
- Static Export: The Next.js configuration (`next.config.js`) is set for static export (using `next export`), which is required for GitHub Pages.
- Dependencies: Make sure to install any additional dependencies (like `react-simple-typewriter`) using `npm install`/or `yarn`.
- Customization: Feel free to fork and modify components, add more styling, or integrate additional features!


