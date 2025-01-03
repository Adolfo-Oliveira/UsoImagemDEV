import React, { useState } from "react";
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
  const [openConfirmDialog, setOpenConfirmDialog] = useState(true); 
  const [openMessageDialog, setOpenMessageDialog] = useState(false);

  const handleConfirm = async () => {
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

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage("Erro ao validar o usuário.");
      }
    } catch (error) {
      setMessage("Erro ao conectar com o servidor.");
    }

    setOpenConfirmDialog(false);
    setOpenMessageDialog(true);
  };

  const handleCancel = () => {
    setOpenConfirmDialog(false);
    setMessage("Ação cancelada.");
    setOpenMessageDialog(true);
  };

  const handleCloseMessageDialog = () => {
    setOpenMessageDialog(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Validação de Usuário</h1>

      {/* Diálogo de Confirmação */}
      <Dialog open={openConfirmDialog}>
        <DialogTitle>Validação</DialogTitle>
        <DialogContent>
          <Typography>Deseja confirmar o acesso para este usuário?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de Mensagem */}
      <Dialog open={openMessageDialog} onClose={handleCloseMessageDialog}>
        <DialogTitle>Resultado</DialogTitle>
        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMessageDialog} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};


export default ValidarUsuario;
