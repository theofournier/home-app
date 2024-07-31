import {
  uploadPhotoClientApi,
  UploadPhotoResponse,
  VERCEL_BLOB_SIZE_LIMIT,
} from "@/lib/services/vercelBlob";

export const uploadPhoto = async (photo?: File, prefix?: string) => {
  if (!photo) {
    return {
      photoName: "",
      ok: false,
      reason: "No photo file",
    };
  }
  const photoName = `${prefix ? `${prefix}-` : ""}${photo.name}`;

  let response: Response;
  // Original
  if (photo.size >= VERCEL_BLOB_SIZE_LIMIT) {
    response = await uploadPhotoClientApi(photo, photoName);
  } else {
    response = await fetch(`/api/photos/upload?photoname=${photoName}`, {
      method: "POST",
      body: photo,
    });
  }
  const body: UploadPhotoResponse = await response.json();

  return {
    photoName,
    ok: response.ok,
    reason: body.error,
    url: body.blobResult?.url,
  };
};
