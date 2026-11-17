"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import SectionHead from "./SectionHead";
import { downloadResume } from "@/lib/resume";
import { stack } from "@/lib/content";

const PROJECTS_TXT =
  "uichemy-awc      brief/figma to site    mcp + chatgpt app\n" +
  "protuno          ai agents for sites    claude, chatgpt, cursor\n" +
  "carbon-blocks    carbon-credit market   web3 payments\n" +
  "project-mgmt     PM + collaboration     react + node\n" +
  "gst-app          ERP tax module         real-time\n" +
  "emergency-id     vehicle detection      machine learning";

function Terminal() {
  const [lines, setLines] = useState([
    {
      html: 'Welcome to urvilOS · type <span class="hl">help</span> to start',
      cls: "dim",
    },
  ]);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  const cmds = useMemo(
    () => ({
      help: () =>
        "commands: <span class='hl'>about</span>, <span class='hl'>projects</span>, <span class='hl'>stack</span>, <span class='hl'>contact</span>, <span class='hl'>resume</span>, <span class='hl'>neofetch</span>, <span class='hl'>cat</span>, <span class='hl'>sudo hire-me</span>, <span class='hl'>clear</span>",
      resume: () => {
        downloadResume();
        return "downloading Urvil-Mehta-Resume.pdf ...";
      },
      about: () =>
        "Urvil Mehta. Software engineer at POSIMYTH. I build backend services, APIs and full products, currently UIChemy's AI Website Creator and Protuno. I care about shipping.",
      whoami: () => "visitor (with excellent taste)",
      projects: () => PROJECTS_TXT,
      stack: () =>
        "Java · Python · TypeScript · SQL · DSA · OOP · System Design · REST APIs · Spring Boot · Hibernate · Node.js · FastAPI · PostgreSQL · MongoDB · Redis · AWS · Docker · CI/CD · React · Next.js · Angular · LLMs + MCP",
      contact: () =>
        "email: <span class='hl'>urvilmehta1324@gmail.com</span> · github: <span class='hl'>github.com/Urvil1401</span> · linkedin: <span class='hl'>/in/urvil-mehta</span>",
      cat: () =>
        "meow. (she's around here somewhere, follow your cursor)",
      neofetch: () =>
        "urvil@portfolio\n----------------------\nOS:       urvilOS\nShell:    this one\nUptime:   2+ years of shipping\nStack:    Java · Python · TypeScript\nTheme:    pixel-dark [lime]\nCPU:      chai-powered",
      "sudo hire-me": () =>
        "[sudo] permission granted ✓\nresume sent to printer... just kidding. type <span class='hl'>resume</span> for the real one",
      clear: () => null,
    }),
    []
  );

  function run(raw) {
    const cmd = raw.trim().toLowerCase();
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    const out = [{ html: `<span class="p">➜&nbsp;</span>${raw}`, cls: "" }];
    if (cmd) {
      const fn = cmds[cmd];
      out.push({
        html: fn
          ? fn()
          : `command not found: ${cmd} · try <span class="hl">help</span>`,
        cls: "dim",
      });
    }
    setLines((l) => [...l, ...out]);
  }

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  return (
    <div className="cell term pixel-cut">
      <div className="term-bar">
        <span className="b"></span>
        <span className="b"></span>
        <span className="b"></span>
        <span style={{ marginLeft: 8 }}>urvil@portfolio: ~</span>
      </div>
      <div
        className="term-body"
        ref={bodyRef}
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((ln, i) => (
          <div
            key={i}
            className={"ln " + ln.cls}
            dangerouslySetInnerHTML={{ __html: ln.html }}
          />
        ))}
        <div className="term-input-row ln">
          <span className="p">➜&nbsp;</span>
          <input
            id="term-input"
            ref={inputRef}
            autoComplete="off"
            spellCheck={false}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                run(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Now() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const tick = () => {
      const t = new Date().toLocaleTimeString("en-IN", {
        hour12: false,
        timeZone: "Asia/Kolkata",
      });
      setTime(t.slice(0, 5));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="cell now pixel-cut">
      <span className="kind">Currently</span>
      <div className="big">
        Building UIChemy
        <br />
        &amp; Protuno
      </div>
      <span className="clock">{time}</span>
      <div className="foot">Ahmedabad, IN · UTC+5:30</div>
    </div>
  );
}

export default function Lab() {
  return (
    <section id="lab">
      <SectionHead label="The Lab" index="02 / 06" />
      <div className="bento reveal">
        <Terminal />
        <Now />
        <div className="cell stack-cell pixel-cut">
          <span className="kind">Stack</span>
          <div className="stack">
            {stack.map((s) => (
              <span key={s} className="chip pixel-cut">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
