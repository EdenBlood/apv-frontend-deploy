//* Para usar link vamos a utilizar "Link" de "react-router-dom"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios'

const Login = () => {
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ alerta, setAlerta ] = useState({});

    const { setAuth } = useAuth();
    
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault();
        if ([password, email].some(value => String(value).trim() === '')) {
            setAlerta({ msg: "Todos los campos son obligatorios", error: true});
            return;
        };
        try {
            const { data } = await clienteAxios.post('/veterinarios/login', { email, password });
            
            localStorage.setItem('token', data.token);
            setAuth(data);

            navigate('/admin')
        } catch (error) {
            setAlerta({ msg: error.response.data.msg, error:true });
        }
        setTimeout(() => {
            setAlerta({});
        },4000)
    }    

    return (
        <>
            <div className="">
                <h1 className="text-indigo-600 font-black text-6xl">
                    Inicia Sesión y Administra tus {""}<span className="text-black">Pacientes</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow px-5 py-10 rounded-xl bg-white">

                { alerta.msg && <Alerta alerta={alerta} />}
                
                <form onSubmit={handleSubmit}>
                    
                    <div className="my-5">
                        <label htmlFor="" className="uppercase block font-bold text-xl text-gray-600">Email</label>
                        <input 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl border-gray-300"
                            type="email" 
                            placeholder="Email de registro"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label htmlFor="" className="uppercase block font-bold text-xl text-gray-600">Password</label>
                        <input 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl border-gray-300"
                            type="password" 
                            placeholder="Tu Password"
                            value={password}
                            onChange={e => setPassword( e.target.value )}
                        />
                    </div>

                    <input 
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white font-bold uppercase mt-10 hover:bg-indigo-800 hover:cursor-pointer md:w-auto block mx-auto "
                        type="submit" 
                        value="Iniciar Sesión"
                    />

                </form>
                
                <nav className="mt-10 lg:flex lg:justify-between"> 
                    <Link className="block text-center my-5 text-gray-400 hover:text-gray-700 font-bold" to="/registrar">¿No tienes una cuenta? Regístrate</Link>  
                    <Link className="block text-center my-5 text-gray-400 hover:text-gray-700 font-bold" to="/olvide-password">Olvide mi password</Link>
                </nav>
            </div>
        </>
    )
}
export default Login
