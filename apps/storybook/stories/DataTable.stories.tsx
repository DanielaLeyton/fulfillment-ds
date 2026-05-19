import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, Badge } from '@fds/ui-web';
import type { Column } from '@fds/ui-web';

interface Order {
  id: string;
  customer: string;
  status: string;
  items: number;
  total: string;
  created: string;
}

const SAMPLE_ORDERS: Order[] = [
  { id: 'ORD-001', customer: 'Mercadona Valencia',  status: 'Delivered',  items: 12, total: '$348.50', created: '2024-05-18' },
  { id: 'ORD-002', customer: 'El Corte Inglés',     status: 'In Transit', items: 4,  total: '$92.00',  created: '2024-05-18' },
  { id: 'ORD-003', customer: 'Carrefour Madrid',    status: 'Assigned',   items: 28, total: '$1,204.00',created: '2024-05-17' },
  { id: 'ORD-004', customer: 'Eroski Bilbao',       status: 'Failed',     items: 7,  total: '$215.75', created: '2024-05-17' },
  { id: 'ORD-005', customer: 'Lidl Barcelona',      status: 'Draft',      items: 3,  total: '$67.20',  created: '2024-05-16' },
  { id: 'ORD-006', customer: 'Dia Supermercados',   status: 'Delivered',  items: 19, total: '$543.00', created: '2024-05-16' },
];

const STATUS_VARIANT: Record<string, 'default' | 'info' | 'warning' | 'success' | 'danger'> = {
  Draft: 'default', Assigned: 'info', 'In Transit': 'warning', Delivered: 'success', Failed: 'danger',
};

const COLUMNS: Column<Order>[] = [
  { key: 'id',       header: 'Order ID',  sortable: true, width: '110px' },
  { key: 'customer', header: 'Customer',  sortable: true },
  { key: 'status',   header: 'Status',    render: (r) => <Badge variant={STATUS_VARIANT[r.status]} dot>{r.status}</Badge> },
  { key: 'items',    header: 'Items',     sortable: true, align: 'right', width: '70px' },
  { key: 'total',    header: 'Total',     sortable: true, align: 'right', width: '100px' },
  { key: 'created',  header: 'Date',      sortable: true, width: '110px' },
];

const meta = {
  title: 'Components/DataTable',
  component: DataTable<Order>,
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable<Order>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OrdersTable: Story = {
  name: 'Orders Table',
  render: () => <DataTable columns={COLUMNS} data={SAMPLE_ORDERS} onRowClick={(r) => alert(`Clicked: ${r.id}`)} />,
};

export const Loading: Story = {
  render: () => <DataTable columns={COLUMNS} data={[]} loading />,
};

export const Empty: Story = {
  render: () => <DataTable columns={COLUMNS} data={[]} emptyText="No orders match your filters" />,
};
