/**
 * API Constants
 */
export const API = {
    BASE_URL: 'https://jsonplaceholder.typicode.com',
    ENDPOINTS: {
        USERS: '/users',
        POSTS: '/posts',
        COMMENTS: '/comments',
    },
};

/**
 * Route Constants
 */
export const ROUTES = {
    HOME: '/',
    USER_DETAIL: '/usuario/:id',
    USER_DETAIL_PATH: (id: string | number) => `/usuario/${id}`,
};

/**
 * Storage Keys
 */
export const STORAGE_KEYS = {
    COMMENTS: (postId: number) => `comments_${postId}`,
};

/**
 * UI Constants
 */
export const UI = {
    INTERSECTION_THRESHOLD: 0.1,
    SKELETON_COUNT: 3,
};

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
    USERS_FETCH_ERROR: 'Error al obtener los usuarios',
    POSTS_FETCH_ERROR: 'Error al obtener los posts',
    COMMENTS_FETCH_ERROR: 'Error al obtener los comentarios',
    NOT_FOUND: 'Usuario no encontrado',
    NETWORK_ERROR: 'Error de conexión. Por favor, intente nuevamente.',
    UNKNOWN_ERROR: 'Ha ocurrido un error. Por favor, intente nuevamente.',
};