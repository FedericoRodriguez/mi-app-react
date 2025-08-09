import { Post } from '../types';
import { API } from '../constants';
import { fetchApi, createCacheKey, getFromCache, saveToCache } from './api';

/**
 * Fetch all posts
 */
export async function getPosts(): Promise<Post[]> {
    const cacheKey = createCacheKey(API.ENDPOINTS.POSTS);
    const cachedData = getFromCache<Post[]>(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    const posts = await fetchApi<Post[]>(API.ENDPOINTS.POSTS);
    saveToCache(cacheKey, posts);

    return posts;
}

/**
 * Fetch a single post by ID
 */
export async function getPostById(id: number | string): Promise<Post> {
    const endpoint = `${API.ENDPOINTS.POSTS}/${id}`;
    const cacheKey = createCacheKey(endpoint);
    const cachedData = getFromCache<Post>(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    const post = await fetchApi<Post>(endpoint);
    saveToCache(cacheKey, post);

    return post;
}

/**
 * Fetch posts by user ID
 */
export async function getPostsByUserId(userId: number | string): Promise<Post[]> {
    const endpoint = `${API.ENDPOINTS.POSTS}`;
    const params = { userId };
    const cacheKey = createCacheKey(endpoint, params);
    const cachedData = getFromCache<Post[]>(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    const posts = await fetchApi<Post[]>(`${endpoint}?userId=${userId}`);
    saveToCache(cacheKey, posts);

    return posts;
}