import { getUsuarioById } from "@/utils/getUser";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export const metadata: Metadata = {
  title: "Inicio | Mi Manicurista",
  description: "Editar Perfil",
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
    <div>
      <h1>Bienvenido {usuario.nombre}</h1>
      <p>Tu rol: {usuario.tipo_usuario}</p>
    </div>
  );
}
