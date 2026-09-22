"use client"

/**
 * The one signature visual on the home page: two traces over the same
 * stretch of time, one smooth and one telling the truth.
 *
 * This is deliberately generic to "a reported figure versus what actually
 * happened" rather than illustrating this dataset's specific numbers. Every
 * dataset this scaffold can hold turns out to share that shape -- a number
 * that gets reported and a number that is true, and a gap between them that
 * does not show up until someone merges the record back together -- so the
 * visual earns its place across a dataset swap instead of going stale with
 * one. No digits are drawn for the same reason `data/` content is not
 * hardcoded into components: a swap would have no reason to find and update
 * a number sitting here.
 *
 * The amber trace draws itself in on mount, the one deliberate motion moment
 * on this page -- everything else here is static.
 */
export default function SignalDivergence() {
  return (
    <div className="relative rounded-2xl border border-border bg-surface/60 px-4 pt-5 pb-4 sm:px-8 sm:pt-7 sm:pb-5 overflow-hidden">
      {/* Faint console gridlines -- atmosphere, not data. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 bottom-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 27px, currentColor 27px, currentColor 28px)",
          color: "#E7ECF5",
        }}
      />

      <div className="relative flex items-center justify-between mb-1">
        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
          What gets reported
        </span>
        <span className="flex items-center gap-2 text-xs text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          What actually happened
        </span>
      </div>

      <svg
        viewBox="0 0 720 200"
        className="relative w-full h-auto"
        role="img"
        aria-label="A smooth reported line stays steady while the real line beneath it drops out repeatedly, illustrating the gap this agent is built to find."
      >
        <defs>
          <linearGradient id="reportedFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="realFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5A623" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Baseline */}
        <line x1="0" y1="176" x2="720" y2="176" stroke="#1E293B" strokeWidth="1" />

        {/* Reported: smooth, unbroken, sits high and never dips -- the
            official record, sanded down to something reassuring. */}
        <path
          d="M0,54 C60,44 120,58 180,48 C240,38 300,52 360,44 C420,36 480,50 540,42 C600,34 660,48 720,40 L720,176 L0,176 Z"
          fill="url(#reportedFill)"
        />
        <path
          d="M0,54 C60,44 120,58 180,48 C240,38 300,52 360,44 C420,36 480,50 540,42 C600,34 660,48 720,40"
          fill="none"
          stroke="#2DD4BF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Real: tracks close to the reported line between incidents, then
            drops hard to near-zero and holds there before recovering -- the
            same network, the moments the reported line never shows. */}
        <path
          d="M0,58 L38,60 L54,168 L78,172 L96,62 L158,56 L178,188 L206,190 L228,64 L338,58 L362,182 L392,186 L418,56 L518,50 L544,172 L572,178 L598,48 L720,42 L720,176 L0,176 Z"
          fill="url(#realFill)"
        />
        <path
          d="M0,58 L38,60 L54,168 L78,172 L96,62 L158,56 L178,188 L206,190 L228,64 L338,58 L362,182 L392,186 L418,56 L518,50 L544,172 L572,178 L598,48 L720,42"
          fill="none"
          stroke="#F5A623"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1000}
          className="signal-divergence-draw"
        />

        {/* A quiet marker at each drop -- where the gap actually lives. */}
        {[
          [66, 170],
          [192, 189],
          [377, 184],
          [558, 175],
        ].map(([cx, cy]) => (
          <circle key={cx} cx={cx} cy={cy} r="3" fill="#F5A623" />
        ))}
      </svg>

      <style>{`
        .signal-divergence-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: signal-divergence-draw 1.4s 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .signal-divergence-draw {
            animation-duration: 0.01s;
          }
        }
        @keyframes signal-divergence-draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  )
}
