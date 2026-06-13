import { marqueeItems } from "@/lib/content";

export default function Marquee() {
  // duplicated track so the -50% scroll animation loops seamlessly
  const track = [...marqueeItems, ...marqueeItems];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span key={i}>
            {item}
            <span className="sep">▚</span>
          </span>
        ))}
      </div>
    </div>
  );
}
