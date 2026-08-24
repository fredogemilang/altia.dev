const fs = require('fs');
const path = require('path');

const brain = 'C:\\Users\\fredo\\.gemini\\antigravity-ide\\brain\\c409d7bc-4b8f-4586-a428-8b907e99e934';
const base = path.join(__dirname, '..', 'public', 'uploads', 'portfolio');

const map = [
  {
    slug: 'javanegra-coffee',
    files: [
      path.join(brain, 'javanegra_homepage_1787509398504.png'),
      path.join(brain, 'javanegra_products_1787510912901.png'),
      path.join(brain, 'javanegra_story_1787510926763.png'),
    ],
    ext: '.png',
  },
  {
    slug: 'javanegra-gourmet',
    files: [
      path.join(brain, 'javanegra_gourmet_1787509423566.png'),
      path.join(brain, 'gourmet_outlets_1787510939901.png'),
      path.join(brain, 'gourmet_story_1787510952305.png'),
    ],
    ext: '.png',
  },
  {
    slug: 'total-cakra-alam',
    files: [
      path.join(brain, 'total_cakra_alam_1787509488043.png'),
      path.join(brain, 'tca_projects_1787510972428.png'),
      path.join(brain, 'tca_services_1787510993423.png'),
    ],
    ext: '.png',
  },
  {
    slug: 'vads-knowledge-management-system',
    files: [
      path.join(brain, 'vads_kms_ui_1787509654404.jpg'),
      path.join(brain, 'vads_kms_ui_1787509654404.jpg'),
      path.join(brain, 'vads_kms_ui_1787509654404.jpg'),
    ],
    ext: '.jpg',
  },
  {
    slug: 'atlas-knowledge-analyst',
    files: [
      path.join(brain, 'atlas_knowledge_analyst_1787509512560.jpg'),
      path.join(brain, 'atlas_knowledge_analyst_1787509512560.jpg'),
      path.join(brain, 'atlas_knowledge_analyst_1787509512560.jpg'),
    ],
    ext: '.jpg',
  },
  {
    slug: 'brew-mobile-commerce',
    files: [
      path.join(brain, 'brew_mobile_app_1787509528501.jpg'),
      path.join(brain, 'brew_mobile_app_1787509528501.jpg'),
      path.join(brain, 'brew_mobile_app_1787509528501.jpg'),
    ],
    ext: '.jpg',
  },
  {
    slug: 'meridian-proposal-intelligence',
    files: [
      path.join(brain, 'meridian_proposal_ui_1787509593949.jpg'),
      path.join(brain, 'meridian_proposal_ui_1787509593949.jpg'),
      path.join(brain, 'meridian_proposal_ui_1787509593949.jpg'),
    ],
    ext: '.jpg',
  },
  {
    slug: 'lumen-research-ai-workspace',
    files: [
      path.join(brain, 'lumen_research_ui_1787509575051.jpg'),
      path.join(brain, 'lumen_research_ui_1787509575051.jpg'),
      path.join(brain, 'lumen_research_ui_1787509575051.jpg'),
    ],
    ext: '.jpg',
  },
  {
    slug: 'event-experience-platform',
    files: [
      path.join(brain, 'event_experience_ui_1787509542604.jpg'),
      path.join(brain, 'event_experience_ui_1787509542604.jpg'),
      path.join(brain, 'event_experience_ui_1787509542604.jpg'),
    ],
    ext: '.jpg',
  },
  {
    slug: 'padel-tournament-platform',
    files: [
      path.join(brain, 'padel_tournament_ui_1787509613583.jpg'),
      path.join(brain, 'padel_tournament_ui_1787509613583.jpg'),
      path.join(brain, 'padel_tournament_ui_1787509613583.jpg'),
    ],
    ext: '.jpg',
  },
  {
    slug: 'javanegra-cloud-identity',
    files: [
      path.join(brain, 'javanegra_cloud_ui_1787509560275.jpg'),
      path.join(brain, 'javanegra_cloud_ui_1787509560275.jpg'),
      path.join(brain, 'javanegra_cloud_ui_1787509560275.jpg'),
    ],
    ext: '.jpg',
  },
  {
    slug: 'tca-email-infrastructure',
    files: [
      path.join(brain, 'tca_email_ui_1787509633689.jpg'),
      path.join(brain, 'tca_email_ui_1787509633689.jpg'),
      path.join(brain, 'tca_email_ui_1787509633689.jpg'),
    ],
    ext: '.jpg',
  },
];

map.forEach((item) => {
  const itemDir = path.join(base, item.slug);
  if (!fs.existsSync(itemDir)) {
    fs.mkdirSync(itemDir, { recursive: true });
  }
  item.files.forEach((srcFile, idx) => {
    const destFile = path.join(itemDir, `${idx + 1}${item.ext}`);
    fs.copyFileSync(srcFile, destFile);
    console.log(`Copied ${path.basename(srcFile)} -> ${item.slug}/${idx + 1}${item.ext}`);
  });
});

console.log('All portfolio image folders created and populated successfully!');
