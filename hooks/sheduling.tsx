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

  async function temp( {cd_empresa,  cd_paciente, cd_plano} : sheduling){

    const {cd_empresa} = 'cd_empresa';
    const {cd_paciente} = cd_paciente;
    const {cd_plano} = cd_plano;

    setData({ cd_empresa, cd_paciente, cd_plano});
  }

  return(
    <ShedulContext.Provider
    value={{sheduling : data.dados, temp}}
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


