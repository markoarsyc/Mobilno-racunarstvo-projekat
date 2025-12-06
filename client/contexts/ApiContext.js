// ApiContext.js
import React, { createContext, useContext } from "react";

const ApiContext = createContext();

// Provider komponenta — ovde se definiše vrednost koju delimo
export const ApiProvider = ({ children }) => {
  const apiUrl = "http://192.168.1.6:8000/api";

  return (
    <ApiContext.Provider value={apiUrl}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook za lakši pristup u drugim komponentama
export const useApi = () => {
  return useContext(ApiContext);
};
