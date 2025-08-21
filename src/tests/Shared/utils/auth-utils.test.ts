import { getegid } from 'process'
import { HTTPCode } from '../../../shared/enums/enumHTTPCode'
import {
    buildUserPayload,
    getErrorMessage,
    ErrorMessages,
    generateToastId,
} from '../../../shared/utils/auth-utils'

test('buildUserPayload creates correct structure', () => {
    const account = {
        idTokenClaims: { oid: 'abc-123' },
        username: 'test@test.se',
        name: 'Test Testsson',
    }
    const result = buildUserPayload(account)

    expect(result).toEqual({
        id: 0,
        objectId: 'abc-123',
        email: 'test@test.se',
        name: 'Test Testsson',
    })
})

describe('getErrorMessage', () => {
    const messages: ErrorMessages = {
        [HTTPCode.BadRequest]: 'Bad Request',
        [HTTPCode.NotFound]: 'Not Found',
    }

    it('returns the correct message for a known status code', () => {
        expect(getErrorMessage(HTTPCode.NotFound, messages)).toBe('Not Found')
    })

    it('returns null if the status code is not in messages', () => {
        expect(getErrorMessage(HTTPCode.Created, messages)).toBeNull()
    })

    it('returns null if status code is undefined', () => {
        expect(getErrorMessage(undefined, messages)).toBeNull()
    })

    it('returns null if errorMessages is undefined', () => {
        expect(getErrorMessage(HTTPCode.BadRequest, undefined)).toBeNull()
    })
})

describe('genereateToastId', () => {
    it('replaces spaces with dashes and prefixes ID', () => {
        const message = 'This is a test'
        const expected = 'error-toast-This-is-a-test'
        expect(generateToastId(message)).toBe(expected)
    })

    it('works with no spaces', () => {
        const message = 'SingleWord'
        expect(generateToastId(message)).toBe('error-toast-SingleWord')
    })

    it('handles multiple spaces', () => {
        const message = 'Many     spaces'
        expect(generateToastId(message)).toBe('error-toast-Many-spaces')
    })
})
