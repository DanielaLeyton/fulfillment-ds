import { type HTMLAttributes, type ReactNode } from 'react';
import { useTheme } from '../theme/ThemeContext';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  noPadding?: boolean;
  elevated?: boolean;
}

export function Card({
  title,
  subtitle,
  footer,
  noPadding = false,
  elevated = false,
  children,
  style,
  ...rest
}: CardProps) {
  const { tokens } = useTheme();

  return (
    <div
      style={{
        background: tokens.colorSurfaceDefault,
        borderRadius: tokens.cardBorderRadius,
        border: `1px solid ${tokens.colorBorderDefault}`,
        boxShadow: elevated
          ? '0 4px 6px -1px rgba(0,0,0,0.10), 0 2px 4px -2px rgba(0,0,0,0.10)'
          : '0 1px 3px 0 rgba(0,0,0,0.07)',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {(title || subtitle) && (
        <div
          style={{
            padding: '16px 20px',
            borderBottom: `1px solid ${tokens.colorBorderDefault}`,
          }}
        >
          {title && (
            <h3
              style={{
                margin: 0,
                fontSize: '15px',
                fontWeight: 600,
                color: tokens.colorTextPrimary,
              }}
            >
              {title}
            </h3>
          )}
          {subtitle && (
            <p
              style={{
                margin: '4px 0 0',
                fontSize: '13px',
                color: tokens.colorTextSecondary,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div style={noPadding ? undefined : { padding: '20px' }}>{children}</div>
      {footer && (
        <div
          style={{
            padding: '12px 20px',
            borderTop: `1px solid ${tokens.colorBorderDefault}`,
            background: tokens.colorSurfaceSunken,
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
