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
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <a
              href="/sobreMi"
              className="px-6 py-3 text-lg font-semibold text-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 bg-gradient-to-r from-gray-900 via-cyan-500 to-gray-900 hover:from-cyan-600 hover:via-gray-800 hover:to-cyan-600 w-full sm:w-auto"
            >
              + Info
            </a>
            <a
              href="/contacto"
              className="px-6 py-3 text-lg font-semibold text-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 bg-gradient-to-r from-gray-900 via-cyan-500 to-gray-900 hover:from-cyan-600 hover:via-gray-800 hover:to-cyan-600 w-full sm:w-auto"
            >
              Contacto
            </a>
            <a
              href="/proyectos"
              className="px-6 py-3 text-lg font-semibold text-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 bg-gradient-to-r from-gray-900 via-cyan-500 to-gray-900 hover:from-cyan-600 hover:via-gray-800 hover:to-cyan-600 w-full sm:w-auto"
            >
              Proyectos
            </a>
          </div>
        </div>
      </section>
    );
  }