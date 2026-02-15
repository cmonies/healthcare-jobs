import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import jobs from '../data/jobs.json';

export function GET(context: APIContext) {
  return rss({
    title: 'designjobs — Healthcare UX Jobs',
    description: 'Healthcare UX jobs, curated by the community.',
    site: context.site || 'https://health.designjobs.cv',
    items: jobs.map(job => ({
      title: `${job.title} at ${job.company}`,
      link: job.url,
      ...(job.postedDate ? { pubDate: new Date(job.postedDate) } : {}),
      description: `${job.level} · ${job.locationType}${job.location !== 'USA' ? ` · ${job.location}` : ''} — ${job.tags.join(', ')}`,
    })),
  });
}
