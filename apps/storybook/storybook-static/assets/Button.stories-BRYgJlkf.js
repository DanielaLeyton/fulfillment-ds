import{a as r}from"./Navbar-Bm1P_7NR.js";import"./jsx-runtime-Z5uAzocK.js";import"./index-pP6CS22B.js";import"./index-DLHbBEj9.js";import"./_commonjsHelpers-Cpj98o6Y.js";const _={title:"Components/Button",component:r,tags:["autodocs"],parameters:{docs:{description:{component:"Primary action element. Renders with Brand A (blue, rectangular) or Brand B (coral, pill-shaped) tokens automatically via ThemeProvider — toggle the **Brand** selector in the toolbar to see the difference."}}},argTypes:{variant:{control:"select",options:["primary","secondary","ghost","danger"]},size:{control:"select",options:["sm","md","lg"]},loading:{control:"boolean"},disabled:{control:"boolean"},fullWidth:{control:"boolean"}},args:{children:"Button Label",variant:"primary",size:"md"}},t={args:{variant:"primary"}},n={args:{variant:"secondary"}},s={args:{variant:"ghost"}},o={args:{variant:"danger"}},i={render:a=>React.createElement("div",{style:{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"}},React.createElement(r,{...a,size:"sm"},"Small"),React.createElement(r,{...a,size:"md"},"Medium"),React.createElement(r,{...a,size:"lg"},"Large"))},c={args:{loading:!0}},l={args:{disabled:!0}},p={name:"All Variants (Brand comparison)",render:a=>React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"24px"}},React.createElement("p",{style:{margin:0,fontSize:"12px",color:"#666"}},"Switch Brand in the toolbar — all button shapes and colors update instantly from tokens."),React.createElement("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"}},["primary","secondary","ghost","danger"].map(e=>React.createElement(r,{key:e,...a,variant:e},e.charAt(0).toUpperCase()+e.slice(1)))),React.createElement("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"}},["primary","secondary","ghost"].map(e=>React.createElement(r,{key:e,...a,variant:e,loading:!0},"Loading…"))))};var d,m,g;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    variant: 'primary'
  }
}`,...(g=(m=t.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var u,y,v;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    variant: 'secondary'
  }
}`,...(v=(y=n.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var x,f,h;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    variant: 'ghost'
  }
}`,...(h=(f=s.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var B,S,b;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    variant: 'danger'
  }
}`,...(b=(S=o.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};var z,E,R;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(R=(E=i.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var w,k,A;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    loading: true
  }
}`,...(A=(k=c.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};var L,W,D;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(D=(W=l.parameters)==null?void 0:W.docs)==null?void 0:D.source}}};var P,V,C;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
        {(['primary', 'secondary', 'ghost', 'danger'] as const).map(v => <Button key={v} {...args} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Button>)}
      </div>
      <div style={{
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap'
    }}>
        {(['primary', 'secondary', 'ghost'] as const).map(v => <Button key={v} {...args} variant={v} loading>Loading…</Button>)}
      </div>
    </div>
}`,...(C=(V=p.parameters)==null?void 0:V.docs)==null?void 0:C.source}}};const O=["Primary","Secondary","Ghost","Danger","Sizes","Loading","Disabled","AllVariants"];export{p as AllVariants,o as Danger,l as Disabled,s as Ghost,c as Loading,t as Primary,n as Secondary,i as Sizes,O as __namedExportsOrder,_ as default};
