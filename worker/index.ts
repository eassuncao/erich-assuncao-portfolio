/** Cloudflare Worker entry point for the vinext-starter template. */
import type {
  ExecutionContext,
  Fetcher,
  ImagesBinding,
  ImageOutputOptions,
} from "@cloudflare/workers-types";
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  IMAGES: ImagesBinding;
}

const PORTFOLIO_IMAGE_WIDTHS = [978, 1082];
const ALLOWED_IMAGE_WIDTHS = [
  ...new Set([
    ...DEFAULT_DEVICE_SIZES,
    ...DEFAULT_IMAGE_SIZES,
    ...PORTFOLIO_IMAGE_WIDTHS,
  ]),
];

function toImageOutputFormat(format: string): ImageOutputOptions["format"] {
  switch (format) {
    case "image/jpeg":
    case "image/png":
    case "image/gif":
    case "image/webp":
    case "image/avif":
    case "rgb":
    case "rgba":
      return format;
    default:
      throw new TypeError(`Unsupported image output format: ${format}`);
  }
}

function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set(
    "Permissions-Policy",
    "camera=(), geolocation=(), microphone=()",
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const response = await handleImageOptimization(
        request,
        {
          fetchAsset: (path) =>
            env.ASSETS.fetch(new Request(new URL(path, request.url))),
          transformImage: async (body, { width, format, quality }) => {
            const result = await env.IMAGES.input(body)
              .transform(width > 0 ? { width } : {})
              .output({ format: toImageOutputFormat(format), quality });
            return result.response();
          },
        },
        ALLOWED_IMAGE_WIDTHS,
      );

      return withSecurityHeaders(response);
    }

    return withSecurityHeaders(await handler.fetch(request, env, ctx));
  },
};

export default worker;
