import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const getCookie = require("../utils/getCookie");

const LinkEvento = () => {
  const { eventoId } = useParams();
  const [formData, setFormData] = useState({
    cpf: '',
    nome: '',
    dataNascimento: '',
    email: '',
    ddd: '', 
    telefone: '',
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: ''
  });
  const [isCpfChecked, setIsCpfChecked] = useState(false);
  const [isCpfValid, setIsCpfValid] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [openLoadingDialog, setOpenLoadingDialog] = useState(false);
  const [cepDataLoaded, setCepDataLoaded] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  useEffect(() => {
    console.log('Evento ID:', eventoId);
  }, [eventoId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'cep' && value.length === 8) {
      fetchAddress(value);
    }
  };

  const handleCpfCheck = async () => {
    // Verifique se o CPF tem exatamente 11 caracteres
    if (formData.cpf.replace(/\D/g, '').length !== 11) {
      alert('O CPF deve ter exatamente 11 dígitos.');
      return;
    }
    await checkCpf(formData.cpf);
    setIsCpfChecked(true);
  };

  // const handleNewCpf = () => {
  //   setIsCpfChecked(false);
  //   setFormData({
  //     cpf: '',
  //     nome: '',
  //     dataNascimento: '',
  //     email: '',
  //     ddd: '', 
  //     telefone: '',
  //     cep: '',
  //     logradouro: '',
  //     numero: '',
  //     bairro: '',
  //     cidade: '',
  //     estado: ''
  //   });
  // };

  const handleNewCpf = () => {
    // Recarregar a página para redefinir o estado
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.cep.length !== 8) {
      alert('CEP deve ter 8 caracteres.');
      return;
    }
    if (formData.ddd.replace(/\D/g, '').length !== 2) {
      alert('DDD deve ter 2 caracteres.');
      return;
    }
    if (formData.telefone.replace(/\D/g, '').length !== 9) {
      alert('Telefone deve ter 9 dígitos.');
      return;
    }
    if (!termsAccepted) {
      alert('Você deve aceitar os termos e condições antes de enviar.');
      return;
    }
    console.log('Form Data Submitted:', formData);
    setOpenConfirmDialog(true);
  };
  const handleConfirmSubmit = () => {
    // Aqui você pode adicionar a lógica para enviar os dados
    console.log('Form Data Submitted:', formData);
    setOpenConfirmDialog(false);
    // Substitua o código abaixo pela lógica real de envio
    // submitForm(formData);
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
        .then((response) => {
          const { data } = response;
          setOpenLoadingDialog(false);
          if (data) {
            setFormData({
              cpf: data.CPF,
              nome: data.Nome,
              dataNascimento: data.DataNascimento.substring(0, 10),
              email: data.Email,
              ddd: data.DDD, 
              telefone: data.Telefone,
              cep: '',
              logradouro: data.Logradouro || formData.logradouro,
              numero: data.numero || formData.numero,
              bairro: data.Bairro || formData.bairro,
              cidade: data.Cidade || formData.cidade,
              estado: data.Estado || formData.estado
            });
            setIsCpfValid(true);
          }
        });
    } catch (error) {
      console.error('Error checking CPF:', error);
    }
  }

  async function fetchAddress(cep) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setFormData(prevFormData => ({
          ...prevFormData,
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf
        }));
        setCepDataLoaded(true);
      } else {
        alert('CEP não encontrado.');
        setCepDataLoaded(false);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      alert('Erro ao buscar endereço.');
      setCepDataLoaded(false);
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

  const formatPhone = (ddd, phone) => {
    return `(${ddd}) ${phone.slice(0, 5)}${phone.slice(5)}`;
  };

  const formatCep = (cep) => {
    return cep.replace(/\D/g, '')
      .replace(/^(\d{5})(\d{3})$/, '$1-$2');
  };

  return (
    <>
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
        ) : (
          <Button variant="contained" color="primary" onClick={handleNewCpf} style={{ backgroundColor: "#004A8D" }}>
            Digitar Novo CPF
          </Button>
        )}
        
        {isCpfChecked && (
          <>
          <InputMask
            mask="999.999.999-99"
            value={formData.cpf}
            disabled
          >
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
              disabled={!!formData.nome}
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
              disabled={!!formData.dataNascimento}
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
            <Box sx={{ display: 'flex', gap: 2 }}>
              <InputMask
                mask="99"
                value={formData.ddd}
                onChange={handleChange}
              >
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
              <InputMask
                mask="99999-9999"
                value={formData.telefone}
                onChange={handleChange}
              >
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
            </Box>
            <TextField
                  value={formData.cep}
                  onChange={handleChange}
                  label="CEP"
                  name="cep"
                  variant="outlined"
                  required
                />
            {cepDataLoaded && (
              <>
                <TextField
                  label="Logradouro"
                  name="logradouro"
                  value={formData.logradouro}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  disabled
                />
                <TextField
                  label="Número"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  variant="outlined"
                />
                <TextField
                  label="Bairro"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  disabled
                />
                <TextField
                  label="Cidade"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  disabled
                />
                <TextField
                  label="Estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  disabled
                />
              </>
            )}
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
            {isAdult ? (
              <Button type="button" onClick={handleSubmit} variant="contained" color="primary" style={{ backgroundColor: "#004A8D" }}>
              Enviar
            </Button>
          ) : (
            <Button type="button" onClick={handleSubmit} variant="contained" color="primary" style={{ backgroundColor: "#004A8D" }}>
              Compartilhar
            </Button>
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
        <DialogTitle id="terms-dialog-title">TERMO DE AUTORIZAÇÃO PARA USO DE NOME, IMAGEM, VOZ E DECLARAÇÕES</DialogTitle>
        <DialogContent>
          <DialogContentText id="terms-dialog-description">
            Autorizo o Serviço Nacional de Aprendizagem Comercial - Senac- PE a utilizar, gratuitamente, o nome, a(s) imagem(ns), voz e declarações/depoimentos produzidos na execução da Competição Senac-PE de Educação Profissional para fins de divulgação em emissoras de TV aberta/fechada, internet e demais canais de comunicação da instituição, de caráter institucional e sem finalidade lucrativa.<br /><br />
            A presente autorização abrange a captação, fixação e utilização de nome, imagem, voz e declarações para utilização no Brasil e exterior, extensível a todos e quaisquer meios de comunicação ao público, sendo outorgada livre e espontaneamente, em caráter gratuito, irrevogável e irretratável, sem qualquer custo ou ônus para o Senac-PE, seja a que título for, sem limite de tempo ou de número de utilizações, obrigando-se inclusive em todos os seus termos, por mim, meus herdeiros e sucessores.<br /><br />
            O participante poderá, a qualquer tempo, requerer informações acerca dos dados pessoais, podendo inclusive, solicitar ao Senac-PE a retificação dos mesmos, bem como a revogação do consentimento em relação ao seu tratamento.
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
            <strong>CPF:</strong> {formatCpf(formData.cpf)}<br />
            <strong>Nome:</strong> {formData.nome}<br />
            <strong>Data de Nascimento:</strong> {formatDate(formData.dataNascimento)}<br />
            <strong>Email:</strong> {formData.email}<br />
            <strong>Telefone:</strong> {formatPhone(formData.ddd, formData.telefone)}<br />
            <strong>CEP:</strong> {formatCep(formData.cep)}<br />
            <strong>Logradouro:</strong> {formData.logradouro}<br />
            <strong>Número:</strong> {formData.numero}<br />
            <strong>Bairro:</strong> {formData.bairro}<br />
            <strong>Cidade:</strong> {formData.cidade}<br />
            <strong>Estado:</strong> {formData.estado}<br /><br />
            Deseja confirmar a assinatura?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelSubmit} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmSubmit} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LinkEvento;
