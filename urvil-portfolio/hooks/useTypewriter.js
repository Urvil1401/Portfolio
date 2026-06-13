"use client";
import { useEffect, useState } from "react";

export function useTypewriter(words) {
  const [text, setText] = useState("");

  useEffect(() => {
    let w = 0,
      c = 0,
      del = false,
      timer;
    function tick() {
      const word = words[w];
      c += del ? -1 : 1;
      setText(word.slice(0, c));
      let wait = del ? 40 : 80;
      if (!del && c === word.length) {
        wait = 1600;
        del = true;
      } else if (del && c === 0) {
        del = false;
        w = (w + 1) % words.length;
        wait = 300;
      }
      timer = setTimeout(tick, wait);
    }
    tick();
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return text;
}
