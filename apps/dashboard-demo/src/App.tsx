import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@fds/ui-web';
import { AdminDashboard } from './pages/AdminDashboard';

export function App() {
  return (
    <>
      <BrandSelector />
      <Routes>
        <Route path="/" element={<Navigate to="/admin-a" replace />} />
        <Route
          path="/admin-a/*"
          element={
            <ThemeProvider brand="brand-a">
              <AdminDashboard />
            </ThemeProvider>
          }
        />
        <Route
          path="/admin-b/*"
          element={
            <ThemeProvider brand="brand-b">
              <AdminDashboard />
            </ThemeProvider>
          }
        />
      </Routes>
    </>
  );
}

function BrandSelector() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isA = pathname.startsWith('/admin-a');
  const isB = pathname.startsWith('/admin-b');

  return (
    <div
      style={{
        position: 'fixed',
        top: '12px',
        right: '16px',
        zIndex: 9999,
        display: 'flex',
        gap: '6px',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(8px)',
        border: '1px solid #e5e7eb',
        borderRadius: '10px',
        padding: '5px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
      }}
    >
      <span style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', padding: '4px 8px', display: 'flex', alignItems: 'center', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        Brand
      </span>
      <button onClick={() => navigate('/admin-a')} style={tabStyle(isA, '#0a6eff')}>
        A — Warehouse
      </button>
      <button onClick={() => navigate('/admin-b')} style={tabStyle(isB, '#e8471a')}>
        B — Last Mile
      </button>
    </div>
  );
}

function tabStyle(active: boolean, color: string): React.CSSProperties {
  return {
    padding: '5px 14px',
    borderRadius: '7px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: active ? 700 : 500,
    background: active ? color : 'transparent',
    color: active ? '#fff' : '#374151',
    transition: 'all 150ms ease',
    fontFamily: 'inherit',
  };
}
