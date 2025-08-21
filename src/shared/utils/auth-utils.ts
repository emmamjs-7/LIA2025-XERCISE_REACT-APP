import { HTTPCode } from '../enums/enumHTTPCode'

export function buildUserPayload(account: any) {
    return {
        id: 0,
        objectId: account.idTokenClaims?.oid,
        email: account.username,
        name: account.name,
    }
}

export type ErrorMessages = Partial<Record<HTTPCode, string>>

export function getErrorMessage(
    statusCode: HTTPCode | undefined,
    messages?: ErrorMessages
): string | null {
    if (!statusCode || !messages) return null
    return messages[statusCode] ?? null
}

export function generateToastId(message: string): string {
    return `error-toast-${message.replace(/\s+/g, '-')}`
}
