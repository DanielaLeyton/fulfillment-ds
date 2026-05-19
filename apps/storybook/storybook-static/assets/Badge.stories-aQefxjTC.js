import{B as e}from"./Navbar-Bm1P_7NR.js";import"./jsx-runtime-Z5uAzocK.js";import"./index-pP6CS22B.js";import"./index-DLHbBEj9.js";import"./_commonjsHelpers-Cpj98o6Y.js";const B={title:"Components/Badge",component:e,tags:["autodocs"]},t={name:"All Variants",render:()=>React.createElement("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap",alignItems:"center"}},["default","primary","success","warning","danger","info"].map(a=>React.createElement(e,{key:a,variant:a},a.charAt(0).toUpperCase()+a.slice(1))))},r={render:()=>React.createElement("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap",alignItems:"center"}},React.createElement(e,{variant:"success",dot:!0},"Active"),React.createElement(e,{variant:"warning",dot:!0},"Pending"),React.createElement(e,{variant:"danger",dot:!0},"Failed"),React.createElement(e,{variant:"default",dot:!0},"Idle"))},n={name:"Fulfillment Order Statuses",render:()=>React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},React.createElement("p",{style:{margin:0,fontSize:"12px",color:"#888"}},"Typical order lifecycle statuses:"),React.createElement("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},React.createElement(e,{variant:"default",dot:!0},"Draft"),React.createElement(e,{variant:"info",dot:!0},"Assigned"),React.createElement(e,{variant:"warning",dot:!0},"In Transit"),React.createElement(e,{variant:"success",dot:!0},"Delivered"),React.createElement(e,{variant:"danger",dot:!0},"Failed")))};var d,s,i;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <div style={{
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    alignItems: 'center'
  }}>
      {(['default', 'primary', 'success', 'warning', 'danger', 'info'] as const).map(v => <Badge key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Badge>)}
    </div>
}`,...(i=(s=t.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var l,c,o;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(o=(c=r.parameters)==null?void 0:c.docs)==null?void 0:o.source}}};var p,g,m;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(m=(g=n.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};const E=["AllVariants","WithDot","OrderStatuses"];export{t as AllVariants,n as OrderStatuses,r as WithDot,E as __namedExportsOrder,B as default};
