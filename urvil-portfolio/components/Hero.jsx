"use client";
import { useTypewriter } from "@/hooks/useTypewriter";
import { downloadResume } from "@/lib/resume";
import { typerWords } from "@/lib/content";

export default function Hero() {
  const typed = useTypewriter(typerWords);

  return (
    <section className="hero">
      <div className="status">
        <span className="dot"></span> AVAILABLE FOR WORK · IND
      </div>
      <h1 className="reveal">
        Hey, I&apos;m <span className="accent">Urvil</span>.
      </h1>
      <div className="typer-line">
        $ whoami → <span className="typed">{typed}</span>
        <span className="caret"></span>
      </div>
      <p className="lede reveal">
        Software engineer building <strong>AI-powered products</strong>{" "}
        end-to-end — from <strong>system design</strong> to{" "}
        <strong>pixel-perfect UI</strong> to the boring-but-critical parts
        nobody sees.
      </p>
      <div className="actions reveal">
        <a className="btn pixel-cut" href="#projects">
          See my work
        </a>
        <button className="btn ghost pixel-cut" onClick={downloadResume}>
          Resume ↓
        </button>
      </div>
    </section>
  );
}
