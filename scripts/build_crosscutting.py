#!/usr/bin/env python3
"""Build cross-cutting showcase aggregates joining the 9 Toronto civic-data projects.

Every number produced here traces to a processed data file in one of the
project repos (never data/raw of the umbrella). Outputs go to
~/workspace/canada-nshipyard/public/data/cross-*.json.

Joins:
 1. growth-vs-pipes:    pipeline homes built (by 158 neighbourhood) x watermain
                        age share (spatial join of segments to neighbourhoods)
 2. pipes-vs-water311:  watermain age share (by ward) x Toronto Water 311
                        requests (by ward)
 3. enforcement:        parking tickets by ward, normalized per km2
 4. service-wait:       311 division backlog rates + ward backlog (repackaged)
 5. open-business:      licences by ward x parking tickets x pipeline projects
 6. construction-tickets: pipeline projects x parking tickets (by 158 nbhd)
 7. builders-vs-vendors: top construction procurement vendors + pipeline scale
                        (exploratory: pipeline.csv carries no builder names)
"""
import csv, json, math
from collections import defaultdict
from shapely.geometry import shape, Point
from shapely.strtree import STRtree

WS = "/home/hatch/workspace"
OUT = WS + "/canada-nshipyard/public/data"

def load_json(p):
    with open(p) as f: return json.load(f)

# ---------- polygons ----------
hoods = load_json(WS + "/toronto-geo-concordances/data/neighbourhoods_158_simple.geojson")["features"]
hood_polys = [(f["properties"]["code"], f["properties"]["name"], shape(f["geometry"])) for f in hoods]
hood_tree = STRtree([p for _, _, p in hood_polys])

def parse_geojson_csv(path):
    """The watermain 'geojson' raws are actually CSV with a JSON geometry column."""
    feats = []
    with open(path, newline="") as f:
        for r in csv.DictReader(f):
            try:
                g = json.loads(r["geometry"])
                coords = g["coordinates"]
                feats.append((r, coords))
            except Exception:
                pass
    return feats

wards_raw = load_json(WS + "/toronto-watermain-codebook/data/raw/wards25.geojson")["features"]
ward_polys = []
for f in wards_raw:
    p = f["properties"]
    ward_polys.append((str(int(p["AREA_SHORT_CODE"])), p["AREA_NAME"], shape(f["geometry"])))
ward_tree = STRtree([p for _, _, p in ward_polys])
# area in km2 via equirectangular approx at 43.7N: 1 deg lat = 111.2km, 1 deg lon = 80.32km
ward_area = {code: poly.area * 111.2 * 80.32 for code, _, poly in ward_polys}

def locate(trees, pt):
    for tree, items in trees:
        for i in tree.query(pt):
            code, name, poly = items[i]
            if poly.contains(pt):
                return code, name
    return None, None

print("loading watermain segments...")
segs = parse_geojson_csv(WS + "/toronto-watermain-codebook/data/raw/distribution.geojson")
segs += parse_geojson_csv(WS + "/toronto-watermain-codebook/data/raw/transmission.geojson")
print("segments:", len(segs))

# aggregate pipe length by neighbourhood and ward; pre-1955 flag is an AGE PROXY only
hood_pipe = defaultdict(lambda: [0.0, 0.0, 0.0])   # code -> [total_km, pre1955_km, unknown_km]
ward_pipe = defaultdict(lambda: [0.0, 0.0, 0.0])
trees = [(hood_tree, hood_polys), (ward_tree, ward_polys)]
for r, coords in segs:
    try:
        mid = coords[len(coords)//2]
        pt = Point(mid[0], mid[1])
    except Exception:
        continue
    try: length_km = float(r.get("Watermain Measured Length") or 0) / 1000.0
    except Exception: continue
    yr = (r.get("Watermain Construction Year") or "").strip()
    try: y = int(float(yr))
    except Exception: y = None
    hc, _ = locate([(hood_tree, hood_polys)], pt)
    wc, _ = locate([(ward_tree, ward_polys)], pt)
    for agg, code in ((hood_pipe, hc), (ward_pipe, wc)):
        if not code: continue
        agg[code][0] += length_km
        if y is None: agg[code][2] += length_km
        elif y < 1955: agg[code][1] += length_km
print("hoods with pipe:", len(hood_pipe), "wards with pipe:", len(ward_pipe))

# ---------- 1. growth vs pipes ----------
housing = {n["name"]: n["units"] for n in load_json(WS + "/canada-nshipyard/public/data/housing-built-by-neighbourhood.json")["neighbourhoods"]}
grows = []
for code, name, _ in hood_polys:
    tot, pre, unk = hood_pipe.get(code, [0,0,0])
    share = pre/tot if tot else None
    grows.append({"code": code, "name": name, "homes_built": housing.get(name),
                  "pipe_km": round(tot,2), "pre1955_km": round(pre,2),
                  "pre1955_share": round(share,4) if share is not None else None})
city_pre = sum(v[1] for v in hood_pipe.values()); city_tot = sum(v[0] for v in hood_pipe.values())
city_share = city_pre/city_tot
pairs = [(g["homes_built"], g["pre1955_share"]) for g in grows if g["homes_built"] and g["pre1955_share"] is not None]
def pearson(pairs):
    n = len(pairs); mx = sum(x for x,_ in pairs)/n; my = sum(y for _,y in pairs)/n
    num = sum((x-mx)*(y-my) for x,y in pairs); dx = math.sqrt(sum((x-mx)**2 for x,_ in pairs)); dy = math.sqrt(sum((y-my)**2 for _,y in pairs))
    return num/(dx*dy) if dx and dy else None
corr1 = pearson(pairs)
top10 = sorted([g for g in grows if g["homes_built"]], key=lambda g: -g["homes_built"])[:10]
top10_share = sum(g["pre1955_km"] for g in top10)/sum(g["pipe_km"] for g in top10)
json.dump({"meta": {"built": "2026-10-08",
  "sources": ["toronto-development-pipeline (124,326 net homes in Built projects)",
              "toronto-watermain-codebook (49,414 segments, construction year)"],
  "method": "each watermain segment assigned to the 158 neighbourhood containing its midpoint; pre-1955 share = km of pipe with construction year < 1955 / total km with known year. Pre-1955 is an AGE PROXY for pipe vintage, never a lead measurement.",
  "citywide_pre1955_share": round(city_share,4),
  "top10_growth_neighbourhoods_pre1955_share": round(top10_share,4),
  "correlation_homes_vs_pre1955_share": round(corr1,3) if corr1 else None,
  "n_neighbourhoods": len(pairs)},
  "neighbourhoods": grows},
  open(OUT + "/cross-growth-vs-pipes.json","w"), ensure_ascii=False)
print("card1: corr homes vs pre1955 share =", round(corr1,3), "| top10 share =", round(top10_share,3), "| city =", round(city_share,3))

# ---------- 2. pipes vs water 311 ----------
wards311 = {}
for w in load_json(WS + "/toronto-311-taxonomy/data/wards.json"):
    try: wards311[str(int(w["ward_code"]))] = w
    except Exception: continue  # 'UNK' bucket has no geography
def water_count(w):
    for d in w.get("division_mix", []):
        if d["division"] == "Toronto Water": return d["count"]
    return 0
wrows = []
for code, name, _ in ward_polys:
    tot, pre, unk = ward_pipe.get(code, [0,0,0])
    share = pre/tot if tot else None
    w311 = wards311.get(str(int(code)), {})
    wc = water_count(w311)
    wrows.append({"code": str(int(code)), "name": name, "pipe_km": round(tot,2),
                  "pre1955_share": round(share,4) if share is not None else None,
                  "water_311_requests": wc,
                  "water_per_pipe_km": round(wc/tot,1) if tot else None})
pairs2 = [(w["pre1955_share"], w["water_per_pipe_km"]) for w in wrows if w["pre1955_share"] is not None and w["water_per_pipe_km"]]
corr2 = pearson(pairs2)
json.dump({"meta": {"built": "2026-10-08",
  "sources": ["toronto-watermain-codebook", "toronto-311-taxonomy (Toronto Water division requests by ward, 2022-2026)"],
  "method": "segments assigned to wards by midpoint; water requests = Toronto Water division counts per ward from division_mix. Correlation is across wards, not proof of causation at the pipe level.",
  "correlation_pre1955_share_vs_water_per_km": round(corr2,3) if corr2 else None},
  "wards": wrows},
  open(OUT + "/cross-pipes-vs-water311.json","w"), ensure_ascii=False)
print("card2: corr pre1955 share vs water req/km =", round(corr2,3))

# ---------- 3. enforcement ----------
tix = list(csv.DictReader(open(WS + "/toronto-parking-tickets-geocoded/data/tickets_by_ward.csv")))
erows = []
for r in tix:
    code = str(int(r["ward"])); t = int(r["tickets"]); area = ward_area.get(code)
    erows.append({"code": code, "name": r["ward_name"], "tickets": t,
                  "area_km2": round(area,1) if area else None,
                  "tickets_per_km2": round(t/area) if area else None,
                  "share": round(t/sum(int(x["tickets"]) for x in tix),4)})
erows.sort(key=lambda r: -(r["tickets_per_km2"] or 0))
total_tix = sum(int(r["tickets"]) for r in tix)
json.dump({"meta": {"built": "2026-10-08",
  "sources": ["toronto-parking-tickets-geocoded (6,454,695 tickets, 2023-2025)"],
  "method": "ward areas computed from ward polygons (equirectangular approx at 43.7N). Density normalizes for ward size; it does not normalize for curb supply or traffic volume, which are not published.",
  "total_tickets": total_tix, "top_density_ward": erows[0]["name"], "top_density": erows[0]["tickets_per_km2"]},
  "wards": erows},
  open(OUT + "/cross-enforcement.json","w"), ensure_ascii=False)
print("card3: top density:", erows[0]["name"], erows[0]["tickets_per_km2"], "/km2; top count:", max(erows, key=lambda r: r["tickets"])["name"])

# ---------- 4. service wait ----------
s311 = load_json(WS + "/toronto-311-taxonomy/data/summary.json")
divs = [d for d in s311["backlog_by_division"] if "backlog_rate" in d]
wb = load_json(WS + "/canada-nshipyard/public/data/ward-backlog.json")["wards"]
json.dump({"meta": {"built": "2026-10-08",
  "sources": ["toronto-311-taxonomy (2,225,151 requests 2022-2026; backlog = 2022-2024 requests still open in Oct 2026 extract)"],
  "note": "Backlog is a proxy: the source publishes no completion dates, so still-open older requests stand in for backlog."},
  "divisions": [{"division": d["division"], "backlog_rate": d["backlog_rate"], "backlog_open": d["backlog_open"], "backlog_base": d["backlog_base"]} for d in divs],
  "wards": wb},
  open(OUT + "/cross-service-wait.json","w"), ensure_ascii=False)
print("card4: divisions:", len(divs), "wards:", len(wb))

# ---------- 5. open a business ----------
lic_map = {}
for r in csv.DictReader(open(WS + "/toronto-licence-naics/data/licence_to_naics.csv")):
    lic_map[r["licence_category"]] = (r["sector_code"], r["sector_title"])
lic_idx = load_json(WS + "/toronto-licence-naics/data/licences_index.json")
lic_by_ward = defaultdict(list)
no_ward = 0
for r in lic_idx:
    w = (r.get("w") or "").strip()
    if not w: no_ward += 1; continue
    lic_by_ward[str(int(w))].append(r.get("c",""))
pipe_rows = list(csv.DictReader(open(WS + "/toronto-development-pipeline/data/pipeline.csv")))
proj_by_ward = defaultdict(lambda: [0,0])
for r in pipe_rows:
    w = r["ward"].strip()
    if r["status"] in ("active","proposed"):
        proj_by_ward[w][0] += 1
        try: proj_by_ward[w][1] += int(float(r["proposed_units"] or 0))
        except Exception: pass
tix_by_ward = {str(int(r["ward"])): int(r["tickets"]) for r in tix}
brows = []
for code, name, _ in ward_polys:
    cats = lic_by_ward.get(str(int(code)), [])
    secs = defaultdict(int)
    for c in cats:
        sc = lic_map.get(c)
        if sc and sc[0]: secs[(sc[0], sc[1])] += 1
    top = sorted(secs.items(), key=lambda kv: -kv[1])[:3]
    np_, nu = proj_by_ward.get(str(int(code)), [0,0])
    brows.append({"code": str(int(code)), "name": name, "active_licences": len(cats),
                  "top_sectors": [{"code": k[0], "title": k[1], "count": v} for (k,v) in top],
                  "parking_tickets": tix_by_ward.get(str(int(code))),
                  "pipeline_projects": np_, "pipeline_units": nu})
json.dump({"meta": {"built": "2026-10-08",
  "sources": ["toronto-licence-naics (37,469 active)", "toronto-parking-tickets-geocoded", "toronto-development-pipeline (2,391 projects)"],
  "method": "licences joined to NAICS sectors via licence_to_naics on category; ward from licence record. Parking tickets are a foot-traffic and curb-activity proxy, not a direct measure of customers.",
  "licences_without_ward": no_ward},
  "wards": brows},
  open(OUT + "/cross-open-business.json","w"), ensure_ascii=False)
print("card5: wards:", len(brows), "licences without ward:", no_ward)

# ---------- 6. construction vs tickets ----------
hood_tix = {r["hood_158"]: int(r["tickets"]) for r in csv.DictReader(open(WS + "/toronto-parking-tickets-geocoded/data/tickets_by_neighbourhood158.csv"))}
proj_by_hood = defaultdict(int)
for r in pipe_rows:
    if r["status"] in ("active","proposed"):
        proj_by_hood[r["neighbourhood_158_code"]] += 1
crows = []
for code, name, _ in hood_polys:
    crows.append({"code": code, "name": name, "projects": proj_by_hood.get(code, 0),
                  "tickets": hood_tix.get(code)})
pairs6 = [(c["projects"], c["tickets"]) for c in crows if c["tickets"]]
corr6 = pearson(pairs6)
json.dump({"meta": {"built": "2026-10-08",
  "sources": ["toronto-development-pipeline (active+proposed projects by 158 neighbourhood)", "toronto-parking-tickets-geocoded (tickets by 158 neighbourhood, 2023-2025)"],
  "method": "neighbourhood-level correlation. Both variables concentrate downtown, so a positive correlation does not show construction causes tickets; it is presented as correlation with the confounder named.",
  "correlation_projects_vs_tickets": round(corr6,3) if corr6 else None},
  "neighbourhoods": crows},
  open(OUT + "/cross-construction-tickets.json","w"), ensure_ascii=False)
print("card6: corr projects vs tickets =", round(corr6,3))

# ---------- 7. builders vs vendors (exploratory) ----------
vendors = load_json(WS + "/toronto-procurement-spending/data/vendors_index.json")
constr = [v for v in vendors if any("Construction" in k for k in v.get("cats", {}))]
constr.sort(key=lambda v: -v["s"])
json.dump({"meta": {"built": "2026-10-08",
  "sources": ["toronto-procurement-spending (4,082 canonical vendors, $21.5B)", "toronto-development-pipeline (2,391 projects, 803,206 pipeline homes)"],
  "method": "top vendors whose award categories include Construction Services, by spend. ENTITY MATCH NOT PERFORMED: pipeline.csv publishes no builder/developer names (columns: id, address, ward, neighbourhood, status, units, dates, lon/lat), so vendor-to-builder matching is impossible from open data today. This card states what each side shows and names the missing field.",
  "missing": "builder/developer names in the open development-pipeline file",
  "pipeline_projects": len(pipe_rows)},
  "top_construction_vendors": [{"name": v["n"], "spend": v["s"], "awards": v["a"]} for v in constr[:15]]},
  open(OUT + "/cross-builders-vs-vendors.json","w"), ensure_ascii=False)
print("card7: construction vendors:", len(constr), "top:", constr[0]["n"], constr[0]["s"])
print("DONE")
