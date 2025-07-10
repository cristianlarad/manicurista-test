import { supabaseServerActionClient } from "@/api/supabaseServerActions";
import ReservaWizard from "@/components/client/books/booksWizard";
import { AgendaItem, ServicioItem } from "@/types/books";
import { cookies } from "next/headers";

export default async function ReservaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  const { data: servicios } = await supabaseServerActionClient
    .from("Servicio")
    .select("id, nombre");

  const { data: reservas } = await supabaseServerActionClient
    .from("Reserva")
    .select("agenda_id");

  const agendaOcupada = (reservas ?? [])
    .map((r) => r.agenda_id)
    .filter((id): id is string => typeof id === "string" && id.length > 0);

  const { data: todasLasAgendas } = await supabaseServerActionClient
    .from("Agenda")
    .select("*")
    .eq("perfil_id", id);

  const agendaDisponible = todasLasAgendas?.filter(
    (agenda) => !agendaOcupada.includes(agenda.id)
  );

  if (!agendaDisponible || agendaDisponible.length === 0 || !servicios) {
    return (
      <div className="text-center py-12">
        No hay disponibilidad en este momento
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-pink-700 mb-4">Reservar turno</h1>
      <ReservaWizard
        userId={userId ?? ""}
        manicuristaId={id}
        agenda={agendaDisponible as AgendaItem[]}
        servicios={servicios as ServicioItem[]}
      />
    </div>
  );
}
