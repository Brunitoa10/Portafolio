-- =====================================================================
--  MIGRACIÓN COMPLETA DEL PORTAFOLIO A SUPABASE
--  Pegala en Supabase > SQL Editor > New query y ejecutala.
--
--  Es segura de repetir: crea solo lo que falta, y carga los datos de
--  cada tabla únicamente si esa tabla está vacía. No pisa lo que ya
--  editaste desde el panel ni duplica filas.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1. Permiso de administración
--    Solo se crea si todavía no existe (no toca tu función actual).
-- ---------------------------------------------------------------------
do $setup$
begin
  if to_regprocedure('public.is_admin()') is null then
    execute $fn$
      create function public.is_admin()
      returns boolean
      language sql
      stable
      as $body$ select auth.uid() = '045e1113-e312-4239-b85e-80f1e63644c1'::uuid $body$
    $fn$;
  end if;
end
$setup$;


-- ---------------------------------------------------------------------
-- 2. Tablas
-- ---------------------------------------------------------------------
create table if not exists projects (
  id bigint generated always as identity primary key,
  name text not null,
  icon text,
  wide boolean not null default false,
  link_label text,
  href text,
  description text,
  tags jsonb not null default '[]',
  sort_order int not null default 0
);

create table if not exists skill_categories (
  id bigint generated always as identity primary key,
  label text not null,
  accent text not null check (accent in ('green', 'cyan')),
  items text[] not null default '{}',
  sort_order int not null default 0
);

create table if not exists timeline (
  id bigint generated always as identity primary key,
  period text not null,
  role text not null,
  company text not null,
  items text[] not null default '{}',
  sort_order int not null default 0
);

create table if not exists profile (
  id int primary key default 1 check (id = 1),
  name text not null,
  highlighted_name text,
  role text,
  location text,
  tagline text,
  description text,
  contact_intro text,
  terminal_prompt text,
  terminal_title text
);

create table if not exists stats (
  id bigint generated always as identity primary key,
  value text not null,
  label text not null,
  sort_order int not null default 0
);

create table if not exists about_paragraphs (
  id bigint generated always as identity primary key,
  content text not null,
  sort_order int not null default 0
);

create table if not exists contact_links (
  id bigint generated always as identity primary key,
  icon text not null,
  label text not null,
  href text not null,
  external boolean not null default true,
  sort_order int not null default 0
);

create table if not exists terminal_lines (
  id bigint generated always as identity primary key,
  kind text not null check (kind in ('prompt', 'output', 'blank', 'cursor')),
  text text,
  accent text check (accent in ('green', 'cyan')),
  sort_order int not null default 0
);

-- Columnas nuevas del perfil: pie de página y datos del sitio (título y
-- descripción para buscadores)
alter table profile
  add column if not exists footer_text text,
  add column if not exists site_title text,
  add column if not exists site_description text;


-- ---------------------------------------------------------------------
-- 3. Seguridad: lectura pública, escritura solo para el administrador
-- ---------------------------------------------------------------------
do $rls$
declare t text;
begin
  foreach t in array array[
    'projects', 'skill_categories', 'timeline', 'profile',
    'stats', 'about_paragraphs', 'contact_links', 'terminal_lines'
  ]
  loop
    execute format('alter table %I enable row level security', t);

    execute format('drop policy if exists "lectura publica" on %I', t);
    execute format('create policy "lectura publica" on %I for select using (true)', t);

    execute format('drop policy if exists "admin escribe" on %I', t);
    execute format(
      'create policy "admin escribe" on %I for all using (public.is_admin()) with check (public.is_admin())',
      t
    );
  end loop;
end
$rls$;


-- ---------------------------------------------------------------------
-- 4. Almacenamiento del currículum (PDF, máximo 5 MB)
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('cv', 'cv', true, 5242880, array['application/pdf'])
on conflict (id) do nothing;

drop policy if exists "cv admin select" on storage.objects;
drop policy if exists "cv admin insert" on storage.objects;
drop policy if exists "cv admin update" on storage.objects;
drop policy if exists "cv admin delete" on storage.objects;

create policy "cv admin select" on storage.objects
  for select to authenticated
  using (bucket_id = 'cv' and public.is_admin());

create policy "cv admin insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'cv' and public.is_admin());

create policy "cv admin update" on storage.objects
  for update to authenticated
  using (bucket_id = 'cv' and public.is_admin());

create policy "cv admin delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'cv' and public.is_admin());


-- ---------------------------------------------------------------------
-- 5. Datos iniciales (los que hoy están en la carpeta data/)
-- ---------------------------------------------------------------------

-- Perfil, contacto, terminal y pie de página (fila única).
-- Si la fila ya existe, solo completa los campos que estén vacíos.
insert into profile (
  id, name, highlighted_name, role, location, tagline, description,
  contact_intro, terminal_prompt, terminal_title,
  footer_text, site_title, site_description
) values (
  1,
  'Ariel Parisi',
  'Bruno',
  'IT Field JR · Bahía Blanca, ARG',
  'Bahía Blanca, Argentina',
  '// disponible para nuevos desafíos',
  'Soporte e infraestructura de red en entornos industriales críticos. Estudiante de Lic. en Cs. de la Computación (UNS). Construyo mis propias herramientas de IT.',
  '¿Tenés un proyecto, una oferta o querés charlar sobre IT? Me encontrás acá abajo.',
  'PS bruno@prometeo:~> ',
  'prometeo — powershell — 80×24',
  'Bruno Ariel Parisi · construido con Next.js, TypeScript & React · Bahía Blanca, Argentina',
  'Bruno Ariel Parisi · IT Specialist',
  'Portfolio de Bruno Ariel Parisi — IT Field Specialist en Bahía Blanca, Argentina.'
)
on conflict (id) do update set
  name             = coalesce(profile.name,             excluded.name),
  highlighted_name = coalesce(profile.highlighted_name, excluded.highlighted_name),
  role             = coalesce(profile.role,             excluded.role),
  location         = coalesce(profile.location,         excluded.location),
  tagline          = coalesce(profile.tagline,          excluded.tagline),
  description      = coalesce(profile.description,      excluded.description),
  contact_intro    = coalesce(profile.contact_intro,    excluded.contact_intro),
  terminal_prompt  = coalesce(profile.terminal_prompt,  excluded.terminal_prompt),
  terminal_title   = coalesce(profile.terminal_title,   excluded.terminal_title),
  footer_text      = coalesce(profile.footer_text,      excluded.footer_text),
  site_title       = coalesce(profile.site_title,       excluded.site_title),
  site_description = coalesce(profile.site_description, excluded.site_description);

-- Sobre mí
do $seed$
begin
  if not exists (select 1 from about_paragraphs) then
    insert into about_paragraphs (content, sort_order) values
    ('Profesional de Tecnología con experiencia en soporte de infraestructura IT en entornos industriales de alta criticidad. Actualmente me desempeño como IT Field Service para Bunge Argentina a través de TIVIT, brindando soporte L1/L2/L3, Soporte a usuario, redes, coordinación de proveedores, Active Directory. Participo activamente en proyectos de migración de Data Center, planes de contingencia y mejoras de infraestructura, contribuyendo a la disponibilidad y continuidad operativa de los servicios tecnológicos. Complemento mi experiencia profesional con formación en Licenciatura en Ciencias de la Computación y una sólida vocación de servicio como rescatista voluntario', 1);
  end if;
end
$seed$;

-- Estadísticas
do $seed$
begin
  if not exists (select 1 from stats) then
    insert into stats (value, label, sort_order) values
    ('L2/3', 'soporte técnico avanzado', 1),
    ('UNS', 'Lic. en Cs. de la Computación', 2),
    ('1+', 'año en infraestructura IT', 3),
    ('24/7', 'entorno industrial crítico', 4);
  end if;
end
$seed$;

-- Skills
do $seed$
begin
  if not exists (select 1 from skill_categories) then
    insert into skill_categories (label, accent, items, sort_order) values
    ('Lenguajes & scripting', 'cyan', array['Python', 'Bash / Shell', 'Java', 'JavaScript', 'HTML · CSS', 'ReactJS', 'NextJS', 'Typescript']::text[], 1),
    ('Prácticas & patrones de diseño', 'green', array['SOLID', 'Clean Code', 'Design Patterns', 'Repository', 'Strategy', 'Factory']::text[], 2),
    ('Infraestructura & redes', 'cyan', array['Active Directory / GPO', 'Networking · VLANs', 'Cisco IOS', 'Wireshark', 'TCP/IP · DNS · DHCP']::text[], 3),
    ('Sistemas & herramientas', 'green', array['Linux (Mint · Kali)', 'Git · GitHub', 'Kali / OSINT', 'draw.io / Topología']::text[], 4);
  end if;
end
$seed$;

-- Proyectos
do $seed$
begin
  if not exists (select 1 from projects) then
    insert into projects (name, icon, wide, link_label, href, description, tags, sort_order) values
    ('GitHub', '📡', true, '⌥ GitHub', 'https://github.com/Brunitoa10',
     'Herramienta de monitoreo de red para la planta industrial de Bunge. Visualiza topología en tiempo real, detecta dispositivos caídos y genera alertas. Stack Python + Bash + Java + HTML. Portfolio piece & utility real.',
     '[{"label":"Python","accent":"green"},{"label":"Bash","accent":"green"},{"label":"Networking","accent":"cyan"},{"label":"Java","accent":"cyan"},{"label":"HTML","accent":"green"}]'::jsonb, 1),
    ('prometeo', '🔥', false, '⌥ GitHub', 'https://github.com/TU_USUARIO/prometeo',
     'Repo personal de herramientas IT. Scripts de automatización, utilidades de red y diagnóstico para entornos de campo. Filosofía: production-ready desde el día uno.',
     '[{"label":"Python","accent":"green"},{"label":"Bash","accent":"green"},{"label":"Open Source","accent":"cyan"}]'::jsonb, 2),
    ('Topología de Red — Bunge BB', '🗺️', false, null, null,
     'Documentación visual completa de la infraestructura: NOC, oficinas, piso de producción, calado de camiones y garita. Vista técnica y para usuarios finales.',
     '[{"label":"draw.io","accent":"cyan"},{"label":"Networking","accent":"green"},{"label":"Documentación","accent":"cyan"}]'::jsonb, 3),
    ('Kali Security Lab', '🔐', false, null, null,
     'Lab de hacking ético parrot - kali linux. Configuración de theHarvester, Sherlock, recon-ng, Kismet y macchanger para OSINT y análisis de red.',
     '[{"label":"Kali","accent":"green"},{"label":"Docker","accent":"cyan"},{"label":"OSINT","accent":"green"}]'::jsonb, 4),
    ('2048', '👨🏽‍💻', false, '⌥ code', 'https://github.com/Brunitoa10/2048',
     'El 2048 es un juego de puzzle y estrategia cuyo objetivo es lanzar y combinar bloques numerados.',
     '[{"label":"ReactJS","accent":"green"},{"label":"Prolog","accent":"cyan"}]'::jsonb, 5),
    ('DISO|Digital Solutions', '👨🏽‍💻', false, '⌥ code', 'https://github.com/Brunitoa10/DISO_DigitalSolutions_webReact',
     'Plataforma innovadora para la transformación digital de negocios.',
     '[{"label":"ReactJS","accent":"green"}]'::jsonb, 6),
    ('DriveNow Car', '👨🏽‍💻', false, '⌥ code', 'https://github.com/Brunitoa10/DriveNow-RentalCar',
     'Aplicación de alquiler de coches con integración de Stripe.',
     '[{"label":"Nextjs","accent":"green"},{"label":"Prisma","accent":"cyan"},{"label":"Neon","accent":"green"},{"label":"TailwindCSS","accent":"cyan"}]'::jsonb, 7),
    ('Super Marios Bros', '👨🏽‍💻', false, '⌥ code', 'https://github.com/Brunitoa10/SuperMarioBros',
     'Versión mejorada del clásico con arquitectura modular y nuevos desafíos.',
     '[{"label":"Java","accent":"green"},{"label":"Patrones de diseño","accent":"cyan"},{"label":"SOLID","accent":"green"},{"label":"Clean code","accent":"cyan"}]'::jsonb, 8),
    ('Cuena Bancaria', '👨🏽‍💻', false, '⌥ code', 'https://github.com/Brunitoa10/CuentaBancaria',
     'Operaciones como depósitos, retiros y transferencias.',
     '[{"label":"Java","accent":"green"},{"label":"Polimorfismo","accent":"cyan"},{"label":"Herencia","accent":"green"},{"label":"Generalizacion","accent":"cyan"}]'::jsonb, 9),
    ('Gestion de Directorios', '👨🏽‍💻', false, '⌥ code', 'https://github.com/Brunitoa10/Gestion_de_Directorios',
     'Carpeta Documentos de Windows.',
     '[{"label":"Java","accent":"green"},{"label":"Estructuras de datos","accent":"cyan"}]'::jsonb, 10),
    ('Cuenta Palabras', '👨🏽‍💻', false, '⌥ code', 'https://github.com/Brunitoa10/CuentaPalabras',
     'Cuenta repeticiones de palabras y palabras más usadas.',
     '[{"label":"C","accent":"green"},{"label":"Headers","accent":"cyan"},{"label":"multiset","accent":"green"}]'::jsonb, 11),
    ('Chau Naranja', '👨🏽‍💻', false, '⌥ code', 'https://chaunaranja.vercel.app/',
     'Sitio web para peluquería, con reserva de turnos online.',
     '[{"label":"NextJS","accent":"green"},{"label":"En desarrollo","accent":"cyan"}]'::jsonb, 12),
    ('BBRAS', '👨🏽‍💻', false, '⌥ code', 'https://bbras.vercel.app/',
     'Sitio para WEB brigada de búsqueda, rescate, ayuda y socorrismo.',
     '[{"label":"NextJS","accent":"green"},{"label":"En desarrollo","accent":"cyan"}]'::jsonb, 13),
    ('Nemesis Solutions', '👨🏽‍💻', false, '⌥ code', 'https://nemesis-solutions.vercel.app/',
     'Web soporte TI y desarrollo de software',
     '[{"label":"NextJS","accent":"green"},{"label":"En desarrollo","accent":"cyan"}]'::jsonb, 14);
  end if;
end
$seed$;

-- Experiencia (mayor orden = aparece primero)
do $seed$
begin
  if not exists (select 1 from timeline) then
    insert into timeline (period, role, company, items, sort_order) values
    ('2025 octubre — actualidad', 'Field Service Jr', 'TIVIT · Planta Bunge, Bahía Blanca',
     array['Soporte L1/L2/L3 en entorno industrial crítico (granos)', 'Administración de Active Directory', 'Documentación de topología de red y coordinación con proveedores', 'Cobertura temporal de liderazgo de área IT', 'Planificación e instalación de switches, VLANs, cámaras IP, teléfonos e impresoras']::text[], 2),
    ('2019 — actualidad', 'Licenciatura en Ciencias de la Computación', 'Universidad Nacional del Sur · UNS, Bahía Blanca',
     array['Tecnicatura completa · múltiples certificaciones IT', 'Materias: Arquitectura de Computadoras, AyDS, Algoritmos, Redes', 'Proyecto AyDS: Sistema de Educación a Distancia (web)']::text[], 1);
  end if;
end
$seed$;

-- Contacto
do $seed$
begin
  if not exists (select 1 from contact_links) then
    insert into contact_links (icon, label, href, external, sort_order) values
    ('github', 'GitHub', 'https://github.com/Brunitoa10', true, 1),
    ('linkedin', 'LinkedIn', 'https://www.linkedin.com/in/bruno-ariel-parisi-19730221b/', true, 2);
  end if;
end
$seed$;

-- Terminal del hero
do $seed$
begin
  if not exists (select 1 from terminal_lines) then
    insert into terminal_lines (kind, text, accent, sort_order) values
    ('prompt', 'whoami', null, 1),
    ('output', 'Bruno Ariel Parisi', null, 2),
    ('blank', null, null, 3),
    ('prompt', 'Get-Content .\perfil.txt', null, 4),
    ('output', '┌─────────────────────────────────────┐', null, 5),
    ('output', '  Rol     : IT Field JR                ', 'cyan', 6),
    ('output', '  Empresa : TIVIT · Bunge BB           ', null, 7),
    ('output', '  Stack   : Bash · Powershell          ', null, 8),
    ('output', '  Lugar   : Bahía Blanca, Argentina    ', null, 9),
    ('output', '└─────────────────────────────────────┘', null, 10),
    ('blank', null, null, 11),
    ('prompt', 'Get-ChildItem .\proyectos\', null, 12),
    ('output', 'Field/  prometeo/  topology-docs/  inventario/', 'cyan', 13),
    ('blank', null, null, 14),
    ('cursor', null, null, 15);
  end if;
end
$seed$;


-- ---------------------------------------------------------------------
-- 6. Verificación (devuelve una fila por tabla con su cantidad de registros)
-- ---------------------------------------------------------------------
select 'projects' as tabla, count(*) as filas from projects
union all select 'skill_categories', count(*) from skill_categories
union all select 'timeline',         count(*) from timeline
union all select 'about_paragraphs', count(*) from about_paragraphs
union all select 'stats',            count(*) from stats
union all select 'contact_links',    count(*) from contact_links
union all select 'terminal_lines',   count(*) from terminal_lines
union all select 'profile',          count(*) from profile;
