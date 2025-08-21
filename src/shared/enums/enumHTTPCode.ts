export enum HTTPCode {
    Ok = 200,
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    InternalServerError = 500,
}

export const HTTPCodeText: { [key in HTTPCode]: string } = {
    [HTTPCode.Ok]: 'Ok',
    [HTTPCode.Created]: 'Created',
    [HTTPCode.BadRequest]: 'Bad Request',
    [HTTPCode.Unauthorized]: 'Unauthorized',
    [HTTPCode.NotFound]: 'Not Found',
    [HTTPCode.InternalServerError]: 'Internal Server Error',
}
