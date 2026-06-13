"use client";
import { useEffect, useState } from "react";

const LINES = [
  ["urvilOS booting", ""],
  ["loading pixels", "OK"],
  ["waking up the cat", "OK"],
  ["starting portfolio", "OK"],
];

export default function Boot() {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timers = [];
    function next() {
      if (i >= LINES.length) {
        timers.push(setTimeout(() => setDone(true), 350));
        return;
      }
      const [txt, ok] = LINES[i++];
      setText(
        (prev) =>
          prev + txt + (ok ? ` <span class="ok">[${ok}]</span>` : " ...") + "\n"
      );
      timers.push(setTimeout(next, 280));
    }
    timers.push(setTimeout(next, 200));
    timers.push(setTimeout(() => setDone(true), 2600)); // hard cap
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      id="boot"
      className={done ? "done" : ""}
      onClick={() => setDone(true)}
    >
      <pre id="boot-text" dangerouslySetInnerHTML={{ __html: text }} />
      <span className="skip">click anywhere to skip</span>
    </div>
  );
}
