import React, { createContext, useState, useContext, ReactNode } from 'react';



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

interface shedulContextData{
  sheduling: sheduling;
}

interface shedulProviderProps{
  children: ReactNode;
}

const shedulContext = createContext<shedulContextData>({} as shedulContextData)

function shedulProvider({ children } : shedulProviderProps){
  const [data, setData] = useState<sheduling>({} as sheduling);

  function temp( {cd_empresa,  cd_paciente, cd_plano} : sheduling){

    const {cd_empresa} = cd_empresa;
    const {cd_paciente} = cd_paciente;
    const {cd_plano} = cd_plano;

  }

  return(
    <shedulContext.Provider
    value={{temp}}
    >
      {children}
    </shedulContext.Provider>
  )

}


function useShedul(): shedulContextData {
    const context = useContext(shedulContext);
    return context;
}


export {shedulProvider, useShedul}


