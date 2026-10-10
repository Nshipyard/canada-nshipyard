import { NextRequest, NextResponse } from "next/server";
import { CHARTS } from "@/charts/chart-data";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: cors });
}

// GET /api/project-charts?project=<key>
// <key> is the project subdomain key, e.g. "shortages", "drugprices",
// or the full project URL. Returns the project's shareable charts with
// the URLs each independent project site needs to surface them.
export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("project") || "").trim().toLowerCase();
  if (!q) {
    return NextResponse.json(
      { error: 'Missing "project" query param, e.g. /api/project-charts?project=shortages' },
      { status: 400, headers: cors }
    );
  }
  const matches = CHARTS.filter((c) => {
    const url = (c.projectUrl || "").toLowerCase();
    if (!url) return false;
    const key = url.replace(/^https?:\/\//, "").split(".")[0];
    return key === q || url === q || url.includes(q);
  });
  const charts = matches.map((c) => ({
    slug: c.slug,
    headline: c.headline,
    headlineFr: c.fr?.headline ?? null,
    shareText: c.shareText,
    shareTextFr: c.fr?.shareText ?? null,
    exportUrl: `https://canada.nshipyard.com/charts/export/${c.slug}`,
    chartUrl: `https://canada.nshipyard.com/charts#chart-${c.slug}`,
  }));
  return NextResponse.json(
    { project: q, count: charts.length, charts },
    { headers: { ...cors, "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
  );
}
