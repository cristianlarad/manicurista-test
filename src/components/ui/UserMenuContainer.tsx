import { UserIcon } from "lucide-react";
import { UserMenu } from "./UserMenu";
import Link from "next/link";
import { getUsuarioById } from "@/utils/getUser";
import { cookies } from "next/headers";

export async function UserMenuContainer() {
  const cookieStore = await cookies();
  const user = await getUsuarioById(cookieStore);

  if (user) {
    return <UserMenu user={user} />;
  } else {
    return (
      <Link href="/login" className="h-6 w-6 flex-shrink-0">
        <UserIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
        <span className="sr-only">Log in</span>
      </Link>
    );
  }
}
