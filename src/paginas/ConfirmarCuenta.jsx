//* useParams es un hook que nos permite leer los parametros de la url.
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Alerta from '../components/Alerta';

//* Como creamos una ruta predeterminada para las url de axios ya no tenemos que importar axios, sino la variable en la cual lo almacenamos.
// import axios from 'axios';
import clienteAxios from '../config/axios';

const ConfirmarCuenta = () => {
  const [ cuentaConfirmada, setCuentaConfirmada ] = useState(false);
  const [ cargando, setCargando ] = useState(true);
  const [ alerta, setAlerta ] = useState('');

  const params = useParams();
  const { id } = params;

  //* Usamos el useEffect para que se utilice una sola vez cuando el componente este listo.
  useEffect( () => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        //* Aca tambien reemplazamos axios por la variable que importamos
        // const { data } = await axios(url);
        const { data } = await clienteAxios( url );
        
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg
        })
        
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
      }
      
      setCargando(false);
    }
    
    confirmarCuenta();
  },[id]);

  return (
    <>
      <div className="">
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu Cuenta y Comienza a Administrar {""}<span className="text-black"> tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow px-5 py-10 rounded-xl bg-white">
        { !cargando && <Alerta 
          alerta={alerta}
        /> }

        { cuentaConfirmada && (
          <Link className="block text-center my-5 text-indigo-400 hover:text-indigo-600 font-bold" to="/">Inicia Sesión</Link>
        ) }
      </div>
    </>
  )
}

export default ConfirmarCuenta
