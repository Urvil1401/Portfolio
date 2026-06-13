"use client";
import { useEffect } from "react";

export function useKonami() {
  useEffect(() => {
    const seq = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let i = 0;

    function secretToast(title, msg) {
      const host = document.getElementById("toasts");
      if (!host) return;
      const t = document.createElement("div");
      t.className = "toast pixel-cut";
      t.innerHTML = `<span class="t1">★ SECRET FOUND</span>${title}<br><span style="color:var(--muted)">${msg}</span>`;
      host.appendChild(t);
      setTimeout(() => t.remove(), 4200);
    }

    function onKey(e) {
      if (
        document.activeElement &&
        document.activeElement.id === "term-input" &&
        e.key.length === 1
      )
        return;
      i = e.key === seq[i] ? i + 1 : e.key === seq[0] ? 1 : 0;
      if (i === seq.length) {
        i = 0;
        document.body.classList.toggle("crt");
        secretToast(
          "Old School",
          "Konami code accepted. CRT mode " +
            (document.body.classList.contains("crt") ? "on" : "off")
        );
      }
    }

    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);
}
