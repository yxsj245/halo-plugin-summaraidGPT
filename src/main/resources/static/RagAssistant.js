(function(pe){typeof define=="function"&&define.amd?define(pe):pe()})((function(){"use strict";const pe=globalThis,Pt=pe.ShadowRoot&&(pe.ShadyCSS===void 0||pe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$t=Symbol(),Pr=new WeakMap;let $r=class{constructor(t,r,a){if(this._$cssResult$=!0,a!==$t)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=r}get styleSheet(){let t=this.o;const r=this.t;if(Pt&&t===void 0){const a=r!==void 0&&r.length===1;a&&(t=Pr.get(r)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),a&&Pr.set(r,t))}return t}toString(){return this.cssText}};const hs=e=>new $r(typeof e=="string"?e:e+"",void 0,$t),ye=(e,...t)=>{const r=e.length===1?e[0]:t.reduce((a,n,s)=>a+(u=>{if(u._$cssResult$===!0)return u.cssText;if(typeof u=="number")return u;throw Error("Value passed to 'css' function must be a 'css' function result: "+u+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+e[s+1],e[0]);return new $r(r,e,$t)},fs=(e,t)=>{if(Pt)e.adoptedStyleSheets=t.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(const r of t){const a=document.createElement("style"),n=pe.litNonce;n!==void 0&&a.setAttribute("nonce",n),a.textContent=r.cssText,e.appendChild(a)}},Fr=Pt?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let r="";for(const a of t.cssRules)r+=a.cssText;return hs(r)})(e):e;const{is:gs,defineProperty:bs,getOwnPropertyDescriptor:ms,getOwnPropertyNames:xs,getOwnPropertySymbols:ys,getPrototypeOf:vs}=Object,nt=globalThis,Mr=nt.trustedTypes,ws=Mr?Mr.emptyScript:"",_s=nt.reactiveElementPolyfillSupport,Re=(e,t)=>e,st={toAttribute(e,t){switch(t){case Boolean:e=e?ws:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=e!==null;break;case Number:r=e===null?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch{r=null}}return r}},Ft=(e,t)=>!gs(e,t),Ir={attribute:!0,type:String,converter:st,reflect:!1,useDefault:!1,hasChanged:Ft};Symbol.metadata??=Symbol("metadata"),nt.litPropertyMetadata??=new WeakMap;let ve=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,r=Ir){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(t,r),!r.noAccessor){const a=Symbol(),n=this.getPropertyDescriptor(t,a,r);n!==void 0&&bs(this.prototype,t,n)}}static getPropertyDescriptor(t,r,a){const{get:n,set:s}=ms(this.prototype,t)??{get(){return this[r]},set(u){this[r]=u}};return{get:n,set(u){const i=n?.call(this);s?.call(this,u),this.requestUpdate(t,i,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ir}static _$Ei(){if(this.hasOwnProperty(Re("elementProperties")))return;const t=vs(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Re("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Re("properties"))){const r=this.properties,a=[...xs(r),...ys(r)];for(const n of a)this.createProperty(n,r[n])}const t=this[Symbol.metadata];if(t!==null){const r=litPropertyMetadata.get(t);if(r!==void 0)for(const[a,n]of r)this.elementProperties.set(a,n)}this._$Eh=new Map;for(const[r,a]of this.elementProperties){const n=this._$Eu(r,a);n!==void 0&&this._$Eh.set(n,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const r=[];if(Array.isArray(t)){const a=new Set(t.flat(1/0).reverse());for(const n of a)r.unshift(Fr(n))}else t!==void 0&&r.push(Fr(t));return r}static _$Eu(t,r){const a=r.attribute;return a===!1?void 0:typeof a=="string"?a:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,r=this.constructor.elementProperties;for(const a of r.keys())this.hasOwnProperty(a)&&(t.set(a,this[a]),delete this[a]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return fs(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,r,a){this._$AK(t,a)}_$ET(t,r){const a=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,a);if(n!==void 0&&a.reflect===!0){const s=(a.converter?.toAttribute!==void 0?a.converter:st).toAttribute(r,a.type);this._$Em=t,s==null?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(t,r){const a=this.constructor,n=a._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const s=a.getPropertyOptions(n),u=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:st;this._$Em=n;const i=u.fromAttribute(r,s.type);this[n]=i??this._$Ej?.get(n)??i,this._$Em=null}}requestUpdate(t,r,a,n=!1,s){if(t!==void 0){const u=this.constructor;if(n===!1&&(s=this[t]),a??=u.getPropertyOptions(t),!((a.hasChanged??Ft)(s,r)||a.useDefault&&a.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(u._$Eu(t,a))))return;this.C(t,r,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,r,{useDefault:a,reflect:n,wrapped:s},u){a&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,u??r??this[t]),s!==!0||u!==void 0)||(this._$AL.has(t)||(this.hasUpdated||a||(r=void 0),this._$AL.set(t,r)),n===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[n,s]of this._$Ep)this[n]=s;this._$Ep=void 0}const a=this.constructor.elementProperties;if(a.size>0)for(const[n,s]of a){const{wrapped:u}=s,i=this[n];u!==!0||this._$AL.has(n)||i===void 0||this.C(n,void 0,s,i)}}let t=!1;const r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),this._$EO?.forEach(a=>a.hostUpdate?.()),this.update(r)):this._$EM()}catch(a){throw t=!1,this._$EM(),a}t&&this._$AE(r)}willUpdate(t){}_$AE(t){this._$EO?.forEach(r=>r.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(r=>this._$ET(r,this[r])),this._$EM()}updated(t){}firstUpdated(t){}};ve.elementStyles=[],ve.shadowRootOptions={mode:"open"},ve[Re("elementProperties")]=new Map,ve[Re("finalized")]=new Map,_s?.({ReactiveElement:ve}),(nt.reactiveElementVersions??=[]).push("2.1.2");const Mt=globalThis,Rr=e=>e,ut=Mt.trustedTypes,Nr=ut?ut.createPolicy("lit-html",{createHTML:e=>e}):void 0,zr="$lit$",ae=`lit$${Math.random().toFixed(9).slice(2)}$`,Or="?"+ae,Cs=`<${Or}>`,he=document,Ne=()=>he.createComment(""),ze=e=>e===null||typeof e!="object"&&typeof e!="function",It=Array.isArray,As=e=>It(e)||typeof e?.[Symbol.iterator]=="function",Rt=`[ 	
\f\r]`,Oe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Lr=/-->/g,Br=/>/g,fe=RegExp(`>|${Rt}(?:([^\\s"'>=/]+)(${Rt}*=${Rt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ur=/'/g,qr=/"/g,Hr=/^(?:script|style|textarea|title)$/i,jr=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),C=jr(1),Gr=jr(2),ne=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),Wr=new WeakMap,ge=he.createTreeWalker(he,129);function Vr(e,t){if(!It(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Nr!==void 0?Nr.createHTML(t):t}const ks=(e,t)=>{const r=e.length-1,a=[];let n,s=t===2?"<svg>":t===3?"<math>":"",u=Oe;for(let i=0;i<r;i++){const o=e[i];let l,c,d=-1,f=0;for(;f<o.length&&(u.lastIndex=f,c=u.exec(o),c!==null);)f=u.lastIndex,u===Oe?c[1]==="!--"?u=Lr:c[1]!==void 0?u=Br:c[2]!==void 0?(Hr.test(c[2])&&(n=RegExp("</"+c[2],"g")),u=fe):c[3]!==void 0&&(u=fe):u===fe?c[0]===">"?(u=n??Oe,d=-1):c[1]===void 0?d=-2:(d=u.lastIndex-c[2].length,l=c[1],u=c[3]===void 0?fe:c[3]==='"'?qr:Ur):u===qr||u===Ur?u=fe:u===Lr||u===Br?u=Oe:(u=fe,n=void 0);const h=u===fe&&e[i+1].startsWith("/>")?" ":"";s+=u===Oe?o+Cs:d>=0?(a.push(l),o.slice(0,d)+zr+o.slice(d)+ae+h):o+ae+(d===-2?i:h)}return[Vr(e,s+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),a]};class Le{constructor({strings:t,_$litType$:r},a){let n;this.parts=[];let s=0,u=0;const i=t.length-1,o=this.parts,[l,c]=ks(t,r);if(this.el=Le.createElement(l,a),ge.currentNode=this.el.content,r===2||r===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(n=ge.nextNode())!==null&&o.length<i;){if(n.nodeType===1){if(n.hasAttributes())for(const d of n.getAttributeNames())if(d.endsWith(zr)){const f=c[u++],h=n.getAttribute(d).split(ae),p=/([.?@])?(.*)/.exec(f);o.push({type:1,index:s,name:p[2],strings:h,ctor:p[1]==="."?Ss:p[1]==="?"?Ts:p[1]==="@"?Ds:it}),n.removeAttribute(d)}else d.startsWith(ae)&&(o.push({type:6,index:s}),n.removeAttribute(d));if(Hr.test(n.tagName)){const d=n.textContent.split(ae),f=d.length-1;if(f>0){n.textContent=ut?ut.emptyScript:"";for(let h=0;h<f;h++)n.append(d[h],Ne()),ge.nextNode(),o.push({type:2,index:++s});n.append(d[f],Ne())}}}else if(n.nodeType===8)if(n.data===Or)o.push({type:2,index:s});else{let d=-1;for(;(d=n.data.indexOf(ae,d+1))!==-1;)o.push({type:7,index:s}),d+=ae.length-1}s++}}static createElement(t,r){const a=he.createElement("template");return a.innerHTML=t,a}}function we(e,t,r=e,a){if(t===ne)return t;let n=a!==void 0?r._$Co?.[a]:r._$Cl;const s=ze(t)?void 0:t._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),s===void 0?n=void 0:(n=new s(e),n._$AT(e,r,a)),a!==void 0?(r._$Co??=[])[a]=n:r._$Cl=n),n!==void 0&&(t=we(e,n._$AS(e,t.values),n,a)),t}class Es{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:r},parts:a}=this._$AD,n=(t?.creationScope??he).importNode(r,!0);ge.currentNode=n;let s=ge.nextNode(),u=0,i=0,o=a[0];for(;o!==void 0;){if(u===o.index){let l;o.type===2?l=new Be(s,s.nextSibling,this,t):o.type===1?l=new o.ctor(s,o.name,o.strings,this,t):o.type===6&&(l=new Ps(s,this,t)),this._$AV.push(l),o=a[++i]}u!==o?.index&&(s=ge.nextNode(),u++)}return ge.currentNode=he,n}p(t){let r=0;for(const a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(t,a,r),r+=a.strings.length-2):a._$AI(t[r])),r++}}class Be{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,a,n){this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=a,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=we(this,t,r),ze(t)?t===_||t==null||t===""?(this._$AH!==_&&this._$AR(),this._$AH=_):t!==this._$AH&&t!==ne&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):As(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==_&&ze(this._$AH)?this._$AA.nextSibling.data=t:this.T(he.createTextNode(t)),this._$AH=t}$(t){const{values:r,_$litType$:a}=t,n=typeof a=="number"?this._$AC(t):(a.el===void 0&&(a.el=Le.createElement(Vr(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===n)this._$AH.p(r);else{const s=new Es(n,this),u=s.u(this.options);s.p(r),this.T(u),this._$AH=s}}_$AC(t){let r=Wr.get(t.strings);return r===void 0&&Wr.set(t.strings,r=new Le(t)),r}k(t){It(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let a,n=0;for(const s of t)n===r.length?r.push(a=new Be(this.O(Ne()),this.O(Ne()),this,this.options)):a=r[n],a._$AI(s),n++;n<r.length&&(this._$AR(a&&a._$AB.nextSibling,n),r.length=n)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){const a=Rr(t).nextSibling;Rr(t).remove(),t=a}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,a,n,s){this.type=1,this._$AH=_,this._$AN=void 0,this.element=t,this.name=r,this._$AM=n,this.options=s,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=_}_$AI(t,r=this,a,n){const s=this.strings;let u=!1;if(s===void 0)t=we(this,t,r,0),u=!ze(t)||t!==this._$AH&&t!==ne,u&&(this._$AH=t);else{const i=t;let o,l;for(t=s[0],o=0;o<s.length-1;o++)l=we(this,i[a+o],r,o),l===ne&&(l=this._$AH[o]),u||=!ze(l)||l!==this._$AH[o],l===_?t=_:t!==_&&(t+=(l??"")+s[o+1]),this._$AH[o]=l}u&&!n&&this.j(t)}j(t){t===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ss extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===_?void 0:t}}class Ts extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==_)}}class Ds extends it{constructor(t,r,a,n,s){super(t,r,a,n,s),this.type=5}_$AI(t,r=this){if((t=we(this,t,r,0)??_)===ne)return;const a=this._$AH,n=t===_&&a!==_||t.capture!==a.capture||t.once!==a.once||t.passive!==a.passive,s=t!==_&&(a===_||n);n&&this.element.removeEventListener(this.name,this,a),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}let Ps=class{constructor(t,r,a){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(t){we(this,t)}};const $s=Mt.litHtmlPolyfillSupport;$s?.(Le,Be),(Mt.litHtmlVersions??=[]).push("3.3.2");const Fs=(e,t,r)=>{const a=r?.renderBefore??t;let n=a._$litPart$;if(n===void 0){const s=r?.renderBefore??null;a._$litPart$=n=new Be(t.insertBefore(Ne(),s),s,void 0,r??{})}return n._$AI(e),n};const Nt=globalThis;let Ue=class extends ve{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Fs(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ne}};Ue._$litElement$=!0,Ue.finalized=!0,Nt.litElementHydrateSupport?.({LitElement:Ue});const Ms=Nt.litElementPolyfillSupport;Ms?.({LitElement:Ue}),(Nt.litElementVersions??=[]).push("4.2.2");const Is=e=>(t,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};const Rs={attribute:!0,type:String,converter:st,reflect:!1,hasChanged:Ft},Ns=(e=Rs,t,r)=>{const{kind:a,metadata:n}=r;let s=globalThis.litPropertyMetadata.get(n);if(s===void 0&&globalThis.litPropertyMetadata.set(n,s=new Map),a==="setter"&&((e=Object.create(e)).wrapped=!0),s.set(r.name,e),a==="accessor"){const{name:u}=r;return{set(i){const o=t.get.call(this);t.set.call(this,i),this.requestUpdate(u,o,e,!0,i)},init(i){return i!==void 0&&this.C(u,void 0,e,i),i}}}if(a==="setter"){const{name:u}=r;return function(i){const o=this[u];t.call(this,i),this.requestUpdate(u,o,e,!0,i)}}throw Error("Unsupported decorator location: "+a)};function Zr(e){return(t,r)=>typeof r=="object"?Ns(e,t,r):((a,n,s)=>{const u=n.hasOwnProperty(s);return n.constructor.createProperty(s,a),u?Object.getOwnPropertyDescriptor(n,s):void 0})(e,t,r)}function $(e){return Zr({...e,state:!0,attribute:!1})}const zs=(e,t,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,r),r);function ot(e,t){return(r,a,n)=>{const s=u=>u.renderRoot?.querySelector(e)??null;return zs(r,a,{get(){return s(this)}})}}const lt=["有什么站内资料想查？","选中文字后也可以直接问我。","我会优先基于知识库回答。","需要我帮你追溯文章来源吗？"],Os="正在检索知识库，稍等一下。",zt=76,Ls=48,Bs=160,Us=8,qs=9,Hs=208/192,_e=(e,t)=>Array.from({length:t},(r,a)=>({row:e,col:a})),js=_e(0,6),Gs=_e(3,4),Ws=_e(8,6),Vs=_e(5,8),Zs=_e(1,8),Ys=_e(2,8);function Qs(e){const t=e,r=Math.round(e*Hs);return{width:t,height:r,sheetWidth:t*Us,sheetHeight:r*qs}}function Yr(e){return e.errorActive?Vs:e.direction==="right"?Zs:e.direction==="left"?Ys:e.thinking?Ws:e.hovering?Gs:js}function Js(e,t){const r=Yr(e);return r[t%r.length]}const Ks=new Set(["navigate","scroll-to","highlight","dispatch-event","registered"]),Xs=/^[a-z][a-z0-9_]{2,63}$/;function Ot(e){const t=Z(e)?e:{},r=Z(t.builtIn)?t.builtIn:{},a=Z(t.toolSecurity)?t.toolSecurity:{},n=Z(t.haloSearch)?t.haloSearch:{},s=Z(t.haloResourceDetail)?t.haloResourceDetail:{},u=Z(t.ragSearch)?t.ragSearch:{},i=Jr(n.allowedTypes);return{enabled:be(t.enabled,!0)??!0,builtIn:{pageContext:be(r.pageContext,!0)??!0,haloNavigation:be(r.haloNavigation,!0)??!0,haloContentSearch:be(r.haloContentSearch,!0)??!0,ragContentSearch:be(r.ragContentSearch,!0)??!0,networkAccess:be(r.networkAccess,!1)??!1,commentCapability:nu(r.commentCapability)},aiTools:Qr(t.aiTools),toolSecurity:{allowedExternalOrigins:[...Jr(a.allowedExternalOrigins),...su(a.allowedExternalOrigins,"origin")],allowNewTab:be(a.allowNewTab,!1)??!1},haloSearch:{allowedTypes:i.length?i:["post.content.halo.run","singlepage.content.halo.run"],defaultLimit:He(n.defaultLimit)??5},haloResourceDetail:{maxContentChars:He(s.maxContentChars)??3e3},ragSearch:{defaultLimit:He(u.defaultLimit)??5,maxContentChars:He(u.maxContentChars)??3e3}}}function Qr(e){if(typeof e=="string"&&e.trim())try{return Qr(JSON.parse(e))}catch{return[]}return Array.isArray(e)?e.flatMap(t=>{const r=eu(t);return r?[r]:[]}):[]}function eu(e){if(!Z(e))return;const t=X(e.name),r=X(e.description),a=tu(e.action);if(!(!t||!Xs.test(t)||!r||!a))return{name:t,description:r,inputSchema:Z(e.inputSchema)?e.inputSchema:{type:"object",properties:{}},approval:ru(e.approval),requiredAuth:au(e.requiredAuth),actionType:a.type,action:a,testInput:e.testInput}}function tu(e){if(!Z(e))return;const t=X(e.type);if(!(!t||!Ks.has(t))){if(t==="navigate"){const r=X(e.url);return r?{...qe(e),type:t,url:r,target:e.target==="_blank"?"_blank":"_self"}:void 0}if(t==="scroll-to"||t==="highlight"){const r=X(e.selector);return r?t==="scroll-to"?{...qe(e),type:t,selector:r,behavior:e.behavior==="auto"?"auto":"smooth"}:{...qe(e),type:t,selector:r,duration:He(e.duration)}:void 0}if(t==="dispatch-event"){const r=X(e.event);return r?{...qe(e),type:t,event:r}:void 0}return{...qe(e),type:"registered"}}}function qe(e){return{pendingMessage:X(e.pendingMessage),successMessage:X(e.successMessage),errorMessage:X(e.errorMessage)}}function ru(e){return e==="never"||e==="always"?e:"default"}function au(e){return e==="authenticated"?"authenticated":"none"}function nu(e){return e==="off"||e==="submit"?e:"assist"}function Jr(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.trim().length>0):[]}function su(e,t){return Array.isArray(e)?e.flatMap(r=>Z(r)&&typeof r[t]=="string"&&r[t].trim()?[r[t]]:[]):[]}function be(e,t){return typeof e=="boolean"?e:t}function He(e){const t=Number(e);return Number.isFinite(t)?t:void 0}function X(e){return typeof e=="string"&&e.trim()?e.trim():void 0}function Z(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}const j={stylePreset:"default",primaryColor:"#a16207",secondaryColor:"#f4f4f5",surfaceColor:"#fafafa",textColor:"#18181b",borderRadius:"soft",colorMode:"light"},Lt="data-assistant-style",Bt="data-assistant-scheme",Kr="stellar",Ut={surfaceColor:"#171717",textColor:"#f7f2e8",secondaryColor:"#292524"},Xr={default:{primaryColor:"#a16207",secondaryColor:"#f4f4f5",surfaceColor:"#fafafa",textColor:"#18181b"},graphite:{primaryColor:"#d6b46c",secondaryColor:"#2a2a28",surfaceColor:"#171717",textColor:"#f7f2e8"},ocean:{primaryColor:"#1f7a8c",secondaryColor:"#d9f0f3",surfaceColor:"#fbfeff",textColor:"#142326"},azure:{primaryColor:"#3b82f6",secondaryColor:"#dbeafe",surfaceColor:"#f8fafc",textColor:"#0f172a"},forest:{primaryColor:"#2f7d50",secondaryColor:"#dceedd",surfaceColor:"#fbfdf8",textColor:"#18251b"},rose:{primaryColor:"#b85c7a",secondaryColor:"#f8dfe8",surfaceColor:"#fffafc",textColor:"#2b1720"},stellar:{primaryColor:"#22d3ee",secondaryColor:"#101827",surfaceColor:"#0b1018",textColor:"#e6e9f2"}},ea={standard:{panel:"10px",card:"8px",control:"10px"},soft:{panel:"18px",card:"13px",control:"999px"},round:{panel:"26px",card:"18px",control:"999px"}},ta="--rag-stellar-";function F(e){return`var(${e}, var(${ta}${e.slice(2)}))`}function Ce(e,t){return`color-mix(in srgb, ${F(e)} ${t}%, transparent)`}function qt(e,t,r){return`color-mix(in srgb, ${F(e)} ${r}%, ${F(t)})`}function ct(e){return`var(${ta}${e})`}const ra=[["--rag-text",F("--text")],["--rag-ink",F("--text")],["--rag-muted",F("--text-dim")],["--rag-line",F("--panel-border")],["--rag-soft-line",F("--hairline")],["--rag-divider",F("--hairline")],["--rag-paper",F("--panel")],["--rag-panel",F("--panel")],["--rag-secondary",F("--panel-soft")],["--rag-secondary-soft","color-mix(in srgb, var(--rag-secondary) 62%, transparent)"],["--rag-control-surface",F("--panel-soft")],["--rag-assistant-message-bg",F("--panel-soft")],["--rag-messages-surface",F("--chip-bg")],["--rag-window-surface",F("--panel")],["--rag-window-surface-2",F("--chip-bg")],["--rag-input-surface-resolved",F("--chip-bg")],["--rag-window-border",F("--panel-border")],["--rag-assistant-message-border",F("--panel-border")],["--rag-header-surface",Ce("--panel",92)],["--rag-footer-surface",Ce("--panel",94)],["--rag-frost",Ce("--panel",78)],["--rag-gold",F("--cyan")],["--rag-gold-strong",qt("--cyan","--violet",72)],["--rag-gold-soft",Ce("--cyan",24)],["--rag-gold-faint",Ce("--cyan",8)],["--rag-ring",Ce("--cyan",46)],["--rag-primary-contrast",ct("contrast")],["--rag-user-message-start",qt("--cyan","--violet",88)],["--rag-user-message-end",qt("--violet","--cyan",88)],["--rag-shadow",ct("shadow-panel")],["--rag-card-shadow",ct("shadow-card")],["--rag-control-shadow",ct("shadow-control")]],uu=["--rag-radius-panel","--rag-radius-card","--rag-radius-control"],iu=[...ra.map(([e])=>e),...uu];function aa(e){const t=gu(e?.stylePreset),r=t==="custom"?Xr.default:Xr[t],a=t==="custom";return{stylePreset:t,primaryColor:dt(a?e?.primaryColor:r.primaryColor,j.primaryColor),secondaryColor:dt(a?e?.secondaryColor:r.secondaryColor,j.secondaryColor),surfaceColor:dt(a?e?.surfaceColor:r.surfaceColor,j.surfaceColor),textColor:dt(a?e?.textColor:r.textColor,j.textColor),borderRadius:bu(e?.borderRadius),colorMode:mu(e?.colorMode)}}function ou(e,t){const r=aa(t);if(r.stylePreset===Kr){lu(e,r);return}cu(e);const a=hu(r),n=je(a.primaryColor),s=je(a.surfaceColor),u=je(a.textColor),i=je(a.secondaryColor),o=ea[a.borderRadius],l=fu(a),c={r:0,g:0,b:0},d={r:255,g:255,b:255};A(e,"--rag-text",a.textColor),A(e,"--rag-muted",ee(O(u,s,.42))),A(e,"--rag-line",R(u,.095)),A(e,"--rag-soft-line",R(u,.06)),A(e,"--rag-paper",R(s,.97)),A(e,"--rag-panel",a.surfaceColor),A(e,"--rag-ink",a.textColor),A(e,"--rag-secondary",a.secondaryColor),A(e,"--rag-gold",a.primaryColor),A(e,"--rag-gold-strong",ee(O(n,{r:0,g:0,b:0},.18))),A(e,"--rag-gold-soft",R(n,.16)),A(e,"--rag-gold-faint",R(n,.05)),A(e,"--rag-primary-contrast",yu(n)),A(e,"--rag-secondary-soft",R(i,.48)),A(e,"--rag-radius-panel",o.panel),A(e,"--rag-radius-card",o.card),A(e,"--rag-radius-control",o.control),A(e,"--rag-shadow",vu(u,l)),A(e,"--rag-window-surface",ee(O(s,l?d:n,l?.055:.018))),A(e,"--rag-window-surface-2",ee(O(s,l?c:d,l?.1:.42))),A(e,"--rag-header-surface",R(O(s,l?d:n,l?.075:.035),l?.96:.985)),A(e,"--rag-messages-surface",ee(O(s,l?c:d,l?.045:.36))),A(e,"--rag-footer-surface",R(O(s,l?c:d,l?.035:.28),.98)),A(e,"--rag-control-surface",R(O(s,d,l?.07:.68),l?.78:.9)),A(e,"--rag-input-surface-resolved",ee(O(s,d,l?.065:.62))),A(e,"--rag-assistant-message-bg",ee(O(s,d,l?.075:.82))),A(e,"--rag-assistant-message-border",R(O(l?u:n,s,l?.78:.72),l?.2:.18)),A(e,"--rag-window-border",R(O(u,s,l?.74:.86),l?.18:.13)),A(e,"--rag-divider",R(u,l?.075:.08)),A(e,"--rag-card-shadow",l?"0 8px 18px rgba(0, 0, 0, 0.18)":`0 10px 24px ${R(u,.055)}`),A(e,"--rag-control-shadow",l?"0 8px 18px rgba(0, 0, 0, 0.16)":`0 8px 18px ${R(u,.05)}`),A(e,"--rag-user-message-start",ee(O(n,d,l?.08:.16))),A(e,"--rag-user-message-end",ee(O(n,c,.18)))}function lu(e,t){const r=du(t.colorMode),a=ea[t.borderRadius];e.setAttribute(Lt,Kr),e.setAttribute(Bt,r);for(const[n,s]of ra)A(e,n,s);A(e,"--rag-radius-panel",a.panel),A(e,"--rag-radius-card",a.card),A(e,"--rag-radius-control",a.control)}function cu(e){e.getAttribute(Lt)!==null&&e.removeAttribute(Lt),e.getAttribute(Bt)!==null&&e.removeAttribute(Bt);for(const t of iu)e.style?.removeProperty(t)}function du(e){return pu()??(na(e)?"dark":"light")}function pu(){if(typeof document>"u")return null;const e=document.documentElement?.getAttribute("data-scheme");return e==="dark"||e==="light"?e:null}function hu(e){return na(e.colorMode)?{...e,surfaceColor:Ht(e.surfaceColor,j.surfaceColor,Ut.surfaceColor),textColor:Ht(e.textColor,j.textColor,Ut.textColor),secondaryColor:Ht(e.secondaryColor,j.secondaryColor,Ut.secondaryColor)}:e}function na(e){return e==="dark"?!0:e==="light"||typeof window>"u"?!1:window.matchMedia?.("(prefers-color-scheme: dark)").matches??!1}function fu(e){return ua(je(e.surfaceColor))<.28}function dt(e,t){const r=e?.trim();return r&&xu(r)?sa(r).toLowerCase():t}function gu(e){return e==="graphite"||e==="ocean"||e==="azure"||e==="forest"||e==="rose"||e==="stellar"||e==="custom"?e:j.stylePreset}function bu(e){return e==="standard"||e==="round"?e:j.borderRadius}function mu(e){return e==="auto"||e==="light"||e==="dark"?e:j.colorMode}function Ht(e,t,r){return e.toLowerCase()===t.toLowerCase()?r:e}function xu(e){return/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(e)}function sa(e){return e.length===4?`#${e[1]}${e[1]}${e[2]}${e[2]}${e[3]}${e[3]}`:e}function je(e){const t=sa(e).slice(1);return{r:Number.parseInt(t.slice(0,2),16),g:Number.parseInt(t.slice(2,4),16),b:Number.parseInt(t.slice(4,6),16)}}function O(e,t,r){const a=1-r;return{r:Math.round(e.r*a+t.r*r),g:Math.round(e.g*a+t.g*r),b:Math.round(e.b*a+t.b*r)}}function R(e,t){return`rgba(${e.r}, ${e.g}, ${e.b}, ${t})`}function ee(e){return`#${jt(e.r)}${jt(e.g)}${jt(e.b)}`}function jt(e){return Math.min(Math.max(e,0),255).toString(16).padStart(2,"0")}function yu(e){return ua(e)>.55?"#171717":"#ffffff"}function ua(e){const t=[e.r,e.g,e.b].map(r=>{const a=r/255;return a<=.03928?a/12.92:((a+.055)/1.055)**2.4});return .2126*t[0]+.7152*t[1]+.0722*t[2]}function vu(e,t){return t?`0 20px 56px ${R(e,.1)}, 0 6px 18px rgba(0, 0, 0, 0.34)`:`0 20px 56px ${R(e,.12)}, 0 6px 18px ${R(e,.07)}`}function A(e,t,r){e.style.setProperty(t,r)}const wu="星枢领航员",ia="智阅助手",_u="/plugins/summaraidGPT/assets/static/icon.svg",Cu=`星港通讯已接通，我是 {assistantName}。
可为你检索站内信号、梳理本舱记录，或指引下一段航线。`,oa=`你好，我是 {assistantName}。
我可以帮你检索站内知识库、总结当前页，也可以带你打开相关页面。`,Au=["这座星港由谁维护？","最近接收了哪些新信号？","梳理当前舱段的记录","为我推荐值得探索的航线"],ku=["星港通讯在线，需要我指引航线吗？","选中一段记录，我来协助解码。","正在守望本站星图，随时可以发来问题。","想追溯信号来源？我陪你一起找。"],Eu=["航标已点亮，我在这里守望星港。","稍作停泊，再启程也不迟。","今日的星图，又多了一段记录。","路过星港，记得向我打个招呼。"];function la(e){const t=e?.trim();return!t||t===ia?wu:t}function ca(e,t){const r=e?.trim();return(!r||r===oa||[ia,t].some(s=>r===oa.replace("{assistantName}",s))?Cu:r).replaceAll("{assistantName}",t)}function da(e,t,r){return!e?.length||e.length===t.length&&e.every((n,s)=>n.trim()===t[s])?[...r]:[...e]}function Su(e){if(!e?.trim())return!0;const t=e.trim().split(/[?#]/)[0];return t===_u||t==="icon.svg"}const pt="/apis/api.summary.summaraidgpt.lik.cc/v1alpha1",Gt=24,Tu=800,Du=260,Pu=80,Wt="智阅助手",pa="/plugins/summaraidGPT/assets/static/icon.svg",ha=`你好，我是 {assistantName}。
我可以帮你检索站内知识库、总结当前页，也可以带你打开相关页面。`,Vt=["关于博主是谁？","最近更新了什么？","帮我总结当前页","有哪些值得先读的内容？"],fa={enabled:!0,displayName:"鸡哥ikun",petJsonUrl:"/plugins/summaraidGPT/assets/static/pets/default-ikun/pet.json",spritesheetUrl:"/plugins/summaraidGPT/assets/static/pets/default-ikun/spritesheet.webp"},Ae={assistantAvatar:pa,assistantName:Wt,displayMode:"ragAgent",ragEnabled:!0,welcomeMessage:ha.replace("{assistantName}",Wt),quickQuestions:Vt,styleConfig:j,buttonPosition:"right",horizontalOffset:Gt,verticalOffset:Gt,petSize:zt,petSpeechMessages:lt,pet:fa,access:{mode:"anonymous_chat_agent",allowAnonymous:!0,agentAllowed:!0,authenticated:!1},agent:Ot(void 0)};async function $u(){try{const e=await fetch(`${pt}/dialogConfig`,{headers:{Accept:"application/json"}});if(!e.ok)throw new Error(`HTTP ${e.status}`);const t=await e.json();return Iu(t)}catch{return{...Ae}}}async function Fu(e,t,r){const a=await fetch(`${pt}/ragAskStream`,{method:"POST",credentials:"same-origin",signal:r,headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify(e)});if(!a.ok||!a.body)throw new Error(`HTTP ${a.status}`);const n=a.body.getReader(),s=new TextDecoder;let u="";const i=o=>{const l=Hu(o);if(!l)return;const c=JSON.parse(l);c.type==="conversation"?c.conversationId&&t.onConversationId?.(c.conversationId):c.type==="sources"?t.onSources?.(c.sources||[]):c.type==="delta"?t.onDelta?.(c.delta||""):c.type==="done"?t.onDone?.():c.type==="error"&&t.onError?.(c.error||"RAG 问答失败")};for(;;){const{done:o,value:l}=await n.read();if(o){u+=s.decode();break}u+=s.decode(l,{stream:!0});const c=u.split(/\r?\n\r?\n/);u=c.pop()||"",c.forEach(i)}u.trim()&&i(u)}async function Mu(e,t){if(!e.trim()||!t.trim())return;const r=new URLSearchParams({visitorId:t}),a=await fetch(`${pt}/ragConversations/${encodeURIComponent(e)}?${r}`,{credentials:"same-origin",headers:{Accept:"application/json"}});if(!(a.status===404||a.status===403)){if(!a.ok)throw new Error(`HTTP ${a.status}`);return await a.json()}}function Iu(e){const t=String(e.buttonPosition).trim()==="left"?"left":"right",r=aa(e.styleConfig),a=r.stylePreset==="stellar",n=a?la(e.assistantName):ma(e.assistantName),s=qu(e.displayMode),u=["今天也要元气满满。","我就在这里陪你逛逛。","休息一下，看看风景吧。","路过的时候记得摸摸我。"],i=ga(e.quickQuestions,8,Pu),o=ga(e.petSpeechMessages,12);return{...Ae,...e,buttonPosition:t,assistantAvatar:Bu(e.assistantAvatar),assistantName:n,displayMode:s,ragEnabled:e.ragEnabled!==!1,welcomeMessage:a?ca(e.welcomeMessage,n):Ou(e.welcomeMessage,e.assistantName),quickQuestions:a?da(i,Vt,Au):i||Vt,styleConfig:r,horizontalOffset:ba(e.horizontalOffset),verticalOffset:ba(e.verticalOffset),petSize:Uu(e.petSize),petSpeechMessages:a?da(o,s==="petOnly"?u:lt,s==="petOnly"?Eu:ku):o||lt,pet:zu(e.pet)||fa,access:Ru(e.access),agent:Ot(e.agent)}}function Ru(e){const t=Nu(e?.mode);return{mode:t,allowAnonymous:t==="anonymous_chat"||t==="anonymous_chat_agent",agentAllowed:t==="anonymous_chat_agent"||t==="authenticated_chat_agent",authenticated:e?.authenticated===!0}}function Nu(e){return e==="anonymous_chat"||e==="anonymous_chat_agent"||e==="authenticated_chat"||e==="authenticated_chat_agent"?e:"anonymous_chat_agent"}function zu(e){if(!e||e.enabled===!1)return;const t=e.spritesheetUrl?.trim();if(t)return{enabled:!0,displayName:e.displayName?.trim()||void 0,petJsonUrl:e.petJsonUrl?.trim()||void 0,spritesheetUrl:t}}function ga(e,t=12,r=120){if(!Array.isArray(e))return;const a=e.map(n=>`${n||""}`.trim()).filter(Boolean).map(n=>n.slice(0,r)).slice(0,t);return a.length?a:void 0}function Ou(e,t){return(Lu(e,Du)||ha).replace("{assistantName}",ma(t))}function Lu(e,t){const r=e?.trim();if(r)return r.length>t?r.slice(0,t):r}function Bu(e){const t=e?.trim();return!t||t.toLowerCase().startsWith("javascript:")?pa:t}function ba(e){const t=Number(e);return Number.isFinite(t)?Math.round(Math.min(Math.max(t,0),Tu)):Gt}function Uu(e){const t=Number(e);return Number.isFinite(t)?Math.round(Math.min(Math.max(t,Ls),Bs)):zt}function ma(e){return e?.trim()||Wt}function qu(e){return e==="assistant"||e==="ragAgent"?"ragAgent":e==="rag"||e==="agent"||e==="petOnly"?e:"ragAgent"}function Hu(e){const t=e.split(/\r?\n/).filter(r=>r.startsWith("data:")).map(r=>r.replace(/^data:\s?/,""));return t.length?t.join(`
`):void 0}const xa="请输入您想从知识库了解的问题...",ju=8,ya={};function Gu(e){let t=ya[e];if(t)return t;t=ya[e]=[];for(let r=0;r<128;r++){const a=String.fromCharCode(r);t.push(a)}for(let r=0;r<e.length;r++){const a=e.charCodeAt(r);t[a]="%"+("0"+a.toString(16).toUpperCase()).slice(-2)}return t}function ke(e,t){typeof t!="string"&&(t=ke.defaultChars);const r=Gu(t);return e.replace(/(%[a-f0-9]{2})+/gi,function(a){let n="";for(let s=0,u=a.length;s<u;s+=3){const i=parseInt(a.slice(s+1,s+3),16);if(i<128){n+=r[i];continue}if((i&224)===192&&s+3<u){const o=parseInt(a.slice(s+4,s+6),16);if((o&192)===128){const l=i<<6&1984|o&63;l<128?n+="��":n+=String.fromCharCode(l),s+=3;continue}}if((i&240)===224&&s+6<u){const o=parseInt(a.slice(s+4,s+6),16),l=parseInt(a.slice(s+7,s+9),16);if((o&192)===128&&(l&192)===128){const c=i<<12&61440|o<<6&4032|l&63;c<2048||c>=55296&&c<=57343?n+="���":n+=String.fromCharCode(c),s+=6;continue}}if((i&248)===240&&s+9<u){const o=parseInt(a.slice(s+4,s+6),16),l=parseInt(a.slice(s+7,s+9),16),c=parseInt(a.slice(s+10,s+12),16);if((o&192)===128&&(l&192)===128&&(c&192)===128){let d=i<<18&1835008|o<<12&258048|l<<6&4032|c&63;d<65536||d>1114111?n+="����":(d-=65536,n+=String.fromCharCode(55296+(d>>10),56320+(d&1023))),s+=9;continue}}n+="�"}return n})}ke.defaultChars=";/?:@&=+$,#",ke.componentChars="";const va={};function Wu(e){let t=va[e];if(t)return t;t=va[e]=[];for(let r=0;r<128;r++){const a=String.fromCharCode(r);/^[0-9a-z]$/i.test(a)?t.push(a):t.push("%"+("0"+r.toString(16).toUpperCase()).slice(-2))}for(let r=0;r<e.length;r++)t[e.charCodeAt(r)]=e[r];return t}function Ge(e,t,r){typeof t!="string"&&(r=t,t=Ge.defaultChars),typeof r>"u"&&(r=!0);const a=Wu(t);let n="";for(let s=0,u=e.length;s<u;s++){const i=e.charCodeAt(s);if(r&&i===37&&s+2<u&&/^[0-9a-f]{2}$/i.test(e.slice(s+1,s+3))){n+=e.slice(s,s+3),s+=2;continue}if(i<128){n+=a[i];continue}if(i>=55296&&i<=57343){if(i>=55296&&i<=56319&&s+1<u){const o=e.charCodeAt(s+1);if(o>=56320&&o<=57343){n+=encodeURIComponent(e[s]+e[s+1]),s++;continue}}n+="%EF%BF%BD";continue}n+=encodeURIComponent(e[s])}return n}Ge.defaultChars=";/?:@&=+$,-_.!~*'()#",Ge.componentChars="-_.!~*'()";function Zt(e){let t="";return t+=e.protocol||"",t+=e.slashes?"//":"",t+=e.auth?e.auth+"@":"",e.hostname&&e.hostname.indexOf(":")!==-1?t+="["+e.hostname+"]":t+=e.hostname||"",t+=e.port?":"+e.port:"",t+=e.pathname||"",t+=e.search||"",t+=e.hash||"",t}function ht(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const Vu=/^([a-z0-9.+-]+:)/i,Zu=/:[0-9]*$/,Yu=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,Qu=["<",">",'"',"`"," ","\r",`
`,"	"],Ju=["{","}","|","\\","^","`"].concat(Qu),Ku=["'"].concat(Ju),wa=["%","/","?",";","#"].concat(Ku),_a=["/","?","#"],Xu=255,Ca=/^[+a-z0-9A-Z_-]{0,63}$/,ei=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,Aa={javascript:!0,"javascript:":!0},ka={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function Yt(e,t){if(e&&e instanceof ht)return e;const r=new ht;return r.parse(e,t),r}ht.prototype.parse=function(e,t){let r,a,n,s=e;if(s=s.trim(),!t&&e.split("#").length===1){const l=Yu.exec(s);if(l)return this.pathname=l[1],l[2]&&(this.search=l[2]),this}let u=Vu.exec(s);if(u&&(u=u[0],r=u.toLowerCase(),this.protocol=u,s=s.substr(u.length)),(t||u||s.match(/^\/\/[^@\/]+@[^@\/]+/))&&(n=s.substr(0,2)==="//",n&&!(u&&Aa[u])&&(s=s.substr(2),this.slashes=!0)),!Aa[u]&&(n||u&&!ka[u])){let l=-1;for(let p=0;p<_a.length;p++)a=s.indexOf(_a[p]),a!==-1&&(l===-1||a<l)&&(l=a);let c,d;l===-1?d=s.lastIndexOf("@"):d=s.lastIndexOf("@",l),d!==-1&&(c=s.slice(0,d),s=s.slice(d+1),this.auth=c),l=-1;for(let p=0;p<wa.length;p++)a=s.indexOf(wa[p]),a!==-1&&(l===-1||a<l)&&(l=a);l===-1&&(l=s.length),s[l-1]===":"&&l--;const f=s.slice(0,l);s=s.slice(l),this.parseHost(f),this.hostname=this.hostname||"";const h=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!h){const p=this.hostname.split(/\./);for(let w=0,v=p.length;w<v;w++){const E=p[w];if(E&&!E.match(Ca)){let m="";for(let x=0,g=E.length;x<g;x++)E.charCodeAt(x)>127?m+="x":m+=E[x];if(!m.match(Ca)){const x=p.slice(0,w),g=p.slice(w+1),b=E.match(ei);b&&(x.push(b[1]),g.unshift(b[2])),g.length&&(s=g.join(".")+s),this.hostname=x.join(".");break}}}}this.hostname.length>Xu&&(this.hostname=""),h&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const i=s.indexOf("#");i!==-1&&(this.hash=s.substr(i),s=s.slice(0,i));const o=s.indexOf("?");return o!==-1&&(this.search=s.substr(o),s=s.slice(0,o)),s&&(this.pathname=s),ka[r]&&this.hostname&&!this.pathname&&(this.pathname=""),this},ht.prototype.parseHost=function(e){let t=Zu.exec(e);t&&(t=t[0],t!==":"&&(this.port=t.substr(1)),e=e.substr(0,e.length-t.length)),e&&(this.hostname=e)};const ti=Object.freeze(Object.defineProperty({__proto__:null,decode:ke,encode:Ge,format:Zt,parse:Yt},Symbol.toStringTag,{value:"Module"})),Ea=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Sa=/[\0-\x1F\x7F-\x9F]/,ri=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,Qt=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,Ta=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,Da=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,ai=Object.freeze(Object.defineProperty({__proto__:null,Any:Ea,Cc:Sa,Cf:ri,P:Qt,S:Ta,Z:Da},Symbol.toStringTag,{value:"Module"})),ni=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(e=>e.charCodeAt(0))),si=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(e=>e.charCodeAt(0)));var Jt;const ui=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),ii=(Jt=String.fromCodePoint)!==null&&Jt!==void 0?Jt:function(e){let t="";return e>65535&&(e-=65536,t+=String.fromCharCode(e>>>10&1023|55296),e=56320|e&1023),t+=String.fromCharCode(e),t};function oi(e){var t;return e>=55296&&e<=57343||e>1114111?65533:(t=ui.get(e))!==null&&t!==void 0?t:e}var M;(function(e){e[e.NUM=35]="NUM",e[e.SEMI=59]="SEMI",e[e.EQUALS=61]="EQUALS",e[e.ZERO=48]="ZERO",e[e.NINE=57]="NINE",e[e.LOWER_A=97]="LOWER_A",e[e.LOWER_F=102]="LOWER_F",e[e.LOWER_X=120]="LOWER_X",e[e.LOWER_Z=122]="LOWER_Z",e[e.UPPER_A=65]="UPPER_A",e[e.UPPER_F=70]="UPPER_F",e[e.UPPER_Z=90]="UPPER_Z"})(M||(M={}));const li=32;var se;(function(e){e[e.VALUE_LENGTH=49152]="VALUE_LENGTH",e[e.BRANCH_LENGTH=16256]="BRANCH_LENGTH",e[e.JUMP_TABLE=127]="JUMP_TABLE"})(se||(se={}));function Kt(e){return e>=M.ZERO&&e<=M.NINE}function ci(e){return e>=M.UPPER_A&&e<=M.UPPER_F||e>=M.LOWER_A&&e<=M.LOWER_F}function di(e){return e>=M.UPPER_A&&e<=M.UPPER_Z||e>=M.LOWER_A&&e<=M.LOWER_Z||Kt(e)}function pi(e){return e===M.EQUALS||di(e)}var I;(function(e){e[e.EntityStart=0]="EntityStart",e[e.NumericStart=1]="NumericStart",e[e.NumericDecimal=2]="NumericDecimal",e[e.NumericHex=3]="NumericHex",e[e.NamedEntity=4]="NamedEntity"})(I||(I={}));var te;(function(e){e[e.Legacy=0]="Legacy",e[e.Strict=1]="Strict",e[e.Attribute=2]="Attribute"})(te||(te={}));class hi{constructor(t,r,a){this.decodeTree=t,this.emitCodePoint=r,this.errors=a,this.state=I.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=te.Strict}startEntity(t){this.decodeMode=t,this.state=I.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(t,r){switch(this.state){case I.EntityStart:return t.charCodeAt(r)===M.NUM?(this.state=I.NumericStart,this.consumed+=1,this.stateNumericStart(t,r+1)):(this.state=I.NamedEntity,this.stateNamedEntity(t,r));case I.NumericStart:return this.stateNumericStart(t,r);case I.NumericDecimal:return this.stateNumericDecimal(t,r);case I.NumericHex:return this.stateNumericHex(t,r);case I.NamedEntity:return this.stateNamedEntity(t,r)}}stateNumericStart(t,r){return r>=t.length?-1:(t.charCodeAt(r)|li)===M.LOWER_X?(this.state=I.NumericHex,this.consumed+=1,this.stateNumericHex(t,r+1)):(this.state=I.NumericDecimal,this.stateNumericDecimal(t,r))}addToNumericResult(t,r,a,n){if(r!==a){const s=a-r;this.result=this.result*Math.pow(n,s)+parseInt(t.substr(r,s),n),this.consumed+=s}}stateNumericHex(t,r){const a=r;for(;r<t.length;){const n=t.charCodeAt(r);if(Kt(n)||ci(n))r+=1;else return this.addToNumericResult(t,a,r,16),this.emitNumericEntity(n,3)}return this.addToNumericResult(t,a,r,16),-1}stateNumericDecimal(t,r){const a=r;for(;r<t.length;){const n=t.charCodeAt(r);if(Kt(n))r+=1;else return this.addToNumericResult(t,a,r,10),this.emitNumericEntity(n,2)}return this.addToNumericResult(t,a,r,10),-1}emitNumericEntity(t,r){var a;if(this.consumed<=r)return(a=this.errors)===null||a===void 0||a.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(t===M.SEMI)this.consumed+=1;else if(this.decodeMode===te.Strict)return 0;return this.emitCodePoint(oi(this.result),this.consumed),this.errors&&(t!==M.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(t,r){const{decodeTree:a}=this;let n=a[this.treeIndex],s=(n&se.VALUE_LENGTH)>>14;for(;r<t.length;r++,this.excess++){const u=t.charCodeAt(r);if(this.treeIndex=fi(a,n,this.treeIndex+Math.max(1,s),u),this.treeIndex<0)return this.result===0||this.decodeMode===te.Attribute&&(s===0||pi(u))?0:this.emitNotTerminatedNamedEntity();if(n=a[this.treeIndex],s=(n&se.VALUE_LENGTH)>>14,s!==0){if(u===M.SEMI)return this.emitNamedEntityData(this.treeIndex,s,this.consumed+this.excess);this.decodeMode!==te.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var t;const{result:r,decodeTree:a}=this,n=(a[r]&se.VALUE_LENGTH)>>14;return this.emitNamedEntityData(r,n,this.consumed),(t=this.errors)===null||t===void 0||t.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(t,r,a){const{decodeTree:n}=this;return this.emitCodePoint(r===1?n[t]&~se.VALUE_LENGTH:n[t+1],a),r===3&&this.emitCodePoint(n[t+2],a),a}end(){var t;switch(this.state){case I.NamedEntity:return this.result!==0&&(this.decodeMode!==te.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case I.NumericDecimal:return this.emitNumericEntity(0,2);case I.NumericHex:return this.emitNumericEntity(0,3);case I.NumericStart:return(t=this.errors)===null||t===void 0||t.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case I.EntityStart:return 0}}}function Pa(e){let t="";const r=new hi(e,a=>t+=ii(a));return function(n,s){let u=0,i=0;for(;(i=n.indexOf("&",i))>=0;){t+=n.slice(u,i),r.startEntity(s);const l=r.write(n,i+1);if(l<0){u=i+r.end();break}u=i+l,i=l===0?u+1:u}const o=t+n.slice(u);return t="",o}}function fi(e,t,r,a){const n=(t&se.BRANCH_LENGTH)>>7,s=t&se.JUMP_TABLE;if(n===0)return s!==0&&a===s?r:-1;if(s){const o=a-s;return o<0||o>=n?-1:e[r+o]-1}let u=r,i=u+n-1;for(;u<=i;){const o=u+i>>>1,l=e[o];if(l<a)u=o+1;else if(l>a)i=o-1;else return e[o+n]}return-1}const $a=Pa(ni);Pa(si);function gi(e,t=te.Legacy){return $a(e,t)}function bi(e){return $a(e,te.Strict)}function mi(e){return Object.prototype.toString.call(e)}function Xt(e){return mi(e)==="[object String]"}const xi=Object.prototype.hasOwnProperty;function yi(e,t){return xi.call(e,t)}function ft(e){return Array.prototype.slice.call(arguments,1).forEach(function(r){if(r){if(typeof r!="object")throw new TypeError(r+"must be object");Object.keys(r).forEach(function(a){e[a]=r[a]})}}),e}function Fa(e,t,r){return[].concat(e.slice(0,t),r,e.slice(t+1))}function er(e){return!(e>=55296&&e<=57343||e>=64976&&e<=65007||(e&65535)===65535||(e&65535)===65534||e>=0&&e<=8||e===11||e>=14&&e<=31||e>=127&&e<=159||e>1114111)}function We(e){if(e>65535){e-=65536;const t=55296+(e>>10),r=56320+(e&1023);return String.fromCharCode(t,r)}return String.fromCharCode(e)}const Ma=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,vi=/&([a-z#][a-z0-9]{1,31});/gi,wi=new RegExp(Ma.source+"|"+vi.source,"gi"),_i=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function Ci(e,t){if(t.charCodeAt(0)===35&&_i.test(t)){const a=t[1].toLowerCase()==="x"?parseInt(t.slice(2),16):parseInt(t.slice(1),10);return er(a)?We(a):e}const r=gi(e);return r!==e?r:e}function Ai(e){return e.indexOf("\\")<0?e:e.replace(Ma,"$1")}function Ee(e){return e.indexOf("\\")<0&&e.indexOf("&")<0?e:e.replace(wi,function(t,r,a){return r||Ci(t,a)})}const ki=/[&<>"]/,Ei=/[&<>"]/g,Si={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function Ti(e){return Si[e]}function ue(e){return ki.test(e)?e.replace(Ei,Ti):e}const Di=/[.?*+^$[\]\\(){}|-]/g;function Pi(e){return e.replace(Di,"\\$&")}function P(e){switch(e){case 9:case 32:return!0}return!1}function Ve(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function Ia(e){return Qt.test(e)||Ta.test(e)}function Ze(e){return Ia(We(e))}function Ye(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function gt(e){return e=e.trim().replace(/\s+/g," "),"ẞ".toLowerCase()==="Ṿ"&&(e=e.replace(/ẞ/g,"ß")),e.toLowerCase().toUpperCase()}function Ra(e){return e===32||e===9||e===10||e===13}function bt(e){let t=0;for(;t<e.length&&Ra(e.charCodeAt(t));t++);let r=e.length-1;for(;r>=t&&Ra(e.charCodeAt(r));r--);return e.slice(t,r+1)}const $i=Object.freeze(Object.defineProperty({__proto__:null,arrayReplaceAt:Fa,asciiTrim:bt,assign:ft,escapeHtml:ue,escapeRE:Pi,fromCodePoint:We,has:yi,isMdAsciiPunct:Ye,isPunctChar:Ia,isPunctCharCode:Ze,isSpace:P,isString:Xt,isValidEntityCode:er,isWhiteSpace:Ve,lib:{mdurl:ti,ucmicro:ai},normalizeReference:gt,unescapeAll:Ee,unescapeMd:Ai},Symbol.toStringTag,{value:"Module"}));function Fi(e,t,r){let a,n,s,u;const i=e.posMax,o=e.pos;for(e.pos=t+1,a=1;e.pos<i;){if(s=e.src.charCodeAt(e.pos),s===93&&(a--,a===0)){n=!0;break}if(u=e.pos,e.md.inline.skipToken(e),s===91){if(u===e.pos-1)a++;else if(r)return e.pos=o,-1}}let l=-1;return n&&(l=e.pos),e.pos=o,l}function Mi(e,t,r){let a,n=t;const s={ok:!1,pos:0,str:""};if(e.charCodeAt(n)===60){for(n++;n<r;){if(a=e.charCodeAt(n),a===10||a===60)return s;if(a===62)return s.pos=n+1,s.str=Ee(e.slice(t+1,n)),s.ok=!0,s;if(a===92&&n+1<r){n+=2;continue}n++}return s}let u=0;for(;n<r&&(a=e.charCodeAt(n),!(a===32||a<32||a===127));){if(a===92&&n+1<r){if(e.charCodeAt(n+1)===32)break;n+=2;continue}if(a===40&&(u++,u>32))return s;if(a===41){if(u===0)break;u--}n++}return t===n||u!==0||(s.str=Ee(e.slice(t,n)),s.pos=n,s.ok=!0),s}function Ii(e,t,r,a){let n,s=t;const u={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(a)u.str=a.str,u.marker=a.marker;else{if(s>=r)return u;let i=e.charCodeAt(s);if(i!==34&&i!==39&&i!==40)return u;t++,s++,i===40&&(i=41),u.marker=i}for(;s<r;){if(n=e.charCodeAt(s),n===u.marker)return u.pos=s+1,u.str+=Ee(e.slice(t,s)),u.ok=!0,u;if(n===40&&u.marker===41)return u;n===92&&s+1<r&&s++,s++}return u.can_continue=!0,u.str+=Ee(e.slice(t,s)),u}const Ri=Object.freeze(Object.defineProperty({__proto__:null,parseLinkDestination:Mi,parseLinkLabel:Fi,parseLinkTitle:Ii},Symbol.toStringTag,{value:"Module"})),Y={};Y.code_inline=function(e,t,r,a,n){const s=e[t];return"<code"+n.renderAttrs(s)+">"+ue(s.content)+"</code>"},Y.code_block=function(e,t,r,a,n){const s=e[t];return"<pre"+n.renderAttrs(s)+"><code>"+ue(e[t].content)+`</code></pre>
`},Y.fence=function(e,t,r,a,n){const s=e[t],u=s.info?Ee(s.info).trim():"";let i="",o="";if(u){const c=u.split(/(\s+)/g);i=c[0],o=c.slice(2).join("")}let l;if(r.highlight?l=r.highlight(s.content,i,o)||ue(s.content):l=ue(s.content),l.indexOf("<pre")===0)return l+`
`;if(u){const c=s.attrIndex("class"),d=s.attrs?s.attrs.slice():[];c<0?d.push(["class",r.langPrefix+i]):(d[c]=d[c].slice(),d[c][1]+=" "+r.langPrefix+i);const f={attrs:d};return`<pre><code${n.renderAttrs(f)}>${l}</code></pre>
`}return`<pre><code${n.renderAttrs(s)}>${l}</code></pre>
`},Y.image=function(e,t,r,a,n){const s=e[t];return s.attrs[s.attrIndex("alt")][1]=n.renderInlineAsText(s.children,r,a),n.renderToken(e,t,r)},Y.hardbreak=function(e,t,r){return r.xhtmlOut?`<br />
`:`<br>
`},Y.softbreak=function(e,t,r){return r.breaks?r.xhtmlOut?`<br />
`:`<br>
`:`
`},Y.text=function(e,t){return ue(e[t].content)},Y.html_block=function(e,t){return e[t].content},Y.html_inline=function(e,t){return e[t].content};function Se(){this.rules=ft({},Y)}Se.prototype.renderAttrs=function(t){let r,a,n;if(!t.attrs)return"";for(n="",r=0,a=t.attrs.length;r<a;r++)n+=" "+ue(t.attrs[r][0])+'="'+ue(t.attrs[r][1])+'"';return n},Se.prototype.renderToken=function(t,r,a){const n=t[r];let s="";if(n.hidden)return"";n.block&&n.nesting!==-1&&r&&t[r-1].hidden&&(s+=`
`),s+=(n.nesting===-1?"</":"<")+n.tag,s+=this.renderAttrs(n),n.nesting===0&&a.xhtmlOut&&(s+=" /");let u=!1;if(n.block&&(u=!0,n.nesting===1&&r+1<t.length)){const i=t[r+1];(i.type==="inline"||i.hidden||i.nesting===-1&&i.tag===n.tag)&&(u=!1)}return s+=u?`>
`:">",s},Se.prototype.renderInline=function(e,t,r){let a="";const n=this.rules;for(let s=0,u=e.length;s<u;s++){const i=e[s].type;typeof n[i]<"u"?a+=n[i](e,s,t,r,this):a+=this.renderToken(e,s,t)}return a},Se.prototype.renderInlineAsText=function(e,t,r){let a="";for(let n=0,s=e.length;n<s;n++)switch(e[n].type){case"text":a+=e[n].content;break;case"image":a+=this.renderInlineAsText(e[n].children,t,r);break;case"html_inline":case"html_block":a+=e[n].content;break;case"softbreak":case"hardbreak":a+=`
`;break}return a},Se.prototype.render=function(e,t,r){let a="";const n=this.rules;for(let s=0,u=e.length;s<u;s++){const i=e[s].type;i==="inline"?a+=this.renderInline(e[s].children,t,r):typeof n[i]<"u"?a+=n[i](e,s,t,r,this):a+=this.renderToken(e,s,t,r)}return a};function L(){this.__rules__=[],this.__cache__=null}L.prototype.__find__=function(e){for(let t=0;t<this.__rules__.length;t++)if(this.__rules__[t].name===e)return t;return-1},L.prototype.__compile__=function(){const e=this,t=[""];e.__rules__.forEach(function(r){r.enabled&&r.alt.forEach(function(a){t.indexOf(a)<0&&t.push(a)})}),e.__cache__={},t.forEach(function(r){e.__cache__[r]=[],e.__rules__.forEach(function(a){a.enabled&&(r&&a.alt.indexOf(r)<0||e.__cache__[r].push(a.fn))})})},L.prototype.at=function(e,t,r){const a=this.__find__(e),n=r||{};if(a===-1)throw new Error("Parser rule not found: "+e);this.__rules__[a].fn=t,this.__rules__[a].alt=n.alt||[],this.__cache__=null},L.prototype.before=function(e,t,r,a){const n=this.__find__(e),s=a||{};if(n===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(n,0,{name:t,enabled:!0,fn:r,alt:s.alt||[]}),this.__cache__=null},L.prototype.after=function(e,t,r,a){const n=this.__find__(e),s=a||{};if(n===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(n+1,0,{name:t,enabled:!0,fn:r,alt:s.alt||[]}),this.__cache__=null},L.prototype.push=function(e,t,r){const a=r||{};this.__rules__.push({name:e,enabled:!0,fn:t,alt:a.alt||[]}),this.__cache__=null},L.prototype.enable=function(e,t){Array.isArray(e)||(e=[e]);const r=[];return e.forEach(function(a){const n=this.__find__(a);if(n<0){if(t)return;throw new Error("Rules manager: invalid rule name "+a)}this.__rules__[n].enabled=!0,r.push(a)},this),this.__cache__=null,r},L.prototype.enableOnly=function(e,t){Array.isArray(e)||(e=[e]),this.__rules__.forEach(function(r){r.enabled=!1}),this.enable(e,t)},L.prototype.disable=function(e,t){Array.isArray(e)||(e=[e]);const r=[];return e.forEach(function(a){const n=this.__find__(a);if(n<0){if(t)return;throw new Error("Rules manager: invalid rule name "+a)}this.__rules__[n].enabled=!1,r.push(a)},this),this.__cache__=null,r},L.prototype.getRules=function(e){return this.__cache__===null&&this.__compile__(),this.__cache__[e]||[]};function G(e,t,r){this.type=e,this.tag=t,this.attrs=null,this.map=null,this.nesting=r,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}G.prototype.attrIndex=function(t){if(!this.attrs)return-1;const r=this.attrs;for(let a=0,n=r.length;a<n;a++)if(r[a][0]===t)return a;return-1},G.prototype.attrPush=function(t){this.attrs?this.attrs.push(t):this.attrs=[t]},G.prototype.attrSet=function(t,r){const a=this.attrIndex(t),n=[t,r];a<0?this.attrPush(n):this.attrs[a]=n},G.prototype.attrGet=function(t){const r=this.attrIndex(t);let a=null;return r>=0&&(a=this.attrs[r][1]),a},G.prototype.attrJoin=function(t,r){const a=this.attrIndex(t);a<0?this.attrPush([t,r]):this.attrs[a][1]=this.attrs[a][1]+" "+r};function Na(e,t,r){this.src=e,this.env=r,this.tokens=[],this.inlineMode=!1,this.md=t}Na.prototype.Token=G;const Ni=/\r\n?|\n/g,zi=/\0/g;function Oi(e){let t;t=e.src.replace(Ni,`
`),t=t.replace(zi,"�"),e.src=t}function Li(e){let t;e.inlineMode?(t=new e.Token("inline","",0),t.content=e.src,t.map=[0,1],t.children=[],e.tokens.push(t)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}function Bi(e){const t=e.tokens;for(let r=0,a=t.length;r<a;r++){const n=t[r];n.type==="inline"&&e.md.inline.parse(n.content,e.md,e.env,n.children)}}function Ui(e){return/^<a[>\s]/i.test(e)}function qi(e){return/^<\/a\s*>/i.test(e)}function Hi(e){const t=e.tokens;if(e.md.options.linkify)for(let r=0,a=t.length;r<a;r++){if(t[r].type!=="inline"||!e.md.linkify.pretest(t[r].content))continue;let n=t[r].children,s=0;for(let u=n.length-1;u>=0;u--){const i=n[u];if(i.type==="link_close"){for(u--;n[u].level!==i.level&&n[u].type!=="link_open";)u--;continue}if(i.type==="html_inline"&&(Ui(i.content)&&s>0&&s--,qi(i.content)&&s++),!(s>0)&&i.type==="text"&&e.md.linkify.test(i.content)){const o=i.content;let l=e.md.linkify.match(o);const c=[];let d=i.level,f=0;l.length>0&&l[0].index===0&&u>0&&n[u-1].type==="text_special"&&(l=l.slice(1));for(let h=0;h<l.length;h++){const p=l[h].url,w=e.md.normalizeLink(p);if(!e.md.validateLink(w))continue;let v=l[h].text;l[h].schema?l[h].schema==="mailto:"&&!/^mailto:/i.test(v)?v=e.md.normalizeLinkText("mailto:"+v).replace(/^mailto:/,""):v=e.md.normalizeLinkText(v):v=e.md.normalizeLinkText("http://"+v).replace(/^http:\/\//,"");const E=l[h].index;if(E>f){const b=new e.Token("text","",0);b.content=o.slice(f,E),b.level=d,c.push(b)}const m=new e.Token("link_open","a",1);m.attrs=[["href",w]],m.level=d++,m.markup="linkify",m.info="auto",c.push(m);const x=new e.Token("text","",0);x.content=v,x.level=d,c.push(x);const g=new e.Token("link_close","a",-1);g.level=--d,g.markup="linkify",g.info="auto",c.push(g),f=l[h].lastIndex}if(f<o.length){const h=new e.Token("text","",0);h.content=o.slice(f),h.level=d,c.push(h)}t[r].children=n=Fa(n,u,c)}}}}const za=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,ji=/\((c|tm|r)\)/i,Gi=/\((c|tm|r)\)/ig,Wi={c:"©",r:"®",tm:"™"};function Vi(e,t){return Wi[t.toLowerCase()]}function Zi(e){let t=0;for(let r=e.length-1;r>=0;r--){const a=e[r];a.type==="text"&&!t&&(a.content=a.content.replace(Gi,Vi)),a.type==="link_open"&&a.info==="auto"&&t--,a.type==="link_close"&&a.info==="auto"&&t++}}function Yi(e){let t=0;for(let r=e.length-1;r>=0;r--){const a=e[r];a.type==="text"&&!t&&za.test(a.content)&&(a.content=a.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1—").replace(/(^|\s)--(?=\s|$)/mg,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1–")),a.type==="link_open"&&a.info==="auto"&&t--,a.type==="link_close"&&a.info==="auto"&&t++}}function Qi(e){let t;if(e.md.options.typographer)for(t=e.tokens.length-1;t>=0;t--)e.tokens[t].type==="inline"&&(ji.test(e.tokens[t].content)&&Zi(e.tokens[t].children),za.test(e.tokens[t].content)&&Yi(e.tokens[t].children))}const Ji=/['"]/,Oa=/['"]/g,La="’";function mt(e,t,r,a){e[t]||(e[t]=[]),e[t].push({pos:r,ch:a})}function Ki(e,t){let r="",a=0;t.sort((n,s)=>n.pos-s.pos);for(let n=0;n<t.length;n++){const s=t[n];r+=e.slice(a,s.pos)+s.ch,a=s.pos+1}return r+e.slice(a)}function Xi(e,t){let r;const a=[],n={};for(let s=0;s<e.length;s++){const u=e[s],i=e[s].level;for(r=a.length-1;r>=0&&!(a[r].level<=i);r--);if(a.length=r+1,u.type!=="text")continue;const o=u.content;let l=0;const c=o.length;e:for(;l<c;){Oa.lastIndex=l;const d=Oa.exec(o);if(!d)break;let f=!0,h=!0;l=d.index+1;const p=d[0]==="'";let w=32;if(d.index-1>=0)w=o.charCodeAt(d.index-1);else for(r=s-1;r>=0&&!(e[r].type==="softbreak"||e[r].type==="hardbreak");r--)if(e[r].content){w=e[r].content.charCodeAt(e[r].content.length-1);break}let v=32;if(l<c)v=o.charCodeAt(l);else for(r=s+1;r<e.length&&!(e[r].type==="softbreak"||e[r].type==="hardbreak");r++)if(e[r].content){v=e[r].content.charCodeAt(0);break}const E=Ye(w)||Ze(w),m=Ye(v)||Ze(v),x=Ve(w),g=Ve(v);if(g?f=!1:m&&(x||E||(f=!1)),x?h=!1:E&&(g||m||(h=!1)),v===34&&d[0]==='"'&&w>=48&&w<=57&&(h=f=!1),f&&h&&(f=E,h=m),!f&&!h){p&&mt(n,s,d.index,La);continue}if(h)for(r=a.length-1;r>=0;r--){let b=a[r];if(a[r].level<i)break;if(b.single===p&&a[r].level===i){b=a[r];let y,D;p?(y=t.md.options.quotes[2],D=t.md.options.quotes[3]):(y=t.md.options.quotes[0],D=t.md.options.quotes[1]),mt(n,s,d.index,D),mt(n,b.token,b.pos,y),a.length=r;continue e}}f?a.push({token:s,pos:d.index,single:p,level:i}):h&&p&&mt(n,s,d.index,La)}}Object.keys(n).forEach(function(s){e[s].content=Ki(e[s].content,n[s])})}function eo(e){if(e.md.options.typographer)for(let t=e.tokens.length-1;t>=0;t--)e.tokens[t].type!=="inline"||!Ji.test(e.tokens[t].content)||Xi(e.tokens[t].children,e)}function to(e){let t,r;const a=e.tokens,n=a.length;for(let s=0;s<n;s++){if(a[s].type!=="inline")continue;const u=a[s].children,i=u.length;for(t=0;t<i;t++)u[t].type==="text_special"&&(u[t].type="text");for(t=r=0;t<i;t++)u[t].type==="text"&&t+1<i&&u[t+1].type==="text"?u[t+1].content=u[t].content+u[t+1].content:(t!==r&&(u[r]=u[t]),r++);t!==r&&(u.length=r)}}const tr=[["normalize",Oi],["block",Li],["inline",Bi],["linkify",Hi],["replacements",Qi],["smartquotes",eo],["text_join",to]];function rr(){this.ruler=new L;for(let e=0;e<tr.length;e++)this.ruler.push(tr[e][0],tr[e][1])}rr.prototype.process=function(e){const t=this.ruler.getRules("");for(let r=0,a=t.length;r<a;r++)t[r](e)},rr.prototype.State=Na;function Q(e,t,r,a){this.src=e,this.md=t,this.env=r,this.tokens=a,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;const n=this.src;for(let s=0,u=0,i=0,o=0,l=n.length,c=!1;u<l;u++){const d=n.charCodeAt(u);if(!c)if(P(d)){i++,d===9?o+=4-o%4:o++;continue}else c=!0;(d===10||u===l-1)&&(d!==10&&u++,this.bMarks.push(s),this.eMarks.push(u),this.tShift.push(i),this.sCount.push(o),this.bsCount.push(0),c=!1,i=0,o=0,s=u+1)}this.bMarks.push(n.length),this.eMarks.push(n.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}Q.prototype.push=function(e,t,r){const a=new G(e,t,r);return a.block=!0,r<0&&this.level--,a.level=this.level,r>0&&this.level++,this.tokens.push(a),a},Q.prototype.isEmpty=function(t){return this.bMarks[t]+this.tShift[t]>=this.eMarks[t]},Q.prototype.skipEmptyLines=function(t){for(let r=this.lineMax;t<r&&!(this.bMarks[t]+this.tShift[t]<this.eMarks[t]);t++);return t},Q.prototype.skipSpaces=function(t){for(let r=this.src.length;t<r;t++){const a=this.src.charCodeAt(t);if(!P(a))break}return t},Q.prototype.skipSpacesBack=function(t,r){if(t<=r)return t;for(;t>r;)if(!P(this.src.charCodeAt(--t)))return t+1;return t},Q.prototype.skipChars=function(t,r){for(let a=this.src.length;t<a&&this.src.charCodeAt(t)===r;t++);return t},Q.prototype.skipCharsBack=function(t,r,a){if(t<=a)return t;for(;t>a;)if(r!==this.src.charCodeAt(--t))return t+1;return t},Q.prototype.getLines=function(t,r,a,n){if(t>=r)return"";const s=new Array(r-t);for(let u=0,i=t;i<r;i++,u++){let o=0;const l=this.bMarks[i];let c=l,d;for(i+1<r||n?d=this.eMarks[i]+1:d=this.eMarks[i];c<d&&o<a;){const f=this.src.charCodeAt(c);if(P(f))f===9?o+=4-(o+this.bsCount[i])%4:o++;else if(c-l<this.tShift[i])o++;else break;c++}o>a?s[u]=new Array(o-a+1).join(" ")+this.src.slice(c,d):s[u]=this.src.slice(c,d)}return s.join("")},Q.prototype.Token=G;const ro=65536;function ar(e,t){const r=e.bMarks[t]+e.tShift[t],a=e.eMarks[t];return e.src.slice(r,a)}function Ba(e){const t=[],r=e.length;let a=0,n=e.charCodeAt(a),s=!1,u=0,i="";for(;a<r;)n===124&&(s?(i+=e.substring(u,a-1),u=a):(t.push(i+e.substring(u,a)),i="",u=a+1)),s=n===92,a++,n=e.charCodeAt(a);return t.push(i+e.substring(u)),t}function ao(e,t,r,a){if(t+2>r)return!1;let n=t+1;if(e.sCount[n]<e.blkIndent||e.sCount[n]-e.blkIndent>=4)return!1;let s=e.bMarks[n]+e.tShift[n];if(s>=e.eMarks[n])return!1;const u=e.src.charCodeAt(s++);if(u!==124&&u!==45&&u!==58||s>=e.eMarks[n])return!1;const i=e.src.charCodeAt(s++);if(i!==124&&i!==45&&i!==58&&!P(i)||u===45&&P(i))return!1;for(;s<e.eMarks[n];){const g=e.src.charCodeAt(s);if(g!==124&&g!==45&&g!==58&&!P(g))return!1;s++}let o=ar(e,t+1),l=o.split("|");const c=[];for(let g=0;g<l.length;g++){const b=l[g].trim();if(!b){if(g===0||g===l.length-1)continue;return!1}if(!/^:?-+:?$/.test(b))return!1;b.charCodeAt(b.length-1)===58?c.push(b.charCodeAt(0)===58?"center":"right"):b.charCodeAt(0)===58?c.push("left"):c.push("")}if(o=ar(e,t).trim(),o.indexOf("|")===-1||e.sCount[t]-e.blkIndent>=4)return!1;l=Ba(o),l.length&&l[0]===""&&l.shift(),l.length&&l[l.length-1]===""&&l.pop();const d=l.length;if(d===0||d!==c.length)return!1;if(a)return!0;const f=e.parentType;e.parentType="table";const h=e.md.block.ruler.getRules("blockquote"),p=e.push("table_open","table",1),w=[t,0];p.map=w;const v=e.push("thead_open","thead",1);v.map=[t,t+1];const E=e.push("tr_open","tr",1);E.map=[t,t+1];for(let g=0;g<l.length;g++){const b=e.push("th_open","th",1);c[g]&&(b.attrs=[["style","text-align:"+c[g]]]);const y=e.push("inline","",0);y.content=l[g].trim(),y.children=[],e.push("th_close","th",-1)}e.push("tr_close","tr",-1),e.push("thead_close","thead",-1);let m,x=0;for(n=t+2;n<r&&!(e.sCount[n]<e.blkIndent);n++){let g=!1;for(let y=0,D=h.length;y<D;y++)if(h[y](e,n,r,!0)){g=!0;break}if(g||(o=ar(e,n).trim(),!o)||e.sCount[n]-e.blkIndent>=4||(l=Ba(o),l.length&&l[0]===""&&l.shift(),l.length&&l[l.length-1]===""&&l.pop(),x+=d-l.length,x>ro))break;if(n===t+2){const y=e.push("tbody_open","tbody",1);y.map=m=[t+2,0]}const b=e.push("tr_open","tr",1);b.map=[n,n+1];for(let y=0;y<d;y++){const D=e.push("td_open","td",1);c[y]&&(D.attrs=[["style","text-align:"+c[y]]]);const T=e.push("inline","",0);T.content=l[y]?l[y].trim():"",T.children=[],e.push("td_close","td",-1)}e.push("tr_close","tr",-1)}return m&&(e.push("tbody_close","tbody",-1),m[1]=n),e.push("table_close","table",-1),w[1]=n,e.parentType=f,e.line=n,!0}function no(e,t,r){if(e.sCount[t]-e.blkIndent<4)return!1;let a=t+1,n=a;for(;a<r;){if(e.isEmpty(a)){a++;continue}if(e.sCount[a]-e.blkIndent>=4){a++,n=a;continue}break}e.line=n;const s=e.push("code_block","code",0);return s.content=e.getLines(t,n,4+e.blkIndent,!1)+`
`,s.map=[t,e.line],!0}function so(e,t,r,a){let n=e.bMarks[t]+e.tShift[t],s=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4||n+3>s)return!1;const u=e.src.charCodeAt(n);if(u!==126&&u!==96)return!1;let i=n;n=e.skipChars(n,u);let o=n-i;if(o<3)return!1;const l=e.src.slice(i,n),c=e.src.slice(n,s);if(u===96&&c.indexOf(String.fromCharCode(u))>=0)return!1;if(a)return!0;let d=t,f=!1;for(;d++,!(d>=r||(n=i=e.bMarks[d]+e.tShift[d],s=e.eMarks[d],n<s&&e.sCount[d]<e.blkIndent));)if(e.src.charCodeAt(n)===u&&!(e.sCount[d]-e.blkIndent>=4)&&(n=e.skipChars(n,u),!(n-i<o)&&(n=e.skipSpaces(n),!(n<s)))){f=!0;break}o=e.sCount[t],e.line=d+(f?1:0);const h=e.push("fence","code",0);return h.info=c,h.content=e.getLines(t+1,d,o,!0),h.markup=l,h.map=[t,e.line],!0}function uo(e,t,r,a){let n=e.bMarks[t]+e.tShift[t],s=e.eMarks[t];const u=e.lineMax;if(e.sCount[t]-e.blkIndent>=4||e.src.charCodeAt(n)!==62)return!1;if(a)return!0;const i=[],o=[],l=[],c=[],d=e.md.block.ruler.getRules("blockquote"),f=e.parentType;e.parentType="blockquote";let h=!1,p;for(p=t;p<r;p++){const x=e.sCount[p]<e.blkIndent;if(n=e.bMarks[p]+e.tShift[p],s=e.eMarks[p],n>=s)break;if(e.src.charCodeAt(n++)===62&&!x){let b=e.sCount[p]+1,y,D;e.src.charCodeAt(n)===32?(n++,b++,D=!1,y=!0):e.src.charCodeAt(n)===9?(y=!0,(e.bsCount[p]+b)%4===3?(n++,b++,D=!1):D=!0):y=!1;let T=b;for(i.push(e.bMarks[p]),e.bMarks[p]=n;n<s;){const V=e.src.charCodeAt(n);if(P(V))V===9?T+=4-(T+e.bsCount[p]+(D?1:0))%4:T++;else break;n++}h=n>=s,o.push(e.bsCount[p]),e.bsCount[p]=e.sCount[p]+1+(y?1:0),l.push(e.sCount[p]),e.sCount[p]=T-b,c.push(e.tShift[p]),e.tShift[p]=n-e.bMarks[p];continue}if(h)break;let g=!1;for(let b=0,y=d.length;b<y;b++)if(d[b](e,p,r,!0)){g=!0;break}if(g){e.lineMax=p,e.blkIndent!==0&&(i.push(e.bMarks[p]),o.push(e.bsCount[p]),c.push(e.tShift[p]),l.push(e.sCount[p]),e.sCount[p]-=e.blkIndent);break}i.push(e.bMarks[p]),o.push(e.bsCount[p]),c.push(e.tShift[p]),l.push(e.sCount[p]),e.sCount[p]=-1}const w=e.blkIndent;e.blkIndent=0;const v=e.push("blockquote_open","blockquote",1);v.markup=">";const E=[t,0];v.map=E,e.md.block.tokenize(e,t,p);const m=e.push("blockquote_close","blockquote",-1);m.markup=">",e.lineMax=u,e.parentType=f,E[1]=e.line;for(let x=0;x<c.length;x++)e.bMarks[x+t]=i[x],e.tShift[x+t]=c[x],e.sCount[x+t]=l[x],e.bsCount[x+t]=o[x];return e.blkIndent=w,!0}function io(e,t,r,a){const n=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4)return!1;let s=e.bMarks[t]+e.tShift[t];const u=e.src.charCodeAt(s++);if(u!==42&&u!==45&&u!==95)return!1;let i=1;for(;s<n;){const l=e.src.charCodeAt(s++);if(l!==u&&!P(l))return!1;l===u&&i++}if(i<3)return!1;if(a)return!0;e.line=t+1;const o=e.push("hr","hr",0);return o.map=[t,e.line],o.markup=Array(i+1).join(String.fromCharCode(u)),!0}function Ua(e,t){const r=e.eMarks[t];let a=e.bMarks[t]+e.tShift[t];const n=e.src.charCodeAt(a++);if(n!==42&&n!==45&&n!==43)return-1;if(a<r){const s=e.src.charCodeAt(a);if(!P(s))return-1}return a}function qa(e,t){const r=e.bMarks[t]+e.tShift[t],a=e.eMarks[t];let n=r;if(n+1>=a)return-1;let s=e.src.charCodeAt(n++);if(s<48||s>57)return-1;for(;;){if(n>=a)return-1;if(s=e.src.charCodeAt(n++),s>=48&&s<=57){if(n-r>=10)return-1;continue}if(s===41||s===46)break;return-1}return n<a&&(s=e.src.charCodeAt(n),!P(s))?-1:n}function oo(e,t){const r=e.level+2;for(let a=t+2,n=e.tokens.length-2;a<n;a++)e.tokens[a].level===r&&e.tokens[a].type==="paragraph_open"&&(e.tokens[a+2].hidden=!0,e.tokens[a].hidden=!0,a+=2)}function lo(e,t,r,a){let n,s,u,i,o=t,l=!0;if(e.sCount[o]-e.blkIndent>=4||e.listIndent>=0&&e.sCount[o]-e.listIndent>=4&&e.sCount[o]<e.blkIndent)return!1;let c=!1;a&&e.parentType==="paragraph"&&e.sCount[o]>=e.blkIndent&&(c=!0);let d,f,h;if((h=qa(e,o))>=0){if(d=!0,u=e.bMarks[o]+e.tShift[o],f=Number(e.src.slice(u,h-1)),c&&f!==1)return!1}else if((h=Ua(e,o))>=0)d=!1;else return!1;if(c&&e.skipSpaces(h)>=e.eMarks[o])return!1;if(a)return!0;const p=e.src.charCodeAt(h-1),w=e.tokens.length;d?(i=e.push("ordered_list_open","ol",1),f!==1&&(i.attrs=[["start",f]])):i=e.push("bullet_list_open","ul",1);const v=[o,0];i.map=v,i.markup=String.fromCharCode(p);let E=!1;const m=e.md.block.ruler.getRules("list"),x=e.parentType;for(e.parentType="list";o<r;){s=h,n=e.eMarks[o];const g=e.sCount[o]+h-(e.bMarks[o]+e.tShift[o]);let b=g;for(;s<n;){const Ie=e.src.charCodeAt(s);if(Ie===9)b+=4-(b+e.bsCount[o])%4;else if(Ie===32)b++;else break;s++}const y=s;let D;y>=n?D=1:D=b-g,D>4&&(D=1);const T=g+D;i=e.push("list_item_open","li",1),i.markup=String.fromCharCode(p);const V=[o,0];i.map=V,d&&(i.info=e.src.slice(u,h-1));const at=e.tight,Dr=e.tShift[o],K0=e.sCount[o],X0=e.listIndent;if(e.listIndent=e.blkIndent,e.blkIndent=T,e.tight=!0,e.tShift[o]=y-e.bMarks[o],e.sCount[o]=b,y>=n&&e.isEmpty(o+1)?e.line=Math.min(e.line+2,r):e.md.block.tokenize(e,o,r,!0),(!e.tight||E)&&(l=!1),E=e.line-o>1&&e.isEmpty(e.line-1),e.blkIndent=e.listIndent,e.listIndent=X0,e.tShift[o]=Dr,e.sCount[o]=K0,e.tight=at,i=e.push("list_item_close","li",-1),i.markup=String.fromCharCode(p),o=e.line,V[1]=o,o>=r||e.sCount[o]<e.blkIndent||e.sCount[o]-e.blkIndent>=4)break;let ps=!1;for(let Ie=0,ed=m.length;Ie<ed;Ie++)if(m[Ie](e,o,r,!0)){ps=!0;break}if(ps)break;if(d){if(h=qa(e,o),h<0)break;u=e.bMarks[o]+e.tShift[o]}else if(h=Ua(e,o),h<0)break;if(p!==e.src.charCodeAt(h-1))break}return d?i=e.push("ordered_list_close","ol",-1):i=e.push("bullet_list_close","ul",-1),i.markup=String.fromCharCode(p),v[1]=o,e.line=o,e.parentType=x,l&&oo(e,w),!0}function co(e,t,r,a){let n=e.bMarks[t]+e.tShift[t],s=e.eMarks[t],u=t+1;if(e.sCount[t]-e.blkIndent>=4||e.src.charCodeAt(n)!==91)return!1;function i(m){const x=e.lineMax;if(m>=x||e.isEmpty(m))return null;let g=!1;if(e.sCount[m]-e.blkIndent>3&&(g=!0),e.sCount[m]<0&&(g=!0),!g){const D=e.md.block.ruler.getRules("reference"),T=e.parentType;e.parentType="reference";let V=!1;for(let at=0,Dr=D.length;at<Dr;at++)if(D[at](e,m,x,!0)){V=!0;break}if(e.parentType=T,V)return null}const b=e.bMarks[m]+e.tShift[m],y=e.eMarks[m];return e.src.slice(b,y+1)}let o=e.src.slice(n,s+1);s=o.length;let l=-1;for(n=1;n<s;n++){const m=o.charCodeAt(n);if(m===91)return!1;if(m===93){l=n;break}else if(m===10){const x=i(u);x!==null&&(o+=x,s=o.length,u++)}else if(m===92&&(n++,n<s&&o.charCodeAt(n)===10)){const x=i(u);x!==null&&(o+=x,s=o.length,u++)}}if(l<0||o.charCodeAt(l+1)!==58)return!1;for(n=l+2;n<s;n++){const m=o.charCodeAt(n);if(m===10){const x=i(u);x!==null&&(o+=x,s=o.length,u++)}else if(!P(m))break}const c=e.md.helpers.parseLinkDestination(o,n,s);if(!c.ok)return!1;const d=e.md.normalizeLink(c.str);if(!e.md.validateLink(d))return!1;n=c.pos;const f=n,h=u,p=n;for(;n<s;n++){const m=o.charCodeAt(n);if(m===10){const x=i(u);x!==null&&(o+=x,s=o.length,u++)}else if(!P(m))break}let w=e.md.helpers.parseLinkTitle(o,n,s);for(;w.can_continue;){const m=i(u);if(m===null)break;o+=m,n=s,s=o.length,u++,w=e.md.helpers.parseLinkTitle(o,n,s,w)}let v;for(n<s&&p!==n&&w.ok?(v=w.str,n=w.pos):(v="",n=f,u=h);n<s;){const m=o.charCodeAt(n);if(!P(m))break;n++}if(n<s&&o.charCodeAt(n)!==10&&v)for(v="",n=f,u=h;n<s;){const m=o.charCodeAt(n);if(!P(m))break;n++}if(n<s&&o.charCodeAt(n)!==10)return!1;const E=gt(o.slice(1,l));return E?(a||(typeof e.env.references>"u"&&(e.env.references={}),typeof e.env.references[E]>"u"&&(e.env.references[E]={title:v,href:d}),e.line=u),!0):!1}const po=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],ho="[a-zA-Z_:][a-zA-Z0-9:._-]*",fo="(?:"+"[^\"'=<>`\\x00-\\x20]+"+"|"+"'[^']*'"+"|"+'"[^"]*"'+")",Ha="<[A-Za-z][A-Za-z0-9\\-]*"+("(?:\\s+"+ho+"(?:\\s*=\\s*"+fo+")?)")+"*\\s*\\/?>",ja="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",go="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",bo="<[?][\\s\\S]*?[?]>",mo="<![A-Za-z][^>]*>",xo="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",yo=new RegExp("^(?:"+Ha+"|"+ja+"|"+go+"|"+bo+"|"+mo+"|"+xo+")"),vo=new RegExp("^(?:"+Ha+"|"+ja+")"),me=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+po.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(vo.source+"\\s*$"),/^$/,!1]];function wo(e,t,r,a){let n=e.bMarks[t]+e.tShift[t],s=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4||!e.md.options.html||e.src.charCodeAt(n)!==60)return!1;let u=e.src.slice(n,s),i=0;for(;i<me.length&&!me[i][0].test(u);i++);if(i===me.length)return!1;if(a)return me[i][2];let o=t+1;const l=me[i][1].test("");if(!me[i][1].test(u)){for(;o<r&&!(e.sCount[o]<e.blkIndent&&(l||!e.isEmpty(o)));o++)if(n=e.bMarks[o]+e.tShift[o],s=e.eMarks[o],u=e.src.slice(n,s),me[i][1].test(u)){u.length!==0&&o++;break}}e.line=o;const c=e.push("html_block","",0);return c.map=[t,o],c.content=e.getLines(t,o,e.blkIndent,!0),!0}function _o(e,t,r,a){let n=e.bMarks[t]+e.tShift[t],s=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4)return!1;let u=e.src.charCodeAt(n);if(u!==35||n>=s)return!1;let i=1;for(u=e.src.charCodeAt(++n);u===35&&n<s&&i<=6;)i++,u=e.src.charCodeAt(++n);if(i>6||n<s&&!P(u))return!1;if(a)return!0;s=e.skipSpacesBack(s,n);const o=e.skipCharsBack(s,35,n);o>n&&P(e.src.charCodeAt(o-1))&&(s=o),e.line=t+1;const l=e.push("heading_open","h"+String(i),1);l.markup="########".slice(0,i),l.map=[t,e.line];const c=e.push("inline","",0);c.content=bt(e.src.slice(n,s)),c.map=[t,e.line],c.children=[];const d=e.push("heading_close","h"+String(i),-1);return d.markup="########".slice(0,i),!0}function Co(e,t,r){const a=e.md.block.ruler.getRules("paragraph");if(e.sCount[t]-e.blkIndent>=4)return!1;const n=e.parentType;e.parentType="paragraph";let s=0,u,i=t+1;for(;i<r&&!e.isEmpty(i);i++){if(e.sCount[i]-e.blkIndent>3)continue;if(e.sCount[i]>=e.blkIndent){let h=e.bMarks[i]+e.tShift[i];const p=e.eMarks[i];if(h<p&&(u=e.src.charCodeAt(h),(u===45||u===61)&&(h=e.skipChars(h,u),h=e.skipSpaces(h),h>=p))){s=u===61?1:2;break}}if(e.sCount[i]<0)continue;let f=!1;for(let h=0,p=a.length;h<p;h++)if(a[h](e,i,r,!0)){f=!0;break}if(f)break}if(!s)return e.parentType=n,!1;const o=bt(e.getLines(t,i,e.blkIndent,!1));e.line=i+1;const l=e.push("heading_open","h"+String(s),1);l.markup=String.fromCharCode(u),l.map=[t,e.line];const c=e.push("inline","",0);c.content=o,c.map=[t,e.line-1],c.children=[];const d=e.push("heading_close","h"+String(s),-1);return d.markup=String.fromCharCode(u),e.parentType=n,!0}function Ao(e,t,r){const a=e.md.block.ruler.getRules("paragraph"),n=e.parentType;let s=t+1;for(e.parentType="paragraph";s<r&&!e.isEmpty(s);s++){if(e.sCount[s]-e.blkIndent>3||e.sCount[s]<0)continue;let l=!1;for(let c=0,d=a.length;c<d;c++)if(a[c](e,s,r,!0)){l=!0;break}if(l)break}const u=bt(e.getLines(t,s,e.blkIndent,!1));e.line=s;const i=e.push("paragraph_open","p",1);i.map=[t,e.line];const o=e.push("inline","",0);return o.content=u,o.map=[t,e.line],o.children=[],e.push("paragraph_close","p",-1),e.parentType=n,!0}const xt=[["table",ao,["paragraph","reference"]],["code",no],["fence",so,["paragraph","reference","blockquote","list"]],["blockquote",uo,["paragraph","reference","blockquote","list"]],["hr",io,["paragraph","reference","blockquote","list"]],["list",lo,["paragraph","reference","blockquote"]],["reference",co],["html_block",wo,["paragraph","reference","blockquote"]],["heading",_o,["paragraph","reference","blockquote"]],["lheading",Co],["paragraph",Ao]];function yt(){this.ruler=new L;for(let e=0;e<xt.length;e++)this.ruler.push(xt[e][0],xt[e][1],{alt:(xt[e][2]||[]).slice()})}yt.prototype.tokenize=function(e,t,r){const a=this.ruler.getRules(""),n=a.length,s=e.md.options.maxNesting;let u=t,i=!1;for(;u<r&&(e.line=u=e.skipEmptyLines(u),!(u>=r||e.sCount[u]<e.blkIndent));){if(e.level>=s){e.line=r;break}const o=e.line;let l=!1;for(let c=0;c<n;c++)if(l=a[c](e,u,r,!1),l){if(o>=e.line)throw new Error("block rule didn't increment state.line");break}if(!l)throw new Error("none of the block rules matched");e.tight=!i,e.isEmpty(e.line-1)&&(i=!0),u=e.line,u<r&&e.isEmpty(u)&&(i=!0,u++,e.line=u)}},yt.prototype.parse=function(e,t,r,a){if(!e)return;const n=new this.State(e,t,r,a);this.tokenize(n,n.line,n.lineMax)},yt.prototype.State=Q;function Qe(e,t,r,a){this.src=e,this.env=r,this.md=t,this.tokens=a,this.tokens_meta=Array(a.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}Qe.prototype.pushPending=function(){const e=new G("text","",0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending="",e},Qe.prototype.push=function(e,t,r){this.pending&&this.pushPending();const a=new G(e,t,r);let n=null;return r<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),a.level=this.level,r>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],n={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(a),this.tokens_meta.push(n),a},Qe.prototype.scanDelims=function(e,t){const r=this.posMax,a=this.src.charCodeAt(e);let n;if(e===0)n=32;else if(e===1)n=this.src.charCodeAt(0),(n&63488)===55296&&(n=65533);else if(n=this.src.charCodeAt(e-1),(n&64512)===56320){const v=this.src.charCodeAt(e-2);n=(v&64512)===55296?65536+(v-55296<<10)+(n-56320):65533}else(n&64512)===55296&&(n=65533);let s=e;for(;s<r&&this.src.charCodeAt(s)===a;)s++;const u=s-e;let i=s<r?this.src.charCodeAt(s):32;if((i&64512)===55296){const v=this.src.charCodeAt(s+1);i=(v&64512)===56320?65536+(i-55296<<10)+(v-56320):65533}else(i&64512)===56320&&(i=65533);const o=Ye(n)||Ze(n),l=Ye(i)||Ze(i),c=Ve(n),d=Ve(i),f=!d&&(!l||c||o),h=!c&&(!o||d||l);return{can_open:f&&(t||!h||o),can_close:h&&(t||!f||l),length:u}},Qe.prototype.Token=G;function ko(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function Eo(e,t){let r=e.pos;for(;r<e.posMax&&!ko(e.src.charCodeAt(r));)r++;return r===e.pos?!1:(t||(e.pending+=e.src.slice(e.pos,r)),e.pos=r,!0)}const So=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;function To(e,t){if(!e.md.options.linkify||e.linkLevel>0)return!1;const r=e.pos,a=e.posMax;if(r+3>a||e.src.charCodeAt(r)!==58||e.src.charCodeAt(r+1)!==47||e.src.charCodeAt(r+2)!==47)return!1;const n=e.pending.match(So);if(!n)return!1;const s=n[1],u=e.md.linkify.matchAtStart(e.src.slice(r-s.length));if(!u)return!1;let i=u.url;if(i.length<=s.length)return!1;let o=i.length;for(;o>0&&i.charCodeAt(o-1)===42;)o--;o!==i.length&&(i=i.slice(0,o));const l=e.md.normalizeLink(i);if(!e.md.validateLink(l))return!1;if(!t){e.pending=e.pending.slice(0,-s.length);const c=e.push("link_open","a",1);c.attrs=[["href",l]],c.markup="linkify",c.info="auto";const d=e.push("text","",0);d.content=e.md.normalizeLinkText(i);const f=e.push("link_close","a",-1);f.markup="linkify",f.info="auto"}return e.pos+=i.length-s.length,!0}function Do(e,t){let r=e.pos;if(e.src.charCodeAt(r)!==10)return!1;const a=e.pending.length-1,n=e.posMax;if(!t)if(a>=0&&e.pending.charCodeAt(a)===32)if(a>=1&&e.pending.charCodeAt(a-1)===32){let s=a-1;for(;s>=1&&e.pending.charCodeAt(s-1)===32;)s--;e.pending=e.pending.slice(0,s),e.push("hardbreak","br",0)}else e.pending=e.pending.slice(0,-1),e.push("softbreak","br",0);else e.push("softbreak","br",0);for(r++;r<n&&P(e.src.charCodeAt(r));)r++;return e.pos=r,!0}const nr=[];for(let e=0;e<256;e++)nr.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e){nr[e.charCodeAt(0)]=1});function Po(e,t){let r=e.pos;const a=e.posMax;if(e.src.charCodeAt(r)!==92||(r++,r>=a))return!1;let n=e.src.charCodeAt(r);if(n===10){for(t||e.push("hardbreak","br",0),r++;r<a&&(n=e.src.charCodeAt(r),!!P(n));)r++;return e.pos=r,!0}let s=e.src[r];if(n>=55296&&n<=56319&&r+1<a){const i=e.src.charCodeAt(r+1);i>=56320&&i<=57343&&(s+=e.src[r+1],r++)}const u="\\"+s;if(!t){const i=e.push("text_special","",0);n<256&&nr[n]!==0?i.content=s:i.content=u,i.markup=u,i.info="escape"}return e.pos=r+1,!0}function $o(e,t){let r=e.pos;if(e.src.charCodeAt(r)!==96)return!1;const n=r;r++;const s=e.posMax;for(;r<s&&e.src.charCodeAt(r)===96;)r++;const u=e.src.slice(n,r),i=u.length;if(e.backticksScanned&&(e.backticks[i]||0)<=n)return t||(e.pending+=u),e.pos+=i,!0;let o=r,l;for(;(l=e.src.indexOf("`",o))!==-1;){for(o=l+1;o<s&&e.src.charCodeAt(o)===96;)o++;const c=o-l;if(c===i){if(!t){const d=e.push("code_inline","code",0);d.markup=u,d.content=e.src.slice(r,l).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return e.pos=o,!0}e.backticks[c]=l}return e.backticksScanned=!0,t||(e.pending+=u),e.pos+=i,!0}function Fo(e,t){const r=e.pos,a=e.src.charCodeAt(r);if(t||a!==126)return!1;const n=e.scanDelims(e.pos,!0);let s=n.length;const u=String.fromCharCode(a);if(s<2)return!1;let i;s%2&&(i=e.push("text","",0),i.content=u,s--);for(let o=0;o<s;o+=2)i=e.push("text","",0),i.content=u+u,e.delimiters.push({marker:a,length:0,token:e.tokens.length-1,end:-1,open:n.can_open,close:n.can_close});return e.pos+=n.length,!0}function Ga(e,t){let r;const a=[],n=t.length;for(let s=0;s<n;s++){const u=t[s];if(u.marker!==126||u.end===-1)continue;const i=t[u.end];r=e.tokens[u.token],r.type="s_open",r.tag="s",r.nesting=1,r.markup="~~",r.content="",r=e.tokens[i.token],r.type="s_close",r.tag="s",r.nesting=-1,r.markup="~~",r.content="",e.tokens[i.token-1].type==="text"&&e.tokens[i.token-1].content==="~"&&a.push(i.token-1)}for(;a.length;){const s=a.pop();let u=s+1;for(;u<e.tokens.length&&e.tokens[u].type==="s_close";)u++;u--,s!==u&&(r=e.tokens[u],e.tokens[u]=e.tokens[s],e.tokens[s]=r)}}function Mo(e){const t=e.tokens_meta,r=e.tokens_meta.length;Ga(e,e.delimiters);for(let a=0;a<r;a++)t[a]&&t[a].delimiters&&Ga(e,t[a].delimiters)}const Wa={tokenize:Fo,postProcess:Mo};function Io(e,t){const r=e.pos,a=e.src.charCodeAt(r);if(t||a!==95&&a!==42)return!1;const n=e.scanDelims(e.pos,a===42);for(let s=0;s<n.length;s++){const u=e.push("text","",0);u.content=String.fromCharCode(a),e.delimiters.push({marker:a,length:n.length,token:e.tokens.length-1,end:-1,open:n.can_open,close:n.can_close})}return e.pos+=n.length,!0}function Va(e,t){const r=t.length;for(let a=r-1;a>=0;a--){const n=t[a];if(n.marker!==95&&n.marker!==42||n.end===-1)continue;const s=t[n.end],u=a>0&&t[a-1].end===n.end+1&&t[a-1].marker===n.marker&&t[a-1].token===n.token-1&&t[n.end+1].token===s.token+1,i=String.fromCharCode(n.marker),o=e.tokens[n.token];o.type=u?"strong_open":"em_open",o.tag=u?"strong":"em",o.nesting=1,o.markup=u?i+i:i,o.content="";const l=e.tokens[s.token];l.type=u?"strong_close":"em_close",l.tag=u?"strong":"em",l.nesting=-1,l.markup=u?i+i:i,l.content="",u&&(e.tokens[t[a-1].token].content="",e.tokens[t[n.end+1].token].content="",a--)}}function Ro(e){const t=e.tokens_meta,r=e.tokens_meta.length;Va(e,e.delimiters);for(let a=0;a<r;a++)t[a]&&t[a].delimiters&&Va(e,t[a].delimiters)}const Za={tokenize:Io,postProcess:Ro};function No(e,t){let r,a,n,s,u="",i="",o=e.pos,l=!0;if(e.src.charCodeAt(e.pos)!==91)return!1;const c=e.pos,d=e.posMax,f=e.pos+1,h=e.md.helpers.parseLinkLabel(e,e.pos,!0);if(h<0)return!1;let p=h+1;if(p<d&&e.src.charCodeAt(p)===40){for(l=!1,p++;p<d&&(r=e.src.charCodeAt(p),!(!P(r)&&r!==10));p++);if(p>=d)return!1;if(o=p,n=e.md.helpers.parseLinkDestination(e.src,p,e.posMax),n.ok){for(u=e.md.normalizeLink(n.str),e.md.validateLink(u)?p=n.pos:u="",o=p;p<d&&(r=e.src.charCodeAt(p),!(!P(r)&&r!==10));p++);if(n=e.md.helpers.parseLinkTitle(e.src,p,e.posMax),p<d&&o!==p&&n.ok)for(i=n.str,p=n.pos;p<d&&(r=e.src.charCodeAt(p),!(!P(r)&&r!==10));p++);}(p>=d||e.src.charCodeAt(p)!==41)&&(l=!0),p++}if(l){if(typeof e.env.references>"u")return!1;if(p<d&&e.src.charCodeAt(p)===91?(o=p+1,p=e.md.helpers.parseLinkLabel(e,p),p>=0?a=e.src.slice(o,p++):p=h+1):p=h+1,a||(a=e.src.slice(f,h)),s=e.env.references[gt(a)],!s)return e.pos=c,!1;u=s.href,i=s.title}if(!t){e.pos=f,e.posMax=h;const w=e.push("link_open","a",1),v=[["href",u]];w.attrs=v,i&&v.push(["title",i]),e.linkLevel++,e.md.inline.tokenize(e),e.linkLevel--,e.push("link_close","a",-1)}return e.pos=p,e.posMax=d,!0}function zo(e,t){let r,a,n,s,u,i,o,l,c="";const d=e.pos,f=e.posMax;if(e.src.charCodeAt(e.pos)!==33||e.src.charCodeAt(e.pos+1)!==91)return!1;const h=e.pos+2,p=e.md.helpers.parseLinkLabel(e,e.pos+1,!1);if(p<0)return!1;if(s=p+1,s<f&&e.src.charCodeAt(s)===40){for(s++;s<f&&(r=e.src.charCodeAt(s),!(!P(r)&&r!==10));s++);if(s>=f)return!1;for(l=s,i=e.md.helpers.parseLinkDestination(e.src,s,e.posMax),i.ok&&(c=e.md.normalizeLink(i.str),e.md.validateLink(c)?s=i.pos:c=""),l=s;s<f&&(r=e.src.charCodeAt(s),!(!P(r)&&r!==10));s++);if(i=e.md.helpers.parseLinkTitle(e.src,s,e.posMax),s<f&&l!==s&&i.ok)for(o=i.str,s=i.pos;s<f&&(r=e.src.charCodeAt(s),!(!P(r)&&r!==10));s++);else o="";if(s>=f||e.src.charCodeAt(s)!==41)return e.pos=d,!1;s++}else{if(typeof e.env.references>"u")return!1;if(s<f&&e.src.charCodeAt(s)===91?(l=s+1,s=e.md.helpers.parseLinkLabel(e,s),s>=0?n=e.src.slice(l,s++):s=p+1):s=p+1,n||(n=e.src.slice(h,p)),u=e.env.references[gt(n)],!u)return e.pos=d,!1;c=u.href,o=u.title}if(!t){a=e.src.slice(h,p);const w=[];e.md.inline.parse(a,e.md,e.env,w);const v=e.push("image","img",0),E=[["src",c],["alt",""]];v.attrs=E,v.children=w,v.content=a,o&&E.push(["title",o])}return e.pos=s,e.posMax=f,!0}const Oo=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,Lo=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function Bo(e,t){let r=e.pos;if(e.src.charCodeAt(r)!==60)return!1;const a=e.pos,n=e.posMax;for(;;){if(++r>=n)return!1;const u=e.src.charCodeAt(r);if(u===60)return!1;if(u===62)break}const s=e.src.slice(a+1,r);if(Lo.test(s)){const u=e.md.normalizeLink(s);if(!e.md.validateLink(u))return!1;if(!t){const i=e.push("link_open","a",1);i.attrs=[["href",u]],i.markup="autolink",i.info="auto";const o=e.push("text","",0);o.content=e.md.normalizeLinkText(s);const l=e.push("link_close","a",-1);l.markup="autolink",l.info="auto"}return e.pos+=s.length+2,!0}if(Oo.test(s)){const u=e.md.normalizeLink("mailto:"+s);if(!e.md.validateLink(u))return!1;if(!t){const i=e.push("link_open","a",1);i.attrs=[["href",u]],i.markup="autolink",i.info="auto";const o=e.push("text","",0);o.content=e.md.normalizeLinkText(s);const l=e.push("link_close","a",-1);l.markup="autolink",l.info="auto"}return e.pos+=s.length+2,!0}return!1}function Uo(e){return/^<a[>\s]/i.test(e)}function qo(e){return/^<\/a\s*>/i.test(e)}function Ho(e){const t=e|32;return t>=97&&t<=122}function jo(e,t){if(!e.md.options.html)return!1;const r=e.posMax,a=e.pos;if(e.src.charCodeAt(a)!==60||a+2>=r)return!1;const n=e.src.charCodeAt(a+1);if(n!==33&&n!==63&&n!==47&&!Ho(n))return!1;const s=e.src.slice(a).match(yo);if(!s)return!1;if(!t){const u=e.push("html_inline","",0);u.content=s[0],Uo(u.content)&&e.linkLevel++,qo(u.content)&&e.linkLevel--}return e.pos+=s[0].length,!0}const Go=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,Wo=/^&([a-z][a-z0-9]{1,31});/i;function Vo(e,t){const r=e.pos,a=e.posMax;if(e.src.charCodeAt(r)!==38||r+1>=a)return!1;if(e.src.charCodeAt(r+1)===35){const s=e.src.slice(r).match(Go);if(s){if(!t){const u=s[1][0].toLowerCase()==="x"?parseInt(s[1].slice(1),16):parseInt(s[1],10),i=e.push("text_special","",0);i.content=er(u)?We(u):We(65533),i.markup=s[0],i.info="entity"}return e.pos+=s[0].length,!0}}else{const s=e.src.slice(r).match(Wo);if(s){const u=bi(s[0]);if(u!==s[0]){if(!t){const i=e.push("text_special","",0);i.content=u,i.markup=s[0],i.info="entity"}return e.pos+=s[0].length,!0}}}return!1}function Ya(e){const t={},r=e.length;if(!r)return;let a=0,n=-2;const s=[];for(let u=0;u<r;u++){const i=e[u];if(s.push(0),(e[a].marker!==i.marker||n!==i.token-1)&&(a=u),n=i.token,i.length=i.length||0,!i.close)continue;t.hasOwnProperty(i.marker)||(t[i.marker]=[-1,-1,-1,-1,-1,-1]);const o=t[i.marker][(i.open?3:0)+i.length%3];let l=a-s[a]-1,c=l;for(;l>o;l-=s[l]+1){const d=e[l];if(d.marker===i.marker&&d.open&&d.end<0){let f=!1;if((d.close||i.open)&&(d.length+i.length)%3===0&&(d.length%3!==0||i.length%3!==0)&&(f=!0),!f){const h=l>0&&!e[l-1].open?s[l-1]+1:0;s[u]=u-l+h,s[l]=h,i.open=!1,d.end=u,d.close=!1,c=-1,n=-2;break}}}c!==-1&&(t[i.marker][(i.open?3:0)+(i.length||0)%3]=c)}}function Zo(e){const t=e.tokens_meta,r=e.tokens_meta.length;Ya(e.delimiters);for(let a=0;a<r;a++)t[a]&&t[a].delimiters&&Ya(t[a].delimiters)}function Yo(e){let t,r,a=0;const n=e.tokens,s=e.tokens.length;for(t=r=0;t<s;t++)n[t].nesting<0&&a--,n[t].level=a,n[t].nesting>0&&a++,n[t].type==="text"&&t+1<s&&n[t+1].type==="text"?n[t+1].content=n[t].content+n[t+1].content:(t!==r&&(n[r]=n[t]),r++);t!==r&&(n.length=r)}const sr=[["text",Eo],["linkify",To],["newline",Do],["escape",Po],["backticks",$o],["strikethrough",Wa.tokenize],["emphasis",Za.tokenize],["link",No],["image",zo],["autolink",Bo],["html_inline",jo],["entity",Vo]],ur=[["balance_pairs",Zo],["strikethrough",Wa.postProcess],["emphasis",Za.postProcess],["fragments_join",Yo]];function Je(){this.ruler=new L;for(let e=0;e<sr.length;e++)this.ruler.push(sr[e][0],sr[e][1]);this.ruler2=new L;for(let e=0;e<ur.length;e++)this.ruler2.push(ur[e][0],ur[e][1])}Je.prototype.skipToken=function(e){const t=e.pos,r=this.ruler.getRules(""),a=r.length,n=e.md.options.maxNesting,s=e.cache;if(typeof s[t]<"u"){e.pos=s[t];return}let u=!1;if(e.level<n){for(let i=0;i<a;i++)if(e.level++,u=r[i](e,!0),e.level--,u){if(t>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}else e.pos=e.posMax;u||e.pos++,s[t]=e.pos},Je.prototype.tokenize=function(e){const t=this.ruler.getRules(""),r=t.length,a=e.posMax,n=e.md.options.maxNesting;for(;e.pos<a;){const s=e.pos;let u=!1;if(e.level<n){for(let i=0;i<r;i++)if(u=t[i](e,!1),u){if(s>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}if(u){if(e.pos>=a)break;continue}e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()},Je.prototype.parse=function(e,t,r,a){const n=new this.State(e,t,r,a);this.tokenize(n);const s=this.ruler2.getRules(""),u=s.length;for(let i=0;i<u;i++)s[i](n)},Je.prototype.State=Qe;function Qo(e){const t={};e=e||{},t.src_Any=Ea.source,t.src_Cc=Sa.source,t.src_Z=Da.source,t.src_P=Qt.source,t.src_ZPCc=[t.src_Z,t.src_P,t.src_Cc].join("|"),t.src_ZCc=[t.src_Z,t.src_Cc].join("|");const r="[><｜]";return t.src_pseudo_letter="(?:(?!"+r+"|"+t.src_ZPCc+")"+t.src_Any+")",t.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",t.src_auth="(?:(?:(?!"+t.src_ZCc+"|[@/\\[\\]()]).)+@)?",t.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",t.src_host_terminator="(?=$|"+r+"|"+t.src_ZPCc+")(?!"+(e["---"]?"-(?!--)|":"-|")+"_|:\\d|\\.-|\\.(?!$|"+t.src_ZPCc+"))",t.src_path="(?:[/?#](?:(?!"+t.src_ZCc+"|"+r+`|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!`+t.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+t.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+t.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+t.src_ZCc+`|["]).)+\\"|\\'(?:(?!`+t.src_ZCc+"|[']).)+\\'|\\'(?="+t.src_pseudo_letter+"|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!"+t.src_ZCc+"|[.]|$)|"+(e["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+",(?!"+t.src_ZCc+"|$)|;(?!"+t.src_ZCc+"|$)|\\!+(?!"+t.src_ZCc+"|[!]|$)|\\?(?!"+t.src_ZCc+"|[?]|$))+|\\/)?",t.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',t.src_xn="xn--[a-z0-9\\-]{1,59}",t.src_domain_root="(?:"+t.src_xn+"|"+t.src_pseudo_letter+"{1,63})",t.src_domain="(?:"+t.src_xn+"|(?:"+t.src_pseudo_letter+")|(?:"+t.src_pseudo_letter+"(?:-|"+t.src_pseudo_letter+"){0,61}"+t.src_pseudo_letter+"))",t.src_host="(?:(?:(?:(?:"+t.src_domain+")\\.)*"+t.src_domain+"))",t.tpl_host_fuzzy="(?:"+t.src_ip4+"|(?:(?:(?:"+t.src_domain+")\\.)+(?:%TLDS%)))",t.tpl_host_no_ip_fuzzy="(?:(?:(?:"+t.src_domain+")\\.)+(?:%TLDS%))",t.src_host_strict=t.src_host+t.src_host_terminator,t.tpl_host_fuzzy_strict=t.tpl_host_fuzzy+t.src_host_terminator,t.src_host_port_strict=t.src_host+t.src_port+t.src_host_terminator,t.tpl_host_port_fuzzy_strict=t.tpl_host_fuzzy+t.src_port+t.src_host_terminator,t.tpl_host_port_no_ip_fuzzy_strict=t.tpl_host_no_ip_fuzzy+t.src_port+t.src_host_terminator,t.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+t.src_ZPCc+"|>|$))",t.tpl_email_fuzzy="(^|"+r+'|"|\\(|'+t.src_ZCc+")("+t.src_email_name+"@"+t.tpl_host_fuzzy_strict+")",t.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+t.src_ZPCc+"))((?![$+<=>^`|｜])"+t.tpl_host_port_fuzzy_strict+t.src_path+")",t.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+t.src_ZPCc+"))((?![$+<=>^`|｜])"+t.tpl_host_port_no_ip_fuzzy_strict+t.src_path+")",t}function ir(e){return Array.prototype.slice.call(arguments,1).forEach(function(r){r&&Object.keys(r).forEach(function(a){e[a]=r[a]})}),e}function vt(e){return Object.prototype.toString.call(e)}function Jo(e){return vt(e)==="[object String]"}function Ko(e){return vt(e)==="[object Object]"}function Xo(e){return vt(e)==="[object RegExp]"}function Qa(e){return vt(e)==="[object Function]"}function el(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const Ja={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function tl(e){return Object.keys(e||{}).reduce(function(t,r){return t||Ja.hasOwnProperty(r)},!1)}const rl={"http:":{validate:function(e,t,r){const a=e.slice(t);return r.re.http||(r.re.http=new RegExp("^\\/\\/"+r.re.src_auth+r.re.src_host_port_strict+r.re.src_path,"i")),r.re.http.test(a)?a.match(r.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(e,t,r){const a=e.slice(t);return r.re.no_http||(r.re.no_http=new RegExp("^"+r.re.src_auth+"(?:localhost|(?:(?:"+r.re.src_domain+")\\.)+"+r.re.src_domain_root+")"+r.re.src_port+r.re.src_host_terminator+r.re.src_path,"i")),r.re.no_http.test(a)?t>=3&&e[t-3]===":"||t>=3&&e[t-3]==="/"?0:a.match(r.re.no_http)[0].length:0}},"mailto:":{validate:function(e,t,r){const a=e.slice(t);return r.re.mailto||(r.re.mailto=new RegExp("^"+r.re.src_email_name+"@"+r.re.src_host_strict,"i")),r.re.mailto.test(a)?a.match(r.re.mailto)[0].length:0}}},al="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",nl="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function sl(e){return function(t,r){const a=t.slice(r);return e.test(a)?a.match(e)[0].length:0}}function Ka(){return function(e,t){t.normalize(e)}}function wt(e){const t=e.re=Qo(e.__opts__),r=e.__tlds__.slice();e.onCompile(),e.__tlds_replaced__||r.push(al),r.push(t.src_xn),t.src_tlds=r.join("|");function a(i){return i.replace("%TLDS%",t.src_tlds)}t.email_fuzzy=RegExp(a(t.tpl_email_fuzzy),"i"),t.email_fuzzy_global=RegExp(a(t.tpl_email_fuzzy),"ig"),t.link_fuzzy=RegExp(a(t.tpl_link_fuzzy),"i"),t.link_fuzzy_global=RegExp(a(t.tpl_link_fuzzy),"ig"),t.link_no_ip_fuzzy=RegExp(a(t.tpl_link_no_ip_fuzzy),"i"),t.link_no_ip_fuzzy_global=RegExp(a(t.tpl_link_no_ip_fuzzy),"ig"),t.host_fuzzy_test=RegExp(a(t.tpl_host_fuzzy_test),"i");const n=[];e.__compiled__={};function s(i,o){throw new Error('(LinkifyIt) Invalid schema "'+i+'": '+o)}Object.keys(e.__schemas__).forEach(function(i){const o=e.__schemas__[i];if(o===null)return;const l={validate:null,link:null};if(e.__compiled__[i]=l,Ko(o)){Xo(o.validate)?l.validate=sl(o.validate):Qa(o.validate)?l.validate=o.validate:s(i,o),Qa(o.normalize)?l.normalize=o.normalize:o.normalize?s(i,o):l.normalize=Ka();return}if(Jo(o)){n.push(i);return}s(i,o)}),n.forEach(function(i){e.__compiled__[e.__schemas__[i]]&&(e.__compiled__[i].validate=e.__compiled__[e.__schemas__[i]].validate,e.__compiled__[i].normalize=e.__compiled__[e.__schemas__[i]].normalize)}),e.__compiled__[""]={validate:null,normalize:Ka()};const u=Object.keys(e.__compiled__).filter(function(i){return i.length>0&&e.__compiled__[i]}).map(el).join("|");e.re.schema_test=RegExp("(^|(?!_)(?:[><｜]|"+t.src_ZPCc+"))("+u+")","i"),e.re.schema_search=RegExp("(^|(?!_)(?:[><｜]|"+t.src_ZPCc+"))("+u+")","ig"),e.re.schema_at_start=RegExp("^"+e.re.schema_search.source,"i"),e.re.pretest=RegExp("("+e.re.schema_test.source+")|("+e.re.host_fuzzy_test.source+")|@","i")}function Xa(e,t,r,a){const n=e.slice(r,a);this.schema=t.toLowerCase(),this.index=r,this.lastIndex=a,this.raw=n,this.text=n,this.url=n}function B(e,t){if(!(this instanceof B))return new B(e,t);t||tl(e)&&(t=e,e={}),this.__opts__=ir({},Ja,t),this.__schemas__=ir({},rl,e),this.__compiled__={},this.__tlds__=nl,this.__tlds_replaced__=!1,this.re={},wt(this)}B.prototype.add=function(t,r){return this.__schemas__[t]=r,wt(this),this},B.prototype.set=function(t){return this.__opts__=ir(this.__opts__,t),this},B.prototype.test=function(t){if(!t.length)return!1;let r,a;if(this.re.schema_test.test(t)){for(a=this.re.schema_search,a.lastIndex=0;(r=a.exec(t))!==null;)if(this.testSchemaAt(t,r[2],a.lastIndex))return!0}return!!(this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&t.search(this.re.host_fuzzy_test)>=0&&t.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy)!==null||this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&t.indexOf("@")>=0&&t.match(this.re.email_fuzzy)!==null)},B.prototype.pretest=function(t){return this.re.pretest.test(t)},B.prototype.testSchemaAt=function(t,r,a){return this.__compiled__[r.toLowerCase()]?this.__compiled__[r.toLowerCase()].validate(t,a,this):0},B.prototype.match=function(t){const r=[],a=[],n=[],s=[];let u,i,o;function l(f,h){return f?h?f.index!==h.index?f.index<h.index?f:h:f.lastIndex>=h.lastIndex?f:h:f:h}if(!t.length)return null;if(this.re.schema_test.test(t))for(o=this.re.schema_search,o.lastIndex=0;(u=o.exec(t))!==null;)i=this.testSchemaAt(t,u[2],o.lastIndex),i&&a.push({schema:u[2],index:u.index+u[1].length,lastIndex:u.index+u[0].length+i});if(this.__opts__.fuzzyLink&&this.__compiled__["http:"])for(o=this.__opts__.fuzzyIP?this.re.link_fuzzy_global:this.re.link_no_ip_fuzzy_global,o.lastIndex=0;(u=o.exec(t))!==null;)n.push({schema:"",index:u.index+u[1].length,lastIndex:u.index+u[0].length});if(this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"])for(o=this.re.email_fuzzy_global,o.lastIndex=0;(u=o.exec(t))!==null;)s.push({schema:"mailto:",index:u.index+u[1].length,lastIndex:u.index+u[0].length});const c=[0,0,0];let d=0;for(;;){const f=[a[c[0]],s[c[1]],n[c[2]]],h=l(l(f[0],f[1]),f[2]);if(!h)break;if(h===f[0]?c[0]++:h===f[1]?c[1]++:c[2]++,h.index<d)continue;const p=new Xa(t,h.schema,h.index,h.lastIndex);this.__compiled__[p.schema].normalize(p,this),r.push(p),d=h.lastIndex}return r.length?r:null},B.prototype.matchAtStart=function(t){if(!t.length)return null;const r=this.re.schema_at_start.exec(t);if(!r)return null;const a=this.testSchemaAt(t,r[2],r[0].length);if(!a)return null;const n=new Xa(t,r[2],r.index+r[1].length,r.index+r[0].length+a);return this.__compiled__[n.schema].normalize(n,this),n},B.prototype.tlds=function(t,r){return t=Array.isArray(t)?t:[t],r?(this.__tlds__=this.__tlds__.concat(t).sort().filter(function(a,n,s){return a!==s[n-1]}).reverse(),wt(this),this):(this.__tlds__=t.slice(),this.__tlds_replaced__=!0,wt(this),this)},B.prototype.normalize=function(t){t.schema||(t.url="http://"+t.url),t.schema==="mailto:"&&!/^mailto:/i.test(t.url)&&(t.url="mailto:"+t.url)},B.prototype.onCompile=function(){};const Te=2147483647,J=36,or=1,Ke=26,ul=38,il=700,en=72,tn=128,rn="-",ol=/^xn--/,ll=/[^\0-\x7F]/,cl=/[\x2E\u3002\uFF0E\uFF61]/g,dl={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},lr=J-or,K=Math.floor,cr=String.fromCharCode;function ie(e){throw new RangeError(dl[e])}function pl(e,t){const r=[];let a=e.length;for(;a--;)r[a]=t(e[a]);return r}function an(e,t){const r=e.split("@");let a="";r.length>1&&(a=r[0]+"@",e=r[1]),e=e.replace(cl,".");const n=e.split("."),s=pl(n,t).join(".");return a+s}function nn(e){const t=[];let r=0;const a=e.length;for(;r<a;){const n=e.charCodeAt(r++);if(n>=55296&&n<=56319&&r<a){const s=e.charCodeAt(r++);(s&64512)==56320?t.push(((n&1023)<<10)+(s&1023)+65536):(t.push(n),r--)}else t.push(n)}return t}const hl=e=>String.fromCodePoint(...e),fl=function(e){return e>=48&&e<58?26+(e-48):e>=65&&e<91?e-65:e>=97&&e<123?e-97:J},sn=function(e,t){return e+22+75*(e<26)-((t!=0)<<5)},un=function(e,t,r){let a=0;for(e=r?K(e/il):e>>1,e+=K(e/t);e>lr*Ke>>1;a+=J)e=K(e/lr);return K(a+(lr+1)*e/(e+ul))},on=function(e){const t=[],r=e.length;let a=0,n=tn,s=en,u=e.lastIndexOf(rn);u<0&&(u=0);for(let i=0;i<u;++i)e.charCodeAt(i)>=128&&ie("not-basic"),t.push(e.charCodeAt(i));for(let i=u>0?u+1:0;i<r;){const o=a;for(let c=1,d=J;;d+=J){i>=r&&ie("invalid-input");const f=fl(e.charCodeAt(i++));f>=J&&ie("invalid-input"),f>K((Te-a)/c)&&ie("overflow"),a+=f*c;const h=d<=s?or:d>=s+Ke?Ke:d-s;if(f<h)break;const p=J-h;c>K(Te/p)&&ie("overflow"),c*=p}const l=t.length+1;s=un(a-o,l,o==0),K(a/l)>Te-n&&ie("overflow"),n+=K(a/l),a%=l,t.splice(a++,0,n)}return String.fromCodePoint(...t)},ln=function(e){const t=[];e=nn(e);const r=e.length;let a=tn,n=0,s=en;for(const o of e)o<128&&t.push(cr(o));const u=t.length;let i=u;for(u&&t.push(rn);i<r;){let o=Te;for(const c of e)c>=a&&c<o&&(o=c);const l=i+1;o-a>K((Te-n)/l)&&ie("overflow"),n+=(o-a)*l,a=o;for(const c of e)if(c<a&&++n>Te&&ie("overflow"),c===a){let d=n;for(let f=J;;f+=J){const h=f<=s?or:f>=s+Ke?Ke:f-s;if(d<h)break;const p=d-h,w=J-h;t.push(cr(sn(h+p%w,0))),d=K(p/w)}t.push(cr(sn(d,0))),s=un(n,l,i===u),n=0,++i}++n,++a}return t.join("")},cn={version:"2.3.1",ucs2:{decode:nn,encode:hl},decode:on,encode:ln,toASCII:function(e){return an(e,function(t){return ll.test(t)?"xn--"+ln(t):t})},toUnicode:function(e){return an(e,function(t){return ol.test(t)?on(t.slice(4).toLowerCase()):t})}},gl={default:{options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},zero:{options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},commonmark:{options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}}},bl=/^(vbscript|javascript|file|data):/,ml=/^data:image\/(gif|png|jpeg|webp);/;function xl(e){const t=e.trim().toLowerCase();return bl.test(t)?ml.test(t):!0}const dn=["http:","https:","mailto:"];function yl(e){const t=Yt(e,!0);if(t.hostname&&(!t.protocol||dn.indexOf(t.protocol)>=0))try{t.hostname=cn.toASCII(t.hostname)}catch{}return Ge(Zt(t))}function vl(e){const t=Yt(e,!0);if(t.hostname&&(!t.protocol||dn.indexOf(t.protocol)>=0))try{t.hostname=cn.toUnicode(t.hostname)}catch{}return ke(Zt(t),ke.defaultChars+"%")}function q(e,t){if(!(this instanceof q))return new q(e,t);t||Xt(e)||(t=e||{},e="default"),this.inline=new Je,this.block=new yt,this.core=new rr,this.renderer=new Se,this.linkify=new B,this.validateLink=xl,this.normalizeLink=yl,this.normalizeLinkText=vl,this.utils=$i,this.helpers=ft({},Ri),this.options={},this.configure(e),t&&this.set(t)}q.prototype.set=function(e){return ft(this.options,e),this},q.prototype.configure=function(e){const t=this;if(Xt(e)){const r=e;if(e=gl[r],!e)throw new Error('Wrong `markdown-it` preset "'+r+'", check name')}if(!e)throw new Error("Wrong `markdown-it` preset, can't be empty");return e.options&&t.set(e.options),e.components&&Object.keys(e.components).forEach(function(r){e.components[r].rules&&t[r].ruler.enableOnly(e.components[r].rules),e.components[r].rules2&&t[r].ruler2.enableOnly(e.components[r].rules2)}),this},q.prototype.enable=function(e,t){let r=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(n){r=r.concat(this[n].ruler.enable(e,!0))},this),r=r.concat(this.inline.ruler2.enable(e,!0));const a=e.filter(function(n){return r.indexOf(n)<0});if(a.length&&!t)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+a);return this},q.prototype.disable=function(e,t){let r=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(n){r=r.concat(this[n].ruler.disable(e,!0))},this),r=r.concat(this.inline.ruler2.disable(e,!0));const a=e.filter(function(n){return r.indexOf(n)<0});if(a.length&&!t)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+a);return this},q.prototype.use=function(e){const t=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,t),this},q.prototype.parse=function(e,t){if(typeof e!="string")throw new Error("Input data should be a String");const r=new this.core.State(e,this,t);return this.core.process(r),r.tokens},q.prototype.render=function(e,t){return t=t||{},this.renderer.render(this.parse(e,t),this.options,t)},q.prototype.parseInline=function(e,t){const r=new this.core.State(e,this,t);return r.inlineMode=!0,this.core.process(r),r.tokens},q.prototype.renderInline=function(e,t){return t=t||{},this.renderer.render(this.parseInline(e,t),this.options,t)};const _t=new q({breaks:!0,html:!1,linkify:!1,typographer:!1}),wl=_t.renderer.rules.link_open??((e,t,r,a,n)=>n.renderToken(e,t,r));_t.renderer.rules.link_open=(e,t,r,a,n)=>{const s=e[t],u=s.attrGet("href");return u&&!_t.validateLink(u)&&s.attrSet("href",""),s.attrSet("target","_blank"),s.attrSet("rel","noopener noreferrer"),wl(e,t,r,a,n)};function De(e=new Date){return`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`}function pn(e){return _t.render(_l(e))}function _l(e){return e.replace(/\r\n?/g,`
`).replace(/([^\n])---(?=#{1,6})/g,`$1

---

`).replace(/(^|\n)---(?=#{1,6})/g,`$1---

`).replace(/([^\n#])(#{1,6})(?=[^\s#])/g,`$1

$2`).replace(/(^|\n)(#{1,6})(?=[^\s#])/g,"$1$2 ").replace(/([:：])-(?=(?:\*\*|【|[\p{L}\p{N}]))/gu,`$1
- `).replace(/([^\n])-(?=\*\*)/g,`$1
- `).replace(/(^|\n)-(?=\S)/g,"$1- ")}const Cl=ye`
  :host {
    --rag-text: #18181b;
    --rag-muted: #71717a;
    --rag-line: rgba(24, 24, 27, 0.1);
    --rag-soft-line: rgba(24, 24, 27, 0.06);
    --rag-paper: rgba(255, 255, 255, 0.97);
    --rag-panel: #fafafa;
    --rag-secondary: #f4f4f5;
    --rag-secondary-soft: rgba(244, 244, 245, 0.62);
    --rag-gold: #a16207;
    --rag-gold-strong: #85510a;
    --rag-gold-soft: rgba(161, 98, 7, 0.16);
    --rag-gold-faint: rgba(161, 98, 7, 0.05);
    --rag-input-surface-resolved: color-mix(in srgb, var(--rag-panel) 90%, white);
    --rag-user-message-start: var(--rag-gold);
    --rag-user-message-end: var(--rag-gold-strong);
    --rag-ring: color-mix(in srgb, var(--rag-gold) 42%, transparent);
    --rag-frost: color-mix(in srgb, var(--rag-paper) 74%, transparent);
    --rag-primary-contrast: #fff;
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 99999;
    display: block;
    color: var(--rag-text);
    font-size: 14px;
    line-height: 1.5;
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      'PingFang SC',
      'Hiragino Sans GB',
      'Microsoft YaHei',
      ui-sans-serif,
      sans-serif;
    letter-spacing: 0;
    text-rendering: geometricPrecision;
  }

  :host([position='left']) {
    right: auto;
    left: 24px;
  }

  * {
    box-sizing: border-box;
  }

  button,
  textarea {
    font: inherit;
  }

  button {
    -webkit-tap-highlight-color: transparent;
  }

  button:focus-visible,
  textarea:focus-visible,
  summary:focus-visible,
  a:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--rag-gold) 14%, transparent),
      0 6px 16px rgba(15, 23, 42, 0.06);
  }

  .iconify-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    flex: 0 0 auto;
    background: currentColor;
    mask: var(--rag-icon-source) center / contain no-repeat;
    -webkit-mask: var(--rag-icon-source) center / contain no-repeat;
  }

  @keyframes pet-panel-in {
    from {
      opacity: 0;
      transform: translateY(9px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes stage-backdrop-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes stage-in {
    from {
      opacity: 0;
      transform: translateY(16px) scale(0.985);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes message-in {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes source-list-in {
    from {
      opacity: 0;
      transform: translateY(-3px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes typing {
    0%,
    80%,
    100% {
      transform: translateY(0);
      opacity: 0.38;
    }
    40% {
      transform: translateY(-4px);
      opacity: 1;
    }
  }
`,Al=ye`
  .composer-wrap {
    width: min(640px, 100%);
    margin: 0 auto;
  }

  .composer,
  .pet-composer {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    padding: 7px 7px 7px 11px;
    border: 1px solid color-mix(in srgb, var(--rag-line) 82%, var(--rag-gold) 8%);
    border-radius: 16px;
    background: color-mix(in srgb, var(--rag-input-surface-resolved) 90%, white);
    box-shadow: 0 8px 18px rgba(15, 23, 42, 0.055);
    transition:
      border-color 0.16s ease,
      box-shadow 0.16s ease,
      background 0.16s ease;
  }

  .composer:focus-within,
  .pet-composer:focus-within {
    border-color: var(--rag-ring);
    background: var(--rag-paper);
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--rag-gold) 13%, transparent),
      0 8px 18px rgba(15, 23, 42, 0.055);
  }

  .input,
  .pet-composer-input {
    flex: 1;
    min-width: 0;
    max-height: 118px;
    min-height: 30px;
    padding: 8px 0;
    resize: none;
    border: 0;
    outline: none;
    background: transparent;
    color: var(--rag-text);
    font-size: 13px;
    line-height: 1.5;
  }

  .pet-composer-input {
    max-height: 92px;
    min-height: 28px;
    padding: 7px 0;
  }

  .input:focus-visible,
  .pet-composer-input:focus-visible {
    outline: none;
    box-shadow: none;
  }

  .input::placeholder,
  .pet-composer-input::placeholder {
    color: color-mix(in srgb, var(--rag-muted) 78%, transparent);
  }

  .send,
  .pet-send {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    padding: 0;
    border: 0;
    border-radius: 12px;
    color: var(--rag-primary-contrast);
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--rag-gold) 92%, white), var(--rag-gold-strong));
    box-shadow:
      0 8px 18px color-mix(in srgb, var(--rag-gold) 17%, transparent),
      inset 0 1px 0 rgba(255, 255, 255, 0.22);
    cursor: pointer;
    transition:
      transform 0.14s ease,
      filter 0.14s ease,
      opacity 0.14s ease;
  }

  .pet-send {
    width: 34px;
    height: 34px;
  }

  .send:hover:not(:disabled),
  .pet-send:hover:not(:disabled) {
    transform: translateY(-1px);
    filter: brightness(1.03);
  }

  .send:active:not(:disabled),
  .pet-send:active:not(:disabled) {
    transform: translateY(0) scale(0.96);
  }

  .send:disabled,
  .pet-send:disabled {
    cursor: not-allowed;
    opacity: 0.44;
    box-shadow: none;
  }

  .send svg,
  .send .iconify-icon,
  .pet-send svg,
  .pet-send .iconify-icon {
    width: 18px;
    height: 18px;
  }
`,kl=ye`
  .message-text {
    display: block;
    white-space: pre-wrap;
  }

  .markdown-body {
    white-space: normal;
  }

  .markdown-body :first-child {
    margin-top: 0;
  }

  .markdown-body :last-child {
    margin-bottom: 0;
  }

  .markdown-body p {
    margin: 0 0 10px;
  }

  .markdown-body h1,
  .markdown-body h2,
  .markdown-body h3,
  .markdown-body h4,
  .markdown-body h5,
  .markdown-body h6 {
    margin: 10px 0 6px;
    color: var(--rag-text);
    font-size: 14px;
    line-height: 1.45;
    font-weight: 850;
  }

  .markdown-body ul,
  .markdown-body ol {
    margin: 6px 0 10px;
    padding-left: 20px;
  }

  .markdown-body li {
    margin: 3px 0;
  }

  .markdown-body strong {
    font-weight: 850;
  }

  .markdown-body em {
    color: color-mix(in srgb, var(--rag-text) 88%, var(--rag-gold-strong));
  }

  .markdown-body hr {
    height: 1px;
    margin: 12px 0;
    border: 0;
    background: color-mix(in srgb, var(--rag-line) 76%, transparent);
  }

  .markdown-body code {
    padding: 1px 5px 2px;
    border-radius: 6px;
    background: color-mix(in srgb, var(--rag-text) 7%, transparent);
    color: color-mix(in srgb, var(--rag-text) 76%, var(--rag-gold-strong));
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.92em;
  }

  .markdown-body pre {
    max-width: 100%;
    margin: 8px 0 10px;
    padding: 11px 12px;
    overflow-x: auto;
    border-radius: 10px;
    background: #0f172a;
    color: #f8fafc;
  }

  .markdown-body pre code {
    padding: 0;
    color: inherit;
    background: transparent;
  }

  .markdown-body blockquote {
    margin: 8px 0 10px;
    padding: 8px 10px;
    border-left: 3px solid var(--rag-gold);
    border-radius: 0 12px 12px 0;
    background: color-mix(in srgb, var(--rag-secondary-soft) 64%, transparent);
    color: color-mix(in srgb, var(--rag-text) 72%, var(--rag-muted));
  }

  .markdown-body table {
    display: block;
    width: 100%;
    margin: 8px 0 10px;
    overflow-x: auto;
    border-collapse: collapse;
  }

  .markdown-body th,
  .markdown-body td {
    padding: 6px 8px;
    border: 1px solid color-mix(in srgb, var(--rag-line) 72%, transparent);
    text-align: left;
    vertical-align: top;
  }

  .markdown-body th {
    background: color-mix(in srgb, var(--rag-secondary-soft) 58%, transparent);
    font-weight: 820;
  }

  .markdown-body a {
    color: var(--rag-gold-strong);
    font-weight: 750;
    text-decoration: none;
    border-bottom: 1px solid color-mix(in srgb, var(--rag-gold) 32%, transparent);
  }

  .typing {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-left: 8px;
    min-width: 46px;
    height: 18px;
    vertical-align: middle;
  }

  .typing span {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--rag-gold);
    animation: typing 1.05s cubic-bezier(0.45, 0, 0.55, 1) infinite;
  }

  .typing span:nth-child(2) {
    animation-delay: 0.12s;
  }

  .typing span:nth-child(3) {
    animation-delay: 0.24s;
  }

  .pet-compact-sources {
    margin-top: 8px;
    animation: source-list-in 0.16s ease-out;
  }

  .pet-source-list {
    display: grid;
    gap: 5px;
    padding: 5px;
    border: 1px solid color-mix(in srgb, var(--rag-line) 64%, transparent);
    border-radius: 13px;
    background: color-mix(in srgb, var(--rag-paper) 78%, transparent);
  }

  .pet-source-row {
    display: grid;
    grid-template-columns: 22px minmax(0, 1fr) 16px;
    align-items: start;
    gap: 7px;
    min-height: 32px;
    padding: 5px 7px;
    border-radius: 10px;
    color: #334155;
    text-decoration: none;
    transition:
      background 0.14s ease,
      color 0.14s ease;
  }

  .pet-source-row:hover {
    color: var(--rag-text);
    background: color-mix(in srgb, var(--rag-gold-faint) 74%, white);
  }

  .pet-source-icon,
  .pet-source-open {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--rag-gold-strong);
  }

  .pet-source-icon {
    width: 22px;
    height: 22px;
    margin-top: 1px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--rag-gold-soft) 34%, transparent);
  }

  .pet-source-main {
    display: grid;
    min-width: 0;
    gap: 2px;
  }

  .pet-source-title {
    overflow: hidden;
    color: inherit;
    font-size: 12px;
    font-weight: 720;
    line-height: 1.3;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pet-source-meta {
    overflow: hidden;
    color: color-mix(in srgb, var(--rag-muted) 82%, transparent);
    font-size: 10.5px;
    font-weight: 650;
    line-height: 1.25;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pet-source-icon svg,
  .pet-source-icon .iconify-icon,
  .pet-source-open svg,
  .pet-source-open .iconify-icon {
    width: 14px;
    height: 14px;
  }

  .selection-popover {
    position: fixed;
    z-index: 100000;
    transform: translate(-50%, -100%);
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 5px;
    border-radius: 999px;
    background: var(--rag-frost);
    border: 1px solid var(--rag-line);
    box-shadow:
      0 18px 44px rgba(18, 18, 18, 0.16),
      inset 0 1px 0 rgba(255, 255, 255, 0.34);
    backdrop-filter: blur(18px) saturate(1.08);
    animation: source-list-in 0.14s ease-out;
  }

  .selection-popover button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 30px;
    border: 0;
    border-radius: 999px;
    padding: 0 13px;
    color: var(--rag-text);
    font-size: 13px;
    font-weight: 720;
    background: transparent;
    cursor: pointer;
  }

  .selection-popover button:hover {
    background: var(--rag-secondary-soft);
  }

  .selection-popover svg,
  .selection-popover .iconify-icon {
    width: 16px;
    height: 16px;
  }
`,El=ye`
  .bubble-wrapper {
    position: relative;
    z-index: 100001;
    display: inline-flex;
    width: var(--rag-pet-width, 76px);
    height: var(--rag-pet-height, 82px);
  }

  .bubble {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--rag-pet-width, 76px);
    min-width: var(--rag-pet-width, 76px);
    height: var(--rag-pet-height, 82px);
    padding: 0;
    border: 0;
    color: inherit;
    background: transparent;
    box-shadow: none;
    cursor: pointer;
    touch-action: none;
    user-select: none;
    overflow: visible;
    appearance: none;
    -webkit-appearance: none;
    transition:
      transform 0.22s cubic-bezier(0.2, 0.82, 0.2, 1),
      filter 0.18s ease;
  }

  .bubble:hover,
  .bubble:focus-visible {
    transform: translateY(-2px);
    filter: saturate(1.04);
  }

  .bubble:active {
    transform: translateY(0) scale(0.98);
  }

  .bubble.dragging,
  .bubble.dragging:hover,
  .bubble.dragging:focus-visible {
    cursor: grabbing;
    transform: scale(0.985);
    transition: none;
  }

  .pet-sprite {
    position: relative;
    z-index: 2;
    display: block;
    width: var(--rag-pet-width, 76px);
    height: var(--rag-pet-height, 82px);
    background-repeat: no-repeat;
    background-position:
      var(--rag-pet-frame-x, 0)
      var(--rag-pet-frame-y, 0);
    background-size:
      var(--rag-pet-sheet-width, 608px)
      var(--rag-pet-sheet-height, 738px);
    filter: drop-shadow(0 14px 20px rgba(15, 23, 42, 0.23));
    image-rendering: pixelated;
    transition:
      filter 0.18s ease,
      transform 0.18s ease;
  }

  .bubble:hover .pet-sprite,
  .bubble:focus-visible .pet-sprite {
    filter:
      drop-shadow(0 16px 24px rgba(15, 23, 42, 0.24))
      drop-shadow(0 0 14px color-mix(in srgb, var(--rag-gold) 28%, transparent));
  }

  .bubble.dragging .pet-sprite {
    filter: drop-shadow(0 18px 24px rgba(15, 23, 42, 0.28));
  }

  .pet-speech {
    position: absolute;
    z-index: 1;
    bottom: calc(100% + 8px);
    width: max-content;
    max-width: min(196px, calc(100vw - 32px));
    padding: 8px 10px;
    border: 1px solid color-mix(in srgb, var(--rag-line) 58%, white);
    border-radius: 16px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(248, 250, 252, 0.82));
    color: #334155;
    box-shadow:
      0 10px 24px rgba(15, 23, 42, 0.11),
      inset 0 1px 0 rgba(255, 255, 255, 0.72);
    font-size: 12px;
    font-weight: 620;
    line-height: 1.38;
    text-align: left;
    white-space: normal;
    pointer-events: none;
    opacity: 0;
    transform: translateY(7px) scale(0.94);
    transform-origin: bottom center;
    transition:
      opacity 0.24s ease,
      transform 0.34s cubic-bezier(0.18, 0.89, 0.32, 1.16);
    backdrop-filter: blur(14px) saturate(1.08);
    -webkit-backdrop-filter: blur(14px) saturate(1.08);
  }

  .pet-speech.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  :host([position='right']) .pet-speech,
  :host([position='right']) .pet-panel {
    right: 0;
  }

  :host([position='left']) .pet-speech,
  :host([position='left']) .pet-panel {
    left: 0;
  }

  .pet-panel {
    position: absolute;
    z-index: 4;
    bottom: calc(100% + 12px);
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    width: min(410px, calc(100vw - 32px));
    height: min(var(--rag-pet-panel-height, 318px), calc(100dvh - 132px));
    padding: 13px;
    border: 1px solid color-mix(in srgb, var(--rag-line) 62%, white);
    border-radius: var(--rag-radius-panel, 20px);
    background:
      radial-gradient(circle at 14% 0%, color-mix(in srgb, var(--rag-gold) 11%, transparent), transparent 34%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.97), color-mix(in srgb, var(--rag-panel) 92%, white));
    box-shadow:
      0 22px 58px rgba(15, 23, 42, 0.18),
      0 8px 20px rgba(15, 23, 42, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.72);
    text-align: left;
    overflow: hidden;
    transform-origin: bottom right;
    animation: pet-panel-in 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    backdrop-filter: blur(18px) saturate(1.05);
    -webkit-backdrop-filter: blur(18px) saturate(1.05);
  }

  .pet-panel.resizing {
    animation: none;
    user-select: none;
  }

  .pet-panel-resize {
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 2;
    width: 72px;
    height: 18px;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: transparent;
    cursor: ns-resize;
    transform: translateX(-50%);
    touch-action: none;
  }

  .pet-panel-resize::before {
    content: "";
    position: absolute;
    top: 5px;
    left: 16px;
    right: 16px;
    height: 3px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--rag-muted) 28%, transparent);
    opacity: 0.52;
    transition:
      opacity 0.14s ease,
      background 0.14s ease,
      transform 0.14s ease;
  }

  .pet-panel-resize:hover::before,
  .pet-panel-resize:focus-visible::before,
  .pet-panel.resizing .pet-panel-resize::before {
    opacity: 0.9;
    background: color-mix(in srgb, var(--rag-gold) 54%, var(--rag-muted));
    transform: scaleX(1.18);
  }

  .pet-panel-content {
    display: flex;
    flex-direction: column;
    min-height: 0;
    /* 网格项默认 min-width: auto，代码块的 min-content 宽度会把内容撑出面板并被裁掉 */
    min-width: 0;
  }

  .pet-panel-thread {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 0;
    margin-bottom: 10px;
    overflow: auto;
    padding: 2px 2px 4px;
    scroll-behavior: smooth;
    scrollbar-width: thin;
  }

  .pet-panel-message {
    display: flex;
    flex-direction: column;
    gap: 5px;
    max-width: 92%;
    min-width: 0;
  }

  .pet-panel-message.user {
    align-self: flex-end;
    align-items: flex-end;
  }

  .pet-panel-message.assistant {
    align-self: flex-start;
    align-items: flex-start;
  }

  .pet-panel-message-meta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: color-mix(in srgb, var(--rag-muted) 82%, transparent);
    font-size: 10.5px;
    font-weight: 680;
    line-height: 1;
  }

  .pet-message-actions {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    opacity: 0;
    transform: translateY(1px);
    transition:
      opacity 0.14s ease,
      transform 0.14s ease;
  }

  .pet-panel-message:hover .pet-message-actions,
  .pet-panel-message:focus-within .pet-message-actions {
    opacity: 1;
    transform: translateY(0);
  }

  .pet-message-actions button {
    display: inline-grid;
    place-items: center;
    width: 20px;
    height: 20px;
    padding: 0;
    border: 1px solid color-mix(in srgb, var(--rag-line) 68%, transparent);
    border-radius: 999px;
    color: color-mix(in srgb, var(--rag-muted) 82%, var(--rag-text));
    background: color-mix(in srgb, var(--rag-paper) 82%, transparent);
    cursor: pointer;
  }

  .pet-message-actions button:hover:not(:disabled) {
    color: var(--rag-gold-strong);
    border-color: color-mix(in srgb, var(--rag-gold) 24%, var(--rag-line));
  }

  .pet-message-actions button:disabled {
    cursor: not-allowed;
    opacity: 0.42;
  }

  .pet-message-actions svg,
  .pet-message-actions .iconify-icon {
    width: 12px;
    height: 12px;
  }

  .pet-panel-message-meta time {
    font-weight: 560;
  }

  .pet-panel-bubble {
    max-width: 100%;
    padding: 9px 10px;
    border: 1px solid color-mix(in srgb, var(--rag-line) 68%, transparent);
    border-radius: 14px;
    color: #263244;
    background: color-mix(in srgb, var(--rag-paper) 84%, transparent);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.54);
    font-size: 12.8px;
    line-height: 1.62;
    overflow-wrap: anywhere;
  }

  .pet-panel-message.user .pet-panel-bubble {
    color: var(--rag-primary-contrast);
    border-color: color-mix(in srgb, var(--rag-gold) 46%, transparent);
    background:
      linear-gradient(145deg, var(--rag-user-message-start), var(--rag-user-message-end));
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.18) inset,
      0 8px 18px color-mix(in srgb, var(--rag-gold) 12%, transparent);
  }

  .pet-panel-bubble.error {
    color: #9f1d1d;
    border-color: rgba(220, 38, 38, 0.24);
    background: rgba(255, 247, 247, 0.94);
  }

  .pet-panel-bubble.streaming {
    border-color: color-mix(in srgb, var(--rag-gold) 30%, var(--rag-line));
  }

  .pet-panel-sources {
    max-width: 100%;
  }

  .pet-panel-sources summary {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    min-height: 24px;
    padding: 0 9px;
    border: 1px solid color-mix(in srgb, var(--rag-line) 72%, transparent);
    border-radius: 999px;
    color: var(--rag-gold-strong);
    background: color-mix(in srgb, var(--rag-gold-faint) 68%, white);
    cursor: pointer;
    font-size: 11.5px;
    font-weight: 760;
    list-style: none;
  }

  .pet-panel-sources summary::-webkit-details-marker {
    display: none;
  }

  .pet-panel-sources .pet-source-list {
    margin-top: 6px;
  }

  .pet-panel-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 10px;
  }

  .pet-panel-title-wrap {
    display: inline-grid;
    grid-template-columns: 32px minmax(0, 1fr);
    align-items: center;
    gap: 9px;
    min-width: 0;
  }

  .pet-panel-avatar {
    position: relative;
    display: inline-grid;
    place-items: center;
    width: 32px;
    height: 32px;
    overflow: hidden;
    border-radius: 12px;
    color: var(--rag-primary-contrast);
    background:
      radial-gradient(circle at 34% 20%, rgba(255, 255, 255, 0.24), transparent 28%),
      linear-gradient(145deg, var(--rag-gold), var(--rag-gold-strong));
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--rag-gold) 20%, transparent),
      0 8px 18px color-mix(in srgb, var(--rag-gold) 12%, transparent);
    font-size: 12px;
    font-weight: 840;
  }

  .pet-panel-avatar.has-image {
    background: color-mix(in srgb, var(--rag-paper) 88%, white);
  }

  .pet-panel-avatar-fallback {
    position: relative;
    z-index: 1;
  }

  .pet-panel-avatar.has-image .pet-panel-avatar-fallback {
    opacity: 0;
  }

  .pet-panel-avatar-image {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .pet-panel-title {
    min-width: 0;
    display: grid;
    gap: 2px;
  }

  .pet-panel-kicker {
    overflow: hidden;
    color: color-mix(in srgb, var(--rag-muted) 82%, var(--rag-text));
    font-size: 11px;
    font-weight: 740;
    line-height: 1.2;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pet-panel-title strong {
    max-width: 220px;
    overflow: hidden;
    color: var(--rag-text);
    font-size: 15px;
    font-weight: 850;
    line-height: 1.25;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pet-panel-actions {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .pet-panel-action,
  .pet-source-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    min-height: 28px;
    padding: 0 9px;
    border: 1px solid color-mix(in srgb, var(--rag-line) 72%, transparent);
    border-radius: 999px;
    color: color-mix(in srgb, var(--rag-text) 76%, var(--rag-muted));
    background: color-mix(in srgb, var(--rag-paper) 82%, transparent);
    box-shadow: 0 5px 12px rgba(15, 23, 42, 0.04);
    cursor: pointer;
    font-size: 12px;
    font-weight: 760;
    line-height: 1;
    white-space: nowrap;
    transition:
      transform 0.14s ease,
      background 0.14s ease,
      color 0.14s ease,
      border-color 0.14s ease;
  }

  .pet-panel-action {
    position: relative;
    width: 32px;
    min-width: 32px;
    padding: 0;
  }

  .pet-panel-action[data-tooltip]::before,
  .pet-panel-action[data-tooltip]::after {
    position: absolute;
    right: 0;
    z-index: 8;
    pointer-events: none;
    opacity: 0;
    transform: translateY(3px);
    transition:
      opacity 0.14s ease,
      transform 0.14s ease;
  }

  .pet-panel-action[data-tooltip]::before {
    content: "";
    top: calc(100% + 3px);
    width: 8px;
    height: 8px;
    margin-right: 12px;
    border-left: 1px solid color-mix(in srgb, var(--rag-line) 76%, transparent);
    border-top: 1px solid color-mix(in srgb, var(--rag-line) 76%, transparent);
    background: color-mix(in srgb, var(--rag-paper) 96%, white);
    transform: translateY(3px) rotate(45deg);
  }

  .pet-panel-action[data-tooltip]::after {
    content: attr(data-tooltip);
    top: calc(100% + 7px);
    min-width: max-content;
    max-width: 160px;
    padding: 6px 8px;
    border: 1px solid color-mix(in srgb, var(--rag-line) 76%, transparent);
    border-radius: 9px;
    color: var(--rag-text);
    background: color-mix(in srgb, var(--rag-paper) 96%, white);
    box-shadow:
      0 10px 24px rgba(15, 23, 42, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.58);
    font-size: 11px;
    font-weight: 760;
    line-height: 1;
    white-space: nowrap;
  }

  .pet-panel-action[data-tooltip]:hover::before,
  .pet-panel-action[data-tooltip]:hover::after,
  .pet-panel-action[data-tooltip]:focus-visible::before,
  .pet-panel-action[data-tooltip]:focus-visible::after {
    opacity: 1;
    transform: translateY(0);
  }

  .pet-panel-action[data-tooltip]:hover::before,
  .pet-panel-action[data-tooltip]:focus-visible::before {
    transform: translateY(0) rotate(45deg);
  }

  .pet-panel-action.is-primary {
    color: var(--rag-primary-contrast);
    border-color: color-mix(in srgb, var(--rag-gold) 42%, transparent);
    background: linear-gradient(180deg, color-mix(in srgb, var(--rag-gold) 92%, white), var(--rag-gold-strong));
  }

  .pet-panel-action.is-danger {
    color: #b91c1c;
    border-color: rgba(239, 68, 68, 0.18);
    background: rgba(254, 242, 242, 0.82);
  }

  .pet-panel-action:hover,
  .pet-source-link:hover {
    transform: translateY(-1px);
    color: var(--rag-text);
    border-color: color-mix(in srgb, var(--rag-gold) 22%, var(--rag-line));
    background: var(--rag-paper);
  }

  .pet-panel-action.is-primary:hover {
    color: var(--rag-primary-contrast);
    background: linear-gradient(180deg, color-mix(in srgb, var(--rag-gold) 94%, white), var(--rag-gold-strong));
  }

  .pet-panel-action svg,
  .pet-panel-action .iconify-icon,
  .pet-source-link svg,
  .pet-source-link .iconify-icon {
    width: 14px;
    height: 14px;
  }

  .pet-context,
  .pet-answer,
  .pet-panel-empty {
    min-height: 0;
    margin-bottom: 10px;
    border-radius: 14px;
  }

  .pet-context {
    position: relative;
    display: grid;
    gap: 4px;
    padding: 8px 34px 8px 10px;
    border: 1px solid color-mix(in srgb, var(--rag-gold) 18%, var(--rag-line));
    background: color-mix(in srgb, var(--rag-gold-faint) 82%, white);
  }

  .pet-context span {
    color: var(--rag-gold-strong);
    font-size: 11px;
    font-weight: 820;
    line-height: 1;
  }

  .pet-context p {
    display: -webkit-box;
    margin: 0;
    overflow: hidden;
    color: #475569;
    font-size: 12px;
    line-height: 1.45;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .pet-context button {
    position: absolute;
    top: 7px;
    right: 7px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    padding: 0;
    border: 0;
    border-radius: 999px;
    color: color-mix(in srgb, var(--rag-muted) 86%, var(--rag-text));
    background: transparent;
    cursor: pointer;
  }

  .pet-answer {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    padding: 10px;
    border: 1px solid color-mix(in srgb, var(--rag-line) 68%, transparent);
    background: color-mix(in srgb, var(--rag-paper) 84%, transparent);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.54);
  }

  .pet-answer.error {
    border-color: rgba(220, 38, 38, 0.24);
    background: rgba(255, 247, 247, 0.94);
  }

  .pet-answer-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 7px;
    color: color-mix(in srgb, var(--rag-muted) 86%, transparent);
    font-size: 11px;
    line-height: 1;
  }

  .pet-answer-meta span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pet-answer-meta time {
    flex: 0 0 auto;
    white-space: nowrap;
  }

  .pet-answer-body {
    flex: 1 1 auto;
    max-height: none;
    min-height: 0;
    overflow: auto;
    color: #263244;
    font-size: 12.8px;
    line-height: 1.62;
    scrollbar-width: thin;
  }

  .pet-source-link {
    margin-top: 8px;
    min-height: 26px;
    color: var(--rag-gold-strong);
    background: color-mix(in srgb, var(--rag-gold-faint) 68%, white);
  }

  .pet-panel-empty {
    flex: 1 1 auto;
    display: grid;
    align-content: start;
    gap: 10px;
    padding: 11px;
    overflow: auto;
    border: 1px dashed color-mix(in srgb, var(--rag-line) 74%, transparent);
    color: color-mix(in srgb, var(--rag-muted) 90%, var(--rag-text));
    background: color-mix(in srgb, var(--rag-panel) 76%, white);
  }

  .pet-panel-welcome {
    margin: 0;
    color: #263244;
    font-size: 12.8px;
    font-weight: 680;
    line-height: 1.58;
    white-space: pre-line;
  }

  .pet-panel-quick {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    min-width: 0;
  }

  .pet-panel-quick button {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    max-width: 100%;
    min-height: 28px;
    padding: 0 9px;
    border: 1px solid color-mix(in srgb, var(--rag-line) 72%, transparent);
    border-radius: 999px;
    color: color-mix(in srgb, var(--rag-text) 78%, var(--rag-muted));
    background: color-mix(in srgb, var(--rag-paper) 82%, transparent);
    box-shadow: 0 5px 12px rgba(15, 23, 42, 0.04);
    cursor: pointer;
    font-size: 11.5px;
    font-weight: 760;
    line-height: 1;
    transition:
      transform 0.14s ease,
      color 0.14s ease,
      background 0.14s ease,
      border-color 0.14s ease;
  }

  .pet-panel-quick button:hover {
    transform: translateY(-1px);
    color: var(--rag-text);
    border-color: color-mix(in srgb, var(--rag-gold) 22%, var(--rag-line));
    background: var(--rag-paper);
  }

  .pet-panel-quick svg,
  .pet-panel-quick .iconify-icon {
    flex: 0 0 auto;
    width: 13px;
    height: 13px;
  }

  .pet-panel-quick span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (hover: none) {
    .pet-message-actions {
      opacity: 1;
      transform: none;
    }
  }
`,Sl=ye`
  .pet-stage-backdrop {
    position: fixed;
    inset: 0;
    z-index: 99997;
    background:
      radial-gradient(circle at 50% 28%, rgba(32, 68, 148, 0.2), transparent 34%),
      radial-gradient(circle at 34% 72%, color-mix(in srgb, var(--rag-gold) 18%, transparent), transparent 28%),
      linear-gradient(180deg, rgba(8, 10, 16, 0.43), rgba(5, 7, 12, 0.74));
    backdrop-filter: blur(5px) saturate(0.9);
    -webkit-backdrop-filter: blur(5px) saturate(0.9);
    animation: stage-backdrop-in 0.2s ease-out;
  }

  .pet-stage {
    position: fixed;
    z-index: 99999;
    inset: 0;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    gap: clamp(12px, 2vh, 22px);
    min-width: 0;
    overflow: visible;
    padding:
      clamp(20px, 4vh, 46px)
      max(28px, calc((100vw - 1680px) / 2 + 42px))
      clamp(18px, 3.6vh, 42px);
    background: transparent;
    pointer-events: none;
    animation: stage-in 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .pet-stage-head {
    width: min(1360px, 100%);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 0;
    pointer-events: auto;
  }

  .pet-stage-title {
    display: grid;
    align-items: start;
    min-width: 0;
    gap: 5px;
  }

  .pet-stage-title span {
    overflow: hidden;
    color: rgba(255, 255, 255, 0.76);
    font-size: 14px;
    font-weight: 840;
    line-height: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-shadow: 0 2px 16px rgba(0, 0, 0, 0.28);
  }

  .pet-stage-title strong {
    color: rgba(255, 255, 255, 0.92);
    font-size: 20px;
    font-weight: 860;
    line-height: 1.18;
    text-shadow: 0 2px 18px rgba(0, 0, 0, 0.34);
  }

  .pet-stage-actions {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .pet-stage-action,
  .pet-stage-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.16);
    color: rgba(255, 255, 255, 0.86);
    background: rgba(255, 255, 255, 0.16);
    box-shadow:
      0 12px 32px rgba(0, 0, 0, 0.18),
      inset 0 1px 0 rgba(255, 255, 255, 0.18);
    cursor: pointer;
    transition:
      transform 0.14s ease,
      background 0.14s ease,
      color 0.14s ease,
      border-color 0.14s ease;
    backdrop-filter: blur(16px) saturate(1.1);
    -webkit-backdrop-filter: blur(16px) saturate(1.1);
  }

  .pet-stage-action {
    gap: 6px;
    min-height: 40px;
    padding: 0 15px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 780;
    white-space: nowrap;
  }

  .pet-stage-close {
    width: 44px;
    height: 44px;
    padding: 0;
    border-radius: 999px;
  }

  .pet-stage-action:hover,
  .pet-stage-close:hover {
    transform: translateY(-1px);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.26);
    background: rgba(255, 255, 255, 0.24);
  }

  .pet-stage-action.is-danger {
    color: rgba(255, 226, 226, 0.96);
    border-color: rgba(248, 113, 113, 0.24);
    background: rgba(127, 29, 29, 0.28);
  }

  .pet-stage-action:disabled,
  .pet-stage-shortcuts button:disabled {
    cursor: not-allowed;
    opacity: 0.42;
    transform: none;
  }

  .pet-stage-action svg,
  .pet-stage-action .iconify-icon,
  .pet-stage-close svg,
  .pet-stage-close .iconify-icon {
    width: 15px;
    height: 15px;
  }

  .pet-stage-output {
    align-self: stretch;
    width: min(1320px, 100%);
    margin: 0 auto;
    min-height: 0;
    max-height: none;
    overflow: auto;
    padding: clamp(28px, 5vh, 70px) 4px 6px;
    border: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    scroll-behavior: smooth;
    pointer-events: auto;
    mask-image: linear-gradient(180deg, transparent 0, #000 28px, #000 calc(100% - 10px), transparent 100%);
    -webkit-mask-image: linear-gradient(180deg, transparent 0, #000 28px, #000 calc(100% - 10px), transparent 100%);
  }

  .pet-stage-output-inner {
    width: min(1180px, 100%);
    margin: 0 auto;
  }

  .pet-stage-output::-webkit-scrollbar {
    width: 10px;
  }

  .pet-stage-output::-webkit-scrollbar-thumb {
    border: 3px solid transparent;
    border-radius: 999px;
    background:
      linear-gradient(rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.24))
      content-box;
  }

  .pet-stage-message {
    display: flex;
    gap: 14px;
    margin-bottom: 24px;
    min-width: 0;
    animation: message-in 0.18s ease-out both;
  }

  .pet-stage-message.user {
    justify-content: flex-end;
  }

  .pet-stage-avatar {
    position: relative;
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    margin-top: 1px;
    border-radius: 999px;
    color: var(--rag-primary-contrast);
    background:
      radial-gradient(circle at 32% 20%, rgba(255, 255, 255, 0.24), transparent 26%),
      linear-gradient(145deg, var(--rag-gold), var(--rag-gold-strong));
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--rag-gold) 22%, transparent),
      0 5px 14px color-mix(in srgb, var(--rag-gold) 12%, transparent);
    font-size: 12px;
    font-weight: 820;
    overflow: hidden;
  }

  .pet-stage-avatar.has-image {
    background: color-mix(in srgb, var(--rag-paper) 86%, white);
  }

  .pet-stage-avatar-fallback {
    position: relative;
    z-index: 1;
  }

  .pet-stage-avatar.has-image .pet-stage-avatar-fallback {
    opacity: 0;
  }

  .pet-stage-avatar-image {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .pet-stage-message-stack {
    flex: 0 1 auto;
    min-width: 0;
    width: fit-content;
    max-width: min(92%, 960px);
  }

  .pet-stage-message.assistant .pet-stage-message-stack {
    width: min(100%, 1120px);
    max-width: min(100%, 1120px);
  }

  .pet-stage-message.user .pet-stage-message-stack {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    max-width: min(72%, 620px);
  }

  .pet-stage-bubble {
    position: relative;
    display: inline-block;
    width: fit-content;
    max-width: 100%;
    padding: 12px 15px 13px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 20px;
    color: rgba(255, 255, 255, 0.9);
    background: rgba(18, 22, 32, 0.42);
    box-shadow:
      0 14px 36px rgba(0, 0, 0, 0.18),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    font-size: 14px;
    line-height: 1.72;
    word-break: break-word;
    overflow-wrap: anywhere;
    backdrop-filter: blur(18px) saturate(1.08);
    -webkit-backdrop-filter: blur(18px) saturate(1.08);
  }

  .pet-stage-message.assistant .pet-stage-bubble {
    display: block;
    width: 100%;
    padding: 0;
    border: 0;
    border-radius: 0;
    color: rgba(255, 255, 255, 0.9);
    background: transparent;
    box-shadow: none;
    font-size: clamp(17px, 1.28vw, 22px);
    line-height: 1.9;
    text-shadow: 0 2px 18px rgba(0, 0, 0, 0.34);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  .pet-stage-bubble.streaming {
    border-color: color-mix(in srgb, var(--rag-gold) 30%, var(--rag-line));
  }

  .pet-stage-bubble.error {
    color: #9f1d1d;
    border-color: rgba(220, 38, 38, 0.24);
    background: rgba(255, 247, 247, 0.96);
  }

  .pet-stage-message.user .pet-stage-bubble {
    padding: 12px 15px 13px;
    border-radius: 20px;
    color: var(--rag-primary-contrast);
    background:
      linear-gradient(145deg, var(--rag-user-message-start), var(--rag-user-message-end));
    border-color: color-mix(in srgb, var(--rag-gold) 46%, transparent);
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.16) inset,
      0 8px 18px color-mix(in srgb, var(--rag-gold) 16%, transparent);
  }

  .pet-stage-message-actions {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 8px;
    opacity: 0;
    transform: translateY(2px);
    transition:
      opacity 0.14s ease,
      transform 0.14s ease;
  }

  .pet-stage-message:hover .pet-stage-message-actions,
  .pet-stage-message:focus-within .pet-stage-message-actions {
    opacity: 1;
    transform: translateY(0);
  }

  .pet-stage-message-actions button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    min-height: 26px;
    padding: 0 9px;
    border: 1px solid rgba(255, 255, 255, 0.13);
    border-radius: 999px;
    color: rgba(255, 255, 255, 0.7);
    background: rgba(255, 255, 255, 0.11);
    cursor: pointer;
    font-size: 11.5px;
    font-weight: 740;
    backdrop-filter: blur(14px) saturate(1.06);
    -webkit-backdrop-filter: blur(14px) saturate(1.06);
  }

  .pet-stage-message-actions button:hover:not(:disabled) {
    color: #fff;
    background: rgba(255, 255, 255, 0.17);
  }

  .pet-stage-message-actions button:disabled {
    cursor: not-allowed;
    opacity: 0.42;
  }

  .pet-stage-message-actions svg,
  .pet-stage-message-actions .iconify-icon {
    width: 13px;
    height: 13px;
  }

  .pet-stage-message.user .pet-stage-message-actions button {
    color: var(--rag-muted);
    border-color: color-mix(in srgb, var(--rag-line) 70%, transparent);
    background: color-mix(in srgb, var(--rag-paper) 72%, transparent);
  }

  .pet-stage .markdown-body h1,
  .pet-stage .markdown-body h2,
  .pet-stage .markdown-body h3,
  .pet-stage .markdown-body h4,
  .pet-stage .markdown-body h5,
  .pet-stage .markdown-body h6 {
    color: rgba(255, 255, 255, 0.94);
  }

  .pet-stage .markdown-body hr {
    background: rgba(255, 255, 255, 0.18);
  }

  .pet-stage .markdown-body code {
    background: rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.92);
  }

  .pet-stage .markdown-body blockquote {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.78);
  }

  .pet-stage .markdown-body th,
  .pet-stage .markdown-body td {
    border-color: rgba(255, 255, 255, 0.16);
  }

  .pet-stage .markdown-body th {
    background: rgba(255, 255, 255, 0.11);
  }

  .pet-stage .markdown-body a {
    color: rgba(255, 236, 192, 0.96);
    border-bottom-color: rgba(255, 236, 192, 0.28);
  }

  .pet-stage-time {
    margin-top: 7px;
    color: rgba(255, 255, 255, 0.54);
    font-size: 11.5px;
    line-height: 1;
  }

  .pet-stage-message.user .pet-stage-time {
    color: var(--rag-muted);
  }

  .pet-stage-sources {
    margin-top: 8px;
  }

  .pet-stage-sources summary {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 28px;
    padding: 0 10px;
    border-radius: 999px;
    color: rgba(255, 255, 255, 0.86);
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.14);
    cursor: pointer;
    font-size: 12px;
    font-weight: 780;
    list-style: none;
  }

  .pet-stage-sources summary::-webkit-details-marker {
    display: none;
  }

  .pet-stage-sources summary svg,
  .pet-stage-sources summary .iconify-icon {
    width: 14px;
    height: 14px;
  }

  .pet-stage-sources .pet-source-list {
    margin-top: 6px;
    width: min(100%, 560px);
    border-color: rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.11);
    backdrop-filter: blur(18px) saturate(1.08);
    -webkit-backdrop-filter: blur(18px) saturate(1.08);
  }

  .pet-stage-sources .pet-source-row {
    color: rgba(255, 255, 255, 0.82);
  }

  .pet-stage-sources .pet-source-row:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.13);
  }

  .pet-stage-sources .pet-source-icon,
  .pet-stage-sources .pet-source-open {
    color: rgba(255, 236, 192, 0.92);
  }

  .pet-stage-sources .pet-source-icon {
    background: rgba(255, 255, 255, 0.12);
  }

  .pet-stage-footer {
    width: min(980px, 100%);
    margin: 0 auto;
    padding: 0;
    background: transparent;
    pointer-events: auto;
  }

  .pet-stage-shortcuts {
    display: flex;
    justify-content: center;
    gap: 2px;
    width: fit-content;
    max-width: 100%;
    margin: 0 auto 10px;
    overflow-x: auto;
    padding: 5px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 18px;
    background: rgba(14, 18, 28, 0.22);
    box-shadow:
      0 18px 44px rgba(0, 0, 0, 0.16),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
    scrollbar-width: none;
    backdrop-filter: blur(18px) saturate(1.08);
    -webkit-backdrop-filter: blur(18px) saturate(1.08);
  }

  .pet-stage-shortcuts::-webkit-scrollbar {
    display: none;
  }

  .pet-stage-shortcuts button {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-height: 32px;
    padding: 0 11px;
    border: 0;
    border-radius: 13px;
    color: rgba(255, 255, 255, 0.76);
    background: transparent;
    box-shadow: none;
    cursor: pointer;
    font-size: 12px;
    font-weight: 720;
    white-space: nowrap;
    transition:
      transform 0.14s ease,
      color 0.14s ease,
      background 0.14s ease,
      border-color 0.14s ease;
  }

  .pet-stage-shortcuts button:hover:not(:disabled) {
    transform: translateY(-1px);
    color: #fff;
    background: rgba(255, 255, 255, 0.12);
  }

  .pet-stage-shortcuts svg,
  .pet-stage-shortcuts .iconify-icon {
    width: 16px;
    height: 16px;
  }

  .pet-stage-note {
    margin-top: 16px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    font-weight: 680;
    text-align: center;
    text-shadow: 0 2px 14px rgba(0, 0, 0, 0.34);
  }

  .pet-stage .composer-wrap {
    width: min(980px, 100%);
  }

  .pet-stage .composer {
    min-height: 96px;
    padding: 16px 16px 14px 20px;
    border: 1px solid rgba(255, 255, 255, 0.13);
    border-radius: 24px;
    background:
      radial-gradient(circle at 14% 12%, rgba(255, 255, 255, 0.08), transparent 26%),
      linear-gradient(112deg, rgba(73, 61, 76, 0.42), rgba(37, 73, 67, 0.38) 52%, rgba(42, 58, 100, 0.44));
    box-shadow:
      0 22px 60px rgba(0, 0, 0, 0.22),
      inset 0 1px 0 rgba(255, 255, 255, 0.14),
      inset 0 -1px 0 rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(24px) saturate(1.08);
    -webkit-backdrop-filter: blur(24px) saturate(1.08);
  }

  .pet-stage .composer:focus-within {
    border-color: rgba(255, 255, 255, 0.2);
    background:
      radial-gradient(circle at 14% 12%, rgba(255, 255, 255, 0.1), transparent 26%),
      linear-gradient(112deg, rgba(78, 64, 80, 0.5), rgba(38, 83, 73, 0.46) 52%, rgba(43, 60, 112, 0.52));
    box-shadow:
      0 24px 66px rgba(0, 0, 0, 0.26),
      0 0 0 1px rgba(255, 255, 255, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.16);
  }

  .pet-stage .input {
    min-height: 58px;
    max-height: 150px;
    padding: 5px 0;
    color: rgba(255, 255, 255, 0.9);
    font-size: 16.5px;
    font-weight: 590;
    line-height: 1.55;
  }

  .pet-stage .input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .pet-stage .send {
    width: 42px;
    height: 42px;
    align-self: flex-end;
    border-radius: 999px;
    color: rgba(255, 255, 255, 0.88);
    background: rgba(255, 255, 255, 0.15);
    box-shadow:
      0 12px 28px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.14);
  }

  .pet-stage .send:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.23);
  }

  @media (max-width: 960px) {
    :host,
    :host([position='left']) {
      right: 16px;
      left: auto;
      bottom: 16px;
    }

    .bubble,
    .bubble-wrapper {
      width: var(--rag-pet-width, 76px);
      min-width: var(--rag-pet-width, 76px);
      height: var(--rag-pet-height, 82px);
    }

    .pet-speech {
      max-width: min(176px, calc(100vw - 32px));
      font-size: 11.5px;
    }

    .pet-panel {
      width: min(344px, calc(100vw - 32px));
      height: min(var(--rag-pet-panel-height, 318px), calc(100dvh - 132px));
      overflow: hidden;
    }

    .pet-panel-head {
      flex-direction: column;
      gap: 8px;
    }

    .pet-panel-actions {
      width: 100%;
      justify-content: flex-start;
      flex-wrap: wrap;
    }

    .pet-stage {
      gap: 10px;
      padding: 14px 12px 16px;
    }

    .pet-stage-head {
      gap: 10px;
    }

    .pet-stage-title {
      display: grid;
      gap: 4px;
    }

    .pet-stage-title span {
      max-width: calc(100vw - 140px);
      font-size: 12px;
    }

    .pet-stage-title strong {
      font-size: 14px;
    }

    .pet-stage-output {
      padding: 16px 2px 4px;
    }

    .pet-stage-message-stack,
    .pet-stage-message.user .pet-stage-message-stack {
      max-width: 88%;
    }

    .pet-stage-message.assistant .pet-stage-message-stack {
      max-width: 100%;
      width: 100%;
    }

    .pet-stage-message.assistant .pet-stage-bubble {
      font-size: 16px;
      line-height: 1.82;
    }

    .pet-stage-footer {
      width: 100%;
    }

    .pet-stage-shortcuts {
      justify-content: flex-start;
      margin-bottom: 10px;
    }

    .pet-stage-shortcuts button {
      min-height: 36px;
      padding: 0 13px;
      font-size: 12px;
    }

    .pet-stage .composer {
      min-height: 96px;
      padding: 15px 15px 13px 18px;
      border-radius: 22px;
    }

    .pet-stage .input {
      min-height: 58px;
      font-size: 16px;
    }

    .pet-stage .send {
      width: 42px;
      height: 42px;
    }

    .pet-stage-note {
      margin-top: 10px;
      font-size: 11px;
    }
  }
`,Tl=ye`
  /* ═══════════ 兜底色板 · 深夜（标记缺席或为 dark） ═══════════ */
  :host([data-assistant-style='stellar']) {
    /* 站点变量缺席时的回落色，取值与星港主题的深夜口径一致 */
    --rag-stellar-cyan: #22d3ee;
    --rag-stellar-violet: #a78bfa;
    --rag-stellar-bg: #05070d;
    --rag-stellar-text: #e6e9f2;
    --rag-stellar-text-dim: #9aa3b8;
    --rag-stellar-panel: rgba(16, 19, 26, 0.86);
    --rag-stellar-panel-soft: rgba(255, 255, 255, 0.05);
    --rag-stellar-panel-border: rgba(255, 255, 255, 0.12);
    --rag-stellar-chip-bg: rgba(9, 13, 22, 0.55);
    --rag-stellar-hairline: rgba(255, 255, 255, 0.08);
    --rag-stellar-reader-text: #b9c1d4;
    --rag-stellar-contrast: #04121a;
    --rag-stellar-glow: rgba(34, 211, 238, 0.3);
    --rag-stellar-halo: rgba(167, 139, 250, 0.26);
    --rag-stellar-signal: #f87171;
    --rag-stellar-signal-soft: rgba(248, 113, 113, 0.14);
    --rag-stellar-code-bg: #060a12;
    --rag-stellar-code-text: #d7e3ff;
    --rag-stellar-drop: rgba(2, 4, 9, 0.46);
    --rag-stellar-text-shadow: 0 1px 14px rgba(0, 0, 0, 0.5);
    --rag-stellar-drone-filter: drop-shadow(0 10px 18px var(--rag-stellar-drop));
    --rag-stellar-shadow-panel: 0 26px 64px rgba(2, 4, 9, 0.6), 0 2px 0 rgba(255, 255, 255, 0.04) inset;
    --rag-stellar-shadow-card: 0 10px 26px rgba(2, 4, 9, 0.44);
    --rag-stellar-shadow-control: 0 8px 20px rgba(2, 4, 9, 0.36);

    /* 宿主层级：正文 261 / 目录 265 / 装载 290 / 跃迁 300。
       内层沿用原有的极大 z-index，它们只在宿主这一个层叠上下文里排序。 */
    z-index: 280;
    font-family: var(--sans, sans-serif);
  }

  /* ═══════════ 兜底色板 · 白昼 ═══════════ */
  :host([data-assistant-style='stellar'][data-assistant-scheme='light']) {
    --rag-stellar-cyan: #0e7490;
    --rag-stellar-violet: #6d28d9;
    --rag-stellar-bg: #eef1f7;
    --rag-stellar-text: #131a2a;
    --rag-stellar-text-dim: #3d4759;
    --rag-stellar-panel: rgba(255, 255, 255, 0.9);
    --rag-stellar-panel-soft: rgba(255, 255, 255, 0.62);
    --rag-stellar-panel-border: rgba(19, 26, 42, 0.14);
    --rag-stellar-chip-bg: rgba(255, 255, 255, 0.68);
    --rag-stellar-hairline: rgba(19, 26, 42, 0.12);
    --rag-stellar-reader-text: #2c3444;
    --rag-stellar-contrast: #ffffff;
    --rag-stellar-glow: rgba(14, 116, 144, 0.2);
    --rag-stellar-halo: rgba(109, 40, 217, 0.16);
    --rag-stellar-signal: #be123c;
    --rag-stellar-signal-soft: rgba(190, 18, 60, 0.1);
    --rag-stellar-code-bg: #f4f7fc;
    --rag-stellar-code-text: #1b2231;
    --rag-stellar-drop: rgba(19, 26, 42, 0.18);
    /* 白昼底本身就是亮的，投影只会把字糊掉，与主题在浅色下的口径一致 */
    --rag-stellar-text-shadow: none;
    --rag-stellar-shadow-panel: 0 22px 54px rgba(19, 26, 42, 0.18), 0 1px 0 rgba(255, 255, 255, 0.6) inset;
    --rag-stellar-shadow-card: 0 10px 24px rgba(19, 26, 42, 0.12);
    --rag-stellar-shadow-control: 0 8px 18px rgba(19, 26, 42, 0.1);
  }

  /* ═══════════ 浏览器表面：选区、光标、焦点、滚动条 ═══════════ */
  :host([data-assistant-style='stellar']) ::selection {
    background: color-mix(in srgb, var(--rag-gold) 30%, transparent);
    color: var(--rag-text);
  }

  :host([data-assistant-style='stellar']) .input,
  :host([data-assistant-style='stellar']) .pet-composer-input {
    caret-color: var(--rag-gold);
  }

  :host([data-assistant-style='stellar']) button:focus-visible,
  :host([data-assistant-style='stellar']) textarea:focus-visible,
  :host([data-assistant-style='stellar']) summary:focus-visible,
  :host([data-assistant-style='stellar']) a:focus-visible {
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--rag-gold) 30%, transparent),
      var(--rag-control-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-panel-thread,
  :host([data-assistant-style='stellar']) .pet-answer-body,
  :host([data-assistant-style='stellar']) .pet-stage-output {
    scrollbar-color: color-mix(in srgb, var(--rag-gold) 36%, transparent) transparent;
  }

  /* ═══════════ 悬浮角色：切角机甲无人机 ═══════════ */
  :host([data-assistant-style='stellar']) .stellar-pet {
    position: relative;
    display: block;
    width: var(--rag-pet-width, 76px);
    height: var(--rag-pet-height, 82px);
    /* 角色只做展示，指针事件照旧落在 .bubble 按钮上，拖动逻辑不受影响 */
    pointer-events: none;
  }

  /* 星尘信标：角色身后的一圈柔光，只在等待应答时呼吸 */
  :host([data-assistant-style='stellar']) .stellar-pet::before {
    content: '';
    position: absolute;
    inset: 16% 10% 8%;
    border-radius: 50%;
    background: radial-gradient(circle at 50% 56%, var(--rag-stellar-glow), transparent 68%);
    filter: blur(6px);
    opacity: 0.7;
  }

  :host([data-assistant-style='stellar']) .stellar-drone {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
    /* 轨道与推进尾焰允许溢出画布 */
    overflow: visible;
    color: var(--rag-gold);
    filter: var(--rag-stellar-drone-filter);
    transform-origin: 50% 56%;
    /* 待机只有整机轻悬浮与一圈慢轨道，其余部件静置 */
    animation: stellar-hover 4.6s ease-in-out infinite;
    transition: color 0.22s ease, filter 0.22s ease;
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-direction='left'] .stellar-drone {
    scale: -1 1;
  }

  :host([data-assistant-style='stellar']) .drone-orbit {
    color: color-mix(in srgb, var(--rag-gold) 58%, transparent);
    transform-box: fill-box;
    transform-origin: center;
    animation: stellar-orbit 18s linear infinite;
  }

  /* 舱体给一层面板底，空心线稿才会有实体感 */
  :host([data-assistant-style='stellar']) .drone-hull {
    color: var(--rag-gold);
    fill: color-mix(in srgb, var(--rag-panel) 88%, transparent);
  }

  :host([data-assistant-style='stellar']) .drone-wing {
    color: var(--rag-gold);
    fill: color-mix(in srgb, var(--rag-panel) 62%, transparent);
  }

  :host([data-assistant-style='stellar']) .drone-visor {
    color: color-mix(in srgb, var(--rag-gold) 74%, var(--rag-text));
    fill: var(--chip-bg, var(--rag-stellar-chip-bg));
  }

  :host([data-assistant-style='stellar']) .drone-status {
    color: color-mix(in srgb, var(--rag-text) 46%, transparent);
  }

  :host([data-assistant-style='stellar']) .drone-eye {
    color: var(--rag-gold);
    filter: drop-shadow(0 0 4px var(--rag-stellar-glow));
  }

  :host([data-assistant-style='stellar']) .drone-core {
    color: var(--violet, var(--rag-stellar-violet));
    fill: color-mix(in srgb, var(--violet, var(--rag-stellar-violet)) 30%, transparent);
    filter: drop-shadow(0 0 5px var(--rag-stellar-halo));
    transform-box: fill-box;
    transform-origin: center;
  }

  :host([data-assistant-style='stellar']) .drone-thruster {
    color: color-mix(in srgb, var(--rag-gold) 68%, transparent);
    opacity: 0.55;
  }

  /* 悬停：主光提亮，悬浮略快，指示灯与星核开始呼吸 */
  :host([data-assistant-style='stellar']) .stellar-pet[data-state='hover'] .stellar-drone {
    filter: var(--rag-stellar-drone-filter) brightness(1.14);
    animation-duration: 3s;
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='hover'] .drone-orbit {
    animation-duration: 9s;
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='hover'] .drone-eye {
    animation: stellar-eye 3.4s ease-in-out infinite;
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='hover'] .drone-core {
    animation: stellar-core 5s ease-in-out infinite;
  }

  /* 等待应答：轨道提速、星核与指示灯频繁起落，一眼可辨 */
  :host([data-assistant-style='stellar']) .stellar-pet[data-state='thinking'] .drone-orbit {
    color: color-mix(in srgb, var(--rag-gold) 78%, var(--violet, var(--rag-stellar-violet)));
    animation-duration: 2.4s;
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='thinking'] .drone-core {
    animation: stellar-core 1.1s ease-in-out infinite;
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='thinking'] .drone-eye {
    animation: stellar-eye 0.9s ease-in-out infinite;
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='thinking'] .drone-thruster {
    animation: stellar-thruster 0.9s ease-out infinite;
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='thinking']::before {
    animation: stellar-beacon 1.8s ease-in-out infinite;
  }

  /* 出错：整机停在警示色，描边加粗，轨道停转 */
  :host([data-assistant-style='stellar']) .stellar-pet[data-state='error'] .stellar-drone {
    color: var(--rag-stellar-signal);
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='error'] .drone-eye,
  :host([data-assistant-style='stellar']) .stellar-pet[data-state='error'] .drone-core {
    color: var(--rag-stellar-signal);
    filter: none;
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='error'] .drone-hull {
    stroke-width: 2.4;
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='error'] .drone-orbit,
  :host([data-assistant-style='stellar']) .stellar-pet[data-state='error'] .drone-thruster {
    animation: none;
    opacity: 0.32;
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='error']::before {
    background: radial-gradient(circle at 50% 56%, color-mix(in srgb, var(--rag-stellar-signal) 30%, transparent), transparent 68%);
  }

  /* 拖拽：不悬浮，轻微侧倾，姿态跟手 */
  :host([data-assistant-style='stellar']) .stellar-pet[data-state='dragging'] .stellar-drone {
    animation: none;
    transform: rotate(-5deg) scale(0.98);
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='dragging']::before {
    animation: none;
    opacity: 0.34;
  }

  /* 徽记：小尺寸出现，落在头像里时改取主色上的文字色，避免青底压青 */
  :host([data-assistant-style='stellar']) .stellar-emblem {
    display: block;
    width: var(--rag-emblem-size, 20px);
    height: auto;
    max-width: 100%;
    aspect-ratio: 1 / 1;
    color: var(--rag-gold);
    filter: drop-shadow(0 0 6px var(--rag-stellar-glow));
  }

  /* 徽记刻度：按出现的场合定尺寸，免得各处的 svg 图标规则互相顶掉 */
  :host([data-assistant-style='stellar']) .stellar-message-emblem {
    display: inline-flex;
    align-items: center;
    --rag-emblem-size: 16px;
  }

  :host([data-assistant-style='stellar']) .selection-popover .stellar-emblem,
  :host([data-assistant-style='stellar']) .pet-panel-quick .stellar-emblem {
    --rag-emblem-size: 18px;
  }

  :host([data-assistant-style='stellar']) .pet-panel-sources summary .stellar-emblem,
  :host([data-assistant-style='stellar']) .pet-stage-sources summary .stellar-emblem {
    --rag-emblem-size: 14px;
  }

  :host([data-assistant-style='stellar']) .pet-panel-action .stellar-emblem,
  :host([data-assistant-style='stellar']) .pet-stage-action .stellar-emblem,
  :host([data-assistant-style='stellar']) .pet-stage-close .stellar-emblem {
    --rag-emblem-size: 15px;
  }

  :host([data-assistant-style='stellar']) .pet-panel-avatar .stellar-emblem,
  :host([data-assistant-style='stellar']) .pet-stage-avatar .stellar-emblem {
    --rag-emblem-size: 62%;
    color: var(--rag-primary-contrast);
  }

  /* ═══════════ 小窗：星港舷窗 ═══════════ */
  :host([data-assistant-style='stellar']) .pet-panel {
    border: 1px solid var(--rag-line);
    border-radius: var(--rag-radius-panel, 18px);
    background:
      linear-gradient(var(--rag-gold), var(--rag-gold)) left 7px top 7px / 12px 1.5px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) left 7px top 7px / 1.5px 12px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) right 7px top 7px / 12px 1.5px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) right 7px top 7px / 1.5px 12px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) left 7px bottom 7px / 12px 1.5px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) left 7px bottom 7px / 1.5px 12px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) right 7px bottom 7px / 12px 1.5px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) right 7px bottom 7px / 1.5px 12px,
      radial-gradient(120% 80% at 14% 0%, color-mix(in srgb, var(--rag-gold) 12%, transparent), transparent 46%),
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--rag-panel) 96%, transparent),
        color-mix(in srgb, var(--rag-panel) 88%, transparent)
      );
    background-repeat: no-repeat;
    box-shadow: var(--rag-shadow);
    backdrop-filter: blur(20px) saturate(1.18);
    -webkit-backdrop-filter: blur(20px) saturate(1.18);
  }

  :host([data-assistant-style='stellar']) .pet-panel-resize::before {
    background: color-mix(in srgb, var(--rag-gold) 48%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-panel-resize:hover::before,
  :host([data-assistant-style='stellar']) .pet-panel-resize:focus-visible::before,
  :host([data-assistant-style='stellar']) .pet-panel.resizing .pet-panel-resize::before {
    background: var(--rag-gold);
  }

  :host([data-assistant-style='stellar']) .pet-panel-kicker {
    color: var(--rag-muted);
    letter-spacing: 0.1em;
  }

  :host([data-assistant-style='stellar']) .pet-panel-title strong,
  :host([data-assistant-style='stellar']) .pet-stage-title strong {
    color: var(--rag-text);
    font-family: var(--sans, sans-serif);
  }

  :host([data-assistant-style='stellar']) .pet-panel-avatar-fallback,
  :host([data-assistant-style='stellar']) .pet-stage-avatar-fallback {
    font-family: var(--hud, sans-serif);
    letter-spacing: 0.04em;
  }

  :host([data-assistant-style='stellar']) .pet-panel-avatar,
  :host([data-assistant-style='stellar']) .pet-stage-avatar {
    color: var(--rag-primary-contrast);
  }

  /* 面板与来源里的说明文字，原先是按浅色底写死的深蓝灰 */
  :host([data-assistant-style='stellar']) .pet-panel-bubble,
  :host([data-assistant-style='stellar']) .pet-answer-body,
  :host([data-assistant-style='stellar']) .pet-panel-welcome,
  :host([data-assistant-style='stellar']) .pet-context p,
  :host([data-assistant-style='stellar']) .pet-source-row {
    color: var(--rag-text);
  }

  :host([data-assistant-style='stellar']) .pet-panel-bubble {
    border-color: var(--rag-line);
    background: color-mix(in srgb, var(--rag-panel) 70%, transparent);
    box-shadow: inset 0 1px 0 color-mix(in srgb, var(--rag-text) 7%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-panel-bubble.error,
  :host([data-assistant-style='stellar']) .pet-answer.error {
    color: var(--rag-stellar-signal);
    border-color: color-mix(in srgb, var(--rag-stellar-signal) 32%, transparent);
    background: var(--rag-stellar-signal-soft);
  }

  :host([data-assistant-style='stellar']) .pet-panel-sources summary {
    color: var(--rag-gold-strong);
    border-color: color-mix(in srgb, var(--rag-gold) 30%, transparent);
    background: color-mix(in srgb, var(--rag-gold) 12%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-answer,
  :host([data-assistant-style='stellar']) .pet-panel-empty {
    border-color: var(--rag-line);
    background: color-mix(in srgb, var(--rag-panel) 70%, transparent);
    box-shadow: var(--rag-control-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-context {
    border-color: color-mix(in srgb, var(--rag-gold) 26%, transparent);
    background: color-mix(in srgb, var(--rag-gold) 8%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-context span {
    color: var(--rag-gold-strong);
  }

  :host([data-assistant-style='stellar']) .pet-panel-action.is-danger {
    color: var(--rag-stellar-signal);
    border-color: color-mix(in srgb, var(--rag-stellar-signal) 28%, transparent);
    background: var(--rag-stellar-signal-soft);
  }

  :host([data-assistant-style='stellar']) .pet-panel-quick button,
  :host([data-assistant-style='stellar']) .pet-panel-action,
  :host([data-assistant-style='stellar']) .pet-message-actions button,
  :host([data-assistant-style='stellar']) .pet-source-link {
    box-shadow: var(--rag-control-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-panel-avatar.has-image {
    background: color-mix(in srgb, var(--rag-panel) 88%, transparent);
  }

  /* 来源入口原先是「主色淡底 + 白」的浅色画法，深夜会糊出一块白 */
  :host([data-assistant-style='stellar']) .pet-source-link {
    color: var(--rag-gold-strong);
    border-color: color-mix(in srgb, var(--rag-gold) 28%, transparent);
    background: color-mix(in srgb, var(--rag-gold) 12%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-source-row:hover {
    color: var(--rag-text);
    background: color-mix(in srgb, var(--rag-gold) 12%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-panel-action[data-tooltip]::before {
    border-color: var(--rag-line);
    background: color-mix(in srgb, var(--rag-panel) 96%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-panel-action[data-tooltip]::after {
    border-color: var(--rag-line);
    color: var(--rag-text);
    background: color-mix(in srgb, var(--rag-panel) 96%, transparent);
    box-shadow: var(--rag-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-panel-message-meta,
  :host([data-assistant-style='stellar']) .pet-panel-message-meta time,
  :host([data-assistant-style='stellar']) .pet-source-meta {
    font-family: var(--mono, monospace);
  }

  /* ═══════════ 角色气泡与输入区 ═══════════ */
  :host([data-assistant-style='stellar']) .pet-speech {
    border: 1px solid var(--rag-line);
    border-radius: 4px 14px 14px 14px;
    padding: 9px 14px 10px 12px;
    background: color-mix(in srgb, var(--rag-panel) 94%, transparent);
    color: var(--rag-text);
    box-shadow: var(--rag-control-shadow);
    /* 切角位置留出内边距，首行末字不会被斜边切到 */
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
  }

  :host([data-assistant-style='stellar']) .pet-composer,
  :host([data-assistant-style='stellar']) .composer {
    border-color: var(--rag-line);
    background: color-mix(in srgb, var(--rag-input-surface-resolved) 92%, transparent);
    box-shadow: var(--rag-control-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-composer:focus-within,
  :host([data-assistant-style='stellar']) .composer:focus-within {
    border-color: color-mix(in srgb, var(--rag-gold) 52%, transparent);
    background: color-mix(in srgb, var(--rag-panel) 92%, transparent);
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--rag-gold) 18%, transparent),
      var(--rag-control-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-composer-input,
  :host([data-assistant-style='stellar']) .input {
    color: var(--rag-text);
  }

  :host([data-assistant-style='stellar']) .pet-composer-input::placeholder,
  :host([data-assistant-style='stellar']) .input::placeholder {
    color: color-mix(in srgb, var(--rag-muted) 86%, transparent);
  }

  /* 代码与来源元信息走等宽字，正文继续走站点正文栈 */
  :host([data-assistant-style='stellar']) .markdown-body code,
  :host([data-assistant-style='stellar']) .markdown-body pre {
    font-family: var(--mono, monospace);
  }

  :host([data-assistant-style='stellar']) .markdown-body pre {
    padding: 12px 13px;
    border: 1px solid var(--rag-line);
    border-radius: 12px;
    background: var(--rag-stellar-code-bg);
    color: var(--rag-stellar-code-text);
  }

  /* ═══════════ 全屏会话：舷桥控制台 ═══════════ */
  :host([data-assistant-style='stellar']) .pet-stage-backdrop {
    background:
      radial-gradient(58% 44% at 50% 22%, var(--rag-stellar-glow), transparent 70%),
      radial-gradient(52% 40% at 62% 78%, var(--rag-stellar-halo), transparent 72%),
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--bg, var(--rag-stellar-bg)) 66%, transparent),
        color-mix(in srgb, var(--bg, var(--rag-stellar-bg)) 88%, transparent)
      );
    backdrop-filter: blur(7px) saturate(1.06);
    -webkit-backdrop-filter: blur(7px) saturate(1.06);
  }

  /* 屏角括线：整屏按控制台处理，取色只从站点变量来 */
  :host([data-assistant-style='stellar']) .pet-stage {
    grid-template-columns: minmax(0, 1fr);
    color: var(--rag-text);
    background:
      linear-gradient(var(--rag-gold), var(--rag-gold)) left clamp(14px, 3vw, 42px) top 44px / 18px 1.5px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) left clamp(14px, 3vw, 42px) top 44px / 1.5px 18px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) right clamp(14px, 3vw, 42px) top 44px / 18px 1.5px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) right clamp(14px, 3vw, 42px) top 44px / 1.5px 18px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) left clamp(14px, 3vw, 42px) bottom 26px / 18px 1.5px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) left clamp(14px, 3vw, 42px) bottom 26px / 1.5px 18px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) right clamp(14px, 3vw, 42px) bottom 26px / 18px 1.5px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) right clamp(14px, 3vw, 42px) bottom 26px / 1.5px 18px;
    background-repeat: no-repeat;
  }

  :host([data-assistant-style='stellar']) .pet-stage-title span {
    color: var(--rag-muted);
    text-shadow: var(--rag-stellar-text-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-stage-title strong {
    text-shadow: var(--rag-stellar-text-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-stage-action,
  :host([data-assistant-style='stellar']) .pet-stage-close {
    border-color: var(--rag-line);
    color: var(--rag-text);
    background: color-mix(in srgb, var(--rag-panel) 72%, transparent);
    box-shadow: var(--rag-control-shadow);
    backdrop-filter: blur(14px) saturate(1.1);
    -webkit-backdrop-filter: blur(14px) saturate(1.1);
  }

  :host([data-assistant-style='stellar']) .pet-stage-action:hover,
  :host([data-assistant-style='stellar']) .pet-stage-close:hover {
    color: var(--rag-text);
    border-color: color-mix(in srgb, var(--rag-gold) 48%, transparent);
    background: color-mix(in srgb, var(--rag-gold) 14%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage-action.is-danger {
    color: var(--rag-stellar-signal);
    border-color: color-mix(in srgb, var(--rag-stellar-signal) 30%, transparent);
    background: var(--rag-stellar-signal-soft);
  }

  :host([data-assistant-style='stellar']) .pet-stage-output::-webkit-scrollbar-thumb {
    background:
      linear-gradient(
        color-mix(in srgb, var(--rag-gold) 34%, transparent),
        color-mix(in srgb, var(--rag-gold) 34%, transparent)
      )
      content-box;
  }

  :host([data-assistant-style='stellar']) .pet-stage-avatar.has-image {
    background: color-mix(in srgb, var(--rag-panel) 88%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage-bubble {
    border-color: var(--rag-line);
    color: var(--rag-text);
    background: color-mix(in srgb, var(--rag-panel) 68%, transparent);
    box-shadow: var(--rag-control-shadow);
  }

  /* 助手的长回答按正文口径取色，原先是为了压在深色罩上写死的白字 */
  :host([data-assistant-style='stellar']) .pet-stage-message.assistant .pet-stage-bubble {
    color: var(--reader-text, var(--rag-stellar-reader-text));
    text-shadow: var(--rag-stellar-text-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-stage-bubble.error {
    color: var(--rag-stellar-signal);
    border-color: color-mix(in srgb, var(--rag-stellar-signal) 32%, transparent);
    background: var(--rag-stellar-signal-soft);
  }

  :host([data-assistant-style='stellar']) .pet-stage-message-actions button {
    border-color: var(--rag-line);
    color: var(--rag-muted);
    background: color-mix(in srgb, var(--rag-panel) 66%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage-message-actions button:hover:not(:disabled) {
    color: var(--rag-text);
    background: color-mix(in srgb, var(--rag-gold) 16%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage-message.user .pet-stage-message-actions button {
    color: var(--rag-muted);
    border-color: var(--rag-line);
    background: color-mix(in srgb, var(--rag-panel) 60%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage .markdown-body h1,
  :host([data-assistant-style='stellar']) .pet-stage .markdown-body h2,
  :host([data-assistant-style='stellar']) .pet-stage .markdown-body h3,
  :host([data-assistant-style='stellar']) .pet-stage .markdown-body h4,
  :host([data-assistant-style='stellar']) .pet-stage .markdown-body h5,
  :host([data-assistant-style='stellar']) .pet-stage .markdown-body h6 {
    color: var(--rag-text);
  }

  :host([data-assistant-style='stellar']) .pet-stage .markdown-body hr {
    background: var(--rag-line);
  }

  :host([data-assistant-style='stellar']) .pet-stage .markdown-body code {
    color: var(--rag-text);
    background: color-mix(in srgb, var(--rag-gold) 12%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage .markdown-body pre {
    background: color-mix(in srgb, var(--rag-panel) 78%, transparent);
    color: var(--rag-text);
  }

  :host([data-assistant-style='stellar']) .pet-stage .markdown-body blockquote {
    color: var(--rag-muted);
    background: color-mix(in srgb, var(--rag-panel) 60%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage .markdown-body th,
  :host([data-assistant-style='stellar']) .pet-stage .markdown-body td {
    border-color: var(--rag-line);
  }

  :host([data-assistant-style='stellar']) .pet-stage .markdown-body th {
    background: color-mix(in srgb, var(--rag-panel) 66%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage .markdown-body a {
    color: var(--rag-gold-strong);
    border-bottom-color: color-mix(in srgb, var(--rag-gold) 38%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage-time {
    color: var(--rag-muted);
    font-family: var(--mono, monospace);
    letter-spacing: 0.06em;
    text-shadow: var(--rag-stellar-text-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-stage-sources summary {
    border-color: var(--rag-line);
    color: var(--rag-text);
    background: color-mix(in srgb, var(--rag-panel) 70%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage-sources .pet-source-list {
    border-color: var(--rag-line);
    background: color-mix(in srgb, var(--rag-panel) 76%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage-sources .pet-source-row {
    color: var(--rag-text);
  }

  :host([data-assistant-style='stellar']) .pet-stage-sources .pet-source-row:hover {
    color: var(--rag-text);
    background: color-mix(in srgb, var(--rag-gold) 14%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage-sources .pet-source-icon,
  :host([data-assistant-style='stellar']) .pet-stage-sources .pet-source-open {
    color: var(--rag-gold-strong);
  }

  :host([data-assistant-style='stellar']) .pet-stage-sources .pet-source-icon {
    background: color-mix(in srgb, var(--rag-gold) 14%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage-head,
  :host([data-assistant-style='stellar']) .pet-stage-output,
  :host([data-assistant-style='stellar']) .pet-stage-footer,
  :host([data-assistant-style='stellar']) .pet-stage-output-inner,
  :host([data-assistant-style='stellar']) .composer-wrap {
    min-width: 0;
    max-width: 100%;
  }

  :host([data-assistant-style='stellar']) .pet-stage-shortcuts {
    min-width: 0;
    max-width: 100%;
    overflow-x: auto;
    border-color: var(--rag-line);
    background: color-mix(in srgb, var(--rag-panel) 66%, transparent);
    box-shadow: var(--rag-control-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-stage-shortcuts button {
    color: var(--rag-muted);
  }

  :host([data-assistant-style='stellar']) .pet-stage-shortcuts button:hover:not(:disabled) {
    color: var(--rag-text);
    background: color-mix(in srgb, var(--rag-gold) 14%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage-note {
    color: var(--rag-muted);
    text-shadow: var(--rag-stellar-text-shadow);
  }

  /* 全屏输入区：切角舷窗 + 一层斜向星尘光泽 */
  :host([data-assistant-style='stellar']) .pet-stage .composer {
    border-color: var(--rag-line);
    border-radius: 6px 18px 18px 18px;
    background:
      radial-gradient(120% 140% at 12% 10%, color-mix(in srgb, var(--rag-gold) 14%, transparent), transparent 52%),
      linear-gradient(
        112deg,
        color-mix(in srgb, var(--rag-panel) 92%, transparent),
        color-mix(in srgb, var(--rag-panel) 74%, transparent) 58%,
        color-mix(in srgb, var(--violet, var(--rag-stellar-violet)) 14%, transparent)
      );
    box-shadow: var(--rag-shadow);
    clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
    backdrop-filter: blur(22px) saturate(1.1);
    -webkit-backdrop-filter: blur(22px) saturate(1.1);
  }

  :host([data-assistant-style='stellar']) .pet-stage .composer:focus-within {
    border-color: color-mix(in srgb, var(--rag-gold) 46%, transparent);
    background:
      radial-gradient(120% 140% at 12% 10%, color-mix(in srgb, var(--rag-gold) 20%, transparent), transparent 54%),
      linear-gradient(
        112deg,
        color-mix(in srgb, var(--rag-panel) 94%, transparent),
        color-mix(in srgb, var(--rag-panel) 78%, transparent) 58%,
        color-mix(in srgb, var(--violet, var(--rag-stellar-violet)) 18%, transparent)
      );
    box-shadow:
      var(--rag-shadow),
      0 0 0 1px color-mix(in srgb, var(--rag-gold) 22%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage .input {
    color: var(--rag-text);
    font-family: var(--sans, sans-serif);
  }

  :host([data-assistant-style='stellar']) .pet-stage .input::placeholder {
    color: color-mix(in srgb, var(--rag-muted) 82%, transparent);
  }

  /* 发送键：原先是压在深色罩上的白玻璃，白昼会白底白字，这里换成主光渐变 */
  :host([data-assistant-style='stellar']) .pet-stage .send {
    color: var(--rag-primary-contrast);
    background: linear-gradient(150deg, var(--rag-user-message-start), var(--rag-user-message-end));
    box-shadow: var(--rag-control-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-stage .send:hover:not(:disabled) {
    background: linear-gradient(150deg, var(--rag-user-message-start), var(--rag-user-message-end));
    filter: brightness(1.06);
  }

  /* ═══════════ 选区气泡 ═══════════ */
  :host([data-assistant-style='stellar']) .selection-popover {
    border-color: var(--rag-line);
    background: color-mix(in srgb, var(--rag-panel) 92%, transparent);
    box-shadow: var(--rag-shadow);
    backdrop-filter: blur(18px) saturate(1.2);
    -webkit-backdrop-filter: blur(18px) saturate(1.2);
  }

  :host([data-assistant-style='stellar']) .selection-popover button {
    color: var(--rag-text);
    font-family: var(--sans, sans-serif);
  }

  :host([data-assistant-style='stellar']) .selection-popover button:hover {
    color: var(--rag-text);
    background: color-mix(in srgb, var(--rag-gold) 16%, transparent);
  }

  :host([data-assistant-style='stellar']) .selection-popover svg,
  :host([data-assistant-style='stellar']) .selection-popover .iconify-icon {
    color: var(--rag-gold);
  }

  /* ═══════════ 动效：一个角色 + 一处轨道，够用就好 ═══════════ */
  @keyframes stellar-hover {
    0%,
    100% {
      transform: translateY(-2px);
    }
    50% {
      transform: translateY(2px);
    }
  }

  @keyframes stellar-beacon {
    0%,
    100% {
      opacity: 0.5;
      transform: scale(0.94);
    }
    50% {
      opacity: 0.9;
      transform: scale(1.04);
    }
  }

  @keyframes stellar-orbit {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes stellar-eye {
    0%,
    100% {
      opacity: 1;
    }
    46%,
    58% {
      opacity: 0.42;
    }
  }

  @keyframes stellar-core {
    0%,
    100% {
      opacity: 0.85;
      transform: scale(0.94);
    }
    50% {
      opacity: 1;
      transform: scale(1.08);
    }
  }

  @keyframes stellar-thruster {
    0%,
    100% {
      opacity: 0.32;
    }
    50% {
      opacity: 0.88;
    }
  }

  /* ═══════════ 窄屏与触屏：够大的命中区 + 安全区 ═══════════ */
  @media (max-width: 860px) {
    :host([data-assistant-style='stellar']) .pet-panel {
      width: min(368px, calc(100vw - 24px));
      max-height: calc(100dvh - 24px);
    }

    :host([data-assistant-style='stellar']) .pet-panel-action {
      width: 44px;
      min-width: 44px;
      min-height: 44px;
    }

    :host([data-assistant-style='stellar']) .pet-panel-quick button,
    :host([data-assistant-style='stellar']) .pet-source-row {
      min-height: 40px;
    }

    :host([data-assistant-style='stellar']) .pet-stage {
      gap: 10px;
      /* 窄屏首行会贴到屏边，屏角括线退场，只留背景罩与光晕 */
      background: none;
      padding:
        14px
        max(12px, env(safe-area-inset-right))
        max(16px, env(safe-area-inset-bottom))
        max(12px, env(safe-area-inset-left));
    }

    :host([data-assistant-style='stellar']) .pet-stage-head {
      flex-wrap: wrap;
      align-items: start;
      gap: 10px;
    }

    :host([data-assistant-style='stellar']) .pet-stage-actions {
      flex: 1 1 auto;
      flex-wrap: wrap;
      justify-content: flex-end;
      min-width: 0;
    }

    :host([data-assistant-style='stellar']) .pet-stage-action {
      min-height: 44px;
      padding: 0 10px;
    }

    :host([data-assistant-style='stellar']) .pet-stage-close {
      width: 44px;
      height: 44px;
    }

    :host([data-assistant-style='stellar']) .pet-stage-shortcuts button {
      min-height: 40px;
    }

    :host([data-assistant-style='stellar']) .pet-stage .send {
      width: 44px;
      height: 44px;
    }

    :host([data-assistant-style='stellar']) .pet-stage .composer {
      border-radius: 6px 16px 16px 16px;
      clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
    }
  }

  @media (hover: none) {
    :host([data-assistant-style='stellar']) .pet-stage-action,
    :host([data-assistant-style='stellar']) .pet-panel-quick button {
      min-height: 44px;
    }
  }

  /* 主题的减动效规则在页面样式表里，跨不进 Shadow DOM，这里补一份 */
  @media (prefers-reduced-motion: reduce) {
    :host([data-assistant-style='stellar']) .stellar-drone,
    :host([data-assistant-style='stellar']) .stellar-pet::before,
    :host([data-assistant-style='stellar']) .drone-orbit,
    :host([data-assistant-style='stellar']) .drone-eye,
    :host([data-assistant-style='stellar']) .drone-core,
    :host([data-assistant-style='stellar']) .drone-thruster {
      animation: none !important;
      transition: none !important;
    }

    :host([data-assistant-style='stellar']) .stellar-drone {
      transform: none;
    }

    :host([data-assistant-style='stellar']) .drone-thruster {
      opacity: 0.5;
    }
  }
`,Dl=[Cl,El,kl,Al,Sl,Tl];function Pe(e,t,r={}){return{id:r.id||Xe(),role:e,content:t,time:r.time||De(),sources:r.sources,streaming:r.streaming,error:r.error}}function Pl(e,t,r){return e.map(a=>a.id===t?r(a):a)}function Xe(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`}const $e={visible:!1,text:"",x:0,y:0};function $l(e){const t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return $e;const r=t.toString().replace(/\s+/g," ").trim();if(r.length<2||Fl(t))return $e;const n=t.getRangeAt(0).getBoundingClientRect();if(!n||n.width===0&&n.height===0)return $e;const s=Math.max(72,Math.min(n.left+n.width/2,window.innerWidth-72)),u=Math.max(42,n.top-12);return{visible:!0,text:r.slice(0,e),x:Math.round(s),y:Math.round(u)}}function Fl(e){return hn(e.anchorNode)||hn(e.focusNode)}function hn(e){return!!(e instanceof Element?e:e?.parentElement)?.closest('input, textarea, select, [contenteditable="true"], summaraid-rag-assistant')}class U extends Error{status;response;constructor(t,r={}){super(t),this.name="AIUIError",this.status=r.status,this.response=r.response,r.cause!==void 0&&Object.defineProperty(this,"cause",{configurable:!0,enumerable:!1,value:r.cause})}}class z extends U{constructor(t,r={}){super(t,r),this.name="AIUIProtocolError"}}class Ml extends z{target;partType;partName;partId;constructor(t,r){super(t,{cause:r.cause}),this.name="AIUISchemaValidationError",this.target=r.target,this.partType=r.partType,this.partName=r.partName,this.partId=r.partId}}function Ct(e){return e instanceof Error?e:new Error(String(e))}function Il(e){return e instanceof z}function Rl(e){return(e instanceof DOMException||e instanceof Error)&&e.name==="AbortError"}let fn=0;function At(e="msg"){return fn+=1,`${e}_${Date.now().toString(36)}_${fn.toString(36)}`}function Nl(e){if(Ll(e))return e;const t=e;if(typeof t.toJSONSchema=="function")return t.toJSONSchema();const r=e;if(typeof r.toJsonSchema=="function")return r.toJsonSchema();throw new U("A JSON Schema object is required unless the schema can export JSON Schema.")}function gn(e,t,r){return zl(e,t,{makeError:(a,n)=>new Ml(`UI message ${r.target} validation failed: ${a}`,{...r,cause:n})})}function zl(e,t,r){if(Bl(t))try{const s=t["~standard"].validate(e);if(Ul(s))throw r.makeError("Async schemas are not supported for UI message streams.");if("issues"in s&&s.issues&&s.issues.length>0)throw r.makeError(ql(s.issues),s.issues);return s.value}catch(s){throw pr(s)?s:r.makeError(et(s),s)}const a=t;if(typeof a.safeParse=="function")try{const s=a.safeParse(e);if(!s.success)throw r.makeError(et(s.error),s.error);return s.data}catch(s){throw pr(s)?s:r.makeError(et(s),s)}const n=t;if(typeof n.parse=="function")try{return n.parse(e)}catch(s){throw r.makeError(et(s),s)}try{return dr(e,Nl(t),"$"),e}catch(s){throw pr(s)?s:r.makeError(et(s),s)}}function dr(e,t,r){if(t.enum&&!t.enum.some(a=>Object.is(a,e)))throw new U(`${r} must be one of ${t.enum.join(", ")}`);if(t.type==="object"||t.properties){if(!Hl(e))throw new U(`${r} must be an object`);for(const a of t.required??[])if(!(a in e))throw new U(`${r}.${a} is required`);for(const[a,n]of Object.entries(t.properties??{}))e[a]!==void 0&&dr(e[a],n,`${r}.${a}`);return}if(t.type==="array"||t.items){if(!Array.isArray(e))throw new U(`${r} must be an array`);t.items&&e.forEach((a,n)=>dr(a,t.items,`${r}[${n}]`));return}if(t.type&&!Ol(e,t.type))throw new U(`${r} must be ${t.type}`)}function Ol(e,t){switch(t){case"string":return typeof e=="string";case"number":return typeof e=="number";case"integer":return Number.isInteger(e);case"boolean":return typeof e=="boolean";case"null":return e===null;default:return!0}}function Ll(e){return typeof e=="object"&&e!==null&&("type"in e||"properties"in e)}function Bl(e){return typeof e=="object"&&e!==null&&"~standard"in e&&typeof e["~standard"]?.validate=="function"}function Ul(e){return typeof e=="object"&&e!==null&&typeof e.then=="function"}function pr(e){return e instanceof U}function ql(e){return e.map(t=>`${t.path?.length?`${t.path.map(String).join(".")}: `:""}${t.message??"Invalid value"}`).join("; ")}function et(e){return e instanceof Error?e.message:typeof e=="object"&&e!==null&&"message"in e?String(e.message):String(e)}function Hl(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function jl(e={}){return{message:e.message??{id:e.messageId??At("msg"),role:"assistant",parts:[],metadata:e.metadata},terminal:{},visible:!!e.message?.parts.length,messageMetadataSchema:e.messageMetadataSchema,dataPartSchemas:e.dataPartSchemas}}function Gl(e,t){if(Wl(t),xn(t)){if(!t.transient){const r=rc(e,t);oe(e,{type:t.type,id:t.id,name:t.name,data:r,transientData:!1})}return e}if(fr(t))return mn(e,ac(t)),e;if(yn(t))return mn(e,t),e;switch(t.type){case"start":e.message={...e.message,id:t.messageId??e.message.id,metadata:hr(e,t.messageMetadata)};break;case"text-start":oe(e,{type:"text",id:t.id,text:""});break;case"text-delta":Ql(e,t.id,t.delta);break;case"text-end":break;case"reasoning-start":oe(e,{type:"reasoning",id:t.id,text:""});break;case"reasoning-delta":Jl(e,t.id,t.delta,t.providerMetadata);break;case"reasoning-end":break;case"message-metadata":e.message={...e.message,metadata:hr(e,t.messageMetadata)};break;case"source-url":oe(e,{type:"source-url",sourceId:t.sourceId??t.id??t.url,url:t.url,title:t.title,providerMetadata:t.providerMetadata});break;case"file":oe(e,{type:"file",id:t.id,url:t.url,title:t.title,mediaType:t.mediaType,data:t.data,providerMetadata:t.providerMetadata});break;case"start-step":break;case"finish-step":e.terminal={...e.terminal,finishReason:t.finishReason??e.terminal.finishReason,rawFinishReason:t.rawFinishReason??e.terminal.rawFinishReason,usage:t.usage??e.terminal.usage};break;case"finish":e.message={...e.message,metadata:hr(e,t.messageMetadata)},e.terminal=ec(e.terminal,t);break;case"error":e.terminal={...e.terminal,errorText:t.errorText};break;case"abort":e.terminal={...e.terminal,aborted:!0};break}return e}function Wl(e){if(!e||typeof e.type!="string"||e.type.length===0)throw new z("UI message chunk type is required.");if(xn(e)){if(mr(e.name,/^[A-Za-z][A-Za-z0-9_-]*$/,"data name"),e.type!==`data-${e.name}`)throw new z(`Data chunk type must be data-${e.name}.`);if(!e.id)throw new z("Data chunk id is required.");return}if(fr(e)){if(nc(e.type,e.toolCallId,e.toolName),e.type==="tool-input-delta"&&!e.inputTextDelta)throw new z("Tool input-delta chunk inputTextDelta is required.");if(e.type==="tool-output-error"&&!e.errorText)throw new z("Tool output-error chunk errorText is required.");if((e.type==="tool-approval-request"||e.type==="tool-approval-response")&&!e.approvalId)throw new z("Tool approval chunk approvalId is required.");if(e.type==="tool-approval-response"&&typeof e.approved!="boolean")throw new z("Tool approval-response chunk approved is required.");return}if(yn(e)){if(mr(e.toolName,/^[A-Za-z][A-Za-z0-9_-]*$/,"tool name"),e.type!==`tool-${e.toolName}`)throw new z(`Tool chunk type must be tool-${e.toolName}.`);if(!e.toolCallId)throw new z("Tool chunk toolCallId is required.");if(!e.state)throw new z("Tool chunk state is required.");if(e.state==="output-error"&&!e.errorText)throw new z("Tool output-error chunk errorText is required.")}}function Vl(e,t){const r=Et(e,t.toolCallId);return kt(e,{type:`tool-${t.toolName}`,toolCallId:t.toolCallId,toolName:t.toolName,state:"output-available",input:r?.input,output:t.output??t.result,approval:r?.approval,providerMetadata:t.providerMetadata??r?.providerMetadata})}function Zl(e,t){const r=Et(e,t.toolCallId);return kt(e,{type:`tool-${t.toolName}`,toolCallId:t.toolCallId,toolName:t.toolName,state:"output-error",input:r?.input,errorText:t.errorText,approval:r?.approval,providerMetadata:t.providerMetadata??r?.providerMetadata})}function Yl(e,t){const r=Et(e,t.toolCallId);return kt(e,{type:`tool-${t.toolName}`,toolCallId:t.toolCallId,toolName:t.toolName,state:"approval-responded",input:r?.input,errorText:r?.errorText,approval:{id:t.approvalId,approved:t.approved,reason:t.reason},providerMetadata:t.providerMetadata??r?.providerMetadata})}function Ql(e,t,r){const a=e.message.parts.find(n=>n.type==="text"&&n.id===t);oe(e,{type:"text",id:t,text:`${a?.text??""}${r??""}`})}function Jl(e,t,r,a){const n=e.message.parts.find(s=>s.type==="reasoning"&&s.id===t);oe(e,{type:"reasoning",id:t,text:`${n?.text??""}${r??""}`,providerMetadata:a??n?.providerMetadata})}function oe(e,t){e.message=kt(e.message,t),e.visible=e.visible||Xl(t)}function kt(e,t){const r=e.parts.findIndex(n=>Kl(n,t)),a=[...e.parts];return r===-1?a.push(t):a[r]=t,{...e,parts:a}}function Kl(e,t){if(e.type!==t.type)return!1;if(gr(t))return gr(e)&&e.id===t.id;switch(t.type){case"text":case"reasoning":case"file":return"id"in e&&e.id===t.id;case"source-url":return"sourceId"in e&&e.sourceId===t.sourceId;default:return br(t)?br(e)&&e.toolCallId===t.toolCallId:!1}}function Xl(e){return!gr(e)||!e.transientData}function ec(e,t){return{...e,finishReason:t.finishReason,rawFinishReason:t.rawFinishReason,usage:t.usage}}function tc(e,t){return t==null?e:bn(e)&&bn(t)?{...e,...t}:t}function hr(e,t){const r=tc(e.message.metadata,t);return t==null||!e.messageMetadataSchema?r:gn(r,e.messageMetadataSchema,{target:"message-metadata"})}function rc(e,t){const r=e.dataPartSchemas?.[t.name];return r?gn(t.data,r,{target:"data-part",partType:t.type,partName:t.name,partId:t.id}):t.data}function bn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function mn(e,t){const r=Et(e.message,t.toolCallId),a=t.state==="input-streaming"?`${r?.inputText??""}${t.inputTextDelta??""}`:void 0;oe(e,{type:t.type,toolCallId:t.toolCallId,toolName:t.toolName,state:t.state,input:t.input??r?.input,inputText:a,output:t.output??r?.output,errorText:t.errorText??r?.errorText,approval:t.approval??r?.approval,providerMetadata:t.providerMetadata??r?.providerMetadata})}function ac(e){const t={type:`tool-${e.toolName}`,toolCallId:e.toolCallId,toolName:e.toolName,providerMetadata:"providerMetadata"in e?e.providerMetadata:void 0};switch(e.type){case"tool-input-start":return{...t,state:"input-streaming",inputTextDelta:""};case"tool-input-delta":return{...t,state:"input-streaming",inputTextDelta:e.inputTextDelta};case"tool-input-available":return{...t,state:"input-available",input:e.input};case"tool-output-available":return{...t,state:"output-available",output:e.output};case"tool-output-error":return{...t,state:"output-error",errorText:e.errorText};case"tool-approval-request":return{...t,state:"approval-requested",input:e.input,approval:{id:e.approvalId}};case"tool-approval-response":return{...t,state:"approval-responded",approval:{id:e.approvalId,approved:e.approved,reason:e.reason}}}}function Et(e,t){return e.parts.find(r=>br(r)&&r.toolCallId===t)}function xn(e){return e.type.startsWith("data-")}function fr(e){return e.type==="tool-input-start"||e.type==="tool-input-delta"||e.type==="tool-input-available"||e.type==="tool-output-available"||e.type==="tool-output-error"||e.type==="tool-approval-request"||e.type==="tool-approval-response"}function yn(e){return e.type.startsWith("tool-")&&!fr(e)}function gr(e){return e.type.startsWith("data-")}function br(e){return e.type.startsWith("tool-")}function mr(e,t,r){if(!e||!t.test(e))throw new z(`${r} must be a simple identifier.`)}function nc(e,t,r){if(mr(r,/^[A-Za-z][A-Za-z0-9_-]*$/,"tool name"),!t)throw new z(`${e} chunk toolCallId is required.`)}const sc="X-Halo-AI-UI-Message-Stream",uc="v1",St="[DONE]";function ic(e){const t=e.headers.get(sc);if(t&&t!==uc)throw new U(`Unsupported Halo UI message stream version: ${t}`,{response:e,status:e.status})}async function*oc(e){const t=e.getReader(),r=new TextDecoder;try{for(;;){const{value:n,done:s}=await t.read();if(s)break;if(n){const u=r.decode(n,{stream:!0});u&&(yield u)}}const a=r.decode();a&&(yield a)}finally{t.releaseLock()}}async function*lc(e){let t="";for await(const a of oc(e)){t+=a;const s=t.replace(/\r\n/g,`
`).split(`

`);t=s.pop()??"";for(const u of s){const i=vn(u);i===St||i==null||(yield i)}}const r=t.trim();if(r){const a=vn(r);a!==St&&a!=null&&(yield a)}}function vn(e){const t=e.split(`
`).filter(a=>a.startsWith("data:")).map(a=>a.slice(5).trimStart());if(!t.length)return;const r=t.join(`
`).trim();if(!r||r===St)return St;try{return JSON.parse(r)}catch(a){throw new U("Failed to parse Halo UI message stream chunk.",{cause:a})}}class cc{api;credentials;headers;body;fetch;prepareSendMessagesRequest;constructor(t={}){this.api=t.api??"/api/chat",this.credentials=t.credentials,this.headers=t.headers,this.body=t.body,this.fetch=t.fetch,this.prepareSendMessagesRequest=t.prepareSendMessagesRequest}async sendMessages(t){const r=await xr(this.body),a=dc(await xr(this.headers),t.headers),n=t.credentials??await xr(this.credentials),s={...r,...t.body,id:t.chatId,messages:t.messages,trigger:t.trigger,messageId:t.messageId??null},u=await this.prepareSendMessagesRequest?.({...t,api:this.api,body:s,headers:a,credentials:n}),i=await this.fetchResponse({api:u?.api??this.api,body:u?.body??s,headers:u?.headers??a,credentials:u?.credentials??n,abortSignal:t.abortSignal});return this.processResponse(i)}async fetchResponse(t){const r=this.fetch??globalThis.fetch;if(!r)throw new U("No fetch implementation is available.");const a=await r(t.api,{method:"POST",headers:{"Content-Type":"application/json",..._n(t.headers)},body:JSON.stringify(t.body),credentials:t.credentials,signal:t.abortSignal});if(!a.ok)throw new U(await a.text()||"Failed to fetch chat response.",{status:a.status,response:a});if(!a.body)throw new U("The response body is empty.",{status:a.status,response:a});return a}}class wn extends cc{processResponse(t){return ic(t),lc(t.body)}}async function xr(e){return typeof e=="function"?await e():e}function dc(...e){return Object.assign({},...e.map(_n))}function _n(e){return e?e instanceof Headers?Object.fromEntries(e.entries()):Array.isArray(e)?Object.fromEntries(e):e:{}}class pc{id;generateId;state;transport;onError;onData;onToolCall;onAutomaticStepLimitExceeded;onFinish;sendAutomaticallyWhen;maxAutomaticSteps;messageMetadataSchema;dataPartSchemas;notifiedToolCalls=new Set;consumedAutomaticContinuationKeys=new Set;listeners=new Set;activeAbortController;automaticStepCount=0;hasPendingAutomaticContinuation=!1;pendingAutomaticContinuationOptions;toolCallbackFailure;constructor(t={}){this.generateId=t.generateId??(()=>At("msg")),this.id=t.id??this.generateId(),this.state=t.state??hc({messages:t.messages??[]}),this.transport=t.transport??new wn,this.onError=t.onError,this.onData=t.onData,this.onToolCall=t.onToolCall,this.onAutomaticStepLimitExceeded=t.onAutomaticStepLimitExceeded,this.onFinish=t.onFinish,this.sendAutomaticallyWhen=t.sendAutomaticallyWhen,this.maxAutomaticSteps=Ac(t.maxAutomaticSteps),this.messageMetadataSchema=t.messageMetadataSchema,this.dataPartSchemas=t.dataPartSchemas}get messages(){return this.state.getMessages()}set messages(t){this.setMessages(t)}get status(){return this.state.getStatus()}get error(){return this.state.getError()}setMessages(t){this.setChatMessages([...t])}clearError(){this.setChatError(void 0),(this.status==="error"||this.status==="disconnected")&&this.setChatStatus("ready")}subscribe(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}async sendMessage(t,r){this.resetAutomaticContinuation(),t&&this.applyUserMessage(t),await this.makeRequest({trigger:"submit-message",messageId:t?.messageId,options:r})}async regenerate({messageId:t,...r}={}){this.resetAutomaticContinuation();const a=this.messages,n=t==null?Cn(a,u=>u.role==="assistant"):a.findIndex(u=>u.id===t);if(n===-1)throw new Error(`message ${t??"<last assistant>"} not found`);const s=a[n].role==="assistant"?n:n+1;this.setMessages(a.slice(0,s)),await this.makeRequest({trigger:"regenerate-message",messageId:t,options:r,requestMessages:a})}stop(){this.activeAbortController?.abort()}async appendToolOutputSuccess(t,r){const a=this.resolveToolCall(t.toolCallId,t.toolName);this.updateLastAssistant(n=>Vl(n,{...t,toolName:a.toolName})),await this.maybeSendAutomaticallyAfterToolUpdate(r)}async appendToolOutputError(t,r){const a=this.resolveToolCall(t.toolCallId,t.toolName);this.updateLastAssistant(n=>Zl(n,{...t,toolName:a.toolName})),await this.maybeSendAutomaticallyAfterToolUpdate(r)}async addToolOutput(t,r){const a=t.toolName??t.tool;if("state"in t&&t.state==="output-error"){await this.appendToolOutputError({toolCallId:t.toolCallId,toolName:a,errorText:t.errorText,providerMetadata:t.providerMetadata},r);return}const n=t;await this.appendToolOutputSuccess({toolCallId:n.toolCallId,toolName:a,result:n.output??n.result,providerMetadata:n.providerMetadata},r)}async rejectToolCall(t,r){await this.addToolApprovalResponse({...t,approved:!1},r)}async addToolApprovalResponse(t,r){const a=t.id||t.approvalId?this.resolveApprovalRequest(t.id??t.approvalId):void 0,n=t.toolCallId??a?.toolCallId;if(!n)throw new Error("Tool call id is required.");const s=this.resolveToolCall(n,t.toolName??t.tool);this.updateLastAssistant(u=>Yl(u,{approvalId:a?.approval?.id??t.id??t.approvalId??n,toolCallId:n,toolName:t.toolName??t.tool??s.toolName,approved:t.approved,reason:t.reason,providerMetadata:t.providerMetadata})),await this.maybeSendAutomaticallyAfterToolUpdate(r)}applyUserMessage(t){const r=this.messages,a={id:t.id??this.generateId(),role:t.role??"user",parts:this.userMessageParts(t),metadata:t.metadata};if(t.messageId){const n=r.findIndex(s=>s.id===t.messageId);if(n===-1)throw new Error(`message with id ${t.messageId} not found`);if(r[n].role!=="user")throw new Error(`message with id ${t.messageId} is not a user message`);this.setMessages([...r.slice(0,n),{...a,id:t.messageId}]);return}this.setMessages([...r,a])}userMessageParts(t){if(t.parts)return t.parts;const r=[];t.text!=null&&r.push({type:"text",id:At("text"),text:t.text});for(const a of t.files??[])r.push({type:"file",id:a.id??At("file"),url:a.url,title:a.title,mediaType:a.mediaType,data:a.data,providerMetadata:a.providerMetadata});return r}async makeRequest({trigger:t,messageId:r,options:a,requestMessages:n,reducerMessage:s}){const u=await this.consumeAssistantStream({reducerMessage:s??{id:this.generateId(),role:"assistant",parts:[]},createStream:i=>this.transport.sendMessages({chatId:this.id,messages:wc(n??this.messages),trigger:t,messageId:r,headers:a?.headers,body:a?.body,credentials:a?.credentials,metadata:a?.metadata,abortSignal:i})});this.status==="ready"&&!u.isAbort&&!u.isError?await this.maybeSendAutomatically(this.consumePendingAutomaticContinuationOptions(a)):this.clearPendingAutomaticContinuation()}async consumeAssistantStream({reducerMessage:t,createStream:r}){this.setChatStatus("submitted"),this.setChatError(void 0),this.toolCallbackFailure=void 0;let a=!1,n=!1,s=!1;const u=new AbortController;this.activeAbortController=u;const i=jl({message:t,messageMetadataSchema:this.messageMetadataSchema,dataPartSchemas:this.dataPartSchemas});try{const o=await r(u.signal);for await(const l of o)this.applyAssistantChunk(i,l),s=!0,this.setChatStatus("streaming");if(this.toolCallbackFailure)n=!0,this.failChat(this.toolCallbackFailure);else if(i.terminal.errorText){n=!0;const l=new Error(i.terminal.errorText);this.setChatError(l),this.setChatStatus("error"),this.onError?.(l)}else this.setChatStatus("ready")}catch(o){if(Rl(o)||u.signal.aborted)return a=!0,this.setChatStatus("ready"),{isAbort:a,isError:n};u.abort(),n=!0;const l=Ct(o);this.setChatError(l),s&&!Il(l)?(n=!1,this.setChatStatus("disconnected")):this.setChatStatus("error"),this.onError?.(l)}finally{this.activeAbortController===u&&(this.activeAbortController=void 0),await this.onFinish?.({message:i.message,messages:this.messages,terminal:i.terminal,isAbort:a,isError:n})}return{isAbort:a,isError:n}}applyAssistantChunk(t,r){Gl(t,r);let a;Sc(r)&&this.onData?.(Tc(t.message,r));const n=t.message.parts[t.message.parts.length-1];if(n&&re(n)&&n.state==="input-available"){const i=n;this.notifiedToolCalls.has(i.toolCallId)||(this.notifiedToolCalls.add(i.toolCallId),a=i)}if(!t.visible&&r.type!=="error"&&r.type!=="abort")return;const s=this.messages,u=s[s.length-1];u?.role==="assistant"&&u.id===t.message.id?(t.message=vc(t.message,u),this.setMessages([...s.slice(0,-1),t.message])):this.setMessages([...s,t.message]),a&&this.notifyToolCall(a)}updateLastAssistant(t){const r=this.messages,a=Cn(r,n=>n.role==="assistant");if(a===-1)throw new Error("No assistant message is available for tool continuation.");this.setMessages([...r.slice(0,a),t(r[a]),...r.slice(a+1)])}resolveToolCall(t,r){const a=fc(this.messages,t),n=r??a?.toolName;if(!n)throw new Error(`Tool call ${t} was not found.`);return{toolName:n}}resolveApprovalRequest(t){if(!t)throw new Error("Tool approval id is required.");const r=gc(this.messages,t);if(!r)throw new Error(`Tool approval request ${t} was not found.`);return r}async maybeSendAutomatically(t){if(this.status==="submitted"||this.status==="streaming")return;if(!await this.shouldSendAutomatically()){this.resetAutomaticContinuationIfIdle();return}const r=_c(this.messages);if(r.filter(n=>!this.consumedAutomaticContinuationKeys.has(n)).length!==0){if(this.automaticStepCount>=this.maxAutomaticSteps){this.onAutomaticStepLimitExceeded?.({messages:this.messages,maxAutomaticSteps:this.maxAutomaticSteps});return}for(const n of r)this.consumedAutomaticContinuationKeys.add(n);this.automaticStepCount+=1,await this.makeRequest({trigger:"submit-message",messageId:this.messages[this.messages.length-1]?.id,options:t,reducerMessage:this.lastAssistantMessage()})}}async maybeSendAutomaticallyAfterToolUpdate(t){if(this.status==="submitted"||this.status==="streaming"){this.rememberPendingAutomaticContinuation(t);return}await this.maybeSendAutomatically(t)}lastAssistantMessage(){return[...this.messages].reverse().find(t=>t.role==="assistant")}async shouldSendAutomatically(){if(!this.sendAutomaticallyWhen)return!1;try{return!!await this.sendAutomaticallyWhen({messages:this.messages})}catch(t){throw this.failChat(t)}}notifyToolCall(t){try{const r=this.onToolCall?.(t);kc(r)&&r.catch(a=>{const n=Ct(a);this.toolCallbackFailure=n,this.status!=="submitted"&&this.status!=="streaming"&&this.failChat(n)})}catch(r){throw Ct(r)}}failChat(t){const r=Ct(t);return this.setChatError(r),this.setChatStatus("error"),this.onError?.(r),r}resetAutomaticContinuation(){this.automaticStepCount=0,this.consumedAutomaticContinuationKeys.clear(),this.clearPendingAutomaticContinuation()}rememberPendingAutomaticContinuation(t){this.hasPendingAutomaticContinuation=!0,t&&(this.pendingAutomaticContinuationOptions=t)}consumePendingAutomaticContinuationOptions(t){const r=this.hasPendingAutomaticContinuation?this.pendingAutomaticContinuationOptions??t:t;return this.hasPendingAutomaticContinuation=!1,this.pendingAutomaticContinuationOptions=void 0,r}clearPendingAutomaticContinuation(){this.hasPendingAutomaticContinuation=!1,this.pendingAutomaticContinuationOptions=void 0}resetAutomaticContinuationIfIdle(){const t=this.lastAssistantMessage();(!t||!t.parts.some(bc))&&(this.automaticStepCount=0,this.clearPendingAutomaticContinuation())}setChatMessages(t){this.state.setMessages(t),this.emitChange()}setChatStatus(t){this.state.setStatus(t),this.emitChange()}setChatError(t){this.state.setError(t),this.emitChange()}emitChange(){for(const t of this.listeners)t()}}function hc({messages:e=[],status:t="ready",error:r}={}){let a=e,n=t,s=r;return{getMessages:()=>a,setMessages:u=>{a=u},getStatus:()=>n,setStatus:u=>{n=u},getError:()=>s,setError:u=>{s=u}}}function Cn(e,t){for(let r=e.length-1;r>=0;r-=1)if(t(e[r]))return r;return-1}function fc(e,t){for(let r=e.length-1;r>=0;r-=1){const a=e[r];if(a.role==="assistant")for(let n=a.parts.length-1;n>=0;n-=1){const s=a.parts[n];if(re(s)&&s.toolCallId===t)return{toolName:s.toolName}}}}function gc(e,t){for(let r=e.length-1;r>=0;r-=1){const a=e[r];if(a.role==="assistant")for(let n=a.parts.length-1;n>=0;n-=1){const s=a.parts[n];if(re(s)&&s.state==="approval-requested"&&s.approval?.id===t)return s}}}function re(e){return e.type.startsWith("tool-")}function bc(e){return re(e)&&(e.state==="input-streaming"||e.state==="input-available"||e.state==="approval-requested")}function mc(e){return re(e)&&(e.state==="output-available"||e.state==="output-error"||e.state==="output-denied")}function xc(e){return re(e)&&e.state==="approval-responded"}function yc(e){return mc(e)||xc(e)}function An(e){return kn(e)||e.state==="approval-responded"}function kn(e){return e.state==="output-available"||e.state==="output-error"||e.state==="output-denied"}function vc(e,t){const r=new Map(t.parts.filter(s=>re(s)&&An(s)).map(s=>[s.toolCallId,s]));if(r.size===0)return e;let a=!1;const n=e.parts.map(s=>{if(!re(s)||An(s))return s;const u=r.get(s.toolCallId);return u?(a=!0,{...s,...u,input:u.input??s.input,inputText:u.inputText??s.inputText,providerMetadata:u.providerMetadata??s.providerMetadata}):s});return a?{...e,parts:n}:e}function wc(e){const t=new Set;let r=!1;const a=[...e].reverse().map(n=>{if(n.role!=="assistant")return n;const s=[...n.parts].reverse().filter(u=>!re(u)||!kn(u)?!0:t.has(u.toolCallId)?(r=!0,!1):(t.add(u.toolCallId),!0)).reverse();return s.length===n.parts.length?n:{...n,parts:s}}).reverse();return r?a:e}function _c(e){const t=[...e].reverse().find(a=>a.role==="assistant");if(!t)return[];const r=t.parts.filter(yc);return r.length===0?[]:Array.from(new Set(r.map(Cc)))}function Cc(e){return Ec({toolCallId:e.toolCallId,toolName:e.toolName,state:e.state,approvalId:e.approval?.id,approved:e.approval?.approved})}function Ac(e){return!Number.isFinite(e)||e==null||e<1?5:Math.floor(e)}function kc(e){return typeof e=="object"&&e!==null&&"then"in e&&typeof e.then=="function"}function Ec(e){const t=new WeakSet,r=a=>{if(a===void 0)return'"[Undefined]"';if(typeof a=="bigint")return JSON.stringify(a.toString());if(a===null||typeof a=="string"||typeof a=="number"||typeof a=="boolean")return JSON.stringify(a);if(typeof a!="object")return JSON.stringify(String(a));if(t.has(a))return'"[Circular]"';if(t.add(a),Array.isArray(a))return`[${a.map(r).join(",")}]`;const n=a;return`{${Object.keys(n).sort().map(u=>`${JSON.stringify(u)}:${r(n[u])}`).join(",")}}`};return r(e)}function Sc(e){return e.type.startsWith("data-")}function Tc(e,t){return t.transient?{type:t.type,id:t.id,name:t.name,data:t.data,transientData:!0}:e.parts.find(a=>a.type===t.type&&a.type.startsWith("data-")&&a.id===t.id)??{type:t.type,id:t.id,name:t.name,data:t.data,transientData:!1}}function Dc(e,t={}){const r=t.maxMessages,a=typeof r=="number"&&r>=0?e.slice(Math.max(0,e.length-r)):[...e],n=t.removePendingToolParts!==!1,s=[];for(const u of a){const i=n?u.parts.filter(o=>!Pc(o)):[...u.parts];i.length!==0&&s.push({...u,parts:i.map(o=>({...o}))})}return s}function Pc(e){return $c(e)&&(e.state==="input-streaming"||e.state==="input-available"||e.state==="approval-requested")}function $c(e){return e.type.startsWith("tool-")}const yr="summaraidgpt:agent-after-navigation",Fc=15e3,Mc="我已经打开了新的页面，请基于当前页面继续完成上一条用户请求。必要时先查看当前页面上下文。";function Tt(e={},t=window.sessionStorage){const r={openChat:!0,focusChatInput:!0,displayMode:e.displayMode??"panel",expiresAt:Date.now()+Fc};e.resume?.historyMessages?.length&&(r.resume={message:e.resume.message?.trim()||Mc,historyMessages:e.resume.historyMessages}),t.setItem(yr,JSON.stringify(r))}function Ic(e=window.sessionStorage){const t=e.getItem(yr);if(e.removeItem(yr),!!t)try{const r=JSON.parse(t);return typeof r.expiresAt!="number"||r.expiresAt<Date.now()?void 0:{openChat:r.openChat===!0,focusChatInput:r.focusChatInput!==!1,displayMode:r.displayMode==="stage"?"stage":"panel",resume:Rc(r.resume),expiresAt:r.expiresAt}}catch{return}}function Rc(e){if(typeof e!="object"||e===null)return;const t=e;if(!(typeof t.message!="string"||!t.message.trim()||!Array.isArray(t.historyMessages)))return{message:t.message.trim(),historyMessages:t.historyMessages}}const En=new Map,Sn="#a16207",Nc="#ffffff",zc="#f4f4f5",Oc="#52525b";function Tn(e,t){/^[a-z][a-z0-9_]{2,63}$/.test(e)&&En.set(e,t)}function Lc(){window.SummaraidGPTAI||(window.SummaraidGPTAI={registerTool:Tn}),window.Live2DAI||(window.Live2DAI={registerTool:Tn})}Lc();class Bc{constructor(t){this.trustedResources=new Map,this.trustedPageLinks=new Map,this.navigationStarted=!1,this.config=Ot(t)}canExecute(t){return this.builtInToolNames().has(t)||this.config.aiTools.some(r=>r.name===t)}ingestMessages(t){for(const r of t)for(const a of r.parts)!Uc(a)||a.state!=="output-available"||this.ingestToolOutput(a.output)}async execute(t){const r=t.input??{};try{if(t.toolName==="get_current_page_context")return this.getCurrentPageContext();if(t.toolName==="open_halo_resource")return this.openHaloResource(r);if(t.toolName==="open_current_page_link")return this.openCurrentPageLink(r);if(t.toolName==="open_comment_area")return this.scrollToCommentArea();if(t.toolName==="draft_comment")return this.config.builtIn.commentCapability==="off"?N("TOOL_NOT_ALLOWED","评论辅助能力未启用"):this.fillCommentDraft(r);if(t.toolName==="submit_comment")return this.config.builtIn.commentCapability!=="submit"?N("TOOL_NOT_ALLOWED","评论提交能力未启用"):this.submitComment(r);const a=this.config.aiTools.find(u=>u.name===t.toolName);if(!a)return N("TOOL_NOT_FOUND","这个功能还没有配置好");const n=a.action;if(this.requiresApproval(a.approval,n)&&!await this.requestApproval(`要我帮你执行「${a.description}」吗？`))return N("TOOL_APPROVAL_DENIED","访客取消了这次操作");this.showStatus(n.pendingMessage??"我来帮你处理一下");const s=await this.executeCustomAction(n,r,t.toolName);return this.showStatus(s.ok?n.successMessage:n.errorMessage),s}catch(a){return N("TOOL_EXECUTION_FAILED",a instanceof Error?a.message:"工具执行失败")}}tryOpenStrongResourceMatch(t){if(this.navigationStarted||!this.config.builtIn.haloNavigation)return;const r=qc(t);if(!r||!Hc(r))return;const s=[...this.trustedResources.values()].map(u=>({resource:u,score:jc(u,r)})).filter(u=>u.score>0).sort((u,i)=>i.score-u.score)[0]?.resource;if(s)return this.showStatus(`正在打开${s.title||"页面"}`),this.navigate(s.permalink)}requestApproval(t){return new Promise(r=>{document.getElementById("summaraid-agent-approval")?.remove();const a=document.createElement("div");a.id="summaraid-agent-approval",a.style.cssText=["position:fixed","left:50%","bottom:5.5rem","z-index:100001","transform:translateX(-50%)","display:flex","align-items:center","gap:.5rem","max-width:min(28rem,calc(100vw - 1rem))","padding:.5rem .625rem","border:1px solid rgba(24,24,27,.12)","border-radius:.75rem","background:rgba(255,255,255,.98)","box-shadow:0 18px 44px rgba(15,23,42,.16)","font-size:13px","color:#334155"].join(";");const n=document.createElement("span");n.textContent=t,n.style.cssText="line-height:1.4;min-width:0;flex:1;";const s=document.createElement("button");s.type="button",s.textContent="允许",s.style.cssText=Dn(Sn,Nc);const u=document.createElement("button");u.type="button",u.textContent="取消",u.style.cssText=Dn(zc,Oc);const i=o=>{a.remove(),r(o)};s.addEventListener("click",()=>i(!0),{once:!0}),u.addEventListener("click",()=>i(!1),{once:!0}),a.append(n,s,u),document.body.append(a)})}builtInToolNames(){const t=new Set;if(!this.config.enabled)return t;const r=this.config.builtIn;return r.pageContext&&t.add("get_current_page_context"),r.haloNavigation&&(t.add("open_halo_resource"),t.add("open_current_page_link")),r.commentCapability!=="off"&&(t.add("open_comment_area"),t.add("draft_comment")),r.commentCapability==="submit"&&t.add("submit_comment"),t}getCurrentPageContext(){const t=window.getSelection()?.toString().trim()??"",r=this.findCommentInput(),a=this.findCommentArea(),n=r?.container?this.findCommentSubmitButton(r.container):void 0,s=this.collectLinkSummaries();this.trustedPageLinks.clear();for(const u of s)this.trustedPageLinks.set(u.linkId,u);return{ok:!0,title:document.title,url:window.location.href,path:window.location.pathname,description:document.querySelector("meta[name='description']")?.content.trim()??"",headings:this.collectHeadings(),selectedText:t.slice(0,1600),capabilities:{comment:{hasArea:!!a,hasInput:!!r,hasSubmitButton:!!n,reason:a?r?n?"当前页面支持填写评论":"当前页面有可写评论输入框，但没有检测到提交按钮":"当前页面有评论区，但没有检测到可写评论输入框":"当前页面没有检测到评论区"},forms:this.collectFormSummaries(),links:s}}}openHaloResource(t){const r=vr(t.resourceId);if(!r)return N("INVALID_INPUT","resourceId is required");const a=this.trustedResources.get(r);return a?this.navigate(a.permalink):N("RESOURCE_NOT_TRUSTED","没有找到可信资源")}openCurrentPageLink(t){const r=vr(t.linkId);if(!r)return N("INVALID_INPUT","linkId is required");const a=this.trustedPageLinks.get(r);return a?this.navigate(a.href):N("LINK_NOT_TRUSTED","没有找到可信链接")}scrollToCommentArea(){const t=this.findCommentArea();return t?(t.scrollIntoView?.({behavior:"smooth",block:"center"}),this.showStatus("已经帮你定位到评论区"),{ok:!0}):N("COMMENT_AREA_NOT_FOUND","当前页面没有检测到评论区")}fillCommentDraft(t){const r=vr(t.content);if(!r)return N("INVALID_INPUT","content is required");const a=this.findCommentInput();return a?(a.container?.scrollIntoView?.({behavior:"smooth",block:"center"}),this.writeCommentInput(a.input,r),a.input.focus(),this.showStatus("评论草稿已经帮你填好了"),{ok:!0,drafted:!0}):(this.scrollToCommentArea(),N("COMMENT_INPUT_NOT_FOUND",this.findCommentArea()?"当前页面有评论区，但没有找到可写评论输入框":"当前页面没有检测到评论区，无法填写评论"))}submitComment(t){const r=this.fillCommentDraft(t);if(!r.ok)return r;const a=this.findCommentInput(),n=a?.container?this.findCommentSubmitButton(a.container):void 0;return n?(n.click(),this.showStatus("已经尝试提交评论"),{ok:!0,submitted:!0}):N("COMMENT_SUBMIT_NOT_FOUND","没有找到评论提交按钮")}async executeCustomAction(t,r,a){if(t.type==="navigate")return this.navigate(t.url,t.target);if(t.type==="scroll-to")return this.scrollToSelector(t.selector,t.behavior);if(t.type==="highlight")return this.highlight(t.selector,t.duration);if(t.type==="dispatch-event")return window.dispatchEvent(new CustomEvent(t.event,{detail:r})),{ok:!0};const n=En.get(a);return n?{ok:!0,output:await n({input:r,toolName:a})}:N("TOOL_EXECUTOR_NOT_FOUND","这个站点还没有启用对应能力")}navigate(t,r="_self"){const a=new URL(t,window.location.origin);if(!this.isAllowedUrl(a))return N("URL_NOT_ALLOWED","这个链接不在允许范围内");const n=r==="_blank"&&this.config.toolSecurity.allowNewTab;return this.navigationStarted=!0,n||Tt(),window.setTimeout(()=>{n?window.open(a.href,"_blank","noopener,noreferrer"):window.location.assign(a.href)},50),{ok:!0,navigating:!0,pageReload:!n,url:a.href}}scrollToSelector(t,r="smooth"){const a=document.querySelector(t);return a?(a.scrollIntoView?.({behavior:r,block:"center"}),{ok:!0}):N("ELEMENT_NOT_FOUND","没有找到对应的位置")}highlight(t,r=1600){const a=document.querySelector(t);if(!a)return N("ELEMENT_NOT_FOUND","没有找到对应的位置");const n=a.style.outline,s=a.style.outlineOffset;return a.style.outline=`2px solid ${Sn}`,a.style.outlineOffset="3px",window.setTimeout(()=>{a.style.outline=n,a.style.outlineOffset=s},r),{ok:!0}}isAllowedUrl(t){return t.protocol!=="http:"&&t.protocol!=="https:"?!1:t.origin===window.location.origin?!0:this.config.toolSecurity.allowedExternalOrigins.includes(t.origin)}requiresApproval(t,r){return t==="always"?!0:t==="never"?!1:r.type==="registered"||r.type==="dispatch-event"?!0:r.type==="navigate"&&r.url?new URL(r.url,window.location.origin).origin!==window.location.origin:!1}ingestToolOutput(t){if(!t||typeof t!="object")return;const r=t;if(Array.isArray(r.resources))for(const a of r.resources)this.ingestResource(a);this.ingestResource(r.resource),this.ingestToolOutput(r.output)}ingestResource(t){if(!t||typeof t!="object")return;const r=t;r.resourceId&&r.permalink&&this.trustedResources.set(r.resourceId,{resourceId:r.resourceId,permalink:r.permalink,title:r.title,resourceType:typeof r.resourceType=="string"?r.resourceType:void 0,metadataName:typeof r.metadataName=="string"?r.metadataName:void 0})}showStatus(t){t&&window.dispatchEvent(new CustomEvent("summaraid:agent-status",{detail:{message:t}}))}findCommentInput(){const t=this.commentContainers();for(const a of t){const n=this.findWritableCommentInput(a);if(n)return{container:a,input:n}}const r=this.findWritableCommentInput(document.body);return r?{container:void 0,input:r}:void 0}commentContainers(){return[...document.querySelectorAll(["#comment","#comments","halo-comment","[data-comment]",".comment",".comments",".comment-form"].join(","))]}findCommentArea(){return this.commentContainers()[0]}collectHeadings(){return[...document.querySelectorAll("h1,h2,h3")].map(t=>({level:Number(t.tagName.slice(1)),text:(t.textContent??"").trim()})).filter(t=>t.text).slice(0,8)}collectFormSummaries(){return[...document.querySelectorAll("form")].map(t=>({id:t.id||void 0,name:t.getAttribute("name")||void 0,fields:[...t.querySelectorAll("input,textarea,select")].map(r=>r.getAttribute("name")||r.getAttribute("aria-label")||r.id).filter(r=>!!r).slice(0,12),submitLabels:[...t.querySelectorAll("button,input[type='submit']")].map(r=>(r.textContent||r.getAttribute("value")||r.getAttribute("aria-label")||"").trim()).filter(r=>r).slice(0,6)})).slice(0,6)}collectLinkSummaries(){return[...document.querySelectorAll("a[href]")].map((t,r)=>({linkId:`link-${r}`,text:(t.textContent??"").trim().replace(/\s+/g," "),href:t.href})).filter(t=>t.text&&this.isAllowedUrl(new URL(t.href))).slice(0,30)}findWritableCommentInput(t){const r=["textarea:not([disabled]):not([readonly])","[contenteditable='true']","[contenteditable='']","input[name='content']:not([disabled]):not([readonly])","input[name='comment']:not([disabled]):not([readonly])"];for(const a of r){const n=this.deepQuerySelector(t,a);if(n&&this.isWritableCommentInput(n))return n}}findCommentSubmitButton(t){const r=["button[type='submit']:not([disabled])","input[type='submit']:not([disabled])","button:not([disabled])","[role='button']:not([aria-disabled='true'])"];for(const a of r){const s=this.deepQuerySelectorAll(t,a).find(u=>{const i=`${u.textContent??""} ${u.getAttribute("aria-label")??""} ${u.getAttribute("value")??""}`.trim();return/提交|评论|发送|发布|回复|submit|send|post|reply/i.test(i)});if(s)return s}}deepQuerySelector(t,r){return this.deepQuerySelectorAll(t,r)[0]}deepQuerySelectorAll(t,r){const a=[],n=s=>{if("querySelectorAll"in s){a.push(...s.querySelectorAll(r));for(const u of[...s.querySelectorAll("*")])u.shadowRoot&&n(u.shadowRoot)}};return n(t),a}isWritableCommentInput(t){return t instanceof HTMLTextAreaElement||t instanceof HTMLInputElement||t instanceof HTMLElement&&t.isContentEditable}writeCommentInput(t,r){t instanceof HTMLTextAreaElement||t instanceof HTMLInputElement?Object.getOwnPropertyDescriptor(Object.getPrototypeOf(t),"value")?.set?.call(t,r):t.textContent=r;const a=typeof InputEvent=="function"?new InputEvent("input",{bubbles:!0,inputType:"insertText",data:r}):new Event("input",{bubbles:!0});t.dispatchEvent(a),t.dispatchEvent(new Event("change",{bubbles:!0}))}}function Uc(e){return e.type.startsWith("tool-")}function vr(e){return typeof e=="string"&&e.trim()?e.trim():void 0}function N(e,t){return{ok:!1,errorCode:e,message:t}}function Dn(e,t){return["border:none","border-radius:.55rem","padding:.35rem .65rem","font:inherit","font-weight:700",`background:${e}`,`color:${t}`,"cursor:pointer"].join(";")}function qc(e){return e.trim().replace(/^(打开|跳转到?|带我去|看看|查看|进入|去一下|访问)\s*/u,"").replace(/[。！？?!,.，、\s]/gu,"").toLowerCase()}function Pn(e){return(e??"").trim().replace(/[。！？?!,.，、\s_-]/gu,"").toLowerCase()}function Hc(e){return!(e.length<2||e.length>18||/^(为什么|怎么|如何|什么|是否|能不能|可不可以|介绍|解释|总结|告诉我)/u.test(e))}function jc(e,t){const r=Pn(e.title),a=Pn(e.metadataName),u=(e.resourceType??"").includes("singlepage")?20:0;return r&&r===t?100+u:a&&a===t?92+u:r&&(t.includes(r)||r.includes(t))&&Math.min(r.length,t.length)>=2?80+u:a&&(t.includes(a)||a.includes(t))&&Math.min(a.length,t.length)>=2?70+u:0}const Gc=/^[A-Za-z][A-Za-z0-9_-]*$/;class Wc extends wn{async*processResponse(t){const r=new Map,a=t.headers.get("X-SummaraidGPT-Trace-Id");let n=0;for await(const s of super.processResponse(t)){if(n+=1,!s?.type?.startsWith("tool-")){yield s;continue}const u=s,i=typeof u.toolCallId=="string"?u.toolCallId:"",o=r.get(i),c=u.toolName==null||typeof u.toolName=="string"&&!u.toolName.trim()?o:u.toolName,d={eventType:s.type,eventIndex:n,toolName:u.toolName,toolCallId:u.toolCallId,previousName:o,traceId:a};if(c==null)throw new wr("missing-name",d);if(typeof c!="string"||!Gc.test(c))throw new wr("invalid-name",d);if(o&&o!==c)throw new wr("conflicting-name",d);i.trim()&&r.set(i,c),yield{...s,toolName:c}}}}class wr extends Error{constructor(t,r){const a={"missing-name":"工具调用事件缺少 toolName，且没有同一调用的已知工具名可供补全。","invalid-name":"工具名格式无效：必须以英文字母开头，后续只能包含字母、数字、下划线或连字符。","conflicting-name":"同一个 toolCallId 返回了不同的工具名，已停止本次调用。"};super([`Agent 工具调用协议异常：${a[t]}`,`事件：${tt(r.eventType)}（第 ${r.eventIndex} 个）`,`工具名：${tt(r.toolName)}`,`调用 ID：${tt(r.toolCallId)}`,...r.previousName?[`此前工具名：${tt(r.previousName)}`]:[],...r.traceId?[`追踪 ID：${tt(r.traceId)}`]:[],"请站长检查模型的工具调用输出及 AI Foundation 版本，结合服务端日志排查。"].join(`
`)),this.name="AgentToolStreamError",this.reason=t,this.details=r}}function tt(e){return e==null?"（缺失）":typeof e!="string"?`（类型错误：${typeof e}）`:JSON.stringify(e.length>160?`${e.slice(0,160)}...`:e)}const Vc=new Set(["search_halo_resources","get_halo_resource_detail","get_latest_halo_resources","get_categories","get_tags","get_posts_by_category","get_posts_by_tag","get_pages","search_rag_resources","get_rag_resource_detail","fetch_allowed_url"]),Zc=6;class $n{async sendMessage(t,r,a={}){const n=new Bc(r.agent),s=new Set,u=new Map,i=new Set,o=new Set,l=new Set,c=new Set;let d="";s0(r.historyMessages??[],l);const f=g=>{const b=g.finally(()=>s.delete(b));return s.add(b),b},h=()=>this.chat?.status==="submitted"||this.chat?.status==="streaming",p=g=>{if(!i.has(g.toolCallId)){if(h()){u.set(g.toolCallId,g);return}return i.add(g.toolCallId),n.canExecute(g.toolName)?f(n.execute(g).then(b=>(Dt(b)&&Tt({displayMode:r.afterNavigationDisplayMode,resume:{historyMessages:a0(this.chat.messages,g,b)}}),this.chat.addToolOutput({toolCallId:g.toolCallId,toolName:g.toolName,output:b}).then(()=>b))).then(b=>{Dt(b)&&Tt({displayMode:r.afterNavigationDisplayMode,resume:{historyMessages:_r(this.chat.messages)}})}).then(()=>{})):Vc.has(g.toolName)?void 0:f(this.chat.addToolOutput({toolCallId:g.toolCallId,toolName:g.toolName,state:"output-error",errorText:"当前页面没有启用这个浏览器能力"}).then(()=>{}))}},w=()=>{if(h()||u.size===0)return;const g=[...u.values()];u.clear(),g.forEach(p)},v=async()=>{for(;(s.size>0||u.size>0)&&(w(),s.size!==0);)await Promise.allSettled([...s])},E=()=>{const g=this.chat;if(!g)return;const b=Cr(g.messages);if(b.some(zn))return;const y=Yc(b);if(!y.length)return;const D=JSON.stringify(y.map(T=>[T.id,T.title,T.url,T.sourceType]));D!==d&&(d=D,a.onSources?.(y))};this.chat=new pc({id:"summaraid-rag-agent",messages:r.historyMessages??[],transport:new Wc({api:`${pt}/ragAgentChat`,credentials:"same-origin",body:{conversationId:r.conversationId,visitorId:r.visitorId,recordUserMessage:r.recordUserMessage!==!1,ragEnabledForAgent:r.ragEnabledForAgent===!0},prepareSendMessagesRequest:g=>{for(const b of On(g.messages,y=>n.canExecute(y.toolName)))c.add(b);return{}}}),onError:g=>{console.error("[summaraidGPT] Agent chat stream failed",g),a.onError?.(g.message)},onToolCall:g=>{if(g.state==="input-available")return p(g)},sendAutomaticallyWhen:({messages:g})=>{const b=On(g,y=>n.canExecute(y.toolName));return t0(g,y=>n.canExecute(y.toolName))&&b.some(y=>!c.has(y))},maxAutomaticSteps:5,onFinish:({messages:g,isAbort:b,isError:y})=>{!b&&!y&&a.onFinish?.(g)}});const m=this.chat.subscribe(()=>{const g=this.chat;if(!g)return;const b=g.messages[g.messages.length-1];if(n.ingestMessages(g.messages),u0(g.messages,l),E(),!b||b.role!=="assistant"){w();return}for(const T of b.parts)Un(T,l),H(T)&&T.state==="input-available"&&p(T),H(T)&&T.state==="approval-requested"&&T.approval?.id&&!o.has(T.approval.id)&&(o.add(T.approval.id),f(n.requestApproval(`要我帮你执行「${T.toolName}」吗？`).then(V=>g.addToolApprovalResponse({id:T.approval?.id,toolCallId:T.toolCallId,toolName:T.toolName,approved:V,reason:V?"Approved by visitor":"Denied by visitor"})).then(()=>{})));const y=n.tryOpenStrongResourceMatch(t);y?.ok&&Dt(y)&&Tt({displayMode:r.afterNavigationDisplayMode,resume:{historyMessages:_r(g.messages)}});const D=Xc(g.messages);D!==void 0&&a.onText?.(D),w()}),x=()=>this.stop();r.signal?.addEventListener("abort",x,{once:!0});try{if(await this.chat.sendMessage({text:t}),w(),await v(),E(),a.onFinish?.(this.chat.messages),this.chat.error)throw this.chat.error;return this.chat.messages}catch(g){throw console.error("[summaraidGPT] Agent chat request failed",g),g}finally{r.signal?.removeEventListener("abort",x),m()}}stop(){this.chat?.stop(),this.chat=void 0}}function Yc(e){const t=[];let r=0;const a=u=>{if(!u||typeof u!="object")return;const i=u;if(Array.isArray(i.resources))for(const o of i.resources)Fn(o,t,1,r++);Fn(i.resource,t,2,r++),a(i.output)};for(const u of e)for(const i of u.parts)H(i)&&i.state==="output-available"&&a(i.output);const n=Qc(t),s=n.some(u=>u.priority>=2);return n.filter(u=>!s||u.priority>=2).sort(Jc).slice(0,Zc).map(u=>u.source)}function Fn(e,t,r,a){if(!e||typeof e!="object")return;const n=e,s=le(n.resourceId)||le(n.id);s&&t.push({priority:r,order:a,source:{id:s,title:le(n.title),url:le(n.permalink)||le(n.url),sourceType:le(n.resourceType),content:le(n.excerpt),metadata:{metadataName:le(n.metadataName)||""}}})}function Qc(e){const t=[];for(const r of e){const a=Mn(r.source),n=t.find(u=>Mn(u.source).some(i=>a.includes(i)));if(!n){t.push({...r});continue}const s=n.priority;n.priority=Math.max(n.priority,r.priority),n.order=Math.min(n.order,r.order),(Fe(r.source)>Fe(n.source)||Fe(r.source)===Fe(n.source)&&r.priority>s)&&(n.source=r.source)}return t}function Jc(e,t){return t.priority-e.priority||Fe(t.source)-Fe(e.source)||e.order-t.order}function Mn(e){return[e.id?`id:${e.id}`:void 0,In(e.url)?`url:${In(e.url)}`:void 0,Rn(e.title)?`title:${Rn(e.title)}`:void 0].filter(t=>!!t)}function Fe(e){const t=e.sourceType?.toLowerCase()||"";return t.includes("post.content.halo.run")||t.includes("singlepage.content.halo.run")?3:t.includes("ragdocument")?2:e.url?1:0}function In(e){if(!e)return"";try{const t=new URL(e,window.location.origin);return t.hash="",t.href.replace(/\/$/,"").toLowerCase()}catch{return e.trim().replace(/\/$/,"").toLowerCase()}}function Rn(e){return e?.trim().replace(/\s+/g," ").toLowerCase()||""}function Nn(e){return Kc(e.parts.filter(t=>t.type==="text").map(t=>t.text).join(""))}function Kc(e){return e.replace(/<\|tool_calls_section_begin\|>[\s\S]*?(?:<\|tool_calls_section_end\|>|$)/g,"").replace(/<\|tool_call_begin\|>[\s\S]*?(?:<\|tool_call_end\|>|$)/g,"").replace(/<\|tool_call_argument_begin\|>[\s\S]*?(?:<\|tool_call_end\|>|$)/g,"").replace(/<\|tool_[^>\s]*(?:\|>)?/g,"").trimEnd()}function Xc(e){const t=Cr(e),r=[...t].reverse().find(s=>s.role==="assistant");if(!r)return;if(!t.some(s=>s.parts.some(u=>H(u))))return Nn(r);if(t.some(zn))return"";const n=e0(r);return n<0?Nn(r):r.parts.slice(n+1).filter(s=>s.type==="text").map(s=>s.text).join("")}function e0(e){for(let t=e.parts.length-1;t>=0;t-=1)if(H(e.parts[t]))return t;return-1}function zn(e){return e.parts.some(t=>H(t)&&t.state!=="output-available"&&t.state!=="output-error"&&t.state!=="output-denied"&&t.state!=="approval-responded")}function On(e,t=()=>!0){const r=[...e].reverse().find(n=>n.role==="assistant");if(!r)return[];const a=r.parts.filter(n=>H(n)).filter(t).filter(Ln).map(r0);return[...new Set(a)]}function t0(e,t){const r=[...e].reverse().find(n=>n.role==="assistant");if(!r)return!1;const a=r.parts.filter(n=>H(n)).filter(t);return a.length>0&&a.every(Ln)}function Ln(e){return Bn(e)||e.state==="approval-responded"}function r0(e){return JSON.stringify({toolCallId:e.toolCallId,toolName:e.toolName,state:e.state,approvalId:e.approval?.id,approved:e.approval?.approved})}function Bn(e){return e.state==="output-available"||e.state==="output-error"||e.state==="output-denied"}function Dt(e){if(typeof e!="object"||e===null)return!1;const t=e;return t.navigating===!0?t.pageReload!==!1:Dt(t.output)}function a0(e,t,r){return _r(e.map(a=>{if(a.role!=="assistant")return a;const n=a.parts.map(s=>!H(s)||s.toolCallId!==t.toolCallId?s:{...s,type:`tool-${t.toolName}`,toolName:t.toolName,toolCallId:t.toolCallId,state:"output-available",output:r});return{...a,parts:n}}))}function _r(e,t){return n0(Dc(e,{maxMessages:t}))}function n0(e){const t=new Set;return[...e].reverse().map(r=>{if(r.role!=="assistant")return r;const a=[...r.parts].reverse().filter(n=>!H(n)||!Bn(n)?!0:t.has(n.toolCallId)?!1:(t.add(n.toolCallId),!0)).reverse();return a.length===r.parts.length?r:{...r,parts:a}}).reverse().filter(r=>r.parts.length>0)}function H(e){return e.type.startsWith("tool-")}function le(e){return typeof e=="string"&&e.trim()?e.trim():void 0}function Cr(e){for(let t=e.length-1;t>=0;t-=1)if(e[t].role==="user")return e.slice(t+1);return e}function s0(e,t){for(const r of e)for(const a of r.parts)H(a)&&t.add(`${a.toolCallId}:${a.state}`)}function u0(e,t){for(const r of Cr(e))for(const a of r.parts)Un(a,t)}function Un(e,t){if(!H(e))return;const r=`${e.toolCallId}:${e.state}`;if(t.has(r))return;const a=i0(e);a&&(t.add(r),window.dispatchEvent(new CustomEvent("summaraid:agent-status",{detail:a})))}function i0(e){if(e.state==="input-available")return{message:o0(e.toolName),kind:"pending"};if(e.state==="approval-requested")return{message:`等待确认「${rt(e.toolName)}」`,kind:"warning"};if(e.state==="output-available")return{message:l0(e.toolName,e.output),kind:"success"};if(e.state==="output-error")return{message:`${rt(e.toolName)}失败`,kind:"error"};if(e.state==="output-denied")return{message:`已取消「${rt(e.toolName)}」`,kind:"warning"}}function o0(e){return{get_current_page_context:"正在读取当前页面",search_halo_resources:"正在搜索站内内容",get_halo_resource_detail:"正在读取站内资源",get_latest_halo_resources:"正在查看最新内容",get_categories:"正在查看分类",get_tags:"正在查看标签",get_posts_by_category:"正在查看分类文章",get_posts_by_tag:"正在查看标签文章",get_pages:"正在查找页面",search_rag_resources:"正在检索知识库",get_rag_resource_detail:"正在读取知识库详情",open_halo_resource:"正在打开页面",open_current_page_link:"正在打开当前页链接",open_comment_area:"正在定位评论区",draft_comment:"正在填写评论草稿",submit_comment:"正在提交评论",fetch_allowed_url:"正在读取外部资料"}[e]||`正在执行「${rt(e)}」`}function l0(e,t){const r=qn(t);return e==="search_rag_resources"?r>0?`知识库命中 ${r} 条资料`:"知识库没有命中资料":e==="search_halo_resources"||e==="get_pages"?r>0?`找到 ${r} 个站内资源`:"没有找到匹配资源":e==="get_current_page_context"?"已读取当前页面":e.startsWith("open_")?"页面打开请求已发送":e.includes("comment")?"评论操作已处理":`${rt(e)}完成`}function rt(e){return{get_current_page_context:"读取页面",search_halo_resources:"站内搜索",search_rag_resources:"知识库检索",get_rag_resource_detail:"知识库详情",open_halo_resource:"打开页面",open_current_page_link:"打开链接",draft_comment:"评论草稿",submit_comment:"提交评论"}[e]||e.replace(/^tool-/,"").replace(/_/g," ")}function qn(e){if(!e||typeof e!="object")return 0;const t=e;return Array.isArray(t.resources)?t.resources.length:t.resource?1:qn(t.output)}const Hn={ATTRIBUTE:1,CHILD:2},jn=e=>(...t)=>({_$litDirective$:e,values:t});let Gn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,a){this._$Ct=t,this._$AM=r,this._$Ci=a}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};class Ar extends Gn{constructor(t){if(super(t),this.it=_,t.type!==Hn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===_||t==null)return this._t=void 0,this.it=t;if(t===ne)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}}Ar.directiveName="unsafeHTML",Ar.resultType=1;const Wn=jn(Ar);const Vn="important",c0=" !"+Vn,d0=jn(class extends Gn{constructor(e){if(super(e),e.type!==Hn.ATTRIBUTE||e.name!=="style"||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,r)=>{const a=e[r];return a==null?t:t+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${a};`},"")}update(e,[t]){const{style:r}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const a of this.ft)t[a]==null&&(this.ft.delete(a),a.includes("-")?r.removeProperty(a):r[a]=null);for(const a in t){const n=t[a];if(n!=null){this.ft.add(a);const s=typeof n=="string"&&n.endsWith(c0);a.includes("-")||s?r.setProperty(a,s?n.slice(0,-11):n,s?Vn:""):r[a]=n}}return ne}}),Zn="ri:book-open-line",Yn="https://api.iconify.design",Qn=/^([a-z0-9]+(?:-[a-z0-9]+)*):([a-z0-9]+(?:-[a-z0-9]+)*)$/i;function W(e,t="iconify-icon"){const r=p0(e)||kr(Zn);return C`
    <span
      class=${t}
      style=${d0({"--rag-icon-source":`url("${r}")`})}
      aria-hidden="true"
    ></span>
  `}function p0(e){const t=e?.trim();if(t){if(h0(t))return kr(t);if(f0(t))return m0(t);if(g0(t)||b0(t))return t}}function h0(e){return Qn.test(e)}function kr(e){const t=e.match(Qn);if(!t)return kr(Zn);const[,r,a]=t;return`${Yn}/${encodeURIComponent(r)}/${encodeURIComponent(a)}.svg`}function f0(e){return e.startsWith("<svg")&&e.endsWith("</svg>")}function g0(e){return e.startsWith("data:image/svg+xml")}function b0(e){try{const t=new URL(e);return t.origin===Yn&&t.pathname.endsWith(".svg")}catch{return!1}}function m0(e){return`data:image/svg+xml;charset=utf-8,${encodeURIComponent(e)}`}function Jn(){return W("ri:close-line")}function Kn(){return W("ri:send-plane-2-line")}function Er(){return W("ri:chat-new-line")}function x0(){return W("ri:file-text-line")}function y0(){return W("ri:external-link-line")}function v0(){return W("ri:fullscreen-line")}function w0(){return W("ri:focus-3-line")}function xe(){return W("ri:question-answer-line")}function Xn(){return W("ri:file-copy-line")}function es(){return W("ri:refresh-line")}function ts(){return W("ri:stop-circle-line")}function rs(e){return C`<div class="pet-source-list">${e.map(t=>_0(t))}</div>`}function _0(e){const t=A0(e),r=C`
    <span class="pet-source-icon">${x0()}</span>
    <span class="pet-source-main">
      <span class="pet-source-title">${C0(e)}</span>
      ${t?C`<span class="pet-source-meta">${t}</span>`:_}
    </span>
    ${e.url?C`<span class="pet-source-open">${y0()}</span>`:_}
  `;return e.url?C`
        <a class="pet-source-row" href=${e.url} target="_blank" rel="noopener noreferrer">
          ${r}
        </a>
      `:C`<div class="pet-source-row">${r}</div>`}function C0(e){const t=e.title?.trim();return t?`《${t}》`:"未命名来源"}function A0(e){return[k0(e.sourceType),typeof e.score=="number"?`score ${E0(e.score)}`:void 0,e.chunkCount?`${e.chunkCount} 分块`:void 0,e.chunkIndexes?.length?`#${e.chunkIndexes.join(", #")}`:void 0].filter(Boolean).join(" · ")}function k0(e){if(!e)return;const t=e.trim().toLowerCase();return{"ragdocument.summaraidgpt.lik.cc":"RAG 知识库","post.content.halo.run":"站内文章","singlepage.content.halo.run":"独立页面","category.content.halo.run":"分类","tag.content.halo.run":"标签",post:"站内文章",page:"独立页面",docsme:"Docsme 文档",manual:"手动导入",attachment:"附件"}[t]||void 0}function E0(e){return Number.isFinite(e)?Math.abs(e)>=10?e.toFixed(2):e.toFixed(4):"-"}function as(){return C`<span class="typing" aria-label="正在输出"><span></span><span></span><span></span></span>`}function S0(){return Gr`
    <svg class="stellar-drone" viewBox="0 0 96 108" fill="none" aria-hidden="true" focusable="false">
      <g class="drone-orbit" stroke="currentColor" stroke-width="1.2">
        <ellipse cx="48" cy="57" rx="42" ry="15" transform="rotate(-18 48 57)" stroke-dasharray="48 12 7 12" />
        <path d="M11 69h5m-2.5-2.5v5M80 35h6m-3-3v6" />
      </g>
      <g class="drone-body">
        <path class="drone-wing" d="m20 45-10 6v19l13-4M76 45l10 6v19l-13-4" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
        <path class="drone-hull" d="m26 29 9-8h26l9 8 7 18v21l-10 12H29L19 68V47z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
        <path class="drone-status" d="M36 20v-6h24v6M42 14V9h12v5M26 72l6 5h32l6-5" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" />
        <path class="drone-visor" d="m30 33 6-5h24l6 5 4 11-6 9H32l-6-9z" stroke="currentColor" stroke-width="1.2" />
        <path class="drone-eye" d="M35 39v7m26-7v7" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
        <path class="drone-status" d="M44 48h8M29 59h6m26 0h6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
        <path class="drone-core" d="m48 57 3 6 6 3-6 3-3 6-3-6-6-3 6-3z" stroke="currentColor" stroke-width="1.2" />
        <path class="drone-thruster" d="m33 83 3 9m12-9v13m15-13-3 9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        <path class="drone-status" d="M37 99h22" stroke="currentColor" stroke-width="1" stroke-dasharray="3 4" />
      </g>
    </svg>
  `}function ce(){return Gr`
    <svg class="stellar-emblem" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
      <path d="m10 3 12 0 7 7v12l-7 7H10l-7-7V10z" stroke="currentColor" stroke-width="1.2" />
      <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(-35 16 16)" stroke="currentColor" stroke-width="1" stroke-dasharray="18 4 8 4" />
      <path class="drone-core" d="m16 8 2.6 5.4L24 16l-5.4 2.6L16 24l-2.6-5.4L8 16l5.4-2.6z" stroke="currentColor" stroke-width="1.2" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
    </svg>
  `}function T0(e){return C`
    <section
      class=${e.resizing?"pet-panel resizing":"pet-panel"}
      style=${e.panelStyle}
      aria-label=${e.stellar?`${e.assistantName} · 星港通讯`:"宠物问答"}
    >
      <button
        class="pet-panel-resize"
        type="button"
        title="拖拽调整高度"
        aria-label="拖拽调整对话框高度"
        @pointerdown=${e.onResizePointerDown}
      ></button>
      <div class="pet-panel-head">
        <div class="pet-panel-title-wrap">
          ${D0(e)}
          <div class="pet-panel-title">
            <span class="pet-panel-kicker">${e.assistantName}</span>
            <strong>${e.statusText}</strong>
          </div>
        </div>
        <div class="pet-panel-actions">
          <button
            class="pet-panel-action is-primary"
            type="button"
            title="全屏会话"
            aria-label="全屏会话"
            data-tooltip="全屏会话"
            @click=${e.onOpenStage}
          >
            ${v0()}
          </button>
          <button
            class="pet-panel-action"
            type="button"
            title="新会话"
            aria-label="新会话"
            data-tooltip="新会话"
            @click=${e.onNewConversation}
          >
            ${Er()}
          </button>
          ${e.streaming?C`
                <button
                  class="pet-panel-action is-danger"
                  type="button"
                  title="停止生成"
                  aria-label="停止生成"
                  data-tooltip="停止生成"
                  @click=${e.onStop}
                >
                  ${ts()}
                </button>
              `:_}
        </div>
      </div>

      <div class="pet-panel-content">
        ${e.selectedContext?C`
              <div class="pet-context">
                <span>选中内容</span>
                <p>${e.selectedContextPreview}</p>
                <button type="button" title="移除选中内容" @click=${e.onClearSelectedContext}>
                  ${Jn()}
                </button>
              </div>
            `:_}

        ${e.messages.length?F0(e):$0(e)}
      </div>

      <form class="pet-composer" @submit=${e.onSubmit}>
        <textarea
          class="pet-composer-input"
          rows="1"
          .value=${e.input}
          placeholder=${e.petInputPlaceholder}
          ?disabled=${e.streaming}
          @input=${e.onInput}
          @keydown=${e.onKeydown}
          @compositionstart=${e.onCompositionStart}
          @compositionend=${e.onCompositionEnd}
        ></textarea>
        <button class="pet-send" type="submit" ?disabled=${e.streaming||!e.input.trim()} aria-label="发送">
          ${Kn()}
        </button>
      </form>
    </section>
  `}function D0(e){const t=e.assistantAvatar?.trim();return C`
    <span class=${t?"pet-panel-avatar has-image":"pet-panel-avatar"} aria-hidden="true">
      <span class="pet-panel-avatar-fallback">${e.stellar?ce():e.avatarFallbackText}</span>
      ${t?C`
            <img
              class="pet-panel-avatar-image"
              src=${t}
              alt=""
              @error=${P0}
            />
          `:_}
    </span>
  `}function P0(e){const t=e.currentTarget;t instanceof HTMLImageElement&&(t.parentElement?.classList.remove("has-image"),t.remove())}function $0(e){return C`
    <div class="pet-panel-empty">
      <p class="pet-panel-welcome">${e.welcomeMessage}</p>
      ${e.quickQuestions.length?C`
            <div class="pet-panel-quick">
              ${e.quickQuestions.map(t=>C`
                <button type="button" @click=${()=>e.onUsePrompt(t)}>
                  ${e.stellar?ce():xe()}<span>${t}</span>
                </button>
              `)}
            </div>
          `:_}
    </div>
  `}function F0(e){return C`
    <div class="pet-panel-thread" aria-live="polite">
      ${e.messages.map(t=>M0(t,e))}
    </div>
  `}function M0(e,t){const r=e.sources||[],a=e.content||(e.streaming?"正在思考中...":"");return C`
    <article class=${`pet-panel-message ${e.role}`}>
      <div class="pet-panel-message-meta">
        ${e.role==="assistant"&&t.stellar?C`<span class="stellar-message-emblem">${ce()}</span>`:_}
        <span>${e.role==="user"?"我":t.stellar?t.assistantName:"助手"}</span>
        <time>${e.time}</time>
        <span class="pet-message-actions">
          <button type="button" title="复制" @click=${()=>t.onCopyMessage(e)}>
            ${Xn()}
          </button>
          <button
            type="button"
            title=${e.role==="assistant"?"重新生成":"再次发送"}
            ?disabled=${t.streaming}
            @click=${()=>t.onRetryMessage(e)}
          >
            ${es()}
          </button>
        </span>
      </div>
      <div class=${`pet-panel-bubble${e.error?" error":""}${e.streaming?" streaming":""}`}>
        ${e.role==="assistant"&&!e.error?C`<div class="markdown-body">${Wn(pn(a))}</div>`:C`<span class="message-text">${a}</span>`}
        ${e.streaming?as():_}
      </div>
      ${r.length?C`
            <details class="pet-panel-sources">
              <summary>${t.stellar?ce():xe()} ${r.length} 个${t.stellar?"信号来源":"关联资源"}</summary>
              ${rs(r)}
            </details>
          `:_}
    </article>
  `}function I0(e){return C`
    <div class="pet-stage-backdrop" @click=${e.onClose}></div>
    <section class="pet-stage" role="dialog" aria-label=${`${e.assistantName} 会话`}>
      <header class="pet-stage-head">
        <div class="pet-stage-title">
          <span>${e.assistantName}</span>
          <strong>${e.statusText}</strong>
        </div>
        <div class="pet-stage-actions">
          <button
            class="pet-stage-action"
            type="button"
            ?disabled=${!e.hasSources}
            @click=${e.onExpandLatestSources}
          >
            ${e.stellar?ce():xe()} ${e.stellar?"信号来源":"关联资源"}
          </button>
          <button class="pet-stage-action" type="button" @click=${e.onNewConversation}>
            ${Er()} ${e.stellar?"开启新航次":"新聊"}
          </button>
          ${e.streaming?C`
                <button class="pet-stage-action is-danger" type="button" @click=${e.onStop}>
                  ${ts()} 停止
                </button>
              `:_}
          <button class="pet-stage-close" type="button" title="关闭" aria-label="关闭" @click=${e.onClose}>
            ${Jn()}
          </button>
        </div>
      </header>
      <main class="pet-stage-output">
        <div class="pet-stage-output-inner">
          ${e.messages.length?e.messages.map(t=>N0(t,e)):z0(e)}
        </div>
      </main>
      <footer class="pet-stage-footer">
        ${R0(e)}
        ${U0(e)}
        <div class="pet-stage-note">内容由 AI 生成，仅供参考</div>
      </footer>
    </section>
  `}function R0(e){return C`
    <div class="pet-stage-shortcuts" aria-label="快捷操作">
      ${e.quickQuestions.map(t=>C`
        <button type="button" @click=${()=>e.onUsePrompt(t)}>
          ${xe()}<span>${t}</span>
        </button>
      `)}
      <button type="button" ?disabled=${!e.hasSources} @click=${e.onExpandLatestSources}>
        ${xe()}<span>关联资源</span>
      </button>
      <button type="button" @click=${e.onNewConversation}>
        ${Er()}<span>新会话</span>
      </button>
      <button type="button" @click=${e.onClose}>
        ${w0()}<span>收起</span>
      </button>
    </div>
  `}function N0(e,t){const r=e.sources||[];return C`
    <article class=${`pet-stage-message ${e.role}`}>
      ${e.role==="assistant"?ns(t):_}
      <div class="pet-stage-message-stack">
        <div class=${`pet-stage-bubble${e.error?" error":""}${e.streaming?" streaming":""}`}>
          ${B0(e)}
          ${e.streaming?as():_}
        </div>
        <div class="pet-stage-message-actions">
          <button type="button" title="复制" @click=${()=>t.onCopyMessage(e)}>
            ${Xn()}<span>复制</span>
          </button>
          <button
            type="button"
            title=${e.role==="assistant"?"重新生成":"再次发送"}
            ?disabled=${t.streaming}
            @click=${()=>t.onRetryMessage(e)}
          >
            ${es()}<span>${e.role==="assistant"?"重试":"再问"}</span>
          </button>
        </div>
        ${e.role==="assistant"?L0(r,e.id,t):_}
        <div class="pet-stage-time">${e.time}</div>
      </div>
    </article>
  `}function z0(e){return C`
    <div class="pet-stage-message assistant">
      ${ns(e)}
      <div class="pet-stage-message-stack">
        <div class="pet-stage-bubble">
          <span class="message-text">${e.welcomeMessage}</span>
        </div>
        <div class="pet-stage-time">${e.welcomeTime}</div>
      </div>
    </div>
  `}function ns(e){const t=e.assistantAvatar?.trim();return C`
    <span class=${t?"pet-stage-avatar has-image":"pet-stage-avatar"} aria-hidden="true">
      <span class="pet-stage-avatar-fallback">${e.stellar?ce():e.avatarFallbackText}</span>
      ${t?C`
            <img
              class="pet-stage-avatar-image"
              src=${t}
              alt=""
              @error=${O0}
            />
          `:_}
    </span>
  `}function O0(e){const t=e.currentTarget;t instanceof HTMLImageElement&&(t.parentElement?.classList.remove("has-image"),t.remove())}function L0(e,t,r){return e.length?C`
    <details
      class="pet-stage-sources"
      ?open=${r.isSourceReferencesOpen(t)}
      @toggle=${a=>r.onToggleSourceReferences(t,a)}
    >
      <summary>
        ${r.stellar?ce():xe()} <span>${e.length} 个${r.stellar?"信号来源":"关联资源"}</span>
      </summary>
      ${rs(e)}
    </details>
  `:_}function B0(e){const t=e.content||(e.streaming?"正在思考中...":"");return e.role==="assistant"&&!e.error&&t?C`<div class="message-text markdown-body">${Wn(pn(t))}</div>`:C`<span class="message-text">${t}</span>`}function U0(e){return C`
    <div class="composer-wrap">
      <form class="composer" @submit=${e.onSubmit}>
        <textarea
          class="conversation-input input"
          rows="1"
          .value=${e.input}
          placeholder=${e.inputPlaceholder||xa}
          ?disabled=${e.streaming}
          @input=${e.onInput}
          @keydown=${e.onKeydown}
          @compositionstart=${e.onCompositionStart}
          @compositionend=${e.onCompositionEnd}
        ></textarea>
        <button class="send" type="submit" ?disabled=${e.streaming||!e.input.trim()} aria-label="发送">
          ${Kn()}
        </button>
      </form>
    </div>
  `}function q0(e,t,r="问助手",a=!1){return e.visible?C`
    <div
      class="selection-popover"
      style=${`left:${e.x}px;top:${e.y}px`}
    >
      <button type="button" @click=${t}>
        ${a?ce():xe()} ${r}
      </button>
    </div>
  `:_}function H0(e,t){const r=document.documentElement,a=document.body,n=["class","data-color-scheme","data-theme","data-mode","data-bs-theme","data-scheme","data-scheme-preference"],s={attributes:!0,attributeFilter:n},u=e.match(/^data-([\w-]+)=(.+)$/);if(u){const l=`data-${u[1]}`;s.attributeFilter=n.includes(l)?n:[...n,l]}const i=new MutationObserver(t),o=new MutationObserver(t);return i.observe(r,s),o.observe(a,s),[i,o]}async function j0(e){if(!e)return!1;try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}if(!document.body||typeof document.execCommand!="function")return!1;const t=G0(),r=window.getSelection(),a=r?Array.from({length:r.rangeCount},(u,i)=>r.getRangeAt(i).cloneRange()):[],n=t instanceof HTMLTextAreaElement||t instanceof HTMLInputElement?{start:t.selectionStart,end:t.selectionEnd,direction:t.selectionDirection}:void 0,s=document.createElement("textarea");s.value=e,s.readOnly=!0,s.setAttribute("aria-label","复制信号文本"),s.style.cssText="position:fixed;left:-9999px;top:0;opacity:0;font-size:16px;";try{return document.body.appendChild(s),s.focus({preventScroll:!0}),s.select(),document.execCommand("copy")}catch{return!1}finally{if(s.remove(),t?.focus({preventScroll:!0}),n&&(t instanceof HTMLTextAreaElement||t instanceof HTMLInputElement))try{t.setSelectionRange(n.start,n.end,n.direction??void 0)}catch{}else r&&(r.removeAllRanges(),a.forEach(u=>r.addRange(u)))}}function G0(){let e=document.activeElement;for(;e?.shadowRoot?.activeElement;)e=e.shadowRoot.activeElement;return e instanceof HTMLElement?e:void 0}var W0=Object.defineProperty,V0=Object.getOwnPropertyDescriptor,S=(e,t,r,a)=>{for(var n=a>1?void 0:a?V0(t,r):t,s=e.length-1,u;s>=0;s--)(u=e[s])&&(n=(a?u(t,r,n):u(n))||n);return a&&n&&W0(t,r,n),n};const Z0=1600,ss="likcc_summaraidgpt_rag_assistant_position",Sr="likcc_summaraidgpt_rag_conversation_id",us="likcc_summaraidgpt_rag_visitor_id",is="likcc_summaraidgpt_rag_panel_height",de=16,Y0=4,Me=318,os=Me,ls=12;let k=class extends Ue{constructor(){super(...arguments),this.position="right",this.config=Ae,this.configLoaded=!1,this.open=!1,this.petPanelOpen=!1,this.input="",this.selectedContext="",this.messages=[],this.agentActivities=[],this.streaming=!1,this.composingInput=!1,this.expandedSourceMessageIds=[],this.selectionPopup=$e,this.floatingPositionReady=!1,this.petSpriteReady=!1,this.draggingBubble=!1,this.petFrameIndex=0,this.petHovering=!1,this.petDragDirection="",this.petErrorUntil=0,this.petSpeechVisible=!1,this.petSpeechIndex=0,this.petSpeechText="",this.petPanelHeight=Me,this.resizingPetPanel=!1,this.agentHistoryMessages=[],this.visitorId=this.loadOrCreateVisitorId(),this.suppressNextBubbleClick=!1,this.floatingPositionLocked=!1,this.petAnimationTimer=0,this.petSpeechTimer=0,this.petSpeechHideTimer=0,this.petSpeechStartTimer=0,this.petPrepareGeneration=0,this.lifecycleGeneration=0,this.themeObservers=[],this.refreshAssistantTheme=()=>this.applyTheme(),this.welcomeTime=De(),this.handleDocumentMouseUp=()=>{window.setTimeout(()=>this.updateSelectionPopup(),0)},this.handleDocumentKeyUp=()=>{window.setTimeout(()=>this.updateSelectionPopup(),0)},this.handleDocumentMouseDown=e=>{e.composedPath().includes(this)||(this.clearSelectionPopup(),!this.streaming&&!this.open&&(this.petPanelOpen=!1))},this.handleWindowScroll=()=>{this.clearSelectionPopup()},this.handleWindowResize=()=>{this.clampCurrentFloatingPosition(),this.petPanelHeight=this.clampPetPanelHeight(this.petPanelHeight)},this.handleAgentStatus=e=>{const t=e.detail,r=t?.message?.trim();r&&(this.petSpeechText=r,this.petSpeechVisible=!0,this.appendAgentActivity(r,t?.kind||"pending"))},this.handleBubblePointerMove=e=>{const t=this.bubbleDragState;if(!t||e.pointerId!==t.pointerId)return;const r=e.clientX-t.startX,a=e.clientY-t.startY,n=Math.hypot(r,a);!t.moved&&n<Y0||(t.moved=!0,this.draggingBubble=!0,this.petDragDirection=e.clientX>=t.lastX?"right":"left",t.lastX=e.clientX,e.preventDefault(),this.setFloatingPosition(this.clampFloatingPosition({x:t.originX+r,y:t.originY+a},this.bubbleWidth,this.bubbleHeight),!1))},this.handleBubblePointerEnd=e=>{const t=this.bubbleDragState;!t||e.pointerId!==t.pointerId||(t.target.hasPointerCapture(e.pointerId)&&t.target.releasePointerCapture(e.pointerId),this.unbindBubbleDragListeners(),this.bubbleDragState=void 0,this.draggingBubble=!1,this.petDragDirection="",t.moved&&this.floatingPosition&&(e.preventDefault(),this.suppressNextBubbleClick=!0,this.floatingPositionLocked=!0,this.saveFloatingPosition(this.floatingPosition),window.setTimeout(()=>{this.suppressNextBubbleClick=!1},0)))},this.handlePanelResizePointerMove=e=>{const t=this.panelResizeState;if(!t||e.pointerId!==t.pointerId)return;e.preventDefault();const r=e.clientY-t.startY;this.petPanelHeight=this.clampPetPanelHeight(t.startHeight-r)},this.handlePanelResizePointerEnd=e=>{const t=this.panelResizeState;!t||e.pointerId!==t.pointerId||(t.target.hasPointerCapture(e.pointerId)&&t.target.releasePointerCapture(e.pointerId),this.unbindPanelResizeListeners(),this.panelResizeState=void 0,this.resizingPetPanel=!1,this.savePetPanelHeight(this.petPanelHeight))}}connectedCallback(){super.connectedCallback(),this.lifecycleGeneration+=1,this.applyTheme(),this.themeObservers=H0("",this.refreshAssistantTheme),this.colorSchemeQuery=window.matchMedia?.("(prefers-color-scheme: dark)"),this.bindColorSchemeListener(this.colorSchemeQuery),this.petPanelHeight=this.clampPetPanelHeight(this.loadSavedPetPanelHeight()),this.floatingPositionLocked=this.applySavedFloatingPosition(),this.bindSelectionListeners(),window.addEventListener("resize",this.handleWindowResize,{passive:!0}),window.addEventListener("summaraid:agent-status",this.handleAgentStatus),this.initializeAssistant()}disconnectedCallback(){super.disconnectedCallback(),this.lifecycleGeneration+=1,this.petPrepareGeneration+=1,this.themeObservers.forEach(e=>e.disconnect()),this.themeObservers=[],this.unbindColorSchemeListener(this.colorSchemeQuery),this.colorSchemeQuery=void 0,this.unbindSelectionListeners(),window.removeEventListener("resize",this.handleWindowResize),window.removeEventListener("summaraid:agent-status",this.handleAgentStatus),this.unbindBubbleDragListeners(),this.unbindPanelResizeListeners(),this.stopPetAnimation(),this.stopPetSpeechCycle(),this.abortCurrentRequest()}updated(e){(e.has("open")||e.has("petPanelOpen")||e.has("streaming"))&&this.syncPetThinkingSpeech(),(e.has("messages")||e.has("petPanelOpen"))&&this.scrollPetPanelToBottom()}openAssistant(e,t=!1){if(this.isPetOnlyMode){this.petPanelOpen=!1,this.open=!1,this.clearSelectionPopup(),this.showNextPetSpeech();return}if(this.petPanelOpen=!0,this.petPanelHeight=this.clampPetPanelHeight(this.petPanelHeight),this.petSpeechVisible=!1,this.clearSelectionPopup(),e?.trim()){t?this.submitQuestion(e):(this.input=e,this.updateComplete.then(()=>this.focusPetInput()));return}this.updateComplete.then(()=>this.focusPetInput())}render(){return C`
      ${this.renderSelectionPopup()}
      ${this.renderBubble()}
      ${this.open&&!this.isPetOnlyMode?this.renderStage():_}
    `}async loadConfig(){const e=this.lifecycleGeneration,t=await $u();!this.isConnected||e!==this.lifecycleGeneration||(this.config=t,this.configLoaded=!0,this.applyTheme(t),this.floatingPositionLocked?this.clampCurrentFloatingPosition():(this.position=t.buttonPosition,this.applyDefaultFloatingPosition(t)),this.petPanelHeight=this.clampPetPanelHeight(this.petPanelHeight),this.floatingPositionReady=!0,await this.preparePetSprite(t))}async initializeAssistant(){const e=this.lifecycleGeneration;if(await this.loadConfig(),!(!this.isConnected||e!==this.lifecycleGeneration)){if(this.isPetOnlyMode){this.open=!1,this.petPanelOpen=!1,this.clearSelectionPopup();return}await this.loadStoredConversation(),!(!this.isConnected||e!==this.lifecycleGeneration)&&await this.resumeAgentAfterNavigationIfNeeded()}}async resumeAgentAfterNavigationIfNeeded(){if(this.isPetOnlyMode)return;const e=Ic();e?.openChat&&(this.open=e.displayMode==="stage",this.petPanelOpen=e.displayMode!=="stage",this.petSpeechVisible=!1,this.clearSelectionPopup(),await this.updateComplete,e.focusChatInput&&this.focusCurrentInput(),e.resume&&await this.resumeAgentAfterNavigation(e.resume))}bindSelectionListeners(){document.addEventListener("mouseup",this.handleDocumentMouseUp,{passive:!0}),document.addEventListener("keyup",this.handleDocumentKeyUp,{passive:!0}),document.addEventListener("mousedown",this.handleDocumentMouseDown),window.addEventListener("scroll",this.handleWindowScroll,{passive:!0})}unbindSelectionListeners(){document.removeEventListener("mouseup",this.handleDocumentMouseUp),document.removeEventListener("keyup",this.handleDocumentKeyUp),document.removeEventListener("mousedown",this.handleDocumentMouseDown),window.removeEventListener("scroll",this.handleWindowScroll)}renderBubble(){if(!this.canRenderFloatingPet||this.isStellar&&this.open)return _;const e=this.petPanelOpen?"":this.getCurrentPetSpeech();return C`
      <span class=${this.petPanelOpen?"bubble-wrapper panel-open":"bubble-wrapper"} style=${this.petButtonStyle}>
        ${this.petPanelOpen&&!this.open?this.renderPetPanel():_}
        <button
          class=${this.draggingBubble?"bubble pet-button dragging":"bubble pet-button"}
          style=${this.petButtonStyle}
          type="button"
          @pointerdown=${this.handleBubblePointerDown}
          @click=${this.handleBubbleClick}
          @mouseenter=${this.handlePetMouseEnter}
          @mouseleave=${this.handlePetMouseLeave}
          aria-label=${this.isStellar?this.isPetOnlyMode?"向星枢领航员打招呼":`接通${this.assistantName}`:this.isPetOnlyMode?"互动宠物":"打开智能助手"}
        >
          ${e?C`<span class=${this.petSpeechVisible?"pet-speech visible":"pet-speech"}>${e}</span>`:_}
          ${this.isStellar?C`<span class="stellar-pet" data-state=${this.stellarPetState} data-direction=${this.petDragDirection} aria-hidden="true">${S0()}</span>`:C`<span class="pet-sprite" style=${this.petSpriteStyle} aria-hidden="true"></span>`}
        </button>
      </span>
    `}renderPetPanel(){return T0({assistantName:this.assistantName,assistantAvatar:this.effectiveAssistantAvatar,stellar:this.isStellar,avatarFallbackText:this.avatarFallbackText,streaming:this.streaming,statusText:this.panelStatusText,selectedContext:this.selectedContext,selectedContextPreview:this.selectedContextPreview,messages:this.messages,welcomeMessage:this.welcomeMessage,quickQuestions:this.quickQuestions,input:this.input,petInputPlaceholder:this.petInputPlaceholder,panelStyle:this.petPanelStyle,resizing:this.resizingPetPanel,onOpenStage:()=>this.openPetStage(),onResizePointerDown:e=>this.handlePetPanelResizePointerDown(e),onNewConversation:()=>this.newConversation(),onUsePrompt:e=>this.usePrompt(e),onStop:()=>this.stopCurrentResponse(),onCopyMessage:e=>this.copyMessage(e),onRetryMessage:e=>this.retryMessage(e),onClearSelectedContext:()=>this.clearSelectedContext(),onSubmit:e=>this.handleSubmit(e),onInput:e=>this.handleInput(e),onKeydown:e=>this.handleInputKeydown(e),onCompositionStart:()=>this.handleCompositionStart(),onCompositionEnd:()=>this.handleCompositionEnd()})}renderStage(){return I0({assistantName:this.assistantName,assistantAvatar:this.effectiveAssistantAvatar,stellar:this.isStellar,avatarFallbackText:this.avatarFallbackText,messages:this.messages,statusText:this.panelStatusText,welcomeMessage:this.welcomeMessage,welcomeTime:this.welcomeTime,quickQuestions:this.quickQuestions,input:this.input,inputPlaceholder:this.petInputPlaceholder,streaming:this.streaming,hasSources:this.hasLatestSources,isSourceReferencesOpen:e=>this.isSourceReferencesOpen(e),onToggleSourceReferences:(e,t)=>this.toggleSourceReferences(e,t),onClose:()=>this.close(),onNewConversation:()=>this.newConversation(),onExpandLatestSources:()=>this.expandLatestSources(),onUsePrompt:e=>this.usePrompt(e),onStop:()=>this.stopCurrentResponse(),onCopyMessage:e=>this.copyMessage(e),onRetryMessage:e=>this.retryMessage(e),onSubmit:e=>this.handleSubmit(e),onInput:e=>this.handleInput(e),onKeydown:e=>this.handleInputKeydown(e),onCompositionStart:()=>this.handleCompositionStart(),onCompositionEnd:()=>this.handleCompositionEnd()})}renderSelectionPopup(){return this.isPetOnlyMode?_:q0(this.selectionPopup,()=>this.askWithSelection(),this.selectionActionLabel,this.isStellar)}handleSubmit(e){e.preventDefault(),this.submitQuestion(this.input)}handleInput(e){const t=e.currentTarget;t instanceof HTMLTextAreaElement&&(this.input=t.value,this.resizeInput(t))}handleCompositionStart(){this.composingInput=!0}handleCompositionEnd(){this.composingInput=!1}handleInputKeydown(e){e.key!=="Enter"||e.shiftKey||this.streaming||e.isComposing||this.composingInput||e.keyCode===229||(e.preventDefault(),this.submitQuestion(this.input))}handleBubblePointerDown(e){if(!e.isPrimary||e.button!==0)return;const t=e.currentTarget;if(!(t instanceof HTMLElement))return;const r=t.getBoundingClientRect(),a=this.currentFloatingPosition(r);this.bubbleDragState={pointerId:e.pointerId,target:t,startX:e.clientX,startY:e.clientY,originX:a.x,originY:a.y,lastX:e.clientX,moved:!1},this.petSpeechVisible=!1,e.preventDefault(),t.setPointerCapture(e.pointerId),t.addEventListener("pointermove",this.handleBubblePointerMove),t.addEventListener("pointerup",this.handleBubblePointerEnd),t.addEventListener("pointercancel",this.handleBubblePointerEnd)}handleBubbleClick(e){if(this.suppressNextBubbleClick){e.preventDefault(),e.stopPropagation();return}if(this.isPetOnlyMode){this.petPanelOpen=!1,this.open=!1,this.petSpeechVisible?this.petSpeechVisible=!1:this.showNextPetSpeech();return}this.petPanelOpen=!this.petPanelOpen,this.petSpeechVisible=!1,this.petPanelOpen&&(this.petPanelHeight=this.clampPetPanelHeight(this.petPanelHeight),this.updateComplete.then(()=>this.focusPetInput()))}unbindBubbleDragListeners(){const e=this.bubbleDragState?.target;e&&(e.removeEventListener("pointermove",this.handleBubblePointerMove),e.removeEventListener("pointerup",this.handleBubblePointerEnd),e.removeEventListener("pointercancel",this.handleBubblePointerEnd))}handlePetPanelResizePointerDown(e){if(!e.isPrimary||e.button!==0)return;const t=e.currentTarget;if(!(t instanceof HTMLElement))return;const r=t.closest(".pet-panel");if(!(r instanceof HTMLElement))return;const a=r.getBoundingClientRect();this.panelResizeState={pointerId:e.pointerId,target:t,startY:e.clientY,startHeight:a.height||this.petPanelHeight},this.resizingPetPanel=!0,e.preventDefault(),e.stopPropagation(),t.setPointerCapture(e.pointerId),t.addEventListener("pointermove",this.handlePanelResizePointerMove),t.addEventListener("pointerup",this.handlePanelResizePointerEnd),t.addEventListener("pointercancel",this.handlePanelResizePointerEnd)}unbindPanelResizeListeners(){const e=this.panelResizeState?.target;e&&(e.removeEventListener("pointermove",this.handlePanelResizePointerMove),e.removeEventListener("pointerup",this.handlePanelResizePointerEnd),e.removeEventListener("pointercancel",this.handlePanelResizePointerEnd))}applySavedFloatingPosition(){const e=this.loadSavedFloatingPosition();return e?(this.setFloatingPosition(this.clampFloatingPosition(e),!1),!0):!1}applyDefaultFloatingPosition(e){this.setFloatingPosition(this.clampFloatingPosition(this.defaultFloatingPosition(e)),!1)}currentFloatingPosition(e){return this.floatingPosition?this.floatingPosition:e&&Number.isFinite(e.left)&&Number.isFinite(e.top)?{x:e.left,y:e.top}:this.defaultFloatingPosition(this.config)}defaultFloatingPosition(e){const t=this.normalizeFloatingOffset(e.horizontalOffset),r=this.normalizeFloatingOffset(e.verticalOffset);return{x:e.buttonPosition==="left"?t:window.innerWidth-this.bubbleWidth-t,y:window.innerHeight-this.bubbleHeight-r}}clampCurrentFloatingPosition(){if(!this.floatingPosition)return;const e=this.clampFloatingPosition(this.floatingPosition,this.bubbleWidth,this.bubbleHeight);e.x!==this.floatingPosition.x||e.y!==this.floatingPosition.y?this.setFloatingPosition(e,!0):this.position=e.x+this.bubbleWidth/2<window.innerWidth/2?"left":"right"}clampFloatingPosition(e,t=this.bubbleWidth,r=this.bubbleHeight){const a=Math.max(de,window.innerWidth-t-de),n=Math.max(de,window.innerHeight-r-de);return{x:this.clamp(e.x,de,a),y:this.clamp(e.y,de,n)}}clampPetPanelHeight(e){const t=Number.isFinite(e)?e:Me;return this.clamp(t,os,this.maxPetPanelHeight())}maxPetPanelHeight(){const t=(this.floatingPosition?.y??this.defaultFloatingPosition(this.config).y)-ls,r=window.innerHeight-de*2;return Math.max(os,Math.min(r,t-de))}setFloatingPosition(e,t){this.floatingPosition=e,this.position=e.x+this.bubbleWidth/2<window.innerWidth/2?"left":"right",this.style.left=`${Math.round(e.x)}px`,this.style.top=`${Math.round(e.y)}px`,this.style.right="auto",this.style.bottom="auto",this.petPanelHeight=this.clampPetPanelHeight(this.petPanelHeight),t&&this.saveFloatingPosition(e)}applyTheme(e=this.config){ou(this,e.styleConfig)}async preparePetSprite(e){const t=++this.petPrepareGeneration;if(this.stopPetAnimation(),this.stopPetSpeechCycle(),this.petSpriteReady=!1,this.petSpeechVisible=!1,this.petSpeechText="",this.isStellar){this.petSpriteReady=!0,this.startPetSpeechCycle();return}const r=e.pet?.spritesheetUrl?.trim();if(r)try{if(await this.preloadImage(r),!this.isConnected||t!==this.petPrepareGeneration||this.isStellar||this.petSpriteUrl!==r)return;this.petSpriteReady=!0,this.startPetAnimation(),this.startPetSpeechCycle()}catch{this.isConnected&&t===this.petPrepareGeneration&&!this.isStellar&&this.petSpriteUrl===r&&(this.petSpriteReady=!1)}}preloadImage(e){return new Promise((t,r)=>{const a=new Image;let n=!1;const s=u=>{n||(n=!0,u())};a.onload=()=>s(()=>t()),a.onerror=()=>s(()=>r(new Error("Pet spritesheet failed to load"))),a.src=e})}startPetAnimation(){this.isStellar||this.petAnimationTimer||!this.canRenderFloatingPet||(this.petAnimationTimer=window.setInterval(()=>{this.petFrameIndex=(this.petFrameIndex+1)%Yr(this.petAnimationState).length},150))}stopPetAnimation(){this.petAnimationTimer&&(window.clearInterval(this.petAnimationTimer),this.petAnimationTimer=0)}startPetSpeechCycle(){this.petSpeechTimer||!this.canRenderFloatingPet||(this.petSpeechStartTimer=window.setTimeout(()=>{this.petSpeechStartTimer=0,this.isConnected&&this.showNextPetSpeech()},1600),this.petSpeechTimer=window.setInterval(()=>this.showNextPetSpeech(),15e3))}stopPetSpeechCycle(){this.petSpeechStartTimer&&(window.clearTimeout(this.petSpeechStartTimer),this.petSpeechStartTimer=0),this.petSpeechTimer&&(window.clearInterval(this.petSpeechTimer),this.petSpeechTimer=0),this.petSpeechHideTimer&&(window.clearTimeout(this.petSpeechHideTimer),this.petSpeechHideTimer=0)}showNextPetSpeech(){if(!this.canShowPetSpeech()){this.petSpeechVisible=!1;return}if(this.isPetThinkingOutsideWindow()){this.showPetThinkingSpeech();return}const e=this.petSpeechMessages;this.petSpeechText=e[this.petSpeechIndex%e.length]||"",this.petSpeechVisible=!0,this.petSpeechHideTimer&&window.clearTimeout(this.petSpeechHideTimer),this.petSpeechHideTimer=window.setTimeout(()=>{this.petSpeechVisible=!1,this.petSpeechHideTimer=0},7200),this.petSpeechIndex=(this.petSpeechIndex+1)%e.length}syncPetThinkingSpeech(){if(!this.canRenderFloatingPet){this.petSpeechVisible=!1,this.petSpeechText="";return}if(this.isPetThinkingOutsideWindow()){this.showPetThinkingSpeech();return}this.petSpeechText===this.thinkingSpeechMessage&&(this.petSpeechVisible=!1,this.petSpeechText="")}showPetThinkingSpeech(){this.draggingBubble||(this.petSpeechText=this.thinkingSpeechMessage,this.petSpeechVisible=!0,this.petSpeechHideTimer&&(window.clearTimeout(this.petSpeechHideTimer),this.petSpeechHideTimer=0))}canShowPetSpeech(){return this.canRenderFloatingPet&&!this.open&&!this.petPanelOpen&&!this.draggingBubble&&(this.isPetThinkingOutsideWindow()||this.petSpeechMessages.length>0)}isPetThinkingOutsideWindow(){return!this.open&&!this.petPanelOpen&&this.streaming}handlePetMouseEnter(){this.petHovering=!0}handlePetMouseLeave(){this.petHovering=!1}triggerPetError(){this.canRenderFloatingPet&&(this.petErrorUntil=Date.now()+3600,this.petFrameIndex=0)}loadSavedFloatingPosition(){try{const e=window.localStorage.getItem(ss);if(!e)return;const t=JSON.parse(e);if(typeof t.x=="number"&&Number.isFinite(t.x)&&typeof t.y=="number"&&Number.isFinite(t.y))return{x:Number(t.x),y:Number(t.y)}}catch{return}}saveFloatingPosition(e){try{window.localStorage.setItem(ss,JSON.stringify(e))}catch{}}loadSavedPetPanelHeight(){try{const e=window.localStorage.getItem(is),t=e?Number(e):Me;return Number.isFinite(t)?t:Me}catch{return Me}}savePetPanelHeight(e){try{window.localStorage.setItem(is,String(Math.round(this.clampPetPanelHeight(e))))}catch{}}async submitQuestion(e){if(this.isPetOnlyMode)return;const t=e.trim();if(!t||this.streaming)return;if(!this.canUseAssistantChat){this.showLoginRequiredMessage();return}if(!this.canUseSelectedChatMode){this.showChatModeUnavailableMessage();return}const r=this.selectedContext.trim(),a=r?`请结合我选中的内容回答：

${r}

我的问题：${t}`:t,n=r?`${t}

选中内容：${this.truncateText(r,180)}`:t,s=Xe();this.input="",this.selectedContext="",this.petPanelOpen=!0,this.streaming=!0,this.agentActivities=[],this.appendAgentActivity(this.useAgentChat?"正在准备 Agent":"正在检索知识库","pending");const u=new AbortController;if(this.abortController=u,this.messages=[...this.messages,Pe("user",n),Pe("assistant","",{id:s,streaming:!0})],await this.updateComplete,this.resizeInput(this.inputElement),this.resizeInput(this.petInputElement),this.scrollToBottom(),!this.isActiveRequest(u)){this.finishAssistantMessage(s),this.abortController===u&&(this.streaming=!1,this.abortController=void 0,this.agentChatClient=void 0);return}try{this.useAgentChat?await this.askAgentStream(a,s,u):await this.askRagStream(a,s,u)}catch(i){if(!this.isActiveRequest(u))return;const o=i instanceof Error?i.message:"智能助手回答失败";this.failAssistantMessage(s,`抱歉，暂时无法回答，请稍后重试。${o?`（${o}）`:""}`)}finally{const i=this.abortController===u;this.finishAssistantMessage(s),i&&(this.streaming=!1,this.abortController=void 0,this.agentChatClient=void 0),await this.updateComplete,i&&this.scrollToBottom()}}async askAgentStream(e,t,r){if(!this.isActiveRequest(r))return;this.appendAgentActivity("正在调用 Agent","pending");const a=new $n;this.agentChatClient=a;const n=this.ensureConversationId();try{const s=await a.sendMessage(e,{agent:this.config.agent,historyMessages:this.agentHistoryMessages,conversationId:n,visitorId:this.visitorId,ragEnabledForAgent:this.shouldAttachRagToAgent,afterNavigationDisplayMode:this.open?"stage":"panel",signal:r.signal},{onText:u=>{this.isActiveRequest(r)&&this.setAssistantContent(t,u)},onSources:u=>{this.isActiveRequest(r)&&this.receiveSources(t,u)},onError:u=>{if(this.isActiveRequest(r)){if(this.isAgentToolCallStreamProtocolError(u)){this.appendAgentActivity("当前模型的工具调用流格式不兼容","warning");return}this.failAssistantMessage(t,u)}},onFinish:u=>{this.isActiveRequest(r)&&(this.agentHistoryMessages=u)}});this.isActiveRequest(r)&&(this.agentHistoryMessages=s)}catch(s){if(!this.isAgentToolCallStreamProtocolError(s))throw s;if(a.stop(),this.agentChatClient===a&&(this.agentChatClient=void 0),!this.isActiveRequest(r))return;if(!this.canFallbackToRagChat)throw new Error("当前模型的工具调用流格式不兼容，无法继续使用 Agent 模式");this.resetAssistantMessageForFallback(t),this.appendAgentActivity("已切换为知识库问答模式","warning"),await this.askRagStream(e,t,r)}}async resumeAgentAfterNavigation(e){if(this.isPetOnlyMode||this.streaming||!this.useAgentChat)return;const t=Xe();this.petPanelOpen=!0,this.streaming=!0;const r=new AbortController;if(this.abortController=r,this.agentActivities=[],this.appendAgentActivity("页面已打开，正在继续回答","pending"),this.messages=[...this.messages,Pe("assistant","",{id:t,streaming:!0})],await this.updateComplete,this.scrollToBottom(),!this.isActiveRequest(r)){this.finishAssistantMessage(t),this.abortController===r&&(this.streaming=!1,this.abortController=void 0,this.agentChatClient=void 0);return}const a=new $n;this.agentChatClient=a;try{const n=await a.sendMessage(e.message,{agent:this.config.agent,historyMessages:e.historyMessages,conversationId:this.ensureConversationId(),visitorId:this.visitorId,recordUserMessage:!1,ragEnabledForAgent:this.shouldAttachRagToAgent,afterNavigationDisplayMode:this.open?"stage":"panel",signal:r.signal},{onText:s=>{this.isActiveRequest(r)&&this.setAssistantContent(t,s)},onSources:s=>{this.isActiveRequest(r)&&this.receiveSources(t,s)},onError:s=>{if(this.isActiveRequest(r)){if(this.isAgentToolCallStreamProtocolError(s)){this.appendAgentActivity("当前模型的工具调用流格式不兼容","warning");return}this.failAssistantMessage(t,s)}},onFinish:s=>{this.isActiveRequest(r)&&(this.agentHistoryMessages=s)}});this.isActiveRequest(r)&&(this.agentHistoryMessages=n)}catch(n){if(this.isActiveRequest(r)){if(this.isAgentToolCallStreamProtocolError(n)){if(a.stop(),this.agentChatClient===a&&(this.agentChatClient=void 0),!this.canFallbackToRagChat){this.failAssistantMessage(t,"当前模型的工具调用流格式不兼容，无法继续使用 Agent 模式");return}this.resetAssistantMessageForFallback(t),this.appendAgentActivity("已切换为知识库问答模式","warning"),await this.askRagStream(e.message,t,r);return}const s=n instanceof Error?n.message:"Agent 恢复回答失败";this.failAssistantMessage(t,s)}}finally{const n=this.abortController===r;this.finishAssistantMessage(t),n&&(this.streaming=!1,this.abortController=void 0,this.agentChatClient=void 0),await this.updateComplete,n&&this.scrollToBottom()}}async askRagStream(e,t,r){if(!this.useRagChat)throw new Error("当前模式没有启用 RAG 知识库问答");this.isActiveRequest(r)&&await Fu({question:e,limit:ju,conversationId:this.conversationId,visitorId:this.visitorId},{onConversationId:a=>{this.ownsRequest(r)&&this.persistConversationId(a)},onSources:a=>{this.isActiveRequest(r)&&(this.appendAgentActivity(a.length?`知识库命中 ${a.length} 个来源`:"知识库没有命中来源",a.length?"success":"warning"),this.receiveSources(t,a))},onDelta:a=>{this.isActiveRequest(r)&&this.appendAssistantDelta(t,a)},onError:a=>{this.isActiveRequest(r)&&this.failAssistantMessage(t,a)},onDone:()=>{this.isActiveRequest(r)&&this.finishAssistantMessage(t)}},r.signal)}receiveSources(e,t){t.length&&(this.updateMessage(e,r=>({...r,sources:t})),this.appendAgentActivity(`已关联 ${t.length} 个资源`,"success"))}appendAgentActivity(e,t="pending"){const r=e.trim();if(!r)return;const a=this.agentActivities[this.agentActivities.length-1];a?.message===r&&a.kind===t||(this.agentActivities=[...this.agentActivities,{id:Xe(),message:r,kind:t,time:De()}].slice(-8),this.updateComplete.then(()=>this.scrollPetPanelToBottom()))}async loadStoredConversation(){const e=this.loadConversationId();if(e)try{const t=await Mu(e,this.visitorId);if(!t){this.clearConversationId();return}this.conversationId=t.metadata.name,this.messages=this.toAssistantMessages(t),this.agentHistoryMessages=this.toAgentHistoryMessages(t),await this.updateComplete,this.scrollToBottom()}catch{this.clearConversationId()}}toAssistantMessages(e){return(e.spec?.messages||[]).filter(t=>t.role==="user"||t.role==="assistant").filter(t=>!!t.content?.trim()).map(t=>Pe(t.role,t.content||"",{id:t.id,time:this.messageTime(t),sources:t.sources,error:t.error}))}toAgentHistoryMessages(e){return(e.spec?.messages||[]).filter(t=>t.role==="user"||t.role==="assistant").filter(t=>!!t.content?.trim()).map(t=>{const r=t.id||Xe();return{id:r,role:t.role==="assistant"?"assistant":"user",parts:[{type:"text",id:`${r}-text`,text:t.content||""}]}})}messageTime(e){if(!e.createdAt)return De();const t=new Date(e.createdAt);return Number.isNaN(t.getTime())?De():De(t)}persistConversationId(e){if(e.trim()){this.conversationId=e;try{window.localStorage.setItem(Sr,e)}catch{}}}ensureConversationId(){if(this.conversationId)return this.conversationId;const e=this.loadConversationId();if(e)return this.conversationId=e,e;const t=`rag-conv-${this.randomId().toLowerCase()}`;return this.persistConversationId(t),t}loadConversationId(){try{return window.localStorage.getItem(Sr)||void 0}catch{return}}loadOrCreateVisitorId(){try{const e=window.localStorage.getItem(us);if(e)return e;const t=`rag-visitor-${this.randomId()}`;return window.localStorage.setItem(us,t),t}catch{return`rag-visitor-${this.randomId()}`}}randomId(){return window.crypto?.randomUUID?window.crypto.randomUUID():`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}clearConversationId(){this.conversationId=void 0;try{window.localStorage.removeItem(Sr)}catch{}}setAssistantContent(e,t){this.updateMessage(e,r=>({...r,content:t})),this.updateComplete.then(()=>this.scrollToBottom())}appendAssistantDelta(e,t){t&&(this.updateMessage(e,r=>({...r,content:`${r.content}${t}`})),this.updateComplete.then(()=>this.scrollToBottom()))}failAssistantMessage(e,t){this.triggerPetError(),this.updateMessage(e,r=>({...r,content:t,error:!0,streaming:!1})),this.streaming=!1}resetAssistantMessageForFallback(e){this.updateMessage(e,t=>({...t,content:"",error:!1,streaming:!0,sources:void 0}))}isAgentToolCallStreamProtocolError(e){const t=typeof e=="string"?e:e instanceof Error?e.message:String(e??"");return/tool-call stream part toolCallId must not be blank|toolCallId must not be blank/i.test(t)}showLoginRequiredMessage(){const e="请登录后再使用智能助手。",t=this.messages[this.messages.length-1];this.petPanelOpen=!0,this.petSpeechVisible=!1,this.appendAgentActivity("请登录后再使用智能助手","warning"),!(t?.role==="assistant"&&t.content===e)&&(this.messages=[...this.messages,Pe("assistant",e,{error:!0})],this.updateComplete.then(()=>this.scrollPetPanelToBottom()))}showChatModeUnavailableMessage(){const e=this.chatModeUnavailableMessage,t=this.messages[this.messages.length-1];this.petPanelOpen=!0,this.petSpeechVisible=!1,this.appendAgentActivity(e,"warning"),!(t?.role==="assistant"&&t.content===e)&&(this.messages=[...this.messages,Pe("assistant",e,{error:!0})],this.updateComplete.then(()=>this.scrollPetPanelToBottom()))}finishAssistantMessage(e){this.updateMessage(e,t=>({...t,content:t.content||(t.error?t.content:"未找到相关资料，可尝试换个问题。"),streaming:!1}))}updateMessage(e,t){this.messages=Pl(this.messages,e,t)}toggleSourceReferences(e,t){const r=t.currentTarget;if(!(r instanceof HTMLDetailsElement))return;const a=new Set(this.expandedSourceMessageIds);r.open?a.add(e):a.delete(e),this.expandedSourceMessageIds=Array.from(a)}close(){this.open=!1,this.clearSelectionPopup()}newConversation(){this.isPetOnlyMode||(this.abortCurrentRequest(),this.clearConversationId(),this.agentHistoryMessages=[],this.messages=[],this.agentActivities=[],this.input="",this.selectedContext="",this.streaming=!1,this.petPanelOpen=!0,this.updateComplete.then(()=>this.focusCurrentInput()))}askWithSelection(){if(this.isPetOnlyMode){this.clearSelectionPopup();return}const e=this.selectionPopup.text.trim();e&&(this.selectedContext=e,this.petPanelOpen=!0,this.petSpeechVisible=!1,this.clearSelectionPopup(),this.updateComplete.then(()=>this.focusPetInput()))}updateSelectionPopup(){if(this.isPetOnlyMode){this.selectionPopup=$e;return}this.selectionPopup=$l(Z0)}clearSelectionPopup(){this.selectionPopup.visible&&(this.selectionPopup=$e)}resizeInput(e){e&&(e.style.height="auto",e.style.height=`${Math.min(Math.max(e.scrollHeight,38),118)}px`)}focusInput(){this.inputElement?.focus()}focusPetInput(){this.petInputElement?.focus()}focusCurrentInput(){if(this.open){this.focusInput();return}this.focusPetInput()}openPetStage(){this.isPetOnlyMode||(this.open=!0,this.petPanelOpen=!1,this.updateComplete.then(()=>{this.scrollToBottom(),this.focusInput()}))}clearSelectedContext(){this.selectedContext="",this.updateComplete.then(()=>this.focusPetInput())}expandLatestSources(){const e=this.latestAssistantMessageWithSources?.id;if(!e)return;const t=new Set(this.expandedSourceMessageIds);t.add(e),this.expandedSourceMessageIds=Array.from(t),this.open=!0,this.updateComplete.then(()=>this.scrollToBottom())}usePrompt(e){e&&(this.input=e),this.updateComplete.then(()=>this.focusCurrentInput())}scrollToBottom(){this.messagesElement&&(this.messagesElement.scrollTop=this.messagesElement.scrollHeight)}scrollPetPanelToBottom(){this.updateComplete.then(()=>{this.petPanelThreadElement&&(this.petPanelThreadElement.scrollTop=this.petPanelThreadElement.scrollHeight)})}ownsRequest(e){return this.isConnected&&this.abortController===e}isActiveRequest(e){return this.ownsRequest(e)&&!e.signal.aborted}bindColorSchemeListener(e){if(e){if(typeof e.addEventListener=="function"){e.addEventListener("change",this.refreshAssistantTheme);return}e.addListener?.(this.refreshAssistantTheme)}}unbindColorSchemeListener(e){if(e){if(typeof e.removeEventListener=="function"){e.removeEventListener("change",this.refreshAssistantTheme);return}e.removeListener?.(this.refreshAssistantTheme)}}abortCurrentRequest(){this.agentChatClient?.stop(),this.agentChatClient=void 0,!(!this.abortController||this.abortController.signal.aborted)&&this.abortController.abort()}stopCurrentResponse(){if(!this.streaming)return;const e=[...this.messages].reverse().find(t=>t.role==="assistant"&&t.streaming);e&&this.updateMessage(e.id,t=>({...t,content:t.content||"已停止生成。",streaming:!1})),this.appendAgentActivity("已停止生成","warning"),this.streaming=!1,this.abortCurrentRequest()}async copyMessage(e){const t=e.content.trim();if(!t)return;const r=await j0(t);this.appendAgentActivity(r?"已复制到剪贴板":"复制未能完成，请手动选择文本",r?"success":"error")}retryMessage(e){if(this.streaming)return;const t=e.role==="user"?e.content:this.previousUserQuestion(e.id);t.trim()&&this.submitQuestion(t)}previousUserQuestion(e){const t=this.messages.findIndex(r=>r.id===e);if(t<=0)return"";for(let r=t-1;r>=0;r-=1){const a=this.messages[r];if(a.role==="user"&&a.content.trim())return a.content}return""}clamp(e,t,r){return Math.min(Math.max(e,t),r)}normalizeFloatingOffset(e){return Number.isFinite(e)?Math.max(0,e):Ae.horizontalOffset}isSourceReferencesOpen(e){return this.expandedSourceMessageIds.includes(e)}get isStellar(){return this.config.styleConfig.stylePreset==="stellar"}get effectiveAssistantAvatar(){return this.isStellar&&Su(this.config.assistantAvatar)?void 0:this.config.assistantAvatar}get stellarPetState(){return this.draggingBubble?"dragging":this.petErrorUntil>Date.now()?"error":this.streaming?"thinking":this.petHovering?"hover":"idle"}get thinkingSpeechMessage(){return this.isStellar?"正在校准星图，解码你的问题…":Os}get assistantName(){return this.isStellar?la(this.config.assistantName):this.config.assistantName||Ae.assistantName}get isPetOnlyMode(){return this.config.displayMode==="petOnly"}get isRagAgentMode(){return this.config.displayMode==="ragAgent"}get isRagOnlyMode(){return this.config.displayMode==="rag"}get isAgentOnlyMode(){return this.config.displayMode==="agent"}get canUseAssistantChat(){return this.config.access.allowAnonymous||this.config.access.authenticated}get canUseSelectedChatMode(){return this.useAgentChat||this.useRagChat}get canFallbackToRagChat(){return this.isRagAgentMode&&this.useRagChat}get petInputPlaceholder(){return this.canUseAssistantChat?this.canUseSelectedChatMode?this.isStellar?this.selectedContext?"发来问题，一起解读这段信号…":"发来问题，检索星港记录…":this.selectedContext?"想问这段内容什么？":this.isAgentOnlyMode?"请输入要让助手处理的问题...":this.isRagAgentMode?"请输入问题，助手会按需使用站点工具或知识库...":xa:this.chatModeUnavailableMessage:"请登录后使用智能助手"}get selectedContextPreview(){return this.truncateText(this.selectedContext,120)}get petPanelStyle(){const e=Math.round(this.clampPetPanelHeight(this.petPanelHeight)),t=`--rag-pet-panel-height:${e}px`;if(!this.isStellar)return t;const r=12,a=Math.min(window.innerWidth<=860?368:410,window.innerWidth-r*2),n=this.floatingPosition||this.defaultFloatingPosition(this.config),u=n.x+this.bubbleWidth/2>=window.innerWidth/2?n.x+this.bubbleWidth-a:n.x,i=this.clamp(u,r,window.innerWidth-a-r),o=Math.min(e,window.innerHeight-r*2),l=this.clamp(n.y-ls-o,r,window.innerHeight-o-r);return`${t};position:fixed;left:${Math.round(i)}px;right:auto;top:${Math.round(l)}px;bottom:auto;height:${o}px`}get latestAssistantMessageWithSources(){return[...this.messages].reverse().find(e=>e.role==="assistant"&&!!e.sources?.length)}get hasLatestSources(){return!!this.latestAssistantMessageWithSources}get panelStatusText(){const e=this.agentActivities[this.agentActivities.length-1]?.message;return this.streaming&&e?e:this.isStellar?this.streaming?"正在解码信号":"星港通讯已就绪":this.streaming?"正在找答案":"想问我什么？"}get useAgentChat(){return(this.isRagAgentMode||this.isAgentOnlyMode)&&this.config.agent?.enabled!==!1&&this.config.access.agentAllowed!==!1}get useRagChat(){return(this.isRagAgentMode||this.isRagOnlyMode)&&this.config.ragEnabled!==!1}get shouldAttachRagToAgent(){return this.isRagAgentMode&&this.config.ragEnabled!==!1}get chatModeUnavailableMessage(){if(this.isPetOnlyMode)return"当前为纯宠物模式，不提供问答面板。";if(this.isRagOnlyMode&&this.config.ragEnabled===!1)return"当前为 RAG 模式，但 RAG 知识库未启用。";if(this.isAgentOnlyMode){if(this.config.agent?.enabled===!1)return"当前为 Agent 模式，但 Agent 能力未启用。";if(this.config.access.agentAllowed===!1)return"当前访问模式未开放 Agent。"}if(this.isRagAgentMode){if(this.config.agent?.enabled===!1&&this.config.ragEnabled===!1)return"当前为知识库问答 + Agent 模式，但知识库问答和 Agent 都未启用。";if(this.config.agent?.enabled!==!1&&this.config.access.agentAllowed===!1&&this.config.ragEnabled===!1)return"当前访问模式未开放 Agent，且知识库问答未启用。"}return"当前前台显示模式暂不可用，请联系站长检查配置。"}get selectionActionLabel(){return this.isStellar?`询问${this.assistantName}`:this.isRagOnlyMode?"问知识库":"问助手"}get avatarFallbackText(){return Array.from(this.assistantName.trim())[0]||"智"}get petSize(){return this.config.petSize||zt}get petMetrics(){if(this.isStellar){const e=this.petSize;return{width:e,height:Math.round(e*108/96),sheetWidth:e,sheetHeight:Math.round(e*108/96)}}return Qs(this.petSize)}get bubbleWidth(){return this.petMetrics.width}get bubbleHeight(){return this.petMetrics.height}get petButtonStyle(){const e=this.petMetrics;return[`--rag-pet-width:${e.width}px`,`--rag-pet-height:${e.height}px`,`--rag-pet-sheet-width:${e.sheetWidth}px`,`--rag-pet-sheet-height:${e.sheetHeight}px`].join(";")}get petSpriteStyle(){const e=this.petMetrics,t=Js(this.petAnimationState,this.petFrameIndex);return[`background-image:url("${this.escapeCssUrl(this.petSpriteUrl)}")`,`--rag-pet-frame-x:${-t.col*e.width}px`,`--rag-pet-frame-y:${-t.row*e.height}px`].join(";")}get petAnimationState(){return{errorActive:this.petErrorUntil>Date.now(),direction:this.petDragDirection,thinking:this.isPetThinkingOutsideWindow(),hovering:this.petHovering}}get petSpeechMessages(){const e=this.config.petSpeechMessages||[];return e.length?e:lt}get quickQuestions(){return(this.config.quickQuestions||[]).filter(t=>t.trim()).slice(0,8)}getCurrentPetSpeech(){return this.petSpeechText}get hasActivePet(){return this.isStellar||!!this.config.pet?.spritesheetUrl}get canRenderFloatingPet(){return this.configLoaded&&this.floatingPositionReady&&this.hasActivePet&&this.petSpriteReady}get petSpriteUrl(){return this.config.pet?.spritesheetUrl||""}escapeCssUrl(e){return e.replace(/["\\\n\r\f]/g,"")}truncateText(e,t){const r=e.replace(/\s+/g," ").trim();return r.length<=t?r:`${r.slice(0,Math.max(0,t-1))}…`}get welcomeMessage(){return this.isStellar?ca(this.config.welcomeMessage,this.assistantName):(this.config.welcomeMessage||Ae.welcomeMessage).replace("{assistantName}",this.assistantName)}};k.styles=Dl,S([Zr({type:String,reflect:!0})],k.prototype,"position",2),S([$()],k.prototype,"config",2),S([$()],k.prototype,"configLoaded",2),S([$()],k.prototype,"open",2),S([$()],k.prototype,"petPanelOpen",2),S([$()],k.prototype,"input",2),S([$()],k.prototype,"selectedContext",2),S([$()],k.prototype,"messages",2),S([$()],k.prototype,"agentActivities",2),S([$()],k.prototype,"streaming",2),S([$()],k.prototype,"expandedSourceMessageIds",2),S([$()],k.prototype,"selectionPopup",2),S([$()],k.prototype,"floatingPosition",2),S([$()],k.prototype,"floatingPositionReady",2),S([$()],k.prototype,"petSpriteReady",2),S([$()],k.prototype,"draggingBubble",2),S([$()],k.prototype,"petFrameIndex",2),S([$()],k.prototype,"petHovering",2),S([$()],k.prototype,"petDragDirection",2),S([$()],k.prototype,"petErrorUntil",2),S([$()],k.prototype,"petSpeechVisible",2),S([$()],k.prototype,"petSpeechIndex",2),S([$()],k.prototype,"petSpeechText",2),S([$()],k.prototype,"petPanelHeight",2),S([$()],k.prototype,"resizingPetPanel",2),S([ot(".pet-stage-output")],k.prototype,"messagesElement",2),S([ot(".conversation-input")],k.prototype,"inputElement",2),S([ot(".pet-composer-input")],k.prototype,"petInputElement",2),S([ot(".pet-panel-thread")],k.prototype,"petPanelThreadElement",2),k=S([Is("summaraid-rag-assistant")],k);const cs="summaraid-rag-assistant";function Q0(){window.likcc_summaraidGPT_ragAssistantLoaded||(console.log("%c智阅GPT-前台智能助手","color: #1f1f1f; font-size: 16px; font-weight: bold;"),console.log("%c支持宠物陪伴、知识库问答和 Agent 工具调用","color: #8a6f38; font-size: 12px;"),window.likcc_summaraidGPT_ragAssistantLoaded=!0)}async function Tr(){if(!document.body)return;const e=document.querySelector(cs);if(e)return e;const t=document.createElement(cs);return document.body.appendChild(t),t}async function J0(e){(await Tr())?.openAssistant(e)}function ds(){window.setTimeout(()=>{Tr()},0)}Q0(),window.likcc_summaraidGPT_initRagAssistant=Tr,window.likcc_summaraidGPT_openRagAssistant=J0,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ds,{once:!0}):ds()}));
