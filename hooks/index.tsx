import React, {ReactNode} from "react";

import { AuthProvider } from "./auth";
import { shedulProvider } from "./sheduling";

interface AppProviderProps{
    children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
    return(
        <AuthProvider>
            <shedulProvider>
            {children} 
            </shedulProvider>
        </AuthProvider>
    )
}

export {AppProvider};