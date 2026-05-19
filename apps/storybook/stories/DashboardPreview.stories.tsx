import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Badge, Card, DataTable, Input, Modal, Sidebar, Topbar, useTheme } from '@fds/ui-web';
import type { Column } from '@fds/ui-web';

// ── Conductores data (Brand A) ───────────────────────────────────────────────
interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  plate: string;
  courier: string;
  status: 'En ruta' | 'Disponible' | 'No disponible';
}

const DRIVERS: Driver[] = [
  { id: 'd1', name: 'Francisco Aguayo',      email: 'faguayo@gmail.com',      phone: '+56956186039', plate: 'DDHI88', courier: 'Boosmap',  status: 'En ruta' },
  { id: 'd2', name: 'Ronald Vezga',          email: 'ronaldvezga@gmail.com',  phone: '+56956186039', plate: 'ABCC09', courier: 'Touch',    status: 'En ruta' },
  { id: 'd3', name: 'Héctor Biminchumo B.',  email: 'hbbellido@gmail.com',    phone: '+56956186039', plate: 'JKCD17', courier: 'Kowski',   status: 'No disponible' },
  { id: 'd4', name: 'Douglas Barraza',       email: 'dbarraza@gmail.com',     phone: '+56956186039', plate: 'NHDY84', courier: 'Boosmap',  status: 'Disponible' },
  { id: 'd5', name: 'Kevin Aceituno',        email: 'kevinaceituno@gmail.com',phone: '+56956186039', plate: 'JJ6583', courier: 'Lo Llevo', status: 'En ruta' },
];

// ── Orders data (Brand B) ────────────────────────────────────────────────────
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
  { id: 'ORD-001', customer: 'Jumbo La Dehesa',    status: 'Delivered',  driver: 'Miguel L.',   items: 12, total: '$348.50',   eta: '—'     },
  { id: 'ORD-002', customer: 'Jumbo Providencia',  status: 'In Transit', driver: 'Ana P.',      items: 4,  total: '$92.00',    eta: '14:35' },
  { id: 'ORD-003', customer: 'Jumbo Las Condes',   status: 'Assigned',   driver: 'Unassigned',  items: 28, total: '$1,204.00', eta: '15:10' },
  { id: 'ORD-004', customer: 'Jumbo Maipú',        status: 'Failed',     driver: 'Luis R.',     items: 7,  total: '$215.75',   eta: '—'     },
  { id: 'ORD-005', customer: 'Jumbo Ñuñoa',        status: 'Draft',      driver: 'Unassigned',  items: 3,  total: '$67.20',    eta: 'Pending' },
];

const STATUS_V: Record<string, 'default' | 'info' | 'warning' | 'success' | 'danger'> = {
  Draft: 'default', Assigned: 'info', 'In Transit': 'warning', Delivered: 'success', Failed: 'danger',
};

const NAV_ITEMS_A = [
  { label: 'Dashboard',    active: false, icon: <GridIcon /> },
  { label: 'Rutas',        active: false, icon: <RouteIcon /> },
  { label: 'Conductores',  active: true,  icon: <TruckIcon />, badge: 3 },
  { label: 'Reportes',     active: false, icon: <ChartIcon />, newBadge: true },
  { label: 'Ajustes',      active: false, icon: <GearIcon /> },
];

const NAV_ITEMS_B = [
  { label: 'Dashboard', active: false, icon: <GridIcon /> },
  { label: 'Orders',    active: true,  icon: <BoxIcon />, badge: 7 },
  { label: 'Drivers',   active: false, icon: <TruckIcon /> },
  { label: 'Reports',   active: false, icon: <ChartIcon />, newBadge: true },
  { label: 'Settings',  active: false, icon: <GearIcon /> },
];

// ── Brand A: Shipping layout ─────────────────────────────────────────────────
function BrandAShippingLayout() {
  const { tokens } = useTheme();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Driver | null>(null);

  const filtered = DRIVERS.filter(
    (d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.plate.toLowerCase().includes(search.toLowerCase()),
  );

  const COLUMNS: Column<Driver>[] = [
    { key: 'name',    header: 'Nombre completo', sortable: true },
    { key: 'email',   header: 'Usuario',         sortable: true },
    { key: 'phone',   header: 'Teléfono',        width: '130px' },
    { key: 'plate',   header: 'Placa',           width: '90px' },
    { key: 'courier', header: 'Courier',         sortable: true, width: '100px' },
    {
      key: 'status', header: 'Estado',
      render: (r) => {
        const cfg = {
          'En ruta':       { color: tokens.colorBrandPrimary,  bg: tokens.colorBrandPrimarySubtle },
          'Disponible':    { color: '#047E48',                  bg: '#E8F6EE' },
          'No disponible': { color: '#D72A22',                  bg: '#FFF2F2' },
        }[r.status] ?? { color: tokens.colorTextTertiary, bg: tokens.colorSurfaceEmphasis };
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 9px', borderRadius: '9999px', background: cfg.bg, color: cfg.color, fontSize: '12px', fontWeight: 600 }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: cfg.color }} />
            {r.status}
          </span>
        );
      },
    },
    {
      key: 'actions', header: '',
      render: (r) => (
        <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setSelected(r); }}>Ver</Button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: tokens.fontFamilySans }}>
      {/* Brand A header */}
      <header style={{
        display: 'flex', alignItems: 'center', height: '56px', padding: '0 20px',
        background: '#ffffff', borderBottom: `1px solid ${tokens.colorBorderDefault}`, gap: '16px', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '8px' }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: tokens.colorBrandPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TruckIconWhite />
          </div>
          <span style={{ fontSize: '15px', fontWeight: 800, color: tokens.colorBrandPrimary }}>Shipping</span>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1 }}>
          {['Shipping', 'Transporte', 'Conductores'].map((crumb, i, arr) => (
            <React.Fragment key={crumb}>
              <span style={{ fontSize: '13px', color: i < arr.length - 1 ? tokens.colorBrandPrimary : tokens.colorTextSecondary, fontWeight: i === 0 ? 600 : 400 }}>{crumb}</span>
              {i < arr.length - 1 && <ChevronRight color={tokens.colorTextTertiary} />}
            </React.Fragment>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {['Chile', 'Jumbo', 'ESP'].map((c) => (
            <span key={c} style={{ padding: '3px 10px', borderRadius: '9999px', background: tokens.colorSurfaceEmphasis, fontSize: '11px', fontWeight: 600, color: tokens.colorTextPrimary }}>{c}</span>
          ))}
          <BellIcon color={tokens.colorTextSecondary} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: tokens.colorBrandPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#fff' }}>DG</div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: tokens.colorTextPrimary, lineHeight: 1.2 }}>¡Hola Diego!</div>
              <div style={{ fontSize: '10px', color: tokens.colorTextTertiary }}>Mi cuenta</div>
            </div>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar items={NAV_ITEMS_A} />
        <main style={{ flex: 1, overflowY: 'auto', background: '#ffffff' }}>
          {/* Page title + tabs */}
          <div style={{ padding: '24px 28px 0' }}>
            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: tokens.colorTextPrimary }}>Transporte</h1>
            <div style={{ display: 'flex', marginTop: '16px', borderBottom: `2px solid ${tokens.colorBorderDefault}` }}>
              {['Rutas', 'Vehículos', 'Conductores 5.365'].map((tab, i) => (
                <div key={tab} style={{
                  padding: '10px 16px', fontSize: '14px', cursor: 'pointer',
                  fontWeight: i === 2 ? 700 : 400,
                  color: i === 2 ? tokens.colorBrandPrimary : tokens.colorTextSecondary,
                  borderBottom: `2px solid ${i === 2 ? tokens.colorBrandPrimary : 'transparent'}`,
                  marginBottom: '-2px',
                }}>
                  {tab}
                </div>
              ))}
            </div>
          </div>

          {/* Toolbar */}
          <div style={{ padding: '14px 28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '260px' }}>
              <Input placeholder="Buscar por nombre o placa" value={search} onChange={(e) => setSearch(e.target.value)} leftAddon={<SearchIcon />} />
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '7px 12px', borderRadius: '6px', border: `1px solid ${tokens.colorBorderDefault}`, background: '#fff', cursor: 'pointer', fontSize: '13px', color: tokens.colorTextSecondary, fontFamily: 'inherit' }}>
              <FilterIcon /> Más filtros
            </button>
            <div style={{ flex: 1 }} />
            <Button variant="primary" size="sm">Crear conductor</Button>
          </div>

          {/* Table */}
          <div style={{ padding: '0 28px 28px' }}>
            <DataTable columns={COLUMNS} data={filtered} onRowClick={setSelected} emptyText="Sin resultados" />
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 28px', borderTop: `1px solid ${tokens.colorBorderDefault}`, background: '#fff' }}>
            <span style={{ fontSize: '13px', color: tokens.colorTextSecondary }}>Mostrando 10 de lista de 5.365</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {['01', '02', '03', '...', '20'].map((p) => (
                <span key={p} style={{ width: '30px', height: '30px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', border: `1px solid ${p === '02' ? tokens.colorBrandPrimary : tokens.colorBorderDefault}`, background: p === '02' ? tokens.colorBrandPrimary : '#fff', color: p === '02' ? '#fff' : tokens.colorTextSecondary, fontSize: '12px', fontWeight: p === '02' ? 700 : 400 }}>{p}</span>
              ))}
            </div>
            <span style={{ fontSize: '12px', color: tokens.colorTextSecondary }}>© Cencosud</span>
          </div>
        </main>
      </div>

      {/* Driver modal */}
      {selected && (
        <Modal open onClose={() => setSelected(null)} title={selected.name} footer={<><Button variant="ghost" size="sm" onClick={() => setSelected(null)}>Cerrar</Button><Button variant="primary" size="sm">Editar</Button></>}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[['Email', selected.email], ['Teléfono', selected.phone], ['Placa', selected.plate], ['Courier', selected.courier]].map(([k, v]) => (
              <div key={k} style={{ padding: '12px', background: tokens.colorSurfaceSunken, borderRadius: '8px' }}>
                <div style={{ fontSize: '11px', color: tokens.colorTextTertiary, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{k}</div>
                <div style={{ fontSize: '14px', fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Brand B: Last Mile layout ────────────────────────────────────────────────
function BrandBDeliveryLayout() {
  const { tokens } = useTheme();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Order | null>(null);

  const filtered = ORDERS.filter(
    (o) => o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()),
  );

  const COLUMNS: Column<Order>[] = [
    { key: 'id',       header: 'Order ID',  sortable: true, width: '100px' },
    { key: 'customer', header: 'Cliente',   sortable: true },
    { key: 'driver',   header: 'Repartidor', sortable: true },
    { key: 'status',   header: 'Estado',    render: (r) => <Badge variant={STATUS_V[r.status]} dot>{r.status}</Badge> },
    { key: 'items',    header: 'Items',     sortable: true, align: 'right', width: '70px' },
    { key: 'total',    header: 'Total',     sortable: true, align: 'right', width: '100px' },
    { key: 'eta',      header: 'ETA',       width: '80px' },
    {
      key: 'actions', header: '',
      render: (r) => (
        <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setSelected(r); }}>Ver</Button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: tokens.colorSurfaceSunken, fontFamily: tokens.fontFamilySans }}>
      <Topbar
        items={NAV_ITEMS_B}
        userName="Joaquín Alfaro"
        userRole="Admin"
        location="Jumbo Portal La Dehesa"
        locationLabel="Sucursal"
        categoryLabel="Todas las categorías"
      />
      <main style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: tokens.colorTextPrimary }}>Órdenes de entrega</h1>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: tokens.colorTextSecondary }}>Jumbo Portal La Dehesa · {ORDERS.length} órdenes activas</p>
          </div>
          <Button variant="primary">+ Nueva orden</Button>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Órdenes hoy',   value: '1,248', delta: '+12%', good: true  },
            { label: 'Entregadas',    value: '342',   delta: '+8%',  good: true  },
            { label: 'En tránsito',   value: '87',    delta: '0%',   good: null  },
            { label: 'Fallidas',      value: '14',    delta: '+3%',  good: false },
          ].map((kpi) => (
            <Card key={kpi.label}>
              <div style={{ fontSize: '11px', color: tokens.colorTextSecondary, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>{kpi.label}</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: tokens.colorTextPrimary }}>{kpi.value}</div>
              <div style={{ fontSize: '12px', marginTop: '4px', color: kpi.good === null ? tokens.colorTextTertiary : kpi.good ? '#047E48' : '#D72A22' }}>{kpi.delta} vs semana anterior</div>
            </Card>
          ))}
        </div>

        <Card title="Órdenes recientes" noPadding footer={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: tokens.colorTextTertiary }}>{filtered.length} de {ORDERS.length} órdenes</span>
            <Button variant="ghost" size="sm">Exportar CSV</Button>
          </div>
        }>
          <div style={{ padding: '12px 20px' }}>
            <Input placeholder="Buscar por ID u orden…" value={search} onChange={(e) => setSearch(e.target.value)} leftAddon={<SearchIcon />} />
          </div>
          <DataTable columns={COLUMNS} data={filtered} onRowClick={setSelected} emptyText="Sin resultados" />
        </Card>
      </main>

      {selected && (
        <Modal open onClose={() => setSelected(null)} title={`Orden ${selected.id}`} footer={<><Button variant="ghost" size="sm" onClick={() => setSelected(null)}>Cerrar</Button><Button variant="primary" size="sm">Reasignar repartidor</Button></>}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[['Cliente', selected.customer], ['Repartidor', selected.driver], ['Items', String(selected.items)], ['Total', selected.total]].map(([k, v]) => (
              <div key={k} style={{ padding: '12px', background: tokens.colorSurfaceSunken, borderRadius: '8px' }}>
                <div style={{ fontSize: '11px', color: tokens.colorTextTertiary, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{k}</div>
                <div style={{ fontSize: '14px', fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Badge variant={STATUS_V[selected.status]} dot>{selected.status}</Badge>
            {selected.eta !== '—' && <span style={{ fontSize: '13px', color: tokens.colorTextSecondary }}>ETA: {selected.eta}</span>}
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Meta ─────────────────────────────────────────────────────────────────────
const meta = {
  title: 'Demos/Dashboard Preview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Full dashboard preview. **Toggle Brand in the toolbar.**

**Brand A — Shipping (Cencosud):** white header with breadcrumb, icon-only sidebar, Conductores table with status badges (En ruta / Disponible / No disponible).

**Brand B — Last Mile (Jumbo):** light-green topbar with Sucursal selector and "Todas las categorías" CTA, KPI cards, orders table.`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BrandA: Story = {
  name: 'Brand A — Shipping (Cencosud)',
  render: () => <BrandAShippingLayout />,
};

export const BrandB: Story = {
  name: 'Brand B — Last Mile (Jumbo)',
  render: () => <BrandBDeliveryLayout />,
};

export const LiveToggle: Story = {
  name: 'Live Brand Toggle (use toolbar ↑)',
  render: () => {
    const { tokens } = useTheme();
    return tokens.brandNavStyle === 'sidebar' ? <BrandAShippingLayout /> : <BrandBDeliveryLayout />;
  },
};

// ── Icons ─────────────────────────────────────────────────────────────────────
function GridIcon()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>; }
function BoxIcon()    { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>; }
function TruckIcon()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><path d="m16 8 5 0 3 3v5h-8V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>; }
function TruckIconWhite() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect x="1" y="3" width="15" height="13"/><path d="m16 8 5 0 3 3v5h-8V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>; }
function RouteIcon()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 17h18M3 12h18M3 7h18"/></svg>; }
function ChartIcon()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>; }
function GearIcon()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>; }
function SearchIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>; }
function FilterIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>; }
function BellIcon({ color }: { color: string }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>; }
function ChevronRight({ color }: { color: string }) { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>; }
