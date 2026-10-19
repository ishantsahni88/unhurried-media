#!/usr/bin/env bash
# Build one image for visual QA: every poster in the batch plus 4 frames from each Reel.
# Usage: scripts/contact-sheet.sh content/batches/<batch-id>.json <output.jpg>
set -euo pipefail
cd "$(dirname "$0")/.."
batch="$1"; out="$2"
tmp="$(mktemp -d)"
python3 - "$batch" > "$tmp/list" <<'EOF'
import json, sys
b = json.load(open(sys.argv[1]))
for p in b.get("posters", []): print("P", p["date"])
for r in b.get("reels", []): print("R", r["date"])
EOF
i=0
while read -r kind date; do
  i=$((i+1))
  if [ "$kind" = P ]; then
    convert "media/posters/$date.jpg" -resize 216x288 "$tmp/$(printf %03d $i)-p.jpg"
  else
    j=0
    for t in 3.6 7.5 12.5 18.5; do
      j=$((j+1))
      ffmpeg -y -loglevel error -ss "$t" -i "media/reels/$date.mp4" -frames:v 1 -vf scale=162:288 "$tmp/$(printf %03d $i)-r$j.jpg"
    done
  fi
done < "$tmp/list"
montage "$tmp"/*.jpg -tile 8x -geometry +4+4 -background '#999' "$out"
rm -rf "$tmp"
echo "$out"
