//Description: Instalamos "npm i react-router-dom" y importamos lo siguiente.
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import RutasProtegidas from './layout/RutasProtegidas';

import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import Login from "./paginas/Login";
import OlvidePassword from "./paginas/OlvidePassword";
import Registrar from "./paginas/Registrar";
import NuevoPassword from "./paginas/NuevoPassword";
import AdministrarPacientes from './paginas/AdministrarPacientes';
import EditarPerfil from "./paginas/EditarPerfil";
import CambiarPassword from "./paginas/CambiarPassword";

import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";

function App() {

  return (
    
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}> //* AuthLayout es el elemento padre.
              <Route index element={<Login />} /> //* Elementos hijos. //* Que tenga el "index" quiere decir que es la pagina principal de ese path
              <Route path="registrar" element={<Registrar/>} /> //* ruta = "/registrar"
              <Route path="olvide-password" element={<OlvidePassword/>} />
              <Route path="olvide-password/:token" element={<NuevoPassword/>} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta/>} /> //* Tenemos una ruta dinamica con ":id"
              <Route path="olvide-password" element={<OlvidePassword/>} />
            </Route>
            <Route path="/admin" element={<RutasProtegidas/>}>
              <Route index element={<AdministrarPacientes/>} />
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="cambiar-password" element={<CambiarPassword />} />
            </Route>      
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
