import { useState, useEffect } from 'react'
import { useAuthenticatedRequest } from '../../shared/hooks/useAuthenticatedRequest'
import { HTTPCode } from '../../shared/enums/enumHTTPCode'

export type StatType = 'duration' | 'count'

export interface WorkoutCategoryStat {
    category: string
    workoutCategory: string
    duration?: number
    count?: number
}

export function useWorkoutCategoryStats(
    objectId: string,
    month: string,
    type: StatType
) {
    const [data, setData] = useState<WorkoutCategoryStat[]>([])

    const {
        data: responseData,
        loading,
        error,
        execute,
    } = useAuthenticatedRequest<WorkoutCategoryStat[]>()

    useEffect(() => {
        if (!objectId || !month || !type) return

        const endpoint =
            type === 'duration' ? 'duration-per-category' : 'categories'

        execute({
            config: {
                url: `${process.env.REACT_APP_API_URL}workouts/${objectId}/statistics/${endpoint}`,
                method: 'GET',
                params: { month },
                headers: { 'Content-Type': 'application/json' },
            },
            errorMessages: {
                [HTTPCode.InternalServerError]:
                    'Server error while loading statistics',
            },
        })
    }, [objectId, month, type, execute])

    useEffect(() => {
        if (responseData) {
            setData(responseData)
        }
    }, [responseData])

    return { data, loading, error }
}
