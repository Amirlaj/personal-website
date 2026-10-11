import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

test("Cloudflare build contains a Worker and its static asset directory", () => {
  const config = JSON.parse(readFileSync("dist/server/wrangler.json", "utf8"));
  assert.equal(config.name, "amir-lajevardi-portfolio");
  assert.ok(config.compatibility_flags.includes("nodejs_compat"));
  assert.ok(existsSync(resolve("dist/server", config.main)));
  assert.equal(config.assets.binding, "ASSETS");
  assert.equal(resolve("dist/server", config.assets.directory), resolve("dist/client"));
  for (const asset of [
    "amir-alpine.png", "amir-portrait.jpeg", "Amir-Lajevardi-CV.pdf",
    "favicon.svg", "og.png", "fonts/noto-sans-300.ttf", "fonts/noto-sans-400.ttf",
    "fonts/OFL.txt", "node-art/city-logo.png", "node-art/DEVICON-LICENSE.txt",
    "node-art/SOURCES.txt", "original-portfolio/index.html", "original-portfolio/LICENSE.txt",
  ]) {
    assert.ok(existsSync(resolve("dist/client", asset)), asset);
  }
});

test("deployment commands use the built Cloudflare config", () => {
  const { scripts } = JSON.parse(readFileSync("package.json", "utf8"));
  assert.equal(scripts.deploy, "wrangler deploy --config dist/server/wrangler.json");
  assert.equal(scripts["deploy:check"], `${scripts.deploy} --dry-run`);
});
