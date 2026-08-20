import { getPayload } from './client';
import { PROJECTS, Project } from '@/data/projects';
import { TESTIMONIALS, Testimonial } from '@/data/testimonials';
import { BLOG_POSTS, BlogPost } from '@/data/blog';
import { Lead } from '@/domain/estimator/types';

// ─────────────────────────────────────────────────────────────
// 1. Projects Data Layer (CMS -> Fallback to Static Mock)
// ─────────────────────────────────────────────────────────────
export async function getCmsProjects(): Promise<Project[]> {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: 'projects',
      sort: 'order',
      limit: 100,
    });

    if (result.docs && result.docs.length > 0) {
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
            en: Array.isArray(d.metrics)
              ? (d.metrics as Array<{ label: string; value: string }>).map((m) => `${m.value} ${m.label}`)
              : [],
            id: Array.isArray(d.metrics)
              ? (d.metrics as Array<{ label: string; value: string }>).map((m) => `${m.value} ${m.label}`)
              : [],
          },
          stack: Array.isArray(d.tags) ? (d.tags as Array<{ tag: string }>).map((t) => t.tag) : [],
          image:
            (d.imageUrl as string) ||
            (typeof d.featuredImage === 'object' && d.featuredImage !== null && 'url' in d.featuredImage
              ? (d.featuredImage as { url: string }).url
              : '/projects/fintech.jpg'),
          liveUrl: (d.liveUrl as string) || undefined,
          githubUrl: (d.githubUrl as string) || undefined,
        };
      });
    }
  } catch (error) {
    console.warn('[Payload CMS] Projects fallback to static:', error);
  }

  return PROJECTS;
}

export async function getCmsProjectBySlug(slug: string): Promise<Project | undefined> {
  try {
    const projects = await getCmsProjects();
    return projects.find((p) => p.slug === slug);
  } catch {
    return PROJECTS.find((p) => p.slug === slug);
  }
}

// ─────────────────────────────────────────────────────────────
// 2. Testimonials Data Layer (CMS -> Fallback to Static Mock)
// ─────────────────────────────────────────────────────────────
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
          avatar:
            (d.avatarUrl as string) ||
            (typeof d.avatar === 'object' && d.avatar !== null && 'url' in d.avatar
              ? (d.avatar as { url: string }).url
              : '/avatars/default.jpg'),
          quote: {
            en: (d.quote as string) || '',
            id: (d.quote as string) || '',
          },
          rating: typeof d.rating === 'number' ? d.rating : 5,
        };
      });
    }
  } catch (error) {
    console.warn('[Payload CMS] Testimonials fallback to static:', error);
  }

  return TESTIMONIALS;
}

// ─────────────────────────────────────────────────────────────
// 3. Blog Posts Data Layer (CMS -> Fallback to Static Mock)
// ─────────────────────────────────────────────────────────────
export async function getCmsPosts(): Promise<BlogPost[]> {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: 'posts',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedAt',
      limit: 50,
    });

    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc) => {
        const d = doc as Record<string, unknown>;
        return {
          slug: (d.slug as string) || 'post',
          category: (d.category as 'Engineering' | 'AI' | 'Design') || 'Engineering',
          publishedAt: (d.publishedAt as string) || new Date().toISOString().split('T')[0],
          readTime: (d.readTime as string) || '5',
          title: {
            en: (d.title as string) || '',
            id: (d.title as string) || '',
          },
          excerpt: {
            en: (d.excerpt as string) || '',
            id: (d.excerpt as string) || '',
          },
          content: {
            en: typeof d.content === 'string' ? d.content : (d.excerpt as string) || '',
            id: typeof d.content === 'string' ? d.content : (d.excerpt as string) || '',
          },
          author: {
            name: (d.author as string) || 'ALTIA DEV Engineering',
            role: 'Lead Architect',
            avatar: '/team/lead.jpg',
          },
          coverImage:
            typeof d.coverImage === 'object' && d.coverImage !== null && 'url' in d.coverImage
              ? (d.coverImage as { url: string }).url
              : '/blog/architecture.jpg',
        };
      });
    }
  } catch (error) {
    console.warn('[Payload CMS] Posts fallback to static:', error);
  }

  return BLOG_POSTS;
}

export async function getCmsPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const posts = await getCmsPosts();
    return posts.find((p) => p.slug === slug);
  } catch {
    return BLOG_POSTS.find((p) => p.slug === slug);
  }
}

// ─────────────────────────────────────────────────────────────
// 4. Lead Capture Layer (Syncs incoming leads to Payload CMS)
// ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────
// 5. Initial Seeder Helper (Auto-populates CMS if empty)
// ─────────────────────────────────────────────────────────────
export async function seedInitialPayloadDataIfEmpty() {
  try {
    const payload = await getPayload();
    
    // Check projects
    const existingProjects = await payload.find({ collection: 'projects', limit: 1 });
    if (existingProjects.totalDocs === 0) {
      console.log('[Payload CMS] Seeding initial projects into database...');
      for (const p of PROJECTS) {
        await payload.create({
          collection: 'projects',
          data: {
            title: p.title.en,
            slug: p.slug,
            category: p.category,
            featured: p.featured,
            client: p.client,
            year: p.year,
            tagline: p.tagline.en,
            description: p.summary.en,
            challenge: p.challenge.en,
            solution: p.solution.en,
            imageUrl: p.image,
            liveUrl: p.liveUrl,
            githubUrl: p.githubUrl,
            tags: p.stack.map((s) => ({ tag: s })),
            metrics: p.impact.en.map((m) => {
              const parts = m.split(' ');
              return { value: parts[0] || '', label: parts.slice(1).join(' ') || '' };
            }),
          },
        });
      }
      console.log('[Payload CMS] Initial projects seeded successfully.');
    }

    // Check testimonials
    const existingTestimonials = await payload.find({ collection: 'testimonials', limit: 1 });
    if (existingTestimonials.totalDocs === 0) {
      console.log('[Payload CMS] Seeding initial testimonials into database...');
      for (const t of TESTIMONIALS) {
        await payload.create({
          collection: 'testimonials',
          data: {
            clientName: t.name,
            role: t.role,
            company: t.company,
            quote: t.quote.en,
            rating: t.rating,
            avatarUrl: t.avatar,
          },
        });
      }
      console.log('[Payload CMS] Initial testimonials seeded successfully.');
    }
  } catch (error) {
    console.warn('[Payload CMS] Seeder warning (can be safely ignored in production):', error);
  }
}
