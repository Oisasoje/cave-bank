import { getSessionIdFromCookie } from "@/lib/getSessionIdFromCookie";

import { redirect } from "next/navigation";
import React from "react";

const PrivateLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const sessionId = await getSessionIdFromCookie();

  if (!sessionId) {
    redirect("/auth/login/start");
  }

  return <>{children}</>;
};

export default PrivateLayout;
