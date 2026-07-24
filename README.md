# Erich Assuncao — Portfolio

A single-page professional portfolio presenting production software delivery,
information systems work, data analysis, automated testing, and applied
graduate research.

![Erich Assuncao portfolio preview](public/og.jpg)

## Live site

[View the live portfolio](https://erichassuncao.com).

## Technology stack

- Next.js App Router, React, and TypeScript
- Vinext and Vite
- Tailwind/PostCSS tooling with project-specific global CSS
- Cloudflare Workers and OpenAI Sites
- Node.js and npm

## Architecture

The page is composed from React server components. Typed portfolio content and
configuration live in `data/portfolio.ts`; the major sections and reusable
`ProjectCard` live under `components/`. Vinext and Vite compile the Next.js
source into the Cloudflare Worker entry point in `worker/`, which handles React
Server Component rendering, application responses, assets, and image
optimization. The local Sites build plugin packages the source according to
`.openai/hosting.json`.

This is not a static export. Canonical, social, sitemap, and crawler metadata
use the permanent production origin at `https://erichassuncao.com`. Supabase,
application authentication, D1, and R2 are not used. The null D1 and R2 values
in `.openai/hosting.json` are intentional OpenAI Sites configuration.

## Local setup

Requirements:

- Node.js 22.13.0 or newer
- npm 10 or newer

macOS or Linux:

```bash
npm ci
npm run dev
```

Windows PowerShell:

```powershell
npm.cmd ci
npm.cmd run dev
```

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vinext development server |
| `npm run start` | Serve an existing production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check the application and Worker |
| `npm run build` | Create the production Worker build |
| `npm run test:smoke` | Test an existing production build |
| `npm test` | Build once, then run the smoke tests |

On Windows PowerShell systems where the `npm.ps1` wrapper is restricted, use
`npm.cmd` in place of `npm`.

## Project structure

```text
app/                    Next.js layout, page, metadata, sitemap, robots, and global CSS
components/
  sections/             Major server-rendered page sections
  ProjectCard.tsx       Reusable project presentation
data/portfolio.ts       Typed portfolio content and configuration
public/                 Optimized images, résumé, project covers, and PDFs
tests/                  Rendered-Worker smoke tests
worker/index.ts         Vinext Cloudflare Worker entry point
build/                  OpenAI Sites build plugin
.openai/hosting.json    Existing Sites project and null D1/R2 configuration
next.config.ts          Next.js image configuration
vite.config.ts          Vinext, Vite, Cloudflare, and Sites build wiring
```

## Deployment

`npm run build` writes ignored, Worker-compatible output to `dist/`. OpenAI
Sites manages the hosted Cloudflare resources, deployment versions, and access
settings for the existing project. The GitHub Actions workflow validates the
repository only; it does not deploy or change Sites access.

## Related source code

- [FASTA Inspector](https://github.com/eassuncao/fasta_inspector)

## Continuous integration

`.github/workflows/ci.yml` uses Node 22 and runs dependency installation, lint,
both application and Worker type-checks, one production build, and the rendered
smoke tests. It has read-only repository permissions and no deployment step.

## Licensing

Application source code is available under the MIT Licence in
[LICENSE](LICENSE). The résumé, photographs, branding, project PDFs,
screenshots, cover images, social imagery, and authored portfolio text are not
covered by the MIT Licence. See [NOTICE.md](NOTICE.md) for the personal-content
and asset terms.
