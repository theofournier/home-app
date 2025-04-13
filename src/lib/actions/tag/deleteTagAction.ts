"use server";

import { z } from "zod";
import { auth } from "../../auth/auth";
import { deleteTag } from "@/lib/services/queries/tag/deleteTag";

const DeleteTagSchema = z.object({
  value: z.string(),
});

export const deleteTagAction = async (
  _prevState: { errorMessage: string; successMessage: string },
  formData: FormData
) => {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }
  try {
    const { value } = DeleteTagSchema.parse({
      value: formData.get("value"),
    });

    if (!value) {
      return { errorMessage: "No tag value", successMessage: "" };
    }
    await deleteTag(value);
  } catch (error) {
    console.log(error);
    return {
      errorMessage: `Error deleting tag: ${error}`,
      successMessage: "",
    };
  }
  return { errorMessage: "", successMessage: "Tag successfully deleted" };
};
