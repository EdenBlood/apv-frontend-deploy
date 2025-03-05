//Section - Layout padre
//* Para que las paginas hijas pueden colocar su contenido aqui hay que usar "Outlet".
//* + Este Outler hace que en donde este colocado, las paginas hijas inyecten su codigo ahi.
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
            <div className="md:flex md:items-center md:h-screen">
                <main className="container mx-auto md:grid md:grid-cols-2 md:gap-10 p-5 items-center">
                    <Outlet />

                </main>
            </div>
        </>
    )
};

export default AuthLayout;