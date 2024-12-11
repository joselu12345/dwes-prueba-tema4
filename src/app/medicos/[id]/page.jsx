import connection from "@/lib/mysql";

async function PaginaAlumno({params}) {
    const { id } = await params
    const [rows] = await connection.query('select * from alumnos where id=?', [id])
    
    const alumno = rows[0]

    return ( 
        <div>
            <p>{alumno.nombre}</p>
            <p>{alumno.localidad}</p>
            <p>{alumno.fecha_nacimiento.toLocaleDateString()}</p>
        </div>
     );
}

export default PaginaAlumno;