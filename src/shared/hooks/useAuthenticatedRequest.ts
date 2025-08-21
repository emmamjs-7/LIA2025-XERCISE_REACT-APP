import { useState, useCallback } from 'react'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useAuthToken } from '../../features/auth/useAuthToken'
import { useMsal } from '@azure/msal-react'
import { toast } from 'react-hot-toast'
import { HTTPCode } from '../enums/enumHTTPCode'
import {
    ErrorMessages,
    generateToastId,
    getErrorMessage,
} from '../utils/auth-utils'

type ExecuteOptions = {
    config: AxiosRequestConfig
    errorMessages?: ErrorMessages
}

type UseAuthenticatedRequestResult<T> = {
    data: T | null
    loading: boolean
    error: string | null
    execute: (options: ExecuteOptions) => Promise<void>
}

export function useAuthenticatedRequest<
    T = any
>(): UseAuthenticatedRequestResult<T> {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { instance } = useMsal()
    const { getAuthHeader, refreshTokens } = useAuthToken()

    const execute = useCallback(
        async ({ config, errorMessages }: ExecuteOptions) => {
            setLoading(true)
            setError(null)

            try {
                const headers = {
                    ...config.headers,
                    ...getAuthHeader(),
                }

                const response: AxiosResponse<T> = await axios({
                    ...config,
                    headers,
                })
                if (response.status === 204) {
                    setData([] as T)
                } else {
                    setData(response.data)
                }

            } catch (err: any) {
                if (
                    axios.isAxiosError(err) &&
                    err.response?.status === HTTPCode.Unauthorized
                ) {
                    try {
                        const newToken = await refreshTokens()
                        const retryResponse: AxiosResponse<T> = await axios({
                            ...config,
                            headers: {
                                ...config.headers,
                                Authorization: `Bearer ${newToken}`,
                            },
                        })

                        if (retryResponse.status === 204) {
                            setData([] as T)
                        } else {
                            setData(retryResponse.data)
                        }     
                          
                    } catch (refreshErr: any) {
                        const message =
                            refreshErr.message || 'Token refresh failed'
                        setError(message)
                        toast.error(message)
                        instance.logoutPopup()
                    }
                } else {
                    const axiosErr = err as AxiosError
                    const statusCode = axiosErr.response?.status as
                        | HTTPCode
                        | undefined

                    if (!axiosErr.response) {
                        const netWorkMessage =
                            'Network error: Unable to reach the server'
                        toast.error(netWorkMessage, { id: 'network-error' })
                        setError(netWorkMessage)
                        return
                    }
                    const customMessage = getErrorMessage(
                        statusCode,
                        errorMessages
                    )

                    if (customMessage) {
                        const errorId = generateToastId(customMessage)
                        toast.error(customMessage, { id: errorId })
                        setError(customMessage)
                    } else {
                        if (process.env.NODE_ENV === 'development') {
                            console.warn(
                                'Unhandled error',
                                statusCode,
                                axiosErr.message
                            )
                        }
                        setError(null)
                    }
                }
            } finally {
                setLoading(false)
            }
        },
        [getAuthHeader, refreshTokens, instance]
    )

    return { data, loading, error, execute }
}
