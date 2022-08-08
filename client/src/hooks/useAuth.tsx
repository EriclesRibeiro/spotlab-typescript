import { useContext } from "react"
import { AuthContext } from '../contexts/AuthContext';

export default function useAuth() {
    const { signIn, signOut, signUp, user, isAuthenticated } = useContext(AuthContext);
    
    return { signIn, signOut, signUp, user, isAuthenticated };
}