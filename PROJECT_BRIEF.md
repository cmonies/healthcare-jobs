# designwith.care

Healthcare UX job board & community. Open-source, community-driven.

## Stack
- **Framework:** Astro 5 + Tailwind CSS v4
- **Newsletter:** Buttondown (integration later)
- **Data:** Jobs stored as JSON in `src/data/jobs.json`
- **Hosting:** Static site (Vercel/Netlify later)

## Design
- **Visual style:** Airbnb-inspired — clean, lots of whitespace, warm and approachable
- **Accent colors:** Cremes/warm whites for backgrounds, Sapphire Blue `#0F52BA` as primary accent
- **Typography:** Clean sans-serif (Inter or similar via Google Fonts)
- **Cards:** Rounded corners, subtle shadows, clean hierarchy

## Pages

### 1. Homepage (`/`)
- **Header/Nav:** Logo ("designwith.care"), nav links (Jobs, About, Newsletter), clean top bar
- **Hero:** Value proposition — "Healthcare UX jobs, curated by the community" or similar. Brief description. CTA to browse jobs.
- **Value Props Section:** 3-4 cards explaining what this is (curated jobs, open source, community-driven)
- **Featured Jobs:** Show first 10 jobs from the data file, with a "View all jobs →" link
- **Newsletter CTA:** Buttondown signup form at bottom (email input + subscribe button)
- **Footer:** Links, GitHub repo link, Discord link

### 2. Jobs List (`/jobs`)
- **Full list** of all jobs from the JSON data
- **Filter/sort** by: company, location type (remote/hybrid/onsite), level (junior/mid/senior/lead)
- **Each job card shows:** Company name, job title, level, location type, posted date
- **Clicking a job** deep links to the external job listing URL (opens in new tab)

### 3. No individual job detail pages — cards link directly to external listings

## Job Data Schema (`src/data/jobs.json`)
```json
[
  {
    "id": "1",
    "title": "Senior UX Designer",
    "company": "Oscar Health",
    "companyUrl": "https://www.hioscar.com",
    "level": "Senior",
    "locationType": "Remote",
    "location": "USA",
    "url": "https://www.hioscar.com/careers/...",
    "postedDate": "2026-02-10",
    "tags": ["health insurance", "consumer", "B2C"]
  }
]
```

Include 15-20 sample jobs from real healthcare/health-tech companies (Oscar Health, Teladoc, Ro, Hims & Hers, Cityblock Health, Noom, Headspace, Cerebral, One Medical, Included Health, Quartet Health, Alma, Spring Health, Zocdoc, Thirty Madison).

## Key Details
- All external links open in new tab
- Mobile responsive
- Accessible (proper semantic HTML, contrast ratios, etc.)
- Fast — it's a static site, should be instant
