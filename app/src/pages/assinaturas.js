import {
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";

import React, { useEffect, useState } from "react";
const getCookie = require("../utils/getCookie");

const Assinaturas = (props) => {
  const { id } = props.match.params;
  const [assinaturas, setAssinaturas] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");

  const adjustDate = (dateString) => {
    const date = new Date(dateString);

    date.setDate(date.getDate());
    return date.toLocaleDateString("pt-BR");
  };

  const adjustDateNasc = (dateString) => {
    const date = new Date(dateString);

    date.setDate(date.getDate() + 2);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const calcularIdade = (dataNasc) => {
    const nascimento = new Date(dataNasc);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    const maiorDeIdade = idade >= 18 ? "Maior de 18 anos" : "Menor de 18 anos";
    return { idade, maiorDeIdade };
  };

  const formatCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "");

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatCPFResp = (cpfResp) => {
    cpfResp = cpfResp.replace(/\D/g, "");

    return cpfResp.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const handleFiltroChange = (assinatura) => {
    setFiltroNome(assinatura.target.value);
  };

  const [open, setOpen] = useState(false);

  function carregarAssinaturas() {
    const token = getCookie("_token_uso_imagem");
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(
      `${process.env.REACT_APP_DOMAIN_API}/api/assinatura/${id ? id : ""}`,
      params
    ).then((response) => {
      const { status } = response;
      response.json().then((data) => {
        if (status === 401) {
        } else if (status === 200) {
          setAssinaturas(data.data);
        }
      });
    });
  }

  useEffect(() => {
    if (id) {
      carregarAssinaturas();
    }
  }, [assinaturas]);
  const formatTelefone = (ddd, telefone) => {
    telefone = telefone.replace(/\D/g, "");
    ddd = ddd ? ddd.replace(/\D/g, "") : "";

    if (
      ddd.length === 2 &&
      (telefone.length === 10 || telefone.length === 11)
    ) {
      return `(${ddd}) ${telefone.slice(0, 5)}-${telefone.slice(5)}`;
    }

    return `${ddd} ${telefone}`;
  };

  const formatTelefoneResp = (dddResp, telefoneResp) => {
    telefoneResp = telefoneResp.replace(/\D/g, "");
    dddResp = dddResp ? dddResp.replace(/\D/g, "") : "";

    if (
      dddResp.length === 2 &&
      (telefoneResp.length === 10 || telefoneResp.length === 11)
    ) {
      return `(${dddResp}) ${telefoneResp.slice(0, 5)}-${telefoneResp.slice(
        5
      )}`;
    }

    return `${dddResp} ${telefoneResp}`;
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TextField
          label="Pesquisar por nome da assinatura"
          variant="outlined"
          fullWidth
          value={filtroNome}
          onChange={handleFiltroChange}
          style={{
            marginBottom: "1rem",
            marginTop: "1rem",
            backgroundColor: "white",
            width: "50%",
          }}
        />
      </div>

      {assinaturas.length ? (
        ""
      ) : (
        <div style={{ textAlign: "center", alignItems: "center" }}>
          <p>
            <b>Não existe assinaturas nesse evento</b>
          </p>
        </div>
      )}

      {assinaturas.length > 0 ? (
        <div>
          <Typography
            variant="body1"
            style={{ textAlign: "center", alignItems: "center" }}
          >
            {`Total de assinaturas: ${
              assinaturas.filter((assinatura) =>
                assinatura.nome.toLowerCase().includes(filtroNome.toLowerCase())
              ).length
            }`}
          </Typography>

          {assinaturas
            .filter((assinatura) =>
              assinatura.nome.toLowerCase().includes(filtroNome.toLowerCase())
            )
            .map((assinatura) => {
              const { idade, maiorDeIdade } = calcularIdade(
                assinatura.dataNasc
              ); // Desestruturação correta
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
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
                          <b>Idade:</b> {idade} anos ({maiorDeIdade})
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
                      <Typography color="text.secondary">
                        <b>Telefone:</b>{" "}
                        {formatTelefone(assinatura.ddd, assinatura.telefone)}
                      </Typography>
                      <Typography color="text.secondary">
                        <b>Data da Assinatura:</b>{" "}
                        {adjustDate(assinatura.createdAt)}
                      </Typography>
                      {assinatura.nomeResp && (
                        <Typography color="text.secondary">
                          <h3>Dados do Responsável</h3>
                          <b>Nome do Responsável:</b> {assinatura.nomeResp}
                          <br />
                          <b>CPF do Responsável:</b>{" "}
                          {formatCPFResp(assinatura.cpfResp)}
                          <br />
                          <b>Email do Responsável:</b> {assinatura.emailResp}
                          <br />
                          <b>Telefone do Responsável:</b>{" "}
                          {formatTelefoneResp(
                            assinatura.dddResp,
                            assinatura.telefoneResp
                          )}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
        </div>
      ) : (
        ""
      )}

      <div style={{ textAlign: "center", alignItems: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            (window.location.href = `${process.env.REACT_APP_DOMAIN}/home/`)
          }
          style={{
            marginTop: "1rem",
            backgroundColor: "#004A8D",
          }}
        >
          Voltar para Eventos
        </Button>
      </div>
    </div>
  );
};

export default Assinaturas;
