const fs = require('fs');
const path = require('path');

const brain = 'C:\\Users\\fredo\\.gemini\\antigravity-ide\\brain\\c409d7bc-4b8f-4586-a428-8b907e99e934';
const targetDir = path.join(__dirname, '..', 'public', 'uploads', 'portfolio', 'saptawell-corporate-website');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

fs.copyFileSync(path.join(brain, 'saptawell_home_1787511679258.png'), path.join(targetDir, '1.png'));
fs.copyFileSync(path.join(brain, 'saptawell_services_1787511720036.png'), path.join(targetDir, '2.png'));
fs.copyFileSync(path.join(brain, 'saptawell_company_1787511755982.png'), path.join(targetDir, '3.png'));

console.log('Saptawell images copied successfully!');
