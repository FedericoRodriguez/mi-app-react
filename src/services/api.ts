import { API } from '../constants';

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

/**
 * Base fetch function with error handling
 */
export async function fetchApi<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const url = `${API.BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        });

        if (!response.ok) {
            throw new ApiError(
                `API error: ${response.statusText}`,
                response.status
            );
        }

        return await response.json();
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        // Re-throw network errors or other errors
        if (error instanceof Error) {
            throw new ApiError(error.message, 0);
        }

        // Fallback for unknown errors
        throw new ApiError('Unknown error occurred', 0);
    }
}

/**
 * Create a cache key for storing API responses
 */
export function createCacheKey(endpoint: string, params?: Record<string, unknown>): string {
    if (!params) return endpoint;

    const queryString = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

    return `${endpoint}?${queryString}`;
}

/**
 * Get data from cache if available
 */
export function getFromCache<T>(key: string): T | null {
    const cached = sessionStorage.getItem(key);
    if (cached) {
        try {
            return JSON.parse(cached) as T;
        } catch {
            return null;
        }
    }
    return null;
}

/**
 * Save data to cache
 */
export function saveToCache<T>(key: string, data: T): void {
    sessionStorage.setItem(key, JSON.stringify(data));
}