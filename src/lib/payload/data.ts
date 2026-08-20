import { getPayload } from './client';
import { PROJECTS, Project } from '@/data/projects';
import { TESTIMONIALS, Testimonial } from '@/data/testimonials';
import { Lead } from '@/domain/estimator/types';

export async function getCmsProjects(): Promise<Project[]> {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: 'projects',
      sort: 'order',
      limit: 100,
    });

    if (result.docs && result.docs.length > 0) {
      // Map Payload docs into Project structure
      return result.docs.map((doc) => {
        const d = doc as Record<string, unknown>;
        return {
          slug: (d.slug as string) || 'project',
          category: (d.category as 'web' | 'app' | 'ai') || 'web',
          featured: Boolean(d.featured),
          year: (d.year as string) || '2026',
          title: {
            en: (d.title as string) || '',
            id: (d.title as string) || '',
          },
          client: (d.client as string) || '',
          tagline: {
            en: (d.tagline as string) || (d.description as string) || '',
            id: (d.tagline as string) || (d.description as string) || '',
          },
          summary: {
            en: (d.description as string) || '',
            id: (d.description as string) || '',
          },
          challenge: {
            en: (d.challenge as string) || '',
            id: (d.challenge as string) || '',
          },
          solution: {
            en: (d.solution as string) || '',
            id: (d.solution as string) || '',
          },
          impact: {
            en: Array.isArray(d.metrics) ? (d.metrics as Array<{ label: string; value: string }>).map((m) => `${m.value} ${m.label}`) : [],
            id: Array.isArray(d.metrics) ? (d.metrics as Array<{ label: string; value: string }>).map((m) => `${m.value} ${m.label}`) : [],
          },
          stack: Array.isArray(d.tags) ? (d.tags as Array<{ tag: string }>).map((t) => t.tag) : [],
          image: (d.imageUrl as string) || (typeof d.featuredImage === 'object' && d.featuredImage !== null && 'url' in d.featuredImage ? (d.featuredImage as { url: string }).url : '/projects/fintech.jpg'),
          liveUrl: (d.liveUrl as string) || undefined,
          githubUrl: (d.githubUrl as string) || undefined,
        };
      });
    }
  } catch (error) {
    console.warn('[Payload CMS] Fallback to static projects data:', error);
  }

  return PROJECTS;
}

export async function getCmsTestimonials(): Promise<Testimonial[]> {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: 'testimonials',
      sort: 'order',
      limit: 50,
    });

    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc) => {
        const d = doc as Record<string, unknown>;
        return {
          id: String(d.id),
          name: (d.clientName as string) || '',
          role: (d.role as string) || '',
          company: (d.company as string) || '',
          avatar: (d.avatarUrl as string) || (typeof d.avatar === 'object' && d.avatar !== null && 'url' in d.avatar ? (d.avatar as { url: string }).url : '/avatars/default.jpg'),
          quote: {
            en: (d.quote as string) || '',
            id: (d.quote as string) || '',
          },
          rating: typeof d.rating === 'number' ? d.rating : 5,
        };
      });
    }
  } catch (error) {
    console.warn('[Payload CMS] Fallback to static testimonials data:', error);
  }

  return TESTIMONIALS;
}

export async function syncLeadToPayload(lead: Lead) {
  try {
    const payload = await getPayload();
    const doc = await payload.create({
      collection: 'leads',
      data: {
        leadTitle: `${lead.contact.name} (${lead.contact.company || 'Direct Client'})`,
        status: 'new',
        contact: {
          name: lead.contact.name,
          email: lead.contact.email,
          phone: lead.contact.phone || '',
          company: lead.contact.company || '',
        },
        projectSummary: {
          service: lead.project.requirements.service,
          projectType: lead.project.requirements.projectType,
          investmentMin: lead.project.estimate.pricing.min,
          investmentMax: lead.project.estimate.pricing.max,
          timelineMinWeeks: lead.project.estimate.timeline.minWeeks,
          timelineMaxWeeks: lead.project.estimate.timeline.maxWeeks,
          complexity: lead.project.estimate.complexity.level,
        },
        qualification: {
          score: lead.qualification.score,
          temperature: lead.qualification.temperature,
          factors: lead.qualification.factors.map((f) => ({ factor: f })),
        },
        rawPayload: lead as unknown as Record<string, unknown>,
        adminNotes: `Captured via Estimator wizard on ${new Date().toLocaleDateString('id-ID')}`,
      },
    });

    return doc;
  } catch (error) {
    console.error('[Payload CMS] Error syncing lead to Leads collection:', error);
    return null;
  }
}
