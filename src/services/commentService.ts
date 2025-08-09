import { Comment } from '../types';
import { API, STORAGE_KEYS } from '../constants';
import { fetchApi, createCacheKey, getFromCache, saveToCache } from './api';

/**
 * Fetch all comments
 */
export async function getComments(): Promise<Comment[]> {
    const cacheKey = createCacheKey(API.ENDPOINTS.COMMENTS);
    const cachedData = getFromCache<Comment[]>(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    const comments = await fetchApi<Comment[]>(API.ENDPOINTS.COMMENTS);
    saveToCache(cacheKey, comments);

    return comments;
}

/**
 * Fetch a single comment by ID
 */
export async function getCommentById(id: number | string): Promise<Comment> {
    const endpoint = `${API.ENDPOINTS.COMMENTS}/${id}`;
    const cacheKey = createCacheKey(endpoint);
    const cachedData = getFromCache<Comment>(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    const comment = await fetchApi<Comment>(endpoint);
    saveToCache(cacheKey, comment);

    return comment;
}

/**
 * Fetch comments by post ID
 */
export async function getCommentsByPostId(postId: number | string): Promise<Comment[]> {
    // Use the storage key from constants
    const storageKey = STORAGE_KEYS.COMMENTS(Number(postId));
    const cachedData = getFromCache<Comment[]>(storageKey);

    if (cachedData) {
        return cachedData;
    }

    const endpoint = `${API.ENDPOINTS.COMMENTS}`;
    const comments = await fetchApi<Comment[]>(`${endpoint}?postId=${postId}`);

    // Save to cache using the storage key
    saveToCache(storageKey, comments);

    return comments;
}

/**
 * Create an intersection observer to detect when an element is visible
 * @param callback Function to call when visibility changes
 * @param threshold The visibility threshold (0-1)
 */
export function createVisibilityObserver(
    callback: (isVisible: boolean) => void,
    threshold: number = 0.1
): IntersectionObserver {
    return new IntersectionObserver(
        ([entry]) => {
            callback(entry.isIntersecting);
        },
        { threshold }
    );
}