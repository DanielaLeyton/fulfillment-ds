import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useTheme } from '@fds/ui-web';

function TokensPage() {
  const { tokens, brandId } = useTheme();

  const colorGroups = [
    {
      title: 'Brand Colors',
      tokens: [
        ['Primary',          tokens.colorBrandPrimary],
        ['Primary Hover',    tokens.colorBrandPrimaryHover],
        ['Primary Subtle',   tokens.colorBrandPrimarySubtle],
        ['Secondary',        tokens.colorBrandSecondary],
        ['Secondary Subtle', tokens.colorBrandSecondarySubtle],
        ['Accent',           tokens.colorBrandAccent],
        ['Accent Subtle',    tokens.colorBrandAccentSubtle],
      ],
    },
    {
      title: 'Surface',
      tokens: [
        ['Default',   tokens.colorSurfaceDefault],
        ['Sunken',    tokens.colorSurfaceSunken],
        ['Emphasis',  tokens.colorSurfaceEmphasis],
      ],
    },
    {
      title: 'Text',
      tokens: [
        ['Primary',   tokens.colorTextPrimary],
        ['Secondary', tokens.colorTextSecondary],
        ['Tertiary',  tokens.colorTextTertiary],
        ['Disabled',  tokens.colorTextDisabled],
        ['Link',      tokens.colorTextLink],
      ],
    },
  ];

  return (
    <div style={{ fontFamily: tokens.fontFamilySans, color: tokens.colorTextPrimary }}>
      <div style={{ marginBottom: '32px', padding: '20px', background: tokens.colorBrandSecondary, borderRadius: '12px', color: tokens.colorBrandOnSecondary }}>
        <h1 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 700 }}>{tokens.brandName}</h1>
        <p style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>Brand ID: <code>{brandId}</code></p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {colorGroups.map((group) => (
          <div key={group.title}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>{group.title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
              {group.tokens.map(([name, value]) => (
                <div key={name} style={{ border: `1px solid ${tokens.colorBorderDefault}`, borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ height: '56px', background: value }} />
                  <div style={{ padding: '10px 12px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 500 }}>{name}</div>
                    <div style={{ fontSize: '11px', color: tokens.colorTextTertiary, marginTop: '2px', fontFamily: 'monospace' }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Component Tokens</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', maxWidth: '480px' }}>
            {[
              ['Button Border Radius', tokens.buttonBorderRadius],
              ['Card Border Radius',   tokens.cardBorderRadius],
              ['Font Family',          tokens.fontFamilySans],
              ['Nav Style',            tokens.brandNavStyle],
            ].map(([k, v]) => (
              <div key={k} style={{ padding: '12px', background: tokens.colorSurfaceSunken, borderRadius: '8px' }}>
                <div style={{ fontSize: '11px', color: tokens.colorTextTertiary, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{k}</div>
                <div style={{ fontSize: '13px', fontWeight: 500, fontFamily: 'monospace' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: 'Design Tokens/Overview',
  component: TokensPage,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Live token inspector — switch Brand in the toolbar to compare Brand A vs Brand B side by side.',
      },
    },
  },
} satisfies Meta<typeof TokensPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BrandTokens: Story = { name: 'Brand Token Inspector' };
