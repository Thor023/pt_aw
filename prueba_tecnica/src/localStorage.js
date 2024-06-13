export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('formState');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('formState', serializedState);
    } catch (err) {
        console.error("Could not save state", err);
    }
  };
  