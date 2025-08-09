import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
// import { API } from '../wherever/your/api/constants'  // adjust path
// import { mockUsers } from './fixtures'                 // optional

export const server = setupServer(
    // default handler so strict mode won’t explode on other tests
    http.get('*/users', () => HttpResponse.json([]))
)