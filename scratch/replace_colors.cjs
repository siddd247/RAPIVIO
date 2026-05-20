const fs = require('fs');
const path = require('path');

const srcDir = 'c:\\Users\\sidha\\Documents\\Antigravity\\rapivio\\src';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(dirPath);
  });
}

walk(srcDir, function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Temporary placeholder for #522959 to avoid double replacement
    content = content.replace(/#522959/gi, '__TEMP_522959__');

    content = content.replace(/#FAE5D8/gi, '#FFFFFF');
    content = content.replace(/#DFB6B2/gi, 'rgba(255,255,255,0.6)');
    content = content.replace(/#824D69/gi, '#522959');
    content = content.replace(/#180018/gi, '#2A114B');

    // Restore and replace the original #522959 to #2A114B
    content = content.replace(/__TEMP_522959__/g, '#2A114B');

    // Replace css variables usage
    content = content.replace(/var\(--color-blush\)/gi, '#FFFFFF');
    content = content.replace(/var\(--color-dusty-rose\)/gi, 'rgba(255, 255, 255, 0.6)');
    content = content.replace(/var\(--color-mauve\)/gi, '#522959');
    content = content.replace(/var\(--color-near-black\)/gi, '#000000');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
