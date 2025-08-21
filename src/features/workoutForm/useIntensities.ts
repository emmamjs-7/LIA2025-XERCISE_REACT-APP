import { useEffect, useState } from 'react'
import { useAuthenticatedRequest } from '../../shared/hooks/useAuthenticatedRequest'
import { HTTPCode } from '../../shared/enums/enumHTTPCode'

type RawIntensities = {
    id: number
    intensityGrade: string
}

export type IntensityOption = {
    key: string
    value: number
}

export function useIntensities() {
    const [intensities, setIntensities] = useState<IntensityOption[]>([])

    const {
        data,
        loading: intensityLoading,
        error: intensityError,
        execute,
    } = useAuthenticatedRequest<RawIntensities[]>()

    useEffect(() => {
        execute({
            config: {
                url: `${process.env.REACT_APP_API_URL}intensities`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
            errorMessages: {
                [HTTPCode.NotFound]: 'No intensities were found',
                [HTTPCode.InternalServerError]:
                    'Server error while loading intensities',
            },
        })
    }, [execute])

    useEffect(() => {
        if (data) {
            const mapped = data.map((item) => ({
                key: item.intensityGrade,
                value: item.id,
            }))
            setIntensities(mapped)
        }
    }, [data])

    return { intensities, intensityLoading, intensityError }
}
