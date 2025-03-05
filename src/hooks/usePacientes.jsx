//Section - Este archivo lo que va a hacer es que el contenido de Pacientes Provider sea posible acceder mediante usePacientes().
import { useContext } from 'react';
import PacientesContext from '../context/PacientesProvider'

const usePacientes = () => {
  return useContext(PacientesContext)
}

export default usePacientes;