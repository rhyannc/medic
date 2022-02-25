import React, {
  createContext,
  useState,
  useContext,
  ReactNode
}from 'react';

interface Sheduling{
    cd_empresa:        string;
    cd_paciente:       string;
    cd_plano:          string;
    cd_modalidade:     string;
    cd_procedimento:   string;
}

interface ShedulContextData{
  sheduling: Sheduling;

  temp: React.Dispatch<React.SetStateAction<Sheduling>>
};

interface ShedulProviderProps{
  children: ReactNode;
};

const ShedulContext = createContext<ShedulContextData>({} as ShedulContextData);

function ShedulProvider({ children } : ShedulProviderProps){
  const [data, setData] = useState<Sheduling>({} as Sheduling);


  return(
  <ShedulContext.Provider
   value={{sheduling : data, temp: setData}}
   >
      {children}
  </ShedulContext.Provider>
    ) 
}


function useShedul(): ShedulContextData {
    const context = useContext(ShedulContext);
    return context;
}

export {ShedulProvider, useShedul}