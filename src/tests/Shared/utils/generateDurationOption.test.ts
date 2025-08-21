import { GenerateDurationOption } from "../../../shared/utils/duration-utils";

describe('GenerateDurationOption', () => {
    it('generates correct options with step 5', () => {
        const minNumber = 5
        const maxNumber = 15
        const stepSize = 5

        const result = GenerateDurationOption(minNumber, maxNumber, stepSize)
        expect(result).toEqual([
            { key: '5 min', value: 5 },
            { key: '10 min', value: 10 },
            { key: '15 min', value: 15 },
        ])
    })

    it('returns one option when min equals max', () => {
        const minNumber = 10
        const maxNumber = 10
        const stepSize = 5

        const result = GenerateDurationOption(minNumber, maxNumber, stepSize)
        expect(result).toEqual([{ key: '10 min', value: 10 }])
    })

    it('returns empty array when min > max', () => {
        const minNumber = 20
        const maxNumber = 10
        const stepSize = 5

        const result = GenerateDurationOption(minNumber, maxNumber, stepSize)
        expect(result).toEqual([])
    })

    it('works with step 1', () => {
        const minNumber = 1
        const maxNumber = 3
        const stepSize = 1
        
        const result = GenerateDurationOption(minNumber, maxNumber, stepSize)
        expect(result).toEqual([
            { key: '1 min', value: 1 },
            { key: '2 min', value: 2 },
            { key: '3 min', value: 3 },
        ])
    })
})