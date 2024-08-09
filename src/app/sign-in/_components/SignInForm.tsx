"use client";

import { PasswordInput } from "./PasswordInput";
import { signInAction } from "@/lib/actions/auth";
import { KEY_CALLBACK_URL } from "@/lib/auth/auth";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useSearchParams } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

const SignInButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending}>
      Sign in
    </Button>
  );
};

export const SignInForm = () => {
  const params = useSearchParams();

  const [state, formAction] = useFormState(signInAction, { errorMessage: "" });

  return (
    <form action={formAction} className="space-y-2">
      <Input
        isRequired
        type="email"
        name="email"
        label="Email"
        variant="bordered"
        className="max-w-xs"
      />
      <PasswordInput />
      <SignInButton />
      {state.errorMessage && (
        <p className="text-danger">{state.errorMessage}</p>
      )}
      <input
        hidden
        aria-hidden
        readOnly
        name={KEY_CALLBACK_URL}
        value={params.get(KEY_CALLBACK_URL) ?? ""}
      />
    </form>
  );
};
