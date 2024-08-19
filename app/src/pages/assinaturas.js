import {
  CircularProgress,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
  
  import EditIcon from "@mui/icons-material/Edit";
  import TaskFilter from "../components/task-filter";
  import TaskItem from "../components/task-item";
  import AssinaturaCard from "../components/AssinaturaCard";
  import AddIcon from "@mui/icons-material/Add";
  import React, { useEffect, useState } from "react";
  import InputAdornment from "@mui/material/InputAdornment";
  import SearchIcon from "@mui/icons-material/Search";
  import { blue } from "@mui/material/colors";
  import LinkEvento from "./linkEvento";
  // import AssinaturaCard from "../components/assinaturaCard";
  const getCookie = require("../utils/getCookie");
  
  
  const Assinaturas = (props) => {
    const { id } = props.match.params;
    const [assinaturas, setAssinaturas] = useState([]);
    // const [openLoadingDialog, setOpenLoadingDialog] = useState(false);
    // const [openMessageDialog, setOpenMessageDialog] = useState(false);
    // const [message, setMessage] = useState("");
  
    // const [titulo, setTitulo] = useState("");
    // const [data, setData] = useState("");
    // const [hora, setHora] = useState("");
    // const [descricao, setDescricao] = useState("");
    // const [categoria, setCategoria] = useState("");
    // const [eixo, setEixo] = useState("");
    const [filtroNome, setFiltroNome] = useState("");

  // Função para ajustar a data ao fuso horário local
const adjustDate = (dateString) => {
  const date = new Date(dateString);

  // Corrigir a data
  date.setDate(date.getDate() );
  return date.toLocaleDateString('pt-BR');
};

// const formatPhone = (ddd, phone) => {
//     return `(${ddd}) ${phone.slice(0, 5)}-${phone.slice(5)}`;
//   };

  const formatCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "");
  
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  // const formatCEP = (cep) => {
  //   cep = cep.replace(/\D/g, "");
  
  //   return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
  // };
  
    const handleFiltroChange = (assinatura) => {
      setFiltroNome(assinatura.target.value);
    };
    // const [caminho, setCaminho] = useState("");
  
    // const [fkUsuario, setFkUsuario] = useState(null);
    // const [fkCham, setFkCham] = useState(null);
    // const [executor, setExecutor] = useState("");
    // const [obsDemandante, setObsDemandante] = useState("");
    // const [criticidadeChefe, setCriticidade] = useState(null);
  
    const [open, setOpen] = useState(false);
  
  
  
   
  
   
  
    // const carregarAssinatura = async () => {
    //   setOpenLoadingDialog(true);
    //   const token = getCookie('_token_uso_imagem');
    //   const params = {
    //     headers: {
    //       'Authorization': `Bearer ${token}`
    //     }
    //   };
    //   try {
    //     const response = await fetch(`${process.env.REACT_APP_DOMAIN_API}/api/assinatura/`, params);
    //     const data = await response.json();
    //     setOpenLoadingDialog(false);
    //     if (data.data) {
    //       setAssinatura(data.data);
    //     }
    //   } catch (err) {
    //     setOpenLoadingDialog(false);
    //     console.error("Erro ao carregar assinaturas:", err);
    //   }
    // };

    function carregarAssinaturas() {

      const token = getCookie('_token_uso_imagem')
      const params = {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }

      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/assinatura/${id ? id : ''}`, params)
          .then(response => {
              const { status } = response
              response.json().then(data => {
                  if (status === 401) {
                  } else if (status === 200) {
                      // alert(JSON.stringify(data.data))

                      setAssinaturas(data.data)

                      // alert('oi ' +JSON.stringify( minhasAtividades))
                      // setUsuariosNaoValidados(data.data)
                  }
              })
          })


  }
    
  
    useEffect(() => {
      // alert(id)

      // if (assinaturas){
      //   alert(JSON.stringify(assinaturas))
      // }

      if (id){
        carregarAssinaturas();

      }


      
    }, [assinaturas]);
  
    // const onSave = () => {
    
    //   setOpenLoadingDialog(true);
    //   const token = getCookie('_token_uso_imagem');
    //   const params = {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${token}`
    //     },
    //     body: JSON.stringify({
    //       titulo,
    //       data,
    //       hora,
    //       descricao,
    //       categoria,
    //       eixo,
    //       // fkUsuario,
    //       // fkQr
    //     })
    //   }
  
    //   fetch(`${process.env.REACT_APP_DOMAIN_API}/api/evento/`, params)
    //   .then(response => {
    //     return response.json()
    //   })
    //   .then(response => {
    //     setOpenLoadingDialog(false)
    //     setOpen(false);
    //     setMessage(response.message);
    //     setOpenMessageDialog(true);
    //     carregarRegistro()
    //   })
    //   .catch(err => {
    //     setOpenLoadingDialog(false);
    //     setMessage(err.message);
    //     setOpenMessageDialog(true);
    //     console.error("Erro ao salvar evento:", err);
    //   });
    // }
  
    return (
      <div>
        <div style={{display: "flex", justifyContent: "center"}}>
          <TextField
            label="Buscar por nome da assinatura"
            variant="outlined"
            fullWidth
            value={filtroNome}
            onChange={handleFiltroChange}
            style={{ marginBottom: "1rem", marginTop: "1rem", backgroundColor: "white", width: "50%" }}
          />
        </div>

        {assinaturas.length ? '' : <div style={{textAlign: 'center', alignItems: 'center'}}>
          <p><b>Não existe assinaturas nesse evento</b></p>
          {/* <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/home/`}
            style={{
              marginTop: '1rem',
              backgroundColor: '#004A8D',
            }}
          >
            Voltar para Eventos
          </Button> */}
        </div> }

        {assinaturas.length > 0 ?
        <div>
        {assinaturas
          .filter((assinatura) =>
            assinatura.nome.toLowerCase().includes(filtroNome.toLowerCase())
          )
          .map((assinatura) => (
            <div
              style={{ display: "flex", justifyContent: "center", width: "100%" }}
              key={assinatura.cpf}
            >
              <Card sx={{ minWidth: 600, maxWidth: 600, margin: "1rem" }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {assinatura.nome}
                  </Typography>
                  <p></p>
                  {assinatura.dataNasc && (
                    <Typography color="text.secondary">
                      <b>Data de Nascimento:</b> {adjustDate(assinatura.dataNasc)}
                    </Typography>
                  )}
                  {assinatura.cpf && (
                    <Typography color="text.secondary">
                      <b>CPF:</b> {formatCPF(assinatura.cpf)}
                    </Typography>
                  )}
                  <Typography color="text.secondary">
                    <b>Email:</b> {assinatura.email}
                  </Typography>

                  {/* <Typography color="text.secondary">
                    <b>Telefone:</b> {formatPhone(assinatura.ddd, assinatura.telefone)}
                  </Typography> */}
                  
                  <Typography color="text.secondary">
                    <b>Data da Assinatura:</b> {adjustDate(assinatura.createdAt)}
                  </Typography>

                  {/* <Typography color="text.secondary">
                    <b>CEP:</b> {formatCEP(assinatura.cep)}
                  </Typography> */}
                </CardContent>
              </Card>
              
            </div>
        ))}
        

      </div> : '' }

      <div style={{textAlign: 'center', alignItems: 'center'}}>
          <Button
                    variant="contained"
                    color="primary"
                    onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/home/`}
                    style={{
                      marginTop: "1rem",
                      // marginLeft: "10px",
                      backgroundColor: "#004A8D",
                    }}
                  >
                    Voltar para Eventos
            </Button>
      </div>
      

        
  
        {/* <Dialog open={openLoadingDialog}>
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
        </Dialog> */}
      </div>
    );
  };
  
  export default Assinaturas;
  