# scripts/

Utility scripts for the umbrella site's data files. Each script reads a sibling
project's computed data, aggregates it, and writes a small JSON under
`public/data/` for the `/showcase` page. The outputs are committed so the page
works without a backend.

## build_parking_street_temporal.py

Builds `public/data/parking-street-temporal.json`: a street x day-of-week x hour
ticket matrix for the showcase's flagship use case ("When is the worst time to
park on this street?").

- **Input**: raw monthly files in
  `~/workspace/toronto-parking-tickets-geocoded/data/raw/` (City of Toronto
  Parking Tickets, 6,454,695 tickets 2023-2025), the project's address-point
  match (`data/address_points.parquet`), and its `top_streets.csv`.
- **Method**: the project's own street normalizer
  (`split_address`/`norm_street` from the project's `scripts/build_data.py`:
  house number required, street type abbreviations normalized). Takes the top 20
  ticketed streets, keeps only matched rows, and counts them into a
  street x 7 (Monday=0..Sunday=6, Python `weekday()`) x 24 (hour from the
  infraction timestamp) matrix.
- **Output**: 20 streets, ~1.19M matched tickets, 13,870 bytes (budget: 300KB).
  The script asserts the file stays under budget and that per-street totals are
  consistent with `top_streets.csv`.
- **Slice**: 2023-2025 parking tickets on the 20 most-ticketed streets in
  Toronto. Street totals are the matched (geocoded) rows only.

## housing-built-by-neighbourhood.json and ward-backlog.json

These two `public/data/` files are extracted, not aggregated:

- `housing-built-by-neighbourhood.json`: from
  `~/workspace/toronto-development-pipeline/data/summary.json`
  (`built_by_neighbourhood`: name, units, projects; 141 neighbourhoods).
- `ward-backlog.json`: from
  `~/workspace/toronto-311-taxonomy/data/wards.json` (ward code, name,
  backlog rate, median household income, top request division; 25 wards).

To regenerate, run the extraction snippet in the commit that added them, or
re-derive from the listed source files.
