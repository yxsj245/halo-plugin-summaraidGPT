(function(T){typeof define=="function"&&define.amd?define(T):T()})((function(){"use strict";const T=globalThis,J=T.ShadowRoot&&(T.ShadyCSS===void 0||T.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol(),le=new WeakMap;let de=class{constructor(e,r,i){if(this._$cssResult$=!0,i!==Z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o;const r=this.t;if(J&&e===void 0){const i=r!==void 0&&r.length===1;i&&(e=le.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&le.set(r,e))}return e}toString(){return this.cssText}};const Be=t=>new de(typeof t=="string"?t:t+"",void 0,Z),he=(t,...e)=>{const r=t.length===1?t[0]:e.reduce((i,a,s)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+t[s+1],t[0]);return new de(r,t,Z)},He=(t,e)=>{if(J)t.adoptedStyleSheets=e.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(const r of e){const i=document.createElement("style"),a=T.litNonce;a!==void 0&&i.setAttribute("nonce",a),i.textContent=r.cssText,t.appendChild(i)}},me=J?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(const i of e.cssRules)r+=i.cssText;return Be(r)})(t):t;const{is:Ye,defineProperty:je,getOwnPropertyDescriptor:Ve,getOwnPropertyNames:We,getOwnPropertySymbols:Qe,getPrototypeOf:Xe}=Object,Y=globalThis,ue=Y.trustedTypes,Je=ue?ue.emptyScript:"",Ze=Y.reactiveElementPolyfillSupport,M=(t,e)=>t,j={toAttribute(t,e){switch(e){case Boolean:t=t?Je:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},K=(t,e)=>!Ye(t,e),pe={attribute:!0,type:String,converter:j,reflect:!1,useDefault:!1,hasChanged:K};Symbol.metadata??=Symbol("metadata"),Y.litPropertyMetadata??=new WeakMap;let E=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=pe){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(e,r),!r.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,r);a!==void 0&&je(this.prototype,e,a)}}static getPropertyDescriptor(e,r,i){const{get:a,set:s}=Ve(this.prototype,e)??{get(){return this[r]},set(n){this[r]=n}};return{get:a,set(n){const o=a?.call(this);s?.call(this,n),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??pe}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;const e=Xe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){const r=this.properties,i=[...We(r),...Qe(r)];for(const a of i)this.createProperty(a,r[a])}const e=this[Symbol.metadata];if(e!==null){const r=litPropertyMetadata.get(e);if(r!==void 0)for(const[i,a]of r)this.elementProperties.set(i,a)}this._$Eh=new Map;for(const[r,i]of this.elementProperties){const a=this._$Eu(r,i);a!==void 0&&this._$Eh.set(a,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const r=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const a of i)r.unshift(me(a))}else e!==void 0&&r.push(me(e));return r}static _$Eu(e,r){const i=r.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,r=this.constructor.elementProperties;for(const i of r.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return He(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,r,i){this._$AK(e,i)}_$ET(e,r){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(a!==void 0&&i.reflect===!0){const s=(i.converter?.toAttribute!==void 0?i.converter:j).toAttribute(r,i.type);this._$Em=e,s==null?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(e,r){const i=this.constructor,a=i._$Eh.get(e);if(a!==void 0&&this._$Em!==a){const s=i.getPropertyOptions(a),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:j;this._$Em=a;const o=n.fromAttribute(r,s.type);this[a]=o??this._$Ej?.get(a)??o,this._$Em=null}}requestUpdate(e,r,i,a=!1,s){if(e!==void 0){const n=this.constructor;if(a===!1&&(s=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??K)(s,r)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,r,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,r,{useDefault:i,reflect:a,wrapped:s},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??r??this[e]),s!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(r=void 0),this._$AL.set(e,r)),a===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[a,s]of this._$Ep)this[a]=s;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[a,s]of i){const{wrapped:n}=s,o=this[a];n!==!0||this._$AL.has(a)||o===void 0||this.C(a,void 0,s,o)}}let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(r)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(r)}willUpdate(e){}_$AE(e){this._$EO?.forEach(r=>r.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(r=>this._$ET(r,this[r])),this._$EM()}updated(e){}firstUpdated(e){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[M("elementProperties")]=new Map,E[M("finalized")]=new Map,Ze?.({ReactiveElement:E}),(Y.reactiveElementVersions??=[]).push("2.1.2");const ee=globalThis,ge=t=>t,V=ee.trustedTypes,fe=V?V.createPolicy("lit-html",{createHTML:t=>t}):void 0,ke="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,be="?"+$,Ke=`<${be}>`,S=document,O=()=>S.createComment(""),L=t=>t===null||typeof t!="object"&&typeof t!="function",te=Array.isArray,et=t=>te(t)||typeof t?.[Symbol.iterator]=="function",re=`[ 	
\f\r]`,I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ve=/-->/g,ye=/>/g,P=RegExp(`>|${re}(?:([^\\s"'>=/]+)(${re}*=${re}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),xe=/'/g,we=/"/g,$e=/^(?:script|style|textarea|title)$/i,Te=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),d=Te(1),tt=Te(2),A=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),Se=new WeakMap,_=S.createTreeWalker(S,129);function Pe(t,e){if(!te(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return fe!==void 0?fe.createHTML(e):e}const rt=(t,e)=>{const r=t.length-1,i=[];let a,s=e===2?"<svg>":e===3?"<math>":"",n=I;for(let o=0;o<r;o++){const c=t[o];let l,u,h=-1,y=0;for(;y<c.length&&(n.lastIndex=y,u=n.exec(c),u!==null);)y=n.lastIndex,n===I?u[1]==="!--"?n=ve:u[1]!==void 0?n=ye:u[2]!==void 0?($e.test(u[2])&&(a=RegExp("</"+u[2],"g")),n=P):u[3]!==void 0&&(n=P):n===P?u[0]===">"?(n=a??I,h=-1):u[1]===void 0?h=-2:(h=n.lastIndex-u[2].length,l=u[1],n=u[3]===void 0?P:u[3]==='"'?we:xe):n===we||n===xe?n=P:n===ve||n===ye?n=I:(n=P,a=void 0);const x=n===P&&t[o+1].startsWith("/>")?" ":"";s+=n===I?c+Ke:h>=0?(i.push(l),c.slice(0,h)+ke+c.slice(h)+$+x):c+$+(h===-2?o:x)}return[Pe(t,s+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class R{constructor({strings:e,_$litType$:r},i){let a;this.parts=[];let s=0,n=0;const o=e.length-1,c=this.parts,[l,u]=rt(e,r);if(this.el=R.createElement(l,i),_.currentNode=this.el.content,r===2||r===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(a=_.nextNode())!==null&&c.length<o;){if(a.nodeType===1){if(a.hasAttributes())for(const h of a.getAttributeNames())if(h.endsWith(ke)){const y=u[n++],x=a.getAttribute(h).split($),w=/([.?@])?(.*)/.exec(y);c.push({type:1,index:s,name:w[2],strings:x,ctor:w[1]==="."?at:w[1]==="?"?st:w[1]==="@"?nt:W}),a.removeAttribute(h)}else h.startsWith($)&&(c.push({type:6,index:s}),a.removeAttribute(h));if($e.test(a.tagName)){const h=a.textContent.split($),y=h.length-1;if(y>0){a.textContent=V?V.emptyScript:"";for(let x=0;x<y;x++)a.append(h[x],O()),_.nextNode(),c.push({type:2,index:++s});a.append(h[y],O())}}}else if(a.nodeType===8)if(a.data===be)c.push({type:2,index:s});else{let h=-1;for(;(h=a.data.indexOf($,h+1))!==-1;)c.push({type:7,index:s}),h+=$.length-1}s++}}static createElement(e,r){const i=S.createElement("template");return i.innerHTML=e,i}}function N(t,e,r=t,i){if(e===A)return e;let a=i!==void 0?r._$Co?.[i]:r._$Cl;const s=L(e)?void 0:e._$litDirective$;return a?.constructor!==s&&(a?._$AO?.(!1),s===void 0?a=void 0:(a=new s(t),a._$AT(t,r,i)),i!==void 0?(r._$Co??=[])[i]=a:r._$Cl=a),a!==void 0&&(e=N(t,a._$AS(t,e.values),a,i)),e}class it{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:r},parts:i}=this._$AD,a=(e?.creationScope??S).importNode(r,!0);_.currentNode=a;let s=_.nextNode(),n=0,o=0,c=i[0];for(;c!==void 0;){if(n===c.index){let l;c.type===2?l=new z(s,s.nextSibling,this,e):c.type===1?l=new c.ctor(s,c.name,c.strings,this,e):c.type===6&&(l=new ot(s,this,e)),this._$AV.push(l),c=i[++o]}n!==c?.index&&(s=_.nextNode(),n++)}return _.currentNode=S,a}p(e){let r=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,r),r+=i.strings.length-2):i._$AI(e[r])),r++}}class z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,i,a){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=N(this,e,r),L(e)?e===m||e==null||e===""?(this._$AH!==m&&this._$AR(),this._$AH=m):e!==this._$AH&&e!==A&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):et(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==m&&L(this._$AH)?this._$AA.nextSibling.data=e:this.T(S.createTextNode(e)),this._$AH=e}$(e){const{values:r,_$litType$:i}=e,a=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=R.createElement(Pe(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(r);else{const s=new it(a,this),n=s.u(this.options);s.p(r),this.T(n),this._$AH=s}}_$AC(e){let r=Se.get(e.strings);return r===void 0&&Se.set(e.strings,r=new R(e)),r}k(e){te(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let i,a=0;for(const s of e)a===r.length?r.push(i=new z(this.O(O()),this.O(O()),this,this.options)):i=r[a],i._$AI(s),a++;a<r.length&&(this._$AR(i&&i._$AB.nextSibling,a),r.length=a)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){const i=ge(e).nextSibling;ge(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class W{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,i,a,s){this.type=1,this._$AH=m,this._$AN=void 0,this.element=e,this.name=r,this._$AM=a,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=m}_$AI(e,r=this,i,a){const s=this.strings;let n=!1;if(s===void 0)e=N(this,e,r,0),n=!L(e)||e!==this._$AH&&e!==A,n&&(this._$AH=e);else{const o=e;let c,l;for(e=s[0],c=0;c<s.length-1;c++)l=N(this,o[i+c],r,c),l===A&&(l=this._$AH[c]),n||=!L(l)||l!==this._$AH[c],l===m?e=m:e!==m&&(e+=(l??"")+s[c+1]),this._$AH[c]=l}n&&!a&&this.j(e)}j(e){e===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class at extends W{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===m?void 0:e}}class st extends W{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==m)}}class nt extends W{constructor(e,r,i,a,s){super(e,r,i,a,s),this.type=5}_$AI(e,r=this){if((e=N(this,e,r,0)??m)===A)return;const i=this._$AH,a=e===m&&i!==m||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==m&&(i===m||a);a&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ot{constructor(e,r,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){N(this,e)}}const ct=ee.litHtmlPolyfillSupport;ct?.(R,z),(ee.litHtmlVersions??=[]).push("3.3.2");const lt=(t,e,r)=>{const i=r?.renderBefore??e;let a=i._$litPart$;if(a===void 0){const s=r?.renderBefore??null;i._$litPart$=a=new z(e.insertBefore(O(),s),s,void 0,r??{})}return a._$AI(t),a};const ie=globalThis;let G=class extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=lt(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};G._$litElement$=!0,G.finalized=!0,ie.litElementHydrateSupport?.({LitElement:G});const dt=ie.litElementPolyfillSupport;dt?.({LitElement:G}),(ie.litElementVersions??=[]).push("4.2.2");const ht={ATTRIBUTE:1},mt=t=>(...e)=>({_$litDirective$:t,values:e});let ut=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,i){this._$Ct=e,this._$AM=r,this._$Ci=i}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};const Ae="important",pt=" !"+Ae,_e=mt(class extends ut{constructor(t){if(super(t),t.type!==ht.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,r)=>{const i=t[r];return i==null?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){const{style:r}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const i of this.ft)e[i]==null&&(this.ft.delete(i),i.includes("-")?r.removeProperty(i):r[i]=null);for(const i in e){const a=e[i];if(a!=null){this.ft.add(i);const s=typeof a=="string"&&a.endsWith(pt);i.includes("-")||s?r.setProperty(i,s?a.slice(0,-11):a,s?Ae:""):r[i]=a}}return A}});const Ce=t=>(e,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};const gt={attribute:!0,type:String,converter:j,reflect:!1,hasChanged:K},ft=(t=gt,e,r)=>{const{kind:i,metadata:a}=r;let s=globalThis.litPropertyMetadata.get(a);if(s===void 0&&globalThis.litPropertyMetadata.set(a,s=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),s.set(r.name,t),i==="accessor"){const{name:n}=r;return{set(o){const c=e.get.call(this);e.set.call(this,o),this.requestUpdate(n,c,t,!0,o)},init(o){return o!==void 0&&this.C(n,void 0,t,o),o}}}if(i==="setter"){const{name:n}=r;return function(o){const c=this[n];e.call(this,o),this.requestUpdate(n,c,t,!0,o)}}throw Error("Unsupported decorator location: "+i)};function v(t){return(e,r)=>typeof r=="object"?ft(t,e,r):((i,a,s)=>{const n=a.hasOwnProperty(s);return a.constructor.createProperty(s,i),n?Object.getOwnPropertyDescriptor(a,s):void 0})(t,e,r)}function g(t){return v({...t,state:!0,attribute:!1})}const kt=he`
  :host {
    display: block;
    width: 100%;
    --likcc-summaraid-bg: #f7f9fe;
    --likcc-summaraid-main: #425AEF;
    --likcc-summaraid-title: #363636;
    --likcc-summaraid-content: #222;
    --likcc-summaraid-gptName: #999999;
    --likcc-summaraid-contentBg: #fff;
    --likcc-summaraid-border: #e3e8f7;
    --likcc-summaraid-shadow: 0 4px 24px rgba(66, 90, 239, 0.08);
    --likcc-summaraid-tagBg: #f0f4ff;
    --likcc-summaraid-tagColor: #425AEF;
    --likcc-summaraid-cursor: #425AEF;
    --likcc-summaraid-contentFontSize: 14px;
  }

  .likcc-summaraidGPT-summary--dark {
    --likcc-summaraid-bg: #23272e;
    --likcc-summaraid-main: #90caf9;
    --likcc-summaraid-title: #fff;
    --likcc-summaraid-content: #e3e8f7;
    --likcc-summaraid-gptName: #b0b8c9;
    --likcc-summaraid-contentBg: #2a2d32;
    --likcc-summaraid-border: #444;
    --likcc-summaraid-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.18);
    --likcc-summaraid-tagBg: rgba(255, 255, 255, 0.12);
    --likcc-summaraid-tagColor: #7ca6ff;
    --likcc-summaraid-cursor: #90caf9;
  }

  .likcc-summaraidGPT-summary--default {
    --likcc-summaraid-bg: #f7f9fe;
    --likcc-summaraid-main: #4F8DFD;
    --likcc-summaraid-title: #3A5A8C;
    --likcc-summaraid-content: #222;
    --likcc-summaraid-gptName: #7B88A8;
    --likcc-summaraid-contentBg: #fff;
    --likcc-summaraid-border: #e3e8f7;
    --likcc-summaraid-shadow: 0 2px 12px 0 rgba(60, 80, 180, 0.08);
    --likcc-summaraid-tagBg: #f0f4ff;
    --likcc-summaraid-tagColor: #4F8DFD;
    --likcc-summaraid-cursor: #4F8DFD;
  }

  .likcc-summaraidGPT-summary--blue {
    --likcc-summaraid-bg: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    --likcc-summaraid-main: #1976d2;
    --likcc-summaraid-title: #1976d2;
    --likcc-summaraid-content: #22577a;
    --likcc-summaraid-gptName: #fff;
    --likcc-summaraid-contentBg: #fafdff;
    --likcc-summaraid-border: #90caf9;
    --likcc-summaraid-shadow: 0 2px 12px 0 rgba(66, 165, 245, 0.1);
    --likcc-summaraid-tagBg: linear-gradient(90deg, #b3e5fc 0%, #e3f2fd 100%);
    --likcc-summaraid-tagColor: #1976d2;
    --likcc-summaraid-cursor: #1976d2;
  }

  .likcc-summaraidGPT-summary--green {
    --likcc-summaraid-bg: linear-gradient(135deg, #e0f7fa 0%, #a5d6a7 100%);
    --likcc-summaraid-main: #43a047;
    --likcc-summaraid-title: #2e7d32;
    --likcc-summaraid-content: #225744;
    --likcc-summaraid-gptName: #fff;
    --likcc-summaraid-contentBg: #fafdff;
    --likcc-summaraid-border: #a5d6a7;
    --likcc-summaraid-shadow: 0 2px 12px 0 rgba(67, 160, 71, 0.1);
    --likcc-summaraid-tagBg: linear-gradient(90deg, #b2dfdb 0%, #e0f7fa 100%);
    --likcc-summaraid-tagColor: #43a047;
    --likcc-summaraid-cursor: #43a047;
  }

  .likcc-summaraidGPT-fixed {
    --likcc-summaraid-fixed-accent: #5f67f8;
    --likcc-summaraid-fixed-accent-soft: rgba(95, 103, 248, 0.1);
    --likcc-summaraid-fixed-accent-faint: rgba(95, 103, 248, 0.04);
    --likcc-summaraid-fixed-line: rgba(95, 103, 248, 0.18);
    --likcc-summaraid-fixed-text: #273142;
    --likcc-summaraid-fixed-muted: #667085;
    --likcc-summaraid-fixed-surface: #ffffff;
    --likcc-summaraid-fixed-shell-y: 0.72rem;
    --likcc-summaraid-fixed-shell-x: 0.92rem;
    --likcc-summaraid-fixed-gap: 0.52rem;
    --likcc-summaraid-fixed-title-size: 0.76rem;
    --likcc-summaraid-fixed-content-size: 0.96rem;
    --likcc-summaraid-fixed-content-line: 1.68;
  }

  .likcc-summaraidGPT-tone--graphite {
    --likcc-summaraid-fixed-accent: #27303f;
    --likcc-summaraid-fixed-accent-soft: rgba(39, 48, 63, 0.09);
    --likcc-summaraid-fixed-accent-faint: rgba(39, 48, 63, 0.035);
    --likcc-summaraid-fixed-line: rgba(39, 48, 63, 0.16);
  }

  .likcc-summaraidGPT-tone--copper {
    --likcc-summaraid-fixed-accent: #b4682d;
    --likcc-summaraid-fixed-accent-soft: rgba(180, 104, 45, 0.12);
    --likcc-summaraid-fixed-accent-faint: rgba(180, 104, 45, 0.04);
    --likcc-summaraid-fixed-line: rgba(180, 104, 45, 0.2);
  }

  .likcc-summaraidGPT-density--comfortable {
    --likcc-summaraid-fixed-shell-y: 0.94rem;
    --likcc-summaraid-fixed-shell-x: 1.08rem;
    --likcc-summaraid-fixed-gap: 0.64rem;
    --likcc-summaraid-fixed-title-size: 0.82rem;
    --likcc-summaraid-fixed-content-size: 1rem;
    --likcc-summaraid-fixed-content-line: 1.74;
  }

  .likcc-summaraidGPT-fixed--dark {
    --likcc-summaraid-fixed-accent: #8fa0ff;
    --likcc-summaraid-fixed-accent-soft: rgba(143, 160, 255, 0.14);
    --likcc-summaraid-fixed-accent-faint: rgba(143, 160, 255, 0.07);
    --likcc-summaraid-fixed-line: rgba(143, 160, 255, 0.26);
    --likcc-summaraid-fixed-text: #e8edf7;
    --likcc-summaraid-fixed-muted: #aab6cc;
    --likcc-summaraid-fixed-surface: #171c25;
  }

  .likcc-summaraidGPT-simple-container,
  .likcc-summaraidGPT-inline-container {
    margin: 0.16rem 0 0.1rem;
  }

  .likcc-summaraidGPT-simple-icon,
  .likcc-summaraidGPT-inline-icon {
    width: 0.92rem;
    height: 0.92rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
  }

  .likcc-summaraidGPT-simple-icon svg,
  .likcc-summaraidGPT-inline-icon svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  .likcc-summaraidGPT-simple-title,
  .likcc-summaraidGPT-inline-title {
    font-size: var(--likcc-summaraid-fixed-title-size);
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-wrap: pretty;
  }

  .likcc-summaraidGPT-simple-content,
  .likcc-summaraidGPT-inline-content {
    color: var(--likcc-summaraid-fixed-text);
    font-size: var(--likcc-summaraid-fixed-content-size);
    line-height: var(--likcc-summaraid-fixed-content-line);
    letter-spacing: 0;
    word-break: break-word;
  }

  .likcc-summaraidGPT-simple-shell {
    background: var(--likcc-summaraid-fixed-surface);
    border: 1px solid var(--likcc-summaraid-fixed-line);
    border-radius: 1.15rem;
    padding: calc(var(--likcc-summaraid-fixed-shell-y) + 0.18rem)
      calc(var(--likcc-summaraid-fixed-shell-x) + 0.14rem);
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03);
  }

  .likcc-summaraidGPT-simple-header,
  .likcc-summaraidGPT-inline-header {
    display: flex;
    align-items: center;
    gap: 0.42rem;
    color: var(--likcc-summaraid-fixed-accent);
  }

  .likcc-summaraidGPT-simple-header {
    margin-bottom: 0.76rem;
  }

  .likcc-summaraidGPT-simple-title {
    font-size: calc(var(--likcc-summaraid-fixed-title-size) + 0.18rem);
    letter-spacing: 0.04em;
    text-transform: none;
  }

  .likcc-summaraidGPT-simple-content {
    font-size: calc(var(--likcc-summaraid-fixed-content-size) + 0.16rem);
    line-height: calc(var(--likcc-summaraid-fixed-content-line) + 0.08);
    letter-spacing: 0;
    text-wrap: pretty;
  }

  .likcc-summaraidGPT-inline-header {
    margin-bottom: 0.34rem;
  }

  .likcc-summaraidGPT-inline-header {
    position: relative;
  }

  .likcc-summaraidGPT-inline-shell {
    padding-top: 0.12rem;
  }

  .likcc-summaraidGPT-inline-header::after {
    content: '';
    flex: 1;
    min-width: 28px;
    height: 1px;
    margin-left: 0.18rem;
    background: linear-gradient(90deg, var(--likcc-summaraid-fixed-line) 0%, rgba(255, 255, 255, 0) 100%);
  }

  /* ── 星港信号简报（stellar） ──
     结构与经典/简约/内联卡片完全独立：斜切角外壳 + 四角括线 + 一条扫描光 + HUD 状态行。
     所有颜色只从站点变量取值（--cyan/--violet/--panel/--panel-soft/--panel-border/--reader-text/--text/--text-dim），
     站点未提供这些变量时用 currentColor 与 color-mix 兜底，昼夜都不会糊出一块黑板；
     字体同样只复用 --sans/--hud/--mono，不引入第三款字体。 */
  .likcc-summaraidGPT-stellar {
    --likcc-stellar-surface: var(--panel, color-mix(in srgb, currentColor 8%, transparent));
    --likcc-stellar-surface-soft: var(--panel-soft, color-mix(in srgb, currentColor 5%, transparent));
    --likcc-stellar-line: var(--panel-border, color-mix(in srgb, currentColor 18%, transparent));
    --likcc-stellar-strong: var(--text, currentColor);
    --likcc-stellar-body: var(--text, currentColor);
    --likcc-stellar-muted: var(--text-dim, currentColor);
    --likcc-stellar-accent: var(--cyan, currentColor);
    --likcc-stellar-accent-alt: var(--violet, currentColor);
    --likcc-stellar-cut: 15px;
    --likcc-stellar-bracket: 0.55;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    margin: 0.35rem 0;
    font-family: var(--sans, inherit);
    color: var(--likcc-stellar-body);
  }

  /* 浅底上括线与扫描光要更实一点才看得见，深色则保持克制 */
  .likcc-summaraidGPT-stellar--dark {
    --likcc-stellar-bracket: 0.48;
  }

  .likcc-summaraidGPT-stellar-shell {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0.78rem 0.95rem 0.92rem;
    border: 1px solid color-mix(in srgb, var(--likcc-stellar-accent) 22%, var(--likcc-stellar-line));
    background: linear-gradient(
      165deg,
      color-mix(in srgb, var(--likcc-stellar-accent) 10%, var(--likcc-stellar-surface)),
      var(--likcc-stellar-surface)
    );
    -webkit-backdrop-filter: blur(16px) saturate(1.2);
    backdrop-filter: blur(16px) saturate(1.2);
    clip-path: polygon(
      0 0,
      calc(100% - var(--likcc-stellar-cut)) 0,
      100% var(--likcc-stellar-cut),
      100% 100%,
      var(--likcc-stellar-cut) 100%,
      0 calc(100% - var(--likcc-stellar-cut))
    );
    animation: likcc-summaraidGPT-stellar-in 0.62s cubic-bezier(0.22, 1, 0.36, 1) both;
    transition: border-color 0.3s ease;
  }

  .likcc-summaraidGPT-stellar-shell:hover {
    border-color: color-mix(in srgb, var(--likcc-stellar-accent) 46%, var(--likcc-stellar-line));
  }

  /* 四角括线 */
  .likcc-summaraidGPT-stellar-shell::before {
    content: '';
    position: absolute;
    inset: 5px;
    pointer-events: none;
    background:
      linear-gradient(var(--likcc-stellar-accent), var(--likcc-stellar-accent)) left top / 12px 1.5px,
      linear-gradient(var(--likcc-stellar-accent), var(--likcc-stellar-accent)) left top / 1.5px 12px,
      linear-gradient(var(--likcc-stellar-accent), var(--likcc-stellar-accent)) right bottom / 12px 1.5px,
      linear-gradient(var(--likcc-stellar-accent), var(--likcc-stellar-accent)) right bottom / 1.5px 12px;
    background-repeat: no-repeat;
    opacity: var(--likcc-stellar-bracket);
    transition: opacity 0.3s ease;
  }

  .likcc-summaraidGPT-stellar-shell:hover::before {
    opacity: 1;
  }

  /* 顶部扫描光：一次性入场之后的唯一持续动效，减弱动态效果时被媒体查询整体关掉 */
  .likcc-summaraidGPT-stellar-shell::after {
    content: '';
    position: absolute;
    top: 0;
    left: -42%;
    width: 42%;
    height: 1px;
    pointer-events: none;
    background: linear-gradient(
      90deg,
      transparent,
      color-mix(in srgb, var(--likcc-stellar-accent) 88%, transparent),
      transparent
    );
    animation: likcc-summaraidGPT-stellar-scan 4.2s linear infinite;
  }

  .likcc-summaraidGPT-stellar-rail {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    margin-bottom: 0.62rem;
  }

  .likcc-summaraidGPT-stellar-code {
    display: inline-flex;
    align-items: center;
    padding: 0.14rem 0.42rem;
    border: 1px solid color-mix(in srgb, var(--likcc-stellar-accent) 40%, transparent);
    border-radius: 3px;
    background: var(--likcc-stellar-surface-soft);
    color: var(--likcc-stellar-accent);
    font-family: var(--hud, inherit);
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    line-height: 1.2;
    clip-path: polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 0 100%);
  }

  .likcc-summaraidGPT-stellar-status {
    display: inline-flex;
    align-items: center;
    gap: 0.32rem;
    color: var(--likcc-stellar-muted);
    font-family: var(--hud, inherit);
    font-size: 0.58rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    line-height: 1.2;
    white-space: nowrap;
  }

  .likcc-summaraidGPT-stellar-status::before {
    content: '';
    width: 5px;
    height: 5px;
    background: currentColor;
    transform: rotate(45deg);
  }

  .likcc-summaraidGPT-stellar-status--decoding {
    color: var(--likcc-stellar-accent);
  }

  .likcc-summaraidGPT-stellar-status--interrupted {
    color: var(--likcc-stellar-accent-alt);
  }

  .likcc-summaraidGPT-stellar-head {
    display: flex;
    align-items: center;
    gap: 0.46rem;
    margin-bottom: 0.58rem;
  }

  .likcc-summaraidGPT-stellar-mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: 0.92rem;
    height: 0.92rem;
    color: var(--likcc-stellar-accent-alt);
  }

  .likcc-summaraidGPT-stellar-mark svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  .likcc-summaraidGPT-stellar-title {
    min-width: 0;
    color: var(--likcc-stellar-strong);
    font-family: var(--sans, inherit);
    font-size: 0.98rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    line-height: 1.35;
    text-wrap: pretty;
  }

  .likcc-summaraidGPT-stellar-model {
    flex: none;
    margin-left: auto;
    padding: 0.1rem 0.38rem;
    border: 1px solid color-mix(in srgb, var(--likcc-stellar-accent) 28%, transparent);
    border-radius: 999px;
    color: var(--likcc-stellar-accent);
    font-family: var(--mono, inherit);
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    line-height: 1.3;
    white-space: nowrap;
  }

  /* 正文只靠一条上引线分区，不再套第二层卡片 */
  .likcc-summaraidGPT-stellar-body {
    padding-top: 0.6rem;
    border-top: 1px solid var(--likcc-stellar-line);
  }

  .likcc-summaraidGPT-stellar-text {
    margin: 0;
    color: var(--likcc-stellar-body);
    font-family: var(--sans, inherit);
    font-size: 0.95rem;
    line-height: 1.85;
    letter-spacing: 0.01em;
    word-break: break-word;
    text-wrap: pretty;
  }

  .likcc-summaraidGPT-stellar-text--state {
    color: var(--likcc-stellar-muted);
  }

  .likcc-summaraidGPT-stellar-cursor {
    display: inline-block;
    width: 2px;
    height: 1.1em;
    margin-left: 2px;
    vertical-align: middle;
    background-color: var(--likcc-stellar-accent);
    animation: likcc-summaraidGPT-blink 1.1s steps(1, end) infinite;
  }

  .likcc-summaraidGPT-summary-container {
    width: 100%;
    box-sizing: border-box;
    border-radius: 0.7rem;
    background: var(--likcc-summaraid-bg, rgba(250, 245, 255, 0.85));
    border: 1px solid var(--likcc-summaraid-border, #f3e6f9);
    box-shadow: var(--likcc-summaraid-shadow, 0 1px 4px 0 rgba(177, 108, 234, 0.04));
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
    z-index: 0;
    line-height: 1.5;
    padding: 0.5rem;
    font-size: 0.98rem;
    transition: box-shadow 0.25s, background 0.2s, transform 0.18s;
    opacity: 0;
    transform: translateY(12px);
    animation: likcc-summaraidGPT-fadein 0.7s cubic-bezier(0.4, 1.4, 0.6, 1) forwards;
    margin: 0.25rem 0;
  }

  .likcc-summaraidGPT-summary-container:hover {
    box-shadow: 0 10px 32px 0 rgba(60, 80, 180, 0.13), 0 2px 8px 0 rgba(60, 80, 180, 0.07);
    transform: translateY(-1.5px) scale(1.01);
  }

  .likcc-summaraidGPT-summary-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.4rem;
    margin-bottom: 0.5rem;
  }

  .likcc-summaraidGPT-header-left {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .likcc-summaraidGPT-logo {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 0.3rem;
    background: #fff;
    border: 1px solid var(--likcc-summaraid-border, #f3e6f9);
    object-fit: cover;
  }

  .likcc-summaraidGPT-summary-title {
    font-weight: 600;
    font-size: 0.97rem;
    color: var(--likcc-summaraid-title, #5a3a7a);
    margin-right: 0.4rem;
    text-wrap: pretty;
  }

  .likcc-summaraidGPT-gpt-name {
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--likcc-summaraid-tagColor, var(--likcc-summaraid-gptName, #a16cea));
    background: var(--likcc-summaraid-tagBg, linear-gradient(90deg, #b3e5fc 0%, #e3f2fd 100%));
    border-radius: 0.35rem;
    padding: 1px 7px;
    margin-left: auto;
    min-width: 24px;
    position: relative;
    overflow: hidden;
    box-shadow: none;
  }

  .likcc-summaraidGPT-gpt-name::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(120deg, transparent, rgba(66, 90, 239, 0.13), transparent);
    animation: likcc-summaraidGPT-shine 3s infinite linear;
    pointer-events: none;
  }

  .likcc-summaraidGPT-summary-content {
    background: var(--likcc-summaraid-contentBg, rgba(255, 255, 255, 0.92));
    border-radius: 0.45rem;
    padding: 0.4rem 0.4rem 0.3rem;
    font-size: var(--likcc-summaraid-contentFontSize, 14px);
    color: var(--likcc-summaraid-content, #4b2e5c);
    border: 1px solid var(--likcc-summaraid-border, #f3e6f9);
    margin: 0;
    word-break: break-word;
    line-height: 1.85;
    box-shadow: var(--likcc-summaraid-shadow, none);
    transition: background 0.3s, box-shadow 0.2s;
    opacity: 0;
    transform: translateY(6px);
    animation: likcc-summaraidGPT-contentin 0.7s 0.12s cubic-bezier(0.4, 1.4, 0.6, 1) forwards;
  }

  .likcc-summaraidGPT-cursor {
    display: inline-block;
    width: 2px;
    height: 1.2em;
    background-color: var(--likcc-summaraid-cursor);
    margin-left: 2px;
    animation: likcc-summaraidGPT-blink 1.1s steps(1, end) infinite;
    vertical-align: middle;
    border-radius: 1px;
  }

  @media (max-width: 768px) {
    .likcc-summaraidGPT-simple-shell {
      border-radius: 0.98rem;
      padding: calc(var(--likcc-summaraid-fixed-shell-y) + 0.06rem) calc(var(--likcc-summaraid-fixed-shell-x) - 0.04rem);
    }

    .likcc-summaraidGPT-simple-header {
      margin-bottom: 0.62rem;
    }

    .likcc-summaraidGPT-inline-title {
      font-size: 0.74rem;
    }

    .likcc-summaraidGPT-simple-title {
      font-size: 0.98rem;
    }

    .likcc-summaraidGPT-simple-content {
      font-size: 1rem;
      line-height: 1.76;
    }

    .likcc-summaraidGPT-inline-content {
      font-size: 0.92rem;
      line-height: 1.66;
    }

    /* 窄屏：收紧斜切角与内距，HUD 行不换行、状态词不挤到标题上 */
    .likcc-summaraidGPT-stellar {
      --likcc-stellar-cut: 12px;
    }

    .likcc-summaraidGPT-stellar-shell {
      padding: 0.68rem 0.78rem 0.8rem;
    }

    .likcc-summaraidGPT-stellar-title {
      font-size: 0.94rem;
    }

    .likcc-summaraidGPT-stellar-text {
      font-size: 0.92rem;
      line-height: 1.78;
    }

    .likcc-summaraidGPT-stellar-model {
      padding: 0.08rem 0.3rem;
      font-size: 0.56rem;
      letter-spacing: 0.03em;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .likcc-summaraidGPT-summary-container,
    .likcc-summaraidGPT-summary-content,
    .likcc-summaraidGPT-gpt-name::before,
    .likcc-summaraidGPT-cursor,
    .likcc-summaraidGPT-stellar-shell,
    .likcc-summaraidGPT-stellar-shell::after,
    .likcc-summaraidGPT-stellar-cursor {
      animation: none !important;
      transition: none !important;
      transform: none !important;
      opacity: 1 !important;
    }

    .likcc-summaraidGPT-summary-container:hover {
      transform: none;
    }
  }

  @keyframes likcc-summaraidGPT-fadein {
    0% {
      opacity: 0;
      transform: translateY(12px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes likcc-summaraidGPT-contentin {
    0% {
      opacity: 0;
      transform: translateY(6px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes likcc-summaraidGPT-shine {
    0% {
      left: -100%;
    }
    20% {
      left: 100%;
    }
    100% {
      left: 100%;
    }
  }

  @keyframes likcc-summaraidGPT-stellar-in {
    0% {
      opacity: 0;
      transform: translateY(8px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes likcc-summaraidGPT-stellar-scan {
    0% {
      left: -42%;
    }
    100% {
      left: 108%;
    }
  }

  @keyframes likcc-summaraidGPT-blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }
`,ae="likcc-summaraidGPT-stellar",bt=`${ae}--dark`,vt="本舱信号摘要",yt=["文章摘要","AI 总结"],Ee={decoding:{status:"解码中",message:"正在解码本舱信号…"},empty:{status:"待信号",message:"尚未收到导读信号"},interrupted:{status:"信号中断",message:"导读信号暂时中断，请稍后重试"}},U="/apis/api.summary.summaraidgpt.lik.cc/v1alpha1",D={bg:"#f7f9fe",main:"#4F8DFD",contentFontSize:"16px",title:"#3A5A8C",content:"#222",gptName:"#7B88A8",contentBg:"#fff",border:"#e3e8f7",shadow:"0 2px 12px 0 rgba(60,80,180,0.08)",tagBg:"#f0f4ff",tagColor:"#4F8DFD",cursor:"#4F8DFD"},se={logo:"icon.svg",summaryTitle:"文章摘要",gptName:"智阅GPT",typeSpeed:20,darkSelector:"",uiStyle:"simple",fixedTone:"violet",fixedDensity:"compact",themeName:"custom",theme:D,typewriter:!0,readingDefaultCollapsed:!1};function xt(t){if(!t)return{...D};if(typeof t=="string")try{const e=JSON.parse(t);return{...D,...e}}catch{return{...D}}return{...D,...t}}function wt(t,e){return t==="stellar"?"stellar":t==="simple"||t==="quiet"||t==="note"||t==="minimal"||t==="stripe"?"simple":t==="inline"?"inline":e==="spotlight"?"simple":"classic"}function $t(t){const e=(t||"").trim();return!e||yt.includes(e)?vt:e}function Tt(t){return t.failed?"interrupted":t.loading?"decoding":t.empty?"empty":"ready"}function St(t){return t==="ready"?"":Ee[t].status}function Pt(t){return t==="ready"?"":Ee[t].message}function At(t){return!(!t.typewriter||t.uiStyle==="stellar"&&t.prefersReducedMotion)}function _t(t){const e=t?.summaryContent?.trim()||"",r=t?.message==="摘要内容未发生变化，无需更新",i=t?.available??(t?.success!==!1||r);return{content:e,empty:t?.blackList===!0||!i||!e}}const Ct="文章名称为空",Ne="星图信号仍未就位，请稍后刷新重试";function Et(t,e){return t<e}function Nt(t){return t?`${ae} ${bt}`:ae}function Gt(t){return["reading-shell",t.isStellar?"is-stellar":"",t.isDark?"is-dark":""].filter(Boolean).join(" ")}function Ge(t){const e=document.documentElement,r=document.body,i=window.matchMedia?.("(prefers-color-scheme: dark)").matches??!1,a=e.getAttribute("data-color-scheme")||r.getAttribute("data-color-scheme");if(a==="dark")return!0;if(a==="light")return!1;if(a==="auto")return i;const s=e.getAttribute("data-theme")||r.getAttribute("data-theme")||e.getAttribute("data-mode")||r.getAttribute("data-mode")||e.getAttribute("data-bs-theme")||r.getAttribute("data-bs-theme");if(s==="dark")return!0;if(s==="light")return!1;if(s==="auto"||s==="system")return i;const n=e.getAttribute("data-scheme")||r.getAttribute("data-scheme");if(n==="dark")return!0;if(n==="light")return!1;if(n==="auto"||n==="system")return i;const o=e.getAttribute("data-scheme-preference")||r.getAttribute("data-scheme-preference");if(o==="dark")return!0;if(o==="light")return!1;if(o==="auto"||o==="system")return i;if(e.classList.contains("color-scheme-dark")||r.classList.contains("color-scheme-dark")||e.classList.contains("dark")||r.classList.contains("dark"))return!0;if(e.classList.contains("color-scheme-light")||r.classList.contains("color-scheme-light")||e.classList.contains("light")||r.classList.contains("light"))return!1;if(e.classList.contains("color-scheme-auto")||r.classList.contains("color-scheme-auto")||!t)return i;const c=t.match(/^data-([\w-]+)=(.+)$/);if(c){const u=`data-${c[1]}`,h=c[2];return e.getAttribute(u)===h||r.getAttribute(u)===h}const l=t.match(/^class=(.+)$/);if(l){const u=l[1];return e.classList.contains(u)||r.classList.contains(u)}return e.classList.contains(t)||r.classList.contains(t)}function Me(t,e){const r=document.documentElement,i=document.body,a=["class","data-color-scheme","data-theme","data-mode","data-bs-theme","data-scheme","data-scheme-preference"],s={attributes:!0,attributeFilter:a},n=t.match(/^data-([\w-]+)=(.+)$/);if(n){const l=`data-${n[1]}`;s.attributeFilter=a.includes(l)?a:[...a,l]}const o=new MutationObserver(e),c=new MutationObserver(e);return o.observe(r,s),c.observe(i,s),[o,c]}async function Mt(){try{const t=await fetch(`${U}/summaryConfig`);if(!t.ok)throw new Error(`HTTP ${t.status}: ${t.statusText}`);const e=await t.json();return{...se,...e,theme:e.theme??se.theme}}catch{return{...se}}}async function Oe(t){const e=await fetch(`${U}/summaryContent/${encodeURIComponent(t)}`);if(!e.ok)throw new Error(`HTTP ${e.status}: ${e.statusText}`);return await e.json()}function Ot(t){return t?t.startsWith("http://")||t.startsWith("https://")||t.startsWith("/")||t.startsWith("data:")?t:`/plugins/summaraidGPT/assets/static/${t}`:""}var Lt=Object.defineProperty,It=Object.getOwnPropertyDescriptor,f=(t,e,r,i)=>{for(var a=i>1?void 0:i?It(e,r):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(i?n(e,r,a):n(a))||a);return i&&a&&Lt(e,r,a),a};const Rt="暂无摘要内容",Le="摘要加载失败，请稍后重试";function zt(){return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1}let p=class extends G{constructor(){super(...arguments),this.postName="",this.logo="",this.summaryTitle="文章摘要",this.gptName="智阅GPT",this.typeSpeed=20,this.typewriter=!0,this.darkSelector="",this.themeName="custom",this.uiStyle="simple",this.fixedTone="violet",this.fixedDensity="compact",this.theme={},this.content="",this.displayContent="",this.loading=!0,this.typing=!1,this.loadFailed=!1,this.contentEmpty=!1,this.isDark=!1,this.themeObservers=[],this.initialized=!1,this.loadSequence=0,this.loadedPostName="",this.handleSystemColorSchemeChange=()=>{this.refreshThemeMode()}}connectedCallback(){super.connectedCallback(),this.refreshThemeMode(),this.bindThemeObservers(),this.bindSystemColorSchemeListener(),this.initialized&&this.loadSummary()}firstUpdated(){this.loadSummary(),this.initialized=!0}disconnectedCallback(){super.disconnectedCallback(),this.loadSequence+=1,this.unbindThemeObservers(),this.unbindSystemColorSchemeListener(),this.stopTypewriter()}updated(t){t.has("darkSelector")&&(this.refreshThemeMode(),this.bindThemeObservers()),this.initialized&&t.has("postName")&&this.postName!==this.loadedPostName&&this.loadSummary()}async loadSummary(){if(!this.postName){this.loadSequence+=1,this.loadedPostName="",this.stopTypewriter(),this.markLoadFailed();return}const t=this.loadSequence+1;this.loadSequence=t,this.loadedPostName=this.postName,this.stopTypewriter(),this.loading=!0,this.loadFailed=!1,this.displayContent="",this.contentEmpty=!1;try{const e=await Oe(this.postName);if(!this.isCurrentLoad(t))return;const r=_t(e);this.contentEmpty=r.empty,this.content=r.content||Rt,this.applyContent()}catch(e){if(!this.isCurrentLoad(t))return;console.warn("获取摘要失败:",e),this.markLoadFailed()}finally{this.isCurrentLoad(t)&&(this.loading=!1)}}isCurrentLoad(t){return t===this.loadSequence&&this.isConnected}markLoadFailed(){this.loading=!1,this.loadFailed=!0,this.contentEmpty=!1,this.content=Le,this.displayContent=Le}applyContent(){if(this.stopTypewriter(),this.effectiveUiStyle==="stellar"&&this.contentEmpty||!At({typewriter:this.typewriter,uiStyle:this.effectiveUiStyle,prefersReducedMotion:zt()})){this.displayContent=this.content,this.typing=!1;return}this.typing=!0,this.displayContent="";const e=Number.isFinite(this.typeSpeed)?Math.max(this.typeSpeed,0):20;let r=0;const i=()=>{if(r+=1,this.displayContent=this.content.slice(0,r),r>=this.content.length){this.typing=!1,this.typewriterTimer=void 0;return}this.typewriterTimer=window.setTimeout(i,e)};if(!this.content){this.typing=!1;return}i()}stopTypewriter(){this.typing=!1,this.typewriterTimer&&(window.clearTimeout(this.typewriterTimer),this.typewriterTimer=void 0)}refreshThemeMode(){this.isDark=Ge(this.darkSelector)}bindThemeObservers(){this.unbindThemeObservers(),this.themeObservers=Me(this.darkSelector,()=>{this.refreshThemeMode()})}unbindThemeObservers(){this.themeObservers.forEach(t=>t.disconnect()),this.themeObservers=[]}bindSystemColorSchemeListener(){if(window.matchMedia){if(this.prefersColorSchemeQuery=window.matchMedia("(prefers-color-scheme: dark)"),typeof this.prefersColorSchemeQuery.addEventListener=="function"){this.prefersColorSchemeQuery.addEventListener("change",this.handleSystemColorSchemeChange);return}this.prefersColorSchemeQuery.addListener?.(this.handleSystemColorSchemeChange)}}unbindSystemColorSchemeListener(){this.prefersColorSchemeQuery&&(typeof this.prefersColorSchemeQuery.removeEventListener=="function"?this.prefersColorSchemeQuery.removeEventListener("change",this.handleSystemColorSchemeChange):this.prefersColorSchemeQuery.removeListener?.(this.handleSystemColorSchemeChange),this.prefersColorSchemeQuery=void 0)}get effectiveThemeName(){return this.isDark?"dark":this.themeName==="dark"||this.themeName==="blue"||this.themeName==="green"||this.themeName==="custom"?this.themeName:"default"}get effectiveUiStyle(){return wt(this.uiStyle,this.themeName)}get customThemeStyles(){if(this.effectiveThemeName!=="custom")return{};const t=xt(this.theme);return{"--likcc-summaraid-bg":t.bg??"","--likcc-summaraid-main":t.main??"","--likcc-summaraid-contentFontSize":t.contentFontSize??"","--likcc-summaraid-title":t.title??"","--likcc-summaraid-content":t.content??"","--likcc-summaraid-gptName":t.gptName??"","--likcc-summaraid-contentBg":t.contentBg??"","--likcc-summaraid-border":t.border??"","--likcc-summaraid-shadow":t.shadow??"","--likcc-summaraid-tagBg":t.tagBg??"","--likcc-summaraid-tagColor":t.tagColor??"","--likcc-summaraid-cursor":t.cursor??""}}get effectiveFixedTone(){return this.fixedTone==="graphite"||this.fixedTone==="copper"?this.fixedTone:"violet"}get effectiveFixedDensity(){return this.fixedDensity==="comfortable"?"comfortable":"compact"}get fixedStyleClassName(){const t=["likcc-summaraidGPT-fixed",`likcc-summaraidGPT-tone--${this.effectiveFixedTone}`,`likcc-summaraidGPT-density--${this.effectiveFixedDensity}`];return this.isDark&&t.push("likcc-summaraidGPT-fixed--dark"),t.join(" ")}render(){return this.effectiveUiStyle==="stellar"?this.renderStellarCard():this.effectiveUiStyle==="simple"?this.renderSimpleCard():this.effectiveUiStyle==="inline"?this.renderInlineCard():this.renderClassicCard()}renderStellarCard(){const t=Tt({loading:this.loading,failed:this.loadFailed,empty:this.contentEmpty}),e=St(t),r=Pt(t);return d`
      <div class=${Nt(this.isDark)}>
        <div class="likcc-summaraidGPT-stellar-shell">
          <div class="likcc-summaraidGPT-stellar-rail">
            <span class="likcc-summaraidGPT-stellar-code">SIGNAL BRIEF</span>
            ${e?d`<span class=${`likcc-summaraidGPT-stellar-status likcc-summaraidGPT-stellar-status--${t}`}>${e}</span>`:m}
          </div>
          <div class="likcc-summaraidGPT-stellar-head">
            ${this.renderSparklesIcon("likcc-summaraidGPT-stellar-mark")}
            <span class="likcc-summaraidGPT-stellar-title">${$t(this.summaryTitle)}</span>
            ${this.gptName?d`<span class="likcc-summaraidGPT-stellar-model">${this.gptName}</span>`:m}
          </div>
          <div class="likcc-summaraidGPT-stellar-body">
            ${t==="ready"?d`<p class="likcc-summaraidGPT-stellar-text">${this.displayContent}${this.typing?d`<span class="likcc-summaraidGPT-stellar-cursor"></span>`:m}</p>`:d`<p class="likcc-summaraidGPT-stellar-text likcc-summaraidGPT-stellar-text--state">${r}</p>`}
          </div>
        </div>
      </div>
    `}renderClassicCard(){const t=`likcc-summaraidGPT-summary--${this.effectiveThemeName}`,e=Ot(this.logo),r=this.loading?"正在生成摘要…":this.displayContent;return d`
      <div class="likcc-summaraidGPT-summary-container ${t}" style=${_e(this.customThemeStyles)}>
        <div class="likcc-summaraidGPT-summary-header">
          <div class="likcc-summaraidGPT-header-left">
            ${e?d`<img class="likcc-summaraidGPT-logo not-prose" src=${e} alt=${this.gptName||"AI Logo"} width="20" height="20" />`:m}
            <span class="likcc-summaraidGPT-summary-title">${this.summaryTitle||"文章摘要"}</span>
          </div>
          <span class="likcc-summaraidGPT-gpt-name">${this.gptName||"智阅GPT"}</span>
        </div>
        <div class="likcc-summaraidGPT-summary-content">
          ${this.loading||this.loadFailed?d`<span style="color:#bbb;">${r}</span>`:r}
          ${this.typing?d`<span class="likcc-summaraidGPT-cursor"></span>`:m}
        </div>
      </div>
    `}renderInlineCard(){const t=this.loading?"正在生成摘要…":this.displayContent,e=this.summaryTitle||"AI 总结";return d`
      <div class="likcc-summaraidGPT-inline-container ${this.fixedStyleClassName}">
        <div class="likcc-summaraidGPT-inline-shell">
          <div class="likcc-summaraidGPT-inline-header">
            ${this.renderSparklesIcon("likcc-summaraidGPT-inline-icon")}
            <span class="likcc-summaraidGPT-inline-title">${e}</span>
          </div>
          <div class="likcc-summaraidGPT-inline-content">
            ${this.loading||this.loadFailed?d`<span style="color:#8892a6;">${t}</span>`:t}
            ${this.typing?d`<span class="likcc-summaraidGPT-cursor"></span>`:m}
          </div>
        </div>
      </div>
    `}renderSimpleCard(){const t=this.loading?"正在生成摘要…":this.displayContent,e=this.summaryTitle||"AI 总结";return d`
      <div class="likcc-summaraidGPT-simple-container ${this.fixedStyleClassName}">
        <div class="likcc-summaraidGPT-simple-shell">
          <div class="likcc-summaraidGPT-simple-header">
            ${this.renderSparklesIcon("likcc-summaraidGPT-simple-icon")}
            <span class="likcc-summaraidGPT-simple-title">${e}</span>
          </div>
          <div class="likcc-summaraidGPT-simple-content">
            ${this.loading||this.loadFailed?d`<span style="color:#8892a6;">${t}</span>`:t}
            ${this.typing?d`<span class="likcc-summaraidGPT-cursor"></span>`:m}
          </div>
        </div>
      </div>
    `}renderSparklesIcon(t){return d`
      <span class=${t} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M10.22 3.39a.35.35 0 0 1 .66 0l1.52 4.23a.38.38 0 0 0 .22.22l4.23 1.52a.35.35 0 0 1 0 .66l-4.23 1.52a.38.38 0 0 0-.22.22l-1.52 4.23a.35.35 0 0 1-.66 0l-1.52-4.23a.38.38 0 0 0-.22-.22L4.25 10.02a.35.35 0 0 1 0-.66l4.23-1.52a.38.38 0 0 0 .22-.22l1.52-4.23Z" />
          <path d="M18.38 4.18a.24.24 0 0 1 .45 0l.59 1.66c.02.07.08.13.15.15l1.66.59a.24.24 0 0 1 0 .45l-1.66.59a.25.25 0 0 0-.15.15l-.59 1.66a.24.24 0 0 1-.45 0l-.59-1.66a.25.25 0 0 0-.15-.15l-1.66-.59a.24.24 0 0 1 0-.45l1.66-.59a.24.24 0 0 0 .15-.15l.59-1.66Z" />
        </svg>
      </span>
    `}};p.styles=kt,f([v({type:String,attribute:"post-name"})],p.prototype,"postName",2),f([v({type:String})],p.prototype,"logo",2),f([v({type:String,attribute:"summary-title"})],p.prototype,"summaryTitle",2),f([v({type:String,attribute:"gpt-name"})],p.prototype,"gptName",2),f([v({type:Number,attribute:"type-speed"})],p.prototype,"typeSpeed",2),f([v({type:Boolean})],p.prototype,"typewriter",2),f([v({type:String,attribute:"dark-selector"})],p.prototype,"darkSelector",2),f([v({type:String,attribute:"theme-name"})],p.prototype,"themeName",2),f([v({type:String,attribute:"ui-style"})],p.prototype,"uiStyle",2),f([v({type:String,attribute:"fixed-tone"})],p.prototype,"fixedTone",2),f([v({type:String,attribute:"fixed-density"})],p.prototype,"fixedDensity",2),f([v({attribute:!1})],p.prototype,"theme",2),f([g()],p.prototype,"content",2),f([g()],p.prototype,"displayContent",2),f([g()],p.prototype,"loading",2),f([g()],p.prototype,"typing",2),f([g()],p.prototype,"loadFailed",2),f([g()],p.prototype,"contentEmpty",2),f([g()],p.prototype,"isDark",2),p=f([Ce("likcc-article-summary")],p);const Ut=he`
  :host {
    display: block;
    width: 100%;
    color: var(--likcc-reading-text, #172132);
    --likcc-reading-surface: #fbfaf7;
    --likcc-reading-panel: #ffffff;
    --likcc-reading-soft: #f5f7f8;
    --likcc-reading-line: rgba(23, 33, 50, 0.12);
    --likcc-reading-muted: #637185;
    --likcc-reading-text: #172132;
    --likcc-reading-accent: #2d9b8a;
    --likcc-reading-link: #d8d5cf;
    --likcc-reading-node: rgba(255, 255, 255, 0.92);
    --likcc-reading-node-soft: rgba(255, 255, 255, 0.84);
    --likcc-reading-node-strong: rgba(255, 255, 255, 0.96);
    --likcc-reading-node-border: #eee3d9;
    --likcc-reading-conclusion: #b15f20;
    --likcc-reading-background: #45aa9b;
    --likcc-reading-core: #6b98dd;
    --likcc-reading-argument: #b864ad;
    --likcc-reading-tl: #b45309;
    --likcc-reading-dl: #be3455;
    --likcc-reading-shadow: 0 18px 45px rgba(24, 34, 49, 0.12);
    font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  }

  .reading-shell {
    box-sizing: border-box;
    width: 100%;
    margin: 1.2rem 0;
    padding: 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }

  .reading-shell.is-dark {
    --likcc-reading-surface: #111827;
    --likcc-reading-panel: #182132;
    --likcc-reading-soft: #202b3b;
    --likcc-reading-line: rgba(226, 232, 240, 0.16);
    --likcc-reading-muted: #a8b4c6;
    --likcc-reading-text: #edf2f7;
    --likcc-reading-accent: #72d6c8;
    --likcc-reading-link: #495567;
    --likcc-reading-node: rgba(31, 41, 55, 0.94);
    --likcc-reading-node-soft: rgba(24, 34, 49, 0.9);
    --likcc-reading-node-strong: rgba(39, 50, 68, 0.98);
    --likcc-reading-node-border: #374254;
    --likcc-reading-conclusion: #e1a05e;
    --likcc-reading-background: #6fd3c5;
    --likcc-reading-core: #93b8ff;
    --likcc-reading-argument: #d99bdd;
    --likcc-reading-tl: #fbbf24;
    --likcc-reading-dl: #fb7185;
    --likcc-reading-shadow: 0 18px 36px rgba(0, 0, 0, 0.26);
  }

  .reading-collapse {
    display: flex;
    align-items: center;
    gap: 0.42rem;
    width: max-content;
    min-height: 1.6rem;
    margin: 0 0 0.48rem auto;
    padding: 0.08rem 0.12rem;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: var(--likcc-reading-accent);
    font-size: 0.84rem;
    font-weight: 720;
    line-height: 1.2;
  }

  .reading-collapse:hover {
    border-color: transparent;
    background: transparent;
    transform: none;
    color: color-mix(in srgb, var(--likcc-reading-accent) 74%, var(--likcc-reading-text));
  }

  .reading-collapsed {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
    gap: 0.58rem;
    width: 100%;
    min-height: 2.55rem;
    padding: 0.36rem 0;
    border: 0;
    border-top: 1px solid color-mix(in srgb, var(--likcc-reading-accent) 20%, transparent);
    border-bottom: 1px solid color-mix(in srgb, var(--likcc-reading-accent) 14%, transparent);
    border-radius: 0;
    background: transparent;
    color: var(--likcc-reading-text);
    box-shadow: none;
    text-align: left;
  }

  .reading-collapsed:hover {
    border-color: color-mix(in srgb, var(--likcc-reading-accent) 30%, transparent);
    background: color-mix(in srgb, var(--likcc-reading-accent) 4%, transparent);
    transform: none;
  }

  .collapsed-title {
    color: var(--likcc-reading-accent);
    font-size: 0.9rem;
    font-weight: 820;
    line-height: 1.2;
    white-space: nowrap;
  }

  .collapsed-summary {
    min-width: 0;
    overflow: hidden;
    color: var(--likcc-reading-muted);
    font-size: 0.84rem;
    font-weight: 620;
    line-height: 1.35;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .collapse-mark {
    display: inline-grid;
    place-items: center;
    width: 1rem;
    height: 1rem;
    border: 1px solid color-mix(in srgb, var(--likcc-reading-accent) 34%, transparent);
    border-radius: 6px;
    font-size: 0.78rem;
    line-height: 1;
  }

  button {
    box-sizing: border-box;
    border: 1px solid var(--likcc-reading-line);
    border-radius: 8px;
    background: var(--likcc-reading-panel);
    color: var(--likcc-reading-text);
    min-height: 2rem;
    padding: 0.36rem 0.58rem;
    font: inherit;
    font-size: 0.86rem;
    line-height: 1.2;
    letter-spacing: 0;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.18s ease, background 0.18s ease, color 0.18s ease,
      transform 0.18s ease, box-shadow 0.18s ease;
  }

  button:hover {
    border-color: color-mix(in srgb, var(--likcc-reading-accent) 45%, var(--likcc-reading-line));
    transform: translateY(-1px);
  }

  button:focus-visible,
  textarea:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--likcc-reading-accent) 64%, transparent);
    outline-offset: 2px;
  }

  button[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }

  .primary-action {
    border-color: transparent;
    background: var(--likcc-reading-accent);
    color: #ffffff;
  }

  .state-box {
    padding: 0.7rem 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    color: var(--likcc-reading-muted);
    line-height: 1.7;
  }

  .insight-graph {
    overflow: visible;
    border: 0;
    border-radius: 0;
    background: transparent;
  }

  .graph-canvas {
    position: relative;
    width: 100%;
    min-width: 0;
    aspect-ratio: 16 / 9;
    min-height: 29rem;
    max-height: 42rem;
    overflow: visible;
    padding: 0;
    background: transparent;
  }

  .graph-board {
    position: absolute;
    inset: 0;
  }

  .graph-links {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
    pointer-events: none;
  }

  .graph-links path {
    fill: none;
    stroke: var(--likcc-reading-link);
    stroke-width: 2.4;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 0.44;
    vector-effect: non-scaling-stroke;
  }

  .graph-link--branch {
    stroke-width: 2.2;
    opacity: 0.34;
  }

  .graph-link--leaf {
    stroke-width: 2.9;
    opacity: 0.76;
  }

  .graph-dot {
    fill: var(--likcc-reading-panel);
    stroke: var(--likcc-reading-link);
    stroke-width: 0.42;
    opacity: 0.82;
    vector-effect: non-scaling-stroke;
  }

  .graph-dot--branch {
    opacity: 0.5;
  }

  .graph-dot--leaf {
    opacity: 0.92;
  }

  .graph-link--conclusion {
    stroke: var(--likcc-reading-conclusion);
  }

  .graph-dot--conclusion {
    stroke: var(--likcc-reading-conclusion);
  }

  .graph-link--background {
    stroke: var(--likcc-reading-background);
  }

  .graph-dot--background {
    stroke: var(--likcc-reading-background);
  }

  .graph-link--core {
    stroke: var(--likcc-reading-core);
  }

  .graph-dot--core {
    stroke: var(--likcc-reading-core);
  }

  .graph-link--argument {
    stroke: var(--likcc-reading-argument);
  }

  .graph-dot--argument {
    stroke: var(--likcc-reading-argument);
  }

  .graph-node {
    position: absolute;
    z-index: 2;
    --node-color: var(--likcc-reading-link);
    --node-tint: color-mix(in srgb, var(--node-color) 7%, var(--likcc-reading-node));
    display: inline-grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
    justify-content: center;
    justify-items: center;
    gap: 0.42rem;
    min-height: 2.36rem;
    min-width: 0;
    width: 8.6rem;
    max-width: 8.6rem;
    padding: 0.32rem 0.58rem 0.34rem;
    border: 1px solid color-mix(in srgb, var(--node-color) 30%, var(--likcc-reading-node-border));
    border-radius: 10px;
    background: var(--node-tint);
    color: var(--likcc-reading-text);
    box-shadow: 0 8px 20px rgba(24, 34, 49, 0.06);
    font-size: 0.82rem;
    font-weight: 760;
    line-height: 1.14;
    text-align: center;
    transform: translate(-50%, -50%);
    transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease,
      box-shadow 0.18s ease, color 0.18s ease;
  }

  .graph-node::after {
    display: none;
  }

  .node-title {
    display: block;
    max-width: 100%;
    white-space: normal;
    word-break: break-word;
    overflow-wrap: anywhere;
    text-align: center;
  }

  .node-icon {
    display: inline-grid;
    place-items: center;
    width: 1.48rem;
    height: 1.48rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--node-color) 12%, var(--likcc-reading-panel));
    color: var(--node-color);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--node-color) 8%, transparent);
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

  .node-icon .iconify-icon,
  .icon-button .iconify-icon,
  .popover-actions .iconify-icon {
    width: 0.9rem;
    height: 0.9rem;
  }

  .graph-node:hover {
    border-color: color-mix(in srgb, var(--node-color) 52%, var(--likcc-reading-node-border));
    background: color-mix(in srgb, var(--node-color) 12%, var(--likcc-reading-node));
    box-shadow: 0 10px 24px rgba(24, 34, 49, 0.1);
    transform: translate(-50%, calc(-50% - 1px));
  }

  .graph-node.is-active {
    border-color: color-mix(in srgb, var(--node-color) 72%, var(--likcc-reading-node-border));
    background: color-mix(in srgb, var(--node-color) 15%, var(--likcc-reading-node));
    box-shadow: 0 10px 24px rgba(24, 34, 49, 0.12);
  }

  .graph-node--root {
    --node-color: #ffffff;
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 0.48rem;
    width: 8.25rem;
    height: 8.25rem;
    min-height: 0;
    min-width: 0;
    padding: 0.62rem;
    border: 1px solid #26323f;
    border-radius: 999px;
    background:
      radial-gradient(circle at 38% 26%, rgba(255, 255, 255, 0.1), transparent 28%),
      linear-gradient(145deg, #1a2432, #0f1722 76%);
    color: #ffffff;
    box-shadow: 0 16px 34px rgba(20, 30, 45, 0.18);
    font-size: 0.78rem;
    font-weight: 760;
    line-height: 1.36;
    text-align: center;
  }

  .graph-node--root > * {
    position: relative;
    z-index: 1;
  }

  .graph-node--root::before {
    content: "";
    position: absolute;
    inset: -0.55rem;
    border: 1px dashed rgba(100, 116, 139, 0.32);
    border-radius: inherit;
    pointer-events: none;
  }

  .graph-node--root .node-icon {
    width: 1.78rem;
    height: 1.78rem;
    background: transparent;
    color: #ffffff;
    box-shadow: none;
  }

  .graph-node--root .node-icon .iconify-icon {
    width: 1.45rem;
    height: 1.45rem;
  }

  .graph-node--root .node-title {
    display: -webkit-box;
    max-width: 6.6rem;
    overflow: hidden;
    white-space: normal;
    word-break: break-word;
    overflow-wrap: anywhere;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .graph-node--root:hover,
  .graph-node--root.is-active {
    border-color: #26323f;
    background:
      radial-gradient(circle at 38% 26%, rgba(255, 255, 255, 0.1), transparent 28%),
      linear-gradient(145deg, #1a2432, #0f1722 76%);
    color: #ffffff;
    box-shadow: 0 16px 34px rgba(20, 30, 45, 0.18);
    transform: translate(-50%, -50%);
  }

  .graph-node--root::after {
    display: none;
  }

  .graph-node--branch {
    width: 8.8rem;
    min-width: 8.8rem;
    min-height: 2.58rem;
    max-width: 8.8rem;
    font-size: 0.88rem;
    font-weight: 800;
  }

  .graph-node--leaf {
    min-height: 2.34rem;
    width: 7.55rem;
    min-width: 7.55rem;
    max-width: 7.55rem;
    background: color-mix(in srgb, var(--node-color) 5%, var(--likcc-reading-node-soft));
    box-shadow: 0 8px 18px rgba(24, 34, 49, 0.05);
    font-size: 0.76rem;
    font-weight: 720;
  }

  .graph-node--branch .node-title,
  .graph-node--leaf .node-title {
    display: -webkit-box;
    overflow: hidden;
    white-space: normal;
    word-break: break-word;
    overflow-wrap: anywhere;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .graph-node--branch .node-title {
    max-width: 6.6rem;
  }

  .graph-node--leaf .node-title {
    max-width: 5.45rem;
  }

  .graph-node--tone-conclusion {
    --node-color: var(--likcc-reading-conclusion);
  }

  .graph-node--tone-background {
    --node-color: var(--likcc-reading-background);
  }

  .graph-node--tone-core {
    --node-color: var(--likcc-reading-core);
  }

  .graph-node--tone-argument {
    --node-color: var(--likcc-reading-argument);
  }

  .reading-shell.is-dark .insight-graph {
    background: transparent;
  }

  .reading-shell.is-dark .graph-node {
    background: color-mix(in srgb, var(--node-color) 8%, var(--likcc-reading-node));
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
  }

  .reading-shell.is-dark .graph-node--root {
    background: #111827;
    border-color: #566274;
    box-shadow: 0 16px 34px rgba(0, 0, 0, 0.3);
  }

  .reading-shell.is-dark .graph-node--leaf {
    background: color-mix(in srgb, var(--node-color) 8%, var(--likcc-reading-node-soft));
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
  }

  .reading-shell.is-dark .node-icon {
    background: color-mix(in srgb, var(--node-color) 18%, var(--likcc-reading-panel));
  }

  .node-popover {
    position: absolute;
    top: 50%;
    right: 1.25rem;
    z-index: 4;
    box-sizing: border-box;
    width: min(20.5rem, 28vw);
    max-height: min(31rem, calc(100% - 3rem));
    overflow: auto;
    padding: 1.22rem;
    border: 1px solid var(--likcc-reading-line);
    border-radius: 18px;
    background:
      linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,255,255,0.9));
    color: var(--likcc-reading-text);
    box-shadow: 0 22px 50px rgba(24, 34, 49, 0.14);
    transform: translateY(-50%);
    animation: reading-popover-in 0.2s ease both;
  }

  .reading-shell.is-dark .node-popover {
    border-color: var(--likcc-reading-line);
    background: linear-gradient(180deg, rgba(24, 33, 50, 0.98), rgba(18, 25, 38, 0.94));
    box-shadow: 0 20px 46px rgba(0, 0, 0, 0.38);
  }

  .popover-head,
  .question-actions,
  .popover-actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.42rem;
  }

  .popover-head {
    justify-content: flex-end;
    margin-bottom: 0.72rem;
  }

  .icon-button {
    display: inline-grid;
    place-items: center;
    width: 2rem;
    min-height: 2rem;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--likcc-reading-text);
  }

  .node-popover h3 {
    margin: 0;
    color: var(--likcc-reading-text);
    font-size: 1.1rem;
    font-weight: 850;
    line-height: 1.38;
    letter-spacing: 0;
    overflow-wrap: anywhere;
  }

  .node-popover p {
    margin: 0.72rem 0 0;
    color: var(--likcc-reading-muted);
    font-size: 0.92rem;
    line-height: 1.82;
    overflow-wrap: anywhere;
  }

  .source-anchor {
    width: 100%;
    min-height: 2.8rem;
    margin-top: 1rem;
    border: 1px solid color-mix(in srgb, var(--likcc-reading-accent) 26%, var(--likcc-reading-line));
    border-radius: 9px;
    background: color-mix(in srgb, var(--likcc-reading-accent) 7%, var(--likcc-reading-panel));
    color: var(--likcc-reading-text);
    text-align: left;
    line-height: 1.6;
    overflow-wrap: anywhere;
  }

  .reading-shell.is-dark .source-anchor {
    background: color-mix(in srgb, var(--likcc-reading-accent) 10%, var(--likcc-reading-panel));
  }

  .payload-list {
    display: grid;
    gap: 0.42rem;
    margin: 1rem 0 0;
    padding: 0;
    list-style: none;
  }

  .payload-list li {
    position: relative;
    padding-left: 0.92rem;
    color: var(--likcc-reading-text);
    font-size: 0.88rem;
    line-height: 1.58;
    overflow-wrap: anywhere;
  }

  .payload-list li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.64em;
    width: 0.34rem;
    height: 0.34rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--likcc-reading-accent) 76%, var(--likcc-reading-muted));
  }

  .popover-actions {
    margin-top: 1.05rem;
    padding-top: 0.8rem;
    border-top: 1px solid var(--likcc-reading-line);
  }

  .popover-actions button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.48rem;
    min-height: 2rem;
    padding: 0.34rem 0.2rem;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: var(--likcc-reading-text);
    font-size: 0.84rem;
    font-weight: 700;
  }

  .question-composer {
    margin-top: 0.72rem;
    padding-top: 0.72rem;
    border-top: 1px solid var(--likcc-reading-line);
  }

  .question-input {
    box-sizing: border-box;
    width: 100%;
    min-height: 5.2rem;
    resize: vertical;
    border: 1px solid var(--likcc-reading-line);
    border-radius: 8px;
    background: var(--likcc-reading-panel);
    color: var(--likcc-reading-text);
    padding: 0.62rem;
    font: inherit;
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .reading-shell.is-dark .question-input {
    background: var(--likcc-reading-soft);
  }

  .question-actions {
    margin-top: 0.5rem;
  }

  .answer-box {
    margin-top: 0.62rem;
    padding: 0.64rem 0.7rem;
    border-left: 3px solid var(--likcc-reading-accent);
    background: color-mix(in srgb, var(--likcc-reading-accent) 8%, transparent);
    color: var(--likcc-reading-text);
    font-size: 0.9rem;
    line-height: 1.7;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }

  /* ── 星港口径（stellar） ──
     结构与几何一律不动，只重写配色与字体：图谱里原本写死的深蓝根节点、纯白浮窗、
     rgba 阴影全部换成主题变量，昼夜由主题的 [data-scheme] 一次切换。
     取色口径：--panel / --panel-soft / --panel-border 作玻璃与描边，--cyan / --violet 作强调，
     --text / --reader-text / --text-dim 作文字层级；四类语义节点仍在同一色域内互相区分——
     结论=紫、核心=青、背景=青与文字灰、论据=青紫之间，不会退化成同一种颜色。 */
  .reading-shell.is-stellar {
    --likcc-stellar-surface: var(--panel, color-mix(in srgb, currentColor 8%, transparent));
    --likcc-stellar-surface-soft: var(--panel-soft, color-mix(in srgb, currentColor 5%, transparent));
    --likcc-stellar-line: var(--panel-border, color-mix(in srgb, currentColor 18%, transparent));
    --likcc-stellar-strong: var(--text, currentColor);
    --likcc-stellar-body: var(--reader-text, var(--text, currentColor));
    --likcc-stellar-muted: var(--text-dim, currentColor);
    --likcc-stellar-accent: var(--cyan, currentColor);
    --likcc-stellar-accent-alt: var(--violet, currentColor);
    --likcc-reading-surface: var(--likcc-stellar-surface);
    --likcc-reading-panel: var(--likcc-stellar-surface);
    --likcc-reading-soft: var(--likcc-stellar-surface-soft);
    --likcc-reading-line: var(--likcc-stellar-line);
    --likcc-reading-node: var(--likcc-stellar-surface);
    --likcc-reading-node-soft: var(--likcc-stellar-surface-soft);
    --likcc-reading-node-strong: var(--likcc-stellar-surface);
    --likcc-reading-node-border: var(--likcc-stellar-line);
    --likcc-reading-link: color-mix(in srgb, var(--likcc-stellar-accent) 34%, var(--likcc-stellar-line));
    --likcc-reading-text: var(--likcc-stellar-body);
    --likcc-reading-muted: var(--likcc-stellar-muted);
    --likcc-reading-accent: var(--likcc-stellar-accent);
    --likcc-reading-conclusion: var(--likcc-stellar-accent-alt);
    --likcc-reading-background: color-mix(in srgb, var(--likcc-stellar-accent) 46%, var(--likcc-stellar-muted));
    --likcc-reading-core: var(--likcc-stellar-accent);
    --likcc-reading-argument: color-mix(in srgb, var(--likcc-stellar-accent) 52%, var(--likcc-stellar-accent-alt));
    --likcc-reading-tl: var(--likcc-stellar-accent-alt);
    --likcc-reading-dl: var(--likcc-stellar-accent);
    font-family: var(--sans, inherit);
    color: var(--likcc-stellar-body);
  }

  /* HUD 小字与符号走 --hud / --mono：中文仍回落到 --sans 的中文字形，英文与数字由 Orbitron、JetBrains Mono 接管 */
  .reading-shell.is-stellar .collapse-mark,
  .reading-shell.is-stellar .graph-node {
    font-family: var(--mono, inherit);
  }

  .reading-shell.is-stellar .reading-collapse,
  .reading-shell.is-stellar .collapsed-title,
  .reading-shell.is-stellar .popover-actions button,
  .reading-shell.is-stellar .primary-action {
    font-family: var(--hud, inherit);
  }

  .reading-shell.is-stellar .state-box,
  .reading-shell.is-stellar .collapsed-summary,
  .reading-shell.is-stellar .node-title,
  .reading-shell.is-stellar .node-popover h3,
  .reading-shell.is-stellar .node-popover p,
  .reading-shell.is-stellar .payload-list li,
  .reading-shell.is-stellar .answer-box,
  .reading-shell.is-stellar .question-input {
    font-family: var(--sans, inherit);
  }

  /* 展开/收起与浮窗改用玻璃底，描边取主题发丝线 */
  .reading-shell.is-stellar .node-popover {
    border-color: var(--likcc-stellar-line);
    background: var(--likcc-stellar-surface);
    -webkit-backdrop-filter: blur(18px) saturate(1.3);
    backdrop-filter: blur(18px) saturate(1.3);
    box-shadow: var(--panel-shadow, 0 18px 46px color-mix(in srgb, var(--likcc-stellar-muted) 26%, transparent));
  }

  .reading-shell.is-stellar .question-input {
    border-color: var(--likcc-stellar-line);
    background: var(--likcc-stellar-surface-soft);
    color: var(--likcc-stellar-body);
  }

  .reading-shell.is-stellar .source-anchor,
  .reading-shell.is-stellar .answer-box {
    border-color: color-mix(in srgb, var(--likcc-stellar-accent) 26%, var(--likcc-stellar-line));
    background: color-mix(in srgb, var(--likcc-stellar-accent) 8%, transparent);
    color: var(--likcc-stellar-body);
  }

  /* 主操作不做实心填充：强调色在深色下是亮青、浅色下是深青，纯色底会撞掉一边的对比度 */
  .reading-shell.is-stellar .primary-action {
    border-color: color-mix(in srgb, var(--likcc-stellar-accent) 48%, transparent);
    background: color-mix(in srgb, var(--likcc-stellar-accent) 14%, transparent);
    color: var(--likcc-stellar-accent);
  }

  .reading-shell.is-stellar .primary-action:hover:not([disabled]) {
    border-color: color-mix(in srgb, var(--likcc-stellar-accent) 70%, transparent);
    background: color-mix(in srgb, var(--likcc-stellar-accent) 22%, transparent);
  }

  .reading-shell.is-stellar .graph-node {
    background: color-mix(in srgb, var(--node-color) 8%, var(--likcc-stellar-surface));
    border-color: color-mix(in srgb, var(--node-color) 30%, var(--likcc-stellar-line));
    box-shadow: 0 8px 20px color-mix(in srgb, var(--likcc-stellar-muted) 18%, transparent);
    color: var(--likcc-stellar-strong);
  }

  .reading-shell.is-stellar .graph-node--leaf {
    background: color-mix(in srgb, var(--node-color) 6%, var(--likcc-stellar-surface-soft));
  }

  .reading-shell.is-stellar .graph-node:hover,
  .reading-shell.is-stellar .graph-node.is-active {
    background: color-mix(in srgb, var(--node-color) 14%, var(--likcc-stellar-surface));
    border-color: color-mix(in srgb, var(--node-color) 62%, var(--likcc-stellar-line));
    box-shadow: 0 10px 24px color-mix(in srgb, var(--likcc-stellar-muted) 24%, transparent);
  }

  .reading-shell.is-stellar .node-icon {
    background: color-mix(in srgb, var(--node-color) 14%, var(--likcc-stellar-surface));
    color: var(--node-color);
  }

  /* 根节点不再自带深蓝底：改为星港玻璃，昼夜同一口径 */
  .reading-shell.is-stellar .graph-node--root {
    --node-color: var(--likcc-stellar-accent);
    border-color: color-mix(in srgb, var(--likcc-stellar-accent) 38%, var(--likcc-stellar-line));
    background: linear-gradient(
      165deg,
      color-mix(in srgb, var(--likcc-stellar-accent) 14%, var(--likcc-stellar-surface)),
      var(--likcc-stellar-surface)
    );
    color: var(--likcc-stellar-strong);
    box-shadow: 0 16px 34px color-mix(in srgb, var(--likcc-stellar-muted) 22%, transparent);
  }

  .reading-shell.is-stellar .graph-node--root::before {
    border-color: color-mix(in srgb, var(--likcc-stellar-accent) 30%, transparent);
  }

  .reading-shell.is-stellar .graph-node--root .node-icon {
    background: transparent;
    color: var(--likcc-stellar-accent);
    box-shadow: none;
  }

  .reading-shell.is-stellar .graph-node--root:hover,
  .reading-shell.is-stellar .graph-node--root.is-active {
    border-color: color-mix(in srgb, var(--likcc-stellar-accent) 62%, var(--likcc-stellar-line));
    background: linear-gradient(
      165deg,
      color-mix(in srgb, var(--likcc-stellar-accent) 20%, var(--likcc-stellar-surface)),
      var(--likcc-stellar-surface)
    );
    color: var(--likcc-stellar-strong);
    box-shadow: 0 16px 34px color-mix(in srgb, var(--likcc-stellar-muted) 30%, transparent);
  }

  .reading-shell.is-stellar .graph-links path {
    stroke: var(--likcc-reading-link);
  }

  .reading-shell.is-stellar .graph-dot {
    fill: var(--likcc-stellar-surface);
    stroke: var(--likcc-reading-link);
  }

  .reading-shell.is-stellar .reading-collapse {
    border: 1px solid color-mix(in srgb, var(--likcc-stellar-accent) 22%, transparent);
    border-radius: 6px;
    background: var(--likcc-stellar-surface-soft);
    padding: 0.14rem 0.46rem;
  }

  .reading-shell.is-stellar .reading-collapse:hover {
    border-color: color-mix(in srgb, var(--likcc-stellar-accent) 44%, transparent);
    background: color-mix(in srgb, var(--likcc-stellar-accent) 8%, transparent);
    color: var(--likcc-stellar-accent);
  }

  /* 收起态沿用原有的上下发丝线结构，只把线与底换成主题口径 */
  .reading-shell.is-stellar .reading-collapsed {
    border-top-color: color-mix(in srgb, var(--likcc-stellar-accent) 26%, transparent);
    border-bottom-color: color-mix(in srgb, var(--likcc-stellar-accent) 18%, transparent);
    background: var(--likcc-stellar-surface-soft);
    padding-inline: 0.5rem;
  }

  .reading-shell.is-stellar .reading-collapsed:hover {
    border-top-color: color-mix(in srgb, var(--likcc-stellar-accent) 46%, transparent);
    border-bottom-color: color-mix(in srgb, var(--likcc-stellar-accent) 30%, transparent);
    background: color-mix(in srgb, var(--likcc-stellar-accent) 8%, var(--likcc-stellar-surface-soft));
  }

  @media (max-width: 760px) {
    .reading-shell {
      padding: 0;
    }

    .graph-canvas {
      aspect-ratio: 9 / 14;
      min-height: clamp(34rem, 138vw, 44rem);
    }

    .graph-node {
      width: 5.75rem;
      min-width: 5.75rem;
      max-width: 5.75rem;
      min-height: 2.08rem;
      padding: 0.26rem 0.38rem;
      gap: 0.28rem;
      font-size: 0.68rem;
      line-height: 1.12;
    }

    .node-icon {
      width: 1.16rem;
      height: 1.16rem;
    }

    .node-icon .iconify-icon,
    .icon-button .iconify-icon,
    .popover-actions .iconify-icon {
      width: 0.74rem;
      height: 0.74rem;
    }

    .node-title {
      display: -webkit-box;
      max-width: 3.9rem;
      overflow: hidden;
      white-space: normal;
      word-break: break-word;
      overflow-wrap: anywhere;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .graph-node--root {
      width: 5.7rem;
      height: 5.7rem;
      padding: 0.5rem;
      font-size: 0.62rem;
    }

    .graph-node--root::before {
      inset: -0.38rem;
    }

    .graph-node--root .node-icon {
      width: 1.36rem;
      height: 1.36rem;
    }

    .graph-node--root .node-icon .iconify-icon {
      width: 1.08rem;
      height: 1.08rem;
    }

    .graph-node--root .node-title {
      max-width: 4.6rem;
      -webkit-line-clamp: 3;
    }

    .graph-node--branch {
      width: 5.9rem;
      min-width: 5.9rem;
      max-width: 5.9rem;
      font-size: 0.72rem;
    }

    .graph-node--leaf {
      width: 5.45rem;
      min-width: 5.45rem;
      max-width: 5.45rem;
      font-size: 0.66rem;
    }

    .node-popover {
      position: fixed;
      inset: auto 1rem 1rem 1rem;
      width: auto;
      max-height: 24rem;
      transform: none;
      animation: reading-popover-mobile-in 0.2s ease both;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    button {
      transition: none;
    }

    button:hover {
      transform: none;
    }

    .node-popover {
      animation: none;
    }
  }

  @keyframes reading-popover-in {
    from {
      opacity: 0;
      transform: translateY(-50%) translateX(14px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(-50%) translateX(0) scale(1);
    }
  }

  @keyframes reading-popover-mobile-in {
    from {
      opacity: 0;
      transform: translateY(14px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;async function Dt(t){const e=await fetch(`${U}/articleReadings/${encodeURIComponent(t)}`),r=await e.json().catch(()=>{});if(!e.ok)throw new Error(r&&"message"in r&&r.message?r.message:`HTTP ${e.status}: ${e.statusText}`);if(!r||!("spec"in r)||!r.spec)throw new Error(r?.message||"洞察图谱尚未生成");return r}async function qt(t,e){const r=JSON.stringify([{role:"user",content:`${e}

用户问题：${t}`}]),i=await fetch(`${U}/conversation`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversationHistory:r})});if(!i.ok){const s=await i.json().catch(()=>{});throw new Error(s?.detail||s?.message||`HTTP ${i.status}: ${i.statusText}`)}const a=await i.json();if(a.success===!1)throw new Error(a.message||"提问失败");return a.response||""}async function Ft(t){try{await fetch(`${U}/articleReadingInteractions`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}catch(e){console.warn("记录洞察图谱互动失败:",e)}}function Bt(){const t="likcc-article-reading-visitor-id",e=window.crypto?.randomUUID?.()||`visitor-${Date.now()}-${Math.random()}`;try{const r=window.localStorage.getItem(t);if(r)return r;window.localStorage.setItem(t,e)}catch{return e}return e}const Ie="ri:book-open-line",Re="https://api.iconify.design",ze=/^([a-z0-9]+(?:-[a-z0-9]+)*):([a-z0-9]+(?:-[a-z0-9]+)*)$/i;function Ht(t,e="iconify-icon"){const r=Yt(t)||ne(Ie);return d`
    <span
      class=${e}
      style=${_e({"--rag-icon-source":`url("${r}")`})}
      aria-hidden="true"
    ></span>
  `}function Yt(t){const e=t?.trim();if(e){if(jt(e))return ne(e);if(Vt(e))return Xt(e);if(Wt(e)||Qt(e))return e}}function jt(t){return ze.test(t)}function ne(t){const e=t.match(ze);if(!e)return ne(Ie);const[,r,i]=e;return`${Re}/${encodeURIComponent(r)}/${encodeURIComponent(i)}.svg`}function Vt(t){return t.startsWith("<svg")&&t.endsWith("</svg>")}function Wt(t){return t.startsWith("data:image/svg+xml")}function Qt(t){try{const e=new URL(t);return e.origin===Re&&e.pathname.endsWith(".svg")}catch{return!1}}function Xt(t){return`data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`}var Jt=Object.defineProperty,Zt=Object.getOwnPropertyDescriptor,b=(t,e,r,i)=>{for(var a=i>1?void 0:i?Zt(e,r):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(i?n(e,r,a):n(a))||a);return i&&a&&Jt(e,r,a),a};const Kt=5,er=3e3,tr=600,Ue=["conclusion","background","core","argument"];let k=class extends G{constructor(){super(...arguments),this.postName="",this.darkSelector="",this.uiStyle="simple",this.defaultCollapsed=!1,this.loading=!0,this.errorMessage="",this.notGenerated=!1,this.activeNodeId="",this.popoverOpen=!1,this.questionOpen=!1,this.question="",this.answer="",this.asking=!1,this.isDark=!1,this.isCompactViewport=!1,this.collapsed=!1,this.themeObservers=[],this.visitorId="",this.collapseTouched=!1,this.initialized=!1,this.pollAttempts=0,this.requestSequence=0,this.loadedPostName="",this.handleColorSchemeChange=()=>{this.refreshThemeMode()},this.handleCompactViewportChange=()=>{this.refreshCompactViewport()},this.toggleCollapsed=()=>{this.collapseTouched=!0,this.collapsed=!this.collapsed,this.popoverOpen=!1,this.questionOpen=!1},this.closePopover=()=>{this.popoverOpen=!1}}connectedCallback(){super.connectedCallback(),this.visitorId=Bt(),this.refreshThemeMode(),this.refreshCompactViewport(),this.bindThemeObservers(),this.bindEnvironmentObservers(),this.initialized&&this.loadReading()}firstUpdated(){this.collapsed=this.defaultCollapsed,this.loadReading(),this.initialized=!0}disconnectedCallback(){super.disconnectedCallback(),this.requestSequence+=1,this.clearPollTimer(),this.unbindEnvironmentObservers(),this.unbindThemeObservers()}updated(t){t.has("darkSelector")&&(this.refreshThemeMode(),this.bindThemeObservers()),t.has("defaultCollapsed")&&!this.collapseTouched&&(this.collapsed=this.defaultCollapsed),this.initialized&&t.has("postName")&&this.postName!==this.loadedPostName&&(this.pollAttempts=0,this.loadReading())}async loadReading(t=!1){if(!this.postName){this.requestSequence+=1,this.clearPollTimer(),this.pollAttempts=0,this.reading=void 0,this.notGenerated=!1,this.loading=!1,this.popoverOpen=!1,this.questionOpen=!1,this.errorMessage=Ct,this.loadedPostName=this.postName;return}const e=this.requestSequence+1;this.requestSequence=e,this.loadedPostName=this.postName,t||(this.loading=!0),this.errorMessage="",this.popoverOpen=!1,this.questionOpen=!1;try{const r=await Dt(this.postName);if(!this.isCurrentRequest(e))return;if(!this.isRenderableReading(r.spec)){this.reading=void 0,this.notGenerated=!0,this.scheduleExistingPoll();return}this.clearPollTimer(),this.pollAttempts=0,this.reading=r.spec,this.notGenerated=!1,this.activeNodeId=this.graph.root.id}catch(r){if(!this.isCurrentRequest(e))return;console.warn("洞察图谱加载失败:",r);const i=r instanceof Error?r.message:"洞察图谱加载失败";this.isPendingGenerationError(i)?(this.notGenerated=!0,this.scheduleExistingPoll()):(this.notGenerated=!1,this.errorMessage=i)}finally{this.isCurrentRequest(e)&&(this.loading=!1)}}isCurrentRequest(t){return t===this.requestSequence&&this.isConnected}scheduleExistingPoll(){if(this.clearPollTimer(),!Et(this.pollAttempts,tr)){this.notGenerated=!1,this.errorMessage=Ne;return}this.pollAttempts+=1;const t=this.postName;this.pollTimer=window.setTimeout(()=>{this.pollTimer=void 0,!(!this.isConnected||this.postName!==t)&&this.loadReading(!0)},er)}clearPollTimer(){this.pollTimer&&(window.clearTimeout(this.pollTimer),this.pollTimer=void 0)}refreshThemeMode(){this.isDark=Ge(this.darkSelector)}refreshCompactViewport(){this.isCompactViewport=window.matchMedia?.("(max-width: 760px)").matches??!1}bindThemeObservers(){this.unbindThemeObservers(),this.themeObservers=Me(this.darkSelector,()=>{this.refreshThemeMode()})}unbindThemeObservers(){this.themeObservers.forEach(t=>t.disconnect()),this.themeObservers=[]}bindEnvironmentObservers(){window.matchMedia&&(this.colorSchemeQuery=window.matchMedia("(prefers-color-scheme: dark)"),this.compactViewportQuery=window.matchMedia("(max-width: 760px)"),this.addMediaListener(this.colorSchemeQuery,this.handleColorSchemeChange),this.addMediaListener(this.compactViewportQuery,this.handleCompactViewportChange))}unbindEnvironmentObservers(){this.colorSchemeQuery&&(this.removeMediaListener(this.colorSchemeQuery,this.handleColorSchemeChange),this.colorSchemeQuery=void 0),this.compactViewportQuery&&(this.removeMediaListener(this.compactViewportQuery,this.handleCompactViewportChange),this.compactViewportQuery=void 0)}addMediaListener(t,e){if(typeof t.addEventListener=="function"){t.addEventListener("change",e);return}t.addListener(e)}removeMediaListener(t,e){if(typeof t.removeEventListener=="function"){t.removeEventListener("change",e);return}t.removeListener(e)}get graph(){const t=this.reading?.root||{id:"root",title:this.reading?.postTitle||"文章标题",kind:"root",summary:"洞察图谱"},e=(this.reading?.nodes||[]).filter(i=>!this.isLegacyGraphNode(i)),r=new Set([t.id,...e.map(i=>i.id)]);return{root:t,nodes:e,edges:(this.reading?.edges||[]).filter(i=>r.has(i.from)&&r.has(i.to))}}get allNodes(){return[this.graph.root,...this.graph.nodes.filter(t=>t.id!==this.graph.root.id)]}get activeNode(){return this.nodeById(this.activeNodeId)||this.graph.root}get isStellar(){return this.uiStyle==="stellar"}render(){const t=Gt({isDark:this.isDark,isStellar:this.isStellar});return this.collapsed?d`
        <section class=${t}>
          <button
            class="reading-collapsed"
            type="button"
            aria-expanded="false"
            @click=${this.toggleCollapsed}
          >
            <span class="collapsed-title">洞察图谱</span>
            <span class="collapsed-summary">${this.collapsedSummary()}</span>
            <span class="collapse-mark" aria-hidden="true">+</span>
          </button>
        </section>
      `:d`
      <section class=${t}>
        <button
          class="reading-collapse"
          type="button"
          aria-expanded=${String(!this.collapsed)}
          @click=${this.toggleCollapsed}
        >
          <span>收起洞察图谱</span>
          <span class="collapse-mark" aria-hidden="true">-</span>
        </button>
        ${this.renderBody()}
      </section>
    `}collapsedSummary(){return this.loading?"正在读取":this.notGenerated?"后台生成中":this.errorMessage===Ne?"信号未就位":this.errorMessage?"加载失败":this.reading?.postTitle||this.graph.root.title||"点击展开查看"}renderBody(){return this.loading?d`<div class="state-box">正在读取洞察图谱…</div>`:this.notGenerated?d`
        <div class="state-box">
          洞察图谱正在后台生成，完成后会自动刷新显示，无需手动刷新页面。
        </div>
      `:this.errorMessage?d`<div class="state-box">${this.errorMessage}</div>`:this.reading?this.renderGraph():d`<div class="state-box">暂无洞察图谱</div>`}renderGraph(){const t=this.graphNodeViews(),e=this.graphLinkViews(t);return d`
      <div class="insight-graph">
        <div class="graph-canvas">
          <div class="graph-board">
            <svg class="graph-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              ${e.map(r=>tt`
                <path
                  class=${`graph-link graph-link--${r.level} graph-link--${r.tone}`}
                  d=${this.linkPath(r)}
                ></path>
                <circle
                  class=${`graph-dot graph-dot--${r.level} graph-dot--${r.tone}`}
                  cx=${r.to.x}
                  cy=${r.to.y}
                  r="0.72"
                ></circle>
              `)}
            </svg>
            ${t.map(r=>d`
              <button
                class=${this.nodeClass(r)}
                type="button"
                style=${`left:${r.x}%;top:${r.y}%`}
                @click=${()=>this.handleNodeClick(r.node)}
                aria-label=${r.node.title}
                title=${r.node.title}
              >
                <span class="node-icon" aria-hidden="true">${this.renderNodeIcon(r)}</span>
                <span class="node-title">${this.nodeDisplayTitle(r)}</span>
              </button>
            `)}
          </div>
          ${this.popoverOpen?this.renderPopover():m}
        </div>
      </div>
    `}renderPopover(){const t=this.activeNode,e=this.payloadItems(t);return d`
      <aside class=${`node-popover node-popover--${this.toneForNode(t.id)}`}>
        <div class="popover-head">
          <button class="icon-button" type="button" @click=${this.closePopover} aria-label="关闭详情">
            ${this.renderInlineIcon("x")}
          </button>
        </div>
        <h3>${t.title}</h3>
        ${t.summary?d`<p>${t.summary}</p>`:m}
        ${!t.summary&&this.isBranchNode(t.id)?d`
          <p>${this.branchChildTitles(t).join(" / ")}</p>
        `:m}
        ${t.sourceRange?.anchor?d`
          <button class="source-anchor" type="button" @click=${()=>this.scrollNodeSource(t)}>
            ${t.sourceRange.anchor}
          </button>
        `:m}
        ${e.length>0?d`
          <ul class="payload-list">
            ${e.map(r=>d`<li>${r}</li>`)}
          </ul>
        `:m}
        ${t.kind!=="root"?d`
          <div class="popover-actions">
            <button
              type="button"
              ?disabled=${!t.sourceRange?.anchor}
              @click=${()=>this.scrollNodeSource(t)}
            >
              ${this.renderInlineIcon("rotate")}<span>跳回原文</span>
            </button>
            <button type="button" @click=${()=>this.openQuestion(t)}>
              ${this.renderInlineIcon("message")}<span>问这一块</span>
            </button>
          </div>
        `:m}
        ${this.questionOpen?this.renderQuestionComposer():m}
      </aside>
    `}renderQuestionComposer(){return d`
      <div class="question-composer">
        <textarea
          class="question-input"
          .value=${this.question}
          placeholder="输入关于当前节点的问题"
          @input=${this.handleQuestionInput}
        ></textarea>
        <div class="question-actions">
          <button class="primary-action" type="button" @click=${this.submitQuestion} ?disabled=${this.asking}>
            ${this.asking?"思考中…":"提问"}
          </button>
          <button type="button" @click=${()=>this.questionOpen=!1}>收起</button>
        </div>
        ${this.answer?d`<div class="answer-box">${this.answer}</div>`:m}
      </div>
    `}handleNodeClick(t){const e=this.popoverOpen&&this.activeNode.id===t.id;this.activeNodeId=t.id,this.questionOpen=!1,this.answer="",this.popoverOpen=!e}openQuestion(t){this.activeNodeId=t.id,this.questionOpen=!0,this.popoverOpen=!0,this.answer="",this.question||(this.question="这一块还能怎么理解？")}handleQuestionInput(t){this.question=t.target.value}async submitQuestion(){if(this.question.trim()){this.asking=!0,this.answer="";try{this.answer=await qt(this.question.trim(),this.buildNodeContext(this.activeNode)),this.recordInteraction(this.activeNode.id,"ask",this.question.trim())}catch(t){this.answer=t instanceof Error?t.message:"提问失败"}finally{this.asking=!1}}}buildNodeContext(t){return[`文章标题：${this.reading?.postTitle||""}`,`节点标题：${t.title}`,`节点类型：${this.kindLabel(t.kind)}`,`节点摘要：${t.summary||""}`,`原文依据：${t.sourceRange?.anchor||""}`,`节点补充：${this.payloadItems(t).join("；")}`].join(`
`)}async recordInteraction(t,e,r){this.postName&&await Ft({postName:this.postName,nodeId:t,interactionType:e,value:r,visitorId:this.visitorId})}scrollNodeSource(t){const e=t.sourceRange?.anchor;if(!e)return;const r=this.findTextElement(e);r&&(r.scrollIntoView({behavior:"smooth",block:"center"}),this.highlightElement(r))}findTextElement(t){const e=this.normalizeForSearch(t).slice(0,48);return!e||!document.body?null:document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:a=>{const s=a.parentElement;return!s||s.closest("script,style,noscript,template,likcc-article-reading")?NodeFilter.FILTER_REJECT:this.normalizeForSearch(a.textContent||"").includes(e)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}).nextNode()?.parentElement||null}highlightElement(t){const e=t.style.outline,r=t.style.outlineOffset,i=t.style.scrollMarginTop;t.style.outline="2px solid var(--likcc-reading-accent, #0f766e)",t.style.outlineOffset="4px",t.style.scrollMarginTop="96px",window.setTimeout(()=>{t.style.outline=e,t.style.outlineOffset=r,t.style.scrollMarginTop=i},1800)}nodeById(t){return this.allNodes.find(e=>e.id===t)}graphNodeViews(){const t=new Map;this.addGraphView(t,this.graph.root,50,50,"root","neutral");const e=this.graph.nodes.filter(o=>o.kind==="tl"),r=this.nodeParentMap(),i=this.nodeToneMap(),a=Math.max(1,e.length),s=this.graphLayoutMetrics(a);e.forEach((o,c)=>{const l=this.branchAngle(c,a),u=this.clampPosition(50+Math.cos(l)*s.branchRadiusX),h=this.clampPosition(50+Math.sin(l)*s.branchRadiusY);this.addGraphView(t,o,u,h,"branch",i.get(o.id)||this.keywordTone(o.title));const y=this.graphChildNodes(o.id).filter(w=>w.kind==="dl"),x=Math.max(1,y.length);y.forEach((w,pr)=>{const Fe=this.childNodePosition(u,h,l,pr,x,s);this.addGraphView(t,w,Fe.x,Fe.y,"leaf",i.get(w.id)||i.get(o.id)||this.keywordTone(w.title))})});const n=this.graph.nodes.filter(o=>!t.has(o.id));return n.forEach((o,c)=>{const l=this.branchAngle(c,Math.max(1,n.length)),u=!!r.get(o.id),h=u||o.kind==="dl"?s.orphanLeafRadiusX:s.branchRadiusX,y=u||o.kind==="dl"?s.orphanLeafRadiusY:s.branchRadiusY;this.addGraphView(t,o,this.clampPosition(50+Math.cos(l)*h),this.clampPosition(50+Math.sin(l)*y),o.kind==="tl"?"branch":"leaf",i.get(o.id)||this.keywordTone(o.title))}),Array.from(t.values())}graphLayoutMetrics(t){const e=t>4;if(this.isCompactViewport){const n=e?27:25,o=e?30:28,c=e?17:18,l=e?13:14;return{branchRadiusX:n,branchRadiusY:o,childOffsetX:c,childOffsetY:l,childSpreadX:e?16:17,childSpreadY:e?8.2:8.8,orphanLeafRadiusX:n+c,orphanLeafRadiusY:o+l}}const r=e?25:23,i=e?24:22,a=e?18.5:20.5,s=e?12:13.5;return{branchRadiusX:r,branchRadiusY:i,childOffsetX:a,childOffsetY:s,childSpreadX:e?16.5:17.5,childSpreadY:e?7.2:7.8,orphanLeafRadiusX:r+a,orphanLeafRadiusY:i+s}}childNodePosition(t,e,r,i,a,s){const n=i-(a-1)/2,o=a===1?0:n*s.childSpreadX,c=a===1?0:n*s.childSpreadY,l=this.branchSide(r);if(l==="top"||l==="bottom"){const x=l==="top"?-1:1;return{x:this.clampPosition(t+o),y:this.clampPosition(e+x*s.childOffsetY)}}const u=l==="left"?-1:1,h=Math.sin(r),y=Math.abs(h)>.22?(h<0?-1:1)*i*s.childSpreadY:c;return{x:this.clampPosition(t+u*s.childOffsetX),y:this.clampPosition(e+y)}}branchSide(t){const e=Math.cos(t),r=Math.sin(t);return r<-.86?"top":r>.86?"bottom":e<0?"left":"right"}addGraphView(t,e,r,i,a,s){t.set(e.id,{node:e,x:r,y:i,level:a,tone:s})}graphLinkViews(t){const e=new Map(t.map(s=>[s.node.id,s])),r=this.graph.edges.map(s=>this.linkView(e,s.from,s.to)),i=this.inferredGraphEdges().map(s=>this.linkView(e,s.from,s.to)),a=new Set;return[...r,...i].filter(s=>!!s).filter(s=>{const n=`${s.from.node.id}->${s.to.node.id}`;return a.has(n)?!1:(a.add(n),!0)}).sort((s,n)=>s.level===n.level?0:s.level==="branch"?-1:1)}linkView(t,e,r,i){const a=t.get(e),s=t.get(r);if(!(!a||!s))return{from:a,to:s,tone:i||s.tone||a.tone,level:a.level==="branch"&&s.level==="leaf"?"leaf":"branch"}}linkPath(t){const e=t.to.x-t.from.x,r=t.to.y-t.from.y,i=t.level==="leaf"?.08:.14,a=-r*i,s=e*i;return`M ${t.from.x} ${t.from.y} C ${t.from.x+e*.42+a} ${t.from.y+r*.42+s}, ${t.from.x+e*.58+a} ${t.from.y+r*.58+s}, ${t.to.x} ${t.to.y}`}nodeClass(t){return["graph-node",`graph-node--${t.level}`,`graph-node--${t.node.kind}`,`graph-node--tone-${t.tone}`,this.activeNodeId===t.node.id&&this.popoverOpen?"is-active":""].filter(Boolean).join(" ")}nodeDisplayTitle(t){const e=this.normalizeTitle(t.node.title),r=this.nodeTitleLimit(t.level);if(!e)return"未命名节点";const i=e.split(/[：:]/)[0]?.trim();if(i&&i.length>=2&&this.visualLength(i)<=r)return i;const a=e.split(/[，,。；;、|｜/（(]/)[0]?.trim();return a&&a.length>=2&&this.visualLength(a)<=r?a:this.truncateTitle(e,r)}nodeTitleLimit(t){return t==="root"?this.isCompactViewport?16:22:t==="branch"?this.isCompactViewport?8:10:this.isCompactViewport?7:9}normalizeTitle(t){return t.replace(/\s+/g," ").trim()}truncateTitle(t,e){const r=Array.from(t);let i=0,a="";for(const s of r){const n=this.visualLength(s);if(i+n>e)return`${a.trim()}…`;a+=s,i+=n}return a.trim()}visualLength(t){return Array.from(t).reduce((e,r)=>e+(/[\u3400-\u9fff\uff00-\uffef]/.test(r)?1:.55),0)}toneForNode(t){const e=this.nodeById(t);return this.nodeToneMap().get(t)||this.keywordTone(e?.title||t)}renderNodeIcon(t){return t.level==="root"?this.renderInlineIcon("brain"):this.renderInlineIcon(this.iconNameForNode(t.node,t.level))}branchAngle(t,e){return e===1?0:e===2?t===0?Math.PI:0:Math.PI*2*t/Math.max(1,e)-Math.PI/2}clampPosition(t){const e=this.isCompactViewport?11:8,r=this.isCompactViewport?89:92;return Math.min(r,Math.max(e,t))}nodeParentMap(){const t=new Set(this.allNodes.map(r=>r.id)),e=new Map;return this.graph.edges.forEach(r=>{t.has(r.from)&&t.has(r.to)&&!e.has(r.to)&&e.set(r.to,r.from)}),e}nodeToneMap(){const t=new Map;return this.graph.nodes.filter(r=>r.kind==="tl").forEach((r,i)=>{const a=this.keywordTone(r.title,Ue[i%Ue.length]);t.set(r.id,a),this.graphChildNodes(r.id).forEach(s=>t.set(s.id,a))}),t}inferredGraphEdges(){const t=this.graph.root.id,e=new Set(this.graph.edges.map(s=>`${s.from}->${s.to}`)),r=[],i=this.graph.nodes.filter(s=>s.kind==="tl");i.forEach(s=>{const n=`${t}->${s.id}`;e.has(n)||r.push({from:t,to:s.id})});const a=new Map;return i.forEach((s,n)=>{a.set(String(n+1),s.id)}),this.graph.nodes.filter(s=>s.kind==="dl").forEach(s=>{if(this.graph.edges.some(l=>l.to===s.id))return;const o=s.id.match(/^dl-(\d+)-/),c=o?a.get(o[1]):void 0;c&&r.push({from:c,to:s.id})}),r}keywordTone(t,e="neutral"){const r=t.toLowerCase();return/结论|建议|行动|清单|追问|conclusion|advice|action|question|follow/.test(r)?"conclusion":/背景|来源|上下文|时间|历程|开篇|background|source|timeline/.test(r)?"background":/核心|观点|判断|概念|术语|解释|人物|产品|core|concept|term|people|product/.test(r)?"core":/论据|证据|事实|数据|案例|风险|问题|argument|evidence|data|case|risk/.test(r)?"argument":e}iconNameForNode(t,e){const r=`${t.title} ${t.id}`.toLowerCase();return/背景|来源|上下文|开篇|background|source/.test(r)?"book":/时间|历程|阶段|timeline|history|stage/.test(r)?"timeline":/核心|观点|判断|主张|core|claim|judgment/.test(r)?"star":/证据|依据|事实|数据|evidence|data|fact/.test(r)?"database":/案例|故事|实践|case|story|practice/.test(r)?"file":/步骤|流程|方法|教程|step|process|method|guide/.test(r)?"route":/风险|问题|争议|risk|problem|issue/.test(r)?"alert":/概念|术语|解释|term|concept|explain/.test(r)?"search":/人物|角色|作者|user|people|person|role/.test(r)?"user":/产品|工具|模型|product|tool|model/.test(r)?"box":/行动|建议|清单|todo|action|advice|list/.test(r)?"check":/追问|问题|question|follow/.test(r)?"help":/结论|总结|收束|conclusion|summary/.test(r)||e==="branch"?"flag":"message"}renderInlineIcon(t){return Ht({brain:"ri:brain-line",flag:"ri:flag-line",message:"ri:message-3-line",help:"ri:question-line",book:"ri:book-open-line",target:"ri:focus-3-line",monitor:"ri:line-chart-line",star:"ri:star-smile-line",search:"ri:search-line",user:"ri:user-3-line",bar:"ri:bar-chart-line",database:"ri:database-2-line",file:"ri:file-text-line",route:"ri:route-line",timeline:"ri:time-line",alert:"ri:error-warning-line",box:"ri:box-3-line",check:"ri:check-line",rotate:"ri:arrow-go-back-line",x:"ri:close-line"}[t]||"ri:circle-line")}graphChildNodes(t){const e=new Map(this.allNodes.map(i=>[i.id,i])),r=new Set;return this.graph.edges.filter(i=>i.from===t).map(i=>e.get(i.to)).filter(i=>!i||r.has(i.id)?!1:(r.add(i.id),!0))}isBranchNode(t){return this.graphChildNodes(t).length>0}isLegacyGraphNode(t){return t.kind==="overview"||t.kind==="action"||t.id==="overview-30s"||t.id==="overview-conclusion"||t.id==="overview-keypoints"||t.id==="tl-group"||t.id==="dl-group"||t.id==="action-group"||t.id.startsWith("action-")||["30秒概览","一句话结论","3个关键点","TL分块","DL深挖","用户互动","跳回原文","问这一块","收藏节点","点赞反馈"].includes(t.title)}branchChildTitles(t){return this.graphChildNodes(t.id).map(e=>e.title)}payloadItems(t){const e=t.payload?.items;return Array.isArray(e)?e.map(r=>String(r)).filter(Boolean).slice(0,6):[]}kindLabel(t){return rr(t)}normalizeForSearch(t){return t.replace(/\s+/g,"").toLowerCase()}isRenderableReading(t){if(!t?.root||!Array.isArray(t.nodes)||!Array.isArray(t.edges)||(t.schemaVersion||0)<Kt)return!1;const e=new Set(t.nodes.filter(s=>s.kind==="tl"&&!!s.id).map(s=>s.id)),r=new Set(t.nodes.filter(s=>s.kind==="dl"&&!!s.id).map(s=>s.id));if(e.size<3||r.size===0)return!1;const i=t.root.id||"root",a=new Set(t.edges.filter(s=>s.from===i).map(s=>s.to));return Array.from(e).every(s=>a.has(s))}isPendingGenerationError(t){return["尚未生成","不存在","需要重建","HTTP 404"].some(e=>t.includes(e))}};k.styles=Ut,b([v({type:String,attribute:"post-name"})],k.prototype,"postName",2),b([v({type:String,attribute:"dark-selector"})],k.prototype,"darkSelector",2),b([v({type:String,attribute:"ui-style"})],k.prototype,"uiStyle",2),b([v({type:Boolean,attribute:"default-collapsed"})],k.prototype,"defaultCollapsed",2),b([g()],k.prototype,"reading",2),b([g()],k.prototype,"loading",2),b([g()],k.prototype,"errorMessage",2),b([g()],k.prototype,"notGenerated",2),b([g()],k.prototype,"activeNodeId",2),b([g()],k.prototype,"popoverOpen",2),b([g()],k.prototype,"questionOpen",2),b([g()],k.prototype,"question",2),b([g()],k.prototype,"answer",2),b([g()],k.prototype,"asking",2),b([g()],k.prototype,"isDark",2),b([g()],k.prototype,"isCompactViewport",2),b([g()],k.prototype,"collapsed",2),k=b([Ce("likcc-article-reading")],k);function rr(t){switch(t){case"root":return"文章";case"tl":return"TL";case"dl":return"DL";default:return t}}const q="ai-summaraidGPT",Q="ai-summaraidGPT-data",De="likcc-article-summary",F="ai-summaraidGPT-reading",ir="likcc-article-reading",B="data-summary-lit-mounted",qe="data-summary-silent-processed";let X,oe,H;function ar(){window.likcc_summaraidGPT_scriptLoaded||(console.log("%c智阅GPT-智能AI助手","color: #4F8DFD; font-size: 16px; font-weight: bold;"),console.log("%c智阅点睛，一键洞见——基于AI大模型的Halo智能AI助手","color: #666; font-size: 12px;"),console.log("%c作者: Handsome | 网站: https://lik.cc","color: #999; font-size: 11px;"),window.likcc_summaraidGPT_scriptLoaded=!0)}function sr(t,e,r){t.postName=r.getAttribute("name")||"",t.logo=e.logo||"",t.summaryTitle=e.summaryTitle||"文章摘要",t.gptName=e.gptName||"智阅GPT",t.typeSpeed=e.typeSpeed??20,t.typewriter=e.typewriter??!0,t.darkSelector=e.darkSelector||"",t.uiStyle=e.uiStyle||"simple",t.fixedTone=e.fixedTone||"violet",t.fixedDensity=e.fixedDensity||"compact",t.themeName=e.themeName||"custom",t.theme=e.theme||{}}function nr(t,e,r){t.postName=r.getAttribute("name")||"",t.darkSelector=e.darkSelector||"",t.uiStyle=e.uiStyle||"simple",t.defaultCollapsed=e.readingDefaultCollapsed??!1}async function or(t){const e=Array.from(document.querySelectorAll(`${q}:not([${B}="true"])`)),r=Array.from(document.querySelectorAll(`${F}:not([${B}="true"])`));if(e.length===0&&r.length===0)return[];[...e,...r].forEach(o=>o.setAttribute(B,"true"));const s={...await Mt(),...t},n=[];return e.forEach(o=>{if(!o.isConnected)return;const c=document.createElement(De);sr(c,s,o),o.replaceWith(c),n.push(c)}),r.forEach(o=>{if(!o.isConnected)return;const c=document.createElement(ir);nr(c,s,o),o.replaceWith(c),n.push(c)}),n}function cr(){return document.querySelector(`${q}:not([${B}="true"]),${F}:not([${B}="true"])`)!==null}function ce(t={}){if(H)return H;const e=or(t).finally(()=>{H===e&&(H=void 0),cr()&&C()});return H=e,e}async function lr(){const t=Array.from(document.querySelectorAll(`${Q}:not([${qe}="true"])`));await Promise.all(t.map(async e=>{const r=e.getAttribute("name");if(!(!r||!e.isConnected)){e.setAttribute(qe,"true");try{await Oe(r)}catch(i){console.warn("读取摘要失败:",i)}}}))}async function dr(){const t=document.querySelectorAll(q),e=document.querySelectorAll(F),r=document.querySelectorAll(Q),i=document.querySelector(De);if(t.length>0||e.length>0){await ce();return}r.length>0&&!i&&await lr()}function C(){X&&window.clearTimeout(X),X=window.setTimeout(()=>{X=void 0,dr().catch(t=>{console.warn("摘要框初始化失败:",t)})},0)}function hr(t){return t.type!=="childList"?!1:Array.from(t.addedNodes).some(r=>r instanceof Element?r.matches(q)||r.matches(Q)||r.matches(F)||r.querySelector(q)!==null||r.querySelector(Q)!==null||r.querySelector(F)!==null:!1)}function mr(){oe||(oe=new MutationObserver(t=>{t.some(hr)&&C()}),oe.observe(document.documentElement,{childList:!0,subtree:!0}))}function ur(){["pjax:success","pjax:complete","swup:content-replaced","swup:page:view","swup:animation:in:end"].forEach(e=>{document.addEventListener(e,C)}),window.swup?.hooks?.on?.("page:view",C),window.swup?.hooks?.on?.("content:replace",C)}ar(),window.likcc_summaraidGPT_initSummaryBox=ce,window.likcc_summaraidGPT_reinit=ce,mr(),ur(),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{C()},{once:!0}):C()}));
