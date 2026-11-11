# Itihasa: Painted Epics

The Ramayana and the Mahabharata in 71 paintings, with Samvada, a four-part narrated conversation on Rama, Krishna and dharma. Everything is plain HTML and JavaScript with no libraries; open `index.html` from any static server.

## Paintings (`img/`)

| Folder | Contents | Size |
| --- | --- | --- |
| `img/ramayana/` | 25 landscapes, from Valmiki's first verse to the return to Ayodhya | 2000×860 |
| `img/mahabharata/` | 25 landscapes, from Ganga and Shantanu to the last ascent | 2000×860 |
| `img/rama/` | 8 portraits of Rama | 1200×1800 |
| `img/krishna/` | 8 portraits of Krishna | 1200×1800 |
| `img/krishnaland/` | 5 further Krishna landscapes | 2000×860 |

Titles and captions for each painting are in `ramayana.js`, `mahabharata.js` and `portraits.js`, in the same order as the numbered files.

## Pages

- `index.html`: the gallery, with a full-screen slideshow and a "Repaint live" button that paints a scene again in the browser.
- `podcast.html`: Samvada. Four two-voice episodes with a source shown for every turn. Narration uses the device's speech voices; the tanpura drone is synthesised.

## How the pictures are made

`engine.js` composes each scene from shapes (skies, clouds, mountains, temples, trees, posable figures, animals, chariots, fire) and then repaints it with layered brush strokes that follow the picture's edges. No AI image model is involved.

To render every JPEG again (needs Node and Playwright):

```bash
PLAYWRIGHT_PATH=$(npm root -g)/playwright node scripts/render-epics.mjs all
```

## Sources and caveats

The podcast draws on Valmiki's Ramayana, the Mahabharata and the Bhagavad Gita. References follow the common numbering, which varies between editions, and the English is paraphrase. Check citations against a printed edition before relying on them.
