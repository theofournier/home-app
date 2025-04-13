"use client";

import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useFormState, useFormStatus } from "react-dom";
import { createTagAction } from "@/lib/actions/tag/createTagAction";

const SaveButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending} color="primary">
      Create
    </Button>
  );
};

export const CreateTagForm = () => {
  const [state, formAction] = useFormState(createTagAction, {
    errorMessage: "",
    successMessage: "",
  });
  return (
    <form action={formAction}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2 md:p-4">
        <div className="space-y-1">
          <Input name="value" label="Value" isRequired required />
          <Input name="title" label="Title" isRequired required />
        </div>
        <div className="space-y-1">
          <Textarea name="description" label="Description" />
        </div>
        <div className="space-y-1">
          <SaveButton />
          {state.errorMessage && (
            <p className="text-danger">{state.errorMessage}</p>
          )}
          {state.successMessage && (
            <p className="text-success">{state.successMessage}</p>
          )}
        </div>
      </div>
    </form>
  );
};
