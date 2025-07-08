import { getUsuarioById } from "@/utils/getUser";
import {
  MapPin,
  Home,
  ListChecks,
  Clock,
  Building2,
  User,
  Mail,
  BadgeCheck,
  Phone,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { IManicure, IService } from "@/types/users";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perfil | Mi Manicurista",
  description: "Editar Perfil",
};

const supabase = createServerActionClient({ cookies });
export default async function ProfileCard() {
  const cookieStore = await cookies();
  const user = await getUsuarioById(cookieStore);
  const isManicura = user.tipo_usuario === "manicura";
  let perfilManicura: IManicure | null = null;
  let servicio: IService | null = null;

  if (isManicura) {
    const { data: manicura } = await supabase
      .from("PerfilManicurista")
      .select("*")
      .eq("usuario_id", user.id)
      .single();

    perfilManicura = manicura as IManicure;

    if (perfilManicura?.servicio_id) {
      const { data: service } = await supabase
        .from("Servicio")
        .select("*")
        .eq("id", perfilManicura.servicio_id)
        .single();

      servicio = service as IService;
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-tr from-amber-100 to-pink-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-4">
        {/* Header */}
        <div className="flex justify-center">
          <Avatar className="w-24 h-24 border-4 border-pink-300 shadow-md">
            <AvatarImage src={user.perfil_url} alt="Foto de perfil" />
            <AvatarFallback>
              {user.nombre?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Datos básicos */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <User size={20} />
            {user.nombre}
          </h2>
          <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
            <Mail size={16} />
            {user.correo}
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 bg-pink-200 text-pink-800 rounded-full">
            <BadgeCheck size={14} />
            {user.tipo_usuario.toUpperCase()}
          </span>
        </div>

        {/* Info común */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner space-y-2 text-sm text-gray-700">
          <p className="flex items-center gap-2">
            <Phone size={16} />
            <strong>Teléfono:</strong> {user.telefono}
          </p>
          <p className="flex items-center gap-2">
            <ListChecks size={16} />
            <strong>RUT:</strong> {user.rut}
          </p>
        </div>

        {/* Info de manicurista */}
        {isManicura && perfilManicura && (
          <div className="bg-pink-50 p-4 rounded-lg shadow-inner space-y-2 text-sm text-pink-700">
            <p className="flex items-center gap-2">
              <MapPin size={16} />
              <strong>Ubicación:</strong> {perfilManicura.ubicacion}
            </p>
            <p className="flex items-center gap-2">
              <Home size={16} />
              <strong>Modalidad:</strong> {perfilManicura.modalidad_atencion}
            </p>
            <p className="flex items-center gap-2">
              <Clock size={16} />
              <strong>Disponibilidad:</strong> {perfilManicura.disponibilidad}
            </p>
            <p className="flex items-center gap-2">
              <Building2 size={16} />
              <strong>Comuna ID:</strong> {perfilManicura.comuna_id}
            </p>
            <div className="bg-white border border-pink-200 p-3 rounded-lg shadow-sm space-y-1">
              <p className="flex items-center gap-2 text-pink-800 font-semibold">
                {servicio?.nombre}
              </p>
              <p className="text-sm text-gray-600">{servicio?.descripcion}</p>
              <p className="text-xs text-gray-500">
                Precio base:
                <span className="font-medium text-gray-700">
                  ${servicio?.precio_base}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
