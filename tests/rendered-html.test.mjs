import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
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
  assert.match(html, /FASTA Inspector/);
  assert.match(html, /188 automated tests with zero external runtime dependencies/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /href="\/erich-assuncao-resume\.pdf"/);
  assert.match(html, /Let's connect/);
  assert.match(html, /Counsellor \/ Psychotherapy-Informed Practitioner/);
  assert.match(
    html,
    /healthcare, legal, community[\s\S]*social work,[\s\S]*education settings/i,
  );
  assert.doesNotMatch(
    html,
    /Edmonton|Alberta first|Ontario second|53\.5461|113\.4937/i,
  );
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
    "public/projects/fasta-inspector-bioinformatics.pdf",
    "public/project-covers/fasta-inspector-bioinformatics.png",
  ];

  await Promise.all(files.map((file) => access(new URL(file, projectRoot))));
});

test("ships a valid downloadable resume", async () => {
  const publicResume = await readFile(
    new URL("public/erich-assuncao-resume.pdf", projectRoot),
  );

  assert.ok(publicResume.length > 5);
  assert.equal(publicResume.subarray(0, 5).toString("ascii"), "%PDF-");
});
