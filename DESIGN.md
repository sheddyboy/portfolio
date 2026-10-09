# Bento Glass redesign

## Concept
Everything is a frosted glass panel floating on a dark charcoal field lit by slow aurora glows. Content is arranged as an asymmetric bento grid, so a recruiter can scan the cells in under a minute and an engineer can drill into the case study cells.

## Palette
- Dark (default): background #141518 (charcoal, not black), text #eef0f3, muted text #a9aebb (about 8:1 on the background), accent mint #7ee8cf, aurora stops mint, violet #a78bfa, pink #f0abfc.
- Light: background #e9ebf0, text #12141a, muted #454b5a, accent teal #0d6b61 (above 5.5:1 on white glass).
- Glass: 4.5% to 55% white fill, 20px backdrop blur, 1px hairline ring, inset top highlight.
- Grain: fractal-noise SVG overlay at 6 to 9 percent opacity.
All tokens are CSS variables in app/globals.css; the existing theme toggle swaps the `.light` and `.dark` classes.

## Type
- Display: Bricolage Grotesque (headings, big numerals, gradient name).
- Body: DM Sans.
- Mono: JetBrains Mono (labels, tags, stack). All through next/font.

## Layout
- 6 or 12 column bento grids with varied spans: projects (4+2, 2+4, 3+3, odd last full width), skills (4/8, 7/5, 4/4/4), experience (odd first job full width), case study sections (2+4, 3+3, full width).
- Hero is a bento of its own: identity cell, graph and links cell, four stat cells.
- Floating pill header with scroll progress line. Mobile first; grids collapse to one or two columns.

## Animation (motion library)
- Load sequence: header drops in, hero cells stagger in, name reveals word by word, stats count up.
- Scroll: every cell reveals with a staggered rise and scale.
- Hover: cursor spotlight, mouse-only 3D tilt (springs), rotating aurora gradient border (CSS @property), button lift, image zoom.
- Filter tabs use a shared-layout pill; cards animate layout on filter.
- Page transitions: app/(site)/template.tsx remounts per navigation and eases the page in.
- Reduced motion: MotionConfig reducedMotion="user" removes transforms, tilt is off, CSS stops animations and transitions, counters show final values.

## Signals
Polished front-end craft and motion literacy for a full-stack engineer moving to AI, plus restraint: one idea, applied the same way on home, case studies, resume and the 404 and error states.
