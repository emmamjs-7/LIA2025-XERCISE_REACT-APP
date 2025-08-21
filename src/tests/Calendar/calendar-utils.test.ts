import { isWorkoutDay } from '../../shared/utils/calendar-utils'

describe('isWorkoutDay', () => {
    const workouts = [
        new Date('2025-05-25'),
        new Date('2025-05-27'),
        new Date('2025-06-01'),
    ]

    it('returns true if date matches a workout day', () => {
        expect(isWorkoutDay(new Date('2025-05-27'), workouts)).toBe(true)
    })

    it('returns false if date does not match a workout day', () => {
        expect(isWorkoutDay(new Date('2025-06-02'), workouts)).toBe(false)
    })

    it('compares only day, month and year (ignores time)', () => {
        const target = new Date('2025-06-01T23:59:59')
        expect(isWorkoutDay(target, workouts)).toBe(true)
    })
})
