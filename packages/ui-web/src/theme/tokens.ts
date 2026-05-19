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
  // Brand A primary: Information palette — Open Sans
  colorBrandPrimary: '#0275EF',
  colorBrandPrimaryHover: '#0255CE',
  colorBrandPrimaryPressed: '#013BAC',
  colorBrandPrimarySubtle: '#E8F4FF',
  colorBrandOnPrimary: '#ffffff',
  colorBrandSecondary: '#2D3A41',
  colorBrandSecondaryHover: '#232D34',
  colorBrandSecondarySubtle: '#E7EBEA',
  colorBrandOnSecondary: '#ffffff',
  colorBrandAccent: '#FBBF24',
  colorBrandAccentSubtle: '#FDFBDE',
  colorBrandOnAccent: '#232D34',
  colorSurfaceDefault: '#ffffff',
  colorSurfaceSunken: '#F9FBFC',
  colorSurfaceEmphasis: '#E7EBEA',
  colorTextPrimary: '#192126',
  colorTextSecondary: '#37474F',
  colorTextTertiary: '#63767A',
  colorTextDisabled: '#90A3A3',
  colorTextLink: '#0255CE',
  colorBorderDefault: '#E7EBEA',
  colorBorderStrong: '#BECBC9',
  colorBorderFocus: '#0275EF',
  buttonBorderRadius: '6px',
  cardBorderRadius: '10px',
  fontFamilySans: "'Open Sans', system-ui, -apple-system, sans-serif",
  brandName: 'Brand A — Warehouse Ops',
  brandLogoText: 'FDS Warehouse',
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
