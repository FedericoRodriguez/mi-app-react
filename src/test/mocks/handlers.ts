import { http, HttpResponse } from 'msw';
import { API } from '../../constants';
import { mockUsers, mockPosts, mockComments } from './mockData';

// Define handlers for MSW
export const handlers = [
    // GET all users
    http.get(`${API.BASE_URL}${API.ENDPOINTS.USERS}`, () => {
        return HttpResponse.json(mockUsers);
    }),

    // GET user by ID
    http.get(`${API.BASE_URL}${API.ENDPOINTS.USERS}/:id`, ({ params }) => {
        const { id } = params;
        const user = mockUsers.find((user: { id: number }) => user.id === Number(id));

        if (!user) {
            return new HttpResponse(null, { status: 404 });
        }

        return HttpResponse.json(user);
    }),

    // GET posts by user ID
    http.get(`${API.BASE_URL}${API.ENDPOINTS.POSTS}`, ({ request }) => {
        const url = new URL(request.url);
        const userId = url.searchParams.get('userId');

        if (userId) {
            const userPosts = mockPosts.filter((post: { userId: number }) => post.userId === Number(userId));
            return HttpResponse.json(userPosts);
        }

        return HttpResponse.json(mockPosts);
    }),

    // GET comments by post ID
    http.get(`${API.BASE_URL}${API.ENDPOINTS.COMMENTS}`, ({ request }) => {
        const url = new URL(request.url);
        const postId = url.searchParams.get('postId');

        if (postId) {
            const postComments = mockComments.filter((comment: { postId: number }) => comment.postId === Number(postId));
            return HttpResponse.json(postComments);
        }

        return HttpResponse.json(mockComments);
    }),
];