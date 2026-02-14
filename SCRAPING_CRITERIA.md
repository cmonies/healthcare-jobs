# Job Scraping & Validation Criteria

## Frequency
3x per week (Mon/Wed/Fri)

## Sourcing
Prefer **direct ATS links** (company career pages, Greenhouse, Lever, Ashby, Workday) over aggregators (BuiltIn, LinkedIn, Indeed). Aggregator links go stale faster.

### Preferred URL patterns (most reliable)
- `boards.greenhouse.io/{company}/jobs/{id}`
- `jobs.lever.co/{company}/{uuid}`
- `jobs.ashbyhq.com/{company}/jobs/{id}`
- `{company}.wd5.myworkdayjobs.com/...`
- `careers.{company}.com/jobs/...`

### Avoid
- BuiltIn (builtinnyc.com, builtin.com) — listings removed without redirect
- LinkedIn job posts — require login, hard to validate
- Indeed — redirects frequently break

## Validation (REQUIRED before adding)

### Step 1: HTTP check
- Fetch the URL. Must return 200.
- 404, 410, or connection failure = dead, skip it.

### Step 2: Page content check
Fetch the page body and search (case-insensitive) for these dead-link signals:

```
this job was removed
this job has been closed
this position has been filled
no longer accepting applications
this job is no longer available
this listing has expired
job not found
page not found
position is no longer open
this role has been filled
job has expired
no longer active
posting has been removed
this opportunity is closed
application deadline has passed
we are no longer hiring
sorry, this job was removed
```

If ANY of these appear → skip the job.

### Step 3: Freshness check
- Job posting should be less than 30 days old if a date is visible
- If no date visible, verify the role still appears on the company's careers page

## Data Schema
Each job in `jobs.json`:
```json
{
  "title": "Senior Product Designer",
  "company": "Company Name",
  "companyUrl": "https://company.com",
  "url": "https://direct-ats-link.com/job/123",
  "level": "Senior",
  "locationType": "Remote",
  "location": "USA",
  "tags": ["telehealth", "B2B"],
  "postedAt": "2026-02-14"
}
```

## Post-Scrape Validation
After adding new jobs, run the validation script:
```bash
~/.openclaw/workspace/scripts/validate-healthcare-jobs.sh
```

## Weekly Maintenance
Run validation on ALL existing jobs weekly to catch listings that went dead since last check. Remove any that fail.
