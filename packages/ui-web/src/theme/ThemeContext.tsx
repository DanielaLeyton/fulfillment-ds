import React, { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import { BRAND_TOKENS, type BrandId, type BrandTokens } from './tokens';

interface ThemeContextValue {
  brandId: BrandId;
  tokens: BrandTokens;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}

interface ThemeProviderProps {
  brand: BrandId;
  children: ReactNode;
}

export function ThemeProvider({ brand, children }: ThemeProviderProps) {
  const tokens = BRAND_TOKENS[brand];
  const containerRef = useRef<HTMLDivElement>(null);

  // Inject CSS custom properties scoped to this container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const vars: Record<string, string> = {
      '--fds-color-brand-primary':           tokens.colorBrandPrimary,
      '--fds-color-brand-primary-hover':     tokens.colorBrandPrimaryHover,
      '--fds-color-brand-primary-pressed':   tokens.colorBrandPrimaryPressed,
      '--fds-color-brand-primary-subtle':    tokens.colorBrandPrimarySubtle,
      '--fds-color-brand-on-primary':        tokens.colorBrandOnPrimary,
      '--fds-color-brand-secondary':         tokens.colorBrandSecondary,
      '--fds-color-brand-secondary-hover':   tokens.colorBrandSecondaryHover,
      '--fds-color-brand-secondary-subtle':  tokens.colorBrandSecondarySubtle,
      '--fds-color-brand-on-secondary':      tokens.colorBrandOnSecondary,
      '--fds-color-brand-accent':            tokens.colorBrandAccent,
      '--fds-color-brand-accent-subtle':     tokens.colorBrandAccentSubtle,
      '--fds-color-brand-on-accent':         tokens.colorBrandOnAccent,
      '--fds-color-surface-default':         tokens.colorSurfaceDefault,
      '--fds-color-surface-sunken':          tokens.colorSurfaceSunken,
      '--fds-color-surface-emphasis':        tokens.colorSurfaceEmphasis,
      '--fds-color-text-primary':            tokens.colorTextPrimary,
      '--fds-color-text-secondary':          tokens.colorTextSecondary,
      '--fds-color-text-tertiary':           tokens.colorTextTertiary,
      '--fds-color-text-disabled':           tokens.colorTextDisabled,
      '--fds-color-text-link':               tokens.colorTextLink,
      '--fds-color-border-default':          tokens.colorBorderDefault,
      '--fds-color-border-strong':           tokens.colorBorderStrong,
      '--fds-color-border-focus':            tokens.colorBorderFocus,
      '--fds-button-border-radius':          tokens.buttonBorderRadius,
      '--fds-card-border-radius':            tokens.cardBorderRadius,
      '--fds-font-family-sans':              tokens.fontFamilySans,
    };

    Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v));
    el.setAttribute('data-brand', brand);
  }, [brand, tokens]);

  return (
    <ThemeContext.Provider value={{ brandId: brand, tokens }}>
      <div
        ref={containerRef}
        data-fds-theme
        style={{ fontFamily: tokens.fontFamilySans, color: tokens.colorTextPrimary, minHeight: '100%' }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
