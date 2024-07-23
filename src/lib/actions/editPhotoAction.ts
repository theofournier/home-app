"use server";

import { z } from "zod";
import { updatePhoto } from "../services/queries/updatePhoto";

const EditPhotoSchema = z.object({
  id: z.string(),
  url: z.string(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  date: z.date().nullable(),
  location: z.string().nullable(),
  exposure: z.string().nullable(),
  focal_length: z.number().nullable(),
  f_number: z.number().nullable(),
  iso: z.number().nullable(),
  width: z.number(),
  height: z.number(),
  tags: z.string().array(),
});

export const editPhotoAction = async (
  _prevState: { errorMessage: string; successMessage: string },
  formData: FormData
) => {
  try {
    const { tags, ...editPhotoFormData } = EditPhotoSchema.parse({
      id: formData.get("photoId"),
      url: formData.get("url"),
      title: formData.get("title") || null,
      description: formData.get("description") || null,
      date: z.coerce.date().parse(formData.get("date")) || null,
      location: formData.get("location") || null,
      exposure: formData.get("exposure") || null,
      focal_length:
        z.coerce.number().parse(formData.get("focalLength")) || null,
      f_number: z.coerce.number().parse(formData.get("fNumber")) || null,
      iso: z.coerce.number().parse(formData.get("iso")) || null,
      width: z.coerce.number().parse(formData.get("width")),
      height: z.coerce.number().parse(formData.get("height")),
      tags: formData.getAll("tags"),
    });

    if (!editPhotoFormData.id) {
      return { errorMessage: "No photo id", successMessage: "" };
    }
    await updatePhoto(editPhotoFormData, tags);
  } catch (error) {
    console.log(error);
    return { errorMessage: "Error editing photo", successMessage: "" };
  }
  return { errorMessage: "", successMessage: "Photo successfully edited" };
};
