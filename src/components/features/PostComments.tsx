import React, { useEffect, useRef, useState } from 'react'
import SkeletonComment from '../ui/SkeletonComment'

type Comment = {
  id: number
  name: string
  email: string
  body: string
}

type Props = {
  postId: number
}

const PostComments: React.FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  // 🔍 Observador para ver si el componente entra en pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      },
      {
        threshold: 0.1,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  // 💬 Fetch sólo si visible
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const stored = sessionStorage.getItem(`comments_${postId}`)
        if (stored) {
          setComments(JSON.parse(stored))
          return
        }

        setLoading(true)
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
        )
        if (!res.ok) throw new Error('Error al obtener los comentarios')
        const data = await res.json()
        sessionStorage.setItem(`comments_${postId}`, JSON.stringify(data))
        setComments(data)
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Error desconocido'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    if (visible && comments.length === 0 && !loading) {
      fetchComments()
    }
  }, [visible, comments.length, loading, postId])

  return (
    <div
      ref={ref}
      className='fade-in'
      style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}
    >
      <h5>Comentarios</h5>
      {loading && (
        <ul>
          {[...Array(3)].map((_, i) => (
            <SkeletonComment key={i} />
          ))}
        </ul>
      )}
      {error && <p>Error: {error}</p>}
      {!loading && !error && comments.length === 0 && (
        <p>No hay comentarios.</p>
      )}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} style={{ marginBottom: '1rem' }}>
            <strong>{comment.name}</strong> ({comment.email})
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostComments
