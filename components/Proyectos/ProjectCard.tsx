"use client";

import { ExpandMore } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton"; // Importa Skeleton
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Proyecto {
  titulo: string;
  fecha: string;
  descripcion: string;
  foto: string;
  sitioWeb: string;
  github: string;
}

export default function ProjectCard() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProyectos = async () => {
      const response = await fetch("/api/proyectos");
      const data = await response.json();
      setProyectos(data);
      setLoading(false);
    };

    fetchProyectos();
  }, []);

  const handleExpandClick = (index: number) => {
    setExpanded(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ flexWrap: "wrap" }}>
      {loading ? (
        Array.from(new Array(4)).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ minWidth: 300, maxWidth: "100%", borderRadius: "16px", boxShadow: 3, background: "linear-gradient(45deg, #0a0f29, #122b4e, #0077b6)"}}>
              <CardContent>
                <Skeleton variant="text" width="60%" height={30} />
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="80%" />
              </CardContent>
              <CardActions>
                <Skeleton variant="rectangular" width="40%" height={40} />
                <Skeleton variant="rectangular" width="40%" height={40} />
              </CardActions>
            </Card>
          </Grid>
        ))
      ) : (
        proyectos.map((proyecto, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                minWidth: 300,
                maxWidth: "100%",
                background: "linear-gradient(45deg, #0a0f29, #122b4e, #0077b6)",
                borderRadius: "16px",
                boxShadow: 3,
                overflow: "hidden",
                width: "100%",
                flexWrap: "wrap"
              }}
            >
              <CardContent sx={{ paddingBottom: "16px" }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                  {proyecto.titulo}
                </Typography>
                <Typography component="div">
                  <Image
                    src={proyecto.foto}
                    alt={proyecto.titulo}
                    layout="responsive"
                    width={500}
                    height={300}
                    style={{ borderRadius: "8px" }}
                  />
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                  {proyecto.fecha}
                </Typography>
                {expanded[index] && (
                  <Typography variant="body2" sx={{ marginTop: 2 }}>
                    {proyecto.descripcion}
                  </Typography>
                )}
              </CardContent>
              <CardActions className="card-actions">
                <Button
                  className="button"
                  size="small"
                  onClick={() => handleExpandClick(index)}
                  endIcon={
                    <ExpandMore
                      sx={{
                        transform: expanded[index] ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  }
                >
                  {expanded[index] ? "Ocultar descripción" : "Descripción"}
                </Button>
                <Button className="button" size="small" href={proyecto.sitioWeb} disabled={!proyecto.sitioWeb} target="_blank">
                  Sitio Web
                </Button>
                <Button className="button" size="small" href={proyecto.github} target="_blank">
                  GitHub
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
}
