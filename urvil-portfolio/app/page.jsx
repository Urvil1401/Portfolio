import Boot from "@/components/Boot";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Lab from "@/components/Lab";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Fun from "@/components/Fun";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BlackHole from "@/components/BlackHole";
import Effects from "@/components/Effects";

export default function Home() {
  return (
    <>
      <Boot />

      <div id="progress"></div>

      <Nav />

      {/* hidden resume link, used by the hero button + terminal `resume` cmd */}
      <a
        id="resume-link"
        href="/resume.pdf"
        download="Urvil-Mehta-Resume.pdf"
        hidden
      ></a>

      <main className="wrap" id="top">
        <Hero />
        <Marquee />
        <About />
        <Lab />
        <Experience />
        <Projects />
        <Fun />
        <Contact />
      </main>

      <Footer />

      <div id="toasts"></div>

      {/* black hole: click to collapse the page into a singularity */}
      <BlackHole />

      {/* page-wide browser effects: scroll bar, reveals, konami, grid, cat */}
      <Effects />
    </>
  );
}
