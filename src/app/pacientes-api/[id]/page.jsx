import connection from "@/lib/mysql";

async function PaginaPaciente({params}) {
    const { id } = await params
    const [rows] = await connection.query('select * from pacientes where id=?', [id])
    
    const alumno = rows[0]

    return ( 
        <div>
            <p>{alumno.nombre}</p>
            <p>{alumno.localidad}</p>
            <p>{alumno.fecha_nacimiento.toLocaleDateString()}</p>
        </div>
     );
}

export default PaginaPaciente;