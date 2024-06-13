import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateField, addRegistro } from '../formSlice';
import styled from 'styled-components';

const Container = styled.div`
  width: calc(100vw - 20vW);
  margin: 0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const FormRow = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Column = styled.div`
  width: 33%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #ccc;
  margin: 20px 0;
`;

const Formulario = () => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);
  const { marcas, modelos } = form;

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRegistro());
  };

  return (
    <Container>
      <h2>Datos del Vendedor:</h2>
      <form onSubmit={handleSubmit}>
        <FormRow>
          <Column>
            <Input
              type="text"
              name="nombre"
              placeholder="Nombre Completo"
              value={form.nombre}
              onChange={handleChange}
            />
          </Column>
          <Column>
            <Input
              type="text"
              name="rut"
              placeholder="RUT del vendedor"
              value={form.rut}
              onChange={handleChange}
            />
          </Column>
        </FormRow>
        <Divider />
        <h2>Datos del Vehículo:</h2>
        <FormRow>
          <Column>
            <Input
              type="text"
              name="patente"
              placeholder="Patente"
              value={form.patente}
              onChange={handleChange}
            />
          </Column>
          <Column>
            <Select
              name="marca"
              value={form.marca}
              onChange={handleChange}
            >
              <option value="">Seleccione una marca</option>
              {marcas.map((marca, index) => (
                <option key={index} value={marca}>{marca}</option>
              ))}
            </Select>
          </Column>
          <Column>
            <Select
              name="modelo"
              value={form.modelo}
              onChange={handleChange}
            >
              <option value="">Seleccione un modelo</option>
              {modelos.map((modelo, index) => (
                <option key={index} value={modelo}>{modelo}</option>
              ))}
            </Select>
          </Column>
        </FormRow>
        <FormRow>
          <Column>
            <Input
              type="number"
              name="precio"
              placeholder="Precio"
              value={form.precio}
              onChange={handleChange}
            />
          </Column>
        </FormRow>
        <ButtonContainer>
          <Button type="submit">Enviar</Button>
        </ButtonContainer>
      </form>
    </Container>
  );
};

export default Formulario;
