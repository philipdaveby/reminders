(this.webpackJsonpreminders=this.webpackJsonpreminders||[]).push([[0],{50:function(t,e,n){},67:function(t,e,n){"use strict";n.r(e);var r=n(1),c=n.n(r),a=n(34),o=n.n(a),s=(n(50),n(5)),i=n(2),u=n.n(i),l=n(4),d=c.a.createContext(null),p={backend_url:"https://pure-shelf-04149.herokuapp.com"},b=n.p+"static/media/close1.b1f68317.png",f=n.p+"static/media/add1.4be40fd6.png",m=n.p+"static/media/save1.ca727b2f.png",j=n.p+"static/media/filter.c59977a1.png",h=n(0),x=function(t){var e=t.socket,n=t.todos,c=t.filtered,a=t.setFiltered,o=Object(r.useState)(!1),i=Object(s.a)(o,2),x=i[0],O=i[1],g=Object(r.useContext)(d),v=Object(r.useRef)(null),k=function(){var t=Object(l.a)(u.a.mark((function t(n){var r,c;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),r=n.currentTarget.task.value){t.next=4;break}return t.abrupt("return");case 4:return O(!1),c={task:r,userId:null===g||void 0===g?void 0:g.uid},n.currentTarget.task.value="",t.next=9,null===g||void 0===g?void 0:g.getIdToken(!0).then(function(){var t=Object(l.a)(u.a.mark((function t(e){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(p.backend_url,"/api/todos"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:e},body:JSON.stringify({todoObject:c})}).catch((function(t){return console.log(t)}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){return console.log(t.message)}));case 9:e.emit("add-todo");case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),w=function(){O(!x),setTimeout((function(){var t;null===(t=v.current)||void 0===t||t.focus()}))};return Object(h.jsx)("div",{className:"z-10 fixed bottom-0 w-full",children:Object(h.jsxs)("form",{onSubmit:function(t){return k(t)},className:"flex max-w-3xl m-auto justify-evenly items-center  pb-2 bg-white",children:[n&&void 0===n[0]&&Object(h.jsxs)("div",{className:"fixed top-40",children:[Object(h.jsx)("h1",{className:"text-2xl mt-14",children:"Create your first To-Do"}),Object(h.jsx)("button",{onClick:w,children:Object(h.jsx)("img",{className:"w-14",src:f,alt:"Add new to-do"})})]}),Object(h.jsx)("button",{type:"submit",title:"Save to-do",className:x?"":"invisible",children:Object(h.jsx)("img",{className:"w-9",src:m,alt:"Add to-do"})}),Object(h.jsx)("input",{ref:v,type:"text",name:"task",placeholder:"Enter you to-do...",className:x?"rounded mx-2 h-8":"invisible rounded mx-2 h-8"}),Object(h.jsxs)("div",{className:"flex justify-around items-center",children:[Object(h.jsx)("img",{src:b,alt:"Close to-do input",title:"Close",className:x?"w-12 cursor-pointer":"w-12 cursor-pointer hidden",onClick:function(){return O(!x)}}),n&&n[0]&&Object(h.jsx)("img",{src:f,alt:"add new to-do",title:"Add new to-do",className:x?"w-12 cursor-pointer hidden":"w-12 cursor-pointer",onClick:w}),n&&n[0]&&Object(h.jsx)("button",{type:"button",title:"Filter completed to-dos",onClick:function(){return a(!c)},className:"",children:Object(h.jsx)("img",{className:c?"w-14 transform rotate-90 border-2 rounded-full mr-4":"w-14 transform rotate-90 mr-4",src:j,alt:"Filter your to-dos"})})]})]})})},O=n(7),g=n(27);n(53);O.a.initializeApp({apiKey:"AIzaSyD-nlkie1qOOK8W_u_CgQLgWOHE3l0oia4",authDomain:"reminders-development.firebaseapp.com",projectId:"reminders-development",storageBucket:"reminders-development.appspot.com",messagingSenderId:"388686471557",appId:"1:388686471557:web:a2de16b04699831210e4ec"});var v=O.a.auth(),k=(n(55),function(){var t=Object(l.a)(u.a.mark((function t(){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v.signOut();case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()),w=function(t){return Object(g.b)(t)},N=n.p+"static/media/delete1.17136cb9.png",y=n.p+"static/media/edit1.81df9553.png",S=n.p+"static/media/done2.a05ae916.png",T=function(t){var e=t.sub,n=t.socket,c=t.todo,a=t.edit,o=t.completed,i=Object(r.useState)(!1),d=Object(s.a)(i,2),f=d[0],j=d[1],x=Object(r.useState)(""),g=Object(s.a)(x,2),v=g[0],k=g[1],w=Object(r.useState)(e.isComplete),T=Object(s.a)(w,2),C=T[0],I=T[1],A=Object(r.useRef)(null);Object(r.useEffect)((function(){I(!!o)}),[o]);var E=function(){var t=Object(l.a)(u.a.mark((function t(e){var n,r,a;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=c.todoId,a=e.currentTarget.id,t.next=4,null===(n=O.a.auth().currentUser)||void 0===n?void 0:n.getIdToken(!0).then(function(){var t=Object(l.a)(u.a.mark((function t(e){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(p.backend_url,"/api/todos/").concat(r,"/subtasks/").concat(a),{method:"PATCH",headers:{Authorization:e,"Content-Type":"application/json"},body:JSON.stringify({isComplete:!C})}).catch((function(t){return console.log(t.message)}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){return console.log(t.message)}));case 4:I(!C);case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),z=function(){var t=Object(l.a)(u.a.mark((function t(e){var r,a,o;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=c.todoId,o=e.currentTarget.id,t.next=4,null===(r=O.a.auth().currentUser)||void 0===r?void 0:r.getIdToken(!0).then(function(){var t=Object(l.a)(u.a.mark((function t(e){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(p.backend_url,"/api/todos/").concat(a,"/subtasks/").concat(o),{method:"DELETE",headers:{Authorization:e}});case 2:n.emit("add-todo");case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){return console.log(t.message)}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),P=function(){j((function(t){return!t})),setTimeout((function(){var t;null===(t=A.current)||void 0===t||t.focus()}))},D=function(){var t=Object(l.a)(u.a.mark((function t(e){var r,a,o;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),a=c.todoId,o=e.currentTarget.id,t.next=5,null===(r=O.a.auth().currentUser)||void 0===r?void 0:r.getIdToken(!0).then(function(){var t=Object(l.a)(u.a.mark((function t(e){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(p.backend_url,"/api/todos/").concat(a,"/subtasks/").concat(o),{method:"PATCH",headers:{Authorization:e,"Content-Type":"application/json"},body:JSON.stringify({subTask:v})}).then((function(){n.emit("add-todo"),k(""),j(!1)})).catch((function(t){return console.log(t.message)}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){return console.log(t.message)}));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(h.jsxs)("li",{className:C?"grid grid-cols-4 order-last":"grid grid-cols-4 order-first",children:[f?Object(h.jsx)("button",{id:e.subId.toString(),onClick:function(t){return D(t)},className:"m-1 pl-1 pr-1 cursor-pointer",children:Object(h.jsx)("img",{src:m,title:"Save sub task",alt:"save edited sub task",className:"w-7"})}):Object(h.jsx)("button",{id:e.subId.toString(),onClick:E,className:"m-1 pl-1 pr-1 cursor-pointer",children:Object(h.jsx)("img",{src:S,title:"Mark sub task as done",alt:"mark sub task as done",className:o?"w-6 filter opacity-30":"w-6"})}),f?Object(h.jsx)("form",{className:"m-1 border rounded col-start-2 col-end-4",onSubmit:function(t){return D(t)},id:e.subId.toString(),children:Object(h.jsx)("input",{onChange:function(t){return k(t.currentTarget.value)},ref:A,defaultValue:e.task})}):Object(h.jsx)("div",{className:"flex col-start-2 col-end-4 justify-center",children:Object(h.jsx)("p",{className:C||o?"text-base self-center text-lightgray line-through":"text-base self-center",children:e.task})}),Object(h.jsxs)("div",{className:"flex content-center justify-items-end",children:[a&&Object(h.jsx)("button",{"data-testid":"edit-menu",id:e.subId.toString(),title:"Edit sub task",onClick:P,className:f?"hidden m-1 pl-1 pr-1 cursor-pointer":"m-1 pl-1 pr-1 cursor-pointer",children:Object(h.jsx)("img",{src:y,alt:"editSub sub task",className:"w-7"})}),Object(h.jsx)("button",{id:e.subId.toString(),title:"Cancel",onClick:P,className:f?"m-1 pl-1 pr-1 cursor-pointer":"hidden m-1 pl-1 pr-1 cursor-pointer",children:Object(h.jsx)("img",{src:b,alt:"editSub sub task",className:"w-7"})}),Object(h.jsx)("button",{id:e.subId.toString(),title:"Delete sub task",onClick:function(t){return z(t)},className:a?"m-1 pl-1 pr-1 cursor-pointer":"hidden m-1 pl-1 pr-1 cursor-pointer",children:Object(h.jsx)("img",{src:N,alt:"delete sub task",className:"w-8"})})]})]},e.subId)},C=n.p+"static/media/addPerson4.21917489.png",I=function(t){var e=t.todo,n=t.edit,r=t.getTodos,c=t.completed,a=t.setCompleted,o=t.saveTodo,s=t.addSubTask,i=t.addPersonInput,d=t.editTodo,j=t.socket,x=function(){var t=Object(l.a)(u.a.mark((function t(e){var n,o;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o=e.currentTarget.id,t.next=3,null===(n=O.a.auth().currentUser)||void 0===n?void 0:n.getIdToken(!0).then(function(){var t=Object(l.a)(u.a.mark((function t(e){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(p.backend_url,"/api/todos/").concat(o),{method:"PATCH",headers:{Authorization:e,"Content-Type":"application/json"},body:JSON.stringify({isComplete:!c})});case 2:r();case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){return console.log(t.message)}));case 3:a(!c);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),g=function(){var t=Object(l.a)(u.a.mark((function t(e){var n,r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.currentTarget.id,t.next=3,null===(n=O.a.auth().currentUser)||void 0===n?void 0:n.getIdToken(!0).then(function(){var t=Object(l.a)(u.a.mark((function t(e){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(p.backend_url,"/api/todos/").concat(r),{method:"DELETE",headers:{Authorization:e}});case 2:j.emit("add-todo");case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){return console.log(t.message)}));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(h.jsxs)("div",{children:[!n&&Object(h.jsx)("button",{id:e.todoId.toString(),onClick:function(t){return x(t)},title:"Mark as done",className:"m-1 pl-1 pr-1 cursor-pointer",children:Object(h.jsx)("img",{src:S,alt:"mark to-do as done",className:"w-7"})}),n&&Object(h.jsx)("button",{id:e.todoId.toString(),onClick:function(t){return o(t)},title:"Save to-do",className:"m-1 pl-1 pr-1 cursor-pointer",children:Object(h.jsx)("img",{src:m,alt:"save to-do",className:"w-7"})}),Object(h.jsx)("button",{id:e.todoId.toString(),onClick:function(){return s()},title:"Add new sub task",className:"m-1 pl-1 pr-1 cursor-pointer",children:Object(h.jsx)("img",{src:f,alt:"add new to-do",className:"w-7"})}),Object(h.jsx)("button",{id:e.todoId.toString(),onClick:i,title:"Add new collaborator",className:"pl-1 pr-1 cursor-pointer",children:Object(h.jsx)("img",{src:C,alt:"add person to to-do",className:"w-7"})}),Object(h.jsx)("button",{id:e.todoId.toString(),onClick:function(t){return d(t)},title:"Edit to-do",className:n?"hidden m-1 pl-1 pr-1 cursor-pointer":"m-1 pl-1 pr-1 cursor-pointer",children:Object(h.jsx)("img",{src:y,alt:"edit to-do",className:"w-7"})}),Object(h.jsx)("button",{id:e.todoId.toString(),onClick:function(t){return d(t)},title:"Cancel",className:n?"m-1 pl-1 pr-1 cursor-pointer":"hidden m-1 pl-1 pr-1 cursor-pointer",children:Object(h.jsx)("img",{src:b,alt:"edit to-do",className:"w-7"})}),Object(h.jsx)("button",{id:e.todoId.toString(),onClick:function(t){return g(t)},title:"Delete to-do",className:"pl-1 pr-1 cursor-pointer",children:Object(h.jsx)("img",{src:N,alt:"delete to-do",className:"w-8"})})]})},A=n.p+"static/media/arrow.ca38e953.png",E=n.p+"static/media/send.677d68a9.png",z=n.p+"static/media/person.4720863e.png",P=function(t){var e=t.todo,n=t.socket,a=t.getTodos,o=Object(r.useState)(e.isComplete),i=Object(s.a)(o,2),d=i[0],f=i[1],j=Object(r.useState)(null),x=Object(s.a)(j,2),v=x[0],k=x[1],N=Object(r.useState)(!1),y=Object(s.a)(N,2),S=y[0],C=y[1],P=Object(r.useState)(!1),D=Object(s.a)(P,2),_=D[0],R=D[1],J=Object(r.useState)(""),U=Object(s.a)(J,2),F=U[0],H=U[1],Y=Object(r.useState)(!1),L=Object(s.a)(Y,2),M=L[0],W=L[1],q=Object(r.useState)(!1),B=Object(s.a)(q,2),K=B[0],V=B[1],Z=Object(r.useState)(null),G=Object(s.a)(Z,2),Q=G[0],$=G[1],X=c.a.useRef(null),tt=c.a.useRef(null),et=c.a.useRef(null),nt=function(){var t=Object(l.a)(u.a.mark((function t(e){var r,c;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.preventDefault(),v){t.next=4;break}return W((function(t){return!t})),t.abrupt("return");case 4:return W(!1),c=e.currentTarget.id,t.next=8,null===(r=O.a.auth().currentUser)||void 0===r?void 0:r.getIdToken(!0).then(function(){var t=Object(l.a)(u.a.mark((function t(e){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(p.backend_url,"/api/todos/").concat(c),{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:e},body:JSON.stringify({task:v})});case 2:a(),k(null);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).then((function(){return n.emit("add-todo")})).catch((function(t){return console.log(t.message)}));case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),rt=function(){var t=Object(l.a)(u.a.mark((function t(e){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:W((function(t){return!t})),setTimeout((function(){var t;null===(t=tt.current)||void 0===t||t.focus()}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),ct=function(){var t=Object(l.a)(u.a.mark((function t(e){var r,c;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),c=e.currentTarget.id,t.next=4,null===(r=O.a.auth().currentUser)||void 0===r?void 0:r.getIdToken(!0).then(function(){var t=Object(l.a)(u.a.mark((function t(e){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(p.backend_url,"/api/todos/").concat(c),{method:"PATCH",headers:{Authorization:e,"Content-Type":"application/json"},body:JSON.stringify({subTask:F})}).catch((function(t){return console.log(t.message)}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).then((function(){return n.emit("add-todo")})).catch((function(t){return console.log(t.message)}));case 4:H(""),R(!1),C(!0);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),at=function(){S&&R(!1),C(!S)};return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("li",{className:d?"z-0 relative border border-blue-900 rounded-lg m-2 mx-4 shadow-sm bg-li order-last":"z-0 relative border border-blue-900 rounded-lg m-2 mx-4 shadow-sm bg-li order-first",children:[e.collaborators[0]&&Object(h.jsx)("img",{src:z,alt:"You are collaborating on this to-do",title:"You are collaborating on this to-do",className:"absolute top-1 left-1 cursor-pointer w-7"}),M?Object(h.jsx)("form",{onSubmit:function(t){return nt(t)},id:e.todoId.toString(),children:Object(h.jsx)("input",{ref:tt,onChange:function(t){return k(t.currentTarget.value)},defaultValue:e.task,className:"m-1 border rounded"})}):Object(h.jsx)("div",{id:e.todoId.toString(),className:"mb-2",children:Object(h.jsx)("h3",{id:e.todoId.toString(),onClick:at,className:d?"text-lg text-lightgray line-through cursor-pointer m-auto":"text-lg cursor-pointer m-auto",children:e.task})}),e.subTasks[0]&&Object(h.jsx)("img",{src:A,title:"Expand",onClick:at,alt:"Open sub tasks",className:S?"w-7 absolute top-1 right-1 cursor-pointer transform rotate-180":"w-7 absolute top-1 right-1 cursor-pointer"}),Object(h.jsx)("ul",{className:"flex flex-col",children:S&&e.subTasks.map((function(t,r){return Object(h.jsx)(T,{sub:t,socket:n,todo:e,edit:M,completed:d},r)}))}),_&&Object(h.jsxs)("form",{className:"flex content-center justify-center",onSubmit:function(t){return ct(t)},id:e.todoId.toString(),children:[Object(h.jsx)("input",{onChange:function(t){return H(t.currentTarget.value)},ref:X,className:"m-1 border rounded"}),Object(h.jsx)("button",{type:"submit",title:"Save sub task",className:"m-1 pl-1 pr-1 cursor-pointer",children:Object(h.jsx)("img",{src:m,alt:"save sub task",className:"w-7"})}),Object(h.jsx)("button",{type:"button",onClick:function(){return R(!1)},title:"Cancel",className:"m-1 pl-1 pr-1 cursor-pointer",children:Object(h.jsx)("img",{src:b,alt:"close input box",className:"w-7"})})]}),K&&Object(h.jsxs)("form",{onSubmit:function(t){return function(t){t.preventDefault();var r=t.currentTarget.id;Q&&(e.collaborators.some((function(t){return t.email===Q}))?w("The collaborator already has access."):(O.a.auth().fetchSignInMethodsForEmail(Q).then((function(t){var e;0!==t.length?null===(e=O.a.auth().currentUser)||void 0===e||e.getIdToken(!0).then(function(){var t=Object(l.a)(u.a.mark((function t(e){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(p.backend_url,"/api/todos/").concat(r),{method:"PATCH",headers:{Authorization:e,"Content-Type":"application/json"},body:JSON.stringify({collaborator:Q})}).catch((function(t){return console.log(t.message)}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).then((function(){n.emit("add-todo"),V(!1),w("You have added ".concat(Q," as a collaborator to your todo!"))})).catch((function(t){return console.log(t.message)})):w("There is no existing account with that e-mail address")})).catch((function(t){"auth/invalid-email"===t.code&&w("Please enter a valid e-mail address")})),$(null)))}(t)},id:e.todoId.toString(),className:"flex content-center justify-center",children:[Object(h.jsx)("button",{type:"submit",title:"Send invite",id:e.todoId.toString(),className:"m-1 pl-1 pr-1 cursor-pointer",children:Object(h.jsx)("img",{src:E,alt:"Invite collaborator",className:"w-7",id:e.todoId.toString()})}),Object(h.jsx)("input",{onChange:function(t){return $(t.currentTarget.value)},placeholder:"Enter email to add person..",ref:et,className:"m-1 w-60 border rounded"}),Object(h.jsx)("button",{type:"button",onClick:function(){return V(!1)},title:"Cancel",className:"m-1 pl-1 pr-1 cursor-pointer",children:Object(h.jsx)("img",{src:b,alt:"close input box",className:"w-7"})})]}),Object(h.jsx)(I,{edit:M,getTodos:a,todo:e,completed:d,setCompleted:f,saveTodo:nt,addSubTask:function(){R(!_),setTimeout((function(){var t;null===(t=X.current)||void 0===t||t.focus()}))},addPersonInput:function(){V((function(){return!K})),setTimeout((function(){var t;null===(t=et.current)||void 0===t||t.focus()}))},editTodo:rt,socket:n})]}),Object(h.jsx)(g.a,{})]})},D=function(t){var e=t.todos,n=t.socket,c=t.getTodos,a=t.filtered,o=Object(r.useState)(e),i=Object(s.a)(o,2),u=i[0],l=i[1];Object(r.useEffect)((function(){d()}),[a,c]);var d=function(){if(a){var t=null===e||void 0===e?void 0:e.filter((function(t){return!0===t.isComplete}));t&&l(t)}a||l(e)};return Object(h.jsxs)("div",{className:"max-w-2xl m-auto mt-4 z-0",children:[a&&Object(h.jsx)("h2",{className:"text-2xl mt-4 font-roboto border-b-2",children:"Done todos"}),a?Object(h.jsx)("ul",{className:"flex flex-col pt-5 pb-16 bg-white m-auto",children:u&&u.map((function(t){return Object(h.jsx)(P,{getTodos:c,todo:t,socket:n},t.todoId)}))}):Object(h.jsx)("ul",{className:"flex flex-col pb-16 bg-white m-auto z-0",children:e&&e.map((function(t){return Object(h.jsx)(P,{getTodos:c,todo:t,socket:n},t.todoId)}))})]})},_=n(6),R=function(t){var e=t.socket,n=t.todos,c=t.setTodos,a=Object(r.useState)(!0),o=Object(s.a)(a,2),i=o[0],d=o[1],b=Object(r.useState)(!1),f=Object(s.a)(b,2),m=f[0],j=f[1],g=Object(_.f)();Object(r.useEffect)((function(){var t=O.a.auth().onAuthStateChanged((function(t){if(t){d(!t);var e=localStorage.getItem("todos");e&&c(JSON.parse(e)),v()}else g.push("/login")}));return function(){return t()}}),[]),Object(r.useEffect)((function(){return e.on("update-todos",(function(){return v()})),function(){e.off("update-todos")}}),[e]);var v=function(){var t=Object(l.a)(u.a.mark((function t(){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:O.a.auth().onAuthStateChanged((function(t){null===t||void 0===t||t.getIdToken(!0).then(function(){var t=Object(l.a)(u.a.mark((function t(e){var r,a;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(p.backend_url,"/api/todos"),{method:"GET",headers:{Authorization:e}});case 2:return r=t.sent,t.next=5,r.json();case 5:(a=t.sent)!==n&&(localStorage.setItem("todos",JSON.stringify(a)),c(a));case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){console.log("We had an error loading data")}))}));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(h.jsx)(h.Fragment,{children:i?Object(h.jsx)("div",{}):Object(h.jsxs)("main",{className:"h-full",children:[Object(h.jsx)(D,{getTodos:v,todos:n,socket:e,filtered:m}),Object(h.jsx)(x,{socket:e,todos:n,filtered:m,setFiltered:j})]})})},J=n(24),U=n.p+"static/media/remindersLogo1.435ef763.png",F=function(){var t=Object(_.f)();return Object(h.jsxs)("div",{className:"w-full",children:[Object(h.jsx)("nav",{className:"fixed w-full bg-white z-10",children:Object(h.jsxs)("div",{className:"flex justify-around items-center h-12 m-auto max-w-2xl",children:[Object(h.jsx)(J.b,{to:"/",className:"border-b border-t px-2 text-lg text-textblue",children:"HOME"}),Object(h.jsx)(J.b,{to:"/profile",className:"border-b border-t px-2 text-lg text-textblue",children:"PROFILE"})]})}),Object(h.jsx)("button",{onClick:function(){return t.push("/")},children:Object(h.jsx)("img",{className:"mt-16 mx-auto w-4/5 max-w-sm",src:U,alt:"Reminders logo"})})]})},H=function(){var t=Object(r.useRef)(null),e=Object(r.useRef)(null),n=Object(r.useRef)(null),c=Object(_.f)(),a=function(){var r=Object(l.a)(u.a.mark((function r(a){var o,s;return u.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(a.preventDefault(),i=t.current.value,/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(i).toLowerCase())){r.next=4;break}return w("Your email does not have a correct format, please try again."),r.abrupt("return");case 4:if((null===(o=e.current)||void 0===o?void 0:o.value)===(null===(s=n.current)||void 0===s?void 0:s.value)){r.next=9;break}return w("Your passwords does not match, please try again."),e.current.value="",n.current.value="",r.abrupt("return");case 9:return r.prev=9,r.next=12,v.createUserWithEmailAndPassword(t.current.value,e.current.value);case 12:w("You have completed your signup!"),c.push("/"),r.next=21;break;case 16:r.prev=16,r.t0=r.catch(9),"auth/email-already-in-use"===r.t0.code&&w("The email address is already in use by another account"),"auth/weak-password"===r.t0.code&&w("Your password needs to be at least 6 characters"),console.error(r.t0);case 21:case"end":return r.stop()}var i}),r,null,[[9,16]])})));return function(t){return r.apply(this,arguments)}}();return Object(h.jsxs)("form",{className:"mt-2 flex flex-col m-auto",onSubmit:function(t){return a(t)},children:[Object(h.jsx)("h2",{className:"h2",children:"Create your new account"}),Object(h.jsx)("input",{className:"mt-3",type:"email",placeholder:"email",ref:t}),Object(h.jsx)("input",{className:"mt-3",type:"password",placeholder:"password",ref:e}),Object(h.jsx)("input",{className:"mt-3 mb-4",type:"password",placeholder:"confirm password",ref:n}),Object(h.jsx)("button",{className:"button",type:"submit",onClick:function(t){return a(t)},children:"Sign Up"}),Object(h.jsx)(g.a,{}),Object(h.jsx)("p",{className:"mt-6 md:mt-12",children:"Do you already have an account?"}),Object(h.jsx)("button",{className:"button",type:"button",onClick:function(){return c.push("/login")},children:"Log In"})]})},Y=function(){var t=Object(r.useRef)(null),e=Object(r.useRef)(null),n=Object(_.f)(),c=function(){var r=Object(l.a)(u.a.mark((function r(c){return u.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(c.preventDefault(),null!==t.current&&null!==e.current&&""!==t.current.value&&""!==e.current.value){r.next=3;break}return r.abrupt("return");case 3:return r.prev=3,r.next=6,v.signInWithEmailAndPassword(t.current.value,e.current.value);case 6:n.push("/",{from:"login"}),r.next=15;break;case 9:r.prev=9,r.t0=r.catch(3),"auth/user-not-found"===r.t0.code&&w("There is no user record corresponding to this identifier. Please try again"),"auth/wrong-password"===r.t0.code&&w("The password is invalid. Please try again"),"auth/invalid-email"===r.t0.code&&w("Please provide a valid email"),console.error(r.t0);case 15:case"end":return r.stop()}}),r,null,[[3,9]])})));return function(t){return r.apply(this,arguments)}}();return Object(h.jsxs)("div",{className:"mt-16",children:[Object(h.jsx)("h2",{className:"h2",children:"Sign in"}),Object(h.jsxs)("form",{className:"flex flex-col max-w-3/4 md:max-w-xxs m-auto justify-items-center justify-center",children:[Object(h.jsx)("input",{className:"mb-3",type:"email",required:!0,placeholder:"email",ref:t}),Object(h.jsx)("input",{type:"password",placeholder:"password",ref:e,className:"mb-4"}),Object(h.jsx)("button",{type:"submit",onClick:function(t){return c(t)},className:"button",children:"Sign In"}),Object(h.jsx)("p",{className:"mt-8",children:"Not registered yet?"}),Object(h.jsx)("button",{className:"button",onClick:function(){return n.push("/signup")},children:"Create a new account"}),Object(h.jsx)(g.a,{})]})]})},L=function(t){var e=t.children,n=Object(r.useState)(null),c=Object(s.a)(n,2),a=c[0],o=c[1];return Object(r.useEffect)((function(){return v.onAuthStateChanged((function(t){o(t)}))}),[]),Object(h.jsx)(d.Provider,{value:a,children:e})},M=function(t){var e,n=t.setTodos,c=(t.todos,null===(e=O.a.auth().currentUser)||void 0===e?void 0:e.email),a=Object(r.useContext)(d),o=Object(_.f)();Object(r.useEffect)((function(){O.a.auth().onAuthStateChanged((function(t){t||o.push("/login")}))}));return Object(h.jsx)("div",{children:a?Object(h.jsxs)("div",{className:"max-w-3/4 md:max-w-sm mx-auto mt-6 md:mt-12 p-4 border-4 rounded-xl",children:[Object(h.jsx)("h1",{className:"text-2xl",children:"Profile"}),Object(h.jsxs)("p",{className:"text-lg mt-20 mb-6",children:["Your email: ",c]}),Object(h.jsx)("button",{onClick:function(){localStorage.clear(),n(null),k(),o.push("/login")},className:"button",children:"Sign Out"})]}):Object(h.jsx)(Y,{})})},W=n(40),q=function(){var t=Object(r.useState)(W.a),e=Object(s.a)(t,2),n=e[0],c=e[1],a=Object(r.useState)(null),o=Object(s.a)(a,2),i=o[0],u=o[1];return Object(r.useEffect)((function(){var t=Object(W.a)(p.backend_url,{transports:["websocket","flashsocket","htmlpage","xhr-polling","jsonp-polling"]});return c(t),function(){console.log("disconnecting socket"),n.disconnect()}}),[]),Object(h.jsx)("div",{id:"app",className:"flex w-full flex-col h-screen",children:Object(h.jsxs)(L,{children:[Object(h.jsx)(F,{}),Object(h.jsxs)(_.c,{children:[Object(h.jsx)(_.a,{exact:!0,path:"/",render:function(){return Object(h.jsx)(R,{socket:n,todos:i,setTodos:u})}}),Object(h.jsx)(_.a,{path:"/signup",component:H}),Object(h.jsx)(_.a,{path:"/login",component:Y}),Object(h.jsx)(_.a,{path:"/profile",render:function(){return Object(h.jsx)(M,{setTodos:u,todos:i})}})]})]})})};o.a.render(Object(h.jsx)(c.a.StrictMode,{children:Object(h.jsx)(J.a,{children:Object(h.jsx)(q,{})})}),document.getElementById("root"))}},[[67,1,2]]]);