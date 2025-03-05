import { useState } from 'react';

import ListadoPacientes from "../components/ListadoPacientes"
import Formulario from "../components/Formulario"

const AdministrarPacientes = () => {
  const [ mostrarFormulario, setMostrarFormulario ] = useState(false);
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <button
          className='w-9/10 cursor-pointer block mx-auto mb-3 md:hidden text-center bg-indigo-600 p-3 rounded-lg text-white font-bold uppercase '
          onClick={ () => setMostrarFormulario(!mostrarFormulario) }
          >{`${mostrarFormulario ? 'Ocutar Formulario' : 'Mostrar Formulario' }`}</button>
        <div className={`${ mostrarFormulario ? 'block' : 'hidden' } md:block md:w-1/2 lg:w-2/5`}>
          <Formulario />
        </div>

        <div className="md:w-1/2 lg:w-3/5">
          <ListadoPacientes />
        </div>
      </div>
    </>
  )
}

export default AdministrarPacientes
