import sharp from 'sharp';
import fs from 'node:fs';

// Clean, iconic Fiverr logo vector (green emblem + wordmark with official dot)
const fiverrSvg = `
<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Crisp Fiverr Icon Badge -->
  <g transform="translate(40, 40) scale(0.8)">
    <circle cx="200" cy="200" r="180" fill="#1DBF73" />
    <path d="M125 150H155V125C155 95 175 75 205 75H235V115H215C200 115 195 120 195 135V150H235L230 190H195V325H155V190H125V150Z" fill="white" />
    <circle cx="270" cy="115" r="22" fill="#1DBF73" />
    <circle cx="270" cy="115" r="18" fill="white" />
    <circle cx="270" cy="115" r="9" fill="#1DBF73" />
  </g>
</svg>
`;

await sharp(Buffer.from(fiverrSvg))
  .resize(400, 400)
  .png({ compressionLevel: 9, quality: 100 })
  .toFile('./public/uploads/clients/fiverr.png');

console.log('Successfully generated public/uploads/clients/fiverr.png');
