import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const ValidarUsuario = (props) => {
  const { id } = props.match.params;

  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const validarUsuario = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_DOMAIN_API}/api/assinatura/confirmar-acesso/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          }
        );

        const data = await response.json();

        if (response.status === 200) {
          setMessage(data.message);
        } else {
          setMessage("Erro ao validar o usuário.");
        }
        setOpen(true); // Abre o diálogo após a resposta
      } catch (error) {
        setMessage("Erro ao conectar com o servidor.");
      }
    };

    validarUsuario();
  }, [id]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Validação de Usuário</h1>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmação</DialogTitle>
        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ValidarUsuario;
