import { notFound } from "next/navigation";
import { CHARTS } from "@/charts/chart-data";
import { ShareCard } from "@/charts/ShareCard";

// Bare-card route at exactly 1080px wide, used to render the downloadable
// PNGs pixel-perfect. Not linked from the site chrome.
export function generateStaticParams() {
  return CHARTS.map((c) => ({ slug: c.slug }));
}

export default async function ExportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const def = CHARTS.find((c) => c.slug === slug);
  if (!def) notFound();
  return (
    <div style={{ background: "#eceef1", minHeight: "100vh", display: "flex", justifyContent: "center", padding: "40px 0" }}>
      <div style={{ width: 1080 }}>
        <ShareCard def={def} lang="en" />
      </div>
    </div>
  );
}
