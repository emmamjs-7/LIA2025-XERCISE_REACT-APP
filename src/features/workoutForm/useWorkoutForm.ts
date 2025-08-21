import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAuthenticatedRequest } from '../../shared/hooks/useAuthenticatedRequest'
import { WorkoutFormData } from '../../shared/types/TypeWorkout'
import { HTTPCode } from '../../shared/enums/enumHTTPCode'

const successMessages = [
    "Great job! Your workout is logged!",
    "Workout done — you're crushing it!",
    "You're on fire! Workout saved.",
    "Boom! Another workout in the books!",
    "Nice work! Keep pushing!",
    "You're unstoppable! Workout added.",
    "That's the spirit! Workout logged.",
    "Workout saved — keep it up!",
    "Consistency is key — and you're nailing it!",
    "Go Hard Go Home!",
    "It's about drive, it's about power - let's keep crushing it!",
    "You miss 100% shots you don't take - Wayne Gretzky - Michael Scott",
]

function getRandomSuccessMessage() {
    return successMessages[Math.floor(Math.random() * successMessages.length)]
}

export function useWorkoutForm(
    initialDate: Date | null,
    userObjectId: string | undefined
) {
    const [formData, setFormData] = useState<WorkoutFormData>({
        title: '',
        categoryId: 0,
        activity: '',
        duration: 0,
        intensityId: 0,
        date: initialDate,
        objectId: userObjectId,
    })

    const { loading, error, execute } = useAuthenticatedRequest()

    const setField = (field: keyof WorkoutFormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const reset = () => {
        setFormData({
            title: '',
            categoryId: 0,
            activity: '',
            duration: 0,
            intensityId: 0,
            date: initialDate,
            objectId: userObjectId,
        })
    }

    const submit = async () => {
        if (!formData.date) return
        const fixedDate = new Date(
            Date.UTC(
                formData.date.getFullYear(),
                formData.date.getMonth(),
                formData.date.getDate()
            )
        )

        const payload = { ...formData, date: fixedDate }

        try {
            await execute({
                config: {
                    method: 'POST',
                    url: `${process.env.REACT_APP_API_URL}workouts`,
                    data: payload,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
                errorMessages: {
                    [HTTPCode.BadRequest]: 'Incorrect data sent in form',
                    [HTTPCode.InternalServerError]:
                        'Server error while sending data',
                },
            })
            toast.success(getRandomSuccessMessage())
            reset()
        } catch {
            toast.error('Something went wrong, please try again')
        }
    }

    return {
        formData,
        setField,
        submit,
        loading,
        error,
    }
}
