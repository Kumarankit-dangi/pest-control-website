"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-visible");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  const alignCls = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignCls}`}>
      <span
        className={`inline-flex w-fit items-center gap-2 text-[11px] font-800 font-extrabold uppercase tracking-[0.18em] ${
          dark ? "text-teal-300" : "text-[#0e7c6b]"
        }`}
      >
        <span className={`h-px w-7 ${dark ? "bg-teal-300" : "bg-[#0e7c6b]"}`} aria-hidden />
        {eyebrow}
      </span>
      <h2
        className={`text-balance font-display text-[clamp(1.7rem,4.5vw,2.6rem)] font-semibold leading-[1.08] tracking-tight ${
          dark ? "text-white" : "text-[#0c141d]"
        }`}
        style={{ fontFamily: "Fraunces, Georgia, serif" }}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-[15px] leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>{description}</p>
      )}
    </div>
  );
}
