// next.config.js
/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Enables static HTML export
  trailingSlash: true,
   // Set basePath and assetPrefix so that all asset URLs are prefixed correctly.
   // If you’re deploying your site as a project site (for example, at https://username.github.io/junlee.io/ rather than a user site at https://username.github.io/), 
   // your site is served from a subdirectory. This means that an image reference like /images/hero.jpg will point to 
   // https://username.github.io/images/hero.jpg instead of https://username.github.io/junlee.io/images/hero.jpg
   basePath: isProd ? '/junlee.io' : '',
   assetPrefix: isProd ? '/junlee.io/' : '',
};

module.exports = nextConfig;
