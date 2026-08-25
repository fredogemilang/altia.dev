import fs from 'node:fs';

const filePath = './src/data/projects.ts';
let content = fs.readFileSync(filePath, 'utf-8');

const updatedTags = {
  'vads-knowledge-management-system': ['vads', 'enterprise', 'ai-kms'],
  'javanegra-coffee': ['javanegra-coffee', 'javanegra', 'ecommerce', 'brand'],
  'javanegra-gourmet': ['javanegra-gourmet', 'javanegra', 'hospitality', 'f&b'],
  'saptawell-corporate-website': ['saptawell', 'corporate', 'healthcare'],
  'atlas-knowledge-analyst': ['fiverr', 'financial-ai', 'rag'],
  'brew-mobile-commerce': ['fiverr', 'mobile-app', 'ecommerce'],
  'meridian-proposal-intelligence': ['fiverr', 'agentic-ai', 'automation'],
  'lumen-research-ai-workspace': ['fiverr', 'academic-tech', 'ai-workspace'],
  'event-experience-platform': ['fiverr', 'realtime', 'event-tech'],
  'padel-tournament-platform': ['fiverr', 'sports-saas', 'community'],
  'total-cakra-alam': ['total-cakra-alam', 'industrial', 'commodities'],
  'javanegra-cloud-identity': ['javanegra-gourmet', 'javanegra', 'cloud-infra', 'security'],
  'tca-email-infrastructure': ['total-cakra-alam', 'cloud-systems']
};

for (const [slug, tags] of Object.entries(updatedTags)) {
  const regex = new RegExp(`slug:\\s*"${slug}",\\s*\\n\\s*tags:\\s*\\[[^\\]]*\\],`, 'g');
  content = content.replace(regex, `slug: "${slug}",\n    tags: ${JSON.stringify(tags)},`);
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully synchronized projects.ts tags with client mapping!');
