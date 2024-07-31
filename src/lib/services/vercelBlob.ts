import { put, del, PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export const VERCEL_BLOB_PHOTO_FOLDER_PATH = "photos";
export const VERCEL_BLOB_SIZE_LIMIT = 4_500_000;

export type UploadPhotoResult = {
  photoName: string;
  blobResult: PutBlobResult;
};

export type UploadPhotoResponse = Partial<UploadPhotoResult> & {
  photoName: string;
  error?: string;
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
  return { photoName, blobResult: result };
};

export const deletePhotoServer = async (photoUrl: string) => {
  await del(photoUrl);
};

const uploadPhotoClient = async (
  photo: File,
  photoName?: string
): Promise<UploadPhotoResult> => {
  const result = await upload(
    `${VERCEL_BLOB_PHOTO_FOLDER_PATH}/${photoName ?? photo.name}`,
    photo,
    {
      access: "public",
      handleUploadUrl: "/api/photos/upload-token",
      multipart: true,
    }
  );
  return { photoName: photo.name, blobResult: result };
};

export const uploadPhotoClientApi = async (photo: File, photoName?: string) => {
  try {
    const result = await uploadPhotoClient(photo, photoName);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message, photoName: photo.name },
      { status: 400 }
    );
  }
};
