export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const checks: Record<string, string> = {};

  // Check env vars (just whether they exist, not their values)
  checks['GITHUB_TOKEN'] = import.meta.env.GITHUB_TOKEN ? '✅ Set' : '❌ Missing';
  checks['TURNSTILE_SECRET_KEY'] = import.meta.env.TURNSTILE_SECRET_KEY ? '✅ Set' : '❌ Missing';
  checks['LISTMONK_URL'] = import.meta.env.LISTMONK_URL ? '✅ Set' : '❌ Missing';
  checks['LISTMONK_USER'] = import.meta.env.LISTMONK_USER ? '✅ Set' : '❌ Missing';
  checks['LISTMONK_PASS'] = import.meta.env.LISTMONK_PASS ? '✅ Set' : '❌ Missing';

  // Test GitHub token if present
  if (import.meta.env.GITHUB_TOKEN) {
    try {
      const res = await fetch('https://api.github.com/repos/cmonies/healthcare-jobs', {
        headers: {
          'Authorization': `Bearer ${import.meta.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github+json',
          'User-Agent': 'health.designjobs.cv',
        },
      });
      if (res.ok) {
        // Check if we can create issues
        const permsRes = await fetch('https://api.github.com/repos/cmonies/healthcare-jobs/issues?per_page=1', {
          headers: {
            'Authorization': `Bearer ${import.meta.env.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github+json',
            'User-Agent': 'health.designjobs.cv',
          },
        });
        checks['GITHUB_ACCESS'] = permsRes.ok ? '✅ Can read issues' : `⚠️ Status ${permsRes.status}`;
      } else {
        checks['GITHUB_ACCESS'] = `❌ Status ${res.status}`;
      }
    } catch (e) {
      checks['GITHUB_ACCESS'] = `❌ ${String(e)}`;
    }
  }

  // Test Listmonk if present
  const listmonkUrl = import.meta.env.LISTMONK_URL || 'https://listmonk-production-7c2c.up.railway.app';
  try {
    const res = await fetch(`${listmonkUrl}/api/public/lists`);
    checks['LISTMONK_REACHABLE'] = res.ok ? '✅ Online' : `❌ Status ${res.status}`;
  } catch (e) {
    checks['LISTMONK_REACHABLE'] = `❌ ${String(e)}`;
  }

  return new Response(JSON.stringify(checks, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
