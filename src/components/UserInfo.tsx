import { IUser } from "@/types/users";

type Props = {
  user: IUser;
};

export const UserInfo = ({ user }: Props) => {
  const userName = user.nombre ? `${user.nombre}` : null;

  return (
    <p className="truncate px-5 py-2 text-xs text-neutral-700">
      {userName && (
        <span className="mb-0.5 block truncate font-bold">{userName}</span>
      )}
      {user.correo}
    </p>
  );
};
