import { createContext, useState, useContext, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import LoadingScreen from '../../src/patterns/LoadingScreen';
//api here is an axios instance which has the baseURL set according to the env.
import api from '../api'


const AuthContext = createContext({});

export default function AuthProvider({children}) {

    const [signed, signIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        (async function() {
            // console.log(router.asPath, router.asPath.search('/admin') == -1)
            if(router.asPath.search('/admin') == -1) return
            const token = localStorage.getItem('token')
            if (token) {
                // console.log("Got a token in the cookies, let's see if it is valid")
                // TODO: change token to Bearer token
                // api.defaults.headers.Authorization = `Bearer ${BearerToken}`
    			const response = await api.post('check', {token: token})
                // console.log(response)
                if(response.data.error == true) {
                    router.push('/admin/login')
                } else {
                    signIn(true)
                }
            } else {
                router.push('/admin/login')
            }
        })()
    }, [])

    const login = async (username, password) => {
        // api.defaults.headers.Authorization = `Bearer ${token.token}`
		const response = await api.post('auth', {'login': username, 'password': password});
        let error = response.data.error
		if (error !== false) {
			// console.log(error)
		} else {
            // console.log("Got token")
			localStorage.setItem('token', response.data.token)
            signIn(true)
            router.push('/admin')
		}
    }

    const logout = (email, password) => {
        localStorage.removeItem('token')
        signIn(false)
        router.push('/admin/login')
    }

    return (
        <AuthContext.Provider value={{ signed, login, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const ProtectRoute = ({ children }) => {
    const router = useRouter()
    const route = router.asPath
    const { signed, isLoading } = useAuth();
    if (isLoading || (!signed && route !== '/admin/login' && route.slice(0, 6) == '/admin')) {
        // TODO: Loading Screen
        return <LoadingScreen />; 
    } else if (isLoading || (signed && route === '/admin/login')) {
        router.push('/admin')
    }
    return children;
};

export const useAuth = () => useContext(AuthContext)
