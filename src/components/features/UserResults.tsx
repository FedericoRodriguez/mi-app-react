import { useSelectedUser } from '../../contexts/SelectedUserContext'
import { Link } from 'react-router-dom'

type User = {
  id: number
  name: string
  email: string
  username: string
  phone: string
  website: string
}

type Props = {
  users: User[]
}

const UserResults: React.FC<Props> = ({ users }) => {
  const { setSelectedUser } = useSelectedUser()
  return (
    <ul>
      {users.map((user) => (
        <li
          key={user.id}
          style={{ cursor: 'pointer', marginBottom: '0.5rem' }}
          onClick={() => setSelectedUser(user)}
        >
          <strong>{user.name}</strong> ({user.username})
          <Link to={`/usuario/${user.id}`}>
            <strong>{user.name}</strong> ({user.username})
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default UserResults
