import { getWorkoutMetaData } from '../../../shared/utils/workout-utils'

describe('getWorkoutMetaData', () => {
    beforeEach(() => {
        jest.useFakeTimers().setSystemTime(new Date('2025-05-27T00:00:00'))
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    it('returns correct day/month-format', () => {
        const result = getWorkoutMetaData('2025-05-28')
        expect(result.dayMonth).toBe('28/5')
    })

    it('returns "Planned Workouts" for future dates', () => {
        const result = getWorkoutMetaData('2026-01-01')
        expect(result.title).toBe('Planned Workouts')
    })

    it('returns "Logged Workouts" for past dates', () => {
        const result = getWorkoutMetaData('2025-03-18')
        expect(result.title).toBe('Logged Workouts')
    })

    it('returns "Logged Workouts" for today', () => {
        const result = getWorkoutMetaData('2025-05-27')
        expect(result.title).toBe('Logged Workouts')
    })
})

import { calculateMaxStreak } from '../../../shared/utils/workout-utils'

describe('calculateMaxStreak', () => {
    it('returns 0 for empty array', () => {
        expect(calculateMaxStreak([])).toBe(0)
    })

    it('returns correct max streak for consecutive dates', () => {
        const dates = [
            new Date('2025-05-01'),
            new Date('2025-05-02'),
            new Date('2025-05-03'),
        ]
        expect(calculateMaxStreak(dates)).toBe(3)
    })

    it('resets streak on non-consecutive days', () => {
        const dates = [
            new Date('2025-05-01'),
            new Date('2025-05-03'),
            new Date('2025-05-04'),
            new Date('2025-05-06'),
        ]
        expect(calculateMaxStreak(dates)).toBe(2)
    })
})
