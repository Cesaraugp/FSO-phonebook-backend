(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var r=t(15),o=t.n(r),a=t(6),c=t(4),i=t(2),s=t(0),u=function(e){var n=e.handleOnChange;return Object(s.jsxs)("div",{children:["filter shown with ",Object(s.jsx)("input",{name:"filter",onChange:n})]})},d=function(e){var n=e.newName,t=e.newPhone,r=e.inputChangeHandler,o=e.buttonHandler;return Object(s.jsxs)("form",{children:[Object(s.jsxs)("div",{children:["name:"," ",Object(s.jsx)("input",{name:"name",value:n,onChange:r})]}),Object(s.jsxs)("div",{children:["number:"," ",Object(s.jsx)("input",{name:"phone",value:t,onChange:r})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{onClick:o,type:"submit",children:"add"})})]})},l=function(e){var n=e.id,t=e.name,r=e.phone,o=e.deletePerson;return Object(s.jsx)("div",{children:Object(s.jsxs)("p",{children:[t," ",r," ",Object(s.jsx)("button",{onClick:function(){return o(n)},children:"Delete"})]})})},h=function(e){var n=e.filter,t=e.persons,r=e.deletePersonsHandler;return""!==n?Object(s.jsx)(s.Fragment,{children:t.map((function(e){return!(!e.name.toLowerCase().includes(n)&&!e.phone.toString().includes(n))&&Object(s.jsx)(l,{id:e.id,name:e.name,phone:e.phone,deletePerson:r})}))}):Object(s.jsx)(s.Fragment,{children:t.map((function(e){return Object(s.jsx)(l,{id:e.id,name:e.name,phone:e.phone,deletePerson:r},e.id)}))})},j=t(3),f=t.n(j),b="/api/persons/",m={saveNewPerson:function(e){return f.a.post(b,e).then((function(e){return e.data}))},deletePerson:function(e){return f.a.delete("".concat(b,"/").concat(e)).then((function(){console.log("User sucessfully deleted")}))},updateNumber:function(e,n){return f.a.put("".concat(b,"/").concat(e),n).then((function(e){return e.data}))}},p=function(e){var n=e.props;if(null==n)return null;var t=n.message,r=n.isError;console.log(t,r);var o="notification ".concat(r?"error":"success");return Object(s.jsx)("div",{className:o,children:t})},O=function(){var e=Object(i.useState)(),n=Object(c.a)(e,2),t=n[0],r=n[1],o=Object(i.useState)([]),l=Object(c.a)(o,2),j=l[0],b=l[1],O=Object(i.useState)(""),v=Object(c.a)(O,2),g=v[0],x=v[1],w=Object(i.useState)(""),C=Object(c.a)(w,2),P=C[0],y=C[1],k=Object(i.useState)(""),N=Object(c.a)(k,2),S=N[0],E=N[1];Object(i.useEffect)((function(){f.a.get("/api/persons/").then((function(e){return b(e.data)}))}),[]);return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Phonebook"}),Object(s.jsx)(p,{props:t}),Object(s.jsx)(u,{handleOnChange:function(e){E(e.target.value.toLowerCase().trim())}}),Object(s.jsx)("h2",{children:"Add a new"}),Object(s.jsx)(d,{newName:g,newPhone:P,inputChangeHandler:function(e){"name"!==e.target.name?y(e.target.value):x(e.target.value)},buttonHandler:function(e){if(e.preventDefault(),!g|!P)alert("Please fill the ".concat(g?"phone":"name"," field"));else{var n=j.some((function(e){return e.name.toLowerCase()===g.toLowerCase()})),t=j.some((function(e){return e.phone.toString()===P}));if(t||n){if(t)return void alert("The number ".concat(P," is already registered"));if(window.confirm("\xbf".concat(g," is already registered on the phonebook, do you want to replace the old number with the new one?"))){var o=j.find((function(e){return e.name.toLowerCase()===g.toLowerCase()})),c=Object(a.a)(Object(a.a)({},o),{},{phone:P}),i=o.id;m.updateNumber(i,c).then((function(e){b(j.map((function(n){return n.id!==i?n:e})))}))}}n||t||m.saveNewPerson({name:g,phone:P}).then((function(e){r({message:"Added ".concat(g,":").concat(P),isError:!1}),setTimeout((function(){r(null)}),3e3),b(j.concat(e)),x(""),y("")})).catch((function(e){console.log(e.response.data.error),r({message:e.response.data.error,isError:!0}),setTimeout((function(){r(null)}),3e3)}))}}}),Object(s.jsx)("h2",{children:"Numbers"}),Object(s.jsx)(h,{filter:S,persons:j,deletePersonsHandler:function(e){var n=j.find((function(n){return n.id===e})).name;window.confirm("\xbfare you sure you want to delete ".concat(n,"?"))&&m.deletePerson(e).then((function(){b(j.filter((function(n){return n.id!==e})))})).catch((function(){r({message:"Information from ".concat(n," has already been removed from the server"),isError:!0}),setTimeout((function(){r(null)}),3e3)}))}}),"..."]})};t(39);o.a.render(Object(s.jsx)(O,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.e20169f4.chunk.js.map