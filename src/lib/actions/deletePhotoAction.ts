"use server";

import { z } from "zod";
import { auth } from "../auth/auth";
import { deletePhoto } from "../services/queries/deletePhoto";
import { deletePhotoServer } from "../services/vercelBlob";

const DeletePhotoSchema = z.object({
  id: z.string(),
});

export const deletePhotoAction = async (
  _prevState: { errorMessage: string; successMessage: string },
  formData: FormData
) => {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }
  try {
    const { id } = DeletePhotoSchema.parse({
      id: formData.get("photoId"),
    });

    if (!id) {
      return { errorMessage: "No photo id", successMessage: "" };
    }
    const deletedPhoto = await deletePhoto(id);
    if (deletedPhoto) {
      await deletePhotoServer(deletedPhoto.url);
      if (deletedPhoto.url_compressed) {
        await deletePhotoServer(deletedPhoto.url_compressed);
      }
    }
  } catch (error) {
    console.log(error);
    return {
      errorMessage: `Error deleting photo: ${error}`,
      successMessage: "",
    };
  }
  return { errorMessage: "", successMessage: "Photo successfully deleted" };
};
