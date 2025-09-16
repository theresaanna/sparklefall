#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the source file
const sourcePath = path.join(__dirname, '../src/sparklefall.js');
const distPath = path.join(__dirname, '../dist/sparklefall.esm.js');

// Read source content
let content = fs.readFileSync(sourcePath, 'utf8');

// Remove the UMD wrapper and replace with ES module export
content = content.replace(
  /\/\/ Export for different module systems[\s\S]*$/,
  'export default SparkleFall;'
);

// Ensure dist directory exists
const distDir = path.dirname(distPath);
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Write the ESM version
fs.writeFileSync(distPath, content);

console.log('✨ ESM build created at dist/sparklefall.esm.js');