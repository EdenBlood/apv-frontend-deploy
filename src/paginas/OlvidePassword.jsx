import { Link } from "react-router-dom"
import { useState } from 'react';
import Alerta from "../components/Alerta";
import clienteAxios from '../config/axios';

const OlvidePassword = () => {
  const [ email, setEmail ] = useState('');
  const [ alerta, setAlerta ] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();

    if ( String(email).trim === '' || email.length < 6 ) {
      setAlerta({
        msg: "El email es obligatorio",
        error: true
      });
      return;
    };

    try {
      const url = '/veterinarios/olvide-password';
      const { data } = await clienteAxios.post(url, {email});

      setAlerta({
        msg: data.msg
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

    setTimeout( () => {
      setAlerta({})
    }, 5000);
  };

  return (
    <>
      <div className="">
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tu Password y no Pierdas tus {""}<span className="text-black"> Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow px-5 py-10 rounded-xl bg-white">
        { alerta.msg && <Alerta 
          alerta={alerta}
        />}
        <form
          onSubmit={ handleSubmit }
        >

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

          <input 
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white font-bold uppercase mt-10 hover:bg-indigo-800 hover:cursor-pointer md:w-auto block mx-auto "
              type="submit" 
              value="Recuperar Contraseña"
          />

        </form>

        <nav className="mt-10 lg:flex lg:justify-between"> 
            <Link className="block text-center my-5 text-gray-400 hover:text-gray-700 font-bold" to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>  
            <Link className="block text-center my-5 text-gray-400 hover:text-gray-700 font-bold" to="/registrar">¿No tienes una cuenta? Regístrate</Link>  
        </nav>
      </div>
    </>
  )
}

export default OlvidePassword
