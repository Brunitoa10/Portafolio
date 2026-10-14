import type { ResourceDef, Row } from "./types";

/** Posición (1 = primero) que ocupa o ocuparía una fila. */
export function defaultPosition(
  def: Pick<ResourceDef, "newItemAt">,
  total: number,
  currentIndex: number | null
): number {
  if (currentIndex !== null) return currentIndex + 1;
  return def.newItemAt === "first" ? 1 : total + 1;
}

/** Ajusta una posición escrita por la persona al rango válido. */
export function clampPosition(raw: string, total: number): number {
  return Math.min(Math.max(Math.trunc(Number(raw)) || 1, 1), total);
}

/** Inserta `id` en `position` (1-based) dentro de la lista ordenada. */
export function placeAt(ids: number[], id: number, position: number): number[] {
  const next = ids.filter((existing) => existing !== id);
  next.splice(position - 1, 0, id);
  return next;
}

/** Intercambia un elemento con su vecino; devuelve null si no se puede mover. */
export function swapWithNeighbour(ids: number[], id: number, delta: -1 | 1): number[] | null {
  const from = ids.indexOf(id);
  const to = from + delta;
  if (from < 0 || to < 0 || to >= ids.length) return null;

  const next = [...ids];
  [next[from], next[to]] = [next[to], next[from]];
  return next;
}

export interface OrderChange {
  id: number;
  order: number;
}

/**
 * Calcula los `sort_order` nuevos según el orden de `ids` y devuelve solo
 * los que cambian. En listas "desc" el primero lleva el número más alto.
 */
export function planReorder(
  ids: number[],
  currentOrders: Map<number, number>,
  direction: ResourceDef["direction"]
): OrderChange[] {
  const total = ids.length;
  return ids
    .map((id, index) => ({ id, order: direction === "asc" ? index + 1 : total - index }))
    .filter((change) => currentOrders.get(change.id) !== change.order);
}
