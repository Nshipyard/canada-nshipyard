import type { Metadata } from "next";
import "@fontsource/newsreader/400.css";
import "@fontsource/newsreader/400-italic.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./globals.css";
import { LangProvider } from "@/i18n";
import { PosthogProvider } from "../components/PosthogProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://canada.nshipyard.com"),
  title: "Open Nshipyard: We clean the data so you can use it",
  description:
    "We turn messy public data into open infrastructure: explorer interfaces for humans, documented APIs and MCP tools for AI agents. Starting with Canada's civic data, already answering questions about the whole planet.",
  openGraph: {
    title: "Open Nshipyard: We clean the data so you can use it",
    description:
      "We turn messy public data into open infrastructure: explorer interfaces for humans, documented APIs and MCP tools for AI agents. Starting with Canada's civic data, already answering questions about the whole planet.",
    url: "https://canada.nshipyard.com",
    siteName: "Open Nshipyard",
    images: [{ url: "/og-card.png", width: 1200, height: 630, alt: "Open Nshipyard — We clean the data so you can use it" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Nshipyard: We clean the data so you can use it",
    description:
      "We turn messy public data into open infrastructure: explorer interfaces for humans, documented APIs and MCP tools for AI agents. Starting with Canada's civic data, already answering questions about the whole planet.",
    images: ["/og-card.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      "/favicon.ico",
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-full flex flex-col"><PosthogProvider>
        <LangProvider>{children}</LangProvider>
      </PosthogProvider></body>
    </html>
  );
}
