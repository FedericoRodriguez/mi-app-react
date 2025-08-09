import { useEffect, useState } from 'react'
import UserPosts from './UserPosts'
import UserSearch from './UserSearch'
import UserResults from './UserResults'
import { useSelectedUser } from '../contexts/SelectedUserContext'

type User = {
  id: number
  name: string
  email: string
  username: string
  phone: string
  website: string
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [search, setSearch] = useState('')

  //const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { selectedUser } = useSelectedUser()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!res.ok) throw new Error('Error al obtener los usuarios')
        const data = await res.json()
        setUsers(data)
        setFilteredUsers(data)
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

    fetchUsers()
  }, [])

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredUsers(filtered)
  }, [search, users])

  if (loading) return <p>Cargando usuarios...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
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
    </div>
  )
}

export default UserList
