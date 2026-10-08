import { Reveal } from "./Reveal";

export function SectionHeading({ index, title, intro }: { index: string; title: string; intro?: string }) {
  return (
    <Reveal className="mb-10">
      <p className="font-mono text-sm text-accent">{index}.</p>
      <h2 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {intro && <p className="mt-3 max-w-2xl text-muted-foreground">{intro}</p>}
    </Reveal>
  );
}
