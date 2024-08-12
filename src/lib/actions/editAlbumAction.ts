"use server";

import { z } from "zod";
import { auth } from "../auth/auth";
import { updateAlbum } from "../services/queries/updateAlbum";

const EditAlbumSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  cover_url: z.string().nullable(),
  date: z.date().nullable(),
});

export const editAlbumAction = async (
  _prevState: { errorMessage: string; successMessage: string },
  formData: FormData
) => {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }
  try {
    const editAlbumFormData = EditAlbumSchema.parse({
      id: formData.get("albumId"),
      title: formData.get("title"),
      description: formData.get("description") || null,
      cover_url: formData.get("coverUrl") || null,
      date: formData.get("date")
        ? z.coerce.date().parse(formData.get("date"))
        : null,
    });

    if (!editAlbumFormData.id) {
      return { errorMessage: "No album id", successMessage: "" };
    }
    await updateAlbum(editAlbumFormData.id, editAlbumFormData);
  } catch (error) {
    console.log(error);
    return { errorMessage: "Error editing album", successMessage: "" };
  }
  return { errorMessage: "", successMessage: "Album successfully edited" };
};
