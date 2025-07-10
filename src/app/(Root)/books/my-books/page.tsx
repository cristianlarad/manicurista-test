import { supabaseServerActionClient } from "@/api/supabaseServerActions";
import { IBooks } from "@/types/books";
import {
  BadgeCheck,
  CalendarDays,
  Clock,
  MapPin,
  Phone,
  ScanEye,
  User,
} from "lucide-react";

export default async function MyBooks() {
  const {
    data: { user },
  } = await supabaseServerActionClient.auth.getUser();

  const { data: book, error } = await supabaseServerActionClient
    .from("Reserva")
    .select(
      `
    id,
    estado,
    fecha_reserva,
    agenda:agenda_id (
      fecha,
      hora_inicio,
      hora_fin,
      perfil:perfil_id (
        id,
        ubicacion,
        modalidad_atencion,
        perfil:usuario_id (
          nombre,
          telefono
        )
      )
    )
  `
    )
    .eq("clienta_id", user?.id);

  const books = book as unknown as IBooks[];
  console.log(books);
  console.log(error);

  return (
    <section className="py-6">
      <h2 className="text-2xl font-bold text-pink-700 mb-6 flex items-center gap-2">
        <ScanEye className="w-5 h-5" />
        Mis reservas
      </h2>

      <div className="space-y-6">
        {books.map((reserva) => (
          <div
            key={reserva.id}
            className="bg-white rounded-xl border border-gray-200 shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-pink-600 flex items-center gap-2">
                <User className="w-4 h-4" />
                {reserva.agenda.perfil.perfil.nombre}
              </h3>
              <span
                className={`px-2 py-1 text-xs rounded font-medium ${
                  reserva.estado === "confirmado"
                    ? "bg-green-100 text-green-700"
                    : reserva.estado === "pendiente"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {reserva.estado}
              </span>
            </div>

            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-pink-500" />
                <span>{reserva.agenda.fecha}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-pink-500" />
                <span>
                  {reserva.agenda.hora_inicio} – {reserva.agenda.hora_fin}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-pink-500" />
                <span>{reserva.agenda.perfil.modalidad_atencion}</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink-500" />
                <span>{reserva.agenda.perfil.ubicacion}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-pink-500" />
                <span>{reserva.agenda.perfil.perfil.telefono}</span>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
