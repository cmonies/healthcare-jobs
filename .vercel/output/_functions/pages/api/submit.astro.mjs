export { renderers } from '../../renderers.mjs';

const prerender = false;
const MAX_SUBMISSIONS_PER_DAY = 5;
const DAY_IN_SECONDS = 86400;
async function verifyTurnstile(token, secret, ip) {
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret,
      response: token,
      remoteip: ip
    })
  });
  const data = await res.json();
  return data.success;
}
async function checkRateLimit(kv, email) {
  const key = `ratelimit:${email.toLowerCase().trim()}`;
  const existing = await kv.get(key);
  const count = existing ? parseInt(existing, 10) : 0;
  return { allowed: count < MAX_SUBMISSIONS_PER_DAY, count };
}
async function incrementRateLimit(kv, email) {
  const key = `ratelimit:${email.toLowerCase().trim()}`;
  const existing = await kv.get(key);
  const count = existing ? parseInt(existing, 10) : 0;
  await kv.put(key, String(count + 1), { expirationTtl: DAY_IN_SECONDS });
}
async function createGitHubIssue(token, repo, title, body) {
  const res = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "designwith.care"
    },
    body: JSON.stringify({
      title,
      body,
      labels: ["job-submission"]
    })
  });
  if (!res.ok) {
    const err = await res.text();
    return { ok: false, error: err };
  }
  const data = await res.json();
  return { ok: true, url: data.html_url };
}
const POST = async ({ request, clientAddress, locals }) => {
  const runtime = locals.runtime?.env || {};
  const KV = runtime.SUBMISSIONS_KV;
  const TURNSTILE_SECRET = runtime.TURNSTILE_SECRET_KEY || undefined                                     || "";
  const GITHUB_TOKEN = runtime.GITHUB_TOKEN || undefined                             || "";
  const GITHUB_REPO = runtime.GITHUB_REPO || undefined                            || "cmonies/healthcare-jobs";
  try {
    const body = await request.json();
    if (body.website_url) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    const required = ["submitterName", "submitterEmail", "title", "company", "companyUrl", "url", "level", "locationType", "location"];
    for (const field of required) {
      if (!body[field]?.trim()) {
        return new Response(JSON.stringify({ ok: false, error: `Missing required field: ${field}` }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.submitterEmail)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid email address" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    for (const urlField of ["companyUrl", "url"]) {
      try {
        new URL(body[urlField]);
      } catch {
        return new Response(JSON.stringify({ ok: false, error: `Invalid URL: ${urlField}` }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
    }
    if (TURNSTILE_SECRET && body.turnstileToken) {
      const ip = clientAddress || request.headers.get("cf-connecting-ip") || "0.0.0.0";
      const valid = await verifyTurnstile(body.turnstileToken, TURNSTILE_SECRET, ip);
      if (!valid) {
        return new Response(JSON.stringify({ ok: false, error: "Bot verification failed. Please try again." }), {
          status: 403,
          headers: { "Content-Type": "application/json" }
        });
      }
    }
    if (KV) {
      const { allowed, count } = await checkRateLimit(KV, body.submitterEmail);
      if (!allowed) {
        return new Response(JSON.stringify({
          ok: false,
          error: `Rate limit exceeded. You've submitted ${count} jobs in the last 24 hours (max ${MAX_SUBMISSIONS_PER_DAY}).`
        }), {
          status: 429,
          headers: { "Content-Type": "application/json" }
        });
      }
    }
    if (GITHUB_TOKEN) {
      const issueTitle = `Add: ${body.title} at ${body.company}`;
      const issueBody = [
        `**Job Title:** ${body.title}`,
        `**Company:** ${body.company}`,
        `**Company URL:** ${body.companyUrl}`,
        `**Job URL:** ${body.url}`,
        `**Level:** ${body.level}`,
        `**Location Type:** ${body.locationType}`,
        `**Location:** ${body.location}`,
        `**Tags:** ${body.tags || "N/A"}`,
        "",
        "---",
        `**Submitted by:** ${body.submitterName} (${body.submitterEmail})`,
        `**IP:** ${clientAddress || "unknown"}`,
        "_Submitted via designwith.care_"
      ].join("\n");
      const result = await createGitHubIssue(GITHUB_TOKEN, GITHUB_REPO, issueTitle, issueBody);
      if (!result.ok) {
        console.error("GitHub issue creation failed:", result.error);
        return new Response(JSON.stringify({ ok: false, error: "Failed to create submission. Please try again." }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
      if (KV) {
        await incrementRateLimit(KV, body.submitterEmail);
      }
      return new Response(JSON.stringify({ ok: true, issueUrl: result.url }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ ok: true, fallback: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Submit error:", err);
    return new Response(JSON.stringify({ ok: false, error: "An unexpected error occurred." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
