import { PROJECTS, type Project } from '../data/projects';
import { BLOG_POSTS, type BlogPost } from '../data/blog';
import { TESTIMONIALS, type Testimonial } from '../data/testimonials';
import { TEAM_MEMBERS, type TeamMember } from '../data/team';

const B10CKS_API_URL = typeof process !== 'undefined' && process.env?.B10CKS_API_URL
  ? process.env.B10CKS_API_URL
  : (import.meta.env?.B10CKS_API_URL || 'https://serv.altiadev.com');

const B10CKS_SPACE_ID = typeof process !== 'undefined' && process.env?.B10CKS_SPACE_ID
  ? process.env.B10CKS_SPACE_ID
  : (import.meta.env?.B10CKS_SPACE_ID || '');

/**
 * Fetch all projects (with optional category or featured filtering)
 */
export async function getProjects(options?: {
  featured?: boolean;
  category?: 'web' | 'app' | 'ai';
}): Promise<Project[]> {
  try {
    if (B10CKS_SPACE_ID && B10CKS_API_URL) {
      const queryParams = new URLSearchParams();
      if (options?.featured) queryParams.append('filter[featured][eq]', 'true');
      if (options?.category) queryParams.append('filter[category][eq]', options.category);
      queryParams.append('sort', 'order');

      const res = await fetch(`${B10CKS_API_URL}/api/data/${B10CKS_SPACE_ID}/projects?${queryParams.toString()}`, {
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          return json.data as Project[];
        }
      }
    }
  } catch (err) {
    console.warn('[B10cks API] Fetch projects fallback to static dataset:', err);
  }

  // Static Fallback
  let results = [...PROJECTS];
  if (options?.featured) {
    results = results.filter((p) => p.featured);
  }
  if (options?.category) {
    results = results.filter((p) => p.category === options.category);
  }
  return results;
}

/**
 * Fetch a single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  try {
    if (B10CKS_SPACE_ID && B10CKS_API_URL) {
      const res = await fetch(`${B10CKS_API_URL}/api/data/${B10CKS_SPACE_ID}/projects/${slug}`, {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data as Project;
      }
    }
  } catch (err) {
    console.warn(`[B10cks API] Fetch project [${slug}] fallback to static:`, err);
  }

  return PROJECTS.find((p) => p.slug === slug);
}

/**
 * Fetch blog posts
 */
export async function getBlogPosts(category?: string): Promise<BlogPost[]> {
  try {
    if (B10CKS_SPACE_ID && B10CKS_API_URL) {
      const res = await fetch(`${B10CKS_API_URL}/api/data/${B10CKS_SPACE_ID}/posts?sort=-publishedAt`, {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          return json.data as BlogPost[];
        }
      }
    }
  } catch (err) {
    console.warn('[B10cks API] Fetch posts fallback to static:', err);
  }

  let posts = [...BLOG_POSTS];
  if (category) {
    posts = posts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }
  return posts;
}

/**
 * Fetch a blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    if (B10CKS_SPACE_ID && B10CKS_API_URL) {
      const res = await fetch(`${B10CKS_API_URL}/api/data/${B10CKS_SPACE_ID}/posts/${slug}`, {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data as BlogPost;
      }
    }
  } catch (err) {
    console.warn(`[B10cks API] Fetch post [${slug}] fallback to static:`, err);
  }

  return BLOG_POSTS.find((p) => p.slug === slug);
}

/**
 * Fetch testimonials
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    if (B10CKS_SPACE_ID && B10CKS_API_URL) {
      const res = await fetch(`${B10CKS_API_URL}/api/data/${B10CKS_SPACE_ID}/testimonials`, {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          return json.data as Testimonial[];
        }
      }
    }
  } catch (err) {
    console.warn('[B10cks API] Fetch testimonials fallback to static:', err);
  }

  return TESTIMONIALS;
}

/**
 * Fetch team members
 */
export async function getTeamMembers(): Promise<TeamMember[]> {
  return TEAM_MEMBERS;
}
