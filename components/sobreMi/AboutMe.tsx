import { ButtonsAboutMe } from "./ButtonsAboutMe";

export default function AboutMe() {
    return (
      <section className="text-center py-4 w-full">
        <div className="max-w-3xl w-full mx-auto px-4 sm:px-8 py-8 rounded-lg shadow-xl transform transition duration-500 hover:scale-105">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6">
            About Me
          </h1>
          <p className="text-base sm:text-lg text-cyan font-extrabold leading-relaxed mb-4">
          ¡Hola! Soy Bruno Ariel Parisi, Técnico Informático y estudiante de Licenciatura en Ciencias de la Computación en la Universidad Nacional del Sur.
          </p>
          <p className="text-base sm:text-lg text-cyan font-extrabold leading-relaxed mb-4">
            Mi formación y experiencia combinan el desarrollo de software con un fuerte compromiso social y educativo. Me especializo en desarrollo de software, aplicando principios de Clean Code y SOLID, junto a patrones de diseño.
          </p>
          <p className="text-base sm:text-lg text-cyan font-extrabold leading-relaxed mb-4">
            También tengo experiencia en soporte técnico, configuración de redes y seguridad informática, con conocimientos en hacking ético y análisis de vulnerabilidades.
          </p>
          <p className="text-base sm:text-lg text-cyan font-extrabold leading-relaxed mb-4">
            He trabajado tanto de manera independiente como en proyectos voluntarios, lo que me ha permitido desarrollar habilidades de liderazgo, comunicación asertiva y trabajo en equipo.
          </p>
          <p className="text-base sm:text-lg text-cyan font-extrabold leading-relaxed">
            Mi enfoque se basa en la eficiencia, la seguridad y el impacto social que la tecnología puede generar. Me entusiasma seguir aprendiendo, construir soluciones escalables y participar en proyectos donde la tecnología mejora la vida de las personas.
          </p>

          <ButtonsAboutMe />
        </div>
      </section>
    );
  }