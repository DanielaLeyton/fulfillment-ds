import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { useTheme } from '../theme/ThemeContext';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  inputSize?: 'sm' | 'md' | 'lg';
}

const SIZE: Record<NonNullable<InputProps['inputSize']>, { height: string; fontSize: string; padding: string }> = {
  sm: { height: '32px', fontSize: '13px', padding: '0 10px' },
  md: { height: '40px', fontSize: '14px', padding: '0 12px' },
  lg: { height: '48px', fontSize: '16px', padding: '0 14px' },
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorText,
      leftAddon,
      rightAddon,
      inputSize = 'md',
      disabled,
      id,
      style,
      ...rest
    },
    ref,
  ) => {
    const { tokens } = useTheme();
    const [focused, setFocused] = useState(false);
    const sz = SIZE[inputSize];
    const hasError = Boolean(errorText);
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const borderColor = hasError
      ? '#e53535'
      : focused
        ? tokens.colorBorderFocus
        : tokens.colorBorderDefault;

    const boxShadow = focused
      ? `0 0 0 3px ${hasError ? 'rgba(229,53,53,0.15)' : tokens.colorBrandPrimarySubtle}`
      : 'none';

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {label && (
          <label
            htmlFor={inputId}
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: disabled ? tokens.colorTextDisabled : tokens.colorTextPrimary,
            }}
          >
            {label}
          </label>
        )}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {leftAddon && (
            <div
              style={{
                position: 'absolute',
                left: '10px',
                color: tokens.colorTextTertiary,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {leftAddon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              width: '100%',
              height: sz.height,
              padding: sz.padding,
              paddingLeft: leftAddon ? '36px' : undefined,
              paddingRight: rightAddon ? '36px' : undefined,
              fontSize: sz.fontSize,
              fontFamily: 'inherit',
              color: disabled ? tokens.colorTextDisabled : tokens.colorTextPrimary,
              background: disabled ? tokens.colorSurfaceEmphasis : tokens.colorSurfaceDefault,
              border: `1px solid ${borderColor}`,
              borderRadius: '8px',
              outline: 'none',
              transition: 'border-color 150ms ease, box-shadow 150ms ease',
              boxShadow,
              cursor: disabled ? 'not-allowed' : 'text',
              ...style,
            }}
            {...rest}
          />
          {rightAddon && (
            <div
              style={{
                position: 'absolute',
                right: '10px',
                color: tokens.colorTextTertiary,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {rightAddon}
            </div>
          )}
        </div>
        {(helperText || errorText) && (
          <span
            style={{
              fontSize: '12px',
              color: hasError ? '#e53535' : tokens.colorTextTertiary,
            }}
          >
            {errorText ?? helperText}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
