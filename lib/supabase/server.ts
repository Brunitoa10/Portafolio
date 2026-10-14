import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const createClient = (cookieStore: Awaited<ReturnType<typeof cookies>>) => {
  if (!supabaseUrl) throw new Error("Falta NEXT_PUBLIC_SUPABASE_URL en .env.local");
  if (!supabaseKey) throw new Error("Falta NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY en .env.local");

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Llamado desde un Server Component: se puede ignorar
          // si el middleware/proxy refresca la sesión.
        }
      },
    },
  });
};