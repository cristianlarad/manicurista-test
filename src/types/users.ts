export interface IUser {
  id: string;
  nombre: string;
  correo: string;
  perfil_url: string;
  tipo_usuario: string;
  rut: string;
  telefono: string;
}

export interface IManicure {
  ubicacion: string;
  modalidad_atencion: string;
  servicio_id: string;
  disponibilidad: string;
  comuna_id: string;
}
export interface IService {
  id: string;
  nombre: string;
  descripcion: string;
  precio_base: string;
}

export interface IWorks {
  usuario_id: string;
  fotos_trabajos: string;
  id: number;
}
