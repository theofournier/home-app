"use client";

import { deleteAlbumAction } from "@/lib/actions/album/deleteAlbumAction";
import { Button } from "@nextui-org/button";
import { useFormState } from "react-dom";

type Props = {
  id: string;
};

export const DeleteAlbum = ({ id }: Props) => {
  const [state, formAction] = useFormState(deleteAlbumAction, {
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
