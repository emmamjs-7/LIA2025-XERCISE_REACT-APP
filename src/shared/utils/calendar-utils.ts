export function isWorkoutDay(target: Date, workoutDates: Date[]): boolean {
    return workoutDates.some(
        (workoutDate) =>
            workoutDate.getFullYear() === target.getFullYear() &&
            workoutDate.getMonth() === target.getMonth() &&
            workoutDate.getDate() === target.getDate()
    )
}
