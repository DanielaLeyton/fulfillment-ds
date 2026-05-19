import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@fds/ui-web';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'Type something…' },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithLabel: Story = { args: { label: 'Order ID', placeholder: '#ORD-0001' } };
export const WithHelper: Story = { args: { label: 'Email', helperText: 'We will send updates here', placeholder: 'you@company.com' } };
export const WithError: Story = { args: { label: 'Email', errorText: 'Invalid email address', defaultValue: 'not-valid' } };
export const Disabled: Story = { args: { label: 'Location', defaultValue: 'Warehouse #3', disabled: true } };

export const WithIcons: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '360px' }}>
      <Input
        {...args}
        label="Search orders"
        placeholder="Search…"
        leftAddon={<SearchIcon />}
      />
      <Input
        {...args}
        label="Password"
        type="password"
        placeholder="••••••••"
        rightAddon={<EyeIcon />}
      />
    </div>
  ),
};

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
