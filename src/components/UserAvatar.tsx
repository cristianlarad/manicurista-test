import { IUser } from "@/types/users";
import Image from "next/image";

type Props = {
  user: IUser;
};

export const UserAvatar = ({ user }: Props) => {
  const label = user.nombre
    ? `${user.nombre.slice(0, 2)}`
    : user.correo.slice(0, 2);

  if (user.perfil_url) {
    return (
      <Image
        className="h-8 w-8 rounded-full border"
        aria-hidden="true"
        src={user.perfil_url}
        width={24}
        height={24}
        alt=""
      />
    );
  }

  return (
    <span
      className="flex h-8 w-8 items-center justify-center rounded-full border bg-white text-center text-xs font-bold uppercase"
      aria-hidden="true"
    >
      {label}
    </span>
  );
};
