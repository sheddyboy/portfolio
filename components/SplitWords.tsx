"use client";

import { motion } from "motion/react";
import { Fragment, type ElementType } from "react";

const word = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

// Each word slides up out of a mask. Plays on scroll into view, or at once with `immediate`.
export function SplitWords({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const words = text.split(" ");
  const trigger = immediate
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "0px 0px -12% 0px" } };
  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        transition={{ staggerChildren: stagger, delayChildren: delay }}
        {...trigger}
      >
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="inline-block overflow-hidden pt-[0.06em] pb-[0.1em] align-bottom">
              <motion.span variants={word} className="inline-block">
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}
