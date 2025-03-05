import { createContext, useState, useEffect } from 'react';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';

const PacientesContext = createContext();

//* Usamos en el app
export const PacientesProvider = ({children}) => {

  const [ pacientes, setPacientes ] = useState( [] );
  const [ paciente, setPaciente ] = useState( {} );

  const { auth } = useAuth();

  useEffect( () => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;  

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        };
        const { data } = await clienteAxios('/pacientes', config);

        setPacientes( data );
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPacientes();
    //* Le pasamos el auth para que cuando un usuario inicie session o cierre session se actualize la lista de sus pacientes.
  }, [auth])

  const guardarPaciente = async (paciente) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    //* Comprobamos si se esta editando con el id.
    if (paciente.id) {
      try {
        const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
        
        //* Para actualizarlo buscamos ese que cambiamos, lo reemplazamos y el reto que los returne en el map
        const pacientesActualizado = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState );
        
        //* Como el map devuelve un nuevo arreglo, lo seteamos en los pacientes que tenemos y como el useEddect escucha un cambio en 
        setPacientes(pacientesActualizado);

      } catch (error) {
        console.log(error);
      }
      
    } else { //* Si no tiene el id es porque lo estamos agregando

      try {
        const { data } = await clienteAxios.post('/pacientes', paciente, config);
        
        //* Seleccionamos los datos que queremos quitar
        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
        //* Ahora en pacienteAlmacenado tenemos un nuevo objeto con todos los datos, menos los que agregamos ahi.
  
        setPacientes([pacienteAlmacenado, ...pacientes])

      } catch (error) {
        console.log( error.response.data.msg );
      }
    }

  }
  
  //* Editar Paciente

  const setEdicion = paciente => {
    setPaciente(paciente)
  }

  //* Eliminar Pacientes
  const eliminarPaciente = async id => {
    const confirmar = confirm("¿Quieres eliminar al Paciente?");

    if(confirmar) {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      try {
        await clienteAxios.delete(`/pacientes/${id}`, config);

        const pacientesActualizado = pacientes.filter( pacienteState => pacienteState._id !== id );

        setPacientes( pacientesActualizado );
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <PacientesContext.Provider 
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente
      }}
    >
      {children}
    </PacientesContext.Provider>
  )
}

//* Usamos en el hook que creamos para poder acceder a los valores con useContext
export default PacientesContext