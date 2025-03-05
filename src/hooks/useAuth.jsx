//Section - Este va a ser un hook personalizado que vamos a crear exclusivamente para la authenticacion.
//Description: con este hook vamos a hacer disponible los valores del provider de AuthContext
import { useContext } from "react";
//* useContext nos permite extraer datos
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    //* hacemos disponible los valores del provider de AuthContext
    return useContext(AuthContext);
}

export default useAuth;