import SectionHead from "./SectionHead";
import { experience } from "@/lib/content";

export default function Experience() {
  return (
    <section id="work">
      <SectionHead label="Experience" index="03 / 06" />
      <div className="reveal">
        {experience.map((xp) => (
          <div className="xp-item" key={xp.company}>
            <span className="when">{xp.when}</span>
            <div>
              <h3>
                {xp.company}
                {xp.current && <span className="tag">CURRENT</span>}
              </h3>
              <div className="role">{xp.role}</div>
              {xp.desc && <p className="xp-desc">{xp.desc}</p>}
            </div>
            <span className="where">{xp.where}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
