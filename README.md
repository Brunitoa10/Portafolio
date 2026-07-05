# Portfolio — Bruno Ariel Parisi

Portfolio personal migrado de HTML/CSS/JS estático a **Next.js 15 (App Router) + TypeScript**,
con foco en clean code, modularización y patrones de diseño.

## Stack

- Next.js (App Router, Server Components por defecto)
- TypeScript (strict mode)
- CSS puro con variables (mismo diseño visual que el original), sin frameworks de UI
- ESLint (config de Next.js)

## Cómo correrlo

```bash
npm install
npm run dev
```

Abrí http://localhost:3000

Build de producción:

```bash
npm run build
npm start
```

## Arquitectura

```
app/                     → rutas (App Router). page.tsx solo compone secciones.
components/
  layout/                → Navbar, Footer, Section (Template Method)
  hero/                  → Hero, Terminal (typewriter animado)
  about/                 → About, StatCard
  skills/                → Skills, SkillCategoryRow, Chip
  projects/              → Projects, ProjectCard, ProjectTagBadge
  experience/            → Experience, TimelineItem
  contact/               → Contact, ContactLinkButton
  icons/                 → SVGs de contacto
data/                    → "repositorios" de contenido (profile, skills, projects, timeline, contact, terminal)
hooks/                   → useFadeInOnScroll, useTerminalTypewriter
lib/                     → terminalLineRenderers (Strategy), contactIconFactory (Factory), parseInlineBold
types/                   → contratos compartidos (interfaces de dominio)
```

## Patrones de diseño aplicados

- **Repository / Data Provider** (`data/*.ts`): todo el contenido (textos, proyectos, skills,
  timeline) vive separado de los componentes. Cambiar el contenido nunca implica tocar JSX.
- **Template Method** (`components/layout/Section.tsx`): define el esqueleto común a toda
  sección (fade-in + label + título + body) y cada sección solo aporta su `children`.
- **Strategy** (`lib/terminalLineRenderers.tsx`): cada tipo de línea de la terminal
  (`prompt`, `output`, `blank`, `cursor`) tiene su propia función de render registrada en un
  mapa, en vez de un if/else dentro del componente.
- **Factory** (`lib/contactIconFactory.tsx`): dado un `ContactIconName`, devuelve el ícono SVG
  correspondiente sin que el consumidor conozca las implementaciones concretas.
- **Composite**: `ProjectCard`, `TimelineItem`, `StatCard`, `Chip`, etc. son piezas pequeñas
  y componibles que las secciones ensamblan (`Projects`, `Experience`, `Skills`...).
- **Observer** (`hooks/useFadeInOnScroll.ts`): encapsula `IntersectionObserver` en un hook
  reutilizable, en vez de repetir la lógica en cada sección.

## Notas

- Los links de contacto (`data/contact.ts`) y proyectos (`data/projects.ts`) tienen URLs
  placeholder (`TU_USUARIO`, `tu@email.com`, etc.) — reemplazalas por las reales.
- El diseño visual (colores, tipografías, animaciones) es una réplica fiel del HTML original;
  el CSS vive en `app/globals.css` usando las mismas variables (`--green`, `--cyan`, etc.).
