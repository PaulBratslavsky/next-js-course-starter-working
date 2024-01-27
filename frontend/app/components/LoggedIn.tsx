import React from "react";

import { getUserMeLoader } from "@/app/data/loaders";
// import { logoutAction } from "@/app/data/actions";

interface AuthUserProps {
  username: string;
  email: string;
}

function AuthUser({ userData }: { userData: AuthUserProps }) {
  return (
    <div>
      <h1>{userData.username}</h1>
      {/* <form action={logoutAction}>
        <button type="submit">Logout</button>
      </form> */}
    </div>
  );
}

export default async function LoggedIn({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserMeLoader();
  return <div>{user ? <AuthUser userData={user.data} /> : children}</div>;
}
