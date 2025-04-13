"use client";

import { Tag } from "@/lib/services/types";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useFormState, useFormStatus } from "react-dom";
import { DeleteTag } from "./DeleteTag";
import { editTagAction } from "@/lib/actions/tag/editTagAction";

type Props = {
  tag: Tag;
};

const SaveButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending} color="primary">
      Save
    </Button>
  );
};

export const EditTagItem = ({ tag }: Props) => {
  const [state, formAction] = useFormState(editTagAction, {
    errorMessage: "",
    successMessage: "",
  });
  return (
    <form action={formAction}>
      <input name="value" value={tag.value} hidden aria-hidden readOnly />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2 md:p-4">
        <div className="space-y-1">
          <Input
            name="value"
            label="Value"
            defaultValue={tag.value}
            isRequired
          />
          <Input
            name="title"
            label="Title"
            defaultValue={tag.title}
            isRequired
          />
        </div>
        <div className="space-y-1">
          <Textarea
            name="description"
            label="Description"
            defaultValue={tag.description}
          />
        </div>
        <div className="space-y-1">
          <SaveButton />
          {state.errorMessage && (
            <p className="text-danger">{state.errorMessage}</p>
          )}
          {state.successMessage && (
            <p className="text-success">{state.successMessage}</p>
          )}
          <DeleteTag value={tag.value} />
        </div>
      </div>
    </form>
  );
};
