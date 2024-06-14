import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateField, addRegistro } from "../formSlice";
import styled from "styled-components";

const Container = styled.div`
  margin: 0;
  padding: 20px;
  border-radius: 8px;
  box-sizing: border-box;
  

  @media (min-width: 768px) {
    max-width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const FormRow = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

const Label = styled.label`
  display: inline-block;
  padding: 0.25em 0.5em;
  margin-bottom: -0.5em;
  text-transform: uppercase;
  font-size: 0.575em;
  letter-spacing: 0.1em;
  cursor: pointer;
  color: #002eff;
  position: relative;
  top: 15px;
  left: 15px;
  background-color: #fff;
  width: fit-content;
  white-space: nowrap;

  &::after {
    content: ${({ required }) => required ? '"*"' : '""'};
    color: red;
    margin-left: 0.25em;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #002eff;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #002eff;
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
  background-color: #002eff;
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
    console.log(`Field: ${name}, Value: ${value}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRegistro());
  };

  return (
    <Container>
      <h2>Nuevo Formulario</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate optio commodi magnam, fugiat ea ut vero ipsa facilis iste molestiae, ducimus quis ex eveniet dolorem nesciunt. Iusto vel porro corporis.</p>
      <h3>Datos del Vendedor:</h3>
      <form onSubmit={handleSubmit}>
        <FormRow>
          <Column>
            <InputGroup class-name="input-group">
              <Label className="input-group__label" htmlFor="nombre">
                Nombre Completo
              </Label>
              <Input
                type="text"
                name="nombre"
                className="input-group__input"
                value={form.nombre}
                onChange={handleChange}
              />
            </InputGroup>
          </Column>
          <Column>
            <InputGroup className="input-group">
              <Label className="input-group__label" htmlFor="rut">
                Rut
              </Label>
              <Input
                type="text"
                name="rut"
                className="input-group__input"
                value={form.rut}
                onChange={handleChange}
              />
            </InputGroup>
          </Column>
        </FormRow>
        <Divider />
        <h3>Datos del Vehículo:</h3>
        <FormRow>
          <Column>
            <InputGroup className="input-group">
              <Label className="input-group__label" htmlFor="patente">
                Patente
              </Label>
              <Input
                type="text"
                name="patente"
                value={form.patente}
                onChange={handleChange}
              />
            </InputGroup>
          </Column>
          <Column>
            <InputGroup className="input-group">
              <Label className="input-group__label" htmlFor="marca">
                Marca del vehiculo
              </Label>
              <Select name="marca" value={form.marca} onChange={handleChange}>
                <option value=""></option>
                {marcas.map((marca, index) => (
                  <option key={index} value={marca}>
                    {marca}
                  </option>
                ))}
              </Select>
            </InputGroup>
          </Column>
          <Column>
            <InputGroup className="input-group">
              <Label className="input-group__label" htmlFor="modelo">
                Modelo del vehiculo
              </Label>
              <Select name="modelo" value={form.modelo} onChange={handleChange}>
                <option value=""></option>
                {form.modelos.map((modelo, index) => (
                  <option key={index} value={modelo}>
                    {modelo}
                  </option>
                ))}
              </Select>
            </InputGroup>
          </Column>
        </FormRow>
        <FormRow>
          <Column>
            <InputGroup className="input-group">
              <Label className="input-group__label" htmlFor="precio">
                Precio
              </Label>
              <Input
                type="number"
                name="precio"
                value={form.precio}
                onChange={handleChange}
              />
            </InputGroup>
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
