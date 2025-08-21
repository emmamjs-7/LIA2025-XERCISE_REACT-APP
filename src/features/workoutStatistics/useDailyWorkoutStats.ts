import { useEffect, useState } from 'react'
import { format, eachDayOfInterval } from 'date-fns'
import { useAuthenticatedRequest } from '../../shared/hooks/useAuthenticatedRequest'
import { HTTPCode } from '../../shared/enums/enumHTTPCode'

export type WorkoutDayStat = { date: string; count: number }

type Workout = { date: string }

export function useDailyWorkoutStats(objectId: string, month: string) {
    const [data, setData] = useState<WorkoutDayStat[]>([])

    const {
        data: workoutData,
        loading,
        error,
        execute,
    } = useAuthenticatedRequest<Workout[]>()

    useEffect(() => {
        if (!objectId || !month) return

        execute({
            config: {
                url: `${process.env.REACT_APP_API_URL}workouts/${objectId}/byMonth`,
                method: 'GET',
                params: { month },
                headers: {
                    'Content-Type': 'application/json',
                },
            },
            errorMessages: {
                [HTTPCode.InternalServerError]:
                    'Server error while loading workouts',
            },
        })
    }, [objectId, month, execute])

    useEffect(() => {
        if (!workoutData) return

        const countPerDay: { [date: string]: number } = {}

        workoutData.forEach((w) => {
            const dateKey = format(new Date(w.date), 'yyyy-MM-dd') //MM must be used - mm=minutes
            countPerDay[dateKey] = (countPerDay[dateKey] ?? 0) + 1
        })

        const start = new Date(`${month}-01`)
        const end = new Date(start.getFullYear(), start.getMonth() + 1, 0)
        const fullMonthDays = eachDayOfInterval({ start, end })

        const result = fullMonthDays.map((day) => {
            const key = format(day, 'yyyy-MM-dd') //MM must be used - mm=minutes
            return {
                date: key,
                count: countPerDay[key] ?? 0,
            }
        })

        setData(result)
    }, [workoutData, month])

    return { data, loading, error }
}
