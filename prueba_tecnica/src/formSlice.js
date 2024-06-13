import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rut: '',
  nombre: '',
  apellido: '',
  patente: '',
  marca: '',
  modelo: '',
  marcaDos: '',
  precio: '',
  marcas: ['Toyota', 'Ford', 'Chevrolet', 'Nissan', 'Honda'],
  modelos: ['Corolla', 'Mustang', 'Camaro', 'Altima', 'Civic'],
  registros: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    addRegistro: (state) => {
      const newRegistro = {
        rut: state.rut,
        nombre: state.nombre,
        apellido: state.apellido,
        patente: state.patente,
        marca: state.marca,
        modelo: state.modelo,
        marcaDos: state.marcaDos,
        precio: state.precio,
      };
      state.registros = [newRegistro, ...state.registros].slice(0, 10);
      state.rut = '';
      state.nombre = '';
      state.apellido = '';
      state.patente = '';
      state.marca = '';
      state.modelo = '';
      state.marcaDos = '';
      state.precio = '';
    },
  },
});

export const { updateField, addRegistro } = formSlice.actions;
export default formSlice.reducer;
