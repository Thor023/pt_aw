import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nombre: '',
  rut: '',
  patente: '',
  marca: '',
  modelo: '',
  precio: '',
  marcas: ['Toyota', 'Ford', 'Chevrolet', 'Nissan', 'Honda'],
  modelosPorMarca:{},
  modelos: [],
  //data inicial agregada para mostrar
  registros: [
    {
      nombre: 'Juan Pérez',
      rut: '11223344-5',
      patente: 'XYZ123',
      marca: 'Ford',
      modelo: 'Mustang',
      precio: '25000000',
    },
    {
      nombre: 'María González',
      rut: '99887766-4',
      patente: 'ABC456',
      marca: 'Chevrolet',
      modelo: 'Camaro',
      precio: '22000000',
    },
  ],
  mensajeExito: ''
};

const modelosPorMarcaConst = {
  Toyota: ['Corolla', 'Camry'],
  Ford: ['Mustang', 'F-150'],
  Chevrolet: ['Camaro', 'Silverado'],
  Nissan: ['Altima', 'Sentra'],
  Honda: ['Civic', 'Accord'],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
      if (field === 'marca' && modelosPorMarcaConst[value]) {
        state.modelosPorMarca = { ...modelosPorMarcaConst }; // Copia la constante a modelosPorMarca
        state.modelos = modelosPorMarcaConst[value];
        state.modelo = ''; 
      } 
      
  
      console.log('Modelos por marca:', state.modelos);
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
      state.registros = [newRegistro, ...state.registros];
      state.rut = '';
      state.nombre = '';
      state.patente = '';
      state.marca = '';
      state.modelo = '';
      state.precio = '';
      state.mensajeExito = 'Solicitud Registrada con éxito';
    },

    deleteRegistro: (state, action) => {
      state.registros.splice(action.payload, 1);
    },
    clearMensajeExito: (state) => {
      state.mensajeExito = ''; 
    },

  },
});

export const { updateField, addRegistro, deleteRegistro, clearMensajeExito  } = formSlice.actions;
export default formSlice.reducer;
