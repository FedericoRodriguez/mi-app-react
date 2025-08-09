import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/ui/Card'
import { User, ErrorType } from '../types'
import { ERROR_MESSAGES } from '../constants'
import { getUserById, ApiError } from '../services'

/**
 * UserDetail component displays detailed information about a specific user
 * Fetches user data from the API based on the ID parameter
 */
const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<ErrorType>(null)

  // Memoized fetch function to prevent unnecessary recreations
  const fetchUser = useCallback(async () => {
    // Validate ID before making the request
    if (!id || isNaN(Number(id))) {
      setError('not-found')
      setLoading(false)
      return
    }

    // Create abort controller for cleanup
    const controller = new AbortController()

    try {
      setLoading(true)
      setError(null)

      // Use the userService to fetch the user
      const userData = await getUserById(id)
      setUser(userData)
    } catch (err) {
      // Handle different error types
      if (err instanceof ApiError) {
        if (err.status === 404) {
          setError('not-found')
        } else {
          setError('unknown')
        }
      } else if (err instanceof Error && err.name === 'AbortError') {
        // Ignore abort errors
      } else {
        setError('network')
      }
    } finally {
      setLoading(false)
    }

    // Cleanup function to abort fetch on unmount
    return () => controller.abort()
  }, [id])

  useEffect(() => {
    let cleanupFn: (() => void) | undefined

    // Execute the fetch and store the cleanup function when resolved
    fetchUser().then((fn) => {
      cleanupFn = fn
    })

    return () => {
      // Cleanup on component unmount
      if (cleanupFn) cleanupFn()
    }
  }, [fetchUser])

  // Render appropriate UI based on component state
  if (loading) {
    return (
      <div
        className='card skeleton fade-in'
        aria-live='polite'
        aria-busy='true'
      >
        <div className='skeleton-title'></div>
        <div className='skeleton-body'></div>
        <div className='skeleton-body'></div>
      </div>
    )
  }

  if (error) {
    return (
      <Card
        title='Error'
        description={
          error === 'not-found'
            ? ERROR_MESSAGES.NOT_FOUND
            : error === 'network'
            ? ERROR_MESSAGES.NETWORK_ERROR
            : ERROR_MESSAGES.UNKNOWN_ERROR
        }
      >
        <button onClick={() => fetchUser()} className='retry-button'>
          Reintentar
        </button>
      </Card>
    )
  }

  // Safely access user properties with optional chaining
  return (
    <section className='user-detail-container fade-in'>
      <Card
        title={`Detalles de ${user?.name || 'Usuario'}`}
        description={`Información completa del usuario ${user?.username || ''}`}
      >
        <article className='user-info'>
          <p>
            <strong>Username:</strong> {user?.username}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          {/* Additional user properties can be added here */}
        </article>
      </Card>
    </section>
  )
}

// Use memo to prevent unnecessary re-renders
export default React.memo(UserDetail)
