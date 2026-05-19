import{R as e}from"./index-pP6CS22B.js";import{a as s}from"./Navbar-B14mKghm.js";import"./jsx-runtime-Z5uAzocK.js";import"./index-DLHbBEj9.js";import"./_commonjsHelpers-Cpj98o6Y.js";const H={title:"Components/Button",component:s,tags:["autodocs"],parameters:{docs:{description:{component:"Primary action element. Renders with Brand A (blue, rectangular) or Brand B (coral, pill-shaped) tokens automatically via ThemeProvider — toggle the **Brand** selector in the toolbar to see the difference."}}},argTypes:{variant:{control:"select",options:["primary","secondary","ghost","danger","especial"]},size:{control:"select",options:["sm","md","lg"]},loading:{control:"boolean"},disabled:{control:"boolean"},fullWidth:{control:"boolean"}},args:{children:"Button Label",variant:"primary",size:"md"}},n={args:{variant:"primary"}},t={args:{variant:"secondary"}},o={args:{variant:"ghost"}},i={args:{variant:"danger"}},c={args:{variant:"especial"},parameters:{docs:{description:{story:"Fondo oscuro #333333. Se usa en tooltips y snackbars."}}}},l={render:r=>e.createElement("div",{style:{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"}},e.createElement(s,{...r,size:"sm"},"Small"),e.createElement(s,{...r,size:"md"},"Medium"),e.createElement(s,{...r,size:"lg"},"Large"))},p={args:{loading:!0}},d={args:{disabled:!0}},m={name:"All Variants (Brand comparison)",render:r=>e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"24px"}},e.createElement("p",{style:{margin:0,fontSize:"12px",color:"#666"}},"Switch Brand in the toolbar — all button shapes and colors update instantly from tokens."),e.createElement("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"}},["primary","secondary","ghost","danger","especial"].map(a=>e.createElement(s,{key:a,...r,variant:a},a.charAt(0).toUpperCase()+a.slice(1)))),e.createElement("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"}},["primary","secondary","ghost","especial"].map(a=>e.createElement(s,{key:a,...r,variant:a,loading:!0},"Loading…"))))};var g,u,y;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    variant: 'primary'
  }
}`,...(y=(u=n.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};var v,x,f;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    variant: 'secondary'
  }
}`,...(f=(x=t.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var h,B,S;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    variant: 'ghost'
  }
}`,...(S=(B=o.parameters)==null?void 0:B.docs)==null?void 0:S.source}}};var b,E,z;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    variant: 'danger'
  }
}`,...(z=(E=i.parameters)==null?void 0:E.docs)==null?void 0:z.source}}};var k,w,A;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    variant: 'especial'
  },
  parameters: {
    docs: {
      description: {
        story: 'Fondo oscuro #333333. Se usa en tooltips y snackbars.'
      }
    }
  }
}`,...(A=(w=c.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var L,W,D;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap'
  }}>
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
}`,...(D=(W=l.parameters)==null?void 0:W.docs)==null?void 0:D.source}}};var P,V,C;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    loading: true
  }
}`,...(C=(V=p.parameters)==null?void 0:V.docs)==null?void 0:C.source}}};var R,F,G;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(G=(F=d.parameters)==null?void 0:F.docs)==null?void 0:G.source}}};var I,M,T;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: 'All Variants (Brand comparison)',
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  }}>
      <p style={{
      margin: 0,
      fontSize: '12px',
      color: '#666'
    }}>
        Switch Brand in the toolbar — all button shapes and colors update instantly from tokens.
      </p>
      <div style={{
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap'
    }}>
        {(['primary', 'secondary', 'ghost', 'danger', 'especial'] as const).map(v => <Button key={v} {...args} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Button>)}
      </div>
      <div style={{
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap'
    }}>
        {(['primary', 'secondary', 'ghost', 'especial'] as const).map(v => <Button key={v} {...args} variant={v} loading>Loading…</Button>)}
      </div>
    </div>
}`,...(T=(M=m.parameters)==null?void 0:M.docs)==null?void 0:T.source}}};const J=["Primary","Secondary","Ghost","Danger","Especial","Sizes","Loading","Disabled","AllVariants"];export{m as AllVariants,i as Danger,d as Disabled,c as Especial,o as Ghost,p as Loading,n as Primary,t as Secondary,l as Sizes,J as __namedExportsOrder,H as default};
