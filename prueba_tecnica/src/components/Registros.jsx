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
  flex-direction: column;
  align-items: center;
`;

const RegistroItem = styled.div`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
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
      {registros.map((registro, index) => (
        <RegistroItem key={index}>
          <p><strong>Nombre:</strong> {registro.nombre} {registro.apellido}</p>
          <p><strong>RUT:</strong> {registro.rut}</p>
          <p><strong>Patente:</strong> {registro.patente}</p>
          <p><strong>Marca:</strong> {registro.marca}</p>
          <p><strong>Modelo:</strong> {registro.modelo}</p>
          <p><strong>Segunda Marca:</strong> {registro.marcaDos}</p>
          <p><strong>Precio:</strong> {registro.precio}</p>
          <DeleteButton onClick={() => handleDeleteRegistro(index)}>
            <FaTrash />
          </DeleteButton>
        </RegistroItem>
      ))}
    </RegistroContainer>
  );
};

export default Registros;
