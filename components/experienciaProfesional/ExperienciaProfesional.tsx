"use client";

import { useEffect, useState } from "react";

interface ExperienciaData {
    titulo: string;
    empresa: string;
    fecha: string;
  }

const Experiencia = () => {
    const [experiencias, setExperiencias] = useState<ExperienciaData[]>([]);

  useEffect(() => {
    const fetchExperiencias = async () => {
      const res = await fetch("/api/experienciaProfesional");
      const data = await res.json();
      setExperiencias(data);
    };

    fetchExperiencias();
  }, []);

  return (
    <div className="border-l-4 border-cyan-500 pl-4">
      <h3 className="text-2xl font-semibold text-cyan-600 mb-4">Experiencia Profesional</h3>
      {experiencias.map((exp, index) => (
        <div key={index} className="relative pl-10 pb-8">
          <div className="absolute left-0 w-3 h-3 bg-cyan-500 rounded-full top-2.5"></div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md" style={{background: "linear-gradient(45deg, #0a0f29, #122b4e, #0077b6)",padding: "2rem",borderRadius: "8px",}}>
            <h3 className="text-lg font-semibold">{exp.titulo}</h3>
            <p className="text-gray-600">{exp.empresa}</p>
            <span className="text-sm text-gray-500">{exp.fecha}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experiencia;
