# junjslee.github.io

<p align="center"><img width="100%" src="./public/images/portfolio.png"/></p>

A modern, interactive portfolio website built with Next.js, TypeScript, and Tailwind CSS, deployed on GitHub Pages with GitHub Actions.


## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
  - [Github Secrets](#github-secrets)
- [Deployment Options](#deployment-options)
  - [Deploy as a Project Site](#deploy-as-a-project-site)
  - [Deploy as a User Site](#deploy-as-a-user-site)
- [GitHub Actions](#github-actions)
- [Usage](#usage)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Responsive Design:** A fully responsive layout with a mobile-friendly navbar.
- **Interactive Hero Section:** Dynamic typewriter effects and background image overlays.
- **Timeline-Style Resume:** Modern presentation of experiences and education.
- **Markdown Blog System:** Easily add blog posts with excerpts and "Read More" toggles.
- **Dark Mode Support:** Automatically switch between light and dark themes.
- **CI/CD with GitHub Actions:** Automatic build and deployment to GitHub Pages.
- **Customizable:** Easily modify sections, colors, typography, and more.

## Installation
1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/junjslee.github.io.git
   cd junjslee.github.io
   ```
2. **Install Dependencies:**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm init -y && npm install
   ```
3. **Run in Development Mode:**
   ```bash
   npm run dev
   ```
   The app will be available at http://localhost:3000.

## Configuration
### Github Secrets
When deploying via GitHub Actions, add any sensitive environment variables as repository secrets:
- Go to your repository on GitHub.
- Navigate to Settings > Secrets and variables > Actions.
- Click New repository secret and add secrets like EMAILJS_USER_ID.

## Deployment Options
Two GitHub Pages deployment options:
### Deploy as a Project Site
- URL Structure:
   - Your site will be available at https://yourusername.github.io/repository-name.
- Configuration:
   - In next.config.js, you should set a basePath and assetPrefix:
   ```js
   // next.config.js (for project site deployment)
   const isProd = process.env.NODE_ENV === 'production';

   const nextConfig = {
   reactStrictMode: true,
   output: 'export',
   trailingSlash: true,
   basePath: isProd ? '/your-repo-name' : '',
   assetPrefix: isProd ? '/your-repo-name/' : '',
   };
   module.exports = nextConfig;
   ```
### Deploy as a User Site
- URL Structure
   - Rename the repository to yourusername.github.io so your site is available at https://yourusername.github.io.
- Configuration:
   - Remove or conditionally disable basePath and assetPrefix in next.config.js:
   ```js
   // next.config.js (for user site deployment)
   const nextConfig = {
   reactStrictMode: true,
   output: 'export',
   trailingSlash: true,
   basePath: '',
   assetPrefix: '',
   };
   module.exports = nextConfig;
   ```
## Github Actions
This repository includes a GitHub Actions workflow (.github/workflows/nextjs.yml) that automatically builds and deploys your site when you push to the main branch.

Ensure the workflow’s configuration matches your deployment option and that any necessary secrets are configured.

## Usage
After installation and configuration:
- Run npm run dev for local development.
- Run npm run build to generate static files in the out folder.
- Push changes to trigger GitHub Actions for automatic deployment.

## Customization
Feel free to modify the following:
- Content: Update the text in Hero.tsx, AboutSection.tsx, ResumeSection.tsx, etc.
- Styling: Modify Tailwind CSS classes in your components or update the theme in tailwind.config.js.
- Components: Add or remove sections as needed.
- Environment Variables: Adjust or add new variables for additional services.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request if you have suggestions or improvements.

## License
This project is licensed under the MIT License.




