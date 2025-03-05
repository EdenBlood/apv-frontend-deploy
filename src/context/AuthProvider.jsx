//* Provider es un termino al cual se le dice que es de donde nacen los estados de una aplicacion, es como la fuente de los datos del state global.
import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/axios';

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [ auth, setAuth ] = useState({});
    const [ cargando, setCargando ] = useState(true);

    //* Esto al ser el padre de todos los routes, por ende se ejecuta siempre una vez en todas las paginas  .
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');

            if(!token) {
                setCargando(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/veterinarios/perfil', config)

                setAuth( data );
            } catch (error) {
                console.log( error.response.data.msg );
                setAuth( {} );
            }
            setCargando(false);
        }
        autenticarUsuario();
    }, [])

    const cerrarSession = () => {
        localStorage.removeItem('token');
        setAuth({});
    }

    //* Actualizar el perfil.
    const actualizarPerfil = async datos => {
        const token = localStorage.getItem('token');

        if( !token ) {
            setCargando(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`

            await clienteAxios.put(url, datos, config);
            
            return { msg: "Datos Actualizado Correctamente"}
        } catch (error) {
            return { msg: error.response.data.msg, error: true }
        }
    }

    //* Actualizar el password
    const guardarPassword = async datos => {
        const token = localStorage.getItem('token');
        if( !token ) {
            setCargando(false)
            return;
        }
        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/actualizar-password`;

            const { data } = await clienteAxios.put(url, datos, config);

            return { msg: data.msg }
        } catch (error) {
            return { msg: error.response.data.msg, error: true };
        }
    }

    //* Lo de children es que dentro de el "AuthContext.Provider" estan todos los hijos, todas nuestras rutas.
    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSession,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
};

export default AuthContext;