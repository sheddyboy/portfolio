import Markdoc, { Tag, type RenderableTreeNode } from "@markdoc/markdoc";
import React from "react";
import { Reveal } from "./Reveal";

const BADGES = ["bg-pink", "bg-yellow", "bg-mint", "bg-blue", "bg-orange"];

// Renders a Keystatic Markdoc body as a stack of numbered sticker cards, one per H2.
// Styling for the prose lives under .case-study in globals.css.
export function CaseStudy({ body }: { body: RenderableTreeNode }) {
  if (!Tag.isTag(body)) return <div className="case-study">{Markdoc.renderers.react(body, React)}</div>;

  const groups: RenderableTreeNode[][] = [];
  for (const child of body.children) {
    if (Tag.isTag(child) && child.name === "h2") groups.push([child]);
    else if (groups.length) groups[groups.length - 1].push(child);
    else groups.push([child]);
  }

  return (
    <div className="space-y-8">
      {groups.map((group, i) => (
        <Reveal key={i}>
          <section className="sticker relative p-6 pt-9 sm:p-8 sm:pt-10">
            <span
              aria-hidden="true"
              className={`sticker-sm absolute -top-5 left-6 grid size-11 -rotate-6 place-items-center rounded-xl font-display text-lg font-extrabold text-ink ${BADGES[i % BADGES.length]}`}
            >
              {i + 1}
            </span>
            <div className="case-study">{Markdoc.renderers.react(new Tag("div", {}, group), React)}</div>
          </section>
        </Reveal>
      ))}
    </div>
  );
}
