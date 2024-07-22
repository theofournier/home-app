import { PATH_ADMIN } from "@/config/path";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { SignInForm } from "./_components/SignInForm";

export default async function SignIn() {
  const session = await auth();

  if (session?.user) {
    redirect(PATH_ADMIN);
  }

  return (
    <div className="container mx-auto">
      <SignInForm />
    </div>
  );
}
