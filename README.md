# Itihasa: Painted Epics

The Ramayana and the Mahabharata in 152 pictures, with Samvada, a four-part narrated conversation on Rama, Krishna and dharma. Everything is plain HTML and JavaScript with no libraries; open `index.html` from any static server.

## Paintings (`img/`)

| Folder | Contents | Size |
| --- | --- | --- |
| `img/ramayana/` | 25 landscapes, from Valmiki's first verse to the return to Ayodhya | 2000×860 |
| `img/mahabharata/` | 25 landscapes, from Ganga and Shantanu to the last ascent | 2000×860 |
| `img/rama/` | 8 portraits of Rama | 1200×1800 |
| `img/krishna/` | 8 portraits of Krishna | 1200×1800 |
| `img/krishnaland/` | 5 further Krishna landscapes | 2000×860 |
| `img/posters/` | 50 Ramayana posters of Rama and Sita in four treatments: front-facing colour icons, carved three-ink woodcut registers with banners, blood-red posters, and ember-on-black | mixed, mostly upright |
| `img/manthan/` | 12 scenes of Samudra Manthan, the churning of the ocean of milk, and of Shiva as Neelakantha, following Bhagavata Purana 8.5-12 | 2000×860 and 1200×1800 |
| `img/vishvarupa/` | 4 detailed studies of Krishna's universal form: front-facing, with the many faces, twelve arms and their attributes, and Shesha's seven hoods | 1200×1800 and 2000×860 |
| `img/ramnaam/` | 15 Ramayana pictures written with nothing but the word राम, repeated at five sizes | mixed |

Titles and captions for each painting are in `ramayana.js`, `mahabharata.js`, `portraits.js`, `special.js`, `manthan.js` and `posters.js`, in the same order as the numbered files.

## Pages

- `index.html`: the gallery, with a full-screen slideshow and a "Repaint live" button that paints a scene again in the browser.
- `podcast.html`: Samvada. Four two-voice episodes with a source shown for every turn. Narration uses the device's speech voices; the tanpura drone is synthesised.

- `video.html` and `video/samudra-manthan.mp4`: a two-minute film of the Samudra Manthan story (1920×1080) cut from the paintings, with captions and a synthesised drone, bell and conch. There is no spoken narration. Rebuild it with `PLAYWRIGHT_PATH=$(npm root -g)/playwright node scripts/make-video.mjs` (needs ffmpeg).

## How the pictures are made

`engine.js` composes each scene from shapes (skies, clouds, mountains, temples, trees, posable figures, animals, chariots, fire) and then repaints it with layered brush strokes that follow the picture's edges. No AI image model is involved.

To render every JPEG again (needs Node and Playwright):

```bash
PLAYWRIGHT_PATH=$(npm root -g)/playwright node scripts/render-epics.mjs all
```

The Ram-naam pictures use Noto Serif Devanagari (SIL Open Font License, see `fonts/OFL.txt`).

## Sources and caveats

The podcast draws on Valmiki's Ramayana, the Mahabharata and the Bhagavad Gita. References follow the common numbering, which varies between editions, and the English is paraphrase. Check citations against a printed edition before relying on them.
