import React, { useState, type ReactNode } from 'react';
import { useTheme } from '../theme/ThemeContext';

interface NavItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
  badge?: number;
  newBadge?: boolean;
}

interface NavbarProps {
  items: NavItem[];
  userAvatar?: string;
  userName?: string;
  userRole?: string;
  location?: string;
  locationLabel?: string;
  categoryLabel?: string;
  actions?: ReactNode;
  onItemClick?: (item: NavItem) => void;
}

export function Sidebar({ items, onItemClick }: NavbarProps) {
  const { tokens } = useTheme();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <nav
      style={{
        width: '56px',
        flexShrink: 0,
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRight: `1px solid ${tokens.colorBorderDefault}`,
        overflow: 'hidden',
      }}
    >
      {/* Hamburger */}
      <button
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: '56px', width: '100%', background: 'transparent',
          border: 'none', cursor: 'pointer', color: tokens.colorTextSecondary,
          flexShrink: 0,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      {/* Icon items */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '8px 0' }}>
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onItemClick?.(item)}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            title={item.label}
            style={{
              position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '40px', height: '40px',
              borderRadius: '8px',
              background: item.active ? tokens.colorBrandPrimarySubtle : hoveredIdx === idx ? tokens.colorSurfaceEmphasis : 'transparent',
              color: item.active ? tokens.colorBrandPrimary : tokens.colorTextTertiary,
              border: 'none', cursor: 'pointer',
              transition: 'background 120ms ease, color 120ms ease',
            }}
          >
            {item.active && (
              <span style={{
                position: 'absolute', left: '-8px', top: '50%', transform: 'translateY(-50%)',
                width: '3px', height: '24px', background: tokens.colorBrandPrimary, borderRadius: '0 3px 3px 0',
              }} />
            )}
            {item.icon}
            {item.badge !== undefined && item.badge > 0 && (
              <span style={{
                position: 'absolute', top: '4px', right: '4px',
                width: '8px', height: '8px', borderRadius: '50%',
                background: tokens.colorBrandPrimary,
              }} />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}

export function Topbar({ items, userName, userRole, location, locationLabel, categoryLabel, actions, onItemClick }: NavbarProps) {
  const { tokens } = useTheme();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <header
      style={{
        background: tokens.colorBrandPrimarySubtle,
        color: tokens.colorTextPrimary,
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        height: '60px',
        flexShrink: 0,
        gap: '0',
        borderBottom: `1px solid ${tokens.colorBorderDefault}`,
      }}
    >
      {/* Logo + location */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginRight: '32px', flexShrink: 0 }}>
        <span style={{ fontSize: '22px', fontWeight: 800, color: tokens.colorTextPrimary, letterSpacing: '-0.03em' }}>
          {tokens.brandLogoText}
        </span>
        {location && (
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              padding: '4px 0', fontFamily: 'inherit',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={tokens.colorBrandPrimary} strokeWidth="2.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
            <div style={{ textAlign: 'left' }}>
              {locationLabel && <div style={{ fontSize: '10px', color: tokens.colorTextTertiary, lineHeight: 1, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{locationLabel}</div>}
              <div style={{ fontSize: '13px', fontWeight: 700, color: tokens.colorTextPrimary, lineHeight: 1.3 }}>{location}</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={tokens.colorTextSecondary} strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
          </button>
        )}
      </div>

      {/* Nav items with pipe separators */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '0', flex: 1 }}>
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && (
              <span style={{ width: '1px', height: '16px', background: tokens.colorBorderStrong, flexShrink: 0 }} />
            )}
            <button
              onClick={() => onItemClick?.(item)}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                position: 'relative',
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '6px 14px',
                background: 'transparent',
                color: item.active ? tokens.colorBrandPrimary : hoveredIdx === idx ? tokens.colorTextPrimary : tokens.colorTextSecondary,
                border: 'none', cursor: 'pointer',
                fontSize: '14px', fontWeight: item.active ? 700 : 500,
                fontFamily: 'inherit',
                transition: 'color 120ms ease',
                whiteSpace: 'nowrap',
              }}
            >
              {item.newBadge && (
                <span style={{
                  position: 'absolute', top: '-2px', right: '8px',
                  fontSize: '9px', fontWeight: 700,
                  background: tokens.colorBrandPrimary, color: '#fff',
                  borderRadius: '9999px', padding: '1px 5px',
                  letterSpacing: '0.02em', textTransform: 'uppercase',
                }}>
                  Nuevo
                </span>
              )}
              {item.label}
              {item.badge !== undefined && item.badge > 0 && (
                <span style={{
                  fontSize: '11px', fontWeight: 600,
                  background: tokens.colorBrandPrimary, color: '#fff',
                  borderRadius: '9999px', padding: '1px 6px',
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          </React.Fragment>
        ))}
      </nav>

      {/* Right: Category CTA + user */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        {actions}
        {categoryLabel && (
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              background: tokens.colorBrandPrimary, color: '#fff',
              border: 'none', borderRadius: tokens.buttonBorderRadius,
              padding: '8px 14px', cursor: 'pointer',
              fontSize: '13px', fontWeight: 600, fontFamily: 'inherit',
              whiteSpace: 'nowrap',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            {categoryLabel}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
          </button>
        )}
        {userName && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={tokens.colorTextSecondary} strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <div style={{ textAlign: 'left' }}>
              {userRole && <div style={{ fontSize: '10px', color: tokens.colorTextTertiary, lineHeight: 1, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{userRole}</div>}
              <div style={{ fontSize: '13px', fontWeight: 600, color: tokens.colorTextPrimary, lineHeight: 1.3 }}>{userName}</div>
            </div>
          </div>
        )}
      </div>
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
