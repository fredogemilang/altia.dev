import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const svgLogo = Buffer.from(`
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="none"/>
  <g stroke="#2F2A26" stroke-width="26" stroke-linecap="round" stroke-linejoin="round">
    <path d="M110 380 L110 160 L256 310 L402 160 L402 380" />
    <circle cx="256" cy="155" r="22" fill="#E34234" stroke="none" />
    <path d="M175 380 L256 280 L337 380" stroke="#E34234" stroke-width="20" />
  </g>
</svg>
`);

fs.mkdirSync(path.join(process.cwd(), 'public', 'uploads'), { recursive: true });

sharp(svgLogo)
  .png()
  .toFile(path.join(process.cwd(), 'public', 'uploads', 'client-logo-template.png'))
  .then(() => {
    console.log('SUCCESS: public/uploads/client-logo-template.png generated with true alpha transparency');
  })
  .catch((err) => {
    console.error(err);
  });
