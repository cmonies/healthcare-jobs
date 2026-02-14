import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_C52bRd_1.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DkrWk70n.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/Lisa/designwithcare/","cacheDir":"file:///Users/Lisa/designwithcare/node_modules/.astro/","outDir":"file:///Users/Lisa/designwithcare/dist/","srcDir":"file:///Users/Lisa/designwithcare/src/","publicDir":"file:///Users/Lisa/designwithcare/public/","buildClientDir":"file:///Users/Lisa/designwithcare/dist/client/","buildServerDir":"file:///Users/Lisa/designwithcare/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"jobs/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/jobs","isIndex":false,"type":"page","pattern":"^\\/jobs\\/?$","segments":[[{"content":"jobs","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/jobs.astro","pathname":"/jobs","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"submit/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/submit","isIndex":false,"type":"page","pattern":"^\\/submit\\/?$","segments":[[{"content":"submit","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/submit.astro","pathname":"/submit","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/submit","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/submit\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"submit","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/submit.ts","pathname":"/api/submit","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://designwith.care","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/Lisa/designwithcare/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/Lisa/designwithcare/src/pages/jobs.astro",{"propagation":"none","containsHead":true}],["/Users/Lisa/designwithcare/src/pages/submit.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/submit@_@ts":"pages/api/submit.astro.mjs","\u0000@astro-page:src/pages/jobs@_@astro":"pages/jobs.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@ts":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/submit@_@astro":"pages/submit.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_Bd6NCCHk.mjs","/Users/Lisa/designwithcare/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DSLGxd1F.mjs","/Users/Lisa/designwithcare/src/pages/jobs.astro?astro&type=script&index=0&lang.ts":"_astro/jobs.astro_astro_type_script_index_0_lang.BSsPBt81.js","/Users/Lisa/designwithcare/src/pages/submit.astro?astro&type=script&index=0&lang.ts":"_astro/submit.astro_astro_type_script_index_0_lang.8D4xSfcu.js","/Users/Lisa/designwithcare/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.CX1NBk_4.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/Lisa/designwithcare/src/pages/jobs.astro?astro&type=script&index=0&lang.ts","const c=document.querySelectorAll(\".filter-btn\"),f=document.querySelectorAll(\".job-item\"),r=document.getElementById(\"no-results\"),d=document.getElementById(\"search-input\"),u=document.getElementById(\"location-select\"),v=document.getElementById(\"visible-count\");let l=\"all\",n=\"\",a=\"\";function o(){let e=0;f.forEach(s=>{const i=s;let t=!0;l!==\"all\"&&(l.startsWith(\"level:\")?t=i.dataset.level===l.split(\":\")[1]:l.startsWith(\"location:\")&&(t=i.dataset.locationType===l.split(\":\")[1])),t&&a&&(t=i.dataset.location===a),t&&n&&(t=(i.dataset.search||\"\").includes(n)),i.style.display=t?\"\":\"none\",t&&e++}),r&&r.classList.toggle(\"hidden\",e>0),v&&(v.textContent=String(e))}c.forEach(e=>{e.addEventListener(\"click\",()=>{c.forEach(s=>s.classList.remove(\"active\")),e.classList.add(\"active\"),l=e.getAttribute(\"data-filter\")||\"all\",o()})});d?.addEventListener(\"input\",()=>{n=d.value.toLowerCase().trim(),o()});u?.addEventListener(\"change\",()=>{a=u.value,o()});"],["/Users/Lisa/designwithcare/src/pages/submit.astro?astro&type=script&index=0&lang.ts","const o=document.getElementById(\"job-form\"),c=document.getElementById(\"success-msg\"),m=document.getElementById(\"rate-limit-msg\"),e=document.getElementById(\"submit-btn\"),s=document.getElementById(\"error-msg\");o?.addEventListener(\"submit\",async a=>{a.preventDefault(),e.disabled=!0,e.textContent=\"Submitting...\",e.classList.add(\"opacity-75\");const t=new FormData(o),r=document.getElementById(\"turnstile-token\")?.value||document.querySelector('[name=\"cf-turnstile-response\"]')?.value||\"\",l={submitterName:t.get(\"submitterName\"),submitterEmail:t.get(\"submitterEmail\"),title:t.get(\"title\"),company:t.get(\"company\"),companyUrl:t.get(\"companyUrl\"),url:t.get(\"url\"),level:t.get(\"level\"),locationType:t.get(\"locationType\"),location:t.get(\"location\"),tags:t.get(\"tags\")||\"\",website_url:t.get(\"website_url\")||\"\",turnstileToken:r};try{const n=await fetch(\"/api/submit\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify(l)}),i=await n.json();i.ok?(o.style.display=\"none\",c?.classList.remove(\"hidden\")):n.status===429?(m?.classList.remove(\"hidden\"),e.disabled=!0,e.textContent=\"Limit reached\",e.classList.add(\"opacity-50\",\"cursor-not-allowed\")):(s&&(s.textContent=i.error||\"Something went wrong. Please try again.\",s.classList.remove(\"hidden\")),e.disabled=!1,e.textContent=\"Submit for review\",e.classList.remove(\"opacity-75\"),window.turnstile&&window.turnstile.reset())}catch{s&&(s.textContent=\"Network error. Please check your connection and try again.\",s.classList.remove(\"hidden\")),e.disabled=!1,e.textContent=\"Submit for review\",e.classList.remove(\"opacity-75\")}});"],["/Users/Lisa/designwithcare/src/components/Header.astro?astro&type=script&index=0&lang.ts","const d=document.getElementById(\"mobile-menu-btn\"),e=document.getElementById(\"mobile-menu\"),n=document.getElementById(\"menu-open-icon\"),t=document.getElementById(\"menu-close-icon\"),s=document.getElementById(\"mobile-newsletter-link\");d?.addEventListener(\"click\",()=>{e?.classList.toggle(\"hidden\"),n?.classList.toggle(\"hidden\"),t?.classList.toggle(\"hidden\")});s?.addEventListener(\"click\",()=>{e?.classList.add(\"hidden\"),n?.classList.remove(\"hidden\"),t?.classList.add(\"hidden\")});"]],"assets":["/_astro/index.CSWQdqE0.css","/favicon.ico","/favicon.svg","/jobs/index.html","/rss.xml","/submit/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"wzBuByDtKPNhvhz4gzzW68ipTRDD+dfn+N8SK5nAKIQ="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
