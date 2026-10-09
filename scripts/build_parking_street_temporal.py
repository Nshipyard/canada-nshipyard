#!/usr/bin/env python3
"""Build the per-street ticket temporal matrix for the /showcase parking use case.

Slice: City of Toronto Parking Tickets, monthly files 2023-2025
(data/raw/parking-tickets-20*/Parking_Tags_Data_*.csv in
toronto-parking-tickets-geocoded), the same slice as the project's own
temporal.json / top_streets.csv.

Method (mirrors toronto-parking-tickets-geocoded/scripts/build_data.py):
- street comes from location2 via split_address + norm_street (house number
  required, street-type abbreviations normalized)
- only rows whose (number, street) matches the City's Address Points file are
  counted, so street totals stay consistent with the project's top_streets.csv
- hour from time_of_infraction (HHMM), day of week from date_of_infraction
  (Python weekday(): Monday=0 .. Sunday=6); rows missing either are excluded
  from the matrix only

Output: public/data/parking-street-temporal.json
  { meta: {...}, streets: [ { name, total, matrix: [ [24 hours] x 7 days ] } ] }
for the 20 most-ticketed streets. matrix[dow][hour] = ticket count.
"""

import csv
import datetime
import glob
import json
import os
import re
import sys

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PARK = "/home/hatch/workspace/toronto-parking-tickets-geocoded"
RAW = os.path.join(PARK, "data", "raw")
OUT = os.path.join(BASE, "public", "data", "parking-street-temporal.json")

TYPE_MAP = {
    "STREET": "ST", "AVENUE": "AVE", "BOULEVARD": "BLVD", "DRIVE": "DR",
    "ROAD": "RD", "LANE": "LN", "TRAIL": "TRL", "CRESCENT": "CRES",
    "PLACE": "PL", "COURT": "CT", "TERRACE": "TERR", "PARKWAY": "PKWY",
    "GROVE": "GRV", "SQUARE": "SQ", "CIRCLE": "CIR", "GATE": "GATE",
    "MEWS": "MEWS", "WAY": "WAY", "HILL": "HILL", "PARK": "PK",
    "GARDENS": "GDNS", "QUAY": "QUAY", "ROW": "ROW",
}


def norm_street(s):
    s = s.upper().strip().rstrip(".")
    s = re.sub(r"\s+", " ", s)
    return " ".join(TYPE_MAP.get(p, p) for p in s.split(" "))


def split_address(loc2):
    loc2 = (loc2 or "").upper().strip().rstrip(".")
    m = re.match(r"^(\d+)\s*(?:[A-Z]\s+)?(.+)$", loc2)
    if not m:
        return None, None
    return m.group(1), norm_street(m.group(2))


def main():
    print("loading address points...", flush=True)
    ap = set()
    with open(os.path.join(RAW, "address-points-4326.csv"), newline="") as f:
        for row in csv.DictReader(f):
            num = (row["ADDRESS_NUMBER"] or "").strip()
            if num:
                ap.add((num, norm_street(row["LINEAR_NAME_FULL"] or "")))
    print(f"address points: {len(ap)}", flush=True)

    top = []
    with open(os.path.join(PARK, "data", "top_streets.csv"), newline="") as f:
        for i, row in enumerate(csv.DictReader(f)):
            if i >= 20:
                break
            top.append(row["street"])
    top_set = set(top)
    print("top streets:", ", ".join(top[:5]), "...", flush=True)

    # matrix[street] = [ [24] x 7 ]
    matrix = {s: [[0] * 24 for _ in range(7)] for s in top}
    totals = {s: 0 for s in top}
    matched_rows = 0
    skipped_hour_date = 0

    files = sorted(glob.glob(os.path.join(RAW, "parking-tickets-20*/Parking_Tags_Data_*.csv")))
    print(f"ticket files: {len(files)}", flush=True)

    def norm_rows(fp):
        for enc in ("utf-8-sig", "cp1252"):
            try:
                with open(fp, newline="", encoding=enc) as f:
                    reader = csv.DictReader((ln for ln in f if ln.strip()))
                    if reader.fieldnames:
                        reader.fieldnames = [h.strip().lower() for h in reader.fieldnames]
                    rows = list(reader)
                break
            except UnicodeDecodeError:
                continue
        for row in rows:
            yield {k.strip().lower(): (v or "") for k, v in row.items()}

    for fp in files:
        for row in norm_rows(fp):
            num, street = split_address(row["location2"])
            if num is None or street not in top_set:
                continue
            if (num, street) not in ap:
                continue
            matched_rows += 1
            totals[street] += 1
            tstr = (row["time_of_infraction"] or "").strip()
            date = (row["date_of_infraction"] or "").strip()
            if not (len(tstr) >= 2 and tstr[:2].isdigit() and len(date) == 8):
                skipped_hour_date += 1
                continue
            hour = int(tstr[:2])
            if hour > 23:
                skipped_hour_date += 1
                continue
            try:
                dt = datetime.date(int(date[:4]), int(date[4:6]), int(date[6:8]))
            except ValueError:
                skipped_hour_date += 1
                continue
            matrix[street][dt.weekday()][hour] += 1
        print(f"  done {os.path.basename(fp)}", flush=True)

    cell_sum = sum(sum(sum(d) for d in m) for m in matrix.values())
    print(f"matched rows (top-20 streets): {matched_rows}", flush=True)
    print(f"matrix cells total: {cell_sum}, skipped (bad hour/date): {skipped_hour_date}", flush=True)

    out = {
        "meta": {
            "slice": "City of Toronto Parking Tickets, monthly files 2023-2025 (6,454,695 rows); same slice as toronto-parking-tickets-geocoded temporal.json",
            "method": "street from location2 (house number required, normalized); only address-point-matched rows counted, consistent with top_streets.csv; dow = Python weekday() Monday=0..Sunday=6",
            "built": "2026-10-08",
            "streets": len(top),
        },
        "streets": [
            {"name": s, "total": totals[s], "matrix": matrix[s]} for s in top
        ],
    }
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w") as f:
        json.dump(out, f, separators=(",", ":"))
    size = os.path.getsize(OUT)
    print(f"wrote {OUT} ({size} bytes)", flush=True)
    assert size < 300 * 1024, "output exceeds 300KB budget"
    # spot check: matrix total per street <= top_streets.csv total
    with open(os.path.join(PARK, "data", "top_streets.csv"), newline="") as f:
        ref = {r["street"]: int(r["tickets"]) for r in csv.DictReader(f)}
    for s in top:
        ms = sum(sum(d) for d in matrix[s])
        assert ms <= ref[s], f"{s}: matrix {ms} > top_streets {ref[s]}"
    print("spot checks passed", flush=True)


if __name__ == "__main__":
    main()
