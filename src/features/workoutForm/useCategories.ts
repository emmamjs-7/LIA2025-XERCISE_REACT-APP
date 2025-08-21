import { useEffect, useState } from 'react'
import { useAuthenticatedRequest } from '../../shared/hooks/useAuthenticatedRequest'
import { HTTPCode } from '../../shared/enums/enumHTTPCode'

type RawCategory = {
    id: number
    workoutCategory: string
}

export type CategoryOption = {
    key: string
    value: number
}

export function useCategories() {
    const [categories, setCategories] = useState<CategoryOption[]>([])

    const {
        data,
        loading: categoryLoading,
        error: categoryError,
        execute,
    } = useAuthenticatedRequest<RawCategory[]>()

    useEffect(() => {
        execute({
            config: {
                url: `${process.env.REACT_APP_API_URL}categories`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
            errorMessages: {
                [HTTPCode.NotFound]: 'Error while loading categories',
                [HTTPCode.InternalServerError]:
                    'Server error while loading categories',
            },
        })
    }, [execute])

    useEffect(() => {
        if (data) {
            const mappedCategories = data.map((item) => ({
                key: item.workoutCategory,
                value: item.id,
            }))
            setCategories(mappedCategories)
        }
    }, [data])

    return {
        categories,
        categoryLoading,
        categoryError,
    }
}
