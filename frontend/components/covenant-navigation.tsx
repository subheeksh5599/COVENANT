"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { ChevronRight, Menu, X, Zap, Lock, FileText } from "lucide-react";
import Link from "next/link";

const A = "#ffffff";

function CovenantMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="3" y="3" width="26" height="26" rx="0"
        fill="rgba(255,255,255,0.03)" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.45"/>
      <line x1="3" y1="3" x2="8" y2="3" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.3"/>
      <line x1="3" y1="3" x2="3" y2="8" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.3"/>
      <line x1="29" y1="3" x2="24" y2="3" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.3"/>
      <line x1="29" y1="3" x2="29" y2="8" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.3"/>
      <line x1="3" y1="29" x2="8" y2="29" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.3"/>
      <line x1="3" y1="29" x2="3" y2="24" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.3"/>
      <line x1="29" y1="29" x2="24" y2="29" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.3"/>
      <line x1="29" y1="29" x2="29" y2="24" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.3"/>
      <line x1="10" y1="11" x2="22" y2="11" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>
      <line x1="10" y1="16" x2="22" y2="16" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>
      <line x1="10" y1="21" x2="17" y2="21" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>
    </svg>
  );
}

type MenuKey = "Platform" | "How It Works" | "For Developers" | "About";

const MENU: Record<MenuKey, {
  heading: string;
  cards: { title: string; desc: string; href: string }[]
}> = {
  Platform: {
    heading: "Confidential Computing",
    cards: [
      { title: "TEE Data Rooms", desc: "Seal sensitive documents inside Intel TDX hardware enclaves. Data never leaves the trusted boundary.", href: "/company/upload" },
      { title: "Agent Identity (did:t3n)", desc: "Every agent, analyst, and auditor gets a W3C-compliant decentralized identity bound to cryptographic proof.", href: "/verify" },
      { title: "Immutable Audit Ledger", desc: "Merkle-tree-backed audit trail. Every access, every analysis, every credential — independently verifiable.", href: "/verify" },
      { title: "Cross-Contract Analysis", desc: "Chain multiple WASM contracts inside the TEE for multi-step due diligence pipelines.", href: "/investor/analysis" },
    ],
  },
  "How It Works": {
    heading: "Due Diligence Flow",
    cards: [
      { title: "Seal Documents", desc: "Company uploads P&L, cap table, contracts into TEE-secured KV maps with cryptographic ACL.", href: "/company/upload" },
      { title: "Grant Access", desc: "Scoped, time-bound, cryptographically signed access grants to investor agents via agent-auth-update.", href: "/company/grants" },
      { title: "Confidential Analysis", desc: "Agent runs DCF, ratio analysis, compliance screening inside the TEE. Raw data never enters WASM memory.", href: "/investor/analysis" },
      { title: "Verifiable Credential", desc: "Issue 'Due Diligence Verified' VC on-chain. Any third party can verify without seeing underlying data.", href: "/verify" },
    ],
  },
  "For Developers": {
    heading: "Build on Covenant",
    cards: [
      { title: "T3 Agent Dev Kit", desc: "Quickstart with @terminal3/t3n-sdk. Get did:t3n identity, deploy WASM contracts, run TEE analysis.", href: "https://docs.terminal3.io" },
      { title: "WASM Contract SDK", desc: "Rust → wasm32-wasip2 contracts with http-with-placeholders for last-mile PII resolution in TEE.", href: "https://docs.terminal3.io" },
      { title: "Open Source", desc: "All Covenant contracts and frontend are open source. Audit the analyzer, verify the TEE.", href: "https://github.com" },
      { title: "Design Partner Program", desc: "Top submissions earn invitation to Terminal 3's exclusive co-build program with enterprise partners.", href: "#cta" },
    ],
  },
  About: {
    heading: "Terminal 3 Ecosystem",
    cards: [
      { title: "Terminal 3 Network", desc: "Decentralized TEE infrastructure powering 10M+ profiles. SOC 2 Type II, ISO 27001, GDPR-ready.", href: "https://terminal3.io" },
      { title: "Google Cloud Partner", desc: "Top teams receive $500 in Google Cloud credits. Infrastructure for the next generation of confidential AI.", href: "#cta" },
      { title: "Enterprise Ready", desc: "Built for banks, governments, and institutions. Hardware-secured, cryptographically verifiable, compliance-first.", href: "https://terminal3.io" },
      { title: "DevRel Contact", desc: "Questions? Reach out to devrel@terminal3.io or join the Developer Telegram.", href: "mailto:devrel@terminal3.io" },
    ],
  },
};

const LINKS = Object.keys(MENU) as MenuKey[];

export default function CovenantNavigation() {
  const [active, setActive] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const current = active ? MENU[active] : null;

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 20);
    if (!mobileOpen && !active) {
      setHidden(latest > prev && latest > 80);
    }
  });

  useEffect(() => {
    if (mobileOpen || active) setHidden(false);
  }, [mobileOpen, active]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6 lg:px-8"
      onMouseLeave={() => setActive(null)}
      style={{ fontFamily: "'JetBrains Mono','Fira Code',monospace" }}
      animate={{ y: hidden ? "-120%" : "0%", opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-full pl-2 md:pl-5 pr-2 py-2 flex items-center justify-between gap-2"
        style={{
          background: scrolled ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.35)",
          border: scrolled ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(64px) saturate(220%) brightness(1.1)",
          WebkitBackdropFilter: "blur(64px) saturate(220%) brightness(1.1)",
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.03)"
            : "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
          transition: "background 0.4s, border 0.4s, box-shadow 0.4s",
        }}
      >
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <button
              key={l} type="button"
              onMouseEnter={() => setActive(l)}
              onFocus={() => setActive(l)}
              onClick={() => setActive((a) => (a === l ? null : l))}
              className="text-[11px] tracking-[0.12em] uppercase px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              style={{
                color: active === l ? A : "rgba(255,255,255,0.42)",
                background: active === l ? `${A}08` : "transparent",
              }}
            >
              {l}
            </button>
          ))}
        </div>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-auto">
          <CovenantMark size={22} />
          <span className="text-sm font-bold tracking-[0.22em] uppercase" style={{ color: A }}>
            COVENANT
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/company/upload">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors cursor-pointer"
              style={{ background: A, color: "#000000" }}>
              <Lock className="h-3 w-3" />Enter Data Room
            </motion.button>
          </Link>
        </div>

        <button type="button"
          onClick={() => { setMobileOpen((o) => !o); if (mobileOpen) setActive(null); }}
          aria-label="Toggle menu"
          className="md:hidden inline-flex items-center justify-center h-8 w-8 rounded-full transition-colors cursor-pointer"
          style={{ color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.05)" }}>
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </motion.nav>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div key="mobile" initial={{ opacity: 0, y: -8, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }} className="md:hidden mt-2 rounded-2xl overflow-hidden"
            style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(64px) saturate(220%) brightness(1.08)", WebkitBackdropFilter: "blur(64px) saturate(220%) brightness(1.08)", boxShadow: "0 12px 40px rgba(0,0,0,0.6)" }}>
            <div className="flex flex-col p-2 gap-0.5">
              {LINKS.map((l) => (
                <button key={l} type="button" onClick={() => setActive((a) => (a === l ? null : l))}
                  className="text-left text-[11px] tracking-[0.14em] uppercase rounded-xl px-4 py-3 transition-colors cursor-pointer"
                  style={{ color: active === l ? A : "rgba(255,255,255,0.42)", background: active === l ? `${A}08` : "transparent" }}>{l}</button>
              ))}
              <div className="px-4 py-3 border-t mt-1" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <Link href="/company/upload" className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase" style={{ background: A, color: "#000000" }}>
                  <Lock className="h-3 w-3" />Enter Data Room
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {current && (
          <motion.div key="panel" initial={{ opacity: 0, y: -8, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }} className="mt-2 rounded-2xl overflow-hidden"
            style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(72px) saturate(240%) brightness(1.1)", WebkitBackdropFilter: "blur(72px) saturate(240%) brightness(1.1)", boxShadow: "0 20px 60px rgba(0,0,0,0.65)" }}>
            <div className="p-5 sm:p-7">
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18, ease: "easeOut" }}>
                  <p className="text-[10px] tracking-[0.35em] uppercase mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>{current.heading}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {current.cards.map((c) => (
                      <Link key={c.title} href={c.href} onClick={() => setActive(null)}
                        className="group rounded-none overflow-hidden transition-all duration-200 p-4"
                        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"; }}>
                        <div className="flex items-center gap-1 text-[12px] font-semibold mb-1.5" style={{ color: "rgba(255,255,255,0.82)" }}>
                          {c.title}
                          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" style={{ color: "rgba(255,255,255,0.3)" }}/>
                        </div>
                        <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.28)" }}>{c.desc}</p>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="mt-6 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: A }} />
                  <span className="text-[10px] tracking-[0.22em] uppercase" style={{ color: "rgba(255,255,255,0.18)" }}>T3 Testnet — Live</span>
                </div>
                <Link href="/verify" onClick={() => setActive(null)}>
                  <motion.button whileHover={{ scale: 1.02 }}
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase"
                    style={{ background: "rgba(255,255,255,0.08)", color: A, border: "1px solid rgba(255,255,255,0.15)" }}>
                    <FileText className="h-3 w-3" /> Verify Credentials
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
