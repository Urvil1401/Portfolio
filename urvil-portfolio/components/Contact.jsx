import SectionHead from "./SectionHead";
import { social } from "@/lib/content";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <SectionHead label="Contact" index="06 / 06" style={{ textAlign: "left" }} />
      <h2>
        Let&apos;s build something
        <br />
        <span className="pix-word">together.</span>
      </h2>
      <p>
        Open to full-time roles, freelance projects, and interesting
        conversations.
      </p>
      <a className="btn pixel-cut" href={`mailto:${social.email}`}>
        Say hello →
      </a>
      <div className="contact-links">
        <a href={`mailto:${social.email}`}>{social.email}</a>
        <span className="dot-sep">·</span>
        <a href={social.github} target="_blank" rel="noreferrer">
          {social.githubLabel}
        </a>
        <span className="dot-sep">·</span>
        <a href={social.linkedin} target="_blank" rel="noreferrer">
          {social.linkedinLabel}
        </a>
      </div>
    </section>
  );
}
