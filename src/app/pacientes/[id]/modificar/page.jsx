import connection from "@/lib/mysql";
import { redirect } from "next/navigation";

async function modificarPaciente(formData) {
    'use server'
    const id = formData.get('id')
    const nombre = formData.get('nombre')
    const localidad = formData.get('localidad')
    const fecha_nacimiento = formData.get('fecha_nacimiento')

    await connection.query('update pacientes set nombre=?, localidad=?, fecha_nacimiento=? where id=?',
        [nombre, localidad, fecha_nacimiento, id])

    redirect(`/pacientes/${id}`)
}

async function PaginaModificar({params}) {
    const {id} = await params

    const [ rows ] = await connection.query('select * from pacientes where id=?', [id])
    const paciente = rows[0]
    console.log(paciente)

    return ( 
        <form action={modificarPaciente}>
            <input type="hidden" name='id' defaultValue={paciente.id}/>
            <input type="text" name="nombre" defaultValue={paciente.nombre}/>
            <input type="text" name="localidad" defaultValue={paciente.localidad}/>
            <input type="text" name="fecha_nacimiento" defaultValue={paciente.fecha_nacimiento.toISOString().split('T')[0]}/>
            <button>MODIFICAR</button>
        </form>
     );
}

export default PaginaModificar;