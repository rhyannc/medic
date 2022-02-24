import React, {
  createContext,
  useState,
  useContext,
  ReactNode
}from 'react';

interface sheduling{
    cd_empresa:        string;
    cd_paciente:       string;
    cd_plano:          string;
    cd_modalidade:     string;
    cd_procedimento:   string;
    ds_procedimento:   string;
    cd_medico:         string;
    cd_subplano:       string;
    nr_tempo:          string;
    nr_tempo_total:    string;
    nr_valor:          string;
    sn_especial:       string;
    sn_preparo:        string;
    nr_quantidade:     string;
}

interface shedulingState{
   dados: sheduling;
}

interface shedulContextData{
  sheduling: sheduling;
  temp: (Credential: sheduling) => Promise<void>;
}

interface shedulProviderProps{
  children: ReactNode;
}

const ShedulContext = createContext<shedulContextData>({} as shedulContextData)

function ShedulProvider({ children } : shedulProviderProps){
  const [data, setData] = useState<shedulingState>({} as shedulingState);

  return(
    <ShedulContext.Provider
    value={{sheduling : data.dados, temp: setData}}
    >
      {children}
    </ShedulContext.Provider>
  )

}


function useShedul(): shedulContextData {
    const context = useContext(ShedulContext);
    return context;
}


export {ShedulProvider, useShedul}


