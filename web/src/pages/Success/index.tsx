import React from 'react';
import { FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

const Success = () => {
  return (
    <div id="success-message">
      <div id="voltar">
        <Link to="/">
          <FiArrowLeft />
          Voltar para Home
        </Link>
      </div>
      <section id="sucesso">
        <h1 id="checkcircle">
          <FiCheckCircle />
        </h1>
        <h1>Cadastro Concluído!</h1>
      </section>
    </div>
  );
};

export default Success;
