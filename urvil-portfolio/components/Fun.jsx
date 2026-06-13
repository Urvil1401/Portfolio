"use client";
import { useState } from "react";
import SectionHead from "./SectionHead";

export default function Fun() {
  const [chip, setChip] = useState("🥔");

  return (
    <section id="fun">
      <SectionHead label="Fun" index="05 / 06" />
      <div className="fun-quote pixel-cut reveal">
        <span
          className="chips"
          title="click me"
          onClick={() => setChip((c) => (c === "🥔" ? "✨" : "🥔"))}
        >
          {chip}
        </span>
        <blockquote>
          &quot;I&apos;ll take a potato chip…{" "}
          <span className="accent">and eat it!&quot;</span>
        </blockquote>
        <cite>— Light Yagami, Death Note</cite>
        <p className="caption">*me, deploying to prod on a Friday*</p>
      </div>
    </section>
  );
}
