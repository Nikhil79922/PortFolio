import { createHash } from "node:crypto";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, type Plugin } from "vite";

/**
 * Preloads the primary (Latin) Inter font so it is ready before first paint — no text reflow
 * when the web font swaps in. The hashed file name is looked up in the final bundle.
 */
function preloadPrimaryFont(): Plugin {
  let base = "/";
  return {
    name: "preload-primary-font",
    apply: "build",
    configResolved(config) {
      base = config.base;
    },
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        const file = Object.keys(ctx.bundle ?? {}).find((f) => /inter-latin-wght-normal-.*\.woff2$/.test(f));
        if (!file) return html;
        return html.replace(
          "</title>",
          `</title>\n    <link rel="preload" href="${base}${file}" as="font" type="font/woff2" crossorigin />`
        );
      },
    },
  };
}

/**
 * Injects a strict Content-Security-Policy <meta> tag into the production HTML.
 * The policy lives in-page (not in vercel.json) because it must carry the SHA-256 hash of the
 * inline theme pre-paint script, which is computed here at build time so it can never drift out
 * of sync with the markup. Header-only directives (frame-ancestors) are set in vercel.json.
 * Build-only: Vite's dev server relies on inline scripts for hot reload.
 *
 * Line endings: a Windows checkout has CRLF while Vercel builds from git on Linux (LF). The HTML
 * is normalised to LF before hashing and the CRLF variant's hash is included too, so the policy
 * matches no matter where the build runs.
 */
const sha256 = (text: string) => `'sha256-${createHash("sha256").update(text).digest("base64")}'`;

function contentSecurityPolicy(): Plugin {
  return {
    name: "content-security-policy",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(rawHtml) {
        const html = rawHtml.replace(/\r\n/g, "\n");
        const hashes = [
          ...new Set(
            [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].flatMap(([, body]) => [
              sha256(body),
              sha256(body.replace(/\n/g, "\r\n")),
            ])
          ),
        ];
        const policy = [
          "default-src 'self'",
          `script-src 'self' ${hashes.join(" ")}`.trim(),
          // Radix UI positions popovers with inline style attributes.
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data:",
          "font-src 'self'",
          "connect-src 'self'",
          "manifest-src 'self'",
          "object-src 'none'",
          "frame-src 'none'",
          "worker-src 'none'",
          "base-uri 'self'",
          "form-action 'none'",
          "upgrade-insecure-requests",
        ].join("; ");
        return html.replace(
          /<meta charset="UTF-8" \/>/i,
          `$&\n    <meta http-equiv="Content-Security-Policy" content="${policy}" />`
        );
      },
    },
  };
}

// Hosted on Vercel, which serves the site from the domain root.
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    preloadPrimaryFont(),
    contentSecurityPolicy()
  ],
  server: {
    port: 3000,
  },
  build: {
    sourcemap: false,
    assetsInlineLimit: 4096,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
