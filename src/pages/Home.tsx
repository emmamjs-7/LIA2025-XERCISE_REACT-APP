import { useIsAuthenticated } from '@azure/msal-react'
import CurrentPage from '../shared/components/CurrentPage'
import UpcomingWorkout from '../features/workouts/UpcomingWorkout'
import StepTrackerCard from '../features/stepTracker/StepTrackerCard'
import LoginButton from '../features/auth/LoginButton'

export function Home() {
    const isAuthenticated = useIsAuthenticated()

    return (
        <>
            <CurrentPage title="Home" />
            <div className="flex flex-col items-center justify-center">
                {!isAuthenticated ? (
                    <LoginButton />
                ) : (
                    <>
                        <div className="flex flex-col gap-4">
                            <UpcomingWorkout />
                            <StepTrackerCard />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
