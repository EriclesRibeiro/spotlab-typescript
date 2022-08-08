import { ReactNode, useEffect, useState } from "react";
import { User } from "../@types/user";
import { AuthContext } from "../contexts/AuthContext";
import axios, {HeadersDefaults} from 'axios';
import { signUp } from "../services/api.service";


type Props = {
    children: ReactNode;
};

interface CommonHeaderProperties extends HeadersDefaults {
    Authorization: string;
  }

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null)

    const isAuthenticated = !!user;

    const setDefaultAuthAxios = (jwt: string | null) => {
        (axios.defaults.headers! as unknown as Record<string, CommonHeaderProperties>).common["Authorization"] = `Bearer ${jwt}`
    }

    const api = 'http://localhost:4000'

    useEffect(() => {
        const recoveredUser = localStorage.getItem("_u");
        // @ts-ignore
        const jsonToken = JSON.parse(localStorage.getItem('_token'));
        
        if (recoveredUser) {
          setUser(JSON.parse(recoveredUser));
          if (jsonToken) {
            const token = jsonToken.token;
            setDefaultAuthAxios(token)
          }
        }
      }, []);

      return (
        <AuthContext.Provider value= {
            { 
                user, 
                async signIn({email, password}): Promise<boolean> {
                    console.log({email, password})
                    const res = await fetch(
                    `${api}/auth/signin`, 
                    {
                        method: 'POST',
                        body: JSON.stringify({email, password}),
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8;'
                        }
                    }
                )
                const { data } = await res.json();
                if (data.status) {
                    setUser(data.response.user)
                    localStorage.setItem('_u', data.response.user)
                    localStorage.setItem('auth-token', data.response.token)
                    return true
                }
                return false
                },
                signOut(): void {
					setUser(null);
					localStorage.removeItem('auth-token');
				},
                async signUp({
                    name,
                    email,
                    password,
                    confirmPassword
                }): Promise<boolean> {
                    const res = await fetch(
                        `${api}/auth/signup`, 
                        {
                            method: 'POST',
                            body: JSON.stringify({name, email, password, confirmPassword}),
                            headers: {
                                'Content-Type': 'application/json; charset=UTF-8'
                            }
                        }
                    )
                    const { data } = await res.json();
                    if (data.status) {
                        setUser(data.response.user)
                        localStorage.setItem('_u', data.response.user)
                        localStorage.setItem('auth-token', data.response.token)
                        return true
                    }
                    return false
                },
                isAuthenticated
            }
        }>
            {children}
        </AuthContext.Provider>
      )
    
}
