import { useTheme } from '../theme/ThemeContext';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children: React.ReactNode;
}

export function Badge({ variant = 'default', size = 'md', dot = false, children }: BadgeProps) {
  const { tokens } = useTheme();

  const VARIANT_COLORS: Record<BadgeVariant, { bg: string; text: string; dot: string }> = {
    default: { bg: tokens.colorSurfaceEmphasis,     text: tokens.colorTextSecondary,   dot: tokens.colorTextTertiary },
    primary: { bg: tokens.colorBrandPrimarySubtle,  text: tokens.colorBrandPrimary,    dot: tokens.colorBrandPrimary },
    success: { bg: '#e8f9ef',                       text: '#1aab55',                   dot: '#1aab55' },
    warning: { bg: '#fff8e1',                       text: '#b45309',                   dot: '#f59e0b' },
    danger:  { bg: '#fff0f0',                       text: '#ad1f1f',                   dot: '#e53535' },
    info:    { bg: tokens.colorBrandPrimarySubtle,  text: tokens.colorBrandPrimary,    dot: tokens.colorBrandPrimary },
  };

  const colors = VARIANT_COLORS[variant];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: size === 'sm' ? '2px 7px' : '3px 10px',
        fontSize: size === 'sm' ? '11px' : '12px',
        fontWeight: 500,
        borderRadius: '9999px',
        background: colors.bg,
        color: colors.text,
        whiteSpace: 'nowrap',
      }}
    >
      {dot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: colors.dot,
            flexShrink: 0,
          }}
        />
      )}
      {children}
    </span>
  );
}
