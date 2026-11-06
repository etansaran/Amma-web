"use client";

import { useEffect } from "react";

const SELECTOR = '[data-reveal=""]:not([data-in]), [data-reveal-group]:not([data-in])';

/**
 * One IntersectionObserver for every <Reveal> / <RevealGroup> on the page.
 * Marks elements with `data-in` when they enter the viewport; CSS does the rest.
 * A MutationObserver picks up content added later (route changes, filters, steps).
 */
export function RevealObserver() {
  useEffect(() => {
    const show = (el: Element) => el.setAttribute("data-in", "");

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(SELECTOR).forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Also reveal anything already scrolled past (e.g. after an anchor jump),
          // so scrolling back up never shows content animating in late.
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.01 },
    );

    const scan = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));
    };
    scan();

    let frame = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
}
