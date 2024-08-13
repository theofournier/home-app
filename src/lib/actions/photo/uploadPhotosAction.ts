"use server";

import { auth } from "../../auth/auth";
import {
  uploadPhotoServer,
  UploadResponse,
  UploadResponseSuccess,
} from "@/lib/services/cloudinary";
import { createPhotos } from "@/lib/services/queries/photo/createPhotos";
import { nanoid } from "nanoid";

const isUploadSuccess = (
  res: PromiseSettledResult<UploadResponse>
): res is PromiseFulfilledResult<UploadResponseSuccess> =>
  res.status === "fulfilled" &&
  res.value.success === true &&
  !!res.value.result;

export const uploadPhotosAction = async (
  _prevState: { errorMessage: string; successMessage: string },
  formData: FormData
) => {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }
  try {
    const files = formData.getAll("photo") as File[];

    if (!files || files.length === 0) {
      return { errorMessage: "No photos", successMessage: "" };
    }
    const cloudinaryResult = await Promise.allSettled(
      files.map(uploadPhotoServer)
    );

    await createPhotos(
      cloudinaryResult.filter(isUploadSuccess).map((res) => ({
        id: nanoid(15),
        url: res.value.result!.secure_url,
        asset_id: res.value.result!.public_id,
        width: res.value.result!.width,
        height: res.value.result!.height,
      }))
    );
  } catch (error) {
    console.log(error);
    return { errorMessage: "Error uploading photos", successMessage: "" };
  }
  return { errorMessage: "", successMessage: "Photos successfully uploaded" };
};
