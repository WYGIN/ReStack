import { StorybookConfig } from 'storybook-framework-qwik';

const config: StorybookConfig = {
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-a11y', '@storybook/addon-storysource', {
    name: '@storybook/addon-styling',
    options: {
      // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
      // For more details on this addon's options.
      postCss: true,
    },
  },],
  framework: {
    name: 'storybook-framework-qwik',
  },
  core: {
    renderer: 'storybook-framework-qwik',
  },
  stories: [
    // ...rootMain.stories,
    '../src/components/**/*.stories.mdx',
    '../src/components/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  /*viteFinal: async (config: any) => {
    return config;
  },*/
};

export default config;
