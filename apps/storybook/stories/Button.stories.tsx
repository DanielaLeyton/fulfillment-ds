import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@fds/ui-web';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Primary action element. Renders with Brand A (blue, rectangular) or Brand B (coral, pill-shaped) tokens automatically via ThemeProvider — toggle the **Brand** selector in the toolbar to see the difference.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: { children: 'Button Label', variant: 'primary', size: 'md' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Danger: Story = { args: { variant: 'danger' } };

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
};

export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };

export const AllVariants: Story = {
  name: 'All Variants (Brand comparison)',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
        Switch Brand in the toolbar — all button shapes and colors update instantly from tokens.
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {(['primary', 'secondary', 'ghost', 'danger'] as const).map((v) => (
          <Button key={v} {...args} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {(['primary', 'secondary', 'ghost'] as const).map((v) => (
          <Button key={v} {...args} variant={v} loading>Loading…</Button>
        ))}
      </div>
    </div>
  ),
};
