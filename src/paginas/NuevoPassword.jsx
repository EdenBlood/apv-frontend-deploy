import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const NuevoPassword = () => {
    const [ password, setPassword ] = useState('');
    const [ repetirPassword, setRepetirPassword ] = useState('');
    const [ alerta, setAlerta ] = useState({});
    const [ tokenValido, setTokenValido ] = useState(false);

    const params = useParams();
    const { token } = params;
    const navigate = useNavigate()

    function vaciarInputs() {
        setPassword('');
        setRepetirPassword('');
        setTokenValido(false);
    }

    useEffect(() => {
        const validarToken = async () => {
            try {
                const url = `/veterinarios/olvide-password/${token}`;
                const { data } = await clienteAxios(url);

                setTokenValido(true);
                setAlerta({ msg: data.msg })

                setTimeout(() => {
                    setAlerta({})
                }, 5000)
            } catch (error) {
                setAlerta({ msg: error.response.data.msg, error: true })
                setTimeout(() => {
                    navigate('/')
                }, 5000)
            }
        }
        validarToken();
    }, [token]);

    const handleSubmit = async e => {
        e.preventDefault();

        if ([password, repetirPassword].some( value => String(value).trim() === '' )) {
            setAlerta({ msg: "Llena los campos", error: true });
            return;
        };
        if ( password !== repetirPassword ) {
            setAlerta({ msg: "Los Passwords no son iguales", error: true });
            return;
        }
        if( password.length < 6 ) {
            setAlerta({ msg: "El password debe de contener minimo 6 caracteres", error: true });
            return;
        };

        try {
            const url = `/veterinarios/olvide-password/${token}`
            const { data } = await clienteAxios.post( url, { password });

            vaciarInputs();
            setAlerta({ msg: data.msg });
            setTimeout(() => {
                navigate('/');
            },4000);
        } catch (error) {
            setAlerta({ msg: "Hubo un error con el enlace", error: true });
        };
    }

    return (
        <>
            <div className="">
                <h1 className="text-indigo-600 font-black text-6xl">
                Reestablece tu Password y no Pierdas tu Acceso a tus {""}<span className="text-black"> Pacientes</span>
                </h1>
            </div>


            <div className="mt-20 md:mt-5 shadow px-5 py-10 rounded-xl bg-white">
                { alerta.msg && <Alerta alerta={alerta} />}

                { tokenValido && (
                    <form
                        onSubmit={ handleSubmit }
                    >
                        <div className="my-5">
                            <label htmlFor="" className="uppercase block font-bold text-xl text-gray-600" >Nuevo Password</label>
                            <input 
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl border-gray-300"
                                type="password" 
                                placeholder="Nuevo Password"
                                value={password}
                                onChange={ e => setPassword(e.target.value) }
                                />
                        </div>

                        <div className="my-5">
                            <label htmlFor="" className="uppercase block font-bold text-xl text-gray-600" >Repetir Password</label>
                            <input 
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl border-gray-300"
                                type="password" 
                                placeholder="Repite Tu Password"
                                value={repetirPassword}
                                onChange={ e => setRepetirPassword(e.target.value) }
                            />
                        </div>

                        <input 
                            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white font-bold uppercase mt-10 hover:bg-indigo-800 hover:cursor-pointer md:w-auto block mx-auto"
                            type="submit" 
                            value="Cambiar Password"
                        />
                    </form>
                ) }

                <nav className="mt-10 lg:flex lg:justify-between"> 
                    <Link className="block text-center my-5 text-gray-400 hover:text-gray-700 font-bold" to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>  
                    <Link className="block text-center my-5 text-gray-400 hover:text-gray-700 font-bold" to="/registrar">¿No tienes una cuenta? Regístrate</Link>  
                </nav>
            </div>
        </>
    )
}

export default NuevoPassword
