import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Erich Assuncao's portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Erich Assuncao \| Software &amp; Information Systems<\/title>/i,
  );
  assert.match(html, /Practical technology\./);
  assert.match(html, /Human-centred/);
  assert.match(html, /220\+ automated tests/);
  assert.match(html, /User Connections &amp; Discovery/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /href="\/erich-assuncao-resume\.pdf"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);
});

test("ships every public case study and social card", async () => {
  const files = [
    "public/og.png",
    "public/erich-assuncao-resume.pdf",
    "public/projects/user-connections-discovery.pdf",
    "public/projects/postgresql-database-design.pdf",
    "public/projects/learning-analytics-sentiment.pdf",
    "public/projects/data-mining-weka.pdf",
    "public/projects/interactive-dashboards-python.pdf",
    "public/projects/beyond-pointsification-atid.pdf",
  ];

  await Promise.all(files.map((file) => access(new URL(file, projectRoot))));
});
