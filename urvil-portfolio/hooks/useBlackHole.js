"use client";
import { useEffect } from "react";

// Click the black hole → collapse the whole page into the singularity,
// then release it back. Block-level sections vanish whole; the hero and
// contact headings dissolve letter-by-letter.
export function useBlackHole(holeRef) {
  useEffect(() => {
    const hole = holeRef.current;
    if (!hole) return;
    const main = document.querySelector("main");
    if (!main) return;
    const nav = document.querySelector("header.nav");
    const footer = document.querySelector("footer");
    const heroEl = document.querySelector("section.hero");
    const contactEl = document.querySelector("#contact");

    let busy = false;
    const DUR = 540; // per-unit vanish duration
    const BLOCK_GAP = 200; // gap between block pieces
    const CHAR_GAP = 30; // gap between letters (fast, one-by-one)

    function wrapChars(node, out) {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === 3) {
          const text = child.textContent.replace(/\s+/g, " ");
          if (!text) {
            child.remove();
            return;
          }
          const frag = document.createDocumentFragment();
          for (const ch of text) {
            const s = document.createElement("span");
            s.className = "bh-char suckable";
            s.textContent = ch;
            s.style.display = "inline-block";
            s.style.whiteSpace = "pre";
            frag.appendChild(s);
            out.push(s);
          }
          child.replaceWith(frag);
        } else if (child.nodeType === 1 && child.tagName !== "BR") {
          wrapChars(child, out);
        }
      });
    }

    function onClick() {
      if (busy) return;
      busy = true;

      const units = [];
      const blocks = [];
      const headings = [];

      const addBlock = (el) => {
        if (el) {
          units.push(el);
          blocks.push(el);
        }
      };
      const addHeading = (el) => {
        headings.push({ el, orig: el.innerHTML });
        wrapChars(el, units);
      };

      addBlock(nav);
      for (const child of main.children) {
        if (child === heroEl || child === contactEl) {
          for (const sub of child.children) {
            if (sub.matches("h1, h2")) addHeading(sub);
            else addBlock(sub);
          }
        } else {
          addBlock(child);
        }
      }
      addBlock(footer);

      const hr = hole.getBoundingClientRect();
      const hx = hr.left + hr.width / 2,
        hy = hr.top + hr.height / 2;
      units.forEach((el) => {
        const r = el.getBoundingClientRect();
        el.style.transformOrigin = hx - r.left + "px " + (hy - r.top) + "px";
        el.classList.add("suckable");
      });

      void document.body.offsetWidth;
      document.body.classList.add("singularity");

      let t = 0;
      units.forEach((el) => {
        const isChar = el.classList.contains("bh-char");
        el.style.transition =
          "transform " +
          DUR +
          "ms cubic-bezier(.7,0,.84,0) " +
          t +
          "ms, opacity " +
          Math.round(DUR * 0.55) +
          "ms ease " +
          Math.round(t + DUR * 0.4) +
          "ms";
        el.style.transform = "scale(.02)";
        el.style.opacity = "0";
        t += isChar ? CHAR_GAP : BLOCK_GAP;
      });

      setTimeout(release, t + DUR + 300);

      function release() {
        units.forEach((el) => {
          el.style.transition = "transform .5s ease-out, opacity .4s ease-out";
          el.style.transform = "";
          el.style.opacity = "";
        });
        document.body.classList.remove("singularity");
        setTimeout(() => {
          headings.forEach((h) => {
            h.el.innerHTML = h.orig;
          });
          blocks.forEach((el) => {
            el.classList.remove("suckable");
            el.style.transition = "";
            el.style.transform = "";
            el.style.opacity = "";
            el.style.transformOrigin = "";
          });
          busy = false;
        }, 650);
      }
    }

    hole.addEventListener("click", onClick);
    return () => hole.removeEventListener("click", onClick);
  }, [holeRef]);
}
