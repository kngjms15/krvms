"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signIn');
    },
  });

  return (
    <div>
      <div>{session?.data?.user?.email}</div>
      <button onClick={() => signOut()}>Sign out</button>
      
    </div>
  );
}

Page.requireAuth = true