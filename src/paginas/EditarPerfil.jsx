import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta";


const EditarPerfil = () => {

  const { auth, actualizarPerfil } = useAuth();
  const [ perfil, setPerfil ] = useState({});
  const [ alerta, setAlerta ] = useState({})
    
  useEffect( () => {
    setPerfil(auth);
  }, [auth])

  //* Submit
  const handleSubmit = async e => {
    e.preventDefault();

    const { nombre, email } = perfil

    if( [ nombre, email ].some( value => String(value).trim() === '' ) ) {
      setAlerta({ msg: "Email y Nombre son Obligatorios", error:true });
      setTimeout( () => {
        setAlerta({});
      }, 4000)
      return;
    }

    const respuesta = await actualizarPerfil( perfil );

    setAlerta(respuesta);

    setTimeout(() => {
      setAlerta({})
    }, 4000)
  }

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-6">Editar Perfil</h2>
      <p className="text-xl mt-2 mb-5 text-center font-semibold">Modifica tu {''} <span className="text-indigo-600 font-bold">Informacion aquí</span></p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow-xl rounded-lg p-5">
          { alerta.msg && <Alerta alerta={alerta} /> } 
          <form onSubmit={ handleSubmit }>
            
            <div className="my-3">
              <label className="uppercase text-indigo-600 font-bold text-xl" htmlFor="nombre">Nombre</label>
              <input
                type="text"
                name="nombre"
                className="border bg-gray-50  w-full p-3 my-3 border-gray-300 rounded-lg"
                placeholder="Tu Nombre..."
                value={perfil.nombre || ''}
                onChange={ e => setPerfil({
                  ...perfil, 
                  [e.target.name] : e.target.value
                })}
                />
            </div>
            

            <div className="my-3">
              <label className="uppercase text-indigo-600 font-bold text-xl" htmlFor="web">Sitio Web</label>
              <input
                type="text"
                name="web"
                className="border bg-gray-50  w-full p-3 my-3 border-gray-300 rounded-lg"
                placeholder="Tu Sitio Web..."
                value={perfil.web || ''}
                onChange={ e => setPerfil({
                  ...perfil,
                  [e.target.name] : e.target.value
                })}
                />
            </div>
            

            <div className="my-3">
              <label className="uppercase text-indigo-600 font-bold text-xl" htmlFor="telefono">Telefono</label>
              <input
                type="tel"
                name="telefono"
                className="border bg-gray-50  w-full p-3 my-3 border-gray-300 rounded-lg"
                placeholder="Tu Telefono..."
                value={perfil.telefono || ''}
                onChange={ e => setPerfil({
                  ...perfil,
                  [e.target.name] : e.target.value
                })}
                />
            </div>
            

            <div className="my-3">
              <label className="uppercase text-indigo-600 font-bold text-xl" htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="border bg-gray-50  w-full p-3 my-3 border-gray-300 rounded-lg"
                placeholder="Tu Email..."
                value={perfil.email || ''}
                onChange={ e => setPerfil({
                  ...perfil,
                  [e.target.name] : e.target.value 
                }) }
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

export default EditarPerfil
