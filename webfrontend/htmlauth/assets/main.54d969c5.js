import{l as E,a as b,u as B,r as j,c as p,w as u,Q as de,o as c,b as a,d as ce,e as S,f as _,g as ue,h as oe,i as Se,j as me,k as K,m as q,n as o,t as l,p as I,q as y,s as W,v as ge,x as N,F as L,y as Ee,z as x,A as X,B as _e,C as Ie,D as ie,E as re,G as H,H as Z,I as V,J,K as $,L as le,M as Te,N as ee,O as fe,P as pe,R as ve,S as Ne,T as he,U as Oe,V as Re,W as we,X as Ce,Y as Ae,Z as be}from"./vendor.1bf2fc46.js";const ye=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const d of r)if(d.type==="childList")for(const n of d.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function i(r){const d={};return r.integrity&&(d.integrity=r.integrity),r.referrerpolicy&&(d.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?d.credentials="include":r.crossorigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function t(r){if(r.ep)return;r.ep=!0;const d=i(r);fetch(r.href,d)}};ye();const Le={},Y={ERROR:"error",RESET_ERROR:"resetError",LOADING:"setLoading"},Ve=()=>({error:null,loading:!1}),Fe={},Ue={[Y.ERROR](e,s){e.error=s},[Y.RESET_ERROR](e){e.error=null},[Y.LOADING](e,s){e.loading=s}};var F={name:"Global",namespaced:!0,state:Ve,actions:Fe,mutations:Ue,mutationTypes:E.exports.mapValues(Y,e=>`Global/${e}`),actionTypes:E.exports.mapValues(Le,e=>`Global/${e}`)};const A={LOAD_CONFIG:"loadConfig",SAVE_CONFIG:"saveConfig",LOAD_STATS:"loadStats",LOAD_CLIENTS:"loadClients",SAVE_CLIENTS:"saveClients",RESTART_SERVICE:"restartService",LOAD_SITES:"loadSites"},m={STORE_CONFIG:"storeConfig",SHOW_TWO_FACTOR:"showTwoFactor",HIDE_TWO_FACTOR:"hideTwoFactor",STORE_STATS:"storeStats",SET_LOGIN_REQUIRED:"setLoginRequired",SET_LOGIN_ERROR:"setLoginError",SET_CONNECTION_ERROR:"setConnectionError",SET_CLIENTS:"setClients",SET_CONFIG_CLIENTS:"setConfigClients",SET_SERVICE_STATUS:"setServiceStatus",SET_SITES:"setSites"},De=()=>({config:{},showTwoFactor:!1,version:null,versionError:!1,stats:{},loginRequired:!1,loginError:!1,connectionError:!1,existingClients:[],clients:[],serviceStatus:"DISCONNECTED",sites:[{label:"Default",value:"default"}]}),U=async(e,s)=>{try{e.commit(F.mutationTypes.RESET_ERROR,null,{root:!0}),await s(),e.commit(m.SET_CONNECTION_ERROR,!1)}catch(i){if(i.response){if(i.response.status===499)throw e.commit(m.SHOW_TWO_FACTOR),i;if(i.response.status===403)throw e.commit(m.SET_LOGIN_REQUIRED,!0),e.commit(m.SET_LOGIN_ERROR,!0),i;if(i.response.status===408)throw e.commit(m.SET_CONNECTION_ERROR,!0),i;const t=E.exports.get(i,"response.data.error",i.message);e.commit(F.mutationTypes.ERROR,t,{root:!0})}else e.commit(F.mutationTypes.ERROR,i.message,{root:!0});throw i}},Ge={async[A.LOAD_CONFIG](e){return U(e,async()=>{const s=await b.get("/admin/plugins/unifi_presence/api/config");e.commit(m.STORE_CONFIG,s.data)})},async[A.SAVE_CONFIG](e){return e.commit(m.HIDE_TWO_FACTOR),e.commit(m.SET_LOGIN_ERROR,!1),U(e,async()=>{const s=await b.put("/admin/plugins/unifi_presence/api/config",Object.assign(e.state.config,{loginRequired:e.state.loginRequired}));e.commit(m.STORE_CONFIG,s.data)})},async[A.LOAD_STATS](e){return U(e,async()=>{const s=await b.get("/admin/plugins/unifi_presence/api/stats");e.commit(m.STORE_STATS,s.data),e.commit(m.SET_LOGIN_REQUIRED,!1)})},async[A.LOAD_CLIENTS](e){return U(e,async()=>{const s=await b.get("/admin/plugins/unifi_presence/api/clients");e.commit(m.SET_CLIENTS,s.data.clients)})},async[A.SAVE_CLIENTS](e,{mac:s,value:i}){return U(e,async()=>{const t=e.state.clients.filter(d=>d.mac!=s&&d.watched||d.mac==s&&i===!0).map(d=>{const n=Object.assign({},d);return delete n.watched,n}),r=await b.put("/admin/plugins/unifi_presence/api/config",{clients:t});e.commit(m.SET_CONFIG_CLIENTS,r.data.clients)})},async[A.RESTART_SERVICE](e){return U(e,async()=>{await b.post("/admin/plugins/unifi_presence/api/restartService")})},async[A.LOAD_SITES](e){return U(e,async()=>{const s=await b.get("/admin/plugins/unifi_presence/api/sites");e.commit(m.SET_SITES,s.data.sites)})}},Pe={[m.STORE_CONFIG](e,s){e.config=s,e.existingClients=s.clients.map(i=>i.mac)},[m.STORE_STATS](e,s){s.version&&(e.version=s.version,e.versionError=s.versionError),s.wan&&s.www&&(e.stats={wan:s.wan,www:s.www})},[m.SHOW_TWO_FACTOR](e){e.showTwoFactor=!0,e.config.token=null,e.twoFaEnabled=!0},[m.HIDE_TWO_FACTOR](e){e.showTwoFactor=!1},[m.SET_LOGIN_REQUIRED](e,s){e.loginRequired=s},[m.SET_LOGIN_ERROR](e,s){e.loginError=s,e.twoFaEnabled=!1},[m.SET_CONNECTION_ERROR](e,s){e.connectionError=s},[m.SET_CLIENTS](e,s){s=s.map(i=>(i.watched=e.existingClients.includes(i.mac),i)),e.clients=E.exports.orderBy(s,["watched","type"],["desc","desc"])},[m.SET_CONFIG_CLIENTS](e,s){e.config.clients=s},[m.SET_SERVICE_STATUS](e,s){e.serviceStatus=s},[m.SET_SITES](e,s){e.sites=s}};var f={name:"Settings",namespaced:!0,state:De,actions:Ge,mutations:Pe,mutationTypes:E.exports.mapValues(m,e=>`Settings/${e}`),actionTypes:E.exports.mapValues(A,e=>`Settings/${e}`)};var Q=(e,s)=>{for(const[i,t]of s)e[i]=t;return e};const ke={name:"App",setup(){const e=B();let s=null;const i=()=>{const t=`ws://${document.location.hostname}:3000/plugins/unifi_presence/api/socket`,r=new WebSocket(t,"webClient");r.onopen=d=>{s=setInterval(()=>r.send("ping"),2e4)},r.onmessage=d=>{if(d.data==="pong")return;const n=JSON.parse(d.data);switch(n.type){case"stats":return e.commit(f.mutationTypes.STORE_STATS,n.data);case"serviceStatus":return e.commit(f.mutationTypes.SET_SERVICE_STATUS,n.data.status)}},r.onclose=()=>{clearInterval(s),setTimeout(i,5e3)}};i()}};function Me(e,s,i,t,r,d){const n=j("router-view");return c(),p(de,{view:"hHh lpR fFf"},{default:u(()=>[a(ce,null,{default:u(()=>[a(n)]),_:1})]),_:1})}var We=Q(ke,[["render",Me]]);const Qe={},D={LOAD_SETTINGS:"LOAD_SETTINGS",SAVE_SETTINGS:"SAVE_SETTINGS",LOAD_CLIENTS:"LOAD_CLIENTS",SAVE_CLIENTS:"SAVE_CLIENTS",RESTART_SERVICE:"RESTART_SERVICE"},te=async(e,s)=>{e.commit(F.mutationTypes.LOADING,!0,{root:!0});try{await s()}finally{e.commit(F.mutationTypes.LOADING,!1,{root:!0})}},qe={async[D.LOAD_SETTINGS](e){return te(e,async()=>{await e.dispatch(f.actionTypes.LOAD_CONFIG,null,{root:!0});const s=e.rootState.Settings.config;s.ipaddress&&s.username&&s.password&&(await e.dispatch(f.actionTypes.LOAD_STATS,null,{root:!0}),await e.dispatch(f.actionTypes.LOAD_SITES,null,{root:!0}))})},async[D.SAVE_SETTINGS](e){return te(e,async()=>{await e.dispatch(f.actionTypes.SAVE_CONFIG,null,{root:!0}),await e.dispatch(f.actionTypes.LOAD_STATS,null,{root:!0}),await e.dispatch(f.actionTypes.LOAD_SITES,null,{root:!0})})},async[D.LOAD_CLIENTS](e){return te(e,async()=>{E.exports.isEmpty(e.rootState.Settings.config)&&await e.dispatch(D.LOAD_SETTINGS),await e.dispatch(f.actionTypes.LOAD_CLIENTS,null,{root:!0})})},async[D.SAVE_CLIENTS](e,{mac:s,value:i}){return e.dispatch(f.actionTypes.SAVE_CLIENTS,{mac:s,value:i},{root:!0})},async[D.RESTART_SERVICE](e){return e.dispatch(f.actionTypes.RESTART_SERVICE,null,{root:!0})}};var G={name:"Actions",namespaced:!0,actions:qe,actionTypes:E.exports.mapValues(D,e=>`Actions/${e}`),mutationTypes:E.exports.mapValues(Qe,e=>`Actions/${e}`)},He="/admin/plugins/unifi_presence/assets/udm.c8127c61.png";const $e={name:"UnifiController",setup(){const e=B(),s=S(()=>e.state.Settings.config),i=S(()=>e.state.Global.loading),t=S(()=>e.state.Settings.loginRequired),r=S(()=>e.state.Settings.version),d=S(()=>e.state.Settings.versionError),n=S(()=>e.state.Settings.stats),T=S(()=>e.state.Settings.serviceStatus),w=S(()=>e.state.Global.error),P=S(()=>e.state.Settings.connectionError),k=S(()=>!(t.value||w.value||P.value||r.value===null||r.value<"6.4.54"||!s.value.username||!s.value.ipaddress||!s.value.password||T.value!=="CONNECTED")),h=R=>R<3600?`${Math.round(R/60)}m`:R<86400?`${Math.round(R/60/60)}h`:`${Math.floor(R/60/60/24)}d`,O=S(()=>h(n.value.www.uptime)),M=S(()=>h(n.value.wan.stats.uptime)),v=_(!1);return{isLoading:i,version:r,versionError:d,loginRequired:t,error:w,connected:k,stats:n,ispUptime:O,udmUptime:M,serviceStatus:T,restartLoading:v,restartService:async()=>{v.value=!0,await e.dispatch(G.actionTypes.RESTART_SERVICE,null,{root:!0}),v.value=!1},udm:He}}},ze={class:"text-h6"},Be={key:0,class:"text-weight-medium text-negative"},xe={key:1,class:"text-subtitle2"},Ye={key:2,class:"text-weight-medium text-negative"},je={class:"text-h6"},Ke={class:"text-subtitle2"},Xe={class:"row"},Ze={class:"col-4 text-weight-light"},Je={class:"text-weight-medium"},et={class:"col-5 text-weight-light"},tt={class:"text-weight-medium"},st={class:"col-3 text-weight-light"},nt={class:"text-weight-medium"},at={class:"col-9 text-weight-light"},ot={class:"text-weight-medium"},it={class:"col-3 text-weight-light"},rt={class:"text-weight-medium"};function lt(e,s,i,t,r,d){return c(),p(_e,{class:"my-card"},{default:u(()=>[a(ue,{src:t.udm,"spinner-color":"white"},null,8,["src"]),t.isLoading?(c(),p(oe,{key:0,align:"center"},{default:u(()=>[a(Se,{color:"primary",size:"3em",class:"q-mb-md"})]),_:1})):(c(),p(me,{key:1},{default:u(()=>[a(Ee,null,{default:u(()=>[t.connected?(c(),I(L,{key:1},[a(K,null,{default:u(()=>[a(q,null,{default:u(()=>[o("div",je,l(t.stats.wan.name),1),o("div",Ke,l(e.$t(`SERVICE.${t.serviceStatus}`)),1),a(ge,{caption:""},{default:u(()=>[N(l(e.$t("UNIFI.VERSION",{version:t.version})),1)]),_:1})]),_:1}),a(q,{avatar:""},{default:u(()=>[a(W,{size:"40px",name:"verified",color:"light-green-7"})]),_:1})]),_:1}),a(K,null,{default:u(()=>[a(q,null,{default:u(()=>[o("div",Xe,[o("div",Ze,[o("span",Je,l(e.$t("UNIFI.CPU"))+":",1),N(" "+l(t.stats.wan.stats.cpu)+"%",1)]),o("div",et,[o("span",tt,l(e.$t("UNIFI.MEMORY"))+":",1),N(" "+l(t.stats.wan.stats.mem)+"Mb",1)]),o("div",st,[o("span",nt,l(e.$t("UNIFI.UPTIME"))+":",1),N(" "+l(t.udmUptime),1)]),o("div",at,[o("span",ot,l(e.$t("UNIFI.ISP"))+":",1),N(" "+l(t.stats.www.isp),1)]),o("div",it,[o("span",rt,l(e.$t("UNIFI.UPTIME"))+":",1),N(" "+l(t.ispUptime),1)])])]),_:1})]),_:1})],64)):(c(),p(K,{key:0},{default:u(()=>[a(q,null,{default:u(()=>[o("div",ze,l(e.$t(`SERVICE.${t.serviceStatus}`)),1),t.versionError?(c(),I("div",Be,l(e.$t("COMMON.VERSION_ERROR",{version:t.version})),1)):y("",!0),t.loginRequired?(c(),I("div",xe,l(e.$t("UNIFI.LOGIN_REQUIRED")),1)):y("",!0),t.error?(c(),I("div",Ye,l(t.error),1)):y("",!0)]),_:1}),a(q,{avatar:""},{default:u(()=>[a(W,{size:"40px",name:"warning_amber",color:"orange-14"})]),_:1})]),_:1}))]),_:1})]),_:1})),a(x),a(oe,null,{default:u(()=>[a(X,{class:"q-ml-md",outline:"",icon:"restart_alt",size:"sm",color:"orange-14",loading:t.restartLoading,onClick:t.restartService,"data-role":"none"},{default:u(()=>[N(l(e.$t("SERVICE.RESTART")),1)]),_:1},8,["loading","onClick"])]),_:1})]),_:1})}var dt=Q($e,[["render",lt]]);const ct={name:"Page",components:{UnifiController:dt},setup(){return{}}},ut={class:"q-pa-s,"},St={class:"q-gutter-y-md bg-light-green-7"},mt={class:"row"},gt={class:"col-5 col-md-4 col-lg-3 q-pt-md"},Et={class:"col-6 col-md-7 col-lg-8"};function _t(e,s,i,t,r,d){const n=j("UnifiController"),T=j("router-view");return c(),I(L,null,[o("div",ut,[o("div",St,[a(Ie,{"inline-label":"",dense:"",class:"text-grey-3 bg-light-green-6","active-color":"white bg-light-green-7","indicator-color":"light-green-9",align:"justify"},{default:u(()=>[a(re,{name:"mails",to:{name:"settings"},icon:"settings",label:e.$t("UNIFI.SETTINGS"),"data-role":"none"},null,8,["label"]),a(re,{name:"alarms",to:{name:"clients"},icon:"router",label:e.$t("UNIFI.DEVICES"),"data-role":"none"},null,8,["label"])]),_:1})])]),a(ie,{padding:""},{default:u(()=>[o("div",mt,[o("div",gt,[a(n)]),a(H),o("div",Et,[a(T)])])]),_:1})],64)}var It=Q(ct,[["render",_t]]),Tt=e=>({required:[s=>!!s||e("VALIDATION.REQUIRED")],topic:[s=>/^[\w-]+((?:\/[\w-]+)+)?$/.test(s)||e("VALIDATION.INVALID_TOPIC")],ipAddress:[s=>/\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/.test(s)||e("VALIDATION.INVALID_IP")],port:[s=>s==null||/^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/.test(s)||e("VALIDATION.INVALID_PORT")]});const ft={name:"Settings",components:{},setup(){const{t:e}=Z.exports.useI18n({useScope:"global"}),s=B();s.dispatch(G.actionTypes.LOAD_SETTINGS);const i=S(()=>s.state.Settings.config),t=S(()=>s.state.Settings.showTwoFactor),r=S(()=>s.state.Settings.loginRequired),d=S(()=>s.state.Settings.versionError),n=S(()=>s.state.Settings.version),T=S(()=>s.state.Settings.sites),w=S(()=>s.state.Settings.loginError),P=S(()=>s.state.Global.loading),k=S(()=>s.state.Settings.serviceStatus),h=S(()=>k.value!=="NO_MQTT"),O=_(!1),M={topic:_(null),native:_(null),ipAddress:_(null),port:_(null),username:_(null),password:_(null),twoFa:_(null),site:_(null)},v=async()=>{const C=Object.values(M).filter(g=>g.value&&g.value.validate);if(C.forEach(g=>g.value.validate()),C.find(g=>(g.value.name==="username"||g.value.name==="password")&&w.value||g.value.name==="twoFa"&&t?!1:g.value.hasError)===void 0){O.value=!0;try{await s.dispatch(G.actionTypes.SAVE_SETTINGS)}finally{O.value=!1}}};return{config:i,showPassword:_(!0),showTwoFactor:t,isLoading:P,validationRules:Tt(e),formFields:M,saveSettings:v,isSaving:O,loginRequired:r,loginError:w,sites:T,versionError:d,version:n,hasMqtt:h}}},pt={class:"row"},vt={class:"col-12"},Nt={class:"text-h5 self-end"},ht={class:"text-h5 q-mt-xl self-end"},Ot={key:3,class:"row"},Rt={class:"col-6"},wt={class:"row q-pt-md"},Ct={class:"col-12"};function At(e,s,i,t,r,d){return c(),I(L,null,[o("div",pt,[o("div",vt,[o("div",Nt,l(e.$t("UNIFI.MQTT_SETTINGS")),1),a(x,{spaced:""}),t.hasMqtt?(c(),p(V,{key:0,name:"topic",ref:t.formFields.topic,disable:t.isSaving||t.isLoading,loading:t.isLoading,modelValue:t.config.topic,"onUpdate:modelValue":s[0]||(s[0]=n=>t.config.topic=n),label:e.$t("UNIFI.TOPIC"),hint:e.$t("UNIFI.TOPIC_HINT"),rules:t.validationRules.topic,"data-role":"none"},null,8,["disable","loading","modelValue","label","hint","rules"])):(c(),p(J,{key:1,rounded:"",class:"bg-red text-white q-mt-md"},{default:u(()=>[N(l(e.$t("UNIFI.NEED_MQTT")),1)]),_:1})),o("div",ht,l(e.$t("UNIFI.CONTROLLER")),1),a(x,{spaced:""}),a($,{name:"native",ref:t.formFields.native,disable:t.isSaving||t.isLoading,loading:t.isLoading,modelValue:t.config.native,"onUpdate:modelValue":s[1]||(s[1]=n=>t.config.native=n),size:"lg",label:e.$t("UNIFI.NATIVE_HINT")},null,8,["disable","loading","modelValue","label"]),a(V,{name:"ip",ref:t.formFields.ipAddress,disable:t.isSaving||t.isLoading,loading:t.isLoading,modelValue:t.config.ipaddress,"onUpdate:modelValue":s[2]||(s[2]=n=>t.config.ipaddress=n),label:e.$t("UNIFI.IP"),hint:e.$t("UNIFI.IP_HINT"),rules:t.validationRules.ipAddress,"data-role":"none"},null,8,["disable","loading","modelValue","label","hint","rules"]),t.config.native?y("",!0):(c(),p(V,{key:2,name:"port",ref:t.formFields.port,disable:t.isSaving||t.isLoading,loading:t.isLoading,modelValue:t.config.port,"onUpdate:modelValue":s[3]||(s[3]=n=>t.config.port=n),label:e.$t("UNIFI.PORT"),hint:e.$t("UNIFI.PORT_HINT"),rules:t.validationRules.port,"data-role":"none"},null,8,["disable","loading","modelValue","label","hint","rules"])),a(V,{name:"username",ref:t.formFields.username,disable:t.isSaving||t.isLoading,loading:t.isLoading,modelValue:t.config.username,"onUpdate:modelValue":s[4]||(s[4]=n=>t.config.username=n),label:e.$t("UNIFI.USERNAME"),rules:t.validationRules.required,error:t.loginError,"data-role":"none"},null,8,["disable","loading","modelValue","label","rules","error"]),a(V,{name:"password",ref:t.formFields.password,disable:t.isSaving||t.isLoading,loading:t.isLoading,type:t.showPassword?"password":"text",modelValue:t.config.password,"onUpdate:modelValue":s[6]||(s[6]=n=>t.config.password=n),label:e.$t("UNIFI.PASSWORD"),rules:t.validationRules.required,error:t.loginError,"data-role":"none"},{append:u(()=>[a(W,{name:t.showPassword?"visibility_off":"visibility",class:"cursor-pointer",onClick:s[5]||(s[5]=n=>t.showPassword=!t.showPassword)},null,8,["name"])]),_:1},8,["disable","loading","type","modelValue","label","rules","error"]),a(le,{ref:t.formFields.site,modelValue:t.config.site,"onUpdate:modelValue":s[7]||(s[7]=n=>t.config.site=n),disable:t.isSaving||t.isLoading,loading:t.isLoading,"emit-value":"","map-options":"",options:t.sites,label:e.$t("UNIFI.SITE")},null,8,["modelValue","disable","loading","options","label"]),t.showTwoFactor?(c(),I("div",Ot,[o("div",Rt,[a(V,{name:"twoFa",ref:t.formFields.twoFa,disable:t.isSaving||t.isLoading,loading:t.isLoading,type:"text",modelValue:t.config.token,"onUpdate:modelValue":s[8]||(s[8]=n=>t.config.token=n),label:e.$t("UNIFI.TWO_FA"),error:"","data-role":"none"},{append:u(()=>[a(W,{name:"lock",class:"cursor-pointer"})]),_:1},8,["disable","loading","modelValue","label"])]),a(H)])):y("",!0)])]),a(H),o("div",wt,[o("div",Ct,[t.versionError?(c(),p(J,{key:0,rounded:"",class:"bg-red text-white q-mt-md"},{default:u(()=>[N(l(e.$t("COMMON.VERSION_ERROR",{version:t.version})),1)]),_:1})):(c(),p(X,{key:1,loading:t.isSaving,disable:!t.isSaving&&t.isLoading,push:"",color:"light-green-7",icon:"save",size:"md",label:e.$t(t.loginRequired?"COMMON.SAVE_AND_LOGIN_BTN":"COMMON.SAVE_BTN"),onClick:t.saveSettings},null,8,["loading","disable","label","onClick"]))]),a(H)])],64)}var bt=Q(ft,[["render",At]]);const yt={name:"Clients",setup(){const{t:e}=Z.exports.useI18n({useScope:"global"}),s=B(),i=S(()=>s.state.Settings.versionError),t=S(()=>s.state.Settings.version);i.value===!1&&s.dispatch(G.actionTypes.LOAD_CLIENTS);const r=S(()=>s.state.Global.loading),d=S(()=>{const C=s.state.Settings.clients.filter(g=>{const se=g.type==="WIRELESS",ne=g.type==="WIRED",ae=g.type==="WIRELESS"&&!g.experience;return se&&w.value!==se||ne&&k.value!==ne||ae&&P.value===!ae?!1:h.value?!!(E.exports.lowerCase(g.name).indexOf(E.exports.lowerCase(h.value))!=-1||E.exports.lowerCase(g.mac).indexOf(E.exports.lowerCase(h.value))!=-1||g.ssid&&E.exports.lowerCase(g.ssid).indexOf(E.exports.lowerCase(h.value))!=-1):!0});if(O.value==="standard")return C;const R=["signalPercentage","watched"].includes(O.value)?"desc":"asc";return E.exports.orderBy(C,[O.value],[R])}),n=v=>v>77?"wifi":v>33?"wifi_2_bar":"wifi_1_bar",T=(v,C,R)=>{s.dispatch(G.actionTypes.SAVE_CLIENTS,{mac:v,value:C})},w=_(!0),P=_(!0),k=_(!0),h=_(""),O=_("standard"),M=[{label:e("SORTING.STANDARD"),value:"standard"},{label:e("SORTING.SELECTED"),value:"watched"},{label:e("SORTING.NAME"),value:"name"},{label:e("SORTING.SSID"),value:"ssid"},{label:e("SORTING.EXPERIENCE"),value:"signalPercentage"},{label:e("SORTING.TYPE"),value:"type"}];return{isLoading:r,clients:d,update:T,wifiIcon:n,showWifi:w,showOffline:P,showWired:k,search:h,sorting:O,sortOptions:M,versionError:i,version:t}}},Lt=e=>(fe("data-v-206dd034"),e=e(),pe(),e),Vt={key:1,class:"row"},Ft={class:"col-12"},Ut={class:"text-h5 self-end"},Dt={class:"row"},Gt={class:"col-3"},Pt={class:"col-4"},kt={class:"col-2"},Mt={class:"col-2"},Wt={class:"bg-light-green-7 text-white"},Qt=Lt(()=>o("th",{class:"text-left"},null,-1)),qt={class:"text-left"},Ht={class:"text-left"},$t={class:"text-left"},zt={class:"text-left"},Bt={class:"text-left"},xt={class:""},Yt={key:0},jt={key:1},Kt={key:2};function Xt(e,s,i,t,r,d){return c(),I(L,null,[t.versionError?(c(),p(J,{key:0,rounded:"",class:"bg-red text-white q-mt-md"},{default:u(()=>[N(l(e.$t("COMMON.VERSION_ERROR",{version:t.version})),1)]),_:1})):y("",!0),t.versionError?y("",!0):(c(),I("div",Vt,[o("div",Ft,[o("div",Ut,l(e.$t("UNIFI.DEVICES")),1),a(x,{spaced:""}),o("p",null,l(e.$t("UNIFI.CLIENT_SELECTION")),1),o("div",Dt,[o("div",Gt,[a(V,{clearable:"","bottom-slots":"",modelValue:t.search,"onUpdate:modelValue":s[0]||(s[0]=n=>t.search=n),label:e.$t("UNIFI.SEARCH"),dense:""},{append:u(()=>[a(W,{name:"search"})]),_:1},8,["modelValue","label"])]),a(H),o("div",Pt,[a($,{modelValue:t.showWifi,"onUpdate:modelValue":s[1]||(s[1]=n=>t.showWifi=n),label:e.$t("UNIFI.SHOW_WIFI")},null,8,["modelValue","label"]),a($,{modelValue:t.showWired,"onUpdate:modelValue":s[2]||(s[2]=n=>t.showWired=n),label:e.$t("UNIFI.SHOW_WIRED")},null,8,["modelValue","label"])]),o("div",kt,[a($,{modelValue:t.showOffline,"onUpdate:modelValue":s[3]||(s[3]=n=>t.showOffline=n),label:e.$t("UNIFI.SHOW_OFFLINE")},null,8,["modelValue","label"])]),o("div",Mt,[a(le,{modelValue:t.sorting,"onUpdate:modelValue":s[4]||(s[4]=n=>t.sorting=n),dense:"","emit-value":"","map-options":"",options:t.sortOptions,label:e.$t("UNIFI.SORT")},null,8,["modelValue","options","label"])])]),a(Te,{bordered:"",separator:"vertical"},{default:u(()=>[o("thead",Wt,[o("tr",null,[Qt,o("th",qt,l(e.$t("UNIFI.NAME")),1),o("th",Ht,l(e.$t("UNIFI.MAC")),1),o("th",$t,l(e.$t("UNIFI.SSID")),1),o("th",zt,l(e.$t("UNIFI.EXPERIENCE")),1),o("th",Bt,l(e.$t("UNIFI.TYPE")),1)])]),o("tbody",xt,[t.isLoading?(c(),I(L,{key:0},ee(10,n=>o("tr",{key:n},[(c(),I(L,null,ee(6,T=>o("td",{key:T},[a(ve,{animation:"blink",type:"text"})])),64))])),64)):(c(!0),I(L,{key:1},ee(t.clients,n=>(c(),I("tr",{key:n.mac},[o("td",null,[a($,{name:n.mac,"onUpdate:modelValue":[T=>t.update(n.mac,!n.watched),T=>n.watched=T],modelValue:n.watched,size:"md"},null,8,["name","onUpdate:modelValue","modelValue"])]),o("td",null,l(n.name),1),o("td",null,l(n.mac),1),o("td",null,l(n.ssid),1),n.type==="WIRELESS"&&n.experience?(c(),I("td",Yt,[N(l(n.experience)+" ",1),a(W,{class:"float-right",name:t.wifiIcon(n.signalPercentage),size:"22px"},null,8,["name"])])):n.type==="WIRELESS"?(c(),I("td",jt,"Offline")):(c(),I("td",Kt,"-")),o("td",null,l(n.type),1)]))),128))])]),_:1})])]))],64)}var Zt=Q(yt,[["render",Xt],["__scopeId","data-v-206dd034"]]);const Jt={setup(){const e=Ne(),s=he();console.log(s,e)}},es=o("h3",null,"Not Found",-1);function ts(e,s,i,t,r,d){return c(),p(ie,{padding:""},{default:u(()=>[es,a(X,{to:{name:"settings"},label:"open Settings"})]),_:1})}var ss=Q(Jt,[["render",ts]]),ns=[{base:"/admin/plugins/unifi_presence",path:"/",component:It,children:[{name:"settings",path:"",component:bt},{name:"clients",path:"clients",component:Zt}]},{path:"/:pathMatch(.*)*",name:"NotFound",component:ss}],as={COMMON:{SAVE_BTN:"Speichern",SAVE_AND_LOGIN_BTN:"Speichern und Einloggen",VERSION_ERROR:"Die Version deines UniFi Controller ist kleiner als 6.4.54. Bitte aktualisiere zuerst deinen Controller um das Plugin nutzen zu k\xF6nnen. Deine aktuelle Version ist: {version}"},UNIFI:{SETTINGS:"Einstellungen",DEVICES:"Ger\xE4te",MQTT_SETTINGS:"MQTT Einstellungen",CONTROLLER:"UniFi Controller Einstellungen",TOPIC:"MQTT Topic",TOPIC_HINT:"Das Mqtt Topic in dem die Werte geschrieben werden sollen. Z.B. UniFi/clients. Kein Slash am Anfang oder Ende und keine Leer- oder Sonderzeichen",IP:"IP Adresse",IP_HINT:"Gebe hier die IP Adresse des UniFi Controllers an. Stelle Sicher, dass Loxberry zugriff darauf hat.",USERNAME:"Benutzername",PASSWORD:"Passwort",SITE:"UniFi Site",NEED_MQTT:"Um dises Plugin nutzen zu k\xF6nnen, muss das MQTT Gateway Plugin in der Version >= 2.0.4 installiert sein.",CLIENTS:"UniFi WiFi Ger\xE4te",CLIENT_SELECTION:"Alle selektierten Ger\xE4te werden \xFCberwacht und an MQTT \xFCbermittelt. Alle anderen Ger\xE4te werden ignoriert. Um den Status der Ger\xE4te zu erhalten, m\xFCssen diese Selektiert werden. Es wird automatisch gespeichert.",NAME:"Name",MAC:"Mac Adresse",SSID:"WLAN SSID",EXPERIENCE:"Erfahrung / Signal",TYPE:"Typ",TWO_FA:"Bitte gebe dein 2 Faktor Code ein.",NATIVE_HINT:"Wenn du eine UniFi Dream Machine oder die Dream Machine Pro benutzt, aktiviere bitte den Schalter. Wenn dein Controller woanders l\xE4uft, dann lasse den Schalter bitte aus.",PORT:"Der port um das Dashbaord zu \xF6ffnen - sofern ben\xF6tigt.",PORT_HINT:"Wenn du einen port f\xFCr den Zugriff auf den Controller im Browser brauchst, dann geben diesen bitte hier an.",LOGIN_REQUIRED:"Ausgeloggt, Bitte neu einloggen.",VERSION:"Version {version}",CPU:"CPU",MEMORY:"Mem",UPTIME:"Aktiv",ISP:"ISP",SHOW_WIRED:"Kabelgebunden anzeigen",SHOW_WIFI:"Wifi anzeigen",SHOW_OFFLINE:"Zeige Offline",SORT:"Sortierung",SEARCH:"Suche"},SERVICE:{WAIT_FOR_CONFIG:"Konfigurationsfehler, wartet auf \xC4nderungen",CONNECTED:"Verbunden mit UniFi Controller",DISCONNECTED:"Nicht Verbunden - Neue Verbindung wird hergestellt",UNAUTHORIZED:"Nicht eingeloggt",LOST:"UniFi Event Service nicht erreichbar",RESTART:"Hintergrund Service Neustarten",NO_MQTT:"Mqtt Plugin ist nicht installiert"},SORTING:{STANDARD:"Standard",SELECTED:"Selectiert",NAME:"Name",SSID:"Wlan SSID",EXPERIENCE:"Erfahrung",TYPE:"Typ"},VALIDATION:{REQUIRED:"Diese Feld wird zwingend ben\xF6tigt.",INVALID_TOPIC:"Das Topic darf nur alphanumerisch sein und wird mit einem / gruppiert. Beispielsweise test/topic.",INVALID_IP:"Bitte gebe eine g\xFCltige V4 IP-Addresse ein.",INVALID_PORT:"Bitte gebe einen Port zwischen 0 und 65535 an."}};const z=Oe(We),os=Re({history:we(),routes:ns}),is=Z.exports.createI18n({locale:"de",fallbackLocale:"en",messages:{de:as}}),rs=Ce({modules:{[F.name]:F,[f.name]:f,[G.name]:G}});z.use(Ae,{plugins:{Loading:be}});z.use(os);z.use(rs);z.use(is);z.mount("#unifiPresence");
