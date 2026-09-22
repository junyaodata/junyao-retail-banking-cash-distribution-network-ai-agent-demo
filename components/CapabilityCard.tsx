"use client"

import ConceptTooltip from "@/components/ConceptTooltip"
import { getIcon } from "@/lib/icons"
import type { Capability } from "@/lib/site/schema"

/**
 * One of the app's four business lines, as a card with an explanation behind it.
 *
 * The home page and the agent's welcome screen both show these four, at
 * different sizes. One component rather than two so they cannot drift: the
 * previous arrangement had `home.capabilities` and `chat.insights` as separate
 * config, and they had already drifted -- the second thread was "Portfolio
 * Concentration" on the home page and "Portfolio Health" on the agent, with a
 * different icon, and the tooltip existed on one screen and not the other.
 *
 * `title` is a concept name and is therefore unreadable to anyone outside the
 * domain. `subtitle` is the one-line translation; the tooltip is the paragraph
 * behind it, on hover, focus, or tap.
 */
export default function CapabilityCard({
  capability,
  align = "start",
  compact = false,
  layout = "tile",
  className = "",
}: {
  capability: Capability
  /** Which edge the tooltip hangs from while the grid is two columns wide. */
  align?: "start" | "end"
  /** The agent's welcome screen has less room than the home page. */
  compact?: boolean
  /**
   * `tile`: a bordered card, icon over text -- the agent welcome screen's 2x2
   * grid. `row`: a horizontal monitor-board line, icon beside text -- the
   * home page's stacked list. Same data, two readings of it.
   */
  layout?: "tile" | "row"
  className?: string
}) {
  const Icon = getIcon(capability.icon)

  if (layout === "row") {
    return (
      <ConceptTooltip
        text={capability.tooltip}
        align={align}
        // This list sits high on the page, right under the fixed nav -- a
        // bubble opening upward from the first row or two would clip against
        // it. Opening downward is safe at any scroll position.
        side="bottom"
        className={`group flex items-start gap-4 py-4 cursor-help ${className}`}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand/10 border border-brand/25 group-hover:border-brand/50 transition-colors">
          <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="font-display text-sm font-medium text-foreground group-hover:text-brand transition-colors">
            {capability.title}
          </span>
          <span className="block text-xs text-muted-foreground mt-0.5 leading-snug">
            {capability.subtitle}
          </span>
        </span>
      </ConceptTooltip>
    )
  }

  return (
    <ConceptTooltip
      text={capability.tooltip}
      align={align}
      className={`group rounded-xl bg-surface border border-border cursor-help hover:border-brand/50 transition-colors ${
 compact ?"p-4" : "p-5"
      } ${className}`}
    >
      <Icon
        className={`text-brand ${compact ?"w-5 h-5 mb-2" : "w-6 h-6 mb-3"}`}
        aria-hidden="true"
      />
      <p
        className={`font-medium text-foreground ${
 compact ?"text-sm" : "text-sm"
        }`}
      >
        {capability.title}
      </p>
      <p
        className={`text-muted-foreground mt-0.5 leading-snug ${
 compact ?"text-xs" : "text-xs"
        }`}
      >
        {capability.subtitle}
      </p>
      {/* The dashed rule is the only thing telling a reader there is something
          to hover over. Without it the hint is invisible. */}
      <span
        aria-hidden="true"
        className="mt-3 block w-8 border-b border-dashed border-border group-hover:border-brand-light transition-colors"
      />
    </ConceptTooltip>
  )
}
