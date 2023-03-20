const { i18n } = require('./next-i18next.config.js');
const path = require('path');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    transpilePackages: ['ui', 'modules'],
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  i18n,
};
