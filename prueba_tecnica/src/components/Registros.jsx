import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { deleteRegistro } from '../formSlice';
import { FaTrash } from 'react-icons/fa';

const RegistroContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;
`;

const RegistroItem = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
`;

const RegistroColumna = styled.div`
  width: calc(100% / 7); /* Divide el ancho en 7 columnas */
  padding: 5px;
`;

const DeleteButton = styled.button`
  align-self: flex-end;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Registros = () => {
  const dispatch = useDispatch();
  const registros = useSelector((state) => state.form.registros);

  const handleDeleteRegistro = (index) => {
    dispatch(deleteRegistro(index));
  };

  return (
    <RegistroContainer>
      <h2>Últimos 10 Registros</h2>
      <RegistroItem>
        <RegistroColumna><strong>Nombre</strong></RegistroColumna>
        <RegistroColumna><strong>RUT</strong></RegistroColumna>
        <RegistroColumna><strong>Patente</strong></RegistroColumna>
        <RegistroColumna><strong>Marca</strong></RegistroColumna>
        <RegistroColumna><strong>Modelo</strong></RegistroColumna>
        {/* <RegistroColumna><strong>Segunda Marca</strong></RegistroColumna> */}
        <RegistroColumna><strong>Precio</strong></RegistroColumna>
      </RegistroItem>
      {registros.map((registro, index) => (
        <RegistroItem key={index}>
          <RegistroColumna>{registro.nombre} {registro.apellido}</RegistroColumna>
          <RegistroColumna>{registro.rut}</RegistroColumna>
          <RegistroColumna>{registro.patente}</RegistroColumna>
          <RegistroColumna>{registro.marca}</RegistroColumna>
          <RegistroColumna>{registro.modelo}</RegistroColumna>
          {/* <RegistroColumna>{registro.marcaDos}</RegistroColumna> */}
          <RegistroColumna>{registro.precio}</RegistroColumna>
          <DeleteButton onClick={() => handleDeleteRegistro(index)}>
            <FaTrash />
          </DeleteButton>
        </RegistroItem>
      ))}
    </RegistroContainer>
  );
};

export default Registros;
