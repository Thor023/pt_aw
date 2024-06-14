import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rut: '',
  nombre: '',
  patente: '',
  marca: '',
  modelo: '',
  marcaDos: '',
  precio: '',
  marcas: ['Toyota', 'Ford', 'Chevrolet', 'Nissan', 'Honda'],
  modelosPorMarca: {
    Toyota: ['Corolla', 'Camry'],
    Ford: ['Mustang', 'F-150'],
    Chevrolet: ['Camaro', 'Silverado'],
    Nissan: ['Altima', 'Sentra'],
    Honda: ['Civic', 'Accord'],
  },
  registros: [],
  nombreCompleto: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
      if (field === 'marca') {
        state.modelo = '';
      }
    },
    addRegistro: (state) => {
      const newRegistro = {
        nombre: state.nombre,
        rut: state.rut,
        patente: state.patente,
        marca: state.marca,
        modelo: state.modelo,
        marcaDos: state.marcaDos,
        precio: state.precio,
      };
      state.registros = [newRegistro, ...state.registros].slice(0, 10);
      state.rut = '';
      state.nombre = '';
      state.patente = '';
      state.marca = '';
      state.modelo = '';
      state.marcaDos = '';
      state.precio = '';
    },

    deleteRegistro: (state, action) => {
        state.registros.splice(action.payload, 1);
      },
  },
});

export const { updateField, addRegistro, deleteRegistro  } = formSlice.actions;
export default formSlice.reducer;
