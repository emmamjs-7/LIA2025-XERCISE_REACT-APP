import CircleGraph from '../features/workoutStatistics/CircleGraph'
import CurrentPage from '../shared/components/CurrentPage'
import Folder from '../shared/components/Folder'
import SimpleBarChart from '../features/workoutStatistics/BarChart'
import WorkoutLineChart from '../features/workoutStatistics/WorkoutLineChart'
import { useAuth } from '../features/auth/AuthProvider'
import { useWorkoutCalculations } from '../features/workoutStatistics/useWorkoutCalculations'

export function History() {
    const { user, loading } = useAuth()
    const objectId = user.oid
    const month = new Date().toISOString().slice(0, 10)

    const {
        numberOfWorkouts,
        longestStreak,
        accumulatedMinutes,
        accumulatedHours,
    } = useWorkoutCalculations(objectId, month)

    if (loading || !user) {
        return <div>Loading...</div>
    }
    return (
        <>
            <CurrentPage title="Monthly statistics" />
            <Folder
                leftTitle="Stats"
                rightTitle="Summary"
                leftContent={
                    <>
                        <CircleGraph objectId={objectId} month={month} />
                        <SimpleBarChart objectId={objectId} month={month} />
                    </>
                }
                rightContent={
                    <>
                        <WorkoutLineChart objectId={objectId} month={month} />
                        <div className="text-left text-2xl pl-3 pb-4">
                            <h2 className="">Number of Workouts:</h2>

                            <h2 className="font-bold">
                                {numberOfWorkouts} workouts
                            </h2>

                            <h2 className="">Longest streak:</h2>

                            <h2 className="font-bold">{longestStreak} days</h2>

                            <h2 className="">Accumulated time:</h2>

                            <h2 className="font-bold">
                                {accumulatedHours}h {accumulatedMinutes}min
                            </h2>
                        </div>
                    </>
                }
            />
        </>
    )
}
