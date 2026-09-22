"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github, Menu, X } from "lucide-react"

/** One entry in the top bar. */
interface NavItem {
  label: string
  href: string
}

const GITHUB_URL =
  "https://github.com/junyaodata/junyao-retail-banking-cash-distribution-network-ai-agent-demo"

/**
 * The bar is the same on every page, and its two entries are the app's two
 * pages. Not authored copy: a dataset swap rewrites what the app is about,
 * not how many pages it has.
 */
const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Chat", href: "/chat" },
]

export default function Navigation({
  items = DEFAULT_NAV_ITEMS,
  logoPrefix,
  logoAccent,
}: {
  items?: NavItem[]
  /** The wordmark, split so the two halves can be coloured differently. */
  logoPrefix: string
  logoAccent: string
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-foreground hover:opacity-90 transition-opacity"
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-brand shadow-[0_0_8px_theme(colors.brand.DEFAULT)]"
            />
            <span className="font-display text-xl font-semibold tracking-tight">
              {logoPrefix}
              <span className="text-accent">{logoAccent}</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {items.map((item) => {
              const active = isActive(item.href)
              const isChat = item.href === "/chat"

              if (isChat) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-medium text-sm px-5 py-2 bg-brand text-brand-foreground rounded-lg hover:bg-brand-light transition-colors cursor-pointer"
                  >
                    Start Chat
                  </Link>
                )
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    font-medium text-sm transition-colors cursor-pointer
                    ${active
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  {item.label}
                </Link>
              )
            })}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source on GitHub"
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Github size={20} />
            </a>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="py-4 space-y-2">
              {items.map((item) => {
                const active = isActive(item.href)
                const isChat = item.href === "/chat"

                if (isChat) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block font-medium text-base py-3 px-4 bg-brand text-brand-foreground text-center rounded-lg mx-4 cursor-pointer"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Start Chat
                    </Link>
                  )
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      block font-medium text-base py-3 px-4 transition-colors cursor-pointer
                      ${active
                        ? "text-accent"
                        : "text-muted-foreground hover:text-foreground"
                      }
                    `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-medium text-base py-3 px-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                <Github size={18} />
                GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
