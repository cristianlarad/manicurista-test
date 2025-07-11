import { getUsuarioById } from "@/utils/getUser";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { CardResumen } from "@/components/maricure/cardResumen";
import { BadgeCheck, CalendarDays, Clock, ListChecks } from "lucide-react";
export const metadata: Metadata = {
  title: "Inicio | Mi Manicurista",
  description: "Inicio",
};

export default async function Page() {
  const cookieStore = await cookies();
  const usuario = await getUsuarioById(cookieStore);
  if (usuario.tipo_usuario === "clienta") {
    redirect("/manicuristas");
  }
  if (!usuario) {
    return <div>No se encontró el usuario</div>;
  }

  return (
    <section className="py-8 px-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-pink-700 mb-6">
        Hola, {usuario.nombre} ¿Lista para trabajar hoy?
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardResumen title="Reservas de hoy" value="3" icon={CalendarDays} />
        <CardResumen title="Turnos pendientes" value="2" icon={Clock} />
        <CardResumen title="Mis servicios" value="5" icon={BadgeCheck} />
        <CardResumen title="Agendas disponibles" value="12" icon={ListChecks} />
      </div>
      {/* 
      <div className="mt-8 space-y-4">
        <QuickLink href="/dashboard/reservas" label="📖 Ver reservas" />
        <QuickLink href="/dashboard/agendas" label="🗓️ Editar agenda" />
        <QuickLink href="/dashboard/perfil" label="🧑‍🎨 Modificar perfil" />
        <QuickLink
          href="/dashboard/servicios"
          label="💅 Administrar servicios"
        />
      </div> */}
    </section>
  );
}
