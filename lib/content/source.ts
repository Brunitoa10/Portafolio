import { createPublicClient } from "@/lib/supabase/public";

export type SortDirection = "asc" | "desc";

/**
 * Puerto de lectura del contenido (inversión de dependencias).
 * Los repositorios dependen de esta interfaz, no de Supabase: para cambiar
 * de proveedor, o probar con datos falsos, alcanza con otra implementación.
 * Cualquier fallo se informa como `null`, nunca como excepción.
 */
export interface ContentSource {
  readList<Row>(table: string, direction: SortDirection): Promise<Row[] | null>;
  readSingle<Row>(table: string, id: number): Promise<Row | null | undefined>;
}

function report(table: string, error: unknown): void {
  const detail = error instanceof Error ? error.message : error;
  console.error(`[content] ${table}:`, detail);
}

export const supabaseSource: ContentSource = {
  async readList<Row>(table: string, direction: SortDirection) {
    try {
      const ascending = direction === "asc";
      const { data, error } = await createPublicClient()
        .from(table)
        .select("*")
        .order("sort_order", { ascending })
        .order("id", { ascending });

      if (error || !data) {
        report(table, error?.message);
        return null;
      }
      return data as Row[];
    } catch (error) {
      report(table, error);
      return null;
    }
  },

  /** `undefined` = falló la consulta; `null` = la fila no existe. */
  async readSingle<Row>(table: string, id: number) {
    try {
      const { data, error } = await createPublicClient()
        .from(table)
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        report(table, error.message);
        return undefined;
      }
      return (data as Row | null) ?? null;
    } catch (error) {
      report(table, error);
      return undefined;
    }
  },
};
