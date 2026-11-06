"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useMotionPreference } from "@/components/motion/MotionProvider";

type Props = {
  /** Changes whenever the visible panel changes (e.g. the step index). */
  stepKey: string | number;
  /** 1 = moving forward, -1 = going back. */
  direction?: 1 | -1;
  children: ReactNode;
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const variants = {
  enter: (d: number) => ({ opacity: 0, x: 28 * d }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: -20 * d }),
};

/**
 * Slide-and-fade between the panels of a multi-step flow.
 * Renders a plain div when motion is off so the panel is never hidden.
 */
export function StepTransition({ stepKey, direction = 1, children, className }: Props) {
  const { enabled } = useMotionPreference();
  if (!enabled) return <div className={className}>{children}</div>;
  return (
    <AnimatePresence mode="wait" initial={false} custom={direction}>
      <motion.div
        key={stepKey}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.32, ease: EASE }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
