"use client";

import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useFormState, useFormStatus } from "react-dom";
import { createAlbumAction } from "@/lib/actions/album/createAlbumAction";

const SaveButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending} color="primary">
      Create
    </Button>
  );
};

export const CreateAlbumForm = () => {
  const [state, formAction] = useFormState(createAlbumAction, {
    errorMessage: "",
    successMessage: "",
  });
  return (
    <form action={formAction}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2 md:p-4">
        <div className="space-y-1">
          <Input name="coverUrl" label="Cover URL" />
        </div>
        <div className="space-y-1">
          <Input name="title" label="Title" isRequired required />
          <Textarea name="description" label="Description" />
          <Input name="date" label="Date" />
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
