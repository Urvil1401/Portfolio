"use client";
import { useEffect, useRef } from "react";
import SectionHead from "./SectionHead";
import { stats } from "@/lib/content";

function Stat({ end, label }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          const dur = 1200,
            t0 = performance.now();
          (function run(t) {
            const p = Math.min(1, (t - t0) / dur);
            node.textContent = Math.floor(
              end * (1 - Math.pow(1 - p, 3))
            ).toLocaleString();
            if (p < 1) requestAnimationFrame(run);
            else node.textContent = end.toLocaleString() + (end === 9999 ? "+" : "");
          })(t0);
        });
      },
      { threshold: 0.5 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [end]);

  return (
    <div className="stat pixel-cut">
      <span className="num" ref={ref}>
        0
      </span>
      <span className="lbl">{label}</span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about">
      <SectionHead label="About" index="01 / 06" />
      <div className="story reveal">
        <p>
          Most engineers pick a lane. <strong>I picked the whole road.</strong>
        </p>
        <p>
          Right now I&apos;m building <strong>SproutOS</strong> — an AI-powered
          website builder — end-to-end on Next.js, TypeScript &amp; MongoDB.
          Along the way I&apos;ve shipped real-time dashboards, ERP modules, and
          Web3 apps. I care about <strong>shipping</strong>, not just writing
          code.
        </p>
      </div>
      <div className="stats reveal" style={{ marginTop: 56 }}>
        {stats.map((s) => (
          <Stat key={s.label} end={s.count} label={s.label} />
        ))}
      </div>
    </section>
  );
}
