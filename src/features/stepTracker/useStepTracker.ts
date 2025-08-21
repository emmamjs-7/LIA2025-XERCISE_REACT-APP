import { useState, useEffect, useCallback } from 'react'
import { useAuthenticatedRequest } from '../../shared/hooks/useAuthenticatedRequest'
import toast from 'react-hot-toast'
import { HTTPCode } from '../../shared/enums/enumHTTPCode'

type StepProgressResponse = {
    steps: number
    stepGoal: number
}

export function useStepTracker(userObjectId: string | undefined, date: Date) {
    const [steps, setSteps] = useState(0)
    const [goal, setGoal] = useState(10000)

    const { data, execute } = useAuthenticatedRequest < StepProgressResponse > ()
    const {
        execute: updateSteps,
    } = useAuthenticatedRequest < boolean > ()
    const {
        execute: clearStepsRequest,
    } = useAuthenticatedRequest < boolean > ()
    const {
        execute: updateGoalRequest,
    } = useAuthenticatedRequest < boolean > ()

    const fetchTracker = useCallback(() => {
        if (!userObjectId || !date) return
        execute({
            config: {
                url: `${process.env.REACT_APP_API_URL}stepgoals/progress/${userObjectId}/byDate`,
                method: 'GET',
                params: { date: date.toISOString().split('T')[0] },
            },
            errorMessages: {
                [HTTPCode.InternalServerError]: 'Error loading step data',
            },
        })
    }, [userObjectId, date, execute])

    useEffect(() => {
        fetchTracker()
    }, [fetchTracker])

    useEffect(() => {
        if (data) {
            setSteps(data.steps)
            setGoal(data.stepGoal)
        }
    }, [data])

    const saveSteps = async (stepsToAdd: number) => {
        if (!userObjectId) return
        await updateSteps({
            config: {
                url: `${process.env.REACT_APP_API_URL}steps/${userObjectId}`,
                method: 'PUT',
                params: {
                    addSteps: stepsToAdd,
                    date: date.toISOString().split('T')[0],
                },
            },
            errorMessages: {
                [HTTPCode.InternalServerError]: 'Error logging steps',
            },
        })
        setSteps(prev => prev + stepsToAdd)
        toast.success('Steps logged!')
    }

    const clearSteps = async () => {
        if (!userObjectId) return
        await clearStepsRequest({
            config: {
                url: `${process.env.REACT_APP_API_URL}steps/${userObjectId}/byDate`,
                method: 'DELETE',
                params: { date: date.toISOString().split('T')[0] },
            },
            errorMessages: {
                [HTTPCode.InternalServerError]: 'Error clearing steps',
            },
        })
        setSteps(0)
        toast.success('Steps cleared!')
    }

    const saveGoal = async (newGoal: number) => {
        if (!userObjectId) return
        await updateGoalRequest({
            config: {
                url: `${process.env.REACT_APP_API_URL}stepgoals/${userObjectId}?stepGoal=${newGoal}`,
                method: 'PUT',
            },
            errorMessages: {
                [HTTPCode.InternalServerError]: 'Error updating goal',
            },
        })
        setGoal(newGoal)
        toast.success('Step goal updated!')
    }

    return {
        steps,
        goal,
        saveSteps,
        clearSteps,
        saveGoal,
        refresh: fetchTracker,
    }
}
