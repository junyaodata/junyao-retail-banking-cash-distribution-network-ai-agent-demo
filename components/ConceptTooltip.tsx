"use client"

import { useEffect, useId, useState } from "react"
import type { ReactNode } from "react"

/**
 * Explains a domain term on hover, focus, or tap.
 *
 * These four labels name concepts, and a concept name is only readable by
 * someone who already knows the concept. "Portfolio Concentration" is precise
 * to anyone in lending and opaque to everyone else, which is the wrong way
 * round for a landing page whose whole job is to bring the reader in.
 *
 * Built rather than installed: the app has no tooltip primitive, and one
 * non-interactive hint does not justify a positioning library.
 *
 * Three ways in, on purpose. Hover is the obvious one and the one nobody on a
 * phone or a keyboard can use, so focus and tap open it too, and Escape closes
 * it. The trigger takes `tabIndex={0}` and points at the bubble with
 * `aria-describedby`, which is the ARIA tooltip pattern: the description is
 * announced with the thing it describes rather than stranded somewhere after
 * it in the reading order.
 */
export default function ConceptTooltip({
  text,
  children,
  align = "start",
  side = "top",
  className = "",
}: {
  text: string
  children: ReactNode
  /**
   * Which edge the bubble hangs from while the grid is two columns wide.
   *
   * Centring on the card is right on a wide screen and wrong on a phone: the
   * cards are narrower than the bubble there, so a centred bubble on an outer
   * column runs off the screen. Anchoring it to the card's outer edge keeps it
   * on screen, and above `md` -- where the grid opens to four columns and
   * there is room -- both values fall back to centred.
   */
  align?: "start" | "end"
  /**
   * Which side of the trigger the bubble opens toward. `top` is the default
   * and right for a card sitting well below the fold. A trigger that can sit
   * near the top of the viewport (a stacked list right under the nav, say)
   * needs `bottom`, or the bubble opens upward into the fixed nav bar and
   * gets clipped -- purely a placement choice, not part of the open/close
   * state machine below.
   */
  side?: "top" | "bottom"
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const id = useId()

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <div
      className={`relative ${className}`}
      tabIndex={0}
      aria-describedby={open ? id : undefined}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      // Touch has no hover state, so a tap has to be able to open it.
      onClick={() => setOpen((wasOpen) => !wasOpen)}
    >
      {children}

      {open && (
        <div
          id={id}
          role="tooltip"
          // The bubble must never sit between the pointer and the card, or
          // leaving the card through the bubble would flicker it shut.
          className={`pointer-events-none absolute z-30 w-[min(16rem,calc(100vw-2rem))] rounded-xl bg-muted border border-border p-4 text-left shadow-xl shadow-black/40 md:left-1/2 md:right-auto md:-translate-x-1/2 ${
            side === "bottom" ? "top-full mt-3" : "bottom-full mb-3"
          } ${align === "end" ? "right-0" : "left-0"}`}
        >
          <p className="text-xs leading-relaxed text-foreground/90">{text}</p>
          {/* Caret, a rotated square tucked under the bubble's anchor edge. It
              tracks the bubble's anchor so it keeps pointing at the card. */}
          <span
            aria-hidden="true"
            className={`absolute h-2 w-2 rotate-45 bg-muted md:left-1/2 md:right-auto md:-translate-x-1/2 ${
              side === "bottom"
                ? "bottom-full translate-y-1 border-l border-t border-border"
                : "top-full -translate-y-1 border-r border-b border-border"
            } ${align === "end" ? "right-6" : "left-6"}`}
          />
        </div>
      )}
    </div>
  )
}
