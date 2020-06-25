(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(36)},36:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),l=t.n(o),c=t(2),u=function(e){var n=e.person,t=e.handleDelete,a={padding:"0px 10px 0px 10px"};return r.a.createElement("tr",null,r.a.createElement("td",{style:a},n.name),r.a.createElement("td",{style:a},n.number),r.a.createElement("td",{style:a},r.a.createElement("button",{onClick:function(){return t(n)}},r.a.createElement("i",{class:"fa fa-trash"})),r.a.createElement("br",null)))},i=function(e){var n=e.persons,t=e.searchTerm,a=e.handleDelete;return r.a.createElement(r.a.Fragment,null,r.a.createElement("table",null,n.filter((function(e){return-1!==e.name.toLowerCase().indexOf(t.toLowerCase())})).map((function(e){return r.a.createElement(u,{key:e.id,person:e,handleDelete:a})}))))},m=function(e){var n=e.searchTerm,t=e.handleSearchChange;return r.a.createElement(r.a.Fragment,null,"search: ",r.a.createElement("input",{value:n,onChange:t}))},s=function(e){var n=e.addPerson,t=e.newName,a=e.handleNameChange,o=e.newNumber,l=e.handleNumberChange;return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a}),r.a.createElement("br",null),"number: ",r.a.createElement("input",{value:o,onChange:l})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},d=function(e){var n=e.message,t=e.success,a={background:"lightgray",borderStyle:"solid",borderRadius:5,padding:5,margin:15,fontSize:20,fontStyle:"italic"};return a.color=t?"green":"red",null===n?null:r.a.createElement("div",{style:a},n)},f=t(3),h=t.n(f),b="/api/persons",p=function(){return h.a.get(b).then((function(e){return e.data}))},g=function(e){return h.a.post(b,e).then((function(e){return e.data}))},E=function(e){return h.a.delete("".concat(b,"/").concat(e.id))},v=function(e){return h.a.put("".concat(b,"/").concat(e.id),e).then((function(e){return e.data}))},w=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],o=n[1],l=Object(a.useState)("add a new name..."),u=Object(c.a)(l,2),f=u[0],h=u[1],b=Object(a.useState)(""),w=Object(c.a)(b,2),O=w[0],j=w[1],y=Object(a.useState)(""),S=Object(c.a)(y,2),C=S[0],k=S[1],T=Object(a.useState)(null),N=Object(c.a)(T,2),x=N[0],D=N[1],A=Object(a.useState)(!1),P=Object(c.a)(A,2),F=P[0],J=P[1],L=function(e,n){return e.name<n.name?-1:1};Object(a.useEffect)((function(){p().then((function(e){console.log("getAll fulfilled",e),o(e.sort(L))}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(d,{message:x,success:F}),r.a.createElement(m,{searchTerm:C,handleSearchChange:function(e){k(e.target.value)}}),r.a.createElement("h2",null,"Add a new person"),r.a.createElement(s,{addPerson:function(e){e.preventDefault();var n={name:f,number:O},a=void 0===t.find((function(e){return e.name===f}));if(""===f)alert("Please enter a name");else if(a)g(n).then((function(e){console.log("new item added ",e),o(t.concat(e).sort(L)),h(""),j(""),J(!0),D("Added ".concat(e.name," ")),setTimeout((function(){D(null)}),2500)})).catch((function(e){console.log(e.response.data),J(!1),D(e.response.data.error),setTimeout((function(){D(null)}),5e3)}));else{window.confirm("".concat(n.name," is already in the phonebook. Replace the old number with a new one?"))&&(console.log("".concat(n.name," will be updated...")),n.id=t.find((function(e){return e.name===n.name})).id,v(n).then((function(e){console.log("... to:",e),o(t.map((function(t){return t.id!==n.id?t:e}))),h(""),j(""),J(!0),D("Updated ".concat(e.name," ")),setTimeout((function(){D(null)}),2500)})).catch((function(e){console.log(e.response.data),J(!1),D(e.response.data.error),setTimeout((function(){D(null)}),5e3)})))}},newName:f,handleNameChange:function(e){h(e.target.value)},newNumber:O,handleNumberChange:function(e){j(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(i,{persons:t,searchTerm:C,handleDelete:function(e){window.confirm("Are you sure to delete ".concat(e.name," from the phonebook?"))&&(console.log("".concat(e.name," will be deleted now!!!")),E(e).then((function(){o(t.filter((function(n){return n!==e}))),h(""),j(""),J(!0),D("Deleted ".concat(e.name," ")),setTimeout((function(){D(null)}),2500)})).catch((function(){J(!1),D("".concat(e.name," is alredy deleted from the server")),setTimeout((function(){D(null)}),3500)})))}}))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.ffd5562f.chunk.js.map