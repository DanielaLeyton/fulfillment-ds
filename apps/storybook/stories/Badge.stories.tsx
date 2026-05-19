import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@fds/ui-web';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
      {(['default', 'primary', 'success', 'warning', 'danger', 'info'] as const).map((v) => (
        <Badge key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Badge>
      ))}
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="success" dot>Active</Badge>
      <Badge variant="warning" dot>Pending</Badge>
      <Badge variant="danger" dot>Failed</Badge>
      <Badge variant="default" dot>Idle</Badge>
    </div>
  ),
};

export const OrderStatuses: Story = {
  name: 'Fulfillment Order Statuses',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>Typical order lifecycle statuses:</p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Badge variant="default" dot>Draft</Badge>
        <Badge variant="info" dot>Assigned</Badge>
        <Badge variant="warning" dot>In Transit</Badge>
        <Badge variant="success" dot>Delivered</Badge>
        <Badge variant="danger" dot>Failed</Badge>
      </div>
    </div>
  ),
};
