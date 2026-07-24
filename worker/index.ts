/** Cloudflare Worker entry point for the vinext-starter template. */
import type {
  ExecutionContext,
  Fetcher,
  ImagesBinding,
  ImageOutputOptions,
} from "@cloudflare/workers-types";
import {
  handleImageOptimization,
  DEFAULT_DEVICE_SIZES,
  DEFAULT_IMAGE_SIZES,
  type ImageHandlers,
} from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  IMAGES?: ImagesBinding;
}

const PORTFOLIO_IMAGE_WIDTHS = [978, 1082];
const ALLOWED_IMAGE_WIDTHS = [
  ...new Set([
    ...DEFAULT_DEVICE_SIZES,
    ...DEFAULT_IMAGE_SIZES,
    ...PORTFOLIO_IMAGE_WIDTHS,
  ]),
];

const IMAGE_CONTENT_TYPES_BY_EXTENSION = new Map([
  [".avif", "image/avif"],
  [".bmp", "image/bmp"],
  [".gif", "image/gif"],
  [".ico", "image/vnd.microsoft.icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".tif", "image/tiff"],
  [".tiff", "image/tiff"],
  [".webp", "image/webp"],
]);

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

function normalizeImageAssetContentType(
  response: Response,
  assetPath: string,
): Response {
  const upstreamContentType = response.headers
    .get("Content-Type")
    ?.split(";", 1)[0]
    .trim()
    .toLowerCase();

  if (
    upstreamContentType &&
    upstreamContentType !== "application/octet-stream"
  ) {
    return response;
  }

  const normalizedPath = assetPath.toLowerCase().split(/[?#]/, 1)[0];
  const extension = [...IMAGE_CONTENT_TYPES_BY_EXTENSION.keys()].find(
    (candidate) => normalizedPath.endsWith(candidate),
  );
  const fallbackContentType = extension
    ? IMAGE_CONTENT_TYPES_BY_EXTENSION.get(extension)
    : undefined;

  if (!fallbackContentType) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set("Content-Type", fallbackContentType);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function createImageHandlers(request: Request, env: Env): ImageHandlers {
  const imageHandlers: ImageHandlers = {
    fetchAsset: async (path) =>
      normalizeImageAssetContentType(
        await env.ASSETS.fetch(new Request(new URL(path, request.url))),
        path,
      ),
  };

  if (typeof env.IMAGES?.input === "function") {
    imageHandlers.transformImage = async (
      body,
      { width, format, quality },
    ) => {
      const result = await env.IMAGES!.input(body)
        .transform(width > 0 ? { width } : {})
        .output({ format: toImageOutputFormat(format), quality });
      return result.response();
    };
  }

  return imageHandlers;
}

function withSecurityHeaders(
  response: Response,
  assetPath?: string,
): Response {
  const normalizedResponse = assetPath
    ? normalizeImageAssetContentType(response, assetPath)
    : response;
  const headers = new Headers(normalizedResponse.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set(
    "Permissions-Policy",
    "camera=(), geolocation=(), microphone=()",
  );

  return new Response(normalizedResponse.body, {
    status: normalizedResponse.status,
    statusText: normalizedResponse.statusText,
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
        createImageHandlers(request, env),
        ALLOWED_IMAGE_WIDTHS,
      );

      return withSecurityHeaders(response);
    }

    return withSecurityHeaders(
      await handler.fetch(request, env, ctx),
      url.pathname,
    );
  },
};

export default worker;
