import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(pathname = "/", requestHeaders = {}) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(pathname, "http://localhost"), {
      headers: {
        accept: pathname === "/robots.txt" ? "text/plain" : "text/html",
        ...requestHeaders,
      },
    }),
    {
      ASSETS: {
        fetch: async (request) => {
          const assetPath = new URL(request.url).pathname;
          if (
            !assetPath.startsWith("/images/") &&
            !assetPath.startsWith("/project-covers/")
          ) {
            return new Response("Not found", { status: 404 });
          }

          const asset = await readFile(
            new URL(`public${assetPath}`, projectRoot),
          );
          const contentType = assetPath.endsWith(".webp")
            ? "image/webp"
            : "image/png";

          return new Response(asset, {
            headers: { "content-type": contentType },
          });
        },
      },
      IMAGES: {
        input: (body) => ({
          transform: () => ({
            output: async ({ format }) => ({
              response: () =>
                new Response(body, {
                  headers: { "content-type": format },
                }),
            }),
          }),
        }),
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
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(
    response.headers.get("referrer-policy"),
    "strict-origin-when-cross-origin",
  );
  assert.equal(
    response.headers.get("permissions-policy"),
    "camera=(), geolocation=(), microphone=()",
  );

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
  assert.match(
    html,
    /rel="icon" href="http:\/\/localhost(?::3000)?\/favicon\.ico"/,
  );
  assert.match(
    html,
    /rel="apple-touch-icon" href="http:\/\/localhost(?::3000)?\/apple-touch-icon\.png"/,
  );
  assert.match(
    html,
    /property="og:image" content="http:\/\/localhost(?::3000)?\/og\.jpg"/,
  );
  assert.match(html, /property="og:image:width" content="1200"/);
  assert.match(html, /property="og:image:height" content="630"/);
  assert.match(html, /property="og:image:type" content="image\/jpeg"/);
  assert.match(
    html,
    /src="\/_vinext\/image\?url=%2Fimages%2Ferich-assuncao-portrait\.webp&amp;w=978&amp;q=82"/,
  );
  assert.match(html, /width="978" height="1254"/);
  assert.match(html, /fetchPriority="high"/);
  assert.match(
    html,
    /sizes="\(max-width: 430px\) 75vw, \(max-width: 680px\) 72vw, 432px"/,
  );
  assert.match(
    html,
    /src="\/_vinext\/image\?url=%2Fproject-covers%2F[^"]+&amp;w=1082&amp;q=75"/,
  );
  assert.match(html, /width="1082" height="1400"/);
  assert.match(html, /href="\/erich-assuncao-resume\.pdf"/);
  assert.match(html, /Download résumé \(PDF\)/);
  assert.match(html, /Read case study \(PDF\)/);
  const sourceLinks = [
    ...html.matchAll(
      /href="https:\/\/github\.com\/eassuncao\/fasta_inspector"/g,
    ),
  ];
  assert.equal(sourceLinks.length, 1);
  assert.match(html, /View source/);
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
  const decodedHtml = html.replaceAll("&amp;", "&");
  const directProjectAssets = [
    ...new Set(
      [...html.matchAll(/href="(\/projects\/[^"]+\.pdf)"/g)].map((match) =>
        match[1].slice(1),
      ),
    ),
  ];
  const optimizedProjectCovers = [
    ...new Set(
      [
        ...decodedHtml.matchAll(
          /\/_vinext\/image\?url=([^&"\s]+)&(?:amp;)?w=\d+/g,
        ),
      ]
        .map((match) => decodeURIComponent(match[1]).replace(/^\//, ""))
        .filter((file) => file.startsWith("project-covers/")),
    ),
  ];
  const renderedProjectAssets = [
    ...directProjectAssets,
    ...optimizedProjectCovers,
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
    "public/og.jpg",
    "public/favicon.ico",
    "public/apple-touch-icon.png",
    "public/images/erich-assuncao-portrait.webp",
    "public/erich-assuncao-resume.pdf",
    ...renderedProjectAssets.map((file) => `public/${file}`),
  ];

  await Promise.all(files.map((file) => access(new URL(file, projectRoot))));
});

test("publishes crawl instructions", async () => {
  const response = await render("/robots.txt");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/plain\b/i);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(await response.text(), "User-Agent: *\nAllow: /\n");
});

test("uses the first trusted proxy host and protocol values", async () => {
  const response = await render("/", {
    "x-forwarded-host": "portfolio.example, internal.example",
    "x-forwarded-proto": "https, http",
  });
  const html = await response.text();

  assert.match(
    html,
    /rel="canonical" href="https:\/\/portfolio\.example\/"/,
  );
  assert.match(
    html,
    /property="og:image" content="https:\/\/portfolio\.example\/og\.jpg"/,
  );
});

test("configures and serves optimized images at their intrinsic widths", async () => {
  const workerConfig = JSON.parse(
    await readFile(
      new URL("dist/server/wrangler.json", projectRoot),
      "utf8",
    ),
  );

  assert.equal(workerConfig.assets?.binding, "ASSETS");
  assert.equal(workerConfig.images?.binding, "IMAGES");

  for (const [source, width] of [
    ["/images/erich-assuncao-portrait.webp", 978],
    ["/project-covers/fasta-inspector-bioinformatics.png", 1082],
  ]) {
    const parameters = new URLSearchParams({
      url: source,
      w: String(width),
      q: "82",
    });
    const response = await render(`/_vinext/image?${parameters}`, {
      accept: "image/webp,image/*",
    });

    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "image/webp");
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.ok((await response.arrayBuffer()).byteLength > 0);
  }
});

test("ships a valid downloadable resume", async () => {
  const publicResume = await readFile(
    new URL("public/erich-assuncao-resume.pdf", projectRoot),
  );

  assert.ok(publicResume.length > 5);
  assert.equal(publicResume.subarray(0, 5).toString("ascii"), "%PDF-");
});
