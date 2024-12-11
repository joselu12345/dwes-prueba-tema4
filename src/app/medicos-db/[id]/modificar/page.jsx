import connection from "@/lib/mysql";
import { redirect } from "next/navigation";

async function modificarMedico(formData) {
    'use server'
    const id = formData.get('id')
    const nombre = formData.get('nombre')
    const especialidad = formData.get('especialidad')
    const perfil = formData.get('perfil')

    await connection.query('update medicos set nombre=?, especialidad=?, perfil=? where id=?',
        [nombre, especialidad, perfil, id])

    redirect(`/medicos/${id}`)
}

async function PaginaModificar({params}) {
    const {id} = await params

    const [ rows ] = await connection.query('select * from medicos where id=?', [id])
    const medico = rows[0]
    console.log(medico)

    return ( 
        <form action={modificarMedico}>
            <input type="hidden" name='id' defaultValue={medico.id}/>
            <input type="text" name="nombre" defaultValue={medico.nombre}/>
            <input type="text" name="especialidad" defaultValue={medico.especialidad}/>
            <input type="text" name="perfil" defaultValue={medico.perfil}/>
            <button>MODIFICAR</button>
        </form>
     );
}

export default PaginaModificar;