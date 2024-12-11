'use server'
import { redirect } from "next/navigation";
import { deleteCookie, setCookie } from "@/lib/cookies";

const usuarios = [
  {nombre: 'medico1', key: 'medico1'},
  {nombre: 'medico2', key: 'medico2'  },
]

export async function login(formData) {
  const LOGIN_URL = '/'

  // Obtener usuario datos del formulario
  const name = formData.get('name') || 'jose'
  const email = formData.get('email') || 'jose@jose.com'
  const key = formData.get('key')
  const callbackUrl = formData.get('callbackUrl') || LOGIN_URL

  // Comprobar si credenciales son válidas
  //const authenticated = true  // suponemos que son válidas
  const encontrado = usuarios.find( usuario => name == usuario.nombre && key == usuario.key )

  if (!encontrado) return

  // Si hay autenticación correcta, creamos cookie de sesión
  await setCookie('session', { name, email })

  redirect(callbackUrl);
}



export async function logout() {
  // Eliminamos cookie de sesión
  deleteCookie('session')

  // redirect("/");   // No recarga si ya estamos en esta página

  // Hack to reload page! https://github.com/vercel/next.js/discussions/49345#discussioncomment-6120148
  redirect('/?' + Math.random())
}


