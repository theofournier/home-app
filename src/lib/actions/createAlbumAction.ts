"use server";

import { z } from "zod";
import { auth } from "../auth/auth";
import { updateAlbum } from "../services/queries/updateAlbum";
import { createAlbum } from "../services/queries/createAlbum";
import { nanoid } from "nanoid";

const CreateAlbumSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  cover_url: z.string().nullable(),
  date: z.date().nullable(),
});

export const createAlbumAction = async (
  _prevState: { errorMessage: string; successMessage: string },
  formData: FormData
) => {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }
  try {
    const createAlbumFormData = CreateAlbumSchema.parse({
      id: formData.get("albumId"),
      title: formData.get("title"),
      description: formData.get("description") || null,
      cover_url: formData.get("coverUrl") || null,
      date: formData.get("date")
        ? z.coerce.date().parse(formData.get("date"))
        : null,
    });

    await createAlbum({ id: nanoid(15), ...createAlbumFormData });
  } catch (error) {
    console.log(error);
    return { errorMessage: "Error creating album", successMessage: "" };
  }
  return { errorMessage: "", successMessage: "Album successfully created" };
};
