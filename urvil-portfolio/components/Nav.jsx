export default function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="nav-logo" href="#top">
          URVIL<sup title="?">®</sup>
        </a>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#work">Experience</a>
          <a href="#projects">Projects</a>
        </nav>
        <a className="btn pixel-cut" href="#contact">
          Get in touch
        </a>
      </div>
    </header>
  );
}
