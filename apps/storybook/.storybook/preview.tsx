import type { Preview, Decorator } from '@storybook/react';
import { ThemeProvider } from '@fds/ui-web';

const withTheme: Decorator = (Story, context) => {
  const brand = context.globals['brand'] ?? 'brand-a';
  return (
    <ThemeProvider brand={brand}>
      <div style={{ padding: '24px', minHeight: '100vh' }}>
        <Story />
      </div>
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    brand: {
      name: 'Brand',
      description: 'Switch between Brand A (Warehouse) and Brand B (Last Mile)',
      defaultValue: 'brand-a',
      toolbar: {
        icon: 'paintbrush',
        title: 'Brand',
        items: [
          { value: 'brand-a', title: 'Brand A — Warehouse Ops', icon: 'box' },
          { value: 'brand-b', title: 'Brand B — Last Mile',     icon: 'lightning' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: { matchers: { color: /(color|background)$/i } },
    backgrounds: { disable: true },
    layout: 'fullscreen',
  },
};

export default preview;
