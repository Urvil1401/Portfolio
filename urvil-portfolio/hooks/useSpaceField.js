"use client";
import { useEffect } from "react";

// Gravity grid: a fixed background canvas whose lines bend toward the cursor
// and the black hole (bottom-right), like spacetime around a mass.
export function useSpaceField() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cv = document.createElement("canvas");
    cv.id = "spacefield";
    document.body.appendChild(cv);
    const ctx = cv.getContext("2d");

    let W = 0,
      H = 0;
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    addEventListener("resize", resize);

    let mx = -9999,
      my = -9999;
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onOut = () => {
      mx = -9999;
      my = -9999;
    };
    addEventListener("mousemove", onMove);
    addEventListener("mouseout", onOut);

    const css = getComputedStyle(document.documentElement);
    const lineOf = () => css.getPropertyValue("--line").trim() || "#2a2825";

    const GRID = 30; // smaller cells → finer grid
    const STEP = 12; // sub-segment length → smoothness of the bend
    const R = 95; // shorter, tighter gravity falloff
    const PULL = 0.62; // max fraction a vertex is dragged toward the mass
    const BH_R = 115; // black-hole well radius (constant mass, bottom-right)
    const BH_PULL = 0.5; // black-hole pull strength
    let gmx = -9999,
      gmy = -9999,
      gActive = 0; // smoothed well position + strength

    let raf;
    function loop() {
      ctx.clearRect(0, 0, W, H);

      const on = mx > -5000 ? 1 : 0;
      gActive += (on - gActive) * 0.07;
      if (on) {
        if (gmx < -5000) {
          gmx = mx;
          gmy = my;
        }
        gmx += (mx - gmx) * 0.16;
        gmy += (my - gmy) * 0.16;
      }

      const twoR2 = 2 * R * R,
        twoBH2 = 2 * BH_R * BH_R;
      const bx = W - 61,
        by = H - 61; // black-hole centre (bottom-right)
      const p = [0, 0];
      function warp(x, y) {
        let nx = x,
          ny = y;
        // cursor well
        let dx = gmx - nx,
          dy = gmy - ny;
        let f = Math.exp(-(dx * dx + dy * dy) / twoR2) * PULL * gActive;
        nx += dx * f;
        ny += dy * f;
        // black-hole well (constant mass)
        dx = bx - nx;
        dy = by - ny;
        f = Math.exp(-(dx * dx + dy * dy) / twoBH2) * BH_PULL;
        nx += dx * f;
        ny += dy * f;
        p[0] = nx;
        p[1] = ny;
      }

      ctx.strokeStyle = lineOf();
      ctx.lineWidth = 1;
      ctx.lineJoin = "round";

      for (let gx = 0; gx <= W; gx += GRID) {
        ctx.beginPath();
        for (let gy = 0; gy <= H; gy += STEP) {
          warp(gx, gy);
          gy === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]);
        }
        ctx.stroke();
      }
      for (let gy = 0; gy <= H; gy += GRID) {
        ctx.beginPath();
        for (let gx = 0; gx <= W; gx += STEP) {
          warp(gx, gy);
          gx === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]);
        }
        ctx.stroke();
      }

      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("mousemove", onMove);
      removeEventListener("mouseout", onOut);
      cv.remove();
    };
  }, []);
}
