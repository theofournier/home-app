"use client";

import { Button } from "@nextui-org/button";
import NextImage from "next/image";
import { ChangeEvent, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { uploadPhotosAction } from "@/lib/actions/photo/uploadPhotosAction";

const UploadButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending} color="primary">
      Upload photos
    </Button>
  );
};

const UploadPhotoItem = ({ photoFile }: { photoFile: File }) => {
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
    </div>
  );
};

export const UploadPhotoForm = () => {
  const [state, formAction] = useFormState(uploadPhotosAction, {
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
      <div>
        <input
          name="photo"
          type="file"
          multiple
          onChange={onChangePhotoFiles}
        />
        <UploadButton />
        {state.errorMessage && (
          <p className="text-danger">{state.errorMessage}</p>
        )}
        {state.successMessage && (
          <p className="text-success">{state.successMessage}</p>
        )}
      </div>
      <h3>Photos</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {photoFiles.map((photoFile) => (
          <div key={photoFile.name}>
            <UploadPhotoItem photoFile={photoFile} />
          </div>
        ))}
      </div>
    </form>
  );
};
