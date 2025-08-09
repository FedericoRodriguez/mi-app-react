/**
 * User type definition
 * Used in UserList, UserResults, UserDetail, SelectedUserContext
 */
export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    phone: string;
    website: string;
    [key: string]: unknown; // For any additional properties from the API
}

/**
 * Post type definition
 * Used in UserPosts
 */
export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

/**
 * Comment type definition
 * Used in PostComments
 */
export interface Comment {
    id: number;
    name: string;
    email: string;
    body: string;
    postId: number;
}

/**
 * Error type for better error handling
 * Used in UserDetail
 */
export type ErrorType = 'not-found' | 'network' | 'unknown' | null;