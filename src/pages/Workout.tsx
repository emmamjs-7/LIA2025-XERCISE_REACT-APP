//import components
import WorkoutForm from '../features/workoutForm/WorkoutForm'
import CurrentPage from '../shared/components/CurrentPage'

export function Workout() {
    return (
        <>
            <CurrentPage title="Workout" />
            <WorkoutForm />
        </>
    )
}
