import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateField, addRegistro } from '../formSlice';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
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
      <h1>Formulario de Venta</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="rut"
          placeholder="RUT del vendedor"
          value={form.rut}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={form.apellido}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="patente"
          placeholder="Patente"
          value={form.patente}
          onChange={handleChange}
        />
        <Select name="marca" value={form.marca} onChange={handleChange}>
          <option value="">Seleccione una marca</option>
          {marcas.map((marca, index) => (
            <option key={index} value={marca}>{marca}</option>
          ))}
        </Select>
        <Select name="modelo" value={form.modelo} onChange={handleChange}>
          <option value="">Seleccione un modelo</option>
          {modelos.map((modelo, index) => (
            <option key={index} value={modelo}>{modelo}</option>
          ))}
        </Select>
        <Select name="marcaDos" value={form.marcaDos} onChange={handleChange}>
          <option value="">Seleccione una segunda marca</option>
          {marcas.map((marca, index) => (
            <option key={index} value={marca}>{marca}</option>
          ))}
        </Select>
        <Input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Container>
  );
};

export default Formulario;
