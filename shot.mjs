import { chromium } from 'playwright';
const OUT = '/private/tmp/claude-502/-Users-Lisa/f28c7073-65e6-4c8b-a2cc-04c8ed4cd5dd/scratchpad';
const base = 'http://localhost:4321';
const b = await chromium.launch();

async function shot(name, path, { w=1600, h=1000, dark=false, full=false, before } = {}) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  if (dark) {
    await p.addInitScript(() => { localStorage.setItem('theme','dark'); });
  }
  await p.goto(base + path, { waitUntil: 'networkidle' });
  if (dark) {
    await p.evaluate(() => document.documentElement.classList.add('dark'));
  }
  await p.waitForTimeout(900);
  if (before) await before(p);
  await p.screenshot({ path: `${OUT}/${name}.png`, fullPage: full });
  await ctx.close();
  console.log('shot', name);
}

await shot('critA_home_desktop', '/', { w:1600, h:1000 });
await shot('critA_home_desktop_full', '/', { w:1600, h:1000, full:true });
await shot('critA_home_mobile', '/', { w:390, h:844 });
await shot('critA_jobs_desktop', '/jobs', { w:1600, h:1000 });
await shot('critA_jobs_desktop_full', '/jobs', { w:1600, h:1000, full:true });
await shot('critA_jobs_mobile', '/jobs', { w:390, h:844 });
await shot('critA_submit_desktop', '/submit', { w:1600, h:1400 });
await shot('critA_home_dark', '/', { w:1600, h:1000, dark:true });
await shot('critA_jobs_dark', '/jobs', { w:1600, h:1000, dark:true });

// jobs with filters open + a zero-result state
await shot('critA_jobs_filteropen', '/jobs', { w:1600, h:1000, before: async (p)=>{
  await p.click('#filter-btn'); await p.waitForTimeout(300);
}});
await shot('critA_jobs_zero', '/jobs', { w:1600, h:1000, before: async (p)=>{
  await p.fill('#search-input', 'zzzznotarealjobxyz'); await p.waitForTimeout(400);
}});

await b.close();
console.log('done');
