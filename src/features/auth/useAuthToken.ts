import { useCallback } from 'react'

const TOKEN_KEY = 'accessToken'
const REFRESH_KEY = 'refreshToken'

export function useAuthToken() {
    const getToken = useCallback(() => sessionStorage.getItem(TOKEN_KEY), [])
    const getRefreshToken = useCallback(
        () => sessionStorage.getItem(REFRESH_KEY),
        []
    )

    const setToken = useCallback((token: string, refreshToken: string) => {
        sessionStorage.setItem(TOKEN_KEY, token)
        sessionStorage.setItem(REFRESH_KEY, refreshToken)
    }, [])

    const clearToken = useCallback(() => {
        sessionStorage.removeItem(TOKEN_KEY)
        sessionStorage.removeItem(REFRESH_KEY)
    }, [])

    const getAuthHeader = useCallback(() => {
        const token = getToken()
        return token
            ? {
                  Authorization: `Bearer ${token}`,
              }
            : {}
    }, [getToken])

    const refreshTokens = useCallback(async () => {
        const refreshToken = getRefreshToken()
        if (!refreshToken) throw new Error('No refresh token found')

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}auth/refresh`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(refreshToken),
            }
        )

        if (!response.ok) {
            clearToken()
            throw new Error('Session expired, please log in again')
        }

        const { token: newAccessToken, refreshToken: newRefreshToken } =
            await response.json()
        setToken(newAccessToken, newRefreshToken)
        return newAccessToken
    }, [clearToken, getRefreshToken, setToken])

    return {
        token: getToken(),
        refreshToken: getRefreshToken(),
        setToken,
        clearToken,
        getAuthHeader,
        refreshTokens,
    }
}
