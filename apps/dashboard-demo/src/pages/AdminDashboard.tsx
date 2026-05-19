import { useState } from 'react';
import {
  useTheme,
  Button,
  Badge,
  Card,
  DataTable,
  Input,
  Modal,
  ConfirmModal,
  Sidebar,
  Topbar,
} from '@fds/ui-web';
import type { Column } from '@fds/ui-web';

interface Order {
  id: string;
  customer: string;
  status: string;
  driver: string;
  items: number;
  total: string;
  eta: string;
}

const ORDERS: Order[] = [
  { id: 'ORD-001', customer: 'Mercadona Valencia',  status: 'Delivered',  driver: 'Carlos M.',   items: 12, total: '$348.50',   eta: '—'         },
  { id: 'ORD-002', customer: 'El Corte Inglés',     status: 'In Transit', driver: 'Ana P.',      items: 4,  total: '$92.00',    eta: '14:35'     },
  { id: 'ORD-003', customer: 'Carrefour Madrid',    status: 'Assigned',   driver: 'Unassigned',  items: 28, total: '$1,204.00', eta: '15:10'     },
  { id: 'ORD-004', customer: 'Eroski Bilbao',       status: 'Failed',     driver: 'Luis R.',     items: 7,  total: '$215.75',   eta: '—'         },
  { id: 'ORD-005', customer: 'Lidl Barcelona',      status: 'Draft',      driver: 'Unassigned',  items: 3,  total: '$67.20',    eta: 'Pending'   },
  { id: 'ORD-006', customer: 'Dia Supermercados',   status: 'Delivered',  driver: 'Marta F.',    items: 19, total: '$543.00',   eta: '—'         },
  { id: 'ORD-007', customer: 'Simply Zaragoza',     status: 'In Transit', driver: 'Pedro L.',    items: 9,  total: '$187.50',   eta: '15:45'     },
];

const STATUS_V: Record<string, 'default' | 'info' | 'warning' | 'success' | 'danger'> = {
  Draft: 'default', Assigned: 'info', 'In Transit': 'warning', Delivered: 'success', Failed: 'danger',
};

const NAV_ITEMS = [
  { label: 'Dashboard',  active: false, icon: <GridIcon /> },
  { label: 'Orders',     active: true,  icon: <BoxIcon />,   badge: 7 },
  { label: 'Drivers',    active: false, icon: <TruckIcon /> },
  { label: 'Warehouses', active: false, icon: <BuildingIcon /> },
  { label: 'Reports',    active: false, icon: <ChartIcon /> },
  { label: 'Settings',   active: false, icon: <GearIcon /> },
];

const KPIS = [
  { label: 'Total Orders',    value: '1,248', delta: '+12%', good: true  },
  { label: 'Delivered Today', value: '342',   delta: '+8%',  good: true  },
  { label: 'In Transit',      value: '87',    delta: '0%',   good: null  },
  { label: 'Failed',          value: '14',    delta: '+3%',  good: false },
];

export function AdminDashboard() {
  const { tokens } = useTheme();
  const isSidebar = tokens.brandNavStyle === 'sidebar';

  const content = (
    <MainContent />
  );

  if (isSidebar) {
    return (
      <div style={{ display: 'flex', height: '100vh', background: tokens.colorSurfaceSunken }}>
        <Sidebar items={NAV_ITEMS} userName="Admin User" />
        <main style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>
          <PageHeader title="Orders" />
          {content}
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: tokens.colorSurfaceSunken }}>
      <Topbar items={NAV_ITEMS} userName="Admin User" />
      <main style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>
        <PageHeader title="Orders" />
        {content}
      </main>
    </div>
  );
}

function PageHeader({ title }: { title: string }) {
  const { tokens } = useTheme();
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: tokens.colorTextPrimary }}>{title}</h1>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: tokens.colorTextSecondary }}>
          Manage and track all fulfillment orders
        </p>
      </div>
      <Button variant="primary">+ New Order</Button>
    </div>
  );
}

function MainContent() {
  const { tokens } = useTheme();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Order | null>(null);
  const [cancelTarget, setCancelTarget] = useState<Order | null>(null);

  const filtered = ORDERS.filter(
    (o) =>
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.driver.toLowerCase().includes(search.toLowerCase()),
  );

  const COLUMNS: Column<Order>[] = [
    { key: 'id',       header: 'Order',    sortable: true, width: '100px' },
    { key: 'customer', header: 'Customer', sortable: true },
    { key: 'driver',   header: 'Driver',   sortable: true },
    {
      key: 'status', header: 'Status',
      render: (r) => <Badge variant={STATUS_V[r.status]} dot>{r.status}</Badge>,
    },
    { key: 'items',  header: 'Items', sortable: true, align: 'right', width: '70px' },
    { key: 'total',  header: 'Total', sortable: true, align: 'right', width: '100px' },
    { key: 'eta',    header: 'ETA',   width: '90px' },
    {
      key: 'actions', header: '',
      render: (r) => (
        <div style={{ display: 'flex', gap: '6px' }}>
          <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setSelected(r); }}>
            View
          </Button>
          {r.status !== 'Delivered' && r.status !== 'Failed' && (
            <Button size="sm" variant="danger" onClick={(e) => { e.stopPropagation(); setCancelTarget(r); }}>
              Cancel
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {KPIS.map((kpi) => (
          <Card key={kpi.label}>
            <div style={{ fontSize: '11px', color: tokens.colorTextSecondary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
              {kpi.label}
            </div>
            <div style={{ fontSize: '30px', fontWeight: 700, color: tokens.colorTextPrimary, lineHeight: 1 }}>{kpi.value}</div>
            <div style={{ fontSize: '12px', marginTop: '8px', color: kpi.good === null ? tokens.colorTextTertiary : kpi.good ? '#1aab55' : '#e53535' }}>
              {kpi.delta} vs last week
            </div>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card
        title="All Orders"
        noPadding
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: tokens.colorTextTertiary }}>
              {filtered.length} of {ORDERS.length} orders
            </span>
            <Button variant="ghost" size="sm">Export CSV</Button>
          </div>
        }
      >
        <div style={{ padding: '16px 20px' }}>
          <Input
            placeholder="Search orders, customers, drivers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftAddon={<SearchIcon />}
          />
        </div>
        <DataTable
          columns={COLUMNS}
          data={filtered}
          onRowClick={setSelected}
          emptyText="No orders match your search"
        />
      </Card>

      {/* Order detail modal */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={`Order ${selected?.id}`}
        size="md"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>Close</Button>
            {selected?.status !== 'Delivered' && selected?.status !== 'Failed' && (
              <Button variant="primary" size="sm">Reassign Driver</Button>
            )}
          </>
        }
      >
        {selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Badge variant={STATUS_V[selected.status]} dot size="md">{selected.status}</Badge>
              {selected.eta !== '—' && selected.eta !== 'Pending' && (
                <span style={{ fontSize: '13px', color: tokens.colorTextSecondary }}>ETA: {selected.eta}</span>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                ['Customer',    selected.customer],
                ['Driver',      selected.driver],
                ['Items',       String(selected.items)],
                ['Total Value', selected.total],
              ].map(([k, v]) => (
                <div key={k} style={{ padding: '14px', background: tokens.colorSurfaceSunken, borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', color: tokens.colorTextTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{k}</div>
                  <div style={{ fontSize: '15px', fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '14px', background: tokens.colorBrandPrimarySubtle, borderRadius: '10px' }}>
              <div style={{ fontSize: '12px', color: tokens.colorBrandPrimary, fontWeight: 600, marginBottom: '4px' }}>FULFILLMENT NOTE</div>
              <div style={{ fontSize: '13px', color: tokens.colorTextPrimary }}>
                Standard delivery window. Contact driver for real-time location updates.
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Cancel confirm */}
      <ConfirmModal
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={() => setCancelTarget(null)}
        title="Cancel Order"
        message={`Are you sure you want to cancel order ${cancelTarget?.id} for ${cancelTarget?.customer}? This action cannot be undone.`}
        confirmLabel="Yes, Cancel Order"
        danger
      />
    </div>
  );
}

// Icons
function GridIcon()     { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>; }
function BoxIcon()      { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>; }
function TruckIcon()    { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><path d="m16 8 5 0 3 3v5h-8V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>; }
function BuildingIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>; }
function ChartIcon()    { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>; }
function GearIcon()     { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>; }
function SearchIcon()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>; }
