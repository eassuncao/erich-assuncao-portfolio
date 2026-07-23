import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030a12",
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: {
      default: "Erich Assuncao | Software & Information Systems",
      template: "%s | Erich Assuncao",
    },
    description:
      "Portfolio of Erich Assuncao, a software developer and information systems professional delivering practical .NET, React, API, PostgreSQL, testing, and data solutions.",
    keywords: [
      "Erich Assuncao",
      "software developer",
      "information systems",
      ".NET",
      "React",
      "PostgreSQL",
      "Edmonton technology",
      "application analyst",
      "QA automation",
    ],
    authors: [{ name: "Erich Assuncao" }],
    creator: "Erich Assuncao",
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: "/images/erich-assuncao.png",
      apple: "/images/erich-assuncao.png",
    },
    openGraph: {
      type: "profile",
      url: "/",
      siteName: "Erich Assuncao — Portfolio",
      title: "Practical technology. Reliable systems. Human-centred outcomes.",
      description:
        "Production software, information systems, data, testing, and applied research by Erich Assuncao.",
      images: [
        {
          url: new URL("/og.png", metadataBase).toString(),
          width: 1731,
          height: 909,
          alt: "Erich Assuncao — Software Developer and Information Systems Professional",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Erich Assuncao | Software & Information Systems",
      description:
        "Practical technology. Reliable systems. Human-centred outcomes.",
      images: [new URL("/og.png", metadataBase).toString()],
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
