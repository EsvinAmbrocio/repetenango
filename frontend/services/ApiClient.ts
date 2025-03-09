import { HttpMethod, ApiError } from '@/types';

type Headers = Record<string, string>;
type Params = Record<string, string | number | boolean>;
type RequestData = Record<string, unknown> | FormData | null;

export class ApiClient {
    private baseUrl: string = '';
    private defaultHeaders: Headers;

    constructor(baseUrl: string, globalHeaders: Headers = {}) {
        this.setBaseUrl(baseUrl);
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...globalHeaders
        };
    }

    setBaseUrl(baseUrl: string): void {
        if(typeof baseUrl !== 'string') {
            throw new Error('baseUrl must be a string');
        }
        if(String(baseUrl).trim().length === 0) {
            throw new Error('baseUrl cannot be empty');
        }
        this.baseUrl = baseUrl;
    }

    setGlobalHeader(key: string, value: string): void {
        this.defaultHeaders[key] = value;
    }

    removeGlobalHeader(key: string): void {
        delete this.defaultHeaders[key];
    }

    private async request<T>(
        method: HttpMethod,
        path: string,
        data: RequestData = null,
        params: Params = {},
        headers: Headers = {}
    ): Promise<T> {
        const url = new URL(path, this.baseUrl);

        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });

        const mergedHeaders: Headers = {
            ...this.defaultHeaders,
            ...headers
        };

        Object.keys(mergedHeaders).forEach(key => {
            if (mergedHeaders[key] == null) {
                delete mergedHeaders[key];
            }
        });

        const options: RequestInit = {
            method: method,
            headers: mergedHeaders
        };

        if (data) {
            if (data instanceof FormData) {
                options.body = data;
                delete (options.headers as Record<string, string>)['Content-Type'];
            } else {
                options.body = JSON.stringify(data);
            }
        }

        const response = await fetch(url.toString(), options);

        let responseData: unknown;
        const contentType = response.headers.get('content-type');
        try {
            responseData = contentType?.includes('application/json')
                ? await response.json()
                : await response.text();
        } catch (error) {
            responseData = null;
        }

        if (!response.ok) {
            throw new ApiError(
                `Error en la solicitud: ${response.statusText}`,
                response.status,
                responseData
            );
        }

        return responseData as T;
    }

    get<T>(path: string, params: Params = {}, headers: Headers = {}): Promise<T> {
        return this.request<T>(HttpMethod.GET, path, null, params, headers);
    }

    post<T>(path: string, data: RequestData, params: Params = {}, headers: Headers = {}): Promise<T> {
        return this.request<T>(HttpMethod.POST, path, data, params, headers);
    }

    put<T>(path: string, data: RequestData, params: Params = {}, headers: Headers = {}): Promise<T> {
        return this.request<T>(HttpMethod.PUT, path, data, params, headers);
    }

    delete<T>(path: string, params: Params = {}, headers: Headers = {}): Promise<T> {
        return this.request<T>(HttpMethod.DELETE, path, null, params, headers);
    }
}
