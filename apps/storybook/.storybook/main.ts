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
  previewHead: (head) => `
    ${head}
    <script>
      !function(){
        var apiHost="https://app.formbricks.com";
        var t=document.createElement("script");
        t.type="text/javascript";t.async=!0;
        t.src=apiHost+"/js/formbricks.umd.cjs";
        t.onload=function(){
          var fb=window.formbricks;
          if(!fb) return;
          var envId="${process.env.VITE_FORMBRICKS_ENV_ID || ''}";
          if(fb.setup) fb.setup({environmentId:envId,appUrl:apiHost});
          else if(fb.init) fb.init({environmentId:envId,apiHost:apiHost});
        };
        document.head.appendChild(t);
      }();
    </script>
  `,
  viteFinal: (config) => {
    config.resolve ??= {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@fds/ui-web': resolve(__dirname, '../../../packages/ui-web/src/index.ts'),
    };
    return config;
  },
};

export default config;
