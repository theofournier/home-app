"use client";

import { Button } from "@nextui-org/button";
import NextImage from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  uploadPhotoClientApi,
  VERCEL_BLOB_SIZE_LIMIT,
} from "@/lib/services/vercelBlob";

const UploadPhotoItem = ({
  photoFile,
  status,
}: {
  photoFile: File;
  status?: { success: boolean; reason?: string };
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
        width={200}
        height={200 / 1.5}
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
    results: { success: boolean; photoName: string; reason?: string }[];
  }>({
    loading: false,
    results: [],
  });
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);

  const onChangePhotoFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setPhotoFiles(Array.from(files));
    }
  };

  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (photoFiles.length === 0) {
      return;
    }

    setStatus({ loading: true, results: [] });

    const results = await Promise.allSettled(
      photoFiles.map(async (photoFile) => {
        if (photoFile.size >= VERCEL_BLOB_SIZE_LIMIT) {
          const response = await uploadPhotoClientApi(photoFile);
          const body = await response.json();
          return {
            photoName: photoFile.name,
            ok: response.ok,
            reason: body.error,
          };
        }
        const response = await fetch(
          `/api/photos/upload?photoname=${photoFile.name}`,
          {
            method: "POST",
            body: photoFile,
          }
        );
        const body = await response.json();
        return {
          photoName: photoFile.name,
          ok: response.ok,
          reason: body.error,
        };
      })
    );

    setStatus({
      loading: false,
      results: results.map((res) => {
        if (res.status === "rejected") {
          return { success: false, photoName: res.reason };
        }
        return {
          success: res.value.ok,
          photoName: res.value.photoName,
          reason: res.value.reason,
        };
      }),
    });
  };

  return (
    <form onSubmit={onSubmitForm}>
      <input
        name="photos"
        type="file"
        multiple
        onChange={onChangePhotoFiles}
        required
      />
      <Button type="submit" color="primary" isLoading={status.loading}>
        Upload photos
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-4">
        {photoFiles.map((photoFile) => (
          <UploadPhotoItem
            key={photoFile.name}
            photoFile={photoFile}
            status={status.results.find(
              (res) => res.photoName === photoFile.name
            )}
          />
        ))}
      </div>
    </form>
  );
};
