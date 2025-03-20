export default function CV() {
    return (
      <section className="text-center py-10">
        <div className="max-w-3xl mx-auto p-8 rounded-lg shadow-xl transform transition duration-500 hover:scale-105">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6">
            ¡Gracias por querer obtener mi CV!
          </h1>
          <div className="text-lg text-gray-600 mb-6">
            <p className="font-semibold text-bold mb-4">Estoy convencido de que, trabajando juntos, no solo alcanzaremos objetivos, sino que revolucionaremos el futuro! </p>
            Haz clic en el botón de abajo para descargar mi currículum.
          </div>

          <div>
            <a
              href="/Recursos/CV_Bruno_Ariel_Parisi_Marzo_2025.pdf"
              download
              className="inline-block mt-6 px-6 py-3 text-lg font-semibold text-white bg-green-500 hover:bg-green-700 rounded-lg shadow-md transform transition duration-300 hover:scale-105"
            >
              Descargar CV
            </a>
          </div>
        </div>
      </section>
    );
  }
  