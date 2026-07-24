import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { contactDetails } from "../data/portfolio";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030a12",
};

function firstForwardedValue(value: string | null): string | null {
  return value?.split(",", 1)[0]?.trim() || null;
}

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    firstForwardedValue(requestHeaders.get("x-forwarded-host")) ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const forwardedProtocol = firstForwardedValue(
    requestHeaders.get("x-forwarded-proto"),
  );
  const protocol =
    forwardedProtocol === "http" || forwardedProtocol === "https"
      ? forwardedProtocol
      : host.includes("localhost")
        ? "http"
        : "https";
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: {
      default: `${contactDetails.name} | Software & Information Systems`,
      template: `%s | ${contactDetails.name}`,
    },
    description:
      "Portfolio of Erich Assuncao, a software and information systems professional combining production technology experience with psychology, counselling, and interpretation across complex human contexts.",
    keywords: [
      contactDetails.name,
      "software developer",
      "information systems",
      ".NET",
      "React",
      "PostgreSQL",
      "Canada software developer",
      "application analyst",
      "QA automation",
      "human-centred technology",
    ],
    authors: [{ name: contactDetails.name }],
    creator: contactDetails.name,
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: [{ url: "/favicon.ico", sizes: "any" }],
      apple: [
        {
          url: "/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
    },
    openGraph: {
      type: "profile",
      url: "/",
      siteName: `${contactDetails.name} — Portfolio`,
      locale: "en_CA",
      title: "Practical technology. Reliable systems. Human-centred outcomes.",
      description:
        "Production software and information systems, informed by psychology, counselling, and more than a decade of professional interpretation.",
      images: [
        {
          url: new URL("/og.jpg", metadataBase).toString(),
          width: 1200,
          height: 630,
          type: "image/jpeg",
          alt: `${contactDetails.name} — ${contactDetails.professionalTitle}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${contactDetails.name} | Software & Information Systems`,
      description:
        "Practical technology. Reliable systems. Human-centred outcomes.",
      images: [new URL("/og.jpg", metadataBase).toString()],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
