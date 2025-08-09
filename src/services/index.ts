// Export all services
export * from './api';
export * from './userService';
export * from './postService';
export * from './commentService';

// Export service objects for convenience
import * as api from './api';
import * as userService from './userService';
import * as postService from './postService';
import * as commentService from './commentService';

export const services = {
    api,
    userService,
    postService,
    commentService,
};

export default services;