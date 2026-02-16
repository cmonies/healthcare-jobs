export const prerender = false;

import type { APIRoute } from 'astro';

const LISTMONK_URL = import.meta.env.LISTMONK_URL || 'https://listmonk-production-7c2c.up.railway.app';
const LISTMONK_USER = import.meta.env.LISTMONK_USER || 'admin';
const LISTMONK_PASS = import.meta.env.LISTMONK_PASS || '';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json() as { email?: string };
    const email = body.email?.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ ok: false, error: 'Please enter a valid email address.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // First, get the list UUID
    const listsRes = await fetch(`${LISTMONK_URL}/api/public/lists`);
    const lists = await listsRes.json() as Array<{ uuid: string; name: string }>;
    
    if (!lists.length) {
      return new Response(JSON.stringify({ ok: false, error: 'Newsletter not configured yet.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const listUuid = lists[0].uuid;

    // Try the public subscription API first
    const subRes = await fetch(`${LISTMONK_URL}/api/public/subscription`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        name: '',
        list_uuids: [listUuid],
      }),
    });

    if (subRes.ok) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Fallback: use admin API if public API fails
    if (LISTMONK_PASS) {
      const auth = btoa(`${LISTMONK_USER}:${LISTMONK_PASS}`);
      
      // Create subscriber via admin API
      const adminRes = await fetch(`${LISTMONK_URL}/api/subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`,
        },
        body: JSON.stringify({
          email,
          name: '',
          status: 'enabled',
          lists: [1], // Default list ID is 1
          preconfirm_subscriptions: false,
        }),
      });

      const adminData = await adminRes.json() as { data?: { id: number }; message?: string };
      
      if (adminRes.ok || adminRes.status === 409) {
        // 409 = already subscribed, still a success
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      console.error('Listmonk admin API error:', adminData.message);
    }

    return new Response(JSON.stringify({ ok: false, error: 'Could not subscribe. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Subscribe error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'An unexpected error occurred.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
