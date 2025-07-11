"use server";

import { supabaseServerActionClient } from "@/api/supabaseServerActions";

export async function updateClientaProfile(
  prevState: { success: boolean | null; message: string },
  formData: FormData
) {
  const id = formData.get("id") as string;
  const nombre = formData.get("nombre") as string;
  const correo = formData.get("correo") as string;
  const telefono = formData.get("telefono") as string;
  const rut = formData.get("rut") as string;

  const { error } = await supabaseServerActionClient
    .from("Usuario")
    .update({ nombre, correo, telefono, rut })
    .eq("id", id);

  if (error) {
    return { success: false, message: "Error al guardar los cambios." };
  }

  return { success: true, message: "Perfil actualizado correctamente." };
}

export async function createCalificacion(
  prevState: { success: boolean | null; message: string },
  formData: FormData
) {
  const reserva_id = formData.get("reserva_id") as string;
  const puntaje = Number(formData.get("puntaje"));
  const comentario = formData.get("comentario") as string;
  const usuario_id = formData.get("usuario_id") as string;
  const manicurista_id = formData.get("manicurista_id") as string;

  const { error } = await supabaseServerActionClient
    .from("Calificacion")
    .insert([
      {
        reserva_id,
        puntaje,
        comentario,
        usuario_id,
        manicurista_id,
      },
    ]);
  console.log(error);

  if (error) {
    return { success: false, message: "Error al enviar la reseña." };
  }

  return { success: true, message: "¡Reseña enviada con éxito! 🎉" };
}
