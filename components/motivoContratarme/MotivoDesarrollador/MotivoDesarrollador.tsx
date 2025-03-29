import { MotivoLista } from "../MotivoLista";

export default function MotivoDesarrollador() {
  const habilidades = [
    "🚀 Desarrollo con React, Next.js, Java, TypeScript y C.",
    "🚀 Aplicación de patrones de diseño SOLID y Clean Code.",
    "🚀 Optimización de rendimiento web y arquitectura escalable.",
    "🚀 Experiencia en proyectos con integraciones modernas como Stripe y TailwindCSS."
  ];

  return (
    <section className="text-center py-2">
      <div className="max-w-3xl mx-auto sm:mx-auto p-8 rounded-lg shadow-xl transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6">
          ¿Por qué contactarme como Desarrollador?
        </h2>
        <MotivoLista items={habilidades} />
      </div>
    </section>
  );
}
