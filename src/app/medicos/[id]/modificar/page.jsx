import connection from "@/lib/mysql";
import { redirect } from "next/navigation";

async function modificarAlumno(formData) {
    'use server'
    const id = formData.get('id')
    const nombre = formData.get('nombre')
    const localidad = formData.get('localidad')
    const fecha_nacimiento = formData.get('fecha_nacimiento')

    await connection.query('update alumnos set nombre=?, localidad=?, fecha_nacimiento=? where id=?',
        [nombre, localidad, fecha_nacimiento, id])

    redirect(`/alumnos/${id}`)
}

async function PaginaModificar({params}) {
    const {id} = await params

    const [ rows ] = await connection.query('select * from alumnos where id=?', [id])
    const alumno = rows[0]
    console.log(alumno)

    return ( 
        <form action={modificarAlumno}>
            <input type="hidden" name='id' defaultValue={alumno.id}/>
            <input type="text" name="nombre" defaultValue={alumno.nombre}/>
            <input type="text" name="localidad" defaultValue={alumno.localidad}/>
            <input type="text" name="fecha_nacimiento" defaultValue={alumno.fecha_nacimiento.toISOString().split('T')[0]}/>
            <button>MODIFICAR</button>
        </form>
     );
}

export default PaginaModificar;