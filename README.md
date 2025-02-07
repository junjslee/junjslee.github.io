# junlee.io
A modern, interactive portfolio website built with Next.js and Tailwind CSS, deployed on GitHub Pages with GitHub Actions.

## Features
- Multi-page structure: Home, About, Projects, Resume, Blog, Contact
- Responsive design with dark mode support
- Markdown-based blog
- CI with GitHub Actions

## Setup

1. Install dependencies:
   ```bash
   npm install
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
- **Static Export:** The Next.js configuration (`next.config.js`) is set for static export (using `next export`), which is required for GitHub Pages.
- **Dependencies:** Make sure to install any additional dependencies (like `react-simple-typewriter`) using `npm install` or `yarn`.
- **Customization:** Feel free to expand or modify components, add more styling, or integrate additional features as you learn and grow in full stack development.


