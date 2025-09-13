import { User } from '../types';
import { API } from '../constants';
import { fetchApi, createCacheKey, getFromCache, saveToCache } from './api';

/**
 * Fetch all users
 */
export async function getUsers(): Promise<User[]> {
    const cacheKey = createCacheKey(API.ENDPOINTS.USERS);
    const cachedData = getFromCache<User[]>(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    const users = await fetchApi<User[]>(API.ENDPOINTS.USERS);
    saveToCache(cacheKey, users);

    return users;
}

/**
 * Fetch a single user by ID
 */
export async function getUserById(id: number | string): Promise<User> {
    const endpoint = `${API.ENDPOINTS.USERS}/${id}`;
    const cacheKey = createCacheKey(endpoint);
    const cachedData = getFromCache<User>(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    const user = await fetchApi<User>(endpoint);
    saveToCache(cacheKey, user);

    return user;
}

/**
 * Search users by name or username
 */
export function searchUsers(users: User[], searchTerm: string): User[] {
    if (!searchTerm.trim()) {
        return users;
    }

    const term = searchTerm.toLowerCase();

    return users.filter(
        (user) =>
            user.name.toLowerCase().includes(term) ||
            user.username.toLowerCase().includes(term)
    );
}


/**
 * Set new user in session storage
 */
export async function setNewUser(userName: string): Promise<User> {
    const endpoint = `${API.ENDPOINTS.USERS}`;
    const cacheKey = createCacheKey(endpoint);
    const cachedData: User[] = getFromCache(cacheKey) || [];


    const user = {
        name: userName,
        email: `${userName.toLowerCase()}@example.com`,
    }


    const newUser = await fetchApi<User>(endpoint, {
        method: 'POST',
        body: JSON.stringify(user),
    });


    if (cachedData) {
        // add this newUser to the cached data
        const updatedUsers = [...cachedData, newUser];
        saveToCache(cacheKey, updatedUsers);
    } else {
        // if no cached data, just save the new user
        saveToCache(cacheKey, [newUser]);
    }

    return newUser;
}