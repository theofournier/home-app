import NextLink from "next/link";

import { auth } from "@/lib/auth/auth";
import { PATH_ADMIN_GALLERY } from "@/config/path";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function Admin() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-4">
      Welcom Admin {session?.user?.name} - {session?.user?.email}
      <NextLink href={PATH_ADMIN_GALLERY}>To Admin Gallery</NextLink>
    </div>
  );
}
