"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

/**
 * Publica los cambios: invalida la copia en caché del sitio público para que
 * la próxima visita ya vea el contenido nuevo. Solo funciona con sesión
 * iniciada de administrador.
 */
export async function publishSite(): Promise<{ ok: boolean }> {
  const supabase = createClient(await cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false };

  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (isAdmin === false) return { ok: false };

  revalidatePath("/", "layout");
  return { ok: true };
}
