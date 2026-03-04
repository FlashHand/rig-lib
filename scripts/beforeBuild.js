const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, '../README.md');
const targetDir = path.join(__dirname, '../packages/core');
const targetFile = path.join(targetDir, 'README.md');

fs.copyFileSync(sourceFile, targetFile);
console.log('✓ Copied README.md to packages/core directory');
