import{o as n,c as t,a as e,d as r,r as _,F as m,f as w,t as u,g as p,b as d}from"./index-D6nJWk-8.js";import{_ as a}from"./_plugin-vue_export-helper-DlAUqK2U.js";const x={},$={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"w-6 h-6"},g=e("path",{"fill-rule":"evenodd",d:"M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z","clip-rule":"evenodd"},null,-1),C=[g];function k(o,s){return n(),t("svg",$,C)}const b=a(x,[["render",k]]),B={},M={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"w-6 h-6"},Q=e("path",{"fill-rule":"evenodd",d:"M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z","clip-rule":"evenodd"},null,-1),D=[Q];function L(o,s){return n(),t("svg",M,D)}const U=a(B,[["render",L]]),Z={},y={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"w-6 h-6"},F=e("path",{"fill-rule":"evenodd",d:"M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z","clip-rule":"evenodd"},null,-1),A=[F];function H(o,s){return n(),t("svg",y,A)}const N=a(Z,[["render",H]]),V={},X={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"w-6 h-6"},j=e("path",{"fill-rule":"evenodd",d:"M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z","clip-rule":"evenodd"},null,-1),S=[j];function q(o,s){return n(),t("svg",X,S)}const E=a(V,[["render",q]]),T=new BroadcastChannel("obs-sda-hymnal"),z={data(){return{}},components:{ChevronUp:b,ChevronDown:U,XMark:N,ListBars:E},methods:{removeFromQueue:function(o){r().removeFromQueue(o)},clearQueue:function(){r().clearQueue(),T.postMessage({action:"clear"})},moveUp:function(o){r().moveUp(o)},moveDown:function(o){r().moveDown(o)}},computed:{songs:function(){return r().queue}}},G={class:"flex flex-col gap-3"},I={class:"flex justify-between"},J=e("span",{class:"font-mono"},"Queue",-1),K={class:"rounded p-1 relative flex justify-between items-center"},O={class:"flex-grow font-mono line-clamp-1"},P={class:"text-gray-400"},R={class:"flex items-center"},W=["onClick"],Y=["onClick"],ee=["onClick"];function oe(o,s,ne,te,se,l){const h=_("ChevronUp"),v=_("ChevronDown"),f=_("XMark");return n(),t("div",G,[e("div",I,[J,e("button",{onClick:s[0]||(s[0]=c=>l.clearQueue()),class:"font-mono"},"Clear all")]),e("div",null,[(n(!0),t(m,null,w(l.songs,c=>(n(),t("div",K,[e("div",O,[e("span",P,u(c.index),1),p(),e("span",null,u(c.title),1)]),e("div",R,[e("button",{onClick:i=>l.moveUp(c),class:"hover:bg-slate-600 w-6 h-6 rounded"},[d(h,{class:"h-4 flex-0"})],8,W),e("button",{onClick:i=>l.moveDown(c),class:"hover:bg-slate-600 w-6 h-6 rounded mr-5"},[d(v,{class:"h-4 flex-0"})],8,Y),e("button",{onClick:i=>l.removeFromQueue(c),class:"hover:bg-slate-600 w-6 h-6 rounded"},[d(f,{class:"h-4 flex-0"})],8,ee)])]))),256))])])}const re=a(z,[["render",oe]]);export{re as default};
