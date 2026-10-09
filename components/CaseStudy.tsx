import Markdoc, { type RenderableTreeNode } from "@markdoc/markdoc";
import React from "react";
import { Reveal } from "./Reveal";

const isTag = (n: RenderableTreeNode): n is Extract<RenderableTreeNode, { name: string }> =>
  typeof n === "object" && n !== null && !Array.isArray(n) && "name" in n;

const textOf = (n: RenderableTreeNode): string =>
  typeof n === "string" ? n : isTag(n) ? n.children.map(textOf).join("") : "";

// Renders a Keystatic Markdoc body as numbered chapters: each h2 becomes a sticky
// outlined numeral and heading beside its content. Styling lives under .case-study.
export function CaseStudy({ body }: { body: RenderableTreeNode }) {
  const children = isTag(body) ? body.children : [body];
  const groups: { title: string | null; nodes: RenderableTreeNode[] }[] = [];
  for (const node of children) {
    if (isTag(node) && node.name === "h2") groups.push({ title: textOf(node), nodes: [] });
    else {
      if (groups.length === 0) groups.push({ title: null, nodes: [] });
      groups[groups.length - 1].nodes.push(node);
    }
  }

  return (
    <div>
      {groups.map((g, i) => (
        <section key={i} className="grid gap-6 border-t-2 border-foreground py-12 lg:grid-cols-12 lg:gap-12 lg:py-20">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <p aria-hidden="true" className="display outline-text text-[clamp(4rem,10vw,9rem)] leading-[0.85]">
                {String(i + 1).padStart(2, "0")}
              </p>
              {g.title && <h2 className="display mt-4 text-[clamp(2rem,4.5vw,4rem)]">{g.title}</h2>}
            </div>
          </div>
          <Reveal className="case-study lg:col-span-7">{Markdoc.renderers.react(g.nodes, React)}</Reveal>
        </section>
      ))}
    </div>
  );
}
