"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

export type HowItWorksStep = {
  title: string;
  copy: string;
  image: string;
  icon: LucideIcon;
};

function Node({
  progress,
  at,
  Icon,
  color,
}: {
  progress: MotionValue<number>;
  at: number;
  Icon: LucideIcon;
  color: string;
}) {
  const start = Math.max(0, at - 0.12);
  const mid = Math.min(1, at + 0.02);
  const scale = useTransform(progress, [start, mid], [0.6, 1]);
  const opacity = useTransform(progress, [start, mid], [0.25, 1]);
  const ringOpacity = useTransform(progress, [start, mid], [0, 1]);
  const [reached, setReached] = useState(false);

  useMotionValueEvent(progress, "change", (v) => {
    setReached(v >= mid - 0.001);
  });

  return (
    <div className="relative grid place-items-center">
      <span
        className="absolute h-14 w-14 rounded-full"
        style={{ background: "#07070d" }}
      />
      <motion.span
        className="absolute h-14 w-14 rounded-full"
        style={{
          opacity: ringOpacity,
          boxShadow: `0 0 0 6px ${color}28`,
        }}
      />
      {reached && (
        <motion.span
          aria-hidden
          className="absolute h-12 w-12 rounded-full"
          style={{ background: color }}
          initial={{ scale: 1, opacity: 0.35 }}
          animate={{ scale: 1.9, opacity: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <motion.span
        style={{
          scale,
          opacity,
          backgroundColor: reached ? color : "rgba(255,255,255,0.06)",
          color: reached ? "#07070d" : "rgba(255,255,255,0.45)",
          border: reached ? "none" : "1px solid rgba(255,255,255,0.1)",
        }}
        transition={{ duration: 0.35 }}
        className="relative grid place-items-center h-12 w-12 rounded-full"
      >
        <Icon className="h-5 w-5" />
      </motion.span>
    </div>
  );
}

function Card({
  step,
  side,
  color,
}: {
  step: HowItWorksStep;
  side: "left" | "right";
  color: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`w-full md:w-[44%] rounded-3xl overflow-hidden ${
        side === "left" ? "md:mr-auto" : "md:ml-auto"
      }`}
      style={{
        background: "rgba(14,14,22,0.92)",
        border: `1px solid rgba(255,255,255,0.07)`,
        backdropFilter: "blur(14px)",
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)`,
      }}
    >
      <div className="p-5 sm:p-7">
        <h3
          className="text-base sm:text-lg font-semibold"
          style={{
            color: "rgba(255,255,255,0.88)",
            fontFamily: "'JetBrains Mono','Fira Code',monospace",
          }}
        >
          {step.title}
        </h3>
        <p
          className="mt-2 text-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.38)" }}
        >
          {step.copy}
        </p>
      </div>
      <div className="px-2 pb-2">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ aspectRatio: "16/10" }}
        >
          <img
            src={step.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
            style={{ filter: "brightness(0.65) saturate(0.7)" }}
          />
        </div>
      </div>
    </motion.article>
  );
}

export default function HowItWorks6({
  steps,
  color = "#00ffaa",
  title = "How it works",
  subtitle,
  label = "How it works",
}: {
  steps: HowItWorksStep[];
  color?: string;
  title?: string;
  subtitle?: string;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const firstNodeRef = useRef<HTMLDivElement>(null);
  const lastNodeRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useMotionValue(0);
  const [lineBounds, setLineBounds] = useState({ top: 0, height: 0 });

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const container = ref.current;
      const first = firstNodeRef.current;
      const last = lastNodeRef.current;
      if (container && first && last) {
        const win = container.ownerDocument.defaultView ?? window;
        const vh =
          win.innerHeight ||
          container.ownerDocument.documentElement.clientHeight;
        const containerRect = container.getBoundingClientRect();
        const firstRect = first.getBoundingClientRect();
        const lastRect = last.getBoundingClientRect();

        const firstCenterY = firstRect.top + firstRect.height / 2;
        const lastCenterY = lastRect.top + lastRect.height / 2;
        const activate = vh * 0.55;
        const span = lastCenterY - firstCenterY;
        if (span > 0) {
          const p = (activate - firstCenterY) / span;
          scrollYProgress.set(Math.min(1, Math.max(0, p)));
        }

        const top = firstCenterY - containerRect.top;
        const height = lastCenterY - firstCenterY;
        setLineBounds((prev) =>
          prev.top === top && prev.height === height ? prev : { top, height }
        );
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scrollYProgress]);

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      className="relative w-full flex items-start py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: "#07070d",
        borderTop: "1px solid #1a1a24",
        fontFamily: "'JetBrains Mono','Fira Code',monospace",
      }}
    >
      <div className="relative max-w-[1200px] mx-auto w-full flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-[10px] tracking-[0.4em] uppercase"
          style={{ color: `${color}55` }}
        >
          {label}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-6 text-3xl sm:text-5xl md:text-6xl font-medium text-center tracking-tight leading-[1.05] max-w-2xl"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 max-w-sm text-center text-sm"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            {subtitle}
          </motion.p>
        )}

        <div ref={ref} className="relative mt-20 sm:mt-28 w-full">
          {/* dashed track */}
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 w-px border-l border-dashed"
            style={{
              top: lineBounds.top,
              height: lineBounds.height,
              borderColor: "rgba(255,255,255,0.08)",
            }}
          />
          {/* animated fill */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 w-px"
            style={{
              top: lineBounds.top,
              height: lineBounds.height,
              scaleY: lineScale,
              transformOrigin: "top",
              background: `linear-gradient(to bottom, ${color}, ${color}44)`,
            }}
          />

          <div className="flex flex-col gap-16 sm:gap-24">
            {steps.map((step, i) => {
              const side: "left" | "right" = i % 2 === 0 ? "left" : "right";
              const at = i / Math.max(1, steps.length - 1);
              const isFirst = i === 0;
              const isLast = i === steps.length - 1;
              return (
                <div
                  key={step.title}
                  className="relative flex flex-col items-center"
                >
                  <div
                    ref={
                      isFirst
                        ? firstNodeRef
                        : isLast
                        ? lastNodeRef
                        : undefined
                    }
                    className="relative z-10"
                  >
                    <Node
                      progress={scrollYProgress}
                      at={at}
                      Icon={step.icon}
                      color={color}
                    />
                  </div>
                  <div className="mt-8 w-full flex">
                    <Card step={step} side={side} color={color} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
