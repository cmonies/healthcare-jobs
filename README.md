# Health Design Jobs
Healthcare UX job board — curated by the community, open source forever.

🌐 **[Health Design Jobs](https://health.designjobs.cv/jobs)**

## What is this?

A free, open-source job board for **UX designers working in healthcare**. No recruiter spam, no paid listings — just real jobs from companies building products that matter.

Healthcare UX is a growing field with unique challenges: regulatory constraints, accessibility requirements, life-or-death stakes. Designers in this space deserve a dedicated place to find work.

## Features

- 🏥 **Healthcare-focused** — only UX/design roles at health & health-tech companies
- 🌍 **Community-sourced** — anyone can submit a job via the submit form
- 🔓 **Open source** — built in the open, maintained by the community
- 🛡️ **Spam-protected** — Cloudflare Turnstile, server-side rate limiting, honeypot fields, manual review queue
- ⚡ **Fast** — static site with server endpoints, loads instantly
- ♿ **Accessible** — semantic HTML, proper contrast, keyboard navigable
- 🌙 **Dark mode** — automatic based on system preference, with manual toggle

## Community

Join the conversation — share jobs, ask questions, connect with other healthcare designers:

💬 **[Join our Slack](https://join.slack.com/t/designjobs-healthcare/shared_invite/zt-3qc39yhhw-ssTCfSUEXoLHvVVXTYwS_Q)**

## Tech Stack

- [Astro](https://astro.build) 5 — static site framework with server endpoints
- [Tailwind CSS](https://tailwindcss.com) — utility-first styling
- [Vercel](https://vercel.com) — hosting
- [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) — bot protection
- Jobs stored as JSON (`src/data/jobs.json`)

## Getting Started

```bash
# Clone the repo
git clone https://github.com/cmonies/healthcare-jobs.git
cd healthcare-jobs

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) to see the site.

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Header.astro
│   ├── Footer.astro
│   ├── JobCard.astro
│   ├── JobTable.astro
│   ├── Newsletter.astro
│   └── DarkModeToggle.astro
├── data/
│   └── jobs.json     # Job listings data
├── layouts/
│   └── Layout.astro  # Base layout with animations
├── pages/
│   ├── index.astro   # Homepage
│   ├── jobs.astro    # All jobs with search + filters
│   ├── submit.astro  # Job submission form
│   ├── report.astro  # Feedback form
│   └── api/
│       └── submit.ts # Server-side submission endpoint
└── env.d.ts          # TypeScript env bindings
```

## Contributing

We'd love your help! See [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to:

- 🎯 Submit a job listing
- 🐛 Report bugs
- 💡 Suggest features
- 🛠️ Submit code changes

## Adding a Job

The easiest way: use the **Submit a Job** button on the website. Submissions are reviewed before publishing.

You can also submit a PR directly — add your job to `src/data/jobs.json` following the schema:

```json
{
  "id": "unique-id",
  "title": "Senior UX Designer",
  "company": "Company Name",
  "companyUrl": "https://company.com",
  "level": "Senior",
  "locationType": "Remote",
  "location": "USA",
  "url": "https://company.com/careers/job-link",
  "postedDate": "2026-02-14",
  "tags": ["health insurance", "consumer", "B2C"]
}
```

**Levels:** Junior, Mid, Senior, Staff, Lead, Principal, Director
**Location types:** Remote, Hybrid, Onsite

## Environment Variables

For the submission API to work, set these in your hosting provider:

| Variable | Description |
|----------|-------------|
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key |
| `GITHUB_TOKEN` | GitHub fine-grained token (Issues read/write) |
| `GITHUB_REPO` | Repository for issue creation (e.g. `cmonies/healthcare-jobs`) |

## License

[AGPL-3.0](LICENSE) — you can use, modify, and contribute freely. If you deploy a modified version, you must open source your changes too.

---

Made with care by [carmen.cv](https://carmen.cv) for the healthcare design community 💙
