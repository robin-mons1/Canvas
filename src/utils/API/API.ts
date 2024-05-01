import {APIErrorResponse, APIResponse, APISuccessResponse} from "@/utils/API/APIResponse";
import {ServerErrors} from "@/utils/API/ServerErrors";

class API {
    serverLocation: string;

    constructor() {
        //@ts-ignore
        this.serverLocation = import.meta.env.VITE_API_URL;
    }

    public async GET<T = any, E=any>(url: string, options: RequestInit = {}): Promise<APIResponse<T, E>> {
        return await this.call<T, E>(url, 'GET', options)
    }

    public async POST<T = any, E=any>(url: string, data: {}, options: RequestInit = {}): Promise<APIResponse<T, E>> {
        return await this.call<T, E>(url, 'POST',
            {
                body: JSON.stringify(data),
                ...options
            });
    }

    public async PATCH<T = any, E=any>(url: string, data: {}, options: RequestInit = {}): Promise<APIResponse<T, E>> {
        return await this.call<T, E>(url, 'PATCH',
            {
                body: JSON.stringify(data),
                ...options
            });
    }

    public async DELETE<T = any, E=any>(url: string, options: RequestInit = {}): Promise<APIResponse<T, E>> {
        return await this.call<T, E>(url, 'DELETE', options);
    }

    private async call<T, E>(url: string, method: string, options: {}): Promise<APIResponse<T, E>> {
        try {
            const request = await fetch(this.serverLocation + url, {
                method: method,
                ...options,
                ...API.getRequiredOptions()
            });
            return this.toApiResponse<T, E>(request);
        } catch (e) {
            return {
                success: false,
                status: 500,
                data: null,
                error: [ServerErrors.SERVER_NOT_REACHABLE] as E,
                meta: null
            };
        }
    }

    public async ping(): Promise<boolean> {
        try {
            const response = await this.GET('/ping');
            return response.success;
        } catch (e) {
            return false;
        }
    }

    private async toApiResponse<T, E>(response: Response): Promise<APIResponse<T, E>> {
        //if we don't expect a body then we don't need to wait for a json.
        let data: APISuccessResponse<T> | APIErrorResponse<E>;

        try {
            data = await response.json();
        } catch (error) {
            data = null;
        }

        let status: number = response.status;

        //401 does not come with the default API structure yet, so we catch this apart from the rest
        if(status == 401) {
            const errorResonse: APIErrorResponse<E> = {
                success: false,
                status: 401,
                error: null as E,
                data: null,
                meta: null
            }

            return errorResonse;
        }

        if (response.ok) {
            const successResponse: APISuccessResponse<T> = {
                success: true,
                status: data.status,
                data: data.data as T,
                meta: data.meta,
                error: null
            }
            return successResponse;
        }

        const errorResonse: APIErrorResponse<E> = {
            success: false,
            status: data.status,
            error: data.error as E,
            data: null,
            meta: null
        }
        return errorResonse;
    }

    private static getRequiredOptions(): RequestInit {
        return {
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
    }
}

export const api = new API();
