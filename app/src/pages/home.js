import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SpeedDial,
  Fab,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import TaskFilter from "../components/task-filter";
import TaskItem from "../components/task-item";
import EventoCard from "../components/EventoCard";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { blue } from "@mui/material/colors";
import LinkEvento from "./linkEvento";
const getCookie = require("../utils/getCookie");


const Home = (props) => {
  const [openLoadingDialog, setOpenLoadingDialog] = useState(false);
  const [openMessageDialog, setOpenMessageDialog] = useState(false);
  const [message, setMessage] = useState("");

  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [eixo, setEixo] = useState("");
  const [filtroTitulo, setFiltroTitulo] = useState("");

  const handleFiltroChange = (event) => {
    setFiltroTitulo(event.target.value);
  };

  const handleChangeCategoria = (event) => {
    setCategoria(event.target.value);
  };

  const handleChangeEixo = (event) => {
    setEixo(event.target.value);
  };

  const handleClose = () => {
    setTitulo("");
    setData("");
    setHora("");
    setDescricao("");
    setCategoria("");
    setEixo("");
    setOpen(false);
  };

  const [caminho, setCaminho] = useState("");

  const [fkUsuario, setFkUsuario] = useState(null);
  const [fkCham, setFkCham] = useState(null);
  const [executor, setExecutor] = useState("");
  const [obsDemandante, setObsDemandante] = useState("");
  const [criticidadeChefe, setCriticidade] = useState(null);

  const [open, setOpen] = useState(false);



  const [registros, setRegistros] = useState([]);

 

  const carregarRegistro = async () => {
    setOpenLoadingDialog(true);
    const token = getCookie('_token_uso_imagem');
    const params = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    try {
      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/evento/`, params)
      .then(response => {
        return response.json()
      })
      .then(response => {
        setOpenLoadingDialog(false);
        if(response.data){
          setRegistros(response.data);
        }
      })
    } catch (err) {
      setOpenLoadingDialog(false);
      console.error("Erro ao carregar registros:", err);
    }
  };

  useEffect(() => {
    carregarRegistro();
  }, []);

  const onSave = () => {
  
    setOpenLoadingDialog(true);
    const token = getCookie('_token_uso_imagem');
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        titulo,
        data,
        hora,
        descricao,
        categoria,
        eixo,
        // fkUsuario,
        // fkQr
      })
    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/evento/`, params)
    .then(response => {
      return response.json()
    })
    .then(response => {
      setOpenLoadingDialog(false)
      setOpen(false);
      setMessage(response.message);
      setOpenMessageDialog(true);
      carregarRegistro()
    })
    .catch(err => {
      setOpenLoadingDialog(false);
      setMessage(err.message);
      setOpenMessageDialog(true);
      console.error("Erro ao salvar evento:", err);
    });
    
    setTitulo("");
    setData("");
    setHora("");
    setDescricao("");
    setCategoria("");
    setEixo("");
  }
  const eventosFiltrados = registros.filter((evento) =>
    evento.titulo.toLowerCase().includes(filtroTitulo.toLowerCase())
  );

  return (
    <div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <TextField
          label="Buscar por título do evento"
          variant="outlined"
          fullWidth
          value={filtroTitulo}
          onChange={handleFiltroChange}
          style={{ marginBottom: "1rem", marginTop: "1rem", backgroundColor: "white", width: "50%" }}
        />
      </div>
      <Typography variant="body1" style={{textAlign: 'center', alignItems: 'center'}}>
        {`Total de eventos: ${eventosFiltrados.length}`}
      </Typography>

      <div>
        {registros
          .filter((evento) =>
            evento.titulo.toLowerCase().includes(filtroTitulo.toLowerCase())
          )
          .map((evento) => (
            <EventoCard key={evento.id} evento={evento} />
          ))}
      </div>


      {/* <TaskFilter /> */}

      {/* <SpeedDial
        variant="outlined"
        onClick={() => setOpen(true)}
        ariaLabel="Novo Evento"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        // icon={<EditIcon />}
      /> */}

      <Fab
        variant="extended"
        onClick={() => setOpen(true)}
        aria-label="Novo Evento"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          backgroundColor: "#004A8D",
          color: "white",
          boxShadow: "none",
          '&:hover': {
            backgroundColor: "#004A8D",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)", // Sombra ao passar o mouse
          },
        }}
      >
        <AddIcon sx={{ marginRight: 1 }} />
        Criar Evento
      </Fab>

      <Dialog open={open}>
        <DialogTitle>Cadastro de Evento</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>

          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small">Titulo do Evento</InputLabel>
            <hr></hr>
            <TextField
              autoFocus
              margin="dense"
              id="Titulo do Evento"
              type="text"
              name="tituloEvento"
              fullWidth
              variant="standard"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </FormControl>

          <p></p>

          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small">Data do Evento</InputLabel>
            <hr></hr>
            <TextField
              autoFocus
              margin="dense"
              id="Data do Evento"
              type="date"
              name="dataEvento"
              fullWidth
              variant="standard"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </FormControl>

          <p></p>

          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small">Hora do Evento</InputLabel>
            <hr></hr>
            <TextField
              autoFocus
              margin="dense"
              id="Hora do Evento"
              type="time"
              name="horaEvento"
              fullWidth
              variant="standard"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
          </FormControl>

          <p></p>

          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small">Descrição do Evento</InputLabel>
            <hr></hr>
            <TextField
              autoFocus
              margin="dense"
              id="descricao"
              type="text"
              name="descricao"
              fullWidth
              variant="standard"
              rows={4}
              multiline
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </FormControl>

          <p></p>

          <FormControl fullWidth size="small" style={{ marginTop: "16px" }}>
            <InputLabel id="categoria-label">Categoria</InputLabel>
            <Select
              labelId="categoria-label"
              id="categoria"
              value={categoria}
              onChange={handleChangeCategoria}
              label="Categoria"
            >
              <MenuItem value="">
                <em>Nenhum</em>
              </MenuItem>
              <MenuItem value="Palestra">Palestra</MenuItem>
              <MenuItem value="Workshop">Workshop</MenuItem>
              <MenuItem value="Mini Curso">Mini Curso</MenuItem>
              <MenuItem value="Entrevista">Entrevista</MenuItem>
            </Select>
          </FormControl>

          <p></p>

          <FormControl fullWidth size="small" style={{ marginTop: "16px" }}>
            <InputLabel id="eixo-label">Eixo</InputLabel>
            <Select
              labelId="eixo-label"
              id="eixo"
              value={eixo}
              onChange={handleChangeEixo}
              label="Eixo"
            >
              <MenuItem value="">
                <em>Nenhum</em>
              </MenuItem>
              <MenuItem value="Tecnologia">Tecnologia</MenuItem>
              <MenuItem value="Saúde">Saúde</MenuItem>
              <MenuItem value="Beleza">Beleza</MenuItem>
              <MenuItem value="Gastronomia">Gastronomia</MenuItem>
            </Select>
          </FormControl>

          {/* <TextField
            autoFocus
            margin="dense"
            id="caminho"
            label="Envie uma imagem"
            type="file"
            name="caminho"
            fullWidth
            variant="standard"
            value={caminho}
            onChange={e => setCaminho(e.target.value)}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button 
          onClick={(e) => onSave()} color="primary"
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openLoadingDialog}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
          }}
        >
          <CircularProgress />
        </div>
      </Dialog>
      <Dialog
        open={openMessageDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Atenção</DialogTitle>
        <DialogContent style={{ width: 400 }}>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMessageDialog(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
