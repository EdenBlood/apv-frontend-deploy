import usePacientes from "../hooks/usePacientes";

const Paciente = ({ paciente }) => {

  const { setEdicion, eliminarPaciente } = usePacientes();
  
  const { nombre, email, fecha, propietario, sintomas, _id } = paciente;

  const formatearFecha = fecha => {
    const nuevaFecha = new Date(fecha);
    return new Intl.DateTimeFormat('es-AR', {dateStyle: 'long'}).format(nuevaFecha);
  }


  return (
    <>
      <div className="mx-5 my-10 bg-white shadow-md p-6 rounded-xl">
        <p className="font-bold uppercase my-2 text-indigo-700">Nombre: {''}
          <span className="font-normal normal-case text-black">{nombre}</span>
        </p>
        <p className="font-bold uppercase my-2 text-indigo-700">Propietario: {''}
          <span className="font-normal normal-case text-black">{propietario}</span>
        </p>
        <p className="font-bold uppercase my-2 text-indigo-700">Email de Contacto: {''}
          <span className="font-normal normal-case text-black">{email}</span>
        </p>
        <p className="font-bold uppercase my-2 text-indigo-700">Fecha de Alta: {''}
          <span className="font-normal normal-case text-black">{formatearFecha(fecha)}</span>
        </p>
        <p className="font-bold uppercase my-2 text-indigo-700">Sintomas: {''}
          <span className="font-normal normal-case text-black">{sintomas}</span>
        </p>

        <div className="flex justify-between my-5">
          <button
            type="button"
            className="py-2 px-10 bg-indigo-500 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg cursor-pointer text-sm transition-colors"
            onClick={ () => setEdicion(paciente) }
          >Editar</button>
          <button
            type="button"
            className="py-2 px-10 bg-red-500 hover:bg-red-700 text-white font-bold uppercase rounded-lg cursor-pointer text-sm transition-colors"
            onClick={ () => eliminarPaciente(_id) }
          >Eliminar</button>

        </div>
      </div>
    </>
  )
}

export default Paciente
