import{R as e}from"./index-pP6CS22B.js";import{B as a}from"./Navbar-B14mKghm.js";import"./jsx-runtime-Z5uAzocK.js";import"./index-DLHbBEj9.js";import"./_commonjsHelpers-Cpj98o6Y.js";const E={title:"Components/Badge",component:a,tags:["autodocs"]},r={name:"All Variants",render:()=>e.createElement("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap",alignItems:"center"}},["default","primary","success","warning","danger","info"].map(t=>e.createElement(a,{key:t,variant:t},t.charAt(0).toUpperCase()+t.slice(1))))},n={render:()=>e.createElement("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap",alignItems:"center"}},e.createElement(a,{variant:"success",dot:!0},"Active"),e.createElement(a,{variant:"warning",dot:!0},"Pending"),e.createElement(a,{variant:"danger",dot:!0},"Failed"),e.createElement(a,{variant:"default",dot:!0},"Idle"))},d={name:"Fulfillment Order Statuses",render:()=>e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},e.createElement("p",{style:{margin:0,fontSize:"12px",color:"#888"}},"Typical order lifecycle statuses:"),e.createElement("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},e.createElement(a,{variant:"default",dot:!0},"Draft"),e.createElement(a,{variant:"info",dot:!0},"Assigned"),e.createElement(a,{variant:"warning",dot:!0},"In Transit"),e.createElement(a,{variant:"success",dot:!0},"Delivered"),e.createElement(a,{variant:"danger",dot:!0},"Failed")))};var s,i,l;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <div style={{
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    alignItems: 'center'
  }}>
      {(['default', 'primary', 'success', 'warning', 'danger', 'info'] as const).map(v => <Badge key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Badge>)}
    </div>
}`,...(l=(i=r.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var o,c,p;n.parameters={...n.parameters,docs:{...(o=n.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    alignItems: 'center'
  }}>
      <Badge variant="success" dot>Active</Badge>
      <Badge variant="warning" dot>Pending</Badge>
      <Badge variant="danger" dot>Failed</Badge>
      <Badge variant="default" dot>Idle</Badge>
    </div>
}`,...(p=(c=n.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var g,m,u;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: 'Fulfillment Order Statuses',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <p style={{
      margin: 0,
      fontSize: '12px',
      color: '#888'
    }}>Typical order lifecycle statuses:</p>
      <div style={{
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    }}>
        <Badge variant="default" dot>Draft</Badge>
        <Badge variant="info" dot>Assigned</Badge>
        <Badge variant="warning" dot>In Transit</Badge>
        <Badge variant="success" dot>Delivered</Badge>
        <Badge variant="danger" dot>Failed</Badge>
      </div>
    </div>
}`,...(u=(m=d.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const w=["AllVariants","WithDot","OrderStatuses"];export{r as AllVariants,d as OrderStatuses,n as WithDot,w as __namedExportsOrder,E as default};
