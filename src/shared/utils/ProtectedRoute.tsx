import { ReactNode, useEffect, useState } from 'react'
import { useIsAuthenticated } from '@azure/msal-react'
import { useNavigate } from 'react-router-dom'

type Props = {
    children: ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
    const isAuthenticated = useIsAuthenticated()
    const navigate = useNavigate();
    const [checkedAuth, setCheckedAuth] = useState(false)

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/')
        } else if (isAuthenticated === true) {
            setCheckedAuth(true)
        }

    }, [isAuthenticated, navigate])
    if (!checkedAuth) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    return <>{children}</>
}