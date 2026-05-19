import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, Badge, Card, DataTable, Input, Modal, Sidebar, Topbar, useTheme } from '@fds/ui-web';
import type { Column } from '@fds/ui-web';

interface Order {
  id: string;
  customer: string;
  status: string;
  driver: string;
  items: number;
  total: string;
}

const ORDERS: Order[] = [
  { id: 'ORD-001', customer: 'Mercadona Valencia',  status: 'Delivered',  driver: 'Carlos M.',   items: 12, total: '$348.50' },
  { id: 'ORD-002', customer: 'El Corte Inglés',     status: 'In Transit', driver: 'Ana P.',      items: 4,  total: '$92.00'  },
  { id: 'ORD-003', customer: 'Carrefour Madrid',    status: 'Assigned',   driver: 'Unassigned',  items: 28, total: '$1,204.00' },
  { id: 'ORD-004', customer: 'Eroski Bilbao',       status: 'Failed',     driver: 'Luis R.',     items: 7,  total: '$215.75' },
  { id: 'ORD-005', customer: 'Lidl Barcelona',      status: 'Draft',      driver: 'Unassigned',  items: 3,  total: '$67.20'  },
];

const STATUS_V: Record<string, 'default' | 'info' | 'warning' | 'success' | 'danger'> = {
  Draft: 'default', Assigned: 'info', 'In Transit': 'warning', Delivered: 'success', Failed: 'danger',
};

const NAV_ITEMS = [
  { label: 'Dashboard',  active: false, icon: <GridIcon /> },
  { label: 'Orders',     active: true,  icon: <BoxIcon />, badge: 12 },
  { label: 'Drivers',    active: false, icon: <TruckIcon /> },
  { label: 'Reports',    active: false, icon: <ChartIcon /> },
  { label: 'Settings',   active: false, icon: <GearIcon /> },
];

function DashboardContent() {
  const { tokens } = useTheme();
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = ORDERS.filter(
    (o) =>
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()),
  );

  const COLUMNS: Column<Order>[] = [
    { key: 'id',       header: 'Order ID',  sortable: true, width: '100px' },
    { key: 'customer', header: 'Customer',  sortable: true },
    { key: 'driver',   header: 'Driver',    sortable: true },
    { key: 'status',   header: 'Status',    render: (r) => <Badge variant={STATUS_V[r.status]} dot>{r.status}</Badge> },
    { key: 'items',    header: 'Items',     sortable: true, align: 'right', width: '70px' },
    { key: 'total',    header: 'Total',     sortable: true, align: 'right', width: '100px' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
        {[
          { label: 'Total Orders',    value: '1,248', delta: '+12%',  good: true  },
          { label: 'Delivered Today', value: '342',   delta: '+8%',   good: true  },
          { label: 'In Transit',      value: '87',    delta: '0%',    good: null  },
          { label: 'Failed',          value: '14',    delta: '+3%',   good: false },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <div style={{ fontSize: '12px', color: tokens.colorTextSecondary, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>{kpi.label}</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: tokens.colorTextPrimary }}>{kpi.value}</div>
            <div style={{ fontSize: '12px', marginTop: '4px', color: kpi.good === null ? tokens.colorTextTertiary : kpi.good ? '#1aab55' : '#e53535' }}>
              {kpi.delta} vs last week
            </div>
          </Card>
        ))}
      </div>

      {/* Orders table */}
      <Card
        title="Recent Orders"
        subtitle="Click a row to view details"
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: tokens.colorTextTertiary }}>Showing {filtered.length} of {ORDERS.length} orders</span>
            <Button variant="ghost" size="sm">Export CSV</Button>
          </div>
        }
        noPadding
      >
        <div style={{ padding: '12px 20px' }}>
          <Input
            placeholder="Search by order ID or customer…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftAddon={<SearchIcon />}
          />
        </div>
        <DataTable columns={COLUMNS} data={filtered} onRowClick={setSelectedOrder} />
      </Card>

      {/* Order detail modal */}
      <Modal
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`Order ${selectedOrder?.id}`}
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(null)}>Close</Button>
            <Button variant="primary" size="sm">Reassign Driver</Button>
          </>
        }
      >
        {selectedOrder && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                ['Customer',    selectedOrder.customer],
                ['Driver',      selectedOrder.driver],
                ['Items',       String(selectedOrder.items)],
                ['Total',       selectedOrder.total],
              ].map(([k, v]) => (
                <div key={k} style={{ padding: '12px', background: tokens.colorSurfaceSunken, borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', color: tokens.colorTextTertiary, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{k}</div>
                  <div style={{ fontSize: '15px', fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: tokens.colorTextSecondary }}>Status:</span>
              <Badge variant={STATUS_V[selectedOrder.status]} dot>{selectedOrder.status}</Badge>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function SidebarLayout() {
  const { tokens } = useTheme();
  return (
    <div style={{ display: 'flex', height: '100vh', background: tokens.colorSurfaceSunken }}>
      <Sidebar items={NAV_ITEMS} userName="Admin User" />
      <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        <h1 style={{ margin: '0 0 24px', fontSize: '22px', fontWeight: 700, color: tokens.colorTextPrimary }}>Orders</h1>
        <DashboardContent />
      </main>
    </div>
  );
}

function TopbarLayout() {
  const { tokens } = useTheme();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: tokens.colorSurfaceSunken }}>
      <Topbar items={NAV_ITEMS} userName="Admin User" />
      <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        <h1 style={{ margin: '0 0 24px', fontSize: '22px', fontWeight: 700, color: tokens.colorTextPrimary }}>Orders</h1>
        <DashboardContent />
      </main>
    </div>
  );
}

const meta = {
  title: 'Demos/Dashboard Preview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Full dashboard preview. **Toggle Brand in the toolbar** — Brand A gets a sidebar nav + blue palette; Brand B gets a topbar nav + coral palette. Same components, same data, two identities.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BrandA: Story = {
  name: 'Brand A — Warehouse Ops (Sidebar)',
  decorators: [
    (Story, ctx) => {
      ctx.globals['brand'] = 'brand-a';
      return <Story />;
    },
  ],
  render: () => <SidebarLayout />,
};

export const BrandB: Story = {
  name: 'Brand B — Last Mile (Topbar)',
  decorators: [
    (Story, ctx) => {
      ctx.globals['brand'] = 'brand-b';
      return <Story />;
    },
  ],
  render: () => <TopbarLayout />,
};

export const LiveToggle: Story = {
  name: 'Live Brand Toggle (use toolbar)',
  render: () => {
    const { tokens } = useTheme();
    const navStyle = tokens.brandNavStyle;
    return navStyle === 'sidebar' ? <SidebarLayout /> : <TopbarLayout />;
  },
};

// Icons
function GridIcon()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>; }
function BoxIcon()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>; }
function TruckIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><path d="m16 8 5 0 3 3v5h-8V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>; }
function ChartIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>; }
function GearIcon()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>; }
function SearchIcon(){ return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>; }
