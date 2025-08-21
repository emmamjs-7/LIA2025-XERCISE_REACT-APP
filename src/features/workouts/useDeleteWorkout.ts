import { useAuthenticatedRequest } from '../../shared/hooks/useAuthenticatedRequest'
import { HTTPCode } from '../../shared/enums/enumHTTPCode'
import toast from 'react-hot-toast'

export function useDeleteWorkout() {
    const { execute, loading, error } = useAuthenticatedRequest()

    const deleteWorkout = async (id: number) => {
        await execute({
            config: {
                method: 'delete',
                url: `${process.env.REACT_APP_API_URL}workouts/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
            errorMessages: {
                [HTTPCode.InternalServerError]: 'Server error while deleting workout',
                [HTTPCode.NotFound]: 'Workout not found',
            },
        })
    toast.success('Workout deleted')
    }
    return { deleteWorkout, loading, error }
}