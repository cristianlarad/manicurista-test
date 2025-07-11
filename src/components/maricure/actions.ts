"use server";

import { supabaseServerActionClient } from "@/api/supabaseServerActions";

export async function UpadateStatusReserva(
  prevState: { success: boolean | null; message: string },
  formData: FormData
) {
  const reservaId = formData.get("reserva_id") as string;
  const nuevoEstado = formData.get("estado") as string;

  const { error } = await supabaseServerActionClient
    .from("Reserva")
    .update({ estado: nuevoEstado })
    .eq("id", reservaId);

  if (error) {
    return { success: false, message: "Error al actualizar" };
  }

  return { success: true, message: "Actualizado correctamente" };
}

export async function updateManicurista(
  prevState: { success: boolean | null; message: string },
  formData: FormData
) {
  const usuario_id = formData.get("usuario_id") as string;
  const modalidad = formData.get("modalidad_atencion") as string;
  const disponibilidad = formData.get("disponibilidad") as string;
  const nombre = formData.get("nombre") as string;
  const correo = formData.get("correo") as string;
  const telefono = formData.get("telefono") as string;
  const rut = formData.get("rut") as string;
  const ubicacion = formData.get("ubicacion") as string;
  const latitud = formData.get("latitud") as string;
  const longitud = formData.get("longitud") as string;

  const { error: perfilError } = await supabaseServerActionClient
    .from("PerfilManicurista")
    .update({
      modalidad_atencion: modalidad,
      disponibilidad,
      ubicacion,
      latitud,
      longitud,
    })
    .eq("usuario_id", usuario_id);

  if (perfilError) {
    return {
      success: false,
      message: "Error al actualizar el perfil de manicura.",
    };
  }

  const { error: userError } = await supabaseServerActionClient
    .from("Usuario")
    .update({ nombre, telefono, rut, correo })
    .eq("id", usuario_id);

  if (userError) {
    return {
      success: false,
      message: "Error al actualizar datos del usuario.",
    };
  }

  return {
    success: true,
    message: "Perfil actualizado con éxito 🎉",
  };
}
