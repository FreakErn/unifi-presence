import{l as _,a as C,u as H,r as x,c as A,w as u,Q as oe,o as g,b as a,d as ie,e as m,f as I,g as le,h as ee,i as re,j as de,k as j,m as W,n as o,t as d,p as T,q as $,s as D,v as ce,x as R,F as G,y as ue,z as q,A as K,B as ge,C as me,D as te,E as se,G as Q,H as ne,I as b,J as M,K as ae,L as Se,M as Y,N as _e,O as Ie,P as Ee,R as Te,S as fe,T as pe,U as he,V as Ne,W as ve,X as Oe,Y as Re}from"./vendor.aef85bd3.js";const we=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const n of l.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function i(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerpolicy&&(l.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?l.credentials="include":r.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function t(r){if(r.ep)return;r.ep=!0;const l=i(r);fetch(r.href,l)}};we();const Ce={},B={ERROR:"error",RESET_ERROR:"resetError",LOADING:"setLoading"},Ae=()=>({error:null,loading:!1}),be={},Le={[B.ERROR](e,s){e.error=s},[B.RESET_ERROR](e){e.error=null},[B.LOADING](e,s){e.loading=s}};var L={name:"Global",namespaced:!0,state:Ae,actions:be,mutations:Le,mutationTypes:_.exports.mapValues(B,e=>`Global/${e}`),actionTypes:_.exports.mapValues(Ce,e=>`Global/${e}`)};const w={LOAD_CONFIG:"loadConfig",SAVE_CONFIG:"saveConfig",LOAD_STATS:"loadStats",LOAD_CLIENTS:"loadClients",SAVE_CLIENTS:"saveClients",RESTART_SERVICE:"restartService",LOAD_SITES:"loadSites"},c={STORE_CONFIG:"storeConfig",SHOW_TWO_FACTOR:"showTwoFactor",HIDE_TWO_FACTOR:"hideTwoFactor",STORE_STATS:"storeStats",SET_LOGIN_REQUIRED:"setLoginRequired",SET_LOGIN_ERROR:"setLoginError",SET_CONNECTION_ERROR:"setConnectionError",SET_CLIENTS:"setClients",SET_CONFIG_CLIENTS:"setConfigClients",SET_SERVICE_STATUS:"setServiceStatus",SET_SITES:"setSites"},ye=()=>({config:{},showTwoFactor:!1,version:null,stats:{},loginRequired:!1,loginError:!1,connectionError:!1,existingClients:[],clients:[],serviceStatus:"DISCONNECTED",sites:[{label:"Default",value:"default"}]}),y=async(e,s)=>{try{e.commit(L.mutationTypes.RESET_ERROR,null,{root:!0}),await s(),e.commit(c.SET_CONNECTION_ERROR,!1)}catch(i){if(i.response){if(i.response.status===499)throw e.commit(c.SHOW_TWO_FACTOR),i;if(i.response.status===401)throw e.commit(c.SET_LOGIN_REQUIRED,!0),e.commit(c.SET_LOGIN_ERROR,!0),i;if(i.response.status===408)throw e.commit(c.SET_CONNECTION_ERROR,!0),i;const t=_.exports.get(i,"response.data.error",i.message);e.commit(L.mutationTypes.ERROR,t,{root:!0})}else e.commit(L.mutationTypes.ERROR,i.message,{root:!0});throw i}},Ve={async[w.LOAD_CONFIG](e){return y(e,async()=>{const s=await C.get("/plugins/unifi_presence/api/config");e.commit(c.STORE_CONFIG,s.data)})},async[w.SAVE_CONFIG](e){return e.commit(c.HIDE_TWO_FACTOR),e.commit(c.SET_LOGIN_ERROR,!1),y(e,async()=>{const s=await C.put("/plugins/unifi_presence/api/config",Object.assign(e.state.config,{loginRequired:e.state.loginRequired}));e.commit(c.STORE_CONFIG,s.data)})},async[w.LOAD_STATS](e){return y(e,async()=>{const s=await C.get("/plugins/unifi_presence/api/stats");e.commit(c.STORE_STATS,s.data),e.commit(c.SET_LOGIN_REQUIRED,!1)})},async[w.LOAD_CLIENTS](e){return y(e,async()=>{const s=await C.get("/plugins/unifi_presence/api/clients");e.commit(c.SET_CLIENTS,s.data.clients)})},async[w.SAVE_CLIENTS](e,{mac:s,value:i}){return y(e,async()=>{const t=e.state.clients.filter(l=>l.mac!=s&&l.watched||l.mac==s&&i===!0).map(l=>{const n=Object.assign({},l);return delete n.watched,n}),r=await C.put("/plugins/unifi_presence/api/config",{clients:t});e.commit(c.SET_CONFIG_CLIENTS,r.data.clients)})},async[w.RESTART_SERVICE](e){return y(e,async()=>{await C.post("/plugins/unifi_presence/api/restartService")})},async[w.LOAD_SITES](e){return y(e,async()=>{const s=await C.get("/plugins/unifi_presence/api/sites");e.commit(c.SET_SITES,s.data.sites)})}},Fe={[c.STORE_CONFIG](e,s){e.config=s,e.existingClients=s.clients.map(i=>i.mac)},[c.STORE_STATS](e,s){s.version&&(e.version=s.version),e.stats={wan:s.wan,www:s.www}},[c.SHOW_TWO_FACTOR](e){e.showTwoFactor=!0,e.config.token=null,e.twoFaEnabled=!0},[c.HIDE_TWO_FACTOR](e){e.showTwoFactor=!1},[c.SET_LOGIN_REQUIRED](e,s){e.loginRequired=s},[c.SET_LOGIN_ERROR](e,s){e.loginError=s,e.twoFaEnabled=!1},[c.SET_CONNECTION_ERROR](e,s){e.connectionError=s},[c.SET_CLIENTS](e,s){s=s.map(i=>(i.watched=e.existingClients.includes(i.mac),i)),e.clients=_.exports.orderBy(s,["watched","type"],["desc","desc"])},[c.SET_CONFIG_CLIENTS](e,s){e.config.clients=s},[c.SET_SERVICE_STATUS](e,s){e.serviceStatus=s},[c.SET_SITES](e,s){e.sites=s}};var f={name:"Settings",namespaced:!0,state:ye,actions:Ve,mutations:Fe,mutationTypes:_.exports.mapValues(c,e=>`Settings/${e}`),actionTypes:_.exports.mapValues(w,e=>`Settings/${e}`)};var P=(e,s)=>{for(const[i,t]of s)e[i]=t;return e};const Ue={name:"App",setup(){const e=H();let s=null;const i=()=>{const t=new WebSocket(`ws://${document.location.hostname}:3000/plugins/unifi_presence/api/socket`,"webClient");t.onopen=r=>{s=setInterval(()=>t.send("ping"),2e4)},t.onmessage=r=>{if(r.data==="pong")return;const l=JSON.parse(r.data);switch(l.type){case"stats":return e.commit(f.mutationTypes.STORE_STATS,l.data);case"serviceStatus":return e.commit(f.mutationTypes.SET_SERVICE_STATUS,l.data.status)}},t.onclose=()=>{clearInterval(s),console.log("lost Connection"),setTimeout(i,5e3)}};i()}};function De(e,s,i,t,r,l){const n=x("router-view");return g(),A(oe,{view:"hHh lpR fFf",class:"bg-grey-1"},{default:u(()=>[a(ie,null,{default:u(()=>[a(n)]),_:1})]),_:1})}var Ge=P(Ue,[["render",De]]);const Pe={},V={LOAD_SETTINGS:"LOAD_SETTINGS",SAVE_SETTINGS:"SAVE_SETTINGS",LOAD_CLIENTS:"LOAD_CLIENTS",SAVE_CLIENTS:"SAVE_CLIENTS",RESTART_SERVICE:"RESTART_SERVICE"},Z=async(e,s)=>{e.commit(L.mutationTypes.LOADING,!0,{root:!0});try{await s()}finally{e.commit(L.mutationTypes.LOADING,!1,{root:!0})}},ke={async[V.LOAD_SETTINGS](e){return Z(e,async()=>{await e.dispatch(f.actionTypes.LOAD_CONFIG,null,{root:!0});const s=e.rootState.Settings.config;s.ipaddress&&s.username&&s.password&&(await e.dispatch(f.actionTypes.LOAD_STATS,null,{root:!0}),await e.dispatch(f.actionTypes.LOAD_SITES,null,{root:!0}))})},async[V.SAVE_SETTINGS](e){return Z(e,async()=>{await e.dispatch(f.actionTypes.SAVE_CONFIG,null,{root:!0}),await e.dispatch(f.actionTypes.LOAD_STATS,null,{root:!0}),await e.dispatch(f.actionTypes.LOAD_SITES,null,{root:!0})})},async[V.LOAD_CLIENTS](e){return Z(e,async()=>{_.exports.isEmpty(e.rootState.Settings.config)&&await e.dispatch(V.LOAD_SETTINGS),await e.dispatch(f.actionTypes.LOAD_CLIENTS,null,{root:!0})})},async[V.SAVE_CLIENTS](e,{mac:s,value:i}){return e.dispatch(f.actionTypes.SAVE_CLIENTS,{mac:s,value:i},{root:!0})},async[V.RESTART_SERVICE](e){return e.dispatch(f.actionTypes.RESTART_SERVICE,null,{root:!0})}};var F={name:"Actions",namespaced:!0,actions:ke,actionTypes:_.exports.mapValues(V,e=>`Actions/${e}`),mutationTypes:_.exports.mapValues(Pe,e=>`Actions/${e}`)},We="/admin/plugins/unifi_presence/assets/udm.c8127c61.png";const Qe={name:"UnifiController",setup(){const e=H(),s=m(()=>e.state.Settings.config),i=m(()=>e.state.Global.loading),t=m(()=>e.state.Settings.loginRequired),r=m(()=>e.state.Settings.version),l=m(()=>e.state.Settings.stats),n=m(()=>e.state.Settings.serviceStatus),E=m(()=>e.state.Global.error),p=m(()=>e.state.Settings.connectionError),v=m(()=>!(t.value||E.value||p.value||r.value===null||!s.value.username||!s.value.ipaddress||!s.value.password||n.value!=="CONNECTED")),k=O=>O<3600?`${Math.round(O/60)}m`:O<86400?`${Math.round(O/60/60)}h`:`${Math.floor(O/60/60/24)}d`,h=m(()=>k(l.value.www.uptime)),U=m(()=>k(l.value.wan.stats.uptime)),S=I(!1);return{isLoading:i,version:r,loginRequired:t,error:E,connected:v,stats:l,ispUptime:h,udmUptime:U,serviceStatus:n,restartLoading:S,restartService:async()=>{S.value=!0,await e.dispatch(F.actionTypes.RESTART_SERVICE,null,{root:!0}),S.value=!1},udm:We}}},Me={class:"text-h6"},ze={key:0,class:"text-subtitle2"},He={key:1,class:"text-weight-medium text-negative"},$e={class:"text-h6"},qe={class:"text-subtitle2"},Be={class:"row"},xe={class:"col-4 text-weight-light"},je={class:"text-weight-medium"},Ke={class:"col-5 text-weight-light"},Ye={class:"text-weight-medium"},Ze={class:"col-3 text-weight-light"},Xe={class:"text-weight-medium"},Je={class:"col-9 text-weight-light"},et={class:"text-weight-medium"},tt={class:"col-3 text-weight-light"},st={class:"text-weight-medium"};function nt(e,s,i,t,r,l){return g(),A(ge,{class:"my-card"},{default:u(()=>[a(le,{src:t.udm,"spinner-color":"white"},null,8,["src"]),t.isLoading?(g(),A(ee,{key:0,align:"center"},{default:u(()=>[a(re,{color:"primary",size:"3em",class:"q-mb-md"})]),_:1})):(g(),A(de,{key:1},{default:u(()=>[a(ue,null,{default:u(()=>[t.connected?(g(),T(G,{key:1},[a(j,null,{default:u(()=>[a(W,null,{default:u(()=>[o("div",$e,d(t.stats.wan.name),1),o("div",qe,d(e.$t(`SERVICE.${t.serviceStatus}`)),1),a(ce,{caption:""},{default:u(()=>[R(d(e.$t("UNIFI.VERSION",{version:t.version})),1)]),_:1})]),_:1}),a(W,{avatar:""},{default:u(()=>[a(D,{size:"40px",name:"verified",color:"light-green-7"})]),_:1})]),_:1}),a(j,null,{default:u(()=>[a(W,null,{default:u(()=>[o("div",Be,[o("div",xe,[o("span",je,d(e.$t("UNIFI.CPU"))+":",1),R(" "+d(t.stats.wan.stats.cpu)+"%",1)]),o("div",Ke,[o("span",Ye,d(e.$t("UNIFI.MEMORY"))+":",1),R(" "+d(t.stats.wan.stats.mem)+"Mb",1)]),o("div",Ze,[o("span",Xe,d(e.$t("UNIFI.UPTIME"))+":",1),R(" "+d(t.udmUptime),1)]),o("div",Je,[o("span",et,d(e.$t("UNIFI.ISP"))+":",1),R(" "+d(t.stats.www.isp),1)]),o("div",tt,[o("span",st,d(e.$t("UNIFI.UPTIME"))+":",1),R(" "+d(t.ispUptime),1)])])]),_:1})]),_:1})],64)):(g(),A(j,{key:0},{default:u(()=>[a(W,null,{default:u(()=>[o("div",Me,d(e.$t(`SERVICE.${t.serviceStatus}`)),1),t.loginRequired?(g(),T("div",ze,d(e.$t("UNIFI.LOGIN_REQUIRED")),1)):$("",!0),t.error?(g(),T("div",He,d(t.error),1)):$("",!0)]),_:1}),a(W,{avatar:""},{default:u(()=>[a(D,{size:"40px",name:"warning_amber",color:"orange-14"})]),_:1})]),_:1}))]),_:1})]),_:1})),a(q),a(ee,null,{default:u(()=>[a(K,{class:"q-ml-md",outline:"",icon:"restart_alt",size:"sm",color:"orange-14",loading:t.restartLoading,onClick:t.restartService},{default:u(()=>[R(d(e.$t("SERVICE.RESTART")),1)]),_:1},8,["loading","onClick"])]),_:1})]),_:1})}var at=P(Qe,[["render",nt]]);const ot={name:"Page",components:{UnifiController:at},setup(){return{}}},it={class:"q-pa-md"},lt={class:"q-gutter-y-md bg-light-green-7"},rt={class:"row"},dt={class:"col-5 col-md-4 col-lg-3 q-pt-md"},ct={class:"col-6 col-md-7 col-lg-8"};function ut(e,s,i,t,r,l){const n=x("UnifiController"),E=x("router-view");return g(),T(G,null,[o("div",it,[o("div",lt,[a(me,{"inline-label":"",class:"text-grey-3 bg-light-green-6","active-color":"white bg-light-green-7","indicator-color":"light-green-9",align:"justify"},{default:u(()=>[a(se,{name:"mails",to:{name:"settings"},icon:"settings",label:e.$t("UNIFI.SETTINGS")},null,8,["label"]),a(se,{name:"alarms",to:{name:"clients"},icon:"router",label:e.$t("UNIFI.DEVICES")},null,8,["label"])]),_:1})])]),a(te,{padding:""},{default:u(()=>[o("div",rt,[o("div",dt,[a(n)]),a(Q),o("div",ct,[a(E)])])]),_:1})],64)}var gt=P(ot,[["render",ut]]),mt=e=>({required:[s=>!!s||e("VALIDATION.REQUIRED")],topic:[s=>/^[\w-]+((?:\/[\w-]+)+)?$/.test(s)||e("VALIDATION.INVALID_TOPIC")],ipAddress:[s=>/\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/.test(s)||e("VALIDATION.INVALID_IP")],port:[s=>s==null||/^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/.test(s)||e("VALIDATION.INVALID_PORT")]});const St={name:"Settings",components:{},setup(){const{t:e}=ne.exports.useI18n({useScope:"global"}),s=H();s.dispatch(F.actionTypes.LOAD_SETTINGS);const i=m(()=>s.state.Settings.config),t=m(()=>s.state.Settings.showTwoFactor),r=m(()=>s.state.Settings.loginRequired),l=m(()=>s.state.Settings.sites),n=m(()=>s.state.Settings.loginError),E=m(()=>s.state.Global.loading),p=I(!1),v={topic:I(null),native:I(null),ipAddress:I(null),port:I(null),username:I(null),password:I(null),twoFa:I(null),site:I(null)},k=async()=>{const h=Object.values(v).filter(S=>S.value&&S.value.validate);if(h.forEach(S=>S.value.validate()),h.find(S=>(S.value.name==="username"||S.value.name==="password")&&n.value||S.value.name==="twoFa"&&t?!1:S.value.hasError)===void 0){p.value=!0;try{await s.dispatch(F.actionTypes.SAVE_SETTINGS)}finally{p.value=!1}}};return{config:i,showPassword:I(!0),showTwoFactor:t,isLoading:E,validationRules:mt(e),formFields:v,saveSettings:k,isSaving:p,loginRequired:r,loginError:n,sites:l}}},_t={class:"row"},It={class:"col-12"},Et={class:"text-h5 self-end"},Tt={class:"text-h5 q-mt-xl self-end"},ft={key:1,class:"row"},pt={class:"col-6"},ht={class:"row q-pt-md"},Nt={class:"col-12"};function vt(e,s,i,t,r,l){return g(),T(G,null,[o("div",_t,[o("div",It,[o("div",Et,d(e.$t("UNIFI.MQTT_SETTINGS")),1),a(q,{spaced:""}),a(b,{name:"topic",ref:t.formFields.topic,disable:t.isSaving||t.isLoading,loading:t.isLoading,modelValue:t.config.topic,"onUpdate:modelValue":s[0]||(s[0]=n=>t.config.topic=n),label:e.$t("UNIFI.TOPIC"),hint:e.$t("UNIFI.TOPIC_HINT"),rules:t.validationRules.topic},null,8,["disable","loading","modelValue","label","hint","rules"]),o("div",Tt,d(e.$t("UNIFI.CONTROLLER")),1),a(q,{spaced:""}),a(M,{name:"native",ref:t.formFields.native,disable:t.isSaving||t.isLoading,loading:t.isLoading,modelValue:t.config.native,"onUpdate:modelValue":s[1]||(s[1]=n=>t.config.native=n),size:"lg",label:e.$t("UNIFI.NATIVE_HINT")},null,8,["disable","loading","modelValue","label"]),a(b,{name:"ip",ref:t.formFields.ipAddress,disable:t.isSaving||t.isLoading,loading:t.isLoading,modelValue:t.config.ipaddress,"onUpdate:modelValue":s[2]||(s[2]=n=>t.config.ipaddress=n),label:e.$t("UNIFI.IP"),hint:e.$t("UNIFI.IP_HINT"),rules:t.validationRules.ipAddress},null,8,["disable","loading","modelValue","label","hint","rules"]),t.config.native?$("",!0):(g(),A(b,{key:0,name:"port",ref:t.formFields.port,disable:t.isSaving||t.isLoading,loading:t.isLoading,modelValue:t.config.port,"onUpdate:modelValue":s[3]||(s[3]=n=>t.config.port=n),label:e.$t("UNIFI.PORT"),hint:e.$t("UNIFI.PORT_HINT"),rules:t.validationRules.port},null,8,["disable","loading","modelValue","label","hint","rules"])),a(b,{name:"username",ref:t.formFields.username,disable:t.isSaving||t.isLoading,loading:t.isLoading,modelValue:t.config.username,"onUpdate:modelValue":s[4]||(s[4]=n=>t.config.username=n),label:e.$t("UNIFI.USERNAME"),rules:t.validationRules.required,error:t.loginError},null,8,["disable","loading","modelValue","label","rules","error"]),a(b,{name:"password",ref:t.formFields.password,disable:t.isSaving||t.isLoading,loading:t.isLoading,type:t.showPassword?"password":"text",modelValue:t.config.password,"onUpdate:modelValue":s[6]||(s[6]=n=>t.config.password=n),label:e.$t("UNIFI.PASSWORD"),rules:t.validationRules.required,error:t.loginError},{append:u(()=>[a(D,{name:t.showPassword?"visibility_off":"visibility",class:"cursor-pointer",onClick:s[5]||(s[5]=n=>t.showPassword=!t.showPassword)},null,8,["name"])]),_:1},8,["disable","loading","type","modelValue","label","rules","error"]),a(ae,{ref:t.formFields.site,modelValue:t.config.site,"onUpdate:modelValue":s[7]||(s[7]=n=>t.config.site=n),disable:t.isSaving||t.isLoading,loading:t.isLoading,"emit-value":"","map-options":"",options:t.sites,label:e.$t("UNIFI.SITE")},null,8,["modelValue","disable","loading","options","label"]),t.showTwoFactor?(g(),T("div",ft,[o("div",pt,[a(b,{name:"twoFa",ref:t.formFields.twoFa,disable:t.isSaving||t.isLoading,loading:t.isLoading,type:"text",modelValue:t.config.token,"onUpdate:modelValue":s[8]||(s[8]=n=>t.config.token=n),label:e.$t("UNIFI.TWO_FA"),error:""},{append:u(()=>[a(D,{name:"lock",class:"cursor-pointer"})]),_:1},8,["disable","loading","modelValue","label"])]),a(Q)])):$("",!0)])]),a(Q),o("div",ht,[o("div",Nt,[a(K,{loading:t.isSaving,disable:!t.isSaving&&t.isLoading,push:"",color:"light-green-7",icon:"save",size:"md",label:e.$t(t.loginRequired?"COMMON.SAVE_AND_LOGIN_BTN":"COMMON.SAVE_BTN"),onClick:t.saveSettings},null,8,["loading","disable","label","onClick"])]),a(Q)])],64)}var Ot=P(St,[["render",vt]]);const Rt={name:"Clients",setup(){const e=H();e.dispatch(F.actionTypes.LOAD_CLIENTS);const s=m(()=>e.state.Global.loading),i=m(()=>{const U=e.state.Settings.clients.filter(N=>{const O=N.type==="WIRELESS",X=N.type==="WIRED",J=N.type==="WIRELESS"&&!N.experience;return O&&l.value!==O||X&&E.value!==X||J&&n.value===!J?!1:p.value?!!(_.exports.lowerCase(N.name).indexOf(_.exports.lowerCase(p.value))!=-1||_.exports.lowerCase(N.mac).indexOf(_.exports.lowerCase(p.value))!=-1||N.ssid&&_.exports.lowerCase(N.ssid).indexOf(_.exports.lowerCase(p.value))!=-1):!0}),S=["signalPercentage","watched"].includes(v.value)?"desc":"asc";return _.exports.orderBy(U,[v.value],[S])}),t=h=>h>77?"wifi":h>33?"wifi_2_bar":"wifi_1_bar",r=(h,U,S)=>{e.dispatch(F.actionTypes.SAVE_CLIENTS,{mac:h,value:U})},l=I(!0),n=I(!0),E=I(!0),p=I(""),v=I("watched");return{isLoading:s,clients:i,update:r,wifiIcon:t,showWifi:l,showOffline:n,showWired:E,search:p,sorting:v,sortOptions:[{label:"Selectiert",value:"watched"},{label:"Name",value:"name"},{label:"Wlan SSID",value:"ssid"},{label:"Erfahrung",value:"signalPercentage"},{label:"Typ",value:"type"}]}}},wt=e=>(_e("data-v-0727866e"),e=e(),Ie(),e),Ct={class:"row"},At={class:"col-12"},bt={class:"text-h5 self-end"},Lt={class:"row"},yt={class:"col-3"},Vt={class:"col-4"},Ft={class:"col-2"},Ut={class:"col-2"},Dt={class:"bg-light-green-7 text-white"},Gt=wt(()=>o("th",{class:"text-left"},null,-1)),Pt={class:"text-left"},kt={class:"text-left"},Wt={class:"text-left"},Qt={class:"text-left"},Mt={class:"text-left"},zt={class:""},Ht={key:0},$t={key:1},qt={key:2};function Bt(e,s,i,t,r,l){return g(),T("div",Ct,[o("div",At,[o("div",bt,d(e.$t("UNIFI.DEVICES")),1),a(q,{spaced:""}),o("p",null,d(e.$t("UNIFI.CLIENT_SELECTION")),1),o("div",Lt,[o("div",yt,[a(b,{clearable:"","bottom-slots":"",modelValue:t.search,"onUpdate:modelValue":s[0]||(s[0]=n=>t.search=n),label:e.$t("UNIFI.SEARCH"),dense:""},{append:u(()=>[a(D,{name:"search"})]),_:1},8,["modelValue","label"])]),a(Q),o("div",Vt,[a(M,{modelValue:t.showWifi,"onUpdate:modelValue":s[1]||(s[1]=n=>t.showWifi=n),label:e.$t("UNIFI.SHOW_WIFI")},null,8,["modelValue","label"]),a(M,{modelValue:t.showWired,"onUpdate:modelValue":s[2]||(s[2]=n=>t.showWired=n),label:e.$t("UNIFI.SHOW_WIRED")},null,8,["modelValue","label"])]),o("div",Ft,[a(M,{modelValue:t.showOffline,"onUpdate:modelValue":s[3]||(s[3]=n=>t.showOffline=n),label:e.$t("UNIFI.SHOW_OFFLINE")},null,8,["modelValue","label"])]),o("div",Ut,[a(ae,{modelValue:t.sorting,"onUpdate:modelValue":s[4]||(s[4]=n=>t.sorting=n),dense:"","emit-value":"","map-options":"",options:t.sortOptions,label:e.$t("UNIFI.SORT")},null,8,["modelValue","options","label"])])]),a(Se,{bordered:"",separator:"vertical"},{default:u(()=>[o("thead",Dt,[o("tr",null,[Gt,o("th",Pt,d(e.$t("UNIFI.NAME")),1),o("th",kt,d(e.$t("UNIFI.MAC")),1),o("th",Wt,d(e.$t("UNIFI.SSID")),1),o("th",Qt,d(e.$t("UNIFI.EXPERIENCE")),1),o("th",Mt,d(e.$t("UNIFI.TYPE")),1)])]),o("tbody",zt,[t.isLoading?(g(),T(G,{key:0},Y(10,n=>o("tr",{key:n},[(g(),T(G,null,Y(6,E=>o("td",{key:E},[a(Ee,{animation:"blink",type:"text"})])),64))])),64)):(g(!0),T(G,{key:1},Y(t.clients,n=>(g(),T("tr",{key:n.mac},[o("td",null,[a(M,{name:n.mac,"onUpdate:modelValue":[E=>t.update(n.mac,!n.watched),E=>n.watched=E],modelValue:n.watched,size:"md"},null,8,["name","onUpdate:modelValue","modelValue"])]),o("td",null,d(n.name),1),o("td",null,d(n.mac),1),o("td",null,d(n.ssid),1),n.type==="WIRELESS"&&n.experience?(g(),T("td",Ht,[R(d(n.experience)+" ",1),a(D,{class:"float-right",name:t.wifiIcon(n.signalPercentage),size:"22px"},null,8,["name"])])):n.type==="WIRELESS"?(g(),T("td",$t,"Offline")):(g(),T("td",qt,"-")),o("td",null,d(n.type),1)]))),128))])]),_:1})])])}var xt=P(Rt,[["render",Bt],["__scopeId","data-v-0727866e"]]);const jt={setup(){const e=Te(),s=fe();console.log(s,e)}},Kt=o("h3",null,"Not Found",-1);function Yt(e,s,i,t,r,l){return g(),A(te,{padding:""},{default:u(()=>[Kt,a(K,{to:{name:"settings"},label:"open Settings"})]),_:1})}var Zt=P(jt,[["render",Yt]]),Xt=[{path:"/admin/plugins/unifi_presence",component:gt,children:[{name:"settings",path:"",component:Ot},{name:"clients",path:"clients",component:xt}]},{path:"/:pathMatch(.*)*",name:"NotFound",component:Zt}],Jt={COMMON:{SAVE_BTN:"Speichern",SAVE_AND_LOGIN_BTN:"Speichern und Einloggen",HINT_SAVE_2FA:"Bitte gebe dein 2 Faktor Code ein um dich einzuloggen",VERSION_ERROR:"Die Version deines UniFi Controller ist kleiner als 6.4.54. Bitte aktualisiere zuerst deinen Controller um das Plugin nutzen zu k\xF6nnen. Deine aktuelle Version ist"},UNIFI:{SETTINGS:"Einstellungen",DEVICES:"Ger\xE4te",MQTT_SETTINGS:"MQTT Einstellungen",CONTROLLER:"UniFi Controller Einstellungen",TOPIC:"MQTT Topic",TOPIC_HINT:"Das Mqtt Topic in dem die Werte geschrieben werden sollen. Z.B. UniFi/clients. Kein Slash am Anfang oder Ende und keine Leer- oder Sonderzeichen",IP:"IP Adresse",IP_HINT:"Gebe hier die IP Adresse des UniFi Controllers an. Stelle Sicher, dass Loxberry zugriff darauf hat.",USERNAME:"Benutzername",PASSWORD:"Passwort",SITE:"UniFi Site",NEED_MQTT:"Um dises Plugin nutzen zu k\xF6nnen, muss das MQTT Gateway Plugin in der Version >= 2.0.4 installiert sein.",CLIENTS:"UniFi WiFi Ger\xE4te",NO_CLIENTS:"Ger\xE4te konnen noch nicht angezeigt werden. Bitte stelle zun\xE4chst eine Verbindung zum UniFi Controller her.",CLIENT_SELECTION:"Alle selektierten Ger\xE4te werden \xFCberwacht und an MQTT \xFCbermittelt. Alle anderen Ger\xE4te werden ignoriert. Um den Status der Ger\xE4te zu erhalten, m\xFCssen diese Selektiert werden. Es wird automatisch gespeichert.",NAME:"Name",MAC:"Mac Adresse",SSID:"WLAN SSID",EXPERIENCE:"Erfahrung / Signal",TYPE:"Typ",TWO_FA:"Bitte gebe dein 2 Faktor Code ein.",NATIVE_HINT:"Wenn du eine UniFi Dream Machine oder die Dream Machine Pro benutzt, aktiviere bitte den Schalter. Wenn dein Controller woanders l\xE4uft, dann lasse den Schalter bitte aus.",PORT:"Der port um das Dashbaord zu \xF6ffnen - sofern ben\xF6tigt.",PORT_HINT:"Wenn du einen port f\xFCr den Zugriff auf den Controller im Browser brauchst, dann geben diesen bitte hier an.",LOGIN_REQUIRED:"Ausgeloggt, Bitte neu einloggen.",VERSION:"Version {version}",CPU:"CPU",MEMORY:"Mem",UPTIME:"Aktiv",ISP:"ISP",SHOW_WIRED:"Kabelgebunden anzeigen",SHOW_WIFI:"Wifi anzeigen",SHOW_OFFLINE:"Zeige Offline",SORT:"Sortierung",SEARCH:"Suche"},SERVICE:{WAIT_FOR_CONFIG:"Konfigurationsfehler, wartet auf \xC4nderungen",CONNECTED:"Verbunden mit UniFi Controller",DISCONNECTED:"Nicht Verbunden - Neue Verbindung wird hergestellt",UNAUTHORIZED:"Nicht eingeloggt",LOST:"UniFi Event Service nicht erreichbar",RESTART:"Restart Service"},VALIDATION:{REQUIRED:"Diese Feld wird zwingend ben\xF6tigt.",INVALID_TOPIC:"Das Topic darf nur alphanumerisch sein und wird mit einem / gruppiert. Beispielsweise test/topic.",INVALID_IP:"Bitte gebe eine g\xFCltige V4 IP-Addresse ein.",INVALID_PORT:"Bitte gebe einen Port zwischen 0 und 65535 an."}};const z=pe(Ge),es=he({history:Ne(),routes:Xt}),ts=ne.exports.createI18n({locale:"de",fallbackLocale:"en",messages:{de:Jt}}),ss=ve({modules:{[L.name]:L,[f.name]:f,[F.name]:F}});z.use(Oe,{plugins:{Loading:Re}});z.use(es);z.use(ss);z.use(ts);z.mount("#unifiPresence");
