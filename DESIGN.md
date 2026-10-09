# Playful redesign

Concept: sticker-book portfolio. Everything is a thick-outlined sticker with a hard offset shadow, stuck on a dotted cream page. Bright, bouncy, but laid out with a plain hierarchy so the key facts read fast.

## Palette
- Fills (same in both themes, always with ink text): pink #FF5C9A, yellow #FFD43B, blue #5B86FF, mint #3DDBB0, orange #FF8A3D, violet #A68BFF, ink #1B1030.
- Light: background cream #FFF6E5, card white, text #1B1030, muted text #4B4066, links and accent text #5B2EDB (about 8:1 on cream).
- Dark: background #140E25, card #1F1636, text cream, muted text #C3B8DF, accent text #B9A2FF, outlines lavender #CBBDF3.
- Light is the default unless the OS prefers dark; the toggle persists the choice.

## Type
- Display: Bricolage Grotesque (headings, numbers, stickers). Body: Figtree. Code and labels: JetBrains Mono. All via next/font.

## Layout
- Single 72rem column, mobile first. Hero: text left, a googly-eyed mascot right (below the CTAs on mobile), then four coloured stat tiles. A skills ticker separates hero from projects. Sections are numbered stickers with a self-drawing underline.
- Case studies render each H2 block of the existing body as a numbered sticker card (problem, approach, result flow).

## Motion
- motion library with spring physics throughout, MotionConfig reducedMotion="user" plus a CSS reduced-motion block.
- Page load: colour-bar wipe (CSS, replays on every route change), bouncing letters in the name, staggered hero, stat count-up.
- Scroll: spring reveals, drawn underlines, parallax shapes, scroll progress bar, timeline rail that fills.
- Hover and click: letters hop, tiles tilt, chips jiggle, buttons lift and press, mascot jumps with confetti, nav pill slides between links.
- Cursor: spring ring that grows over links and shrinks over inputs, plus click sparks; fine pointers only and off for reduced motion.
- 404: giant 4-0-4 where the zero is a draggable, googly-eyed character that springs back, spins and throws confetti when poked.

## What it signals
Approachable, energetic, detail-oriented; the polish and the clear hierarchy show front-end craft without hiding the credentials.
