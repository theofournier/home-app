"use server";

import { z } from "zod";
import { auth } from "../../auth/auth";
import { updateTag } from "@/lib/services/queries/tag/updateTag";

const EditTagSchema = z.object({
  value: z.string(),
  title: z.string(),
  description: z.string().nullable(),
});

export const editTagAction = async (
  _prevState: { errorMessage: string; successMessage: string },
  formData: FormData
) => {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }
  try {
    const editTagFormData = EditTagSchema.parse({
      value: formData.get("value"),
      title: formData.get("title"),
      description: formData.get("description") || null,
    });

    if (!editTagFormData.value) {
      return { errorMessage: "No tag id", successMessage: "" };
    }
    await updateTag(editTagFormData.value, editTagFormData);
  } catch (error) {
    console.log(error);
    return { errorMessage: "Error editing tag", successMessage: "" };
  }
  return { errorMessage: "", successMessage: "Tag successfully edited" };
};
