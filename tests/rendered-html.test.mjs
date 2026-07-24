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
  assert.match(html, /7(?:<!-- -->)? case studies/);
  assert.match(html, /188 automated tests with zero external runtime dependencies/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /href="\/erich-assuncao-resume\.pdf"/);
  assert.match(html, /Download résumé \(PDF\)/);
  assert.match(html, /Read case study \(PDF\)/);
  assert.match(html, /Opens in a new tab\./);
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
  const navigation = html.match(
    /<nav[^>]*class="site-nav"[^>]*>([\s\S]*?)<\/nav>/i,
  );
  assert.ok(navigation, "primary navigation should be rendered");

  const navigationFragments = [
    ...navigation[1].matchAll(/href="#([^"]+)"/g),
  ].map((match) => match[1]);
  assert.deepEqual(navigationFragments, [
    "work",
    "approach",
    "background",
    "contact",
  ]);
  for (const fragment of navigationFragments) {
    assert.match(html, new RegExp(`id="${fragment}"`));
  }

  for (const icon of ["M", "B", "P"]) {
    assert.match(
      html,
      new RegExp(
        `class="approach-icon" aria-hidden="true">[\\s\\S]*?${icon}[\\s\\S]*?<\\/div>`,
      ),
    );
  }
  assert.doesNotMatch(
    html,
    /class="(?:hero-visual|delivery-map)" aria-label=/,
  );
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);
});

test("ships every public case study and social card", async () => {
  const response = await render();
  const html = await response.text();
  const renderedProjectAssets = [
    ...new Set(
      [...html.matchAll(/(?:href|src)="(\/(?:projects|project-covers)\/[^"]+)"/g)]
        .map((match) => match[1].slice(1)),
    ),
  ];
  const projectPdfs = renderedProjectAssets.filter((file) =>
    file.endsWith(".pdf"),
  );
  const projectCovers = renderedProjectAssets.filter((file) =>
    file.startsWith("project-covers/"),
  );

  assert.equal(projectPdfs.length, 7);
  assert.equal(projectCovers.length, 7);

  const files = [
    "public/og.png",
    "public/erich-assuncao-resume.pdf",
    ...renderedProjectAssets.map((file) => `public/${file}`),
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
