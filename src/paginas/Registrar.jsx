//Section - Registro.
//Description: Instalamos "npm install axios" para enviar la informacion al backend
//* importamos el hook de react "useState" para el registro 
import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
// import axios from 'axios';
import clienteAxios from '../config/axios';

const Registrar = () => {
  const [ nombre, setNombre ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ repetirPassword, setRepetirPassword ] = useState('')

  const [ alerta , setAlerta ] = useState('');

  function resetearFormulario() {
    setNombre('');
    setEmail('');
    setPassword('');
    setRepetirPassword('');
  }

  const handleSubmit = async e => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].some( value => String(value).trim() === '' )) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true })
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: "Los Passwords no son iguales", error: true })
      return;
    }

    if( password.length < 6 ) {
      setAlerta({ msg: "El password debe de contener minimo 6 caracteres", error: true })
      return;
    }

    setAlerta({});

    //* Crear el usuario en nuestra API usando axios
    try { //* si en axios no especificas el verbo, por defecto es ".get()"
      const url = '/veterinarios'; //* `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios`;
      //* Enviamos mediante el verbo post la peticion de agregar a un veterinario con los datos de nombre, email, password
      await clienteAxios.post(url, { nombre, email, password });

      resetearFormulario();
      setAlerta({ msg: "Te enviamos un email de confirmación", error: false });
    } catch (error) {
      //* Extraemos el mensaje de error de nuestro backend.
      setAlerta({ msg: error.response.data.msg, error: true });
    }
    
    //* Eliminarmos la alerta despues de 5 seg.
    setTimeout( () => {
      setAlerta({});
    },5000)
  }

  const { msg } = alerta;

  return (
    <>
      <div className="">
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu Cuenta y Administra tus{""}<span className="text-black"> Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow px-5 py-10 rounded-xl bg-white">

        { msg && <Alerta
          alerta={alerta}
        /> }

        <form 
          onSubmit={ handleSubmit }
        >

          <div className="my-5">
            <label htmlFor="" className="uppercase block font-bold text-xl text-gray-600">Nombre</label>
            <input 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl border-gray-300"
                type="text" 
                placeholder="Tu Nombre"
                value={nombre}
                onChange={ e => setNombre(e.target.value) }
            />
          </div>

          <div className="my-5">
            <label htmlFor="" className="uppercase block font-bold text-xl text-gray-600">Email</label>
            <input 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl border-gray-300"
                type="email" 
                placeholder="Email de Registro"
                value={email}
                onChange={ e => setEmail(e.target.value) }
                />
          </div>

          <div className="my-5">
            <label htmlFor="" className="uppercase block font-bold text-xl text-gray-600">Password</label>
            <input 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl border-gray-300"
                type="password" 
                placeholder="Tu Password"
                value={password}
                onChange={ e => setPassword(e.target.value) }
                />
          </div>

          <div className="my-5">
              <label htmlFor="" className="uppercase block font-bold text-xl text-gray-600">Repetir Password</label>
              <input 
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl border-gray-300"
                  type="password" 
                  placeholder="Repite Tu Password"
                  value={repetirPassword}
                  onChange={ e => setRepetirPassword(e.target.value) }
              />
          </div>

          <input 
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white font-bold uppercase mt-10 hover:bg-indigo-800 hover:cursor-pointer md:w-auto block mx-auto "
              type="submit" 
              value="Registrarse"
          />

        </form>

        <nav className="mt-10 lg:flex lg:justify-between"> 
            <Link className="block text-center my-5 text-gray-400 hover:text-gray-700 font-bold" to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>  
            <Link className="block text-center my-5 text-gray-400 hover:text-gray-700 font-bold" to="/olvide-password">Olvide mi password</Link>
        </nav>
      </div>
    </>
  )
}

export default Registrar
