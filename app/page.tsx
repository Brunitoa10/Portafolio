import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Skills } from "@/components/skills/Skills";
import { Projects } from "@/components/projects/Projects";
import { Experience } from "@/components/experience/Experience";
import { Contact } from "@/components/contact/Contact";

/**
 * Página estática: se regenera cuando el panel publica un cambio
 * (revalidatePath) y, como red de seguridad, cada hora.
 */
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
