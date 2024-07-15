'use client'

import { SessionProvider } from "next-auth/react";
import {FC,ReactNode} from 'react';

interface AuthProviderProps {
     children:ReactNode
}

export const AuthProvider:FC<AuthProviderProps> = ({children}) => {
       return <SessionProvider>
             {children}
       </SessionProvider>
}