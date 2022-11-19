import { useEffect } from 'react';
import { createContext, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import api from '../services/api';
import history from '../services/history'

interface User {
    name: string;
    avatar: string;
}

interface SignInCredentials {
    name: string;
    password: string;
}

interface AuthContextData {
    signIn: (credentials: SignInCredentials) => Promise<void>
    signOut: () => void;
    user: User | undefined;
    authenticated: boolean;
}

interface AuthProviderProps {
    children: React.ReactNode;
}


export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();
    const authenticated = !!user;

    useEffect(() => {
        const { 'tccproject.token': token } = parseCookies();
        if(!token) {
            localStorage.clear();
        }
    }, [])

    function signOut() {
        destroyCookie(undefined, 'tccproject.token')
        history.push('/')
    }

    async function signIn({ user, password }: SignInCredentials) {
        const response = await api.post('auth', {
            user,
            password
        })
        const { name, token, avatar } = response.data
        setUser({
            name,
            avatar,
        })

        const localUser = {
            name: name,
            avatar: avatar
        }


        localStorage.setItem("user", JSON.stringify(localUser));

        setCookie(undefined, 'tccproject.token', token, {
            maxAge: 60 * 60,
            path: '/'
        })

        api.defaults.headers['Authorization'] = `Bearer ${token}`;

        history.push('/dashboard')
    }

    return (
        <AuthContext.Provider value={{ authenticated, signIn, user, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}