import { differenceInDays } from "date-fns"

export function getWorkoutMetaData(dateString: string): {
    dayMonth: string
    title: 'Planned Workouts' | 'Logged Workouts'
} {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const dayMonth = `${day}/${month}`

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    const parsed = new Date(dateString)
    const selectedDate = new Date(
        parsed.getFullYear(),
        parsed.getMonth(),
        parsed.getDate()
    )

    const title = selectedDate > today ? 'Planned Workouts' : 'Logged Workouts'

    return { dayMonth, title }
}
export function calculateMaxStreak(dates: Date[]): number {
    if (dates.length === 0) return 0

    let streak = 1
    let maxStreak = 1

    for (let i = 1; i < dates.length; i++) {
        const diff = differenceInDays(dates[i], dates[i - 1])
        if (diff === 1) {
            streak++
            maxStreak = Math.max(maxStreak, streak)
        } else if (diff > 1) {
            streak = 1
        }
    }

    return maxStreak
}

