"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"

import BusinessContextModal from "@/components/BusinessContextModal"
import CapabilityCard from "@/components/CapabilityCard"
import SignalDivergence from "./SignalDivergence"
import type { SiteConfig } from "@/lib/site/schema"

export default function Hero({
  site,
  businessContext,
}: {
  site: SiteConfig
  /** Raw Markdown of `data/business-context.md`, read on the server. */
  businessContext: string
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [contextOpen, setContextOpen] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const { home, capabilities } = site

  return (
    <section className="relative min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* One deliberate lighting moment, not a decoration repeated per section:
          a quiet glow behind the headline, like a console backlight. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-brand/10 blur-[120px]"
      />

      <div
        className={`relative max-w-6xl mx-auto w-full transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Headline first, full width -- the plain-English claim before
            anything else. */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-5">
          <span className="text-foreground">{home.headline.prefix}</span>
          <span className="text-brand">{home.headline.accent}</span>
        </h1>

        <p className="text-xl sm:text-2xl text-muted-foreground mb-6 max-w-2xl">
          {home.tagline}
        </p>

        <div className="w-16 h-1 bg-accent rounded mb-8" />

        {/* The one signature visual: what gets reported versus what actually
            happened. This is the whole product in one glance, before a
            single word of explanation. */}
        <div className="mb-10">
          <SignalDivergence />
        </div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-10 items-start">
          {/* Left: the plain-language explanation and the way in */}
          <div>
            <p className="text-lg text-foreground/80 mb-6 leading-relaxed max-w-xl">
              {home.description}
            </p>

            {/* One paragraph cannot carry a whole business domain; this opens the
                two or three screens that can. */}
            <button
              type="button"
              onClick={() => setContextOpen(true)}
              className="group inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full text-sm font-medium bg-surface text-muted-foreground border border-border hover:border-brand/50 hover:text-brand transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              {home.businessContext.triggerLabel}
            </button>

            {/* CTA Button */}
            <Link
              href="/chat"
              className="group flex items-center justify-between w-full max-w-xl p-6 bg-surface border border-border rounded-2xl hover:border-brand/50 hover:shadow-[0_0_0_1px_theme(colors.brand.DEFAULT),0_8px_30px_-12px_theme(colors.brand.DEFAULT)] transition-all duration-200 cursor-pointer"
            >
              <div>
                <h3 className="font-display text-2xl sm:text-3xl text-foreground mb-1">
                  {home.cta.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {home.cta.subtitle}
                </p>
              </div>
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-background border border-border group-hover:bg-brand group-hover:border-brand transition-colors shrink-0 ml-4">
                <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-brand-foreground group-hover:translate-x-1 transition-all" />
              </div>
            </Link>

            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {home.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-1.5 text-sm rounded-full bg-surface text-muted-foreground border border-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right: the four things this agent watches, as a monitor board
              rather than a card grid -- these are parallel lenses on one
              network, not a sequence, so a list reads truer than a timeline. */}
          <div>
            <div className="rounded-2xl border border-border bg-surface/50 px-5 divide-y divide-border">
              {capabilities.map((cap, index) => (
                <CapabilityCard
                  key={cap.title}
                  capability={cap}
                  layout="row"
                  align={index % 2 === 0 ? "start" : "end"}
                />
              ))}
            </div>

            {/* The dataset this board is actually reading. */}
            <p className="mt-4 px-1 text-xs font-mono text-muted-foreground/80">
              {home.blurb}
            </p>
          </div>
        </div>
      </div>

      <BusinessContextModal
        open={contextOpen}
        onClose={() => setContextOpen(false)}
        labels={home.businessContext}
        markdown={businessContext}
      />
    </section>
  )
}
