import type { Metadata } from "next";
import "@fontsource/newsreader/400.css";
import "@fontsource/newsreader/400-italic.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./globals.css";
import { LangProvider } from "@/i18n";

export const metadata: Metadata = {
  metadataBase: new URL("https://canada.nshipyard.com"),
  title: "Nshipyard Canada — Toronto's open data, rebuilt for the people who use it",
  description:
    "Eight open-source projects that clean, join, and publish Toronto's most valuable public datasets. Explorer interfaces for humans, documented APIs and MCP tools for AI agents.",
  openGraph: {
    title: "Nshipyard Canada — Toronto's open data, rebuilt for the people who use it",
    description:
      "Eight open-source projects that clean, join, and publish Toronto's most valuable public datasets. Explorer interfaces for humans, documented APIs and MCP tools for AI agents.",
    url: "https://canada.nshipyard.com",
    siteName: "Nshipyard Canada",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Nshipyard Canada — Toronto's open data, rebuilt for the people who use it" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nshipyard Canada — Toronto's open data, rebuilt for the people who use it",
    description:
      "Eight open-source projects that clean, join, and publish Toronto's most valuable public datasets. Explorer interfaces for humans, documented APIs and MCP tools for AI agents.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
