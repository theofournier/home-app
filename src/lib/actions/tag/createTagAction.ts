"use server";

import { z } from "zod";
import { auth } from "../../auth/auth";
import { createTag } from "@/lib/services/queries/tag/createTag";

const CreateTagSchema = z.object({
  value: z.string(),
  title: z.string(),
  description: z.string().nullable(),
});

export const createTagAction = async (
  _prevState: { errorMessage: string; successMessage: string },
  formData: FormData
) => {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }
  try {
    const createTagFormData = CreateTagSchema.parse({
      value: formData.get("value"),
      title: formData.get("title"),
      description: formData.get("description") || null,
    });

    await createTag(createTagFormData);
  } catch (error) {
    console.log(error);
    return { errorMessage: "Error creating tag", successMessage: "" };
  }
  return { errorMessage: "", successMessage: "Tag successfully created" };
};
