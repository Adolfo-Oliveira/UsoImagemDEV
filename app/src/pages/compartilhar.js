import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const Compartilhar = () => {
  const message = "Confira este link incrível!";
  const link = "https://www.seulink.com";
  const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(message + ' ' + link)}`;

  return (
    <div>
      <h1>Compartilhar</h1>
      <a href={whatsappURL} target="_blank" rel="noopener noreferrer">
        <button style={{ display: 'flex', alignItems: 'center', backgroundColor: '#25D366', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          <FaWhatsapp style={{ marginRight: '8px' }} />
          Compartilhar no WhatsApp
        </button>
      </a>
    </div>
  );
};

export default Compartilhar;
