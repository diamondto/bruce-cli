const e=require("child_process"),t=require("fs"),r=require("util"),s=require("chalk"),c=require("make-dir"),i=require("ora"),o=require("recursive-copy"),{COMPONENT:a,PACKAGE:n,PAGE:p}=require("./template"),{TEMPLATE_TEXT:l,FormatBool:g}=require("../i18n"),{DEPENDENCE:m,IS_TS:d,AbsPath:u,ShowMsg:f,TitleCase:y}=require("../util");async function $(o="",n=!1){const p=o.split("/").pop(),$=d?"ts":"js",{importPT:x,importR:S,interfaces:w,props:h,render:F,statics:P}=a;await c(u(o));const q=u("../template/component/style.txt",1),E=u(`${o}/index.scss`),T=t.readFileSync(q,"utf8").replace(/demo/g,p);t.writeFileSync(E,T,"utf8");const j=u("../template/component/script.txt",1),D=u(`${o}/index.${$}x`),N=t.readFileSync(j,"utf8");if(n&&!m["prop-types"]){const t=i(l.installing),s=r.promisify(e.exec);t.start(),await s(`npm i prop-types${d?" && npm i -D @types/prop-types":""}`),t.stop(),f("green",l.installed)}const A=S[$]+(n?x[$]:""),C=n?P[$]:"",k=n?w[$]:"",B=F[$],O=n?h[$]:"",b=N.replace(/demo/g,p).replace(/Demo/g,y(p)).replace(/#import#/g,A).replace(/#static#/g,C).replace(/#interface#/,k).replace(/#render#/g,B).replace(/#props#/g,O);t.writeFileSync(D,b,"utf8"),console.log(l.compName+s.yellowBright(y(p))),console.log(l.compPath+s.yellowBright(o)),console.log(l.compProp+s.yellowBright(g(n))),f("green",l.newSucceed)}async function x(e="demo",r={},s={},c=!1){const i=Object.assign(n,{name:e,dependencies:r,devDependencies:s,useTs:c}),a=u(`${e}/package.json`),p=JSON.stringify(i,null,"\t"),l=u("../template/tsconfig.json",1),g=u(`${e}/tsconfig.json`);t.writeFileSync(a,p,"utf8"),c&&await o(l,g)}async function S(e="demo",r=!1,s=!1){let i=["index","home","about","contact"];const a=s?"ts":"js",{imports:n,logo:g,note:m,render:d}=p;r?i.shift():i=[i.shift()],await o(u("../template/assets",1),u(`${e}/src/assets`));const $=u("../template/page/template.txt",1),x=t.readFileSync($,"utf8"),S=u("../template/page/style.txt",1),w=t.readFileSync(S,"utf8"),h=u("../template/page/script.txt",1),F=t.readFileSync(h,"utf8");for(let s of i){r&&await c(u(`${e}/src/pages/${s}`));const i=u(`${e}/src${r?`/pages/${s}`:""}/index.html`),o=x.replace(/Demo/g,y(s));t.writeFileSync(i,o,"utf8");const p=u(`${e}/src${r?`/pages/${s}`:""}/index.scss`),l=w.replace(/demo/g,s);t.writeFileSync(p,l,"utf8");const f=u(`${e}/src${r?`/pages/${s}`:""}/index.${a}x`);let $=F.replace(/Demo/g,y(s)).replace(/demo-page/g,s+"-page").replace(/demo.jsx/g,`${r?`pages/${s}/`:""}index.${a}x`).replace(/#import#/g,n[a]).replace(/#logo#/g,g[a]).replace(/#render#/g,d[a]).replace(/#note#/g,m[a]);r&&($=$.replace(/.\/assets/g,"@/assets")),t.writeFileSync(f,$,"utf8")}f("green",l.initSucceed)}module.exports={WriteComponent:$,WritePackage:x,WritePage:S};