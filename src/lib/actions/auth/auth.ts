"use server";

import { redirect } from "next/navigation";
import { KEY_CALLBACK_URL, signIn } from "../../auth/auth";
import { PATH_ADMIN } from "@/config/path";

export const signInAction = async (
  _prevState: { errorMessage: string },
  formData: FormData
) => {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
  } catch (error) {
    return { errorMessage: "Invalid credentials" };
  }
  redirect((formData.get(KEY_CALLBACK_URL) as string) || PATH_ADMIN);
};
