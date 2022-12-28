module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-postcss',
  ],
  webpackFinal: async (config) => {
    config.node = { fs: 'empty' }; // this solved the "Module not found: Error: Can't resolve 'fs'"
    return config;
  },
  staticDirs: ['../public'],
};
