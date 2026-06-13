"use client";
import { useRef } from "react";
import { useBlackHole } from "@/hooks/useBlackHole";

export default function BlackHole() {
  const ref = useRef(null);
  useBlackHole(ref);
  return <div id="blackhole" ref={ref} title="don't click me" />;
}
