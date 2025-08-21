import { Status, dayNames } from '../calendar/TypeCalendar'

export function GetCurrentWeek(): {
    day: string
    date: Date
    status: Status
}[] {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const dayOfWeek = today.getDay()
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek

    const monday = new Date(today)
    monday.setDate(today.getDate() + mondayOffset)

    return Array.from({ length: 7 }, (_, i) => {
        const current = new Date(monday)
        current.setDate(monday.getDate() + i)
        current.setHours(0, 0, 0, 0)
        let status: Status
        if (current.getTime() < today.getTime()) status = Status.Past
        else if (current.getTime() === today.getTime()) status = Status.Today
        else status = Status.Future

        return {
            day: dayNames[i],
            date: current,
            status,
        }
    })
}
