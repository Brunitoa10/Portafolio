"use client";

import { useProyecto } from "@/hooks/useProyecto";
import { Grid } from "@mui/material";
import ProjectSkeleton from "../animaciones/ProjectSkeleton";
import ProjectCardItem from "./ProjectCardItem";

export default function ProjectCard() {
  const { proyectos, loading } = useProyecto();

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ flexWrap: "wrap" }}>
      {loading ? (
        <ProjectSkeleton />
      ) : (
        proyectos
          .sort((a, b) => Number(new Date(b.fecha)) - Number(new Date(a.fecha)))
          .map((proyecto, index) => <ProjectCardItem key={index} proyecto={proyecto} index={index} />)
      )}
    </Grid>
  );
}
