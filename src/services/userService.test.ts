import { describe, it, expect, vi } from 'vitest';
import { server } from '../test/server';
import { http, HttpResponse } from 'msw';
import { getUsers, getUserById } from './userService';
import { mockUsers } from '../test/mocks/mockData';
import { API } from '../constants';
import { ApiError } from './api';
// in the test file
import * as apiCache from '../services/api' // <-- path to the file that exports createCacheKey/getFromCache/saveToCache


vi.mock('./cache', () => ({
    createCacheKey: (k: string) => k,
    getFromCache: () => null,
    saveToCache: () => { }
}))
vi.spyOn(apiCache, 'getFromCache').mockReturnValue(null)
vi.spyOn(apiCache, 'saveToCache').mockImplementation(() => { })

describe('User Service', () => {
    describe('getUsers', () => {
        it('fetches users successfully', async () => {
            const users = await getUsers();
            users.forEach(user => {
                expect(user).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        email: expect.any(String)
                    })
                );
            });
        });

        it('handles API errors', async () => {

            server.use(
                http.get(`${API.BASE_URL}${API.ENDPOINTS.USERS}`, () =>
                    HttpResponse.text('', { status: 500 })
                )
            )

            await expect(getUsers()).rejects.toBeInstanceOf(ApiError)
            await expect(getUsers()).rejects.toMatchObject({
                status: 500,
                message: 'API error: Internal Server Error',
            })
        });
    });

    describe('getUserById', () => {
        it('fetches a user by ID successfully', async () => {
            const user = await getUserById(1);
            const name = user.name;
            expect(name).toEqual(mockUsers[0].name);
        });

        it('handles not found errors', async () => {
            // Non-existent user ID
            await expect(getUserById(999)).rejects.toThrow();
        });
    });

});