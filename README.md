# designwith.care

Healthcare UX job board & community. Curated by the community, open source forever.

🌐 **[designwith.care](https://designwith.care)** *(coming soon)*

## What is this?

A free, open-source job board specifically for **UX designers working in healthcare**. No recruiter spam, no paid listings — just real jobs from companies building products that matter.

Healthcare UX is a growing field with unique challenges: regulatory constraints, accessibility requirements, life-or-death stakes. Designers in this space deserve a dedicated place to find work.

## Features

- 🏥 **Healthcare-focused** — only UX/design roles at health & health-tech companies
- 🌍 **Community-curated** — anyone can submit a job via the contribute form
- 🔓 **Open source** — built in the open, maintained by the community
- ⚡ **Fast** — static site, no bloat, loads instantly
- ♿ **Accessible** — semantic HTML, proper contrast, keyboard navigable

## Tech Stack

- [Astro](https://astro.build) 5 — static site framework
- [Tailwind CSS](https://tailwindcss.com) — utility-first styling
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

## Contributing

We'd love your help! See [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to:

- 🎯 Submit a job listing
- 🐛 Report bugs
- 💡 Suggest features
- 🛠️ Submit code changes

## Adding a Job

The easiest way: use the **Contribute** button on the website to submit a job. It creates a GitHub issue that a maintainer will review and merge.

You can also submit a PR directly — add your job to `src/data/jobs.json` following the existing schema:

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
  "postedDate": "2026-02-13",
  "tags": ["health insurance", "consumer", "B2C"]
}
```

## License

[AGPL-3.0](LICENSE) — you can use, modify, and contribute freely. If you deploy a modified version, you must open source your changes too.

---

Made with care by the healthcare design community 💙
