"use server";

import { editPhoto } from "../services/queries/editPhoto";

export const editPhotoAction = async (
  _prevState: { errorMessage: string },
  formData: FormData
) => {
  const photoId = formData.get("photoId") as string;
  if (!photoId) {
    return { errorMessage: "No photo id" };
  }
  try {
    await editPhoto({
      id: photoId,
      url: formData.get("url") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      date: new Date(formData.get("date") as string),
      location: formData.get("location") as string,
      exposure: formData.get("exposure") as string,
      focal_length: formData.get("focalLength") as unknown as number,
      f_number: formData.get("fNumber") as unknown as number,
      iso: formData.get("iso") as unknown as number,
      width: formData.get("width") as unknown as number,
      height: formData.get("height") as unknown as number,
    });
  } catch (error) {
    return { errorMessage: "Error editing photo" };
  }
  return { errorMessage: "" };
};
