"use client";

import { Button } from "@nextui-org/button";
import { useFormState } from "react-dom";
import { deletePhotoAction } from "@/lib/actions/deletePhotoAction";

type Props = {
  id: string;
};

export const DeletePhoto = ({ id }: Props) => {
  const [state, formAction] = useFormState(deletePhotoAction, {
    errorMessage: "",
    successMessage: "",
  });
  return (
    <div className="space-y-1">
      <Button type="submit" color="danger" formAction={formAction}>
        Delete
      </Button>
      {state.errorMessage && (
        <p className="text-danger">{state.errorMessage}</p>
      )}
      {state.successMessage && (
        <p className="text-success">{state.successMessage}</p>
      )}
    </div>
  );
};
