import { useState, useEffect } from 'react';
import Alerta from '../components/Alerta'
import usePacientes from '../hooks/usePacientes';

const Formulario = () => {
  const [ nombre, setNombre ] = useState('');
  const [ propietario, setPropietario ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ fecha, setFecha ] = useState('');
  const [ sintomas, setSintomas ] = useState('');
  const [ id, setId ] = useState(null);

  const [ alerta, setAlerta ] = useState({});
  
  const { guardarPaciente, paciente } = usePacientes()

  //* Editar 
  useEffect( () => {
    if(paciente?.nombre) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      // setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }
  }, [paciente])

  const resetForm = () => {
    setNombre('');
    setPropietario('');
    setEmail('');
    setSintomas('');
    setFecha('');
    setId(null);
  }
  
  const handleSubmit = e => {
    e.preventDefault();

    if ( [nombre, propietario, email, fecha, sintomas].some( value => String(value).trim() === '' ) ) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true })
      return;
    }

    guardarPaciente( { nombre, propietario, email, fecha, sintomas, id } )
    setAlerta({ msg: 'Guardado Correctamente' })
    resetForm();

    setTimeout(() => {
      setAlerta({});
    },3000)
  }

  return (
    <>
      <p className="text-xl font-semibold text-center mb-10">
        Añade tus pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      
      <form 
        className="bg-white py-10 px-5 mb-10 lg:mb-8 shadow-lg rounded-md"
        onSubmit={ handleSubmit }
      >


        <div>
          <label 
            htmlFor="nombre"
            className="text-gray-700 uppercase font-bold"
          >Nombre Mascota</label>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre de la Mascota..."
            className="border-2 border-gray-300 mb-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={ e => setNombre( e.target.value ) }
          />
        </div>

        <div>
          <label 
            htmlFor="propietario"
            className="text-gray-700 uppercase font-bold"
          >Nombre Propietario</label>
          <input
            type="text"
            id="propietario"
            placeholder="Nombre del Propietario..."
            className="border-2 border-gray-300 mb-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={ e => setPropietario( e.target.value ) }
          />
        </div>
        
        <div>
          <label 
            htmlFor="email"
            className="text-gray-700 uppercase font-bold"
          >Email Propietario</label>
          <input
            type="email"
            id="email"
            placeholder="Email del Propietario..."
            className="border-2 border-gray-300 mb-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={ e => setEmail( e.target.value ) }
          />
        </div>
        
        <div>
          <label 
            htmlFor="fecha"
            className="text-gray-700 uppercase font-bold"
          >Fecha de Alta</label>
          <input
            type="date"
            id="fecha"
            className="border-2 border-gray-300 mb-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={ e => setFecha( e.target.value ) }
          />
        </div>
        
        <div>
          <label 
            htmlFor="sintomas"
            className="text-gray-700 uppercase font-bold"
          >Sintomas:</label>
          <textarea className="border-2 border-gray-300 mb-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" id="sintomas" placeholder="Describe los Sintomas" value={sintomas} onChange={ e => setSintomas(e.target.value)}></textarea>
        </div>

        { alerta.msg && <Alerta alerta={alerta} />}

        <input 
          className="bg-indigo-600 w-full p-3 rounded-lg text-white uppercase font-bold hover:bg-indigo-800 transition-colors cursor-pointer"
          type="submit" 
          value={ id ? 'Guardar Cambios' : "Agregar Paciente" }
        />
      </form>
    </>
  )
}

export default Formulario
