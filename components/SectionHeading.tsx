import { Reveal } from "./Reveal";
import { SplitWords } from "./SplitWords";

export function SectionHeading({ index, title, intro }: { index: string; title: string; intro?: string }) {
  return (
    <div className="mb-10 sm:mb-14">
      <Reveal>
        <p className="mono-label flex items-center gap-3 text-accent">
          <span>{index}.</span>
          <span aria-hidden="true" className="h-0.5 flex-1 bg-foreground" />
        </p>
      </Reveal>
      <SplitWords as="h2" text={title} className="display mt-4 text-[clamp(3.25rem,10vw,9rem)]" />
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
