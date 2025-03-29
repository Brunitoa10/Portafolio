import { ButtonsAboutMe } from "./ButtonsAboutMe";

export default function AboutMe() {
    return (
      <section className="text-center py-4 w-full">
        <div className="max-w-3xl w-full mx-auto px-4 sm:px-8 py-8 rounded-lg shadow-xl transform transition duration-500 hover:scale-105">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6">
            About Me
          </h1>
          <p className="text-base sm:text-lg text-cyan font-extrabold leading-relaxed">
            Técnico Informático y estudiante de Licenciatura en Computación.
            Experiencia en soporte técnico, mantenimiento de sistemas y
            optimización de equipos. Proyectos en Java, C, React y Next.js,
            aplicando principios de diseño y buenas prácticas de programación.
            Enfoque en eficiencia, seguridad y rendimiento.
          </p>
          <ButtonsAboutMe />
        </div>
      </section>
    );
  }