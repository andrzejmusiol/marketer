import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'


const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

const requestHandler = async <T>(
    promise: Promise<AxiosResponse<T>>
): Promise<T> => {
    try {
        const response = await promise
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw {
                message: error.response.data.detail,
                statusCode: error.response.status,
            }
        } else {
            throw new Error('An unexpected error occurred')
        }
    }
}

export const API = {
    get: <T>(url: string, config: AxiosRequestConfig = {}): Promise<T> => {
        const res = apiClient.get<T>(url, config)
        return requestHandler(res)
    },
    post: <T>(
        url: string,
        data?: unknown,
        config: AxiosRequestConfig = {}
    ): Promise<T> => {
        const res = apiClient.post<T>(url, data, config)
        return requestHandler(res)
    },
    put: <T>(
        url: string,
        data?: unknown,
        config: AxiosRequestConfig = {}
    ): Promise<T> => {
        const res = apiClient.put<T>(url, data, config)
        return requestHandler(res)
    },
    patch: <T>(
        url: string,
        data?: unknown,
        config: AxiosRequestConfig = {}
    ): Promise<T> => {
        const res = apiClient.patch<T>(url, data, config)
        return requestHandler(res)
    },
    delete: <T>(
        url: string,
        data?: unknown,
        config: AxiosRequestConfig = {}
    ): Promise<T> => {
        const res = apiClient.delete<T>(url, { ...config, data })
        return requestHandler(res)
    },
}
