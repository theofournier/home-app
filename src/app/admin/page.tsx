import { auth } from "@/lib/auth/auth";

export default async function Admin() {
  const session = await auth();

  return (
    <div>
      Welcom Admin {session?.user?.name} - {session?.user?.email}
    </div>
  );
}
