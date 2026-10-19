# unhurried-media

Media and autopilot for the **@unhurried_daily** Instagram page.

- `RUNBOOK.md`: what the weekly scheduled run does, step by step, with all rules
- `factory/`: Remotion project that renders the quote posters and calm Reels (free, local rendering)
- `scripts/render.mjs`: renders a batch file into `media/`
- `scripts/contact-sheet.sh`: one image of a whole batch for a visual check
- `content/ledger.json`: every quote and Reel ever scheduled, so nothing repeats
- `content/batches/`: one JSON file per weekly batch
- `media/`: rendered posters and Reels that Metricool pulls from (pruned after 60 days)
- `reels/`: the first 15 Reels (Oct 15 – Nov 12, 2026)

The repo is public because Metricool fetches media from raw.githubusercontent.com links.
Fonts: Instrument Serif, Montserrat and Lora are under the SIL Open Font License.
