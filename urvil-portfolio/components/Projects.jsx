"use client";
import { useRef } from "react";
import SectionHead from "./SectionHead";
import { projects } from "@/lib/content";

function Card({ kind, title, desc, metricValue, metricText, href }) {
  const ref = useRef(null);

  function onMove(e) {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = node.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    node.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  }
  function onLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  const inner = (
    <>
      {href && <span className="arrow">↗</span>}
      <span className="kind">{kind}</span>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="metric">
        → <b>{metricValue}</b> {metricText}
      </div>
    </>
  );

  const sharedProps = {
    className: "card pixel-cut reveal tilt",
    ref,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
  };

  // No href yet → render a non-navigating div (still tilts + styled identically).
  if (!href) return <div {...sharedProps}>{inner}</div>;

  const external = href.startsWith("http");
  return (
    <a
      {...sharedProps}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {inner}
    </a>
  );
}

export default function Projects() {
  return (
    <section id="projects">
      <SectionHead label="Selected Work" index="04 / 06" />
      <div className="cards">
        {projects.map((p) => (
          <Card key={p.title} {...p} />
        ))}
      </div>
    </section>
  );
}
