import connection from "@/lib/mysql";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function eliminarMedico(formData) {
    'use server'
    const id = formData.get('id')

    await fetch('http://localhost:4000/medicos/' + id, { method: 'DELETE' })
    revalidatePath('/medicos-api')
}

async function insertarMedico(formData) {
    'use server'
    const [nombre, especialidad, perfil] = formData.values()
    const response = await fetch('http://localhost:4000/medicos', {
        method: 'POST',
        body: JSON.stringify({ nombre, especialidad, perfil, createdAt: new Date().toISOString() })
    })
    const data = await response.json()
    revalidatePath('/medicos-api')

}



async function PaginaMedicos() {

    const response = await fetch('http://localhost:4000/medicos')
    const [rows] = await response.json()

    console.log(rows)

    return (
        <>
            <form action={insertarMedico}>
                <p>nombre</p>
                <input type="text" name="nombre" />
                <p>especialidad</p>
                <input type="text" name="especialidad" />
                <p>perfil</p>
                <input type="text" name="perfil" />
                <button>INSERTAR</button>
            </form>

            <div>
                LISTA DE Medicos
                {
                    rows.map(medico =>
                        <div key={medico.id}>
                            <Link href={`/medicos-api/${medico.id}`}> {medico.nombre} </Link>

                            <Link href={`/medicos-api/${medico.id}/modificar`}> MODIFICAR </Link>

                            <form action={eliminarMedico}>
                                <input type="hiden" name="id" defaultValue={medico.id} />
                                <button>ELIMINAR</button>
                            </form>
                        </div>)
                }
            </div>
        </>
    );
}

export default PaginaMedicos;