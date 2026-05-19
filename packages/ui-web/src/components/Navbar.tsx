import { useState, type ReactNode } from 'react';
import { useTheme } from '../theme/ThemeContext';

interface NavItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
  badge?: number;
}

interface NavbarProps {
  items: NavItem[];
  userAvatar?: string;
  userName?: string;
  actions?: ReactNode;
  onItemClick?: (item: NavItem) => void;
}

export function Sidebar({ items, userAvatar, userName, actions, onItemClick }: NavbarProps) {
  const { tokens } = useTheme();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <nav
      style={{
        width: '240px',
        flexShrink: 0,
        background: tokens.colorBrandSecondary,
        color: tokens.colorBrandOnSecondary,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em' }}>
          {tokens.brandLogoText}
        </span>
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' }}>
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onItemClick?.(item)}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              padding: '8px 10px',
              borderRadius: '8px',
              background: item.active
                ? tokens.colorBrandPrimary
                : hoveredIdx === idx
                  ? 'rgba(255,255,255,0.08)'
                  : 'transparent',
              color: item.active ? tokens.colorBrandOnPrimary : 'rgba(255,255,255,0.75)',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '14px',
              fontWeight: item.active ? 600 : 400,
              fontFamily: 'inherit',
              transition: 'background 120ms ease, color 120ms ease',
            }}
          >
            {item.icon && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{item.icon}</span>}
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span style={{
                fontSize: '11px',
                fontWeight: 600,
                background: tokens.colorBrandAccent,
                color: tokens.colorBrandOnAccent,
                borderRadius: '9999px',
                padding: '1px 7px',
                minWidth: '20px',
                textAlign: 'center',
              }}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Actions + User */}
      {(actions || userName) && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {actions}
          {userName && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Avatar src={userAvatar} name={userName} size={32} />
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{userName}</span>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export function Topbar({ items, userAvatar, userName, actions, onItemClick }: NavbarProps) {
  const { tokens } = useTheme();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <header
      style={{
        background: tokens.colorBrandSecondary,
        color: tokens.colorBrandOnSecondary,
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        height: '56px',
        flexShrink: 0,
        gap: '8px',
      }}
    >
      <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em', marginRight: '24px' }}>
        {tokens.brandLogoText}
      </span>

      {items.map((item, idx) => (
        <button
          key={idx}
          onClick={() => onItemClick?.(item)}
          onMouseEnter={() => setHoveredIdx(idx)}
          onMouseLeave={() => setHoveredIdx(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '8px',
            background: item.active
              ? tokens.colorBrandPrimary
              : hoveredIdx === idx
                ? 'rgba(255,255,255,0.1)'
                : 'transparent',
            color: item.active ? tokens.colorBrandOnPrimary : 'rgba(255,255,255,0.8)',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: item.active ? 600 : 400,
            fontFamily: 'inherit',
            transition: 'background 120ms ease',
          }}
        >
          {item.icon}
          {item.label}
          {item.badge !== undefined && item.badge > 0 && (
            <span style={{
              fontSize: '11px',
              fontWeight: 600,
              background: tokens.colorBrandAccent,
              color: tokens.colorBrandOnAccent,
              borderRadius: '9999px',
              padding: '1px 6px',
            }}>
              {item.badge}
            </span>
          )}
        </button>
      ))}

      <div style={{ flex: 1 }} />
      {actions}
      {userName && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar src={userAvatar} name={userName} size={30} />
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{userName}</span>
        </div>
      )}
    </header>
  );
}

function Avatar({ src, name, size }: { src?: string; name: string; size: number }) {
  if (src) {
    return <img src={src} alt={name} width={size} height={size} style={{ borderRadius: '50%', objectFit: 'cover' }} />;
  }
  const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.38,
      fontWeight: 600,
      color: '#fff',
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}
