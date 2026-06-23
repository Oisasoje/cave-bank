import { getCurrentUser } from "@/lib/getCurrentUser";

import { redirect } from "next/navigation";
import React from "react";

const PublicLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await getCurrentUser();

  if (user) {
    redirect("/wallet");
  }

  return <>{children}</>;
};

export default PublicLayout;
