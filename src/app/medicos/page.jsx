import connection from "@/lib/mysql";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function eliminarMedico(formData) {
    'use server'
    const id = formData.get('id')

    await connection.query('delete from medicos where id=?', [id])
    revalidatePath('/medicos')
}

async function insertarMedico(formData) {
    'use server'
    const nombre = formData.get('nombre')
    const especialidad = formData.get('especialidad')
    const perfil = formData.get('perfil')
    
    await connection.query('insert into medicos(nombre, especialidad, perfil) values (?, ?, ?)', 
        [nombre, especialidad, perfil])
    revalidatePath('/medicos')

}



async function PaginaMedicos() {

    const [rows] = await connection.query('select * from medicos')
    console.log(rows)

    return (
        <>
            <form action={insertarMedico}>
                <input type="text" name="nombre" />
                <input type="text" name="especialidad" />
                <input type="text" name="perfil" />
                <button>INSERTAR</button>
            </form>

            <div>
                LISTA DE Medicos
                {
                    rows.map(medico =>
                        <div key={medico.id}>
                            <Link href={`/medicos/${medico.id}`}> {medico.nombre} </Link>

                            <Link href={`/medicos/${medico.id}/modificar`}> MODIFICAR </Link>

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