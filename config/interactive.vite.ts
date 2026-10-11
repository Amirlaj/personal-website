import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";

export default defineConfig({
  root: fileURLToPath(new URL("../src/interactive/", import.meta.url)),
  base: "/original-portfolio/",
  publicDir: false,
  plugins: [{
    name: "preserve-upstream-license",
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "LICENSE.txt",
        source: readFileSync(new URL("../src/interactive/NOTICE.md", import.meta.url), "utf8"),
      });
    },
  }],
  resolve: {
    alias: { assert: fileURLToPath(new URL("../src/interactive/browser-assert.ts", import.meta.url)) },
  },
  build: {
    outDir: fileURLToPath(new URL("../public/original-portfolio", import.meta.url)),
    emptyOutDir: true,
  },
});
