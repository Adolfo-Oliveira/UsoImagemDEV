import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const EventoCard = ({ evento }) => {
  const handleGoToEvent = () => {
    // Implemente aqui a lógica para redirecionar para a página do evento
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Card sx={{ minWidth: 700, maxWidth: 700, margin: "1rem" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {evento.titulo}
          </Typography>
          <Typography color="text.secondary"><b>Data:</b> {evento.data}</Typography>
          <Typography color="text.secondary"><b>Hora:</b> {evento.hora}</Typography>
          <Typography color="text.secondary"><b>Descricao:</b> {evento.descricao}</Typography>
          <Typography color="text.secondary"><b>Categoria:</b> {evento.categoria}</Typography>
          <Typography color="text.secondary"><b>Eixo:</b> {evento.eixo}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGoToEvent}
            style={{ marginTop: "1rem", backgroundColor: "#004A8D" }}
          >
            Ir para o evento
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventoCard;
