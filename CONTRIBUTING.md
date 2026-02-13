# Contributing to designwith.care

First off — thank you! This project exists because of people like you. Whether you're submitting a job, fixing a bug, or suggesting a feature, every contribution matters.

## Code of Conduct

Be kind, be respectful, be constructive. We're building something for a community that cares about people's health — let's treat each other with the same care.

## How to Contribute

### 🎯 Submit a Job Listing

**Easiest way:** Use the **Contribute** button on [designwith.care](https://designwith.care). It'll create a GitHub issue with the job details for a maintainer to review.

**Via Pull Request:**

1. Fork this repo
2. Add your job to `src/data/jobs.json`
3. Follow the schema below
4. Submit a PR with a clear title (e.g., "Add: Senior UX Designer at Oscar Health")

**Job schema:**

```json
{
  "id": "unique-id",
  "title": "Job Title",
  "company": "Company Name",
  "companyUrl": "https://company.com",
  "level": "Junior | Mid | Senior | Lead | Principal | Director",
  "locationType": "Remote | Hybrid | Onsite",
  "location": "City, State or Country",
  "url": "https://direct-link-to-job-posting.com",
  "postedDate": "YYYY-MM-DD",
  "tags": ["relevant", "tags", "here"]
}
```

**Job listing guidelines:**
- Must be a **UX/design role** (UX design, product design, UX research, content design, design ops, etc.)
- Must be at a **healthcare or health-tech company**
- Must link to an **active job posting** (no expired listings)
- No recruiter/staffing agency posts — direct company listings only

### 🐛 Report a Bug

[Open an issue](https://github.com/cmonies/healthcare-jobs/issues/new) with:
- What you expected to happen
- What actually happened
- Browser/device info if relevant
- Screenshot if helpful

### 💡 Suggest a Feature

[Open an issue](https://github.com/cmonies/healthcare-jobs/issues/new) with the `enhancement` label. Describe the problem you're trying to solve and your proposed solution.

### 🛠️ Submit Code Changes

1. Fork the repo
2. Create a branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Test locally (`npm run dev`)
5. Commit with a clear message
6. Push and open a PR

**Development setup:**

```bash
git clone https://github.com/YOUR-USERNAME/healthcare-jobs.git
cd healthcare-jobs
npm install
npm run dev
```

## What Makes a Good Contribution

- **Jobs:** Verified, active listings at real healthcare companies
- **Code:** Clean, accessible, follows existing patterns
- **Issues:** Clear, specific, reproducible

## Review Process

All contributions are reviewed by a maintainer before merging. We aim to review PRs within a few days. Job submissions are typically reviewed faster.

## Questions?

Open an issue or reach out — we're happy to help.

---

Thanks for helping build a better job board for healthcare designers 💙
