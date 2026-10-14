-- =====================================================================
--  ENLACES MÚLTIPLES EN PROYECTOS
--  Pegala en Supabase > SQL Editor > New query y ejecutala (una vez).
--  Es segura de repetir.
-- =====================================================================

alter table projects
  add column if not exists links jsonb not null default '[]';

-- Proyectos cargados antes de esta columna: copia su enlace único a la lista.
update projects
set links = jsonb_build_array(
  jsonb_build_object('label', coalesce(nullif(link_label, ''), 'Enlace'), 'url', href)
)
where links = '[]'::jsonb and coalesce(href, '') <> '';

select name, links from projects order by sort_order;
