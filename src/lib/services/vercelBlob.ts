import { put, PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export const VERCEL_BLOB_PHOTO_FOLDER_PATH = "photos";
export const VERCEL_BLOB_SIZE_LIMIT = 4_500_000;

export type UploadPhotoResult = {
  photoName: string;
  blobResult: PutBlobResult;
};

export const uploadPhotoServer = async (
  photoName: string,
  photo: ReadableStream<Uint8Array>
): Promise<UploadPhotoResult> => {
  const result = await put(
    `${VERCEL_BLOB_PHOTO_FOLDER_PATH}/${photoName}`,
    photo,
    {
      access: "public",
      multipart: true,
    }
  );
  console.log("server", result);
  return { photoName, blobResult: result };
};

const uploadPhotoClient = async (photo: File): Promise<UploadPhotoResult> => {
  const result = await upload(
    `${VERCEL_BLOB_PHOTO_FOLDER_PATH}/${photo.name}`,
    photo,
    {
      access: "public",
      handleUploadUrl: "/api/photos/upload-token",
      multipart: true,
    }
  );
  console.log("client", result);
  return { photoName: photo.name, blobResult: result };
};

export const uploadPhotoClientApi = async (photo: File) => {
  try {
    const result = await uploadPhotoClient(photo);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message, photoName: photo.name },
      { status: 400 }
    );
  }
};
