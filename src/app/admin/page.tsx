import NextLink from "next/link";

import { auth } from "@/lib/auth/auth";
import { PATH_ADMIN_GALLERY } from "@/config/path";
import { Metadata } from "next";
import { Button } from "@nextui-org/button";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function Admin() {
  const session = await auth();

  return (
    <div className="space-y-4">
      <p>
        Welcom Admin {session?.user?.name} - {session?.user?.email}
      </p>
      <Button
        as={NextLink}
        href={PATH_ADMIN_GALLERY}
        variant="solid"
        color="primary"
      >
        To Admin Gallery
      </Button>
    </div>
  );
}
