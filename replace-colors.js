const fs = require('fs');
const path = require('path');

const TARGET_DIR = path.join(__dirname, 'src');

// Color mappings
const REPLACEMENTS = [
  { match: /#C9A84C/gi, replace: '#006AFF' },
  { match: /#b8942f/gi, replace: '#0050CC' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      for (const rep of REPLACEMENTS) {
        if (content.match(rep.match)) {
          content = content.replace(rep.match, rep.replace);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated colors in: ${fullPath.replace(__dirname, '')}`);
      }
    }
  }
}

// Process tailwind config and src dir
['tailwind.config.ts', 'src'].forEach(fp => {
  const target = path.join(__dirname, fp);
  if (path.extname(target)) {
    // Single file
    if (fs.existsSync(target)) {
        let content = fs.readFileSync(target, 'utf8');
        let modified = false;
        for (const rep of REPLACEMENTS) {
            if (content.match(rep.match)) {
            content = content.replace(rep.match, rep.replace);
            modified = true;
            }
        }
        if (modified) fs.writeFileSync(target, content, 'utf8');
    }
  } else {
    // Dir
    processDirectory(target);
  }
});
console.log('Brand color replacement complete.');
