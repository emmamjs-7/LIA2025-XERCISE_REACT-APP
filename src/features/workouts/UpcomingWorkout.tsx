import { useMsal } from '@azure/msal-react'
import WorkoutDetailCard, { CardSize } from '../workouts/WorkoutDetailCard'
import { useUpcomingWorkout } from '../workouts/useUpcomingWorkout'
import { useNavigate } from 'react-router-dom'

import RoundedButton from '../../shared/components/RoundedButton'
export default function UpcomingWorkout() {
    const { accounts } = useMsal()
    const userObjectId = accounts[0]?.idTokenClaims?.oid
    const { workout, loading } = useUpcomingWorkout(userObjectId)

    const navigate = useNavigate()
    return (
        <>
            <div className="mb-3">
                <h1 className="text-2xl font-bold pb-2">Upcoming Workout</h1>
                {loading ? (
                    <p className="p-5 text-gray-500 italic">Loading...</p>
                ) : workout.length > 0 ? (
                    <WorkoutDetailCard
                        size={CardSize.Small}
                        background="bg-white bg-topolight"
                        workouts={workout}
                    />
                ) : (
                    <div>
                        <p className="text-grey p-5">No workouts planned</p>
                        <RoundedButton
                            label="Add Workout"
                            size="large"
                            onClick={() => navigate(`/Workout`)}
                        />
                    </div>
                )}
            </div>
        </>
    )
}
