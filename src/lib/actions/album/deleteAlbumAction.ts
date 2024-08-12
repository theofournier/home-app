"use server";

import { z } from "zod";
import { auth } from "../../auth/auth";
import { deleteAlbum } from "../../services/queries/album/deleteAlbum";

const DeleteAlbumSchema = z.object({
  id: z.string(),
});

export const deleteAlbumAction = async (
  _prevState: { errorMessage: string; successMessage: string },
  formData: FormData
) => {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }
  try {
    const { id } = DeleteAlbumSchema.parse({
      id: formData.get("albumId"),
    });

    if (!id) {
      return { errorMessage: "No album id", successMessage: "" };
    }
    await deleteAlbum(id);
  } catch (error) {
    console.log(error);
    return {
      errorMessage: `Error deleting album: ${error}`,
      successMessage: "",
    };
  }
  return { errorMessage: "", successMessage: "Album successfully deleted" };
};
