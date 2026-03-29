const fs = require('fs');
const path = require('path');

const directory = './src';

const replacements = {
  '#C9A84C': '#2563EB',   // Sovereign Gold -> Modern Blue
  '#A67C00': '#1E3A8A',   // Gold Dark -> Blue Dark
  '#D4AF37': '#2563EB',   // Gold Mid -> Blue Mid
  '#FFD700': '#60A5FA',   // Gold Light -> Blue Light
  '#FAF9F6': '#F8FAFC',   // Ivory -> Slate 50
  '#0A0A0A': '#0F172A',   // Harsh Black -> Slate 900
  '#8A8A8A': '#64748B',   // Warm Grey -> Slate 500
  '#F5F0E8': '#F1F5F9',   // Warm bg -> Slate 100
};

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

let modifiedFiles = 0;

walkDir(directory, function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    for (const [oldHex, newHex] of Object.entries(replacements)) {
      // Create global regex for both exact matches and lowercase variants
      const regex = new RegExp(oldHex, 'gi');
      content = content.replace(regex, newHex);
    }
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      modifiedFiles++;
    }
  }
});

console.log(`Successfully refactored colors in ${modifiedFiles} files.`);
