import { getSessionIdFromCookie } from "@/lib/getSessionIdFromCookie";

import { redirect } from "next/navigation";
import React from "react";

const PublicLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const sessionId = await getSessionIdFromCookie();

  if (sessionId) {
    redirect("/wallet");
  }

  return <>{children}</>;
};

export default PublicLayout;
