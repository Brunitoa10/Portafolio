import type { SupabaseClient } from "@supabase/supabase-js";
import { planReorder, type OrderChange } from "./resources";
import type { ResourceDef, Row } from "./resources";

/**
 * Acceso a datos de una sección editable. Concentra todas las llamadas a
 * Supabase del panel para que los componentes solo se ocupen de la
 * interfaz. Cada operación lanza un Error con un mensaje legible.
 */
export interface ResourceGateway {
  create(payload: Record<string, unknown>, rows: Row[]): Promise<number>;
  update(id: number, payload: Record<string, unknown>): Promise<void>;
  remove(id: number): Promise<void>;
  reorder(ids: number[], rows: Row[]): Promise<void>;
}

const NO_PERMISSION = "Sin permisos para modificar este registro.";

export function createResourceGateway(
  client: SupabaseClient,
  def: Pick<ResourceDef, "table" | "direction">
): ResourceGateway {
  const { table } = def;

  async function setOrder(change: OrderChange) {
    const { data, error } = await client
      .from(table)
      .update({ sort_order: change.order })
      .eq("id", change.id)
      .select("id");

    if (error) throw new Error(error.message);
    if (!data?.length) throw new Error("Sin permisos para reordenar.");
  }

  return {
    async create(payload, rows) {
      const nextOrder = rows.length ? Math.max(...rows.map((row) => row.sort_order)) + 1 : 1;
      const { data, error } = await client
        .from(table)
        .insert({ ...payload, sort_order: nextOrder })
        .select("id")
        .single();

      if (error) throw new Error(error.message);
      return data.id as number;
    },

    async update(id, payload) {
      const { data, error } = await client.from(table).update(payload).eq("id", id).select("id");
      if (error) throw new Error(error.message);
      if (!data?.length) throw new Error(NO_PERMISSION);
    },

    async remove(id) {
      const { data, error } = await client.from(table).delete().eq("id", id).select("id");
      if (error) throw new Error(error.message);
      if (!data?.length) throw new Error("Sin permisos para eliminar este registro.");
    },

    async reorder(ids, rows) {
      const current = new Map(rows.map((row) => [row.id, row.sort_order]));
      const changes = planReorder(ids, current, def.direction);
      await Promise.all(changes.map(setOrder));
    },
  };
}
