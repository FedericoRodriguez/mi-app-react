import React, { useEffect, useState } from 'react'
import PostComments from './PostComments'

type Post = {
  id: number
  title: string
  body: string
}

type Props = {
  userId: number
}

const UserPosts: React.FC<Props> = ({ userId }) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        )
        if (!res.ok) throw new Error('Error al obtener los posts')
        const data = await res.json()
        setPosts(data)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Error desconocido')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [userId])

  const handleToggleComments = (postId: number) => {
    setSelectedPostId((prev) => (prev === postId ? null : postId))
  }

  if (loading) return <p>Cargando posts...</p>
  if (error) return <p>Error: {error}</p>
  if (posts.length === 0) return <p>Este usuario no tiene posts.</p>

  return (
    <div>
      <h4>Posts del usuario</h4>
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: '1rem', cursor: 'pointer' }}>
            <div onClick={() => handleToggleComments(post.id)}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
              <p style={{ fontSize: '0.85rem', color: 'blue' }}>
                {selectedPostId === post.id
                  ? 'Ocultar comentarios'
                  : 'Ver comentarios'}
              </p>
            </div>

            {selectedPostId === post.id && <PostComments postId={post.id} />}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPosts
