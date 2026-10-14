import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminDashboard from "./AdminDashboard";
import LogoutButton from "./LogoutButton";
import type { CvInfo } from "./CvUploader";
import {
  RESOURCE_LIST,
  type ResourceKey,
  type Row,
  type SingleRecord,
} from "./resources";
import styles from "./admin.module.css";

export default async function AdminPage() {
  const supabase = createClient(await cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Defensa adicional: la seguridad real vive en las políticas RLS.
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (isAdmin === false) {
    return (
      <div className={styles.forbidden}>
        <h1>Sin permisos</h1>
        <p>
          La cuenta {user.email} no está autorizada para editar este sitio. Iniciá sesión con la cuenta
          de administrador.
        </p>
        <LogoutButton />
      </div>
    );
  }

  const [tables, profileResult, cvResult] = await Promise.all([
    Promise.all(
      RESOURCE_LIST.map(async (def) => {
        const ascending = def.direction === "asc";
        const { data, error } = await supabase
          .from(def.table)
          .select("*")
          .order("sort_order", { ascending })
          .order("id", { ascending });
        return { def, rows: (data ?? []) as Row[], error: error?.message };
      })
    ),
    supabase.from("profile").select("*").eq("id", 1).maybeSingle(),
    supabase.storage.from("cv").list("", { search: "cv.pdf", limit: 5 }),
  ]);

  const rows = {} as Record<ResourceKey, Row[]>;
  const loadErrors: string[] = [];

  for (const { def, rows: tableRows, error } of tables) {
    rows[def.key] = tableRows;
    if (error) loadErrors.push(`${def.title}: ${error}`);
  }
  if (profileResult.error) loadErrors.push(`Perfil: ${profileResult.error.message}`);

  const cvFile = cvResult.data?.find((file) => file.name === "cv.pdf");
  const cv: CvInfo | null = cvFile
    ? {
        size: typeof cvFile.metadata?.size === "number" ? cvFile.metadata.size : null,
        updatedAt: cvFile.updated_at ?? null,
      }
    : null;

  return (
    <AdminDashboard
      email={user.email ?? ""}
      rows={rows}
      profile={(profileResult.data as SingleRecord | null) ?? null}
      cv={cv}
      loadErrors={loadErrors}
    />
  );
}
