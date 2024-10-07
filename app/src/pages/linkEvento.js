import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const getCookie = require("../utils/getCookie");

const LinkEvento = (props) => {

  const { eventoId } = props.match.params
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setIpAddress(response.data.ip);
      } catch (error) {
        console.error('Erro ao obter endereço IP:', error);
      }
    };

    fetchIpAddress();
  }, []);
  const [formData, setFormData] = useState({
    cpf: '',
    nome: '',
    dataNascimento: '',
    email: '',
    ddd: '',
    telefone: '',
    nomeResp: '',
    cpfResp: '',
    dataNascimentoResp: '',
    dddResp: '',
    telefoneResp: '',
    emailResp: '',
    fkEvento: eventoId,
  });
  const [isCpfChecked, setIsCpfChecked] = useState(false);
  const [isCpfValid, setIsCpfValid] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [openLoadingDialog, setOpenLoadingDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
  }, [eventoId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
  
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }
  
    let soma = 0;
    let resto;
  
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
  
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
  
    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }
  
    soma = 0;
  
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
  
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
  
    if (resto !== parseInt(cpf.substring(10, 11))) {
      return false;
    }
  
    return true;
  };
  
  const handleCpfCheck = async () => {
    const cpf = formData.cpf.replace(/\D/g, '');
  
    if (!validarCPF(cpf)) {
      alert('CPF inválido. Por favor, verifique e tente novamente.');
      return;
    }
  
    await checkCpf(formData.cpf);
    setIsCpfChecked(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.cpf || !formData.nome || !formData.email || !formData.ddd || !formData.telefone)  {
      alert('Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }
    if (!termsAccepted) {
      alert('Você deve aceitar os termos e condições antes de enviar.');
      return;
    }
    setOpenConfirmDialog(true);
  };

  const handleConfirmSubmit = () => {
  const token = getCookie('_token_uso_imagem');

  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      cpf: formData.cpf,
      nome: formData.nome,
      dataNasc: formData.dataNascimento,
      email: formData.email,
      ddd: formData.ddd,
      telefone: formData.telefone,
      fkEvento: eventoId,
      nomeResp: formData.nomeResp,
      cpfResp: formData.cpfResp,
      dataNascResp: formData.dataNascimentoResp,
      dddResp: formData.dddResp,
      telefoneResp: formData.telefoneResp,
      emailResp: formData.emailResp,
      ip: ipAddress,
    })
  }

  setOpenDialog(false);

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/assinatura/`, params)
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorResponse => {
            throw new Error(errorResponse.message || 'Erro ao salvar. Tente novamente.');
          });
        }
        return response.json();
      })
      .then(response => {
        setIsSuccess(true);
        setMessage('Assinatura realizada com sucesso!');
        setOpenDialog(true);
      })
      .catch(err => {
        console.error("Erro ao salvar assinatura:", err);
        
        setIsSuccess(false);
        
        if (err.message.includes('Violation of UNIQUE KEY constraint')) {
          setMessage('Erro: CPF já está cadastrado. Por favor, verifique os dados inseridos.');
        } else {
          setMessage(err.message || 'Erro desconhecido');
        }

        setOpenDialog(true);
      });
  }

  const handleDialogClose = () => {
    setOpenDialog(false);
  }

  const handleSuccessDialogClose = () => {
    setOpenSuccessDialog(false);
    window.location.href = "https://www.pe.senac.br/";
  }; 

  const handleCancelSubmit = () => {
    setOpenConfirmDialog(false);
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  async function checkCpf(CPF) {
    setOpenLoadingDialog(true);
    const token = getCookie('_token_uso_imagem');
    const params = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
    try {
      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/aluno/${CPF}`, params)
        .then((response) => response.json())
        .then(async (response) => {
          const { data } = response;
          setOpenLoadingDialog(false);
          if (data) {
            setFormData({
              cpf: data.CPF,
              nome: data.Nome,
              dataNascimento: data.DataNascimento.substring(0, 10),
              email: data.Email,
              ddd: data.DDD,
              telefone: data.Telefone
            });
            setIsCpfValid(true);
          }
        });
    } catch (error) {
      console.error('Error checking CPF:', error);
    }
  }

  const handleOpenTerms = () => {
    setOpenTerms(true);
  };

  const handleCloseTerms = () => {
    setOpenTerms(false);
  };

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const isAdult = calculateAge(formData.dataNascimento) >= 18;

  const formatCpf = (cpf) => {
    return cpf.replace(/\D/g, '')
      .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value 
    });
  };

  return (
    <>
    <AppBar position="static" style={{ backgroundColor: "#004A8D", marginBottom: '20px' }}>
        <Toolbar style={{justifyContent: 'center'}}>
          <Typography variant="h6">
            SENAC - Uso de Imagem
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
  component="form"
  sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto', mt: 5 }}
  onSubmit={handleSubmit}
>
  
  {!isCpfChecked ? (
    <>
      <TextField
        label="CPF"
        name="cpf"
        value={formData.cpf}
        onChange={handleChange}
        variant="outlined"
        required
      />
      <Button variant="contained" color="primary" onClick={handleCpfCheck} style={{ backgroundColor: "#004A8D" }}>
        Verificar CPF
      </Button>
    </>
  ) : isCpfValid ? (
    <>
      <DialogTitle id="terms-dialog-title" style={{ fontSize: '18px', fontWeight: 'normal', textAlign: 'justify' }}>
        TERMO DE AUTORIZAÇÃO PARA USO DE NOME, IMAGEM, VOZ E DECLARAÇÕES
      </DialogTitle>
      
      
      {isAdult ? (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
    <DialogContentText id="terms-dialog-description-adult" style={{ fontSize: '16px', fontWeight: 'normal', textAlign: 'justify' }}>
            Eu, <strong>{formData.nome}</strong>, brasileiro(a), nascido(a) em <strong>{(formData.dataNascimento)}</strong>, CPF: <strong>{(formData.cpf)}</strong>, e-mail: <strong>{formData.email}</strong>, telefone: <strong>({formData.ddd}){formData.telefone}</strong>, autorizo o Serviço Nacional de Aprendizagem Comercial - Senac- PE a utilizar, gratuitamente, o nome, a(s) imagem(ns), voz e declarações/depoimentos produzidos na execução da Competição Senac-PE de Educação Profissional para fins de divulgação em emissoras de TV aberta/fechada, internet e demais canais de comunicação da instituição, de caráter institucional e sem finalidade lucrativa.<br /><br />
            A presente autorização abrange a captação, fixação e utilização de nome, imagem, voz e declarações para utilização no Brasil e exterior, extensível a todos e quaisquer meios de comunicação ao público, sendo outorgada livre e espontaneamente, em caráter gratuito, irrevogável e irretratável, sem qualquer custo ou ônus para o Senac-PE, seja a que título for, sem limite de tempo ou de número de utilizações, obrigando-se inclusive em todos os seus termos, por mim, meus herdeiros e sucessores.<br /><br />
            A qualquer tempo, poderei requerer informações acerca dos dados pessoais, podendo inclusive, solicitar ao Senac-PE a retificação dos mesmos, bem como a revogação do consentimento em relação ao seu tratamento.
      </DialogContentText>
    <FormControlLabel
        control={
          <Checkbox
            checked={termsAccepted}
            onChange={handleTermsChange}
            name="termsAccepted"
            color="primary"
          />
        }
        style={{ justifyContent: 'center', color: "#004A8D" }}
        label="Eu li e aceito os termos e condições"
      />
    <Button 
      type="submit" 
      variant="contained" 
      color="primary" 
      style={{ backgroundColor: "#004A8D", width: '100%' }}
    >
      Enviar
    </Button>
    <Button 
      variant="contained" 
      color="primary" 
      style={{ backgroundColor: "#004A8D", width: '100%' }} 
      onClick={() => window.location.reload()}
    >
      Voltar
    </Button>
  </div>
) : (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
    <DialogContentText id="terms-dialog-description" style={{ fontSize: '16px', fontWeight: 'normal', textAlign: 'justify' }}>
            Eu, <strong>{formData.nomeResp}</strong>, brasileiro(a), nascido(a) em <strong>{(formData.dataNascimentoResp)}</strong>, CPF: <strong>{(formData.cpfResp)}</strong>, e-mail: <strong>{formData.emailResp}</strong>, telefone: <strong>({formData.dddResp}){formData.telefoneResp}</strong>, responsável de <strong>{formData.nome}</strong>, brasileiro(a), nascido(a) em <strong>{(formData.dataNascimento)}</strong>, CPF: <strong>{(formData.cpf)}</strong>, e-mail: <strong>{formData.email}</strong>, telefone: <strong>({formData.ddd}){formData.telefone}</strong>, autorizo o Serviço Nacional de Aprendizagem Comercial - Senac- PE a utilizar, gratuitamente, o nome, a(s) imagem(ns), voz e declarações/depoimentos produzidos na execução da Competição Senac-PE de Educação Profissional para fins de divulgação em emissoras de TV aberta/fechada, internet e demais canais de comunicação da instituição, de caráter institucional e sem finalidade lucrativa.<br /><br />
            A presente autorização abrange a captação, fixação e utilização de nome, imagem, voz e declarações para utilização no Brasil e exterior, extensível a todos e quaisquer meios de comunicação ao público, sendo outorgada livre e espontaneamente, em caráter gratuito, irrevogável e irretratável, sem qualquer custo ou ônus para o Senac-PE, seja a que título for, sem limite de tempo ou de número de utilizações, obrigando-se inclusive em todos os seus termos, por mim, meus herdeiros e sucessores.<br /><br />
            A qualquer tempo, poderei requerer informações acerca dos dados pessoais, podendo inclusive, solicitar ao Senac-PE a retificação dos mesmos, bem como a revogação do consentimento em relação ao seu tratamento.
      </DialogContentText>
    <h3>Dados do Responsável</h3>
    
    <TextField
      label="Nome do Responsável"
      name="nomeResp"
      variant="outlined"
      value={formData.nomeResp}
      onChange={handleInputChange}
      fullWidth
      required
    />
    
    <TextField
      label="CPF do Responsável"
      name= "cpfResp"
      variant="outlined"
      value={formData.cpfResp}
      onChange={handleInputChange}
      fullWidth
      required
    />
    
    <TextField
      label="Data de Nascimento do Responsável"
      name= "dataNascimentoResp"
      variant="outlined"
      value={formData.dataNascimentoResp}
      onChange={handleInputChange}
      fullWidth
      type="date"
      InputLabelProps={{ shrink: true }}
      required
    />
    
    <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
      <TextField
        label="DDD"
        name= "dddResp"
        variant="outlined"
        value={formData.dddResp}
        onChange={handleInputChange}
        required
        style={{ flex: '1' }}
      />
      <TextField
        label="Telefone do Responsável"
        name= "telefoneResp"
        variant="outlined"
        value={formData.telefoneResp}
        onChange={handleInputChange}
        required
        style={{ flex: '4' }}
      />
    </div>
    
    <TextField
      label="Email do Responsável"
      name= "emailResp"
      variant="outlined"
      value={formData.emailResp}
      onChange={handleInputChange}
      fullWidth
      required
    />

      <FormControlLabel
        control={
          <Checkbox
            checked={termsAccepted}
            onChange={handleTermsChange}
            name="termsAccepted"
            color="primary"
          />
        }
        style={{ justifyContent: 'center', color: "#004A8D" }}
        label="Eu li e aceito os termos e condições"
      />
    
    <Button 
      type="submit" 
      variant="contained" 
      color="primary" 
      style={{ backgroundColor: "#004A8D", width: '100%' }}
    >
      Enviar
    </Button>
    
    <Button 
      variant="contained" 
      color="primary" 
      style={{ backgroundColor: "#004A8D", width: '100%' }} 
      onClick={() => window.location.reload()}
    >
      Voltar
    </Button>
  </div>
)}

    </>
  ) : (
    <>
      <h2><b>Preencha os seus dados</b></h2>
      <InputMask mask="999.999.999-99" value={formData.cpf} disabled>
        {() => (
          <TextField
            label="CPF"
            name="cpf"
            variant="outlined"
            required
            disabled
          />
        )}
      </InputMask>
      <TextField
        label="Nome"
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        variant="outlined"
        required
        disabled={isCpfValid}
      />
      <TextField
        label="Data de Nascimento"
        name="dataNascimento"
        type="date"
        value={formData.dataNascimento}
        onChange={handleChange}
        variant="outlined"
        required
        InputLabelProps={{
          shrink: true,
        }}
        disabled={isCpfValid}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        variant="outlined"
        required
      />
      <box><InputMask mask="99" value={formData.ddd} onChange={handleChange}>
          {() => (
            <TextField
              label="DDD"
              name="ddd"
              variant="outlined"
              required
              sx={{ width: '20%' }}
            />
          )}
        </InputMask>
        <InputMask mask="999999999" value={formData.telefone} onChange={handleChange}>
          {() => (
            <TextField
              label="Telefone"
              name="telefone"
              variant="outlined"
              required
              sx={{ width: '80%' }}
            />
          )}
        </InputMask>
      </box>
      
      {isAdult ? (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>

      <DialogTitle id="terms-dialog-title" style={{ fontSize: '18px', fontWeight: 'normal', textAlign: 'justify' }}>
        TERMO DE AUTORIZAÇÃO PARA USO DE NOME, IMAGEM, VOZ E DECLARAÇÕES
      </DialogTitle>

      <DialogContentText id="terms-dialog-description-adult" style={{ fontSize: '16px', fontWeight: 'normal', textAlign: 'justify' }}>
            Eu, <strong>{formData.nome}</strong>, brasileiro(a), nascido(a) em <strong>{(formData.dataNascimento)}</strong>, CPF: <strong>{(formData.cpf)}</strong>, e-mail: <strong>{formData.email}</strong>, telefone: <strong>({formData.ddd}){formData.telefone}</strong>, autorizo o Serviço Nacional de Aprendizagem Comercial - Senac- PE a utilizar, gratuitamente, o nome, a(s) imagem(ns), voz e declarações/depoimentos produzidos na execução da Competição Senac-PE de Educação Profissional para fins de divulgação em emissoras de TV aberta/fechada, internet e demais canais de comunicação da instituição, de caráter institucional e sem finalidade lucrativa.<br /><br />
            A presente autorização abrange a captação, fixação e utilização de nome, imagem, voz e declarações para utilização no Brasil e exterior, extensível a todos e quaisquer meios de comunicação ao público, sendo outorgada livre e espontaneamente, em caráter gratuito, irrevogável e irretratável, sem qualquer custo ou ônus para o Senac-PE, seja a que título for, sem limite de tempo ou de número de utilizações, obrigando-se inclusive em todos os seus termos, por mim, meus herdeiros e sucessores.<br /><br />
            A qualquer tempo, poderei requerer informações acerca dos dados pessoais, podendo inclusive, solicitar ao Senac-PE a retificação dos mesmos, bem como a revogação do consentimento em relação ao seu tratamento.
      </DialogContentText>


      <FormControlLabel
        control={
          <Checkbox
            checked={termsAccepted}
            onChange={handleTermsChange}
            name="termsAccepted"
            color="primary"
          />
        }
        style={{ justifyContent: 'center', color: "#004A8D" }}
        label="Eu li e aceito os termos e condições"
      />
    <Button 
      type="submit" 
      variant="contained" 
      color="primary" 
      style={{ backgroundColor: "#004A8D", width: '100%' }}
    >
      Enviar
    </Button>
    <Button 
      variant="contained" 
      color="primary" 
      style={{ backgroundColor: "#004A8D", width: '100%' }} 
      onClick={() => window.location.reload()}
    >
      Voltar
    </Button>
  </div>
) : (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
    <h3>Dados do Responsável</h3>
    
    <TextField
      label="Nome do Responsável"
      name="nomeResp"
      variant="outlined"
      value={formData.nomeResp}
      onChange={handleInputChange}
      fullWidth
      required
    />
    
    <TextField
      label="CPF do Responsável"
      name= "cpfResp"
      variant="outlined"
      value={formData.cpfResp}
      onChange={handleInputChange}
      fullWidth
      required
    />
    
    <TextField
      label="Data de Nascimento do Responsável"
      name= "dataNascimentoResp"
      variant="outlined"
      value={formData.dataNascimentoResp}
      onChange={handleInputChange}
      fullWidth
      type="date"
      InputLabelProps={{ shrink: true }}
      required
    />
    
    <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
      <TextField
        label="DDD"
        name= "dddResp"
        variant="outlined"
        value={formData.dddResp}
        onChange={handleInputChange}
        required
        style={{ flex: '1' }}
      />
      <TextField
        label="Telefone do Responsável"
        name= "telefoneResp"
        variant="outlined"
        value={formData.telefoneResp}
        onChange={handleInputChange}
        required
        style={{ flex: '4' }}
      />
    </div>
    
    <TextField
      label="Email do Responsável"
      name= "emailResp"
      variant="outlined"
      value={formData.emailResp}
      onChange={handleInputChange}
      fullWidth
      required
    />

<Button onClick={handleOpenTerms} style={{ color: "#004A8D" }}>
        Termos e Condições
      </Button>
      <FormControlLabel
        control={
          <Checkbox
            checked={termsAccepted}
            onChange={handleTermsChange}
            name="termsAccepted"
            color="primary"
          />
        }
        style={{ justifyContent: 'center', color: "#004A8D" }}
        label="Eu li e aceito os termos e condições"
      />
    
    <Button 
      type="submit" 
      variant="contained" 
      color="primary" 
      style={{ backgroundColor: "#004A8D", width: '100%' }}
    >
      Enviar
    </Button>
    
    <Button 
      variant="contained" 
      color="primary" 
      style={{ backgroundColor: "#004A8D", width: '100%' }} 
      onClick={() => window.location.reload()}
    >
      Voltar
    </Button>
  </div>
)}

    </>
  )}
</Box>


      <Dialog
        open={openTerms}
        onClose={handleCloseTerms}
        aria-labelledby="terms-dialog-title"
        aria-describedby="terms-dialog-description"
      >
        <DialogTitle id="terms-dialog-title" style={{ fontSize: '18px', fontWeight: 'normal', textAlign: 'justify' }}>TERMO DE AUTORIZAÇÃO PARA USO DE NOME, IMAGEM, VOZ E DECLARAÇÕES</DialogTitle>
        <DialogContent>
        <DialogContentText id="terms-dialog-description" style={{ fontSize: '16px', fontWeight: 'normal', textAlign: 'justify' }}>
            Eu, <strong>{formData.nomeResp}</strong>, brasileiro(a), nascido(a) em <strong>{(formData.dataNascimentoResp)}</strong>, CPF: <strong>{(formData.cpfResp)}</strong>, e-mail: <strong>{formData.emailResp}</strong>, telefone: <strong>({formData.dddResp}){formData.telefoneResp}</strong>, responsável de <strong>{formData.nome}</strong>, brasileiro(a), nascido(a) em <strong>{(formData.dataNascimento)}</strong>, CPF: <strong>{(formData.cpf)}</strong>, e-mail: <strong>{formData.email}</strong>, telefone: <strong>({formData.ddd}){formData.telefone}</strong>, autorizo o Serviço Nacional de Aprendizagem Comercial - Senac- PE a utilizar, gratuitamente, o nome, a(s) imagem(ns), voz e declarações/depoimentos produzidos na execução da Competição Senac-PE de Educação Profissional para fins de divulgação em emissoras de TV aberta/fechada, internet e demais canais de comunicação da instituição, de caráter institucional e sem finalidade lucrativa.<br /><br />
            A presente autorização abrange a captação, fixação e utilização de nome, imagem, voz e declarações para utilização no Brasil e exterior, extensível a todos e quaisquer meios de comunicação ao público, sendo outorgada livre e espontaneamente, em caráter gratuito, irrevogável e irretratável, sem qualquer custo ou ônus para o Senac-PE, seja a que título for, sem limite de tempo ou de número de utilizações, obrigando-se inclusive em todos os seus termos, por mim, meus herdeiros e sucessores.<br /><br />
            A qualquer tempo, poderei requerer informações acerca dos dados pessoais, podendo inclusive, solicitar ao Senac-PE a retificação dos mesmos, bem como a revogação do consentimento em relação ao seu tratamento.
      </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTerms} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openConfirmDialog}
        onClose={handleCancelSubmit}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Confirmação dos dados para assinatura dos termos</DialogTitle>
        <DialogContent>
  <DialogContentText id="confirm-dialog-description">
    <b>Você está prestes a assinar com os seguintes dados:</b><br /><br />
    <strong>CPF:</strong> {formData.cpf ? formatCpf(formData.cpf) : ''} <br />
    <strong>Nome:</strong> {formData.nome ? formData.nome : ''} <br />
    <strong>Data de Nascimento:</strong> {formData.dataNascimento ? formatDate(formData.dataNascimento) : ''} <br />
    <strong>Email:</strong> {formData.email ? formData.email : ''} <br />
    <strong>DDD:</strong> {formData.ddd ? formData.ddd : ''} <br />
    <strong>Telefone:</strong> {formData.telefone ? formData.telefone : ''} <br /><br />

    {/* Condicional para mostrar mais dados se CPF resp estiver presente */}
    {formData.cpfResp && (
      
      <>
        <b>Dados do Responsável</b> <br />
        <strong>CPF Responsável:</strong> {formatCpf(formData.cpfResp)} <br />
        <strong>Nome do Responsável:</strong> {formData.nomeResp} <br />
        <strong>Email do Responsável:</strong> {formData.emailResp} <br />
        <strong>Telefone do Responsável:</strong> {formData.telefoneResp} <br />
      </>
    )}

    Deseja confirmar a assinatura?
  </DialogContentText>
</DialogContent>


        <DialogActions>
            <Button onClick={handleCancelSubmit} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleConfirmSubmit} color="primary" autoFocus>
              Confirmar
            </Button>
          </DialogActions>
      </Dialog>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
      >
        <DialogTitle style={{ textAlign: 'center' }}>
          {isSuccess ? 'Sucesso' : 'Erro'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
          {isSuccess && (
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <CheckCircleIcon style={{ color: 'green', fontSize: '60px' }} />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={isSuccess ? handleSuccessDialogClose : handleDialogClose}
            color="primary" 
            autoFocus>
            {isSuccess ? 'OK' : 'Fechar'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LinkEvento;
