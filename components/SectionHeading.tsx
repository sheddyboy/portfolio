import { Reveal } from "./Reveal";

export function SectionHeading({ index, title, intro }: { index: string; title: string; intro?: string }) {
  return (
    <Reveal className="mb-8 sm:mb-10">
      <p className="font-mono text-sm text-accent">{index}.</p>
      <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
      <span aria-hidden="true" className="mt-4 block h-px w-24 bg-gradient-to-r from-[var(--a1)] via-[var(--a2)] to-transparent" />
      {intro && <p className="mt-4 max-w-2xl text-muted-foreground">{intro}</p>}
    </Reveal>
  );
}
