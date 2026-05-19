import React, { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { useTheme } from '../theme/ThemeContext';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const SIZE_STYLES: Record<ButtonSize, { height: string; padding: string; fontSize: string }> = {
  sm: { height: '32px', padding: '0 12px', fontSize: '13px' },
  md: { height: '40px', padding: '0 16px', fontSize: '14px' },
  lg: { height: '48px', padding: '0 24px', fontSize: '16px' },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      style,
      ...rest
    },
    ref,
  ) => {
    const { tokens } = useTheme();
    const sz = SIZE_STYLES[size];
    const isDisabled = disabled || loading;

    const variantStyle = (() => {
      switch (variant) {
        case 'primary':
          return {
            background: isDisabled ? tokens.colorBorderDefault : tokens.colorBrandPrimary,
            color: isDisabled ? tokens.colorTextDisabled : tokens.colorBrandOnPrimary,
            border: 'none',
          };
        case 'secondary':
          return {
            background: isDisabled ? tokens.colorSurfaceEmphasis : tokens.colorBrandSecondary,
            color: isDisabled ? tokens.colorTextDisabled : tokens.colorBrandOnSecondary,
            border: 'none',
          };
        case 'ghost':
          return {
            background: 'transparent',
            color: isDisabled ? tokens.colorTextDisabled : tokens.colorBrandPrimary,
            border: `1px solid ${isDisabled ? tokens.colorBorderDefault : tokens.colorBrandPrimary}`,
          };
        case 'danger':
          return {
            background: isDisabled ? tokens.colorBorderDefault : '#e53535',
            color: isDisabled ? tokens.colorTextDisabled : '#ffffff',
            border: 'none',
          };
      }
    })();

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          height: sz.height,
          padding: sz.padding,
          fontSize: sz.fontSize,
          fontWeight: 600,
          fontFamily: 'inherit',
          borderRadius: tokens.buttonBorderRadius,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          opacity: isDisabled ? 0.55 : 1,
          transition: 'background 150ms ease, box-shadow 150ms ease, opacity 150ms ease',
          width: fullWidth ? '100%' : undefined,
          whiteSpace: 'nowrap',
          outline: 'none',
          ...variantStyle,
          ...style,
        }}
        onMouseOver={(e) => {
          if (isDisabled || variant === 'ghost') return;
          const el = e.currentTarget;
          if (variant === 'primary') el.style.background = tokens.colorBrandPrimaryHover;
          if (variant === 'secondary') el.style.background = tokens.colorBrandSecondaryHover;
        }}
        onMouseOut={(e) => {
          if (isDisabled || variant === 'ghost') return;
          const el = e.currentTarget;
          if (variant === 'primary') el.style.background = tokens.colorBrandPrimary;
          if (variant === 'secondary') el.style.background = tokens.colorBrandSecondary;
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = `0 0 0 3px ${tokens.colorBrandPrimarySubtle}`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = 'none';
        }}
        {...rest}
      >
        {loading ? <Spinner /> : leftIcon}
        {children}
        {!loading && rightIcon}
      </button>
    );
  },
);

Button.displayName = 'Button';

function Spinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      style={{ animation: 'fds-spin 0.7s linear infinite' }}
    >
      <style>{`@keyframes fds-spin { to { transform: rotate(360deg); } }`}</style>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}
