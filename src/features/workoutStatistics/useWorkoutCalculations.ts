import { useEffect, useState } from 'react'
import { useAuthenticatedRequest } from '../../shared/hooks/useAuthenticatedRequest'
import { WorkoutDataForCalc } from '../../shared/types/TypeWorkout'
import { HTTPCode } from '../../shared/enums/enumHTTPCode'
import { calculateMaxStreak } from '../../shared/utils/workout-utils'

export function useWorkoutCalculations(objectId: string, month: string) {
    const [numberOfWorkouts, setNumberOfWorkouts] = useState(0)
    const [longestStreak, setLongestStreak] = useState(0)
    const [accumulatedHours, setAccumulatedHours] = useState(0)
    const [accumulatedMinutes, setAccumulatedMinutes] = useState(0)

    const { data, loading, error, execute } =
        useAuthenticatedRequest<WorkoutDataForCalc[]>()

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
        if (!data) return

        const workoutData = data.map((item) => ({
            ...item,
            date: new Date(item.date),
        }))

        processWorkoutData(workoutData)
    }, [data])

    const processWorkoutData = (workouts: WorkoutDataForCalc[]) => {
        setNumberOfWorkouts(workouts.length)

        const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0)
        setAccumulatedHours(Math.floor(totalMinutes / 60))
        setAccumulatedMinutes(totalMinutes % 60)

        const uniqueDates = Array.from(
            new Set(workouts.map((w) => w.date.toISOString().split('T')[0]))
        )
        const sortedDates = uniqueDates
            .map((d) => new Date(d))
            .sort((a, b) => a.getTime() - b.getTime())

        const maxStreak = calculateMaxStreak(sortedDates)
        setLongestStreak(maxStreak)
    }

    return {
        numberOfWorkouts,
        longestStreak,
        accumulatedMinutes,
        accumulatedHours,
        loading,
        error,
    }
}
