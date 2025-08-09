type Props = {
  search: string
  setSearch: (value: string) => void
}

const UserSearch: React.FC<Props> = ({ search, setSearch }) => {
  return (
    <input
      type='text'
      placeholder='Buscar por nombre o usuario...'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ marginBottom: '1rem', padding: '0.5rem' }}
    />
  )
}

export default UserSearch
