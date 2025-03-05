import { useState } from "react"
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"

const CambiarPassword = () => {

  const { guardarPassword } = useAuth();

  const [ alerta, setAlerta ] = useState({});
  const [ password, setPassword ] = useState({
    password_actual: '',
    password_nuevo: '',
    password_repetir: ''
  })
  
  const handleSubmit = async e => {
    e.preventDefault();

    if( Object.values(password).some( value => String(value).trim() === '') ) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      setTimeout(() => setAlerta({}), 4000);
      return;
    }

    if( password.password_nuevo !== password.password_repetir ) {
      setAlerta({ msg: "Password nuevo y repetir deben ser iguales", error: true });
      setTimeout(() => setAlerta({}), 4000);
      return;
    }

    if( password.password_nuevo.length < 6) {
      setAlerta({ msg: "El nuevo password debe de tener almenos 6 caracteres", error: true });
      setTimeout(() => setAlerta({}), 4000);
      return;
    }
    
    const respuesta = await guardarPassword(password);

    setAlerta(respuesta)
    setTimeout(() => setAlerta({}), 4000);

    //* Limpiamos los campos
    setPassword({
      password_actual: '',
      password_nuevo: '',
      password_repetir: ''
    })
  }

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
      <p className="text-xl mt-5 mb-10 text-center font-semibold">Modifica tu {''} <span className="text-indigo-600 font-bold">Password aquí</span></p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow-xl rounded-lg p-5">
          { alerta.msg && <Alerta alerta={alerta} /> } 
          <form onSubmit={ handleSubmit }>
            
            <div className="my-3">
              <label className="uppercase text-indigo-600 font-bold text-xl" htmlFor="password_actual">Password Actual</label>
              <input
                type="password"
                name="password_actual"
                className="border bg-gray-50  w-full p-3 my-3 border-gray-300 rounded-lg"
                placeholder="Escribe tu password actual..."
                value={password.password_actual || ''}
                onChange={ e => setPassword({
                  ...password,
                  [e.target.name] : e.target.value
                })}
              />
            </div>
            
            <div className="my-3">
              <label className="uppercase text-indigo-600 font-bold text-xl" htmlFor="password_nuevo">Nuevo Password</label>
              <input
                type="password"
                name="password_nuevo"
                className="border bg-gray-50  w-full p-3 my-3 border-gray-300 rounded-lg"
                placeholder="Escribe tu nuevo password..."
                value={password.password_nuevo || ''}
                onChange={ e => setPassword({
                  ...password,
                  [e.target.name] : e.target.value
                })}
              />
            </div>
            
            <div className="my-3">
              <label className="uppercase text-indigo-600 font-bold text-xl" htmlFor="password_repetir">Repetir Password</label>
              <input
                type="password"
                name="password_repetir"
                className="border bg-gray-50  w-full p-3 my-3 border-gray-300 rounded-lg"
                placeholder="Repite tu nuevo password..."
                value={password.password_repetir || ''}
                onChange={ e => setPassword({
                  ...password,
                  [e.target.name] : e.target.value
                })}
              />
            </div>
            
            <input
              type="submit"
              value="Guardar Cambios"
              className="uppercase cursor-pointer bg-indigo-600 hover:bg-indigo-700 w-full px-10 py-3 font-bold text-white rounded-lg mt-5"
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default CambiarPassword
