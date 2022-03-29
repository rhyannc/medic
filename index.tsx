import React, { Component, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda, DateData, AgendaEntry, AgendaSchedule } from 'react-native-calendars';
import { StatusBar } from 'react-native';

import { useAuth } from '../../hooks/auth';
import { useShedul } from '../../hooks/sheduling';
import { api } from './../../Services/api';
import qs from 'qs';


import {
  Container,
  Header
} from './styles';

function today() {
  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  return `${year}-${month < 10 ? '0'+month:month}-${date < 10 ? '0'+date:date}`;      
};

export function Teste() {
  const [loading, setLoading] =      useState(true);
  const { user, signOut }     =      useAuth();

  const [titens, setTitens]  =       useState<any[]>([]);
 
  const [times, setTimes]    =       useState({});

  function formatarData(params:any) {
    const data = params.substring(10,6)+'-'+params.substring(5,3)+'-'+params.substring(2,0)+'T'+params.substring(16,11)+':00'  ;
    let dia = new Date(data).getDate();          
    let mes = new Date(data).getMonth() + 1;
    let ano = new Date(data).getFullYear();
    return `${ano}-${mes < 10 ? '0'+mes:mes}-${dia < 10 ? '0'+dia:dia}`;
  };

  function formatTime(parms:any){
    const time = parms.toString().substring(11,16);
    return time;
  }

  function handletimes(dayta: string) {
    //ZERA AO SELECIONAR OUTRO DIAS
    setTitens([]);
    setTimes({});
    
    //Consome Api de horarios disponiveis    
    async function fechAttendance() {
      try {
        const responses = await api.post('/getAvailabilities', qs.stringify({
          //token: user.ds_token,
          token: 'rC5IEDArU.qzKgxOF.NUejULTqjE5PxHg0Cyz4msJ1HzCCltPoCL1PXjUlqGxoE2iLCSPeByaqzLMZNnuZDpZxUBzv_eHq5yPHcXJo1JMfqqW872nzq9porEuUtEt8yWdvlTEujlWj8u0pSSEhpQH2s7mjWm.2bKgggBfxqeI83g_6kB8VEX3DFlZ.ZG5Q.SrVpTR5dAKgp8VU1FsCz0X7Qegp01glZ6usxf_RjbkwZwyVUbu15q8Qe8aI4q5aJeAQWbkTNRNIbR90OTxx7JmlIaALmDn0S9PkoeHkb8mUc-',
          startTime: dayta,   //Data inicio
          endTime: dayta,    //Data Fim
          patient: '7007',  // PAciente 7007 Rhyann
          procedure: '91', // Procedimento 45 RM de Orbit | 91 RM de OSSOS
          modality: '4',   //4 tecnico - 2 vitor - 1 carlos
          covenant: '1',  //convenio 1 particular 
          site: '1',
          provider: '4',      
        }));

        const res = responses.data;

       
        if(res.length > 0)
        {                  
          res.map(ds =>  (  
                             setTitens( oldState => [...oldState,   { name: 'Início '+(ds.date)+'  até  '+(ds.id)  } ] )
                          ),
                  );
                             
          setTimes({   
                      [dayta]: titens        
                  })
        }     

      } catch (error) {
        console.log(error);
      } finally {

      }
    }
    fechAttendance();
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Header></Header>

      <Agenda

        // A lista de itens que devem ser exibidos na agenda. Se você deseja renderizar o item como data vazia 
        // o valor da chave de data deve ser um array vazio []. Se não existir valor para a chave de data é 
        // considerado que a data em questão ainda não está carregada 
        items={times}  /*{{  

/*items={{
    '2022-03-30' : [
        {
         "day": "2022-03-30",
         "height": 25,
         "name": "De 08:30 as 09:00",
        },
       
          {
            "day": "fd",
            "height": 25,
            "name": "MAnoldo 2",
           },
           {
            "day": "2sdff",
            "height": 25,
            "name": "MAnoldo 2",
           },
         ],  

      '2022-03-29' : [
        {
          "day": "2022-03-29",
          "height": 25,
          "name": "De 07:10 as 07:15",
         }
       ],

       


  }}*/

        // DATA INICIAL
        selected={String(today())} 
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={String(today())} 
        
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={'2022-05-30'}


        //Primeiro dia do calendario 1-segunda 2-terca
        firstDay={1}

        // Quando `true` e  botão sempre estará visível e o usuário poderá arrastar o botão para cima e fechar o calendário. Padrão = false `false`,
        showClosingKnob={true}

        // Quantidade máxima de meses permitidos para rolar para o passado.
        pastScrollRange={1}

        // Quantidade máxima de meses permitidos para rolar para o futuro. Default = 50
        futureScrollRange={2}

        // Retorno de chamada ao selecionar o dia no calendario
        onDayPress={day => {
          handletimes(day.dateString);
        }}


        // Callback que é chamado quando os itens de um determinado mês devem ser carregado (mês tornou-se visível)   
        loadItemsForMonth={month => {
          //console.log('trigger items loading, acionar o carregamento de itens');
        }}

        // Callback que é acionado quando o calendário é aberto ou fechado
        onCalendarToggled={calendarOpened => {
          // console.log(calendarOpened); //TRUE OU FALSE
        }}

        // Callback that gets called when day changes while scrolling agenda list
        onDayChange={day => {
          console.log('day changed dia mudou');
        }}

       
        // Especifique como cada item deve ser processado na agenda
        renderItem={(item, firstItemInDay) => {

          //console.log(item);
          // return     <Text>{user.ds_token}</Text>
          return <TouchableOpacity          
                     testID={item.name}            
                     onPress={() => Alert.alert(item.name)}
                 >
            <Text style={{
          fontSize: 17, 
          color: '#43515c',            
          height: 60,
          flex: 1,
          textAlign: 'center',
          justifyContent: 'flex-start',
          backgroundColor: 'white',
          borderRadius: 5,
          padding: 10,
          marginRight: 15,
          marginTop: 15,
          
          paddingTop: 22
        }}>{item.name}</Text>
          </TouchableOpacity>

        }}

        renderEmptyData={() => {
          return <View />;
        }}

        // Agenda theme
        theme={{

          agendaDayTextColor: 'black',
          agendaDayNumColor: '#00BBF2',
          agendaTodayColor: 'green',
          agendaKnobColor: '#00BBF2'
        }}

        // Agenda container style
        style={{ backgroundColor: 'black', }}
      />



    </Container>
  );

}

