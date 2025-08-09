import { Link } from 'react-router-dom'

const NavBar = () => (
  <nav style={{ padding: '1rem', background: '#eee' }}>
    <Link to='/' style={{ marginRight: '1rem' }}>
      Inicio
    </Link>
    {/* Puedes agregar más links luego */}
  </nav>
)

export default NavBar
