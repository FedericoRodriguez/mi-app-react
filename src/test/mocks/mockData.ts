import { User, Post, Comment } from '../../types';

// Mock users data
export const mockUsers: User[] = [
    {
        id: 1,
        name: "Leanne Graham",
        username: 'testuser',
        email: 'test@example.com',
        phone: '123-456-7890',
        website: 'example.com',
    },
    {
        id: 2,
        name: 'Another User',
        username: 'anotheruser',
        email: 'another@example.com',
        phone: '098-765-4321',
        website: 'example.org',
    },
];

// Mock posts data
export const mockPosts: Post[] = [
    {
        id: 1,
        userId: 1,
        title: 'Mock Post 1',
        body: 'This is a mock post for testing',
    },
    {
        id: 2,
        userId: 1,
        title: 'Mock Post 2',
        body: 'This is another mock post for testing',
    },
    {
        id: 3,
        userId: 2,
        title: 'Mock Post 3',
        body: 'This is a post from another user',
    },
];

// Mock comments data
export const mockComments: Comment[] = [
    {
        id: 1,
        postId: 1,
        name: 'Mock Comment 1',
        email: 'commenter1@example.com',
        body: 'This is a mock comment for testing',
    },
    {
        id: 2,
        postId: 1,
        name: 'Mock Comment 2',
        email: 'commenter2@example.com',
        body: 'This is another mock comment for testing',
    },
    {
        id: 3,
        postId: 2,
        name: 'Mock Comment 3',
        email: 'commenter3@example.com',
        body: 'This is a comment on another post',
    },
];