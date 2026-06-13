"use client";
import { useEffect } from "react";

export function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("progress");
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
      if (bar) bar.style.width = p * 100 + "%";
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);
}
