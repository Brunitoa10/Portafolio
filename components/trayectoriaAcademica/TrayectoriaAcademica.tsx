"use client";

import { TrayectoriaInterface } from "@/types/TrayectoriaInterface";
import { useEffect, useState } from "react";


const Trayectoria = () => {
  const [trayectoria, setTrayectoria] = useState<TrayectoriaInterface[]>([]);

  useEffect(() => {
    const fetchTrayectoria = async () => {
      const res = await fetch("/api/trayectoriaAcademica");
      const data = await res.json();
      setTrayectoria(data);
    };

    fetchTrayectoria();
  }, []);

  return (
    <div className="border-l-4 border-cyan-500 pl-4 mt-8">
      <h3 className="text-2xl font-semibold text-cyan-600 mb-4">Trayectoria Academica</h3>
      {trayectoria.map((edu, index) => (
        <div key={index} className="relative pl-10 pb-8">
          <div className="absolute left-0 w-3 h-3 bg-cyan-500 rounded-full top-2.5"></div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md" style={{background: "linear-gradient(45deg, #0a0f29, #122b4e, #0077b6)",padding: "2rem",borderRadius: "8px",}}>
            <h3 className="text-lg font-semibold">{edu.titulo}</h3>
            <p className="text-white">{edu.institucion}</p>
            <span className="text-sm text-white">{edu.fecha}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Trayectoria;
