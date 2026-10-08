import Markdoc, { type RenderableTreeNode } from "@markdoc/markdoc";
import React from "react";

// Renders a Keystatic Markdoc body. Styling lives under .case-study in globals.css.
export function CaseStudy({ body }: { body: RenderableTreeNode }) {
  return <div className="case-study">{Markdoc.renderers.react(body, React)}</div>;
}
