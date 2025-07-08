"use server"

import {  supabase, supabaseServer } from "@/api/supabaseClient";
import { createServerActionClient} from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
export async function handleClientRegister(
  prevState: { success: boolean; error: string },
  formData: FormData
) {
    
    
  const nombre = formData.get('nombre') as string;
  const rut = formData.get('rut') as string;
  const telefono = formData.get('telefono') as string;
  const correo = formData.get('correo') as string;
  const contrasena = formData.get('contrasena') as string;


  if (!correo || !correo.includes('@') || !contrasena) {
    return { success: false, error: 'Correo o contraseña inválidos' };
  }

const { data, error } = await supabase.auth.signUp({
  email: correo,
  password: contrasena
});

  if (error || !data.user) {
    return { success: false, error: error?.message || 'Registro fallido' };
  }

  const {data : datas , error : err} = await supabaseServer.from('Usuario').insert({
    id: data.user.id,
    nombre,
    rut,
    correo,
    telefono,
    tipo_usuario: 'clienta',
    contraseña: contrasena,
  });

  console.log(datas , err);
  
  return { success: true, error: '' };
}

export async function logout() {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies });

  const { error } = await supabase.auth.signOut();

  (await cookieStore).delete('user_id');

  return { success: !error, error: error?.message || '' };
}
