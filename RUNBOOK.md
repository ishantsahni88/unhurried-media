# Unhurried autopilot: weekly runbook

This file is the full instruction set for the weekly scheduled run. Each run is a fresh session
with no memory, so everything it needs is here.

**Goal:** @unhurried_daily always has posts queued in Metricool **21 days ahead**:
- a **quote poster every evening at 7:45 PM** (Toronto time)
- a **Reel every other day at 12:30 PM**

Each run fills the gap between the end of the current queue and today + 21 days.

## Fixed facts

| Thing | Value |
|---|---|
| Instagram | @unhurried_daily |
| Metricool brand (blogId) | `7195689` |
| Timezone | `America/Toronto` |
| Repo | `ishantsahni88/unhurried-media` (public; media is served from raw.githubusercontent.com) |
| Public media URL | `https://raw.githubusercontent.com/ishantsahni88/unhurried-media/main/<path>` |
| Poster template | Remotion composition `quote-poster` (1080×1440) |
| Reel template | Remotion composition `unhurried-full-reel` (1080×1920, 27 s) |

## Hard rules

1. **Never delete or edit posts already in Metricool.** Only add new ones. If something looks wrong in the existing queue, report it and leave it alone.
2. **Never repeat content.** Every poster quote and every Reel line must be new: not in `content/ledger.json`, not a light rewording of something in it, and not the same core idea as anything posted in the last 60 days.
3. **Push media to GitHub before scheduling.** Metricool fetches the file from the public URL, so the file must exist first. Check that the URL returns HTTP 200.
4. **Stop and report instead of guessing** if Metricool isn't connected, the GitHub push fails, or a render fails twice.
5. **No duplicates.** Before creating any post, check Metricool doesn't already have a post of that type on that date.

## Voice and content rules

- Calm, warm, plain words. Short sentences. Second person ("you"). No exclamation marks.
- Themes: rest, slowing down, presence, breath, self-kindness, boundaries, small daily rituals, seasons and nature, letting things be unfinished.
- Original lines only. Never quote or paraphrase a real person, book or song. No attributions.
- No medical, therapy or mental-health claims ("cures anxiety", "heals trauma"), and no religious content. Nothing that sounds like advice to stop treatment.
- Follow the season: late autumn means shorter days and slowing down, winter means rest and warmth, spring means beginnings, and so on.
- Poster quote: **at most 52 characters** (ideally under 43). One complete thought.
- Reel lines (the `props`):
  - `s1`: at most 26 characters (clock scene)
  - `s2`: at most 30 characters (sunrise scene, appears word by word)
  - `s3a`, `s3b`: at most 22 characters each (leaf scene)
  - `s4`: exactly 3 lines; the first two at most 22 characters, the third one or two words (breathing scene)
  - `s5a`: the "hurried" phrase, `s5b`: its calm opposite; at most 18 characters each
  - The Reel should hang together as one small idea, not seven random lines.

## Captions

**Poster caption**
```
<quote>

<one or two sentences expanding the quote, concrete and gentle>

<CTA>
.
<hashtag set>
```
Rotate CTAs in this order, continuing from the last poster in the ledger:
1. `Save this for the day you need it 🌿`
2. `Send this to someone who needs to slow down 🌿`
3. `Which line do you need most today? 🌿`
4. `Follow @unhurried_daily for one quiet thought a day 🌿`

Rotate hashtag sets:
- A: `#unhurried #slowliving #mindfulness #mindfulnessquotes #innerpeace #calmmind #gentlereminder #selfcare`
- B: `#unhurried #mindfulliving #slowdown #peacefulmind #restisproductive #mentalwellbeing #quietmoments #selfcompassion`
- C: `#unhurried #mindfulness #breathe #presentmoment #calm #slowlife #dailyreminder #wellbeing`

**Reel caption**
```
<s1> <s2>

<s3a> <s3b>
<s4 joined with spaces>

Watch it once more, slowly 🌿
Follow @unhurried_daily for one quiet thought a day.
.
#unhurried #mindfulness #slowliving #breathe #calm #reels #mindfulmoments #selfcare
```

## Steps

### 1. Set up
- Add the repo with push access (`add_repo` owner `ishantsahni88`, repo `unhurried-media`), clone it to `/home/claude/unhurried-media`, and `cd` there.
- Metricool `getBrandSettings` must show brand `7195689` with `instagramData: unhurried_daily`. If not, stop and report.

### 2. Find the gap
- `getScheduledPosts` for brand `7195689`, timezone `America/Toronto`, from today to today + 35 days.
- Last poster date = latest date with an Instagram `POST` at 19:45. Last Reel date = latest date with a `REEL`.
- If the queue is empty (it ran out), start from tomorrow.
- Poster dates needed: every day from (last poster date + 1) to (today + 21).
- Reel dates needed: (last Reel date + 2), (+4), … while ≤ today + 21. If there's no Reel in the queue, start the day after the last poster in the queue, or tomorrow.
- If nothing is needed, report "queue already full through <date>" and stop.

### 3. Learn from what worked
- `getAnalyticsAvailableMetrics`, then `getAnalyticsDataByMetrics` for Instagram posts over the last 30 days.
- Rank posts by saves + shares (reach as tie-breaker). Note the top 3 and bottom 3 themes.
- Lean the new batch toward the top themes (about half the new items), but keep variety.
- If analytics aren't available yet (too new or not enough data), skip this step and note it.

### 4. Write the batch
Write `content/batches/<today>.json`:
```json
{
  "id": "<today>",
  "posters": [{"date": "YYYY-MM-DD", "quote": "...", "caption": "..."}],
  "reels": [{"date": "YYYY-MM-DD", "props": {"s1": "", "s2": "", "s3a": "", "s3b": "", "s4": ["", "", ""], "s5a": "", "s5b": ""}, "caption": "..."}]
}
```
Before rendering, check every item against the ledger and the length limits with a short script. Fix anything that fails.

### 5. Render
```
node scripts/render.mjs content/batches/<today>.json
```
This installs the factory's dependencies on first use and skips files that already exist.

### 6. Check the output by eye
```
scripts/contact-sheet.sh content/batches/<today>.json /tmp/sheet.jpg
```
Open the image and check that no text is clipped, crowded or wrapped onto a lonely single word, and that nothing overlaps the divider or the sprig. To fix one, change the text in the batch file, delete that file from `media/`, and re-render.

### 7. Publish media to GitHub
```
git add media content/batches
git commit -m "Unhurried batch <today>: <n> posters, <m> Reels"
git push origin main
```
Then `curl -sI` one poster URL and one Reel URL and confirm HTTP 200.

### 8. Schedule in Metricool
For each item use `createScheduledPost` with `blogId` `7195689`:
- `date`: ISO with the correct Toronto offset for that day (use Python `zoneinfo`; daylight saving changes the offset).
- `publicationDate`: `{"dateTime": "YYYY-MM-DDTHH:MM:00", "timezone": "America/Toronto"}`
- `providers`: `[{"network": "instagram"}]`, `autoPublish`: true, `draft`: false
- **Poster:** time 19:45, `media`: [poster URL], `mediaAltText`: [quote], `instagramData`: `{"type": "POST", "isAiGenerated": false}`
- **Reel:** time 12:30, `media`: [Reel URL], `videoCoverMilliseconds`: 3500, `instagramData`: `{"type": "REEL", "showReelOnFeed": true, "isAiGenerated": false}`
- Schedule one item first and confirm the response shows a `static.metricool.com` media URL before doing the rest.

### 9. Verify
- `getScheduledPosts` over the new range. Every new date has exactly one poster, Reel dates have exactly one Reel, and there are no duplicates.

### 10. Record and tidy
- Append every new poster and Reel to `content/ledger.json` (`date`, `quote` or `props`, `source: "batch-<today>"`).
- Delete files in `media/` dated more than 60 days ago (Metricool keeps its own copy once scheduled).
- Commit and push.

### 11. Report
Send a short message (with `SendUserMessage`):
- how many posters and Reels were added, and the queue's new end date
- the top 3 posts from the analytics step, and what the new batch leaned into
- anything that went wrong or needs a decision
Keep it to a few lines.
