import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente";

const ListadoPacientes = () => {
  const { pacientes } = usePacientes();


  return (
    <>
      { pacientes.length ? (
        <>
          <h2 className="font-semibold text-xl text-center mb-10" >Informacion de {''} <span className="font-bold text-indigo-600">tus pacientes</span></h2>
          <p className="text-xl text-center mb-10 mt-5 font-bold">
            Administra tus Pacientes y Citas
          </p>

          { pacientes.map( paciente => (
            <Paciente 
              key={ paciente._id }
              paciente={ paciente } 
            />
          ) ) }
        </>
      ) : (
        <>
          <h2 className="font-semibold text-xl text-center mb-10" >Comienza agregando pacientes {''} <span className="font-bold text-indigo-600">y aparecerán en este lugar</span></h2>
          <p className="text-xl text-center mb-10 mt-5 font-bold">
            No Hay Pacientes
          </p>
        </>
      ) }
    </>
  )
}

export default ListadoPacientes
