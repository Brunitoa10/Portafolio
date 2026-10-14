import type { ContentSource, SortDirection } from "./source";

/**
 * Repositorio de solo lectura. `findAll` nunca falla: si la fuente no
 * responde devuelve el respaldo local (`fallback`); si responde con la tabla
 * vacía, devuelve una lista vacía (lo que se borra no reaparece).
 */
export interface ListRepository<Item> {
  findAll(): Promise<Item[]>;
}

export interface ListRepositoryConfig<Row, Item> {
  table: string;
  direction: SortDirection;
  fallback: Item[];
  map: (row: Row) => Item;
}

export function createListRepository<Row, Item>(
  source: ContentSource,
  { table, direction, fallback, map }: ListRepositoryConfig<Row, Item>
): ListRepository<Item> {
  return {
    async findAll() {
      const rows = await source.readList<Row>(table, direction);
      return rows ? rows.map(map) : fallback;
    },
  };
}

/** Lista cruda (sin mapear) o `null` si la fuente falló. */
export function createRawListReader<Row>(
  source: ContentSource,
  table: string,
  direction: SortDirection
) {
  return () => source.readList<Row>(table, direction);
}
