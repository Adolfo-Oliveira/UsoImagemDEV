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

const AssinaturaCard = ({ assinatura, formData }) => {
  
  const history = useHistory();

  const handleGoToEvent = () => {
    history.push(`/home/`);
  };

  // Função para ajustar a data ao fuso horário local
const adjustDate = (dateString) => {
  const date = new Date(dateString);

  // Corrigir a data
  date.setDate(date.getDate() + 2);
  return date.toLocaleDateString('pt-BR');
};

const formatPhone = (ddd, phone) => {
    return `(${ddd}) ${phone.slice(0, 5)}-${phone.slice(5)}`;
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Card sx={{ minWidth: 600, maxWidth: 600, margin: "1rem" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {assinatura.nome}
          </Typography>
          <p></p>
          {assinatura.dataNasc && (
            <Typography color="text.secondary">
              <b>Data Nascimento:</b> {adjustDate(assinatura.dataNasc)}
            </Typography>
          )}
          {assinatura.cpf && (
            <Typography color="text.secondary">
              <b>CPF:</b> {assinatura.cpf}
            </Typography>
          )}
          <Typography color="text.secondary">
            <b>Email:</b> {assinatura.email}
          </Typography>
          
          <Typography color="text.secondary">
          <b>Telefone:</b> {formatPhone(formData.ddd, formData.telefone)}
          </Typography>
          <Typography color="text.secondary">
            <b>CEP:</b> {assinatura.cep}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGoToEvent}
            style={{ marginTop: "1rem", marginLeft: "10px", backgroundColor: "#004A8D" }}
          >
            Voltar para Eventos 
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssinaturaCard;
