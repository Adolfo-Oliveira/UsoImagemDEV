import React, { useEffect, useState } from 'react';

const ValidarUsuario = (props) => {
  const { id } = props.match.params;
  
  const [message, setMessage] = useState('');

  useEffect(() => {


  
      const validarUsuario = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_DOMAIN_API}/api/assinatura/confirmar-acesso/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
          });
  
          const data = await response.json();
  
          if (response.status === 200) {
            setMessage(data.message);
          } else {
            setMessage('Erro ao validar o usuário.');
          }
        } catch (error) {
          setMessage('Erro ao conectar com o servidor.');
        }
      };

      validarUsuario();
  

  }, [id]);

  return (
    <div>
      <h2>Validação de Usuário</h2>
      <p>{message}</p>
    </div>
  );
};

export default ValidarUsuario;
