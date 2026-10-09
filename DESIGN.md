# Cinematic redesign

**Concept:** a brutalist, type-led film-title sequence. Huge condensed headlines, hard 2px rules, one sharp accent, and every project played as a full scroll chapter.

## Palette
- Dark (default): bg `#0a0a0a`, fg `#f2efe8`, muted `#a3a09a`, accent `#ff4d1c` (about 6:1 on bg), text on accent `#0a0a0a`.
- Light: bg `#f2efe8`, fg `#0a0a0a`, muted `#55524b`, accent `#c42800` (about 5.1:1 on bg), text on accent `#f2efe8`.
- One accent only; the theme toggle swaps the token set.

## Type
- Display: Anton (uppercase, tight leading, clamp sizes up to 21rem) for headlines and numerals.
- Body: Archivo. Labels, tags, buttons: JetBrains Mono, uppercase, wide tracking. All via `next/font`.

## Layout
- 96rem wrapper, full-bleed rules, 12-column chapter grid: sticky outlined numeral left, story right.
- Mobile first; chapters collapse to a single column.

## Animation (motion library only)
- Load: hero name slides up from masks, then headline and actions fade in.
- Scroll: word-mask headline reveals, clip-path image wipes with parallax, pinned bio that lights up word by word, count-up stats, accent marquee.
- Micro: magnetic buttons, trailing cursor ring with a "View" state on chapters, inverting buttons and tags, accent curtain wipe between pages.
- Fine pointer only (`hover: hover` and `pointer: fine`) for cursor and magnetic; the native cursor is never hidden.
- Reduced motion: no pinning (CSS), no marquee motion, no parallax, no cursor or magnetic, transforms off via `MotionConfig`.

## Signals
Confident, opinionated craft: someone who sweats details and can ship polished front ends, while the case-study chapters keep the engineering substance (problem, how it works, results) front and centre.
