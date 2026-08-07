# SoulHause design rules

Locked template and color system for format pages. Do not add per-page layout experiments.

## Page template (4 beats)

Every format page uses the same structure:

| Beat | Section | Required | Purpose |
|------|---------|----------|---------|
| 1 | **Stage** | Yes | Tag, title, lede, one CTA |
| 2 | **Beats** | Yes | Three numbered moments (what happens) |
| 3 | **Note** | No | One optional paragraph for people who want more |
| 4 | **Paths** | Nav | Other nights live in the main nav — not duplicated on the page |

Then footer. No breadcrumbs, card grids, left rails, or bottom CTA bands.

**Component map:** `FormatPage.tsx` / `MembershipPage.tsx` → `format-stage` → `format-beats` → `format-note` (if `story.note`) → `Footer`

**Copy rule:** Stage lede + three beats must stand alone. If someone scrolls past beats, they already know what the night is. The note is bonus depth only.

## Color (one house, different rooms)

Same foundation on every route. Accent and atmosphere shift per room.

| Room | `data-format` | Accent | Wash |
|------|---------------|--------|------|
| Sessions | `sessions` | Logo sun gold `#f4be3c` | Light gold |
| Workshops | `workshops` | Logo green dark `#3d6656` | Stronger green |
| Hause of Soul | `hause-of-soul` | Sun terracotta `#cc5d33` | Warm gold (strongest) |
| Membership | `membership` | Logo green | Light green |

**Always:**
- Canvas = stone neutrals (shared site atmosphere)
- Primary CTAs = sun brick `#b04a28` only
- Sun gradient = wordmark spotlight only

**Never:**
- Full page recolors or tier colors per format
- Brick/orange on headings, cards, or decorative UI
- Sun gradient on body copy or large surfaces

CSS lives in `app/globals.css` under “Format pages”. Change accents only via `--format-accent` and `--format-wash` on `.format-page[data-format="…"]`.

## Hause of Soul (flagship)

The product is the happy hour. This page should be the clearest:

- Warmest atmosphere wash
- RSVP on Luma as primary CTA (not Follow)
- Shortest copy: lede + beats only, no note
- Event date visible in stage meta

## UX

- **One primary CTA in the stage only** — never duplicate at the bottom
- **Hause of Soul** → RSVP on Luma (join gate) · only hard RSVP page
- **Sessions / Workshops** → Follow on Luma (direct link, no join gate)
- **Membership** → RSVP to Hause of Soul first; email notify is secondary text only
- Test every change at **390px width**
- Motion: atmosphere parallax + scroll reveal; respect `prefers-reduced-motion`

## Do not

- Add a second CTA section at the bottom
- Use mailto / notify as the primary hero action when RSVP exists
- Make users scroll past the stage before they know what to do
- Sell membership on `/os` before pointing people to a night
