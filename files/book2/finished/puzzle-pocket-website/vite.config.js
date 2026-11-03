// Settings for Vite, the tool that previews and builds the website.

import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

// The site's public address. Change this after you publish (Chapter 2.10),
// so links shared in messages show the right preview.
const SITE_URL = 'https://puzzle-pocket.netlify.app';

// Every page on the site. A page missing from this list works in the preview
// but disappears from the published site.
const PAGES = {
  index: resolve(root, 'index.html'),
  'how-to-play': resolve(root, 'how-to-play.html'),
  support: resolve(root, 'support.html'),
  privacy: resolve(root, 'privacy.html'),
  contact: resolve(root, 'contact.html'),
};

// Inserts the shared components from src/components into every page when
// the page is previewed or built, so each page arrives in the browser complete.
//
//   <!-- include: site-header -->                inserts src/components/site-header.html
//   <!-- include: puzzle-card icon="grid-3x3" title="..." -->
//                                                inserts a component, filling in {{icon}} and {{title}}
//   <!-- icon: grid-3x3 -->                      inserts assets/icons/grid-3x3.svg, hidden from screen readers
//   {{site-url}}                                 the site's public address
function sharedComponents() {
  const readComponent = (name) =>
    readFileSync(resolve(root, 'src/components', `${name}.html`), 'utf8');

  const readIcon = (name) =>
    readFileSync(resolve(root, 'assets/icons', `${name}.svg`), 'utf8')
      .replace(/<!--[\s\S]*?-->\s*/g, '')
      .replace('<svg', '<svg aria-hidden="true" focusable="false"')
      .trim();

  const fillIn = (html, page) =>
    html
      .replace(/<!--\s*include:\s*([\w-]+)((?:\s+[\w-]+="[^"]*")*)\s*-->/g, (_, name, attrs) => {
        let component = readComponent(name);
        for (const [, key, value] of attrs.matchAll(/([\w-]+)="([^"]*)"/g)) {
          component = component.replaceAll(`{{${key}}}`, value);
        }
        return fillIn(component, page);
      })
      .replace(/<!--\s*icon:\s*([\w-]+)\s*-->/g, (_, name) => readIcon(name))
      .replaceAll('{{site-url}}', SITE_URL)
      // Mark the current page's navigation link, and remove the markers from the others.
      .replace(/\sdata-page="([\w-]+)"/g, (_, linkPage) =>
        linkPage === page ? ' aria-current="page"' : ''
      );

  return {
    name: 'shared-components',
    transformIndexHtml: {
      // Run first, so Vite also processes the stylesheets, images, and
      // icons inside the components.
      order: 'pre',
      handler(html, ctx) {
        const page = basename(ctx.filename, '.html');
        return fillIn(html, page);
      },
    },
    // Reload the browser when a component changes during npm run dev.
    handleHotUpdate({ file, server }) {
      if (file.includes('/src/components/')) {
        server.ws.send({ type: 'full-reload' });
      }
    },
    // The share preview image is only mentioned in each page's metadata, with
    // its full address, so Vite doesn't copy it on its own. Copy it unchanged.
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'assets/images/share-preview.png',
        source: readFileSync(resolve(root, 'assets/images/share-preview.png')),
      });
    },
  };
}

export default defineConfig({
  plugins: [sharedComponents()],
  build: {
    // Keep every image, icon, and font as its own file, rather than
    // inlining small ones into the pages, so you can see them all in dist.
    assetsInlineLimit: 0,
    rolldownOptions: {
      input: PAGES,
    },
  },
});
