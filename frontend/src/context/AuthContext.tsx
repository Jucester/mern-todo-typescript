/*
import { createContext  } from 'react'

const AuthContext = createContext(null);

export default AuthContext;
*/

import React, { useState } from 'react';

interface Auth {
    token: string | null,
    auth: boolean,
    authenticatedUser: {} 
}

// interface Auth {
//     id: string,
//     email: string,
//     username: string,
// }

export interface AuthContextData {
  auth: Auth,
  saveAuth: (auth : Auth) => void
}

export const authContextDefaultValue : AuthContextData = {
    auth: {
        token: null,
        auth: false,
        authenticatedUser: {
            id: '',
            email: '',
            username: ''
        }
    },
    saveAuth: () => null
}
//(auth : Auth) => void
const AuthContext = React.createContext<AuthContextData>(authContextDefaultValue);

const AuthProvider = (props : any) => {

    const [ auth, saveAuth ] = useState<Auth>({
        token: '',
        auth: false,
        authenticatedUser: {
            id: '',
            email: '',
            username: ''
        }
    });

    return (
        <AuthContext.Provider value={{ auth, saveAuth }}>
            { props.children }
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };