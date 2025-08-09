import { useEffect, useState } from 'react'
import UserPosts from './UserPosts'
import UserSearch from './UserSearch'
import UserResults from './UserResults'
import { useSelectedUser } from '../../contexts/SelectedUserContext'
import { User } from '../../types'
import { getUsers, searchUsers, ApiError } from '../../services'

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [search, setSearch] = useState('')

  const { selectedUser } = useSelectedUser()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Use the userService to fetch users
        const data = await getUsers()
        setUsers(data)
        setFilteredUsers(data)
      } catch (err) {
        const errorMessage =
          err instanceof ApiError
            ? `Error ${err.status}: ${err.message}`
            : err instanceof Error
            ? err.message
            : 'Error desconocido'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    // Use the searchUsers utility from userService
    const filtered = searchUsers(users, search)
    setFilteredUsers(filtered)
  }, [search, users])

  if (loading) return <p>Cargando usuarios...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <>
      <UserSearch search={search} setSearch={setSearch} />
      <UserResults users={filteredUsers} />

      {selectedUser && (
        <div
          style={{
            marginTop: '1rem',
            borderTop: '1px solid #ccc',
            paddingTop: '1rem',
          }}
        >
          <h3>Detalles del usuario</h3>
          <p>
            <strong>Nombre:</strong> {selectedUser.name}
          </p>
          <p>
            <strong>Usuario:</strong> {selectedUser.username}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p>
            <strong>Teléfono:</strong> {selectedUser.phone}
          </p>
          <p>
            <strong>Sitio web:</strong> {selectedUser.website}
          </p>

          {/* Mostrar posts del usuario */}
          <UserPosts userId={selectedUser.id} />
        </div>
      )}
    </>
  )
}

export default UserList
