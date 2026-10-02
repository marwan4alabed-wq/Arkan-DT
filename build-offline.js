import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  const assetsDir = path.join(distDir, 'assets');
  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);
    const cssFile = files.find(f => f.endsWith('.css'));
    const jsFile = files.find(f => f.endsWith('.js'));

    if (cssFile && jsFile) {
      const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');
      const jsContent = fs.readFileSync(path.join(assetsDir, jsFile), 'utf8');

      const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ADS - Arkan Digital Solutions</title>
    <meta name="description" content="Landing page for Arkan Digital Transformation (ADS), a B2B digital marketing and smart business solutions agency for SMEs." />
    <meta property="og:title" content="ADS - Arkan Digital Solutions" />
    <meta property="og:description" content="Landing page for Arkan Digital Transformation (ADS), a B2B digital marketing and smart business solutions agency for SMEs." />
    <style>
${cssContent}
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
${jsContent}
    </script>
  </body>
</html>`;

      const publicDir = path.join(__dirname, 'public');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      fs.writeFileSync(path.join(publicDir, 'offline.html'), html);
      fs.writeFileSync(path.join(distDir, 'offline.html'), html);
      fs.writeFileSync(path.join(__dirname, 'offline.html'), html);
      console.log('✓ Successfully created self-contained offline.html in root, dist, and public');
    }
  }
}
