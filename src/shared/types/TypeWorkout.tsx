export type WorkoutData = {
    id: number
    title: string
    activity: string
    category: number
    intensity: number
    duration: number
    date: string
}

export type WorkoutFormData = {
    title: string
    categoryId: number
    activity: string
    duration: number
    intensityId: number
    date: Date | null
    objectId: string | undefined
}

export type WorkoutDataForCalc = {
    category: string
    duration: number
    date: Date
}
