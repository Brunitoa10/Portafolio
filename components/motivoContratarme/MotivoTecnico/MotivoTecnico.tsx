import { MotivoLista } from "../MotivoLista";

export default function MotivoTecnico() {
  const habilidades = [
    "✅ Experiencia en soporte técnico y mantenimiento de sistemas.",
    "✅ Configuración y optimización de PCs, servidores y redes.",
    "✅ Seguridad informática y configuración de sistemas en Windows y Linux.",
    "✅ Resolución de problemas con pensamiento crítico y eficiencia."
  ];
  return (
    <section className="text-center py-2">
      <div className="max-w-3xl mx-auto sm:mx-auto p-8 rounded-lg shadow-xl transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6">
          ¿Por qué contratarme como Técnico Informático?
        </h2>
        <MotivoLista items={habilidades} />
      </div>
    </section>
  );
}
