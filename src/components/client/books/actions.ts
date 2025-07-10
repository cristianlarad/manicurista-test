"use server";
import { supabaseServerActionClient } from "@/api/supabaseServerActions";
import { redirect } from "next/navigation";

interface Props {
  servicio_id: string;
  agenda_id: string;
  userId: string;
}

export async function crearReserva({ servicio_id, agenda_id, userId }: Props) {
  const clienta_id = userId;

  await supabaseServerActionClient.from("Reserva").insert({
    servicio_id,
    agenda_id,
    clienta_id,
    estado: "pendiente",
    fecha_reserva: new Date().toISOString(),
  });

  redirect("/books/my-books");
}
