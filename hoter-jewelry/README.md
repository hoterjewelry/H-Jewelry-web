# Hoter Jewelry — Website

A bilingual (English/Hebrew) landing page for Hoter Jewelry, showing past work by
category (earrings, necklaces, rings, fixing, silver polishing), with a "story"
view for each piece.

## Project structure

```
hoter-jewelry/
├── index.html              → page markup (structure only, no content)
├── css/
│   └── styles.css          → all styling
├── js/
│   ├── i18n.js              → all site text, English + Hebrew, in one place
│   ├── data.js               → loads content/projects.json
│   └── main.js                → rendering, filtering, language toggle, story modal
├── content/
│   └── projects.json          → EVERY photo + its title + its story. Edit this
│                                 file to add, remove, or change a project.
└── images/
    ├── earrings/
    ├── necklaces/
    ├── rings/
    ├── fixing/
    └── silver/
```

## How to add a new project (new photo + story)

1. **Add the photo.** Drop the image file into the matching folder under
   `images/`, e.g. `images/rings/ruby-signet-ring.jpg`. Use a short,
   descriptive, lowercase filename with hyphens (no spaces).

2. **Add an entry to `content/projects.json`.** Open that file in any text
   editor and copy one existing entry as a template, then edit the fields:

   ```json
   {
     "id": "ruby-signet-ring",
     "category": "rings",
     "image": "images/rings/ruby-signet-ring.jpg",
     "date": "2026-07-01",
     "title": { "en": "Ruby Signet Ring", "he": "טבעת חותם אודם" },
     "story": {
       "en": "A short paragraph about this piece — the stone, the client, what made it interesting.",
       "he": "פסקה קצרה על התכשיט — האבן, הלקוח, מה שהפך אותו למעניין."
     }
   }
   ```

   - `id` — unique, no spaces (used internally, not shown to visitors)
   - `category` — must be exactly one of: `earrings`, `necklaces`, `rings`, `fixing`, `silver`
   - `image` — the path you used in step 1
   - `title` / `story` — shown in both languages depending on the toggle

3. **Save and re-deploy.** On a static host like Vercel or Netlify, this
   usually means committing the change to the connected GitHub repo (once
   that's set up) — the site rebuilds automatically.

If a listed image file is missing or hasn't been uploaded yet, the site
automatically falls back to showing the project's title as placeholder text
instead of a broken image, so nothing looks broken while photos are still
being gathered.

## Editing site text (not tied to a specific project)

All labels, headings, and footer/contact text live in `js/i18n.js`, with an
`en` block and a matching `he` block. Change the value on the right of each
`key: 'value'` line — the key itself should stay as-is.

## Running locally

Because `index.html` loads `content/projects.json` via `fetch()`, opening the
file directly by double-clicking it won't load the gallery (browsers block
local file fetches for security). Instead, run a tiny local server from the
project folder:

```
# Python 3
python3 -m http.server 8000

# then open:
http://localhost:8000
```

Vercel and Netlify serve files this way automatically, so this is only
needed for previewing on your own computer.

## Next steps (not done yet)

- Real photos in `images/`
- Real contact details in `js/i18n.js` (currently `[Phone number]`, etc.)
- A GitHub repo + Vercel/Netlify deployment
- Eventually: a CMS (e.g. Decap CMS or Sanity) so your client can add new
  projects through a simple web form instead of editing `projects.json`
  directly
