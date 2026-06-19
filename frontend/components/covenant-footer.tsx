"use client";

import { motion } from "motion/react";

const A = "#ffffff";

function CovenantMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="3" y="3" width="26" height="26" rx="0" fill="rgba(255,255,255,0.03)" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.45"/>
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

const socials = [
  { key: "x", href: "https://x.com/terminal3_xyz", icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  )},
  { key: "gh", href: "https://github.com/Terminal-3", icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.645.35-1.085.636-1.335-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
  )},
  { key: "li", href: "https://linkedin.com/company/terminal3", icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 111 0 5 2.5 2.5 0 010-5zM3 9h4v12H3zm7 0h3.8v1.7h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.78 2.66 4.78 6.12V21h-4v-5.5c0-1.3-.02-3-1.83-3s-2.11 1.43-2.11 2.9V21h-4z"/></svg>
  )},
];

const cols = [
  { title: "Platform", links: [
    { label: "Data Rooms", href: "/company/upload" },
    { label: "Agent Identity", href: "/verify" },
    { label: "Audit Trail", href: "/verify" },
    { label: "VC Issuance", href: "/verify" },
  ]},
  { title: "Developers", links: [
    { label: "T3 Agent Dev Kit", href: "https://docs.terminal3.io" },
    { label: "WASM Contracts", href: "https://docs.terminal3.io" },
    { label: "API Reference", href: "https://docs.terminal3.io" },
    { label: "GitHub", href: "https://github.com/Terminal-3" },
  ]},
  { title: "Terminal 3", links: [
    { label: "About", href: "https://terminal3.io" },
    { label: "Blog", href: "https://blog.terminal3.io" },
    { label: "Design Partner", badge: "invite-only", href: "#cta" },
    { label: "Contact", href: "mailto:devrel@terminal3.io" },
  ]},
] as const;

export default function CovenantFooter() {
  return (
    <footer className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 overflow-hidden"
      style={{ background: "#000000", borderTop: "1px solid #111111", fontFamily: "'JetBrains Mono','Fira Code',monospace" }}>
      <div className="relative max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10 lg:gap-12">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }} className="flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <CovenantMark size={22} />
              <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>COVENANT</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              Confidential multi-agent due diligence on Terminal 3. TEE-secured data rooms, verifiable agent identity, immutable audit trails.
            </p>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center transition-colors duration-200"
                  style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.28)", background: "rgba(255,255,255,0.02)", borderRadius: 0 }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = A; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)" }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.28)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)" }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {cols.map((col, ci) => (
            <motion.div key={col.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 + ci * 0.05 }} className="flex flex-col gap-3 lg:border-t lg:pt-5" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>{col.title}</h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => {
                  const badge = "badge" in link ? link.badge : undefined;
                  return (
                    <li key={link.label} className="flex items-center gap-2">
                      <a href={link.href} className="text-sm transition-colors duration-200" style={{ color: "rgba(255,255,255,0.28)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}>{link.label}</a>
                      {badge && (
                        <span className="px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase font-bold"
                          style={{ background: "rgba(255,255,255,0.08)", color: A, border: "1px solid rgba(255,255,255,0.15)", borderRadius: 0 }}>{badge}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="relative mt-20 w-full select-none" aria-hidden="true"
          style={{ fontSize: "min(14.2vw, 210px)", height: "0.74em",
            maskImage: "linear-gradient(to bottom, rgba(255,255,255,0.06) 0%, transparent 90%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(255,255,255,0.06) 0%, transparent 90%)" }}>
          <div className="absolute inset-0 flex justify-center font-black uppercase leading-none whitespace-nowrap"
            style={{ fontSize: "inherit", letterSpacing: "0.18em", paddingLeft: "0.18em", color: "transparent",
              textShadow: "0 -1.5px 0 rgba(255,255,255,0.25), 1.5px 0 0 rgba(255,255,255,0.25), 0 1.5px 0 rgba(255,255,255,0.25), -1.5px 0 0 rgba(255,255,255,0.25)",
              fontFamily: "inherit" }}>
            COVENANT
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-[10px] tracking-wider" style={{ color: "rgba(255,255,255,0.15)" }}>&copy; 2026 COVENANT &middot; Built for Terminal 3 Bounty</p>
          <div className="flex items-center gap-5">
            {["Security", "Privacy", "Auditability"].map((item) => (
              <a key={item} href="#" className="text-[10px] tracking-wider transition-colors duration-200" style={{ color: "rgba(255,255,255,0.15)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.15)")}>{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 animate-pulse" style={{ background: A }} />
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.12)" }}>T3 Testnet &middot; Intel TDX</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
