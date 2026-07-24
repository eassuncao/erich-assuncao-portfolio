# Erich Assuncao - Portfolio

Professional portfolio showcasing production software delivery, information
systems, data analysis, automated testing, and applied graduate research.

## Technology

The site uses Next.js App Router source, React, TypeScript, Vinext, Vite, and a
Cloudflare Worker. It is configured for OpenAI Sites hosting and uses npm.

The project does not use D1, R2, application authentication, or Supabase.
The null D1 and R2 declarations in `.openai/hosting.json` are retained as Sites
configuration.

## Prerequisites

- Node.js 22.13.0 or newer
- npm 10 or newer

## Install

```bash
npm ci
```

On Windows PowerShell systems where the `npm.ps1` wrapper is restricted, use
`npm.cmd` in place of `npm`.

## Local development

```bash
npm run dev
```

Windows equivalent:

```powershell
npm.cmd run dev
```

## Validation

```bash
npm run lint
npm run typecheck
npm run build
npm run test:smoke
npm test
```

The production build is written to `dist/` as Cloudflare
Worker-compatible ESM output. OpenAI Sites owns the hosted Cloudflare resources
and deployment wiring; this repository does not contain deployment
credentials.

## Licence and personal content

Application source code is available under the MIT Licence in `LICENSE`.
The résumé, photographs, branding, project PDFs, screenshots, cover images,
social imagery, and authored portfolio text are not covered by the MIT
Licence. See `NOTICE.md` for the personal-content and asset terms.
