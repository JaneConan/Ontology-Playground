import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import fs from 'node:fs'
import path from 'node:path'

function resolveBasePath(): string {
  if (process.env.VITE_BASE_PATH) return process.env.VITE_BASE_PATH;

  // In GitHub Actions, derive Pages base from owner/repo when not explicitly provided.
  if (process.env.GITHUB_ACTIONS === 'true' && process.env.GITHUB_REPOSITORY) {
    const [, repoName] = process.env.GITHUB_REPOSITORY.split('/');
    if (repoName) return `/${repoName}/`;
  }

  return '/';
}

// Harmony build: inline EVERYTHING (JS/CSS/fonts) into a single index.html so the
// ArkWeb shell can load it from $rawfile with zero sub-resource (CORS-blocked) requests.
// In addition, the runtime `fetch()` calls for catalogue.json / learn.json are served
// from inline data via a window.fetch shim, so no resource:// sub-request is ever made.

// Reads public/catalogue.json and injects it inline, patching window.fetch to return
// it. Build-only, harmony mode, zero React-code changes.
function harmonyDataInject() {
  return {
    name: 'harmony-data-inject',
    transformIndexHtml(html: string) {
      const root = process.cwd();
      const read = (rel: string): string => {
        try {
          return fs.readFileSync(path.join(root, rel), 'utf-8');
        } catch {
          return 'null';
        }
      };
      // Strip external (http/https) links from inlined course data so the
      // offline build never renders a clickable link that leaves the device.
      // Handles both HTML <a href="..."> (drops the href) and bare URLs in
      // plain/markdown text (removed entirely). Quotes may be JSON-escaped
      // as \" inside the data files.
      const stripExternalLinks = (s: string): string =>
        s
          .replace(/<a\s+[^>]*href=\\?["']https?:\/\/[^>]*>/gi, '<a>')
          .replace(/https?:\/\/[^\s"<]+/g, '')
          .replace(/github\.com\/[^\s<"]+/g, '');
      // Escape '<' so embedded JSON can never close the <script> tag prematurely.
      const safe = (s: string): string => stripExternalLinks(s).replace(/</g, '\\u003c');
      const catalogue = safe(read('public/catalogue.json'));
      const script = `<script>
(function(){
  window.__HARMONY_DATA__ = { catalogue: ${catalogue} };
  var _orig = window.fetch ? window.fetch.bind(window) : null;
  window.fetch = function(input, init){
    var url = (typeof input === 'string') ? input : (input && input.url) || '';
    if (/catalogue\\.json/.test(url)) {
      return Promise.resolve(new Response(JSON.stringify(window.__HARMONY_DATA__.catalogue), {status:200, headers:{'Content-Type':'application/json'}}));
    }
    return _orig ? _orig(input, init) : Promise.reject(new Error('fetch unavailable'));
  };
})();
</script>`;
      return html.replace('<head>', '<head>' + script);
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const harmony = mode === 'harmony';
  return {
    plugins: [
      react(),
      ...(harmony
        ? [
            harmonyDataInject(),
            viteSingleFile({
              useRecommendedBuildConfig: true,
              removeViteModuleLoader: true,
            }),
          ]
        : []),
    ],
    base: harmony ? './' : resolveBasePath(),
    build: {
      outDir: 'build',
      chunkSizeWarningLimit: 9000,
      rollupOptions: {
        output: harmony
          ? {}
          : {
              manualChunks(id) {
                if (!id.includes('node_modules')) return undefined;
                if (id.includes('cytoscape')) return 'graph-vendor';
                if (id.includes('react') || id.includes('zustand') || id.includes('framer-motion')) return 'ui-vendor';
                return 'vendor';
              },
            },
      },
    },
  server: {
    proxy: {
      ...(process.env.VITE_ENABLE_AI_BUILDER === 'true'
        ? {
            '/api': {
              target: 'http://localhost:7071',
              changeOrigin: true,
            },
          }
        : {}),
    },
  },
  };
})
