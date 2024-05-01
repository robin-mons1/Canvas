export type APIResponse<T = any, E = any> = APISuccessResponse<T> | APIErrorResponse<E>;

export type APISuccessResponse<T> = {
    success: true,
    status: number,
    data: T,
    meta: any,
    error: null
}

export type APIErrorResponse<E> = {
    success: false,
    status: number,
    error : E,
    data: null,
    meta: null
}
