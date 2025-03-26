import { ProyectoInterface } from "@/types/ProyectoInterface";
import { useEffect, useState } from "react";

export function useProyecto(fetchData = fetch) {
  const [proyectos, setProyectos] = useState<ProyectoInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProyectos = async () => {
      const response = await fetchData("/api/proyectos");
      const data = await response.json();
      setProyectos(data);
      setLoading(false);
    };

    fetchProyectos();
  }, [fetchData]);

  return { proyectos, loading };
}
