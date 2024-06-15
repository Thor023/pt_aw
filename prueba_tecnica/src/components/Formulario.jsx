import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateField, addRegistro, clearMensajeExito } from "../formSlice";
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
  const { marcas, modelos, mensajeExito  } = form;

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Campos requeridos
    const requiredFields = ["nombre", "rut", "patente", "marca", "modelo", "precio"];
    requiredFields.forEach((field) => {
      if (!form[field]) {
        newErrors[field] = "Este campo es obligatorio";
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      dispatch(addRegistro());
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearMensajeExito());
    }, 3000);
    return () => clearTimeout(timer);
  }, [mensajeExito, dispatch]);

  return (
    <Container>
      <h2>Nuevo Formulario</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate optio commodi magnam, fugiat ea ut vero ipsa facilis iste molestiae, ducimus quis ex eveniet dolorem nesciunt. Iusto vel porro corporis.</p>
      <h3>Datos del Vendedor:</h3>
      <form onSubmit={handleSubmit}>
        <FormRow>
          <Column>
            <InputGroup className="input-group">
              <Label className="input-group__label" htmlFor="nombre" required>
                Nombre Completo
              </Label>
              <Input
                type="text"
                name="nombre"
                className="input-group__input"
                value={form.nombre}
                onChange={handleChange}
                aria-required="true"
              />
              {errors.nombre && <Error>{errors.nombre}</Error>}
            </InputGroup>
          </Column>
          <Column>
            <InputGroup className="input-group">
              <Label className="input-group__label" htmlFor="rut" required>
                Rut
              </Label>
              <Input
                type="text"
                name="rut"
                className="input-group__input"
                value={form.rut}
                onChange={handleChange}
                aria-required="true"
              />
              {errors.rut && <Error>{errors.rut}</Error>}
            </InputGroup>
          </Column>
        </FormRow>
        <Divider />
        <h3>Datos del Vehículo:</h3>
        <FormRow>
          <Column>
            <InputGroup className="input-group">
              <Label className="input-group__label" htmlFor="patente" required>
                Patente
              </Label>
              <Input
                type="text"
                name="patente"
                value={form.patente}
                onChange={handleChange}
                aria-required="true"
              />
              {errors.patente && <Error>{errors.patente}</Error>}
            </InputGroup>
          </Column>
          <Column>
            <InputGroup className="input-group">
              <Label className="input-group__label" htmlFor="marca" required>
                Marca del vehiculo
              </Label>
              <Select
                name="marca"
                value={form.marca}
                onChange={handleChange}
                aria-required="true"
              >
                <option value=""></option>
                {marcas.map((marca, index) => (
                  <option key={index} value={marca}>
                    {marca}
                  </option>
                ))}
              </Select>
              {errors.marca && <Error>{errors.marca}</Error>}
            </InputGroup>
          </Column>
          <Column>
            <InputGroup className="input-group">
              <Label className="input-group__label" htmlFor="modelo" required>
                Modelo del vehiculo
              </Label>
              <Select
                name="modelo"
                value={form.modelo}
                onChange={handleChange}
                aria-required="true"
              >
                <option value=""></option>
                {modelos.map((modelo, index) => (
                  <option key={index} value={modelo}>
                    {modelo}
                  </option>
                ))}
              </Select>
              {errors.modelo && <Error>{errors.modelo}</Error>}
            </InputGroup>
          </Column>
        </FormRow>
        <FormRow>
          <Column>
            <InputGroup className="input-group">
              <Label className="input-group__label" htmlFor="precio" required>
                Precio
              </Label>
              <Input
                type="number"
                name="precio"
                value={form.precio}
                onChange={handleChange}
                aria-required="true"
              />
              {errors.precio && <Error>{errors.precio}</Error>}
            </InputGroup>
          </Column>
        </FormRow>
        {mensajeExito && (
        <p style={{ color: 'green' }}>{mensajeExito}</p>
        )}
        <ButtonContainer>
          <Button type="submit">Enviar</Button>
        </ButtonContainer>
      </form>

    </Container>
  );
};

export default Formulario;

const Error = styled.div`
  color: red;
  font-size: 0.75em;
  margin-top: 0.25em;
`;
