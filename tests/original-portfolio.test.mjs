import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { build } from "vite";

test("original résumé tree contains Amir's content and valid image nodes", async () => {
  const result = await build({
    configFile: false,
    logLevel: "error",
    resolve: { alias: { assert: resolve("src/interactive/browser-assert.ts") } },
    build: {
      write: false,
      minify: false,
      lib: { entry: resolve("src/interactive/data.ts"), formats: ["es"] },
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
  assert.equal(nodes.length, 26);
  assert.equal(nodes[0].picture, "/amir-portrait.jpeg");
  assert.ok(existsSync(`public${nodes[0].picture}`));
  assert.equal(nodes.find(node => node.description.includes("BSc Computer Science")).picture, "/node-art/city-logo.png");
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
  for (const text of [
    "Amir Lajevardi", "amir.lajevardi84@gmail.com", "Amir-Lajevardi-CV.pdf",
    "LPL26 Compiler", "InfoPharma Ordering System", "iOS Cryptocurrency App",
    "Computer Networks", "2D Java Game", "Software Engineering Intern", "ETHGlobal",
    "Uniswap Foundation", "Mathematics &amp; Computer Science", "cURL", "Collingham College",
    "Sep 2024 – Oct 2025", "linkedin.com/in/amirlajevardi/", "github.com/Amirlaj",
  ]) {
    assert.ok(descriptions.includes(text), text);
  }
  assert.equal((descriptions.match(/>View repository ↗<\/a>/g) ?? []).length, 5);
  assert.doesNotMatch(descriptions, /shayan|mit\.edu|sharif|Healthcare AI Assistant|Encode AI Hackathon|Ongoing|BEng/i);
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
