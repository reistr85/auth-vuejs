(function(t){function e(e){for(var n,s,r=e[0],l=e[1],c=e[2],d=0,m=[];d<r.length;d++)s=r[d],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&m.push(i[s][0]),i[s]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);u&&u(e);while(m.length)m.shift()();return o.push.apply(o,c||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],n=!0,r=1;r<a.length;r++){var l=a[r];0!==i[l]&&(n=!1)}n&&(o.splice(e--,1),t=s(s.s=a[0]))}return t}var n={},i={app:0},o=[];function s(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=n,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(a,n,function(e){return t[e]}.bind(null,n));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var u=l;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";a("85ec")},5637:function(t,e,a){"use strict";a("aa07")},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Main")},o=[],s=a("ade3"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("NavBar",{attrs:{"mode-dark":t.modeDark}}),a("v-card",{staticClass:"mt-0",attrs:{height:"100%",dark:t.modeDark.value}},[a("div",{staticClass:"main"},[a("SideBar"),a("ContentMain",{attrs:{"mode-dark":t.modeDark}})],1)])],1)},l=[],c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticStyle:{"z-index":"999"},attrs:{flat:"",tile:""}},[a("v-toolbar",{attrs:{dark:t.modeDark.value}},[a("v-app-bar-nav-icon"),a("v-toolbar-title",[t._v("Company")]),a("v-spacer"),a("v-switch",{staticClass:"mt-6 mr-5",attrs:{label:t.modeDark.label},model:{value:t.modeDark.value,callback:function(e){t.$set(t.modeDark,"value",e)},expression:"modeDark.value"}}),a("v-btn",{attrs:{icon:""}},[a("v-icon",[t._v(t._s(t.icons.dotsVertical))])],1)],1)],1)},u=[],d="mdi-arrow-left-bold",m="mdi-delete",p="mdi-dots-vertical",f="mdi-home-alert-outline",v="mdi-plus-circle-outline",h="mdi-magnify",b="mdi-account-settings",g="mdi-eye",y={name:"NavBar",props:{modeDark:{type:Object,default:function(){},require:!0}},data:function(){return{icons:{dotsVertical:p}}}},_=y,k=a("2877"),x=a("6544"),C=a.n(x),D=a("5bc1"),V=a("8336"),w=a("b0af"),P=a("132d"),O=a("2fa4"),S=a("b73d"),j=a("71d9"),B=a("2a7f"),A=Object(k["a"])(_,c,u,!1,null,null,null),L=A.exports;C()(A,{VAppBarNavIcon:D["a"],VBtn:V["a"],VCard:w["a"],VIcon:P["a"],VSpacer:O["a"],VSwitch:S["a"],VToolbar:j["a"],VToolbarTitle:B["a"]});var I=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-navigation-drawer",{attrs:{permanent:"",elevation:"1",height:"100%"},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("v-list-item",{attrs:{"two-line":""}},[a("v-list-item-avatar",[a("img",{attrs:{src:"https://randomuser.me/api/portraits/women/81.jpg"}})]),a("v-list-item-content",[a("v-list-item-title",[t._v("Jane Smith")]),a("v-list-item-subtitle",[t._v("Logged In")])],1)],1)]},proxy:!0}])},[a("v-card",{staticClass:"mx-auto",staticStyle:{height:"100%"},attrs:{"max-width":"300",heigth:"100%",elevation:"0",tile:""}},[a("v-list",{attrs:{dense:""}},t._l(t.items,(function(e){return a("v-list-group",{key:e.title,staticClass:"mt-2",attrs:{"prepend-icon":e.action,"no-action":"",dense:""},scopedSlots:t._u([{key:"activator",fn:function(){return[a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:t._s(e.title)}})],1)]},proxy:!0}],null,!0),model:{value:e.active,callback:function(a){t.$set(e,"active",a)},expression:"item.active"}},t._l(e.items,(function(e){return a("v-list-item",{key:e.title,attrs:{link:""},on:{click:function(a){return t.menuNavigator(e)}}},[a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:t._s(e.title)}})],1)],1)})),1)})),1)],1)],1)},E=[],M={name:"SideBar",data:function(){return{items:[{active:!0,action:f,items:[{title:"Dashboard",route:"home"}],title:"Início"},{active:!1,action:b,items:[{title:"Listar Usuários",route:"users"}],title:"Usuários"}]}},methods:{menuNavigator:function(t){this.$router.push({name:t.route})}}},$=M,N=(a("5637"),a("8860")),T=a("56b0"),q=a("da13"),H=a("8270"),U=a("5d23"),F=a("f774"),J=Object(k["a"])($,I,E,!1,null,null,null),R=J.exports;C()(J,{VCard:w["a"],VList:N["a"],VListGroup:T["a"],VListItem:q["a"],VListItemAvatar:H["a"],VListItemContent:U["a"],VListItemSubtitle:U["b"],VListItemTitle:U["c"],VNavigationDrawer:F["a"]});var G=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content-main"},[a("router-view"),a("p",{staticClass:"text-caption text-center mt-5",attrs:{"x-small":""}},[t._v("Todos os direitos reservados à MGE Tech - Siscomge - 2021")])],1)},W=[],z={name:"ContentMain",props:{modeDark:{type:Object,default:function(){},require:!0}},data:function(){return{}}},K=z,Q=(a("8910"),Object(k["a"])(K,G,W,!1,null,null,null)),X=Q.exports,Y={name:"App",components:{NavBar:L,SideBar:R,ContentMain:X},data:function(){return{modeDark:{value:!1,label:"Modo Escuro"}}},watch:Object(s["a"])({},"modeDark.value",(function(){this.modeDark.value?this.modeDark.label="Modo Claro":this.modeDark.label="Modo Escuro"}))},Z=Y,tt=(a("c09b"),a("7496")),et=Object(k["a"])(Z,r,l,!1,null,null,null),at=et.exports;C()(et,{VApp:tt["a"],VCard:w["a"]});var nt={name:"App",components:{Main:at},data:function(){return{modeDark:{value:!1,label:"Modo Escuro"},selectedItem:0,items:[{text:"Real-Time",icon:"mdi-clock"},{text:"Audience",icon:"mdi-account"},{text:"Conversions",icon:"mdi-flag"}],items2:[{active:!1,action:"mdi-ticket",items:[{title:"List Item"}],title:"Attractions"},{action:"mdi-silverware-fork-knife",items:[{title:"Breakfast & brunch"},{title:"New American"},{title:"Sushi"}],title:"Dining"},{action:"mdi-school",items:[{title:"List Item"}],title:"Education"},{action:"mdi-run",items:[{title:"List Item"}],title:"Family"},{action:"mdi-bottle-tonic-plus",items:[{title:"List Item"}],title:"Health"},{action:"mdi-content-cut",items:[{title:"List Item"}],title:"Office"},{action:"mdi-tag",items:[{title:"List Item"}],title:"Promotions"}]}},watch:Object(s["a"])({},"modeDark.value",(function(){this.modeDark.value?this.modeDark.label="Modo Claro":this.modeDark.label="Modo Escuro"}))},it=nt,ot=(a("034f"),Object(k["a"])(it,i,o,!1,null,null,null)),st=ot.exports,rt=a("f309"),lt=a("fcf4");n["a"].use(rt["a"],{});var ct={primary:{base:lt["a"].red.accent3},secondary:lt["a"].blue.base},ut=new rt["a"]({theme:{themes:{light:ct}}}),dt=a("8c4f"),mt=a("2909"),pt=(a("b0c0"),{domain:"users",title:"Usuários",description:"Lista de todos os usuários cadastrados no sistema",createBtn:"Novo Usuário",routes:{list:{name:"users",path:"/usuarios"},create:{name:"user-create",path:"/usuarios/novo"},show:{name:"user-show",path:"/usuarios/:id"}},listActions:{has:!0,noShow:!1,noDestroy:!1,more:{has:!0,items:[{icon:h,label:"Alterar Permisões",action:"alterPermitions"}]}},fields:[{title:"Dados do Produto",items:[{type:"text",name:"name",formattedName:"name",label:"Nome",align:"",md:"5",required:!0,list:!0},{type:"text",name:"email",formattedName:"email",label:"E-mail",align:"",md:"5",required:!0,list:!0},{type:"text",name:"type",formattedName:"type_formatted",label:"Tipo Usuário",align:"",md:"5",required:!0,list:!0}]}],footer:[{name:"total_devolutions",label:"Valor Devolvido",class:"custom-footer-value",md:2}]}),ft=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("PageHeader",{attrs:{schema:t.schema}}),a("PageContent",[a("DynamicListPage",{attrs:{schema:t.schema}})],1)],1)},vt=[],ht=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"content-main-title"},[a("div",[a("p",{staticClass:"title",domProps:{textContent:t._s(t.schema.title)}}),a("h5",{staticClass:"subtitle-2 mt-0",domProps:{textContent:t._s(t.schema.description)}})]),a("div",[t.schema.createBtn&&"list"===t.typePage?a("v-btn",{staticClass:"white--text",attrs:{color:"primary",to:{name:t.schema.routes.create.name}}},[a("v-icon",{attrs:{left:"",dark:""}},[t._v(t._s(t.icons.plusOutline))]),t._v(" "+t._s(t.schema.createBtn)+" ")],1):t._e(),"create"===t.typePage?a("v-btn",{staticClass:"white--text",attrs:{color:"primary",to:{name:t.schema.routes.list.name}}},[a("v-icon",{attrs:{left:"",dark:""}},[t._v(t._s(t.icons.arrowLeft))]),t._v(" Voltar ")],1):t._e()],1)]),a("v-divider",{staticClass:"my-5"})],1)},bt=[],gt=(a("ac1f"),a("1276"),{name:"PageHeader",props:{schema:{type:Object,required:!0}},data:function(){return{icons:{plusOutline:v,arrowLeft:d}}},computed:{typePage:function(){return 2===this.$route.name.split("-").length?"create":"list"}}}),yt=gt,_t=a("ce7e"),kt=Object(k["a"])(yt,ht,bt,!1,null,null,null),xt=kt.exports;C()(kt,{VBtn:V["a"],VDivider:_t["a"],VIcon:P["a"]});var Ct=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"mt-2 py-3 px-3",attrs:{color:t.modeDark.value?"#333":"",elevation:"5","min-height":"500"}},[t._t("default")],2)},Dt=[],Vt={name:"PageContent",data:function(){return{modeDark:{value:!1,label:"Modo Escuro"}}}},wt=Vt,Pt=Object(k["a"])(wt,Ct,Dt,!1,null,null,null),Ot=Pt.exports;C()(Pt,{VCard:w["a"]});var St=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"mb-5"},[a("TextField",{attrs:{label:"Pesquisar","append-icon":t.icons.search},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),a("v-data-table",{staticClass:"elevation-1",attrs:{"item-key":"id",dense:"",loading:t.loading,search:t.search,headers:t.headers,items:t.localItems.data,options:t.options,"server-items-length":t.totalLocalItems,"single-select":t.schema.singleSelect,"show-select":t.schema.checkItem},on:{"update:options":function(e){t.options=e}},scopedSlots:t._u([{key:"item.actions",fn:function(e){return[a("div",{staticStyle:{"min-width":"70px"}},[t.schema.listActions.more.has?a("v-menu",{attrs:{disabled:e.item.disableMoreActions,"nudge-width":200,bottom:"",left:"","offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,i=e.attrs;return[a("v-btn",t._g(t._b({attrs:{icon:""}},"v-btn",i,!1),n),[a("v-icon",[t._v(t._s(t.icons.dotsVertical))])],1)]}}],null,!0)},[a("v-card",t._l(t.schema.listActions.more.items,(function(n,i){return a("v-list",{key:i,attrs:{dense:""}},[a("v-list-item",{attrs:{link:""},on:{click:function(a){return t.actionMoreActions(e,n)}}},[a("v-list-item-icon",[a("v-icon",{staticClass:"icon-side-bar"},[t._v(t._s(n.icon))])],1),a("v-list-item-title",{staticClass:"text-side-bar"},[t._v(t._s(n.label))])],1)],1)})),1)],1):t._e(),t.schema.listActions.noShow?t._e():a("v-btn",{staticClass:"my-1",attrs:{icon:"",fab:"",color:"secondary","x-small":"",to:{name:t.schema.routes.show.name,params:{id:e.item.id}}}},[a("v-icon",{attrs:{dark:""}},[t._v(t._s(t.icons.view))])],1),t.schema.listActions.noDestroy?t._e():a("v-btn",{staticClass:"my-1",attrs:{icon:"",fab:"",color:"red","x-small":""},on:{click:function(a){return t.openDialogDestroy(e)}}},[a("v-icon",{attrs:{dark:""}},[t._v(t._s(t.icons.destroy))])],1)],1)]}}],null,!0),model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}}),a("DialogConfirmation",{attrs:{dialog:t.dialog,loading:t.loadingDestroy},on:{noAction:t.clearProps,yesAction:t.destroy}})],1)},jt=[],Bt=(a("d3b7"),a("159b"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-text-field",t._g(t._b({ref:t.refs,attrs:{type:t.type,label:t.label,rules:t.rules,dense:t.dense,readonly:t.readonly,counter:t.counter,outlined:t.outlined,disabled:t.disabled,"prepend-icon":t.icon}},"v-text-field",t.$attrs,!1),t.$listeners))}),At=[],Lt=(a("a9e3"),{name:"TextField",props:{id:{type:String,default:""},refs:{type:String,default:""},name:{type:String,default:""},type:{type:String,default:""},label:{type:String,default:""},icon:{type:String,default:""},rules:{type:Array,default:function(){return[]}},counter:{type:Number,default:null},readonly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},dense:{type:Boolean,default:!0},outlined:{type:Boolean,default:!0}}}),It=Lt,Et=a("8654"),Mt=Object(k["a"])(It,Bt,At,!1,null,null,null),$t=Mt.exports;C()(Mt,{VTextField:Et["a"]});var Nt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-dialog",{attrs:{persistent:"","max-width":t.maxWidth},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[t._v(" "+t._s(t.message)+" ")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{small:"",color:t.colorButtons.noBtn,dark:"red"===t.colorButtons.noBtn},on:{click:function(e){return t.$emit("noAction")}}},[t._v("Não")]),a("v-btn",{attrs:{small:"",dark:"",color:t.colorButtons.yesBtn,loading:t.loading},on:{click:function(e){return t.$emit("yesAction")}}},[t._v("Sim")])],1)],1)],1)},Tt=[],qt={name:"DialogConfirmation",props:{maxWidth:{type:Number,default:480},dialog:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},message:{type:String,default:"Deseja realmente excluir este registro?"},colorButtons:{type:Object,default:function(){return{noBtn:"",yesBtn:"red"}}}},methods:{}},Ht=qt,Ut=a("99d9"),Ft=a("169a"),Jt=Object(k["a"])(Ht,Nt,Tt,!1,null,null,null),Rt=Jt.exports;C()(Jt,{VBtn:V["a"],VCard:w["a"],VCardActions:Ut["a"],VCardTitle:Ut["b"],VDialog:Ft["a"],VSpacer:O["a"]});var Gt={name:"DynamicListPage",components:{TextField:$t,DialogConfirmation:Rt},props:{schema:{type:Object,required:!0}},data:function(){return{icons:{search:h,view:g,destroy:m,dotsVertical:p},selected:[],dialog:!1,loading:!1,loadingDestroy:!1,search:"",headers:[{}],localItems:{data:[{id:1,name:"Renan Reis",email:"reistr85@gmail.com",type_formatted:"Administrador"}]},options:{},totalLocalItems:10}},mounted:function(){this.setHeaders()},methods:{setHeaders:function(){var t=this;this.schema.fields.forEach((function(e){e.items.forEach((function(e){e.list&&t.headers.push({text:e.label,value:e.formattedName?e.formattedName:e.name,align:e.align?e.align:"start",sortable:!e.sortable||e.sortable})}))})),this.schema.listActions.has&&this.headers.push({text:"Ações",value:"actions",sortable:!1,align:"end"})},openDialogDestroy:function(t){this.selected.push(t),this.dialog=!0},destroy:function(){this.loadingDestroy=!0,this.clearProps()},clearProps:function(){this.selected=[],this.loadingDestroy=!1,this.dialog=!1},actionMoreActions:function(t,e){console.log(t,e)}}},Wt=Gt,zt=a("8fea"),Kt=a("34c3"),Qt=a("e449"),Xt=Object(k["a"])(Wt,St,jt,!1,null,null,null),Yt=Xt.exports;C()(Xt,{VBtn:V["a"],VCard:w["a"],VDataTable:zt["a"],VIcon:P["a"],VList:N["a"],VListItem:q["a"],VListItemIcon:Kt["a"],VListItemTitle:U["c"],VMenu:Qt["a"]});var Zt={name:"ListUser",components:{PageHeader:xt,PageContent:Ot,DynamicListPage:Yt},props:{},data:function(){return{schema:pt}},methods:{}},te=Zt,ee=Object(k["a"])(te,ft,vt,!1,null,"0f709e5f",null),ae=ee.exports,ne=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("PageHeader",{attrs:{schema:t.schema}}),a("PageContent",[t._v(" Create Users ")])],1)},ie=[],oe={name:"CreateUser",components:{PageHeader:xt,PageContent:Ot},props:{},data:function(){return{schema:pt}},methods:{}},se=oe,re=Object(k["a"])(se,ne,ie,!1,null,"579b90a8",null),le=re.exports,ce=[{path:pt.routes.list.path,name:pt.routes.list.name,component:ae,meta:{requiresAuth:!0}},{path:pt.routes.create.path,name:pt.routes.create.name,component:le,meta:{requiresAuth:!0}},{path:pt.routes.show.path,name:pt.routes.show.name,component:le,meta:{requiresAuth:!0}}],ue=Object(mt["a"])(ce);n["a"].use(dt["a"]);var de=new dt["a"]({mode:"history",hash:!1,routes:ue});de.beforeEach((function(t,e,a){a()}));var me=de;n["a"].config.productionTip=!1,new n["a"]({vuetify:ut,router:me,render:function(t){return t(st)}}).$mount("#app")},"7dc1":function(t,e,a){},"85ec":function(t,e,a){},8774:function(t,e,a){},8910:function(t,e,a){"use strict";a("8774")},aa07:function(t,e,a){},c09b:function(t,e,a){"use strict";a("7dc1")}});
//# sourceMappingURL=app.2f69c1f1.js.map