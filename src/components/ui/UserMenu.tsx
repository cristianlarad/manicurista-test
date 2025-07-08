"use client";

import { IUser } from "@/types/users";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { UserAvatar } from "../UserAvatar";
import { UserInfo } from "../UserInfo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "../client/auth/actions";

type Props = {
  user: IUser;
};

export function UserMenu({ user }: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      router.refresh();
    } else {
      console.error("Error al cerrar sesión:", result.error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative flex rounded-full bg-neutral-200 p-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-800"
          aria-label="Open user menu"
        >
          <UserAvatar user={user} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48 divide-y divide-neutral-200"
      >
        {/* Información del usuario */}
        <UserInfo user={user} />

        {/* Navegación */}
        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="block w-full px-4 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-700"
          >
            Perfil
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Cierre de sesión */}
        <DropdownMenuItem asChild>
          {/* action={logout} */}
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-start text-sm font-medium text-neutral-500 hover:text-neutral-700"
          >
            Log Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
