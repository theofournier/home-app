"use server";

import { uploadPhoto } from "../services/queries/uploadPhoto";

export const uploadPhotoAction = async (
  _prevState: { errorMessage: string; successMessage: string },
  formData: FormData
) => {
  const photos = formData.getAll("photos") as File[];

  try {
    await Promise.all(photos.map(uploadPhoto));
  } catch (error) {
    console.log(error);
    return { errorMessage: "Error uploading photos", successMessage: "" };
  }
  return { errorMessage: "", successMessage: "Photos successfully uploaded" };
};
