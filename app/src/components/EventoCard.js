import React from "react";
import { useHistory } from 'react-router-dom';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LinkEvento from "../pages/linkEvento";
import TextField from "@mui/material/TextField";

const EventoCard = ({ evento, onDelete, onEdit }) => {
  const history = useHistory();

  const handleGoToEvent = (eventoId) => {
    history.push(`/linkEvento/${eventoId}`);
  };

  // const handleDelete = (id) => {
  //   if (onDelete) {
  //     onDelete(id);
  //   }
  // };

  // const handleEdit = (id) => {
  //   if (onEdit) {
  //     onEdit(id);
  //   }
  // };
  // Função para ajustar a data ao fuso horário local
const adjustDate = (dateString) => {
  const date = new Date(dateString);
  // Corrigir a data, adicionando um dia
  date.setDate(date.getDate() + 2);
  return date.toLocaleDateString('pt-BR');
};
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Card sx={{ minWidth: 600, maxWidth: 600, margin: "1rem" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {evento.titulo}
          </Typography>
          <p></p>
          {evento.data && (
            <Typography color="text.secondary">
              <b>Data:</b> {adjustDate(evento.data)}
            </Typography>
          )}
          {evento.hora && (
            <Typography color="text.secondary">
              <b>Hora:</b> {evento.hora.substring(11, 16)} Hrs
            </Typography>
          )}
          <Typography color="text.secondary">
            <b>Descricao:</b> {evento.descricao}
          </Typography>
          
          <Typography color="text.secondary">
            <b>Categoria:</b> {evento.categoria}
          </Typography>
          <Typography color="text.secondary">
            <b>Eixo:</b> {evento.eixo}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            // onClick={handleGoToEvent}
            style={{ marginTop: "1rem", marginLeft: "10px", backgroundColor: "#004A8D" }}
          >
            Ver Assinaturas
          </Button>
          
            <Button
            variant="contained"
            color="primary"
            onClick={() => handleGoToEvent(evento.id)}
            style={{ marginTop: "1rem", marginLeft: "10px", backgroundColor: "#004A8D" }}
          >
            Link Assinatura do Evento
          </Button>

          {/* <Button
                variant="contained"
                color="secondary"
                // onClick={() => handleEdit(evento.id)}
                startIcon={<EditIcon />}
                style={{ backgroundColor: "#778c43", marginTop: "1rem", marginLeft: "10px", }} // Botão de editar com cor e espaçamento
              >
                Editar
              </Button>

          <Button
              variant="contained"
              color="secondary"
              // onClick={handleDelete}
              startIcon={<DeleteIcon />}
              style={{ marginTop: "1rem", marginLeft: "10px", backgroundColor: "#ff1744" }}
            >
              Apagar
            </Button> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventoCard;
