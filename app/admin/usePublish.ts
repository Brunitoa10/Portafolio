"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { publishSite } from "./actions";

/**
 * Devuelve una función que publica los cambios en el sitio y refresca los
 * datos del panel. Un fallo al publicar no rompe el guardado: el sitio se
 * actualiza igual en la próxima regeneración automática.
 */
export function usePublish() {
  const router = useRouter();

  return useCallback(async () => {
    try {
      await publishSite();
    } catch (error) {
      console.error("[admin] publishSite:", error);
    }
    router.refresh();
  }, [router]);
}
