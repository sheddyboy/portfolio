import Markdoc, { type RenderableTreeNode, type Tag } from "@markdoc/markdoc";
import React from "react";
import { Glass } from "./Glass";

// Spans on a 6-column grid: pairs of 2+4 and 3+3; an odd leftover goes full width.
const PAIRS = [[2, 4], [3, 3]];
const SPAN_CLASS: Record<number, string> = {
  6: "lg:col-span-6",
  4: "lg:col-span-4",
  3: "lg:col-span-3",
  2: "lg:col-span-2",
};

const isTag = (n: RenderableTreeNode): n is Tag => typeof n === "object" && n !== null && "name" in n;

// Splits a Keystatic Markdoc body at each H2 and lays the sections out as bento cards.
// Styling of the prose lives under .case-study in globals.css.
export function CaseStudy({ body }: { body: RenderableTreeNode }) {
  if (!isTag(body)) return <div className="case-study">{Markdoc.renderers.react(body, React)}</div>;

  const sections: RenderableTreeNode[][] = [];
  for (const child of body.children) {
    if (isTag(child) && child.name === "h2") sections.push([child]);
    else if (sections.length === 0) sections.push([child]);
    else sections[sections.length - 1].push(child);
  }
  const n = sections.length;

  return (
    <div className="grid gap-4 lg:grid-cols-6">
      {sections.map((children, i) => {
        const span = i === n - 1 && n % 2 === 1 ? 6 : PAIRS[Math.floor(i / 2) % PAIRS.length][i % 2];
        const node = { ...body, name: "div", children } as Tag;
        return (
          <div key={i} className={SPAN_CLASS[span]}>
            <Glass delay={(i % 2) * 0.08} className="h-full p-6 sm:p-8">
              <p aria-hidden="true" className="mb-4 font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <div className="case-study">{Markdoc.renderers.react(node, React)}</div>
            </Glass>
          </div>
        );
      })}
    </div>
  );
}
