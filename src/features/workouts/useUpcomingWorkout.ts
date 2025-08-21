import { useEffect, useState } from 'react'
import { useAuthenticatedRequest } from '../../shared/hooks/useAuthenticatedRequest'
import { WorkoutData } from '../../shared/types/TypeWorkout'
import { HTTPCode } from '../../shared/enums/enumHTTPCode'

export function useUpcomingWorkout(userObjectId: string | undefined) {
    const { data, loading, error, execute } =
        useAuthenticatedRequest<WorkoutData>()

    useEffect(() => {
        if (!userObjectId) return

        execute({
            config: {
                url: `${process.env.REACT_APP_API_URL}workout/${userObjectId}/upcoming`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
            errorMessages: {
                [HTTPCode.InternalServerError]:
                    'Server error while loading upcoming workout',
            },
        })
    }, [userObjectId, execute])

    return { workout: data ? [data] : [], loading, error }
}
