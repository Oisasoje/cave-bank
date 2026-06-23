import { getCurrentUser } from "@/lib/getCurrentUser";

import { redirect } from "next/navigation";
import React from "react";

const PrivateLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login/start");
  }

  return <>{children}</>;
};

export default PrivateLayout;
