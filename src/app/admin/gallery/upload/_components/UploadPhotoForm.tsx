"use client";

import { Button } from "@nextui-org/button";
import NextImage from "next/image";
import { ChangeEvent, useState } from "react";
import { uploadPhoto } from "@/lib/utils/uploadPhoto";
import { compressPhoto } from "@/lib/utils/compressPhoto";

type StatusType = { success: boolean; reason?: string };

type UploadStatus = {
  photoName: string;
  original?: StatusType;
  compress?: StatusType;
  database?: StatusType;
};

const UploadPhotoItem = ({
  photoFile,
  status,
}: {
  photoFile: File;
  status?: StatusType;
}) => {
  return (
    <div className="relative">
      <NextImage
        src={URL.createObjectURL(photoFile)}
        alt={photoFile.name}
        style={{
          objectFit: "cover",
          aspectRatio: "1.5/1",
          marginInline: "auto",
        }}
        width={400}
        height={400 / 1.5}
      />
      {status?.success && (
        <div className="absolute top-0 h-full w-full bg-success/30" />
      )}
      {status?.success === false && (
        <div className="absolute top-0 h-full w-full bg-danger/30">
          <p>{status?.reason}</p>
        </div>
      )}
    </div>
  );
};

export const UploadPhotoForm = () => {
  const [status, setStatus] = useState<{
    loading: boolean;
    results: UploadStatus[];
  }>({
    loading: false,
    results: [],
  });
  const [photoFiles, setPhotoFiles] = useState<
    { original: File; compress?: File }[]
  >([]);

  const onChangePhotoFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const photos = Array.from(files).map<{ original: File; compress?: File }>(
        (file) => ({ original: file })
      );
      for (const photo of photos) {
        photo.compress = await compressPhoto(photo.original);
      }
      setPhotoFiles(photos);
    }
  };

  const handleUploadPhotos = async () => {
    if (photoFiles.length === 0) {
      return;
    }

    setStatus({ loading: true, results: [] });

    const results = await Promise.allSettled(
      photoFiles.map(async (photoFile) => {
        const result: UploadStatus = {
          photoName: photoFile.original.name,
        };
        // Original
        const originalResult = await uploadPhoto(photoFile.original);
        result.original = {
          success: originalResult.ok,
          reason: originalResult.reason,
        };

        if (originalResult.ok) {
          // Compress
          const compressResult = await uploadPhoto(
            photoFile.compress,
            "compressed"
          );
          result.compress = {
            success: compressResult.ok,
            reason: compressResult.reason,
          };
          const photoResponse = await fetch("/api/photos", {
            method: "POST",
            body: JSON.stringify({
              url: originalResult.url,
              urlCompress: compressResult.url,
            }),
          });
          result.database = {
            success: photoResponse.ok,
          };
        }
        return result;
      })
    );

    setStatus({
      loading: false,
      results: results.map((res) => {
        if (res.status === "rejected") {
          return { success: false, photoName: res.reason };
        }
        return res.value;
      }),
    });
  };

  return (
    <div>
      <div>
        <input type="file" multiple onChange={onChangePhotoFiles} />
        <Button
          type="button"
          color="primary"
          isLoading={status.loading}
          onPress={handleUploadPhotos}
          isDisabled={photoFiles.length === 0}
        >
          Upload photos
        </Button>
      </div>
      <h3>Photos</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {photoFiles.map((photoFile) => (
          <div key={photoFile.original.name}>
            <UploadPhotoItem
              photoFile={photoFile.original}
              status={
                status.results.find(
                  (res) => res.photoName === photoFile.original.name
                )?.original
              }
            />
            {photoFile.compress && (
              <UploadPhotoItem
                photoFile={photoFile.compress}
                status={
                  status.results.find(
                    (res) => res.photoName === photoFile.compress!.name
                  )?.compress
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
