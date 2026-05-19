import React, { useState } from 'react';
import {
  useTheme,
  Button,
  Badge,
  Input,
  Modal,
  Sidebar,
  Topbar,
} from '@fds/ui-web';

// ── Conductores data ────────────────────────────────────────────────────────
interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  plate: string;
  courier: string;
  status: 'En ruta' | 'Disponible' | 'No disponible';
  enabled: boolean;
}

const DRIVERS: Driver[] = [
  { id: 'd1', name: 'Francisco Aguayo',       email: 'faguayo@gmail.com',     phone: '+56956186039', plate: 'DDHI88',       courier: 'Boosmap', status: 'En ruta',       enabled: false },
  { id: 'd2', name: 'Ronald Vezga',           email: 'ronaldvezga@gmail.com', phone: '+56956186039', plate: 'ABCC09',       courier: 'Touch',   status: 'En ruta',       enabled: false },
  { id: 'd3', name: 'Héctor Biminchumo B.',   email: 'hbbellido@gmail.com',   phone: '+56956186039', plate: 'JKCD17',       courier: 'Kowski',  status: 'No disponible', enabled: true  },
  { id: 'd4', name: 'Douglas Barraza',        email: 'dbarraza@gmail.com',    phone: '+56956186039', plate: 'NHDY84',       courier: 'Boosmap', status: 'Disponible',    enabled: true  },
  { id: 'd5', name: 'Kevin Aceituno',         email: 'kevinaceituno@gmail.com',phone: '+56956186039', plate: 'JJ6583',      courier: 'Lo Llevo',status: 'En ruta',       enabled: false },
  { id: 'd6', name: 'Nicolás Bofill',         email: 'ni.bofill@gmail.com',   phone: '+56956186039', plate: 'Sin placa/\npatente', courier: 'Boosmap', status: 'No disponible', enabled: true },
  { id: 'd7', name: 'Frank San Martín',       email: 'ffsanmartin@gmail.com', phone: '+56956186039', plate: 'NGCD34',       courier: 'TCD',     status: 'Disponible',    enabled: true  },
  { id: 'd8', name: 'Rodrigo Valenzuela',     email: 'rvalenzuela@gmail.com', phone: '+56956186039', plate: 'BGRT21',       courier: 'Boosmap', status: 'Disponible',    enabled: true  },
  { id: 'd9', name: 'Carla Mendoza',          email: 'cmendoza@gmail.com',    phone: '+56956186039', plate: 'HHLT55',       courier: 'Touch',   status: 'En ruta',       enabled: false },
  { id: 'd10',name: 'Andrés Fuentes',         email: 'afuentes@gmail.com',    phone: '+56956186039', plate: 'PQRS99',       courier: 'Lo Llevo',status: 'No disponible', enabled: false },
];

const NAV_ITEMS = [
  { label: 'Dashboard', active: false, icon: <GridIcon /> },
  { label: 'Transporte', active: true,  icon: <TruckIcon /> },
  { label: 'Drivers',   active: false, icon: <PersonIcon /> },
  { label: 'Reports',   active: false, icon: <ChartIcon /> },
  { label: 'Settings',  active: false, icon: <GearIcon /> },
];

const TOTAL_DRIVERS = 5365;

// ── Main component ──────────────────────────────────────────────────────────
export function AdminDashboard() {
  const { tokens } = useTheme();
  const isSidebar = tokens.brandNavStyle === 'sidebar';

  if (isSidebar) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: tokens.fontFamilySans }}>
        <BrandAHeader tokens={tokens} />
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <Sidebar items={NAV_ITEMS} />
          <main style={{ flex: 1, overflowY: 'auto', background: '#ffffff' }}>
            <TransporteContent tokens={tokens} />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: tokens.fontFamilySans }}>
      <Topbar
        items={NAV_ITEMS}
        userName="Joaquín Alfaro"
        userRole="Admin"
        location="Jumbo Portal La Dehesa"
        locationLabel="Sucursal"
        categoryLabel="Todas las categorías"
      />
      <main style={{ flex: 1, padding: '28px', overflowY: 'auto', background: tokens.colorSurfaceSunken }}>
        <TransporteContent tokens={tokens} />
      </main>
    </div>
  );
}

// ── Brand A header ──────────────────────────────────────────────────────────
function BrandAHeader({ tokens }: { tokens: any }) {
  return (
    <header style={{
      display: 'flex', alignItems: 'center',
      height: '56px', padding: '0 20px',
      background: '#ffffff',
      borderBottom: `1px solid ${tokens.colorBorderDefault}`,
      gap: '16px', flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '8px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: tokens.colorBrandPrimary,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/>
            <rect x="9" y="11" width="14" height="10" rx="2"/>
            <circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          </svg>
        </div>
        <span style={{ fontSize: '16px', fontWeight: 800, color: tokens.colorBrandPrimary, letterSpacing: '-0.02em' }}>
          {tokens.brandLogoText}
        </span>
      </div>

      {/* Breadcrumb */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
        {['Shipping', 'Transporte', 'Conductores'].map((crumb, i, arr) => (
          <React.Fragment key={crumb}>
            <span style={{
              fontSize: '13px',
              color: i < arr.length - 1 ? tokens.colorBrandPrimary : tokens.colorTextSecondary,
              fontWeight: i === 0 ? 600 : 400,
              cursor: i < arr.length - 1 ? 'pointer' : 'default',
            }}>
              {crumb}
            </span>
            {i < arr.length - 1 && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={tokens.colorTextTertiary} strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Right: chips + bell + user */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {['Chile', 'Jumbo', 'ESP'].map((chip) => (
          <span key={chip} style={{
            padding: '4px 12px', borderRadius: '9999px',
            background: tokens.colorSurfaceEmphasis,
            fontSize: '12px', fontWeight: 600, color: tokens.colorTextPrimary,
            cursor: 'pointer',
          }}>{chip}</span>
        ))}
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: tokens.colorTextSecondary, display: 'flex' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: tokens.colorBrandPrimary,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 700, color: '#fff',
          }}>DG</div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: tokens.colorTextPrimary, lineHeight: 1.2 }}>¡Hola Diego!</div>
            <div style={{ fontSize: '11px', color: tokens.colorTextTertiary }}>Mi cuenta</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={tokens.colorTextTertiary} strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>
      </div>
    </header>
  );
}

// ── Transporte content ──────────────────────────────────────────────────────
function TransporteContent({ tokens }: { tokens: any }) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Conductores');
  const [selected, setSelected] = useState<Driver | null>(null);
  const [drivers, setDrivers] = useState(DRIVERS);
  const [page, setPage] = useState(2);
  const perPage = 10;

  const filtered = drivers.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.plate.toLowerCase().includes(search.toLowerCase())
  );

  const tabs = [
    { label: 'Rutas', count: null },
    { label: 'Vehículos', count: null },
    { label: 'Conductores', count: TOTAL_DRIVERS },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Page title */}
      <div style={{ padding: '24px 28px 0' }}>
        <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: tokens.colorTextPrimary }}>Transporte</h1>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0', marginTop: '20px', borderBottom: `2px solid ${tokens.colorBorderDefault}` }}>
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 16px',
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '14px', fontWeight: activeTab === tab.label ? 600 : 400,
                color: activeTab === tab.label ? tokens.colorBrandPrimary : tokens.colorTextSecondary,
                borderBottom: `2px solid ${activeTab === tab.label ? tokens.colorBrandPrimary : 'transparent'}`,
                marginBottom: '-2px',
                fontFamily: 'inherit',
              }}
            >
              {tab.label}
              {tab.count !== null && (
                <span style={{
                  padding: '2px 8px', borderRadius: '9999px',
                  background: activeTab === tab.label ? tokens.colorBrandPrimary : tokens.colorSurfaceEmphasis,
                  color: activeTab === tab.label ? '#fff' : tokens.colorTextSecondary,
                  fontSize: '12px', fontWeight: 600,
                }}>
                  {tab.count.toLocaleString()}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ padding: '16px 28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '280px' }}>
          <Input
            placeholder="Buscar por nombre o placa"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftAddon={<SearchIcon color={tokens.colorTextTertiary} />}
          />
        </div>
        {search && (
          <button
            onClick={() => setSearch('')}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: tokens.colorTextTertiary, fontFamily: 'inherit' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Limpiar filtros
          </button>
        )}
        <button style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '8px 14px', borderRadius: '6px',
          border: `1px solid ${tokens.colorBorderDefault}`,
          background: '#fff', cursor: 'pointer', fontSize: '13px',
          color: tokens.colorTextSecondary, fontFamily: 'inherit', fontWeight: 500,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
          Más filtros
        </button>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex' }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '8px 18px', borderRadius: '6px 0 0 6px',
            background: tokens.colorBrandPrimary, color: '#fff',
            border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, fontFamily: 'inherit',
          }}>
            Crear conductor
          </button>
          <button style={{
            padding: '8px 10px', borderRadius: '0 6px 6px 0',
            background: tokens.colorBrandPrimaryHover, color: '#fff',
            border: 'none', borderLeft: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
          </button>
        </div>
        <button style={{ padding: '8px', borderRadius: '6px', border: `1px solid ${tokens.colorBorderDefault}`, background: '#fff', cursor: 'pointer', color: tokens.colorTextSecondary, display: 'flex' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
        </button>
      </div>

      {/* Table */}
      <div style={{ flex: 1, padding: '0 28px', overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: tokens.colorBrandPrimary }}>
              {['Nombre completo', 'Usuario', 'Teléfono', 'Placa', 'Courier', 'Estado', ''].map((h) => (
                <th key={h} style={{
                  padding: '12px 14px', textAlign: 'left',
                  color: '#fff', fontWeight: 600, fontSize: '13px',
                  whiteSpace: 'nowrap',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((driver, idx) => (
              <tr
                key={driver.id}
                style={{
                  background: idx % 2 === 0 ? '#fff' : '#FAFBFC',
                  borderBottom: `1px solid ${tokens.colorBorderDefault}`,
                  cursor: 'pointer',
                }}
                onClick={() => setSelected(driver)}
              >
                <td style={{ padding: '13px 14px', fontWeight: 500, color: tokens.colorTextPrimary }}>{driver.name}</td>
                <td style={{ padding: '13px 14px', color: tokens.colorTextSecondary }}>{driver.email}</td>
                <td style={{ padding: '13px 14px', color: tokens.colorTextSecondary }}>{driver.phone}</td>
                <td style={{ padding: '13px 14px', color: tokens.colorTextSecondary, whiteSpace: 'pre-line' }}>{driver.plate}</td>
                <td style={{ padding: '13px 14px', color: tokens.colorTextSecondary }}>{driver.courier}</td>
                <td style={{ padding: '13px 14px' }}>
                  <StatusBadge status={driver.status} tokens={tokens} />
                </td>
                <td style={{ padding: '13px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} onClick={(e) => e.stopPropagation()}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: tokens.colorTextTertiary, display: 'flex', padding: '2px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                    </button>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: tokens.colorTextTertiary, display: 'flex', padding: '2px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <Toggle
                      enabled={driver.enabled}
                      onChange={(v) => setDrivers((prev) => prev.map((d) => d.id === driver.id ? { ...d, enabled: v } : d))}
                      color={tokens.colorBrandPrimary}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 28px', borderTop: `1px solid ${tokens.colorBorderDefault}`,
        background: '#fff', flexShrink: 0,
      }}>
        <span style={{ fontSize: '13px', color: tokens.colorTextSecondary }}>
          Mostrando {perPage} de lista de {TOTAL_DRIVERS.toLocaleString()}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <PagBtn label="‹" onClick={() => setPage((p) => Math.max(1, p - 1))} tokens={tokens} />
          {[1, 2, 3].map((p) => (
            <PagBtn key={p} label={String(p).padStart(2, '0')} onClick={() => setPage(p)} active={page === p} tokens={tokens} />
          ))}
          <span style={{ padding: '0 6px', color: tokens.colorTextTertiary, fontSize: '13px' }}>...</span>
          <PagBtn label="20" onClick={() => setPage(20)} tokens={tokens} />
          <PagBtn label="›" onClick={() => setPage((p) => Math.min(20, p + 1))} tokens={tokens} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '13px', color: tokens.colorTextSecondary }}>20</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={tokens.colorTextTertiary} strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>
      </div>

      {/* Driver detail modal */}
      {selected && (
        <Modal
          open
          onClose={() => setSelected(null)}
          title={selected.name}
          size="md"
          footer={
            <>
              <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>Cerrar</Button>
              <Button variant="primary" size="sm">Editar conductor</Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <StatusBadge status={selected.status} tokens={tokens} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                ['Email', selected.email],
                ['Teléfono', selected.phone],
                ['Placa', selected.plate],
                ['Courier', selected.courier],
              ].map(([k, v]) => (
                <div key={k} style={{ padding: '14px', background: tokens.colorSurfaceSunken, borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', color: tokens.colorTextTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{k}</div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: tokens.colorTextPrimary }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {/* Footer */}
      <div style={{ padding: '10px', textAlign: 'center', fontSize: '12px', color: tokens.colorTextTertiary, borderTop: `1px solid ${tokens.colorBorderDefault}` }}>
        © Cencosud
      </div>
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────
function StatusBadge({ status, tokens }: { status: Driver['status']; tokens: any }) {
  const cfg = {
    'En ruta':       { color: tokens.colorBrandPrimary,  bg: tokens.colorBrandPrimarySubtle, dot: tokens.colorBrandPrimary },
    'Disponible':    { color: '#047E48',                  bg: '#E8F6EE',                      dot: '#047E48' },
    'No disponible': { color: '#D72A22',                  bg: '#FFF2F2',                      dot: '#D72A22' },
  }[status];

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      padding: '4px 10px', borderRadius: '9999px',
      background: cfg.bg, color: cfg.color,
      fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap',
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: cfg.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
}

function Toggle({ enabled, onChange, color }: { enabled: boolean; onChange: (v: boolean) => void; color: string }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      style={{
        position: 'relative', width: '36px', height: '20px',
        borderRadius: '9999px', border: 'none', cursor: 'pointer',
        background: enabled ? color : '#CBD5E0',
        transition: 'background 150ms ease', padding: 0, flexShrink: 0,
      }}
    >
      <span style={{
        position: 'absolute', top: '2px',
        left: enabled ? '18px' : '2px',
        width: '16px', height: '16px', borderRadius: '50%',
        background: '#fff', transition: 'left 150ms ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {enabled && (
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        )}
      </span>
    </button>
  );
}

function PagBtn({ label, onClick, active, tokens }: { label: string; onClick: () => void; active?: boolean; tokens: any }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '32px', height: '32px', borderRadius: '6px',
        border: `1px solid ${active ? tokens.colorBrandPrimary : tokens.colorBorderDefault}`,
        background: active ? tokens.colorBrandPrimary : '#fff',
        color: active ? '#fff' : tokens.colorTextSecondary,
        fontSize: '13px', fontWeight: active ? 700 : 400,
        cursor: 'pointer', fontFamily: 'inherit',
      }}
    >
      {label}
    </button>
  );
}

// ── Icons ───────────────────────────────────────────────────────────────────
function SearchIcon({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}
function GridIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>; }
function TruckIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3m0 0h4l3 4v4h-7V8z"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>; }
function PersonIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>; }
function ChartIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>; }
function GearIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>; }
