export default function AboutMe() {
    return (
      <section className="text-center py-4">
       
        <div  className="max-w-3xl mx-auto p-8 rounded-lg shadow-xl transform transition duration-500 hover:scale-105">
             <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6">About Me</h1>
            <p className="text-lg text-cyan font-extrabold  space-y-4">
                Tecnico Informatico y estudiante de Licenciatura en Computacion.
                Experiencia en soporte tecnico, mantenimiento de sistemas y
                optimización de equipos. Proyectos en Java, C, React y Next.js,
                aplicando principios de diseño y buenas prácticas de programacion. Enfoque en
                eficiencia, seguridad y rendimiento.
            </p>
            <div className="flex space-x-4 mt-6 justify-center">
                <a
                    href="/sobreMi"
                    className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                >
                    + Info
                </a>
                <a
                    href="/contacto"
                    className="px-6 py-3 text-lg font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                >
                    Contacto
                </a>
            </div>
        </div>
      </section>
    );
  }