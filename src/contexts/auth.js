import { createContext, useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import LoadingScreen from '../../src/patterns/LoadingScreen';
//api here is an axios instance which has the baseURL set according to the env.
import api from '../api'


const AuthContext = createContext({});

export default function AuthProvider({children}) {

    const [signed, signIn] = useState(false)
    const [token, setToken] = useState('')
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        (async function() {
            // console.log(router.asPath, router.asPath.search('/admin') == -1)
            if(router.asPath.search('/admin') == -1) return
            const token = localStorage.getItem('token')
            if (token) {
                // console.log("Got a token in the cookies, let's see if it is valid")
                // api.defaults.headers.Authorization = `Bearer ${BearerToken}`
    			const response = await api.post('check', {token: token})
                // console.log(response)
                if(response.data.error == true) {
                    await router.push('/admin/login')
                } else {
                    signIn(true)
                    setToken(token)
                }
            } else {
                await router.push('/admin/login')
            }
        })()
    }, [])

    const login = async (username, password) => {
        // api.defaults.headers.Authorization = `Bearer ${token.token}`
		const response = await api.post('auth', {'login': username, 'password': password});
        let error = response.data.error
		if (error !== false) {
            await router.push({
                pathname: '/admin/login',
                query: {error}
            })
        } else {
            // console.log("Got token")
			localStorage.setItem('token', response.data.token)
			setToken(response.data.token)
            signIn(true)
            await router.push('/admin')
		}
    }

    const logout = () => {
        localStorage.removeItem('token')
        signIn(false)
        setToken('')
        router.push('/admin/login')
    }

    return (
        <AuthContext.Provider value={{ signed, token, login, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const ProtectRoute = ({ children }) => {
    const router = useRouter()
    const route = router.asPath
    const { signed, isLoading } = useAuth();
    if (isLoading || (!signed && !route.startsWith('/admin/login') && route.startsWith('/admin'))) {
        // TODO: Loading Screen
        return <LoadingScreen />; 
    } else if (isLoading || (signed && route.startsWith('/admin/login'))) {
        router.push('/admin')
    }
    return children;
};

export const useAuth = () => useContext(AuthContext)
