import { useState, useEffect } from 'react'

import Card from '../components/ui/Card'
import UserList from '../components/features/UserList'
import { SelectedUserProvider } from '../contexts/SelectedUserContext'

const Home = () => {
  const [count, setCount] = useState(0)
  const [nombre, setNombre] = useState('')

  useEffect(() => {
    console.log('La app se montó ✅')
  }, [])

  useEffect(() => {
    console.log(`El contador cambió: ${count}`)
  }, [count])
  /*
    useEffect(() => {
      const intervalo = setInterval(() => {
        setCount((prev) => prev + 1)
      }, 1000)
  
      return () => {
        console.log('Componente desmontado ❌')
        clearInterval(intervalo)
      }
    }, [])
  */
  useEffect(() => {
    const manejarResize = () => {
      console.log('Tamaño ventana:', window.innerWidth)
    }

    window.addEventListener('resize', manejarResize)

    return () => {
      window.removeEventListener('resize', manejarResize)
    }
  }, [])

  const incrementar = () => {
    setCount(count + 1)
  }
  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value)
  }
  return (
    <>
      <SelectedUserProvider>
        <div style={{ padding: '2rem' }}>
          <h1>Mi primera app en React + TypeScript 🚀</h1>

          <Card
            title='Hola mundocfede'
            description='Este es mi primer componente'
          >
            <p>Contador: {count}</p>
            <input
              type='text'
              placeholder='Escribí tu nombre'
              value={nombre}
              onChange={manejarCambio}
            />

            <p>Hola, {nombre || 'desconocido'} 👋</p>
            <button onClick={incrementar}>Sumar +1</button>
          </Card>
          <Card
            title='Mira la Lista que me arme'
            description='Una enorme lista de usuarios'
          >
            <UserList />
          </Card>
        </div>
      </SelectedUserProvider>
    </>
  )
}

export default Home
