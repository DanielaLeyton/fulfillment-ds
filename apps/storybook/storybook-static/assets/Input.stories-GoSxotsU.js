import{R as e}from"./index-pP6CS22B.js";import{I as c}from"./Navbar-B14mKghm.js";import"./jsx-runtime-Z5uAzocK.js";import"./index-DLHbBEj9.js";import"./_commonjsHelpers-Cpj98o6Y.js";const C={title:"Components/Input",component:c,tags:["autodocs"],args:{placeholder:"Type something…"}},r={},a={args:{label:"Order ID",placeholder:"#ORD-0001"}},t={args:{label:"Email",helperText:"We will send updates here",placeholder:"you@company.com"}},o={args:{label:"Email",errorText:"Invalid email address",defaultValue:"not-valid"}},l={args:{label:"Location",defaultValue:"Warehouse #3",disabled:!0}},s={render:n=>e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px",maxWidth:"360px"}},e.createElement(c,{...n,label:"Search orders",placeholder:"Search…",leftAddon:e.createElement(O,null)}),e.createElement(c,{...n,label:"Password",type:"password",placeholder:"••••••••",rightAddon:e.createElement(T,null)}))};function O(){return e.createElement("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2"},e.createElement("circle",{cx:"11",cy:"11",r:"8"}),e.createElement("path",{d:"m21 21-4.35-4.35"}))}function T(){return e.createElement("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2"},e.createElement("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),e.createElement("circle",{cx:"12",cy:"12",r:"3"}))}var d,i,p;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(p=(i=r.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};var m,u,h;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    label: 'Order ID',
    placeholder: '#ORD-0001'
  }
}`,...(h=(u=a.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var g,x,E;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    helperText: 'We will send updates here',
    placeholder: 'you@company.com'
  }
}`,...(E=(x=t.parameters)==null?void 0:x.docs)==null?void 0:E.source}}};var f,b,W;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    errorText: 'Invalid email address',
    defaultValue: 'not-valid'
  }
}`,...(W=(b=o.parameters)==null?void 0:b.docs)==null?void 0:W.source}}};var y,I,S;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    label: 'Location',
    defaultValue: 'Warehouse #3',
    disabled: true
  }
}`,...(S=(I=l.parameters)==null?void 0:I.docs)==null?void 0:S.source}}};var v,w,D;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '360px'
  }}>
      <Input {...args} label="Search orders" placeholder="Search…" leftAddon={<SearchIcon />} />
      <Input {...args} label="Password" type="password" placeholder="••••••••" rightAddon={<EyeIcon />} />
    </div>
}`,...(D=(w=s.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};const B=["Default","WithLabel","WithHelper","WithError","Disabled","WithIcons"];export{r as Default,l as Disabled,o as WithError,t as WithHelper,s as WithIcons,a as WithLabel,B as __namedExportsOrder,C as default};
