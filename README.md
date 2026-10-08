# canada.nshipyard.com

Umbrella site for **Nshipyard Canada**: eight open-source projects that clean, join, and publish Toronto's most valuable public datasets.

An open-source civic project. Not affiliated with the Government of Canada or the City of Toronto.

## The eight projects

1. `toronto-geo-concordances` — neighbourhood boundaries joined across census years
2. `toronto-licence-naics` — business licences mapped to NAICS
3. `toronto-watermain-codebook` — pipe codes documented, lead classification added
4. `toronto-parcel-spine` — one stable ID per Toronto property
5. `toronto-311-taxonomy` — versioned 311 request taxonomy
6. `toronto-parking-tickets-geocoded` — 50M tickets, geocoded
7. `toronto-civic-codebooks` — NOC, infraction, procurement code references
8. `toronto-development-pipeline` — normalized housing pipeline feed

Each project gets its own repo under the Nshipyard org and ships five surfaces: explorer UI, showcase chart, REST API + OpenAPI docs, MCP tools over streamable HTTP (`/mcp`), and versioned data releases.

## Develop

```bash
npm install
npm run dev
```

## Deploy

Target: `canada.nshipyard.com`. Point DNS at the hosting target (Vercel recommended) and deploy from this repo.

## Author

**Richardson Dackam** — [X (@richardsondx)](https://x.com/richardsondx) · [GitHub](https://github.com/richardsondx)
