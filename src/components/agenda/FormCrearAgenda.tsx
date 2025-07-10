"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { supabase } from "@/api/supabaseClient";
import { Input } from "../input";
import { useRouter } from "next/navigation";

export default function FormCrearAgenda({
  manicuristaId,
  userId,
}: {
  manicuristaId: string;
  userId: string;
}) {
  const router = useRouter();
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const crearAgenda = async () => {
    setLoading(true);
    setMensaje("");

    const { error } = await supabase.from("Agenda").insert({
      perfil_id: manicuristaId,
      fecha,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
      usuario_id: userId,
    });

    if (error) {
      setMensaje(" Error al guardar la agenda");
    } else {
      setMensaje(" Agenda creada correctamente");
      setFecha("");
      setHoraInicio("");
      setHoraFin("");
      router.push("/agenda");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-4 p-6 bg-pink-50 rounded-xl shadow-sm max-w-md mx-auto">
      <h2 className="text-xl font-bold text-pink-800">
        Agregar bloque disponible
      </h2>
      <Input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      <Input
        type="time"
        value={horaInicio}
        onChange={(e) => setHoraInicio(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      <Input
        type="time"
        value={horaFin}
        onChange={(e) => setHoraFin(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      <Button onClick={crearAgenda} disabled={loading}>
        {loading ? "Guardando..." : "Guardar disponibilidad"}
      </Button>
      {mensaje && <p className="text-center pt-2">{mensaje}</p>}
    </div>
  );
}
