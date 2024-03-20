import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import loadStytch from "@/lib/loadStytch";

export type LayoutProps = {
  children: ReactNode;
};

export default async function Layout({
  children,
}: LayoutProps): Promise<JSX.Element> {
  const cookieStore = cookies();
  const sessionJWT = cookieStore.get("stytch_session_jwt");

  if (!sessionJWT) {
    redirect("/signin");
  }

  const stytchClient = loadStytch();

  try {
    await stytchClient.sessions.authenticateJwt({
      session_jwt: sessionJWT.value,
    });
  } catch {
    redirect("/signin");
  }

  return <>{children}</>;
}
