"use client";

import { uploadPhotoAction } from "@/lib/actions/uploadPhotoAction";
import { Button } from "@nextui-org/button";
import { useFormState, useFormStatus } from "react-dom";
import NextLink from "next/link";
import NextImage from "next/image";
import { PATH_ADMIN_GALLERY_ADD } from "@/config/path";
import { ChangeEvent, useState } from "react";

const UploadButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending} color="primary">
      Upload photos
    </Button>
  );
};

export const UploadPhotoForm = () => {
  const [state, formAction] = useFormState(uploadPhotoAction, {
    errorMessage: "",
    successMessage: "",
  });

  const [photoFiles, setPhotoFiles] = useState<File[]>([]);

  const onChangePhotoFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setPhotoFiles(Array.from(files));
    }
  };

  return (
    <form action={formAction}>
      <input name="photos" type="file" multiple onChange={onChangePhotoFiles} />
      <UploadButton />
      {state.errorMessage && (
        <p className="text-danger">{state.errorMessage}</p>
      )}
      {state.successMessage && (
        <>
          <p className="text-success">{state.successMessage}</p>
          <NextLink href={PATH_ADMIN_GALLERY_ADD}>Go to add photos</NextLink>
        </>
      )}
      <div className="grid grid-cols-1 md:grid-cols-4">
        {photoFiles.map((photoFile) => (
          <NextImage
            src={URL.createObjectURL(photoFile)}
            alt={photoFile.name}
            style={{ objectFit: "cover", aspectRatio: "1.5/1" }}
            width={200}
            height={200 / 1.5}
          />
        ))}
      </div>
    </form>
  );
};
