const fs = require('fs');
const path = require('path');

const brain = 'C:\\Users\\fredo\\.gemini\\antigravity-ide\\brain\\c409d7bc-4b8f-4586-a428-8b907e99e934';
const destDir = path.join(__dirname, '..', 'public', 'uploads', 'portfolio', 'saptawell-corporate-website');

fs.copyFileSync(path.join(brain, 'saptawell_home_fixed_1787512480354.png'), path.join(destDir, '1.png'));
fs.copyFileSync(path.join(brain, 'saptawell_services_fixed_1787512501159.png'), path.join(destDir, '2.png'));
fs.copyFileSync(path.join(brain, 'saptawell_company_fixed_1787512515134.png'), path.join(destDir, '3.png'));

console.log('Saptawell images updated successfully!');
console.log('1.png size:', fs.statSync(path.join(destDir, '1.png')).size);
console.log('2.png size:', fs.statSync(path.join(destDir, '2.png')).size);
console.log('3.png size:', fs.statSync(path.join(destDir, '3.png')).size);
