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
  title: "Nshipyard Canada — Open data infrastructure for Canada and beyond",
  description:
    "We turn messy public data into open infrastructure: explorer interfaces for humans, documented APIs and MCP tools for AI agents. Starting with Canada's civic data, already answering questions about the whole planet.",
  openGraph: {
    title: "Nshipyard Canada — Open data infrastructure for Canada and beyond",
    description:
      "We turn messy public data into open infrastructure: explorer interfaces for humans, documented APIs and MCP tools for AI agents. Starting with Canada's civic data, already answering questions about the whole planet.",
    url: "https://canada.nshipyard.com",
    siteName: "Nshipyard Canada",
    images: [{ url: "/og-card.png", width: 1200, height: 630, alt: "Nshipyard Canada — Open data infrastructure for Canada and beyond" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nshipyard Canada — Open data infrastructure for Canada and beyond",
    description:
      "We turn messy public data into open infrastructure: explorer interfaces for humans, documented APIs and MCP tools for AI agents. Starting with Canada's civic data, already answering questions about the whole planet.",
    images: ["/og-card.png"],
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
