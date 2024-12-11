import connection from "@/lib/mysql";

async function PaginaMedico({params}) {
    const { id } = await params
    const [rows] = await connection.query('select * from medicos where id=?', [id])
    
    const medico = rows[0]

    return ( 
        <div>
            <p>{medico.nombre}</p>
            <p>{medico.especialidad}</p>
            <p>{medico.perfil}</p>
        </div>
     );
}

export default PaginaMedico;