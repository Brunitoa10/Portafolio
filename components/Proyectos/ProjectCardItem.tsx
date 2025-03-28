import { ProjectCardItemProps } from "@/types/ProyectoInterface";
import { ExpandMore } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";



export default function ProjectCardItem({ proyecto }: ProjectCardItemProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(prev => !prev);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
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
          <Typography variant="body2" sx={{ marginBottom: 1, fontWeight: "bold" }}>
            {proyecto.tecnologias}
          </Typography>
          {expanded && (
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              {proyecto.descripcion}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            className="button"
            sx={{
                minWidth: "auto",
                padding: "6px 12px",
                display: "flex",
                alignItems: "center",
                gap: "0.05px",
              }}
            size="small"
            onClick={handleExpandClick}
            endIcon={
              <ExpandMore
                sx={{
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            }
          >
            {expanded ? "Ocultar descripción" : "Descripción"}
          </Button>
          <Button  className="button" size="small" href={proyecto.sitioWeb} disabled={!proyecto.sitioWeb} target="_blank">
            Sitio Web
          </Button>
          <Button  className="button" size="small" href={proyecto.github} target="_blank">
            GitHub
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
