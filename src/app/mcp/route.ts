import { NextResponse } from "next/server";

// Federated MCP server over streamable HTTP (JSON-RPC 2.0 via POST).
// Fans out to every Nshipyard project's own MCP server and namespaces tools:
//   parking.tickets_ward_stats, city311...., licences.naics_for_category, ...
// Supports: initialize, tools/list, tools/call. Stateless.

const SERVER = { name: "nshipyard-federated", version: "1.0.0" };

const BACKENDS: { namespace: string; url: string }[] = [
  { namespace: "parking", url: "https://parking.canada.nshipyard.com/mcp" },
  { namespace: "city311", url: "https://311.canada.nshipyard.com/mcp" },
  { namespace: "licences", url: "https://licences.canada.nshipyard.com/mcp" },
  { namespace: "watermains", url: "https://watermains.canada.nshipyard.com/mcp" },
  { namespace: "parcels", url: "https://parcels.canada.nshipyard.com/mcp" },
  { namespace: "codebooks", url: "https://codebooks.canada.nshipyard.com/mcp" },
  { namespace: "development", url: "https://development.canada.nshipyard.com/mcp" },
  { namespace: "geo", url: "https://geo.canada.nshipyard.com/mcp" },
  { namespace: "procurement", url: "https://procurement.canada.nshipyard.com/mcp" },
];

const RPC_TIMEOUT_MS = 8000;
const TOOLS_CACHE_MS = 60_000;

let toolsCache: { at: number; tools: unknown[] } | null = null;

function ok(id: unknown, result: unknown) {
  return { jsonrpc: "2.0", id, result };
}
function err(id: unknown, code: number, message: string) {
  return { jsonrpc: "2.0", id, error: { code, message } };
}

async function rpc(url: string, msg: unknown): Promise<any> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), RPC_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msg),
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

async function listAllTools(): Promise<unknown[]> {
  if (toolsCache && Date.now() - toolsCache.at < TOOLS_CACHE_MS) return toolsCache.tools;
  const settled = await Promise.allSettled(
    BACKENDS.map(async (b) => {
      const res = await rpc(b.url, { jsonrpc: "2.0", id: `list-${b.namespace}`, method: "tools/list" });
      const tools = res?.result?.tools;
      if (!Array.isArray(tools)) throw new Error("bad tools/list response");
      return tools.map((t: any) => ({
        ...t,
        name: `${b.namespace}.${t.name}`,
        description: `[${b.namespace}] ${t.description ?? ""}`.trim(),
      }));
    })
  );
  const tools = settled.flatMap((s) => (s.status === "fulfilled" ? s.value : []));
  toolsCache = { at: Date.now(), tools };
  return tools;
}

async function handle(msg: any) {
  if (!msg || msg.jsonrpc !== "2.0" || typeof msg.method !== "string") {
    return err(msg?.id ?? null, -32600, "Invalid Request");
  }
  const id = msg.id ?? null;
  switch (msg.method) {
    case "initialize":
      return ok(id, {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: SERVER,
      });
    case "notifications/initialized":
      return null;
    case "tools/list": {
      const tools = await listAllTools();
      return ok(id, { tools });
    }
    case "tools/call": {
      const fullName = String(msg.params?.name ?? "");
      const dot = fullName.indexOf(".");
      if (dot < 1) return err(id, -32602, `Tool names are namespaced, e.g. "parking.tickets_ward_stats". Got: ${fullName}`);
      const namespace = fullName.slice(0, dot);
      const name = fullName.slice(dot + 1);
      const backend = BACKENDS.find((b) => b.namespace === namespace);
      if (!backend) return err(id, -32602, `Unknown namespace "${namespace}"`);
      try {
        const res = await rpc(backend.url, {
          jsonrpc: "2.0",
          id,
          method: "tools/call",
          params: { ...(msg.params ?? {}), name },
        });
        if (res && res.jsonrpc === "2.0" && "id" in res) return res;
        return err(id, -32000, `Bad response from ${namespace} backend`);
      } catch (e) {
        return err(id, -32000, `${namespace} backend unreachable: ${(e as Error).message}`);
      }
    }
    default:
      return err(id, -32601, `Method not found: ${msg.method}`);
  }
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(err(null, -32700, "Parse error"), { status: 400, headers: CORS });
  }
  try {
    if (Array.isArray(body)) {
      const out = (await Promise.all(body.map(handle))).filter((r) => r !== null);
      return NextResponse.json(out, { headers: CORS });
    }
    const out = await handle(body);
    if (out === null) return new NextResponse(null, { status: 202, headers: CORS });
    return NextResponse.json(out, { headers: CORS });
  } catch (e) {
    return NextResponse.json(err(null, -32000, `Federation error: ${(e as Error).message}`), {
      status: 502,
      headers: CORS,
    });
  }
}

export async function GET() {
  return NextResponse.json(
    {
      name: SERVER.name,
      description:
        "Federated Nshipyard MCP server. Tools are namespaced by project: parking.*, city311.*, licences.*, watermains.*, parcels.*, codebooks.*, development.*, geo.*, procurement.*. This endpoint accepts JSON-RPC 2.0 via POST only.",
    },
    { status: 405, headers: CORS }
  );
}

export async function DELETE() {
  return new NextResponse(null, { status: 405, headers: CORS });
}
