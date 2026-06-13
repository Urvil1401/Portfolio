"use client";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useReveal } from "@/hooks/useReveal";
import { useKonami } from "@/hooks/useKonami";
import { useSpaceField } from "@/hooks/useSpaceField";
import { useOneko } from "@/hooks/useOneko";

// Mounts all the page-wide browser effects in one place.
export default function Effects() {
  useScrollProgress();
  useReveal();
  useKonami();
  useSpaceField();
  useOneko();
  return null;
}
