import type { SupabaseClient } from "@supabase/supabase-js";

/** Guarda la fila única del perfil (id = 1), creándola si no existe. */
export async function saveProfile(
  client: SupabaseClient,
  payload: Record<string, unknown>
): Promise<void> {
  const { error } = await client.from("profile").upsert({ id: 1, ...payload }, { onConflict: "id" });
  if (error) throw new Error(error.message);
}
