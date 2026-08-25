import fs from 'node:fs';

const filePath = './src/data/projects.ts';
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Add tags: string[]; to Project interface
content = content.replace(
  '  stack: string[];',
  '  tags: string[];\n  stack: string[];'
);

const projectTags = {
  'vads-knowledge-management-system': ['vads', 'ai-kms', 'enterprise'],
  'javanegra-coffee': ['javanegra', 'ecommerce', 'brand'],
  'javanegra-gourmet': ['javanegra', 'hospitality', 'f&b'],
  'saptawell-corporate-website': ['saptawell', 'corporate', 'healthcare'],
  'atlas-knowledge-analyst': ['atlas', 'financial-ai', 'rag'],
  'brew-mobile-commerce': ['brew', 'mobile-app', 'ecommerce'],
  'meridian-proposal-intelligence': ['meridian', 'agentic-ai', 'automation'],
  'lumen-research-ai-workspace': ['lumen', 'academic-tech', 'ai-workspace'],
  'event-experience-platform': ['eventflow', 'realtime', 'event-tech'],
  'padel-tournament-platform': ['padelpro', 'sports-saas', 'community'],
  'total-cakra-alam': ['total-cakra-alam', 'industrial', 'commodities'],
  'javanegra-cloud-identity': ['javanegra', 'cloud-infra', 'security'],
  'tca-email-infrastructure': ['total-cakra-alam', 'tca-infra', 'cloud-systems']
};

for (const [slug, tags] of Object.entries(projectTags)) {
  const targetPattern = `slug: "${slug}",`;
  const replacement = `slug: "${slug}",\n    tags: ${JSON.stringify(tags)},`;
  content = content.replace(targetPattern, replacement);
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully updated projects.ts with tags!');
