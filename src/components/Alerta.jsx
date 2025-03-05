const Alerta = ({alerta}) => {
    return (
        <div className={`${alerta.error ? 'from-red-500 to-red-600' : 'from-indigo-500 to-indigo-600'} bg-gradient-to-b text-center p-4 rounded-xl uppercase text-white font-bold text-sm mb-10`}>
            {alerta.msg}        
        </div>
    )
}

export default Alerta
