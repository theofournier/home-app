import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type UploadResponseSuccess = {
  success: true;
  result?: UploadApiResponse;
};

export type UploadResponseError = {
  success: false;
  error: UploadApiErrorResponse;
};

export type UploadResponse = UploadResponseSuccess | UploadResponseError;

export const uploadPhotoServer = async (
  photo: File
): Promise<UploadResponse> => {
  const arrayBuffer = await photo.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          invalidate: true,
          resource_type: "auto",
          filename_override: photo.name,
          folder: "photos",
          use_filename: true,
        },
        function (error, result) {
          if (error) {
            reject({ success: false, error });
            return;
          }
          resolve({ success: true, result });
        }
      )
      .end(buffer);
  });
};

export const deletePhotoServer = async (assetId: string) => {
  await cloudinary.api.delete_resources([assetId]);
};
