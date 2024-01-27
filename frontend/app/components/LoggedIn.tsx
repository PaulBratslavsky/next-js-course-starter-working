import React from "react";

import { getUserMeLoader } from "@/app/data/loaders";
import { logoutAction } from "@/app/data/actions";
import { LogoutIcon } from "../icons";

interface AuthUserProps {
  username: string;
  email: string;
}

function LogoutButton() {
  return <form action={logoutAction}>
    <button type="submit">
      <LogoutIcon className="w-6 h-6 hover:text-primary" />
    </button>
  </form>;
}

function AuthUser({ userData }: { userData: AuthUserProps }) {
  console.log(userData, "userData");
  return (
    <div className="flex gap-2">
      <h1 className="font-semibold">{userData.username}</h1>
      <LogoutButton />
    </div>
  );
}

export default async function LoggedIn({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserMeLoader();
  return <div>{user.ok ? <AuthUser userData={user.data} /> : children}</div>;
}
