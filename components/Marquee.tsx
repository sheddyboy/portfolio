const TINTS = ["bg-pink", "bg-mint", "bg-blue", "bg-orange", "bg-violet"];

// Decorative ticker built from the existing skill names; hidden from assistive tech.
export function Marquee({ items }: { items: string[] }) {
  const list = items.slice(0, 18);
  return (
    <div aria-hidden="true" className="marquee overflow-hidden border-y-[2.5px] border-line bg-yellow py-3 text-ink">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center gap-6 pr-6">
            {list.map((item, i) => (
              <li key={`${copy}-${item}`} className="flex items-center gap-6 font-display text-xl font-extrabold whitespace-nowrap sm:text-2xl">
                {item}
                <span className={`size-4 rotate-45 border-2 border-ink ${TINTS[i % TINTS.length]}`} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
