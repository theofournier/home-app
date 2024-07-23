"use server";

import { nanoid } from "nanoid";
import { createPhotos } from "../services/queries/createPhotos";
import { uploadPhoto } from "../services/queries/uploadPhoto";

export const uploadPhotoAction = async (
  _prevState: { errorMessage: string; successMessage: string },
  formData: FormData
) => {
  const photos = formData.getAll("photos") as File[];

  try {
    const results = await Promise.all(photos.map(uploadPhoto));

    await createPhotos(
      results.map((url) => ({ id: nanoid(15), url, height: 0, width: 0 }))
    );
  } catch (error) {
    console.log(error);
    return { errorMessage: "Error uploading photos", successMessage: "" };
  }
  return { errorMessage: "", successMessage: "Photos successfully uploaded" };
};
