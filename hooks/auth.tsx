import React, {
    createContext,
    useState,
    useContext,
    ReactNode
}from 'react';
import { useNavigation } from '@react-navigation/native';

import { api } from '../Services/api';
import qs from 'qs';

interface User{
    cd_funcionario: string;
    cd_paciente: string;
    ds_email: string;
    ds_paciente: string;
    ds_token: string;
    photo?: string;
}

interface AuthSatate{
    token: string;
    user: User;
}

interface SignInCredentials {
    id: string;
    pw: string;
}

interface AuthContextData{
    user: User;
    signIn: (credentials: SignInCredentials) => Promise<void>;
    signOut(): Promise<void>;
}

interface AuthProviderProps {
     children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider ({ children } : AuthProviderProps){
    const [data, setData] = useState<AuthSatate>({} as AuthSatate);
    
    
    async function signIn( {id, pw} : SignInCredentials){
        const response = await api.post('Login', 
        qs.stringify(
            {
               id,
               pw
            }
        ));

        const formattedData = response.data.map((item: any) => ({
            ...item,
           user: ({
                     cd_funcionario: String(item.cd_funcionario), 
                     cd_paciente: String(item.cd_paciente), 
                     ds_email: String(item.ds_email), 
                     ds_paciente: String(item.ds_paciente),
                     ds_token: String(item.ds_token),
                     
                 }),
            token:  String(item.ds_token)   
           
          }));

          const { token, user } = formattedData[0];
          
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          setData({ token, user});
          
    }

    async function signOut(){     

       setData({} as  AuthSatate);
    };

     

    return(
        <AuthContext.Provider
        value={{
            user: data.user,
            signIn,
            signOut,            
        }}
        >
            {children}
        </AuthContext.Provider>

    )

    
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    return context;
} 

export { AuthProvider, useAuth}