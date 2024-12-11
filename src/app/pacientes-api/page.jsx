import connection from "@/lib/mysql";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function eliminarPaciente(formData) {
    'use server'
    const id = formData.get('id')

    await fetch('http://localhost:4000/pacientes/' + id, { method: 'DELETE' })
    revalidatePath('/pacientes-api')
}

async function insertarPaciente(formData) {
    'use server'
    const [nombre, localidad, fecha_nacimiento] = formData.values()
    const response = await fetch('http://localhost:4000/pacientes', {
        method: 'POST',
        body: JSON.stringify({ nombre, localidad, fecha_nacimiento, createdAt: new Date().toISOString() })
    })
    const data = await response.json()
    revalidatePath('/pacientes-api')

}



async function PaginaPacientes() {

    const response = await fetch('http://localhost:4000/pacientes')
    const [rows] = await response.json()

    return (
        <>
            <form action={insertarPaciente}>
                <p>nombre</p>
                <input type="text" name="nombre" />
                <p>localidad</p>
                <input type="text" name="localidad" />
                <p>fecha nacimiento</p>
                <input type="text" name="fecha_nacimiento" />
                <button>INSERTAR</button>
            </form>

            <div>
                LISTA DE pacientes
                {
                    rows.map(paciente =>
                        <div key={paciente.id}>
                            <Link href={`/pacientes-api/${paciente.id}`}> {paciente.nombre} </Link>

                            <Link href={`/pacientes-api/${paciente.id}/modificar`}> MODIFICAR </Link>

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