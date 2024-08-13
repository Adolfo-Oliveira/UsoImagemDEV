import React, { useState } from 'react';
import QRCode from 'react-qr-code'

const QrCode = ( props ) => {
  // const [link, setLink] = useState('')

  const qrValue = `${process.env.REACT_APP_DOMAIN}/linkEvento/${props.match.params.eventoId}`;

  return (

    <div style={{display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: '80vh'}}>
      <QRCode
        value = {qrValue}
      />
      <br></br>
      <br></br>

        <a href={qrValue} target="_blank" rel="noopener noreferrer">
            Link para assinatura
        </a>
    </div>
   
  );
};

export default QrCode;
