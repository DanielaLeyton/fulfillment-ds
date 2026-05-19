import { useState, type ReactNode } from 'react';
import { useTheme } from '../theme/ThemeContext';

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

interface DataTableProps<T extends { id: string | number }> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyText?: string;
  onRowClick?: (row: T) => void;
  stickyHeader?: boolean;
}

type SortDir = 'asc' | 'desc';

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  loading = false,
  emptyText = 'No data to display',
  onRowClick,
  stickyHeader = false,
}: DataTableProps<T>) {
  const { tokens } = useTheme();
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [hoveredRow, setHoveredRow] = useState<string | number | null>(null);

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    if (sortKey === col.key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(col.key);
      setSortDir('asc');
    }
  };

  const sorted = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const av = (a as Record<string, unknown>)[sortKey];
    const bv = (b as Record<string, unknown>)[sortKey];
    const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
    return sortDir === 'asc' ? cmp : -cmp;
  });

  return (
    <div
      style={{
        overflowX: 'auto',
        border: `1px solid ${tokens.colorBorderDefault}`,
        borderRadius: tokens.cardBorderRadius,
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px',
          color: tokens.colorTextPrimary,
        }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col)}
                style={{
                  padding: '10px 14px',
                  textAlign: col.align ?? 'left',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: tokens.colorTextSecondary,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  background: tokens.colorSurfaceSunken,
                  borderBottom: `1px solid ${tokens.colorBorderDefault}`,
                  whiteSpace: 'nowrap',
                  width: col.width,
                  cursor: col.sortable ? 'pointer' : 'default',
                  userSelect: 'none',
                  position: stickyHeader ? 'sticky' : undefined,
                  top: stickyHeader ? 0 : undefined,
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {col.header}
                  {col.sortable && (
                    <SortIcon active={sortKey === col.key} dir={sortDir} />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{ padding: '40px', textAlign: 'center', color: tokens.colorTextTertiary }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Spinner color={tokens.colorBrandPrimary} />
                  Loading…
                </div>
              </td>
            </tr>
          ) : sorted.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{ padding: '40px', textAlign: 'center', color: tokens.colorTextTertiary, fontSize: '14px' }}
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            sorted.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                onMouseEnter={() => setHoveredRow(row.id)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  borderBottom: `1px solid ${tokens.colorBorderDefault}`,
                  background: hoveredRow === row.id ? tokens.colorSurfaceSunken : undefined,
                  cursor: onRowClick ? 'pointer' : 'default',
                  transition: 'background 100ms ease',
                }}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    style={{
                      padding: '12px 14px',
                      textAlign: col.align ?? 'left',
                      color: tokens.colorTextPrimary,
                    }}
                  >
                    {col.render
                      ? col.render(row)
                      : String((row as Record<string, unknown>)[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      style={{ opacity: active ? 1 : 0.35 }}>
      {dir === 'asc' || !active
        ? <path d="M12 5l-7 7h14L12 5z" fill="currentColor" stroke="none" />
        : <path d="M12 19l7-7H5l7 7z" fill="currentColor" stroke="none" />}
    </svg>
  );
}

function Spinner({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"
      style={{ animation: 'fds-spin 0.7s linear infinite' }}>
      <style>{`@keyframes fds-spin { to { transform: rotate(360deg); } }`}</style>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}
