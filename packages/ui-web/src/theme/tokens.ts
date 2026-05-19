/**
 * Inline token definitions — mirrors what Style Dictionary generates at build time.
 * These are the resolved values per brand, consumed by ThemeProvider.
 */

export interface BrandTokens {
  // Brand colors
  colorBrandPrimary: string;
  colorBrandPrimaryHover: string;
  colorBrandPrimaryPressed: string;
  colorBrandPrimarySubtle: string;
  colorBrandOnPrimary: string;
  colorBrandSecondary: string;
  colorBrandSecondaryHover: string;
  colorBrandSecondarySubtle: string;
  colorBrandOnSecondary: string;
  colorBrandAccent: string;
  colorBrandAccentSubtle: string;
  colorBrandOnAccent: string;
  // Surface
  colorSurfaceDefault: string;
  colorSurfaceSunken: string;
  colorSurfaceEmphasis: string;
  // Text
  colorTextPrimary: string;
  colorTextSecondary: string;
  colorTextTertiary: string;
  colorTextDisabled: string;
  colorTextLink: string;
  // Border
  colorBorderDefault: string;
  colorBorderStrong: string;
  colorBorderFocus: string;
  // Component overrides
  buttonBorderRadius: string;
  cardBorderRadius: string;
  // Font
  fontFamilySans: string;
  // Meta
  brandName: string;
  brandLogoText: string;
  brandNavStyle: 'sidebar' | 'topbar';
}

export const brandATokens: BrandTokens = {
  colorBrandPrimary: '#0a6eff',
  colorBrandPrimaryHover: '#0056d4',
  colorBrandPrimaryPressed: '#0042a4',
  colorBrandPrimarySubtle: '#e7f0ff',
  colorBrandOnPrimary: '#ffffff',
  colorBrandSecondary: '#1a2540',
  colorBrandSecondaryHover: '#101930',
  colorBrandSecondarySubtle: '#e8ecf4',
  colorBrandOnSecondary: '#ffffff',
  colorBrandAccent: '#f59e0b',
  colorBrandAccentSubtle: '#fff8e1',
  colorBrandOnAccent: '#1a2540',
  colorSurfaceDefault: '#ffffff',
  colorSurfaceSunken: '#f4f6fb',
  colorSurfaceEmphasis: '#e8ecf4',
  colorTextPrimary: '#1a2540',
  colorTextSecondary: '#4a5568',
  colorTextTertiary: '#718096',
  colorTextDisabled: '#a0aec0',
  colorTextLink: '#0a6eff',
  colorBorderDefault: '#dee2e6',
  colorBorderStrong: '#ced4da',
  colorBorderFocus: '#0a6eff',
  buttonBorderRadius: '6px',
  cardBorderRadius: '10px',
  fontFamilySans: "'Inter', system-ui, -apple-system, sans-serif",
  brandName: 'Brand A — Warehouse Ops',
  brandLogoText: 'FDS Warehouse',
  brandNavStyle: 'sidebar',
};

export const brandBTokens: BrandTokens = {
  colorBrandPrimary: '#e8471a',
  colorBrandPrimaryHover: '#c73a12',
  colorBrandPrimaryPressed: '#a32f0e',
  colorBrandPrimarySubtle: '#fef0ec',
  colorBrandOnPrimary: '#ffffff',
  colorBrandSecondary: '#1a4a2e',
  colorBrandSecondaryHover: '#0f3020',
  colorBrandSecondarySubtle: '#e8f4ec',
  colorBrandOnSecondary: '#ffffff',
  colorBrandAccent: '#fbbf24',
  colorBrandAccentSubtle: '#fefce8',
  colorBrandOnAccent: '#1a2540',
  colorSurfaceDefault: '#ffffff',
  colorSurfaceSunken: '#fafbf8',
  colorSurfaceEmphasis: '#eef4f0',
  colorTextPrimary: '#1c1c1e',
  colorTextSecondary: '#52525b',
  colorTextTertiary: '#71717a',
  colorTextDisabled: '#a1a1aa',
  colorTextLink: '#e8471a',
  colorBorderDefault: '#e4e4e7',
  colorBorderStrong: '#d4d4d8',
  colorBorderFocus: '#e8471a',
  buttonBorderRadius: '24px',
  cardBorderRadius: '16px',
  fontFamilySans: "'DM Sans', system-ui, -apple-system, sans-serif",
  brandName: 'Brand B — Last Mile',
  brandLogoText: 'FDS Delivery',
  brandNavStyle: 'topbar',
};

export type BrandId = 'brand-a' | 'brand-b';

export const BRAND_TOKENS: Record<BrandId, BrandTokens> = {
  'brand-a': brandATokens,
  'brand-b': brandBTokens,
};
