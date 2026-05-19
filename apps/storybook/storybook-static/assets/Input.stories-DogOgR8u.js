import{I as s}from"./Navbar-Bm1P_7NR.js";import"./jsx-runtime-Z5uAzocK.js";import"./index-pP6CS22B.js";import"./index-DLHbBEj9.js";import"./_commonjsHelpers-Cpj98o6Y.js";const V={title:"Components/Input",component:s,tags:["autodocs"],args:{placeholder:"Type something…"}},e={},r={args:{label:"Order ID",placeholder:"#ORD-0001"}},a={args:{label:"Email",helperText:"We will send updates here",placeholder:"you@company.com"}},t={args:{label:"Email",errorText:"Invalid email address",defaultValue:"not-valid"}},o={args:{label:"Location",defaultValue:"Warehouse #3",disabled:!0}},l={render:c=>React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px",maxWidth:"360px"}},React.createElement(s,{...c,label:"Search orders",placeholder:"Search…",leftAddon:React.createElement(w,null)}),React.createElement(s,{...c,label:"Password",type:"password",placeholder:"••••••••",rightAddon:React.createElement(D,null)}))};function w(){return React.createElement("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2"},React.createElement("circle",{cx:"11",cy:"11",r:"8"}),React.createElement("path",{d:"m21 21-4.35-4.35"}))}function D(){return React.createElement("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2"},React.createElement("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),React.createElement("circle",{cx:"12",cy:"12",r:"3"}))}var n,d,i;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(i=(d=e.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};var p,m,u;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    label: 'Order ID',
    placeholder: '#ORD-0001'
  }
}`,...(u=(m=r.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var h,g,x;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    helperText: 'We will send updates here',
    placeholder: 'you@company.com'
  }
}`,...(x=(g=a.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var E,b,f;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    errorText: 'Invalid email address',
    defaultValue: 'not-valid'
  }
}`,...(f=(b=t.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var W,y,I;o.parameters={...o.parameters,docs:{...(W=o.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    label: 'Location',
    defaultValue: 'Warehouse #3',
    disabled: true
  }
}`,...(I=(y=o.parameters)==null?void 0:y.docs)==null?void 0:I.source}}};var R,S,v;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '360px'
  }}>
      <Input {...args} label="Search orders" placeholder="Search…" leftAddon={<SearchIcon />} />
      <Input {...args} label="Password" type="password" placeholder="••••••••" rightAddon={<EyeIcon />} />
    </div>
}`,...(v=(S=l.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};const C=["Default","WithLabel","WithHelper","WithError","Disabled","WithIcons"];export{e as Default,o as Disabled,t as WithError,a as WithHelper,l as WithIcons,r as WithLabel,C as __namedExportsOrder,V as default};
