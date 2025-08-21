import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useRef,
} from 'react'

//MSAL imports
import { useMsal } from '@azure/msal-react'
import { useAuthToken } from './useAuthToken'
import axios from 'axios'
import { buildUserPayload } from '../../shared/utils/auth-utils'

interface AuthContextType {
    accessToken: string | null
    loading: boolean
    user: any
}

interface AuthProviderProps {
    children: React.ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const { instance, accounts } = useMsal()
    const [loading, setLoading] = useState<boolean>(true)
    const [user, setUser] = useState<any>(null)

    const { token: accessToken, setToken, clearToken } = useAuthToken()

    const hasFetchedRef = useRef(false)

    useEffect(() => {
        if (accounts.length === 0) {
            setLoading(false)
            return
        }

        if (!instance.getActiveAccount() && accounts.length > 0) {
            instance.setActiveAccount(accounts[0])
        }

        const fetchTokenAndSync = async () => {
            if (hasFetchedRef.current) return
            hasFetchedRef.current = true

            try {
                const userInfo = accounts[0].idTokenClaims
                setUser(userInfo)

                const userPayload = buildUserPayload(accounts[0])

                const loginResult = await axios.post(
                    `${process.env.REACT_APP_API_URL}auth/login`,
                    userPayload,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )

                const { token, refreshToken } = await loginResult.data
                setToken(token, refreshToken)

                console.log('user login/creation successful')
            } catch (error) {
                console.error('Auth Sync failed', error)
            } finally {
                setLoading(false)
            }
        }

        fetchTokenAndSync()
    }, [instance, accounts, setToken, clearToken, accessToken])

    return (
        <AuthContext.Provider value={{ accessToken, loading, user }}>
            {loading ? (
                <div className="absolute inset-0">Loading...</div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
