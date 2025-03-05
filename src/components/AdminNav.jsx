import { Link } from 'react-router-dom';

const AdminNav = () => {
  return (
    <>
      <nav className='flex justify-center md:justify-start'>
        <Link
          to="/admin/perfil"
          className="font-bold uppercase p-1 px-4 text-gray-500 border-b-3 border-b-indigo-400 hover:border-b-indigo-600 hover:text-indigo-600 transition-colors "
        >Perfil</Link>
        <Link
          to="/admin/cambiar-password"
          className="font-bold uppercase border-b-3 border-b-indigo-400 hover:border-b-indigo-600 p-1 px-4 text-gray-500 hover:text-indigo-600 transition-colors "
        >Cambiar Password</Link>
      </nav>
    </>
  )
}

export default AdminNav