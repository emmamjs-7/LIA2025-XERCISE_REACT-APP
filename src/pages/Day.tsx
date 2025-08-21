import { useParams } from 'react-router-dom'
import CurrentPage from '../shared/components/CurrentPage'
import { useEffect } from 'react'
import WorkoutDetailCard, {
    CardSize,
} from '../features/workouts/WorkoutDetailCard'
import { useNavigate } from 'react-router-dom'
import RoundedButton from '../shared/components/RoundedButton'
import { useMsal } from '@azure/msal-react'
import { WorkoutData } from '../shared/types/TypeWorkout'
import { useAuthenticatedRequest } from '../shared/hooks/useAuthenticatedRequest'
import { HTTPCode } from '../shared/enums/enumHTTPCode'
import { getWorkoutMetaData } from '../shared/utils/workout-utils'

export function Day() {
    const { date, weekday } = useParams()
    const navigate = useNavigate()
    const { accounts } = useMsal()
    const userObjectId = accounts[0].idTokenClaims?.oid

    const { data, loading, execute } = useAuthenticatedRequest<WorkoutData[]>()
    useEffect(() => {
        if (!date || !userObjectId) return

        execute({
            config: {
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}workouts/${userObjectId}/byDate`,
                params: { date },
                headers: {
                    'Content-Type': 'application/json',
                },
            },
            errorMessages: {
                [HTTPCode.InternalServerError]:
                    'Server error while loading workouts',
            },
        })
    }, [date, userObjectId, execute])

    if (!date || !weekday) {
        return null
    }

    const { dayMonth, title: workoutTitle } = getWorkoutMetaData(date)

    return (
        <>
            <CurrentPage title={`${weekday} ${dayMonth}`} />
            <div className="">
                {loading ? (
                    <div className="">Loading...</div>
                ) : (
                    <div className="">
                        {data && data.length > 0 ? '' : 'No Planned Workouts'}
                    </div>
                )}
            </div>
            {data && data.length > 0 && <h2>{workoutTitle} </h2>}
            <WorkoutDetailCard
                background="bg-green bg-topogrey"
                size={CardSize.Large}
                workouts={data ?? []}
            />
            <div>
                <RoundedButton
                    label="Add Workout"
                    size="large"
                    onClick={() => navigate(`/Workout`, { state: { date } })}
                />
            </div>
        </>
    )
}
