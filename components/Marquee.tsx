// Decorative scrolling strip. The same items are listed properly in the Skills section.
export function Marquee({ items }: { items: string[] }) {
  const row = (dup: boolean) => (
    <ul className={`flex shrink-0 items-center ${dup ? "marquee-dup" : ""}`} aria-hidden="true">
      {items.map((item) => (
        <li key={item} className="display flex items-center text-[clamp(2.5rem,7vw,6rem)] whitespace-nowrap">
          {item}
          <span className="mx-[0.5em] text-[0.5em] text-on-accent/70">/</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div aria-hidden="true" className="marquee overflow-hidden border-y-2 border-foreground bg-accent py-3 text-on-accent">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
