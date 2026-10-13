import assert from "node:assert/strict";
import test from "node:test";
import worker from "../dist/server/index.js";

async function render(path) {
  const response = await worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200);
  return response.text();
}

test("homepage groups all four links at the top of the introduction text column", async () => {
  const html = await render("/");
  assert.match(html, /My name is Amir\./);
  assert.match(html, /<img[^>]*src="\/amir-alpine\.png"/);
  assert.doesNotMatch(html, /class="portrait-placeholder"/);
  assert.match(html, /mailto:amir\.lajevardi04@gmail\.com/);
  assert.match(html, /href="\/Amir-Lajevardi-CV\.pdf"/);
  const navigation = html.match(/<nav class="personal-links"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
  assert.ok(navigation);
  assert.equal((navigation.match(/<a\b/g) ?? []).length, 4);
  assert.match(navigation, /href="\/interactive"/);
  assert.match(navigation, />old website<\/a>/);
  assert.match(html, /<div class="introduction-copy"><nav class="personal-links"/);
  assert.ok(html.indexOf('<nav class="personal-links"') < html.indexOf('<h1>My name is Amir.'));
  assert.doesNotMatch(html, /<footer/);
  assert.doesNotMatch(html, /<iframe/);
});

test("interactive route preserves the original résumé and offers a return link", async () => {
  const html = await render("/interactive");
  assert.match(html, /<iframe[^>]*src="\/original-portfolio\/index\.html"/);
  assert.match(html, /href="\/"[^>]*>← Back to home/);
});

test("homepage keeps the shorter three-paragraph bio with decorative emojis", async () => {
  const html = await render("/");
  const bio = html.match(/<h1>My name is Amir\.<\/h1>([\s\S]*?)<\/div>/)?.[1];
  assert.ok(bio);
  assert.equal((bio.match(/<p>/g) ?? []).length, 3);
  assert.match(bio, /I’m studying Computer Science at/);
  assert.match(bio, /a healthcare assistant, SwiftUI apps and a 2D physics game/);
  assert.match(bio, /I’m based in London, and open to internships and collaborative projects/);
  for (const emoji of ["🎓", "💻", "📍"]) {
    assert.ok(bio.includes(`<span aria-hidden="true">${emoji}</span>`));
  }
  assert.doesNotMatch(bio, /Encode AI Hackathon|tutor GCSE/);
});
