import connection from "@/lib/mysql";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function eliminarPaciente(formData) {
    'use server'
    const id = formData.get('id')

    await connection.query('delete from pacientes where id=?', [id])
    revalidatePath('/pacientes')
}

async function insertarPaciente(formData) {
    'use server'
    const nombre = formData.get('nombre')
    const localidad = formData.get('localidad')
    const fecha_nacimiento = formData.get('fecha_nacimiento')
    
    await connection.query('insert into pacientes(nombre, localidad, fecha_nacimiento) values (?, ?, ?)', 
        [nombre, localidad, fecha_nacimiento])
    revalidatePath('/pacientes')

}



async function PaginaPacientes() {

    const [rows] = await connection.query('select * from pacientes')
    console.log(rows)

    return (
        <>
            <form action={insertarPaciente}>
                <input type="text" name="nombre" />
                <input type="text" name="localidad" />
                <input type="text" name="fecha_nacimiento" />
                <button>INSERTAR</button>
            </form>

            <div>
                LISTA DE pacientes
                {
                    rows.map(paciente =>
                        <div key={paciente.id}>
                            <Link href={`/pacientes/${paciente.id}`}> {paciente.nombre} </Link>

                            <Link href={`/pacientes/${paciente.id}/modificar`}> MODIFICAR </Link>

                            <form action={eliminarPaciente}>
                                <input type="hiden" name="id" defaultValue={paciente.id} />
                                <button>ELIMINAR</button>
                            </form>
                        </div>)
                }
            </div>
        </>
    );
}

export default PaginaPacientes;