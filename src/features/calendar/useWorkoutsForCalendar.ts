import { useEffect, useState } from 'react'
import { useMsal } from '@azure/msal-react'
import { useAuthenticatedRequest } from '../../shared/hooks/useAuthenticatedRequest'
import { HTTPCode } from '../../shared/enums/enumHTTPCode'
import { isWorkoutDay } from '../../shared/utils/calendar-utils'

export function useGetAllWorkouts() {
    const [workoutDates, setWorkoutDates] = useState<Date[]>([])
    const { accounts } = useMsal()
    const userId = accounts[0].idTokenClaims?.oid

    const { data, error, loading, execute } =
        useAuthenticatedRequest<{ date: string }[]>()

    useEffect(() => {
        if (!userId) return

        execute({
            config: {
                method: 'GET',
                url: `${process.env.REACT_APP_API_URL}workouts/${userId}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
            errorMessages: {
                [HTTPCode.InternalServerError]:
                    'Server error while loading workouts',
            },
        })
    }, [userId, execute])

    useEffect(() => {
        if (data) {
            const dates = data.map((w) => new Date(w.date))
            setWorkoutDates(dates)
        }
    }, [data])

    const tileClassName = ({ date }: { date: Date }) =>
        isWorkoutDay(date, workoutDates) ? 'workout-day-active' : null

    return { workoutDates, tileClassName, loading, error }
}
