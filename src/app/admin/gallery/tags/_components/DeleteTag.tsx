"use client";

import { deleteTagAction } from "@/lib/actions/tag/deleteTagAction";
import { Button } from "@nextui-org/button";
import { useFormState } from "react-dom";

type Props = {
  value: string;
};

export const DeleteTag = ({ value }: Props) => {
  const [state, formAction] = useFormState(deleteTagAction, {
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
