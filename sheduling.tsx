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
    cd_medico:         string;
    cd_subplano:       string;
    nr_tempo:          string;
    nr_tempo_total:    string;
    nr_valor:          string;
    sn_especial:       string;
    sn_preparo:        string;
    nr_quantidade:     string;
}

interface ShedulContextData{
  sheduling: Sheduling;

  temp: (Credential: Sheduling) => Promise<void>;
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


