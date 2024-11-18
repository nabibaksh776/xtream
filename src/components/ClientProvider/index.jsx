"use client";

import { SessionProvider } from "next-auth/react";

import ReduxProvider from "@/redux/ReduxProvider";
// eslint-disable-next-line import/no-unresolved
import Logout from "@/app/logout";

export default function ClientProvider({ children, session }) {
  return (
    <SessionProvider session={session}>
      <nav>{session && <Logout />}</nav>
      <ReduxProvider>{children}</ReduxProvider>
    </SessionProvider>
  );
}
