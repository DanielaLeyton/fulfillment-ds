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
  // Brand A primary: Brand-A-Primary palette — Open Sans
  colorBrandPrimary: '#006DFF',
  colorBrandPrimaryHover: '#065BDC',
  colorBrandPrimaryPressed: '#0C49B9',
  colorBrandPrimarySubtle: '#E8F0FF',
  colorBrandOnPrimary: '#ffffff',
  colorBrandSecondary: '#0F3893',
  colorBrandSecondaryHover: '#0C49B9',
  colorBrandSecondarySubtle: '#E8F0FF',
  colorBrandOnSecondary: '#ffffff',
  colorBrandAccent: '#FBBF24',
  colorBrandAccentSubtle: '#FDFBDE',
  colorBrandOnAccent: '#192126',
  colorSurfaceDefault: '#ffffff',
  colorSurfaceSunken: '#F4F7FF',
  colorSurfaceEmphasis: '#E8F0FF',
  colorTextPrimary: '#0E2B69',
  colorTextSecondary: '#37474F',
  colorTextTertiary: '#63767A',
  colorTextDisabled: '#90A3A3',
  colorTextLink: '#006DFF',
  colorBorderDefault: '#E2E8F0',
  colorBorderStrong: '#CBD5E0',
  colorBorderFocus: '#006DFF',
  buttonBorderRadius: '6px',
  cardBorderRadius: '8px',
  fontFamilySans: "'Open Sans', system-ui, -apple-system, sans-serif",
  brandName: 'Brand A — Warehouse Ops',
  brandLogoText: 'Shipping',
  brandNavStyle: 'sidebar',
};

export const brandBTokens: BrandTokens = {
  // Brand B primary: Primary green palette — Plus Jakarta Sans
  colorBrandPrimary: '#0A8920',
  colorBrandPrimaryHover: '#07751B',
  colorBrandPrimaryPressed: '#046017',
  colorBrandPrimarySubtle: '#E5F8E3',
  colorBrandOnPrimary: '#ffffff',
  colorBrandSecondary: '#2D3A41',
  colorBrandSecondaryHover: '#232D34',
  colorBrandSecondarySubtle: '#E7EBEA',
  colorBrandOnSecondary: '#ffffff',
  colorBrandAccent: '#39AD3E',
  colorBrandAccentSubtle: '#E5F8E3',
  colorBrandOnAccent: '#ffffff',
  colorSurfaceDefault: '#ffffff',
  colorSurfaceSunken: '#F9FBFC',
  colorSurfaceEmphasis: '#E5F8E3',
  colorTextPrimary: '#192126',
  colorTextSecondary: '#37474F',
  colorTextTertiary: '#63767A',
  colorTextDisabled: '#90A3A3',
  colorTextLink: '#0A8920',
  colorBorderDefault: '#E7EBEA',
  colorBorderStrong: '#BECBC9',
  colorBorderFocus: '#0A8920',
  buttonBorderRadius: '6px',
  cardBorderRadius: '10px',
  fontFamilySans: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  brandName: 'Brand B — Last Mile',
  brandLogoText: 'FDS Delivery',
  brandNavStyle: 'topbar',
};

export type BrandId = 'brand-a' | 'brand-b';

export const BRAND_TOKENS: Record<BrandId, BrandTokens> = {
  'brand-a': brandATokens,
  'brand-b': brandBTokens,
};
