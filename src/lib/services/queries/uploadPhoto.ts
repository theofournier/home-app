import { put, PutBlobResult } from "@vercel/blob";
import { VERCEL_BLOB_PHOTO_FOLDER_PATH } from "../vercelBlob";

export const uploadPhoto = async (photo: File): Promise<string> => {
  const result = await put(
    `${VERCEL_BLOB_PHOTO_FOLDER_PATH}/${photo.name}`,
    photo,
    {
      access: "public",
      multipart: true,
    }
  );
  return result.url;
};
