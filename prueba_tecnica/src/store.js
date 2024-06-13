import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import { loadState, saveState } from './localStorage';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
  preloadedState: preloadedState ? { form: preloadedState } : undefined,
});

store.subscribe(() => {
  saveState(store.getState().form);
});
