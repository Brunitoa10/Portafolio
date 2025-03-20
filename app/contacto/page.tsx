export default function Contacto() {
  return (
    <section className="text-center py-10 ">
      <div className="max-w-3xl mx-auto p-8 rounded-lg shadow-xl transform transition duration-500 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6">
           ¡Gracias por querer ponerte en contacto conmigo!
        </h1>

        <div className="text-lg text-gray-600 mb-6">
          <p>Espero que hayas disfrutado de recorrer mi portafolio! </p>
            A continuación, te dejo mis datos de contacto:
        </div>

        <div className="space-y-4">
          <div>
            <a
              href="https://www.linkedin.com/in/bruno-parisi-19730221b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-blue-500 hover:text-blue-700 font-semibold"
            >
              LinkedIn: @BrunoParisi (Click)
            </a>
          </div>

          <div>
            <a
              href="mailto:bnoprs00@gmail.com"
              className="text-lg text-blue-500 hover:text-blue-700 font-semibold"
            >
              Correo electrónico: bnoprs00@gmail.com (Click)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
