import { createClient } from "@supabase/supabase-js";

/**
 * Cliente anónimo para leer el contenido público del sitio.
 *
 * No usa cookies: así las páginas públicas pueden generarse de forma estática
 * y regenerarse cuando el panel publica un cambio. La lectura pública de las
 * tablas la habilitan las políticas RLS ("lectura publica").
 */
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
