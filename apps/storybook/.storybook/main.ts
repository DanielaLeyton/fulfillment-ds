import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'path';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@chromatic-com/storybook',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: { autodocs: 'tag' },
  viteFinal: (config) => {
    config.resolve ??= {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@fds/ui-web': resolve(__dirname, '../../../packages/ui-web/src/index.ts'),
    };
    // In pnpm workspaces, packages may live in the root node_modules — include it explicitly
    config.resolve.modules = [
      'node_modules',
      resolve(__dirname, '../../../node_modules'),
    ];
    return config;
  },
};

export default config;
