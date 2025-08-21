import { GetCurrentWeek } from '../../features/calendar/GetCurrentWeek'

describe('GetCurrentWeek', () => {
    beforeEach(() => {
        jest.useFakeTimers().setSystemTime(new Date('2025-05-27T00:00:00'))
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    it('returns 7 days', () => {
        const result = GetCurrentWeek()
        expect(result).toHaveLength(7)
    })

    it('starts with Monday and ends with Sunday', () => {
        const result = GetCurrentWeek()
        expect(result[0].day).toBe('Monday')
        expect(result[6].day).toBe('Sunday')
    })

    it('returns all dates at midnigth (00:00:00)', () => {
        const result = GetCurrentWeek()
        for (const day of result) {
            expect(day.date.getHours()).toBe(0)
            expect(day.date.getMinutes()).toBe(0)
            expect(day.date.getSeconds()).toBe(0)
            expect(day.date.getMilliseconds()).toBe(0)
        }
    })

    it('sets the correct status for past/today/future', () => {
        const result = GetCurrentWeek()
        const statuses = result.map((d) => d.status)
        expect(statuses).toEqual([
            'past',
            'today',
            'future',
            'future',
            'future',
            'future',
            'future',
        ])
    })
})
