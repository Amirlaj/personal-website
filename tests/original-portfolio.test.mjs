import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { build } from "vite";

test("original résumé tree contains Amir's content and valid image nodes", async () => {
  const result = await build({
    configFile: false,
    logLevel: "error",
    resolve: { alias: { assert: resolve("original-portfolio/src/browser-assert.ts") } },
    build: {
      write: false,
      minify: false,
      lib: { entry: resolve("original-portfolio/src/data.ts"), formats: ["es"] },
    },
  });
  const output = Array.isArray(result) ? result[0].output : result.output;
  const code = output.find((item) => item.type === "chunk").code;
  const { getTree } = await import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`);
  const nodes = [];
  function walk(tree) {
    nodes.push(tree.item);
    for (const child of tree.children) {
      assert.equal(child.item.depth, tree.item.depth + 1);
      walk(child);
    }
  }
  walk(getTree());
  assert.equal(nodes.length, 20);
  assert.equal(nodes[0].picture, "/amir-portrait.jpeg");
  assert.ok(existsSync(`public${nodes[0].picture}`));
  assert.equal(nodes.find(node => node.description.includes("BEng Computer Science")).picture, "/node-art/city-logo.png");
  assert.equal(new Set(nodes.map(node => node.picture)).size, nodes.length);
  for (const node of nodes) {
    if (node.picture.startsWith("/")) {
      assert.ok(existsSync(`public${node.picture}`));
    } else {
      assert.ok(node.picture.startsWith("data:image/svg+xml,"));
      const svg = decodeURIComponent(node.picture.split(",")[1]);
      assert.match(svg, /<(path|rect|ellipse|circle)\b/);
      assert.doesNotMatch(svg, /<text\b/);
    }
    assert.ok(node.description);
    assert.ok(node.relDistance > 0 && node.relSize > 0);
  }
  const descriptions = nodes.map((node) => node.description).join(" ");
  for (const text of ["Amir Lajevardi", "amir.lajevardi04@gmail.com", "Amir-Lajevardi-CV.pdf", "Healthcare AI Assistant", "linkedin.com/in/a-lajevardi"]) {
    assert.ok(descriptions.includes(text), text);
  }
  assert.doesNotMatch(descriptions, /shayan|mit\.edu|sharif/i);
  assert.ok(existsSync("public/Amir-Lajevardi-CV.pdf"));
});

test("standalone page retains attribution and omits upstream analytics", () => {
  const html = readFileSync("public/original-portfolio/index.html", "utf8");
  assert.match(html, /<title>Amir Lajevardi<\/title>/);
  assert.doesNotMatch(html, /googletagmanager|gtag|G-NB76RCJ039/);
  assert.match(readFileSync("public/original-portfolio/LICENSE.txt", "utf8"), /ISC License/);
  for (const [, asset] of html.matchAll(/(?:src|href)="(\/original-portfolio\/assets\/[^\"]+)"/g)) {
    assert.ok(existsSync(`public${asset}`), asset);
  }
});
