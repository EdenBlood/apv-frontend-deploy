import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const { cerrarSession } = useAuth()
  return (
    <header className="py-10 bg-indigo-600">
      <div className="container mx-auto flex flex-col lg:flex-row md:justify-between items-center gap-6">
        <h1 className="font-bold text-2xl text-indigo-200 text-center">
          Administrador de Pacientes de {''} <span className="text-white font-black">Veterinaria</span>
        </h1>

        <nav className='flex flex-col items-center md:flex-row gap-4'>
          <Link to="/admin" className='text-white transition-colors hover:text-indigo-200 text-xl uppercase font-bold'>Pacientes</Link>
          <Link to="/admin/perfil" className='text-white transition-colors hover:text-indigo-200 text-xl uppercase font-bold'>Perfil</Link>
          <button
            className='text-white transition-colors hover:text-indigo-200 cursor-pointer text-xl uppercase font-bold'
            type='button'
            onClick={cerrarSession}
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
