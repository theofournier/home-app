"use client";

import NextImage from "next/image";
import NextLink from "next/link";

import { Photo } from "@/lib/services/types";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { pathForPhoto } from "@/config/path";
import { useFormState, useFormStatus } from "react-dom";
import { editPhotoAction } from "@/lib/actions/photo";

type Props = {
  photo: Photo;
};

const SaveButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending}>
      Save
    </Button>
  );
};

export const EditPhotoItem = ({ photo }: Props) => {
  const [state, formAction] = useFormState(editPhotoAction, {
    errorMessage: "",
  });
  return (
    <form action={formAction}>
      <input name="photoId" value={photo.id} hidden aria-hidden readOnly />
      <div className="grid grid-cols-6 gap-2">
        <div className="flex flex-col gap-1">
          <NextLink
            href={pathForPhoto(photo)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <NextImage
              alt={photo.title ?? photo.id}
              src={photo.url}
              style={{ objectFit: "cover", aspectRatio: "1.5/1" }}
              width={200}
              height={200 / 1.5}
            />
          </NextLink>
          <Input name="url" label="URL" defaultValue={photo.url} />
        </div>
        <div>
          <Input name="title" label="Title" defaultValue={photo.title} />
          <Input
            name="description"
            label="Description"
            defaultValue={photo.description}
          />
          <Input
            name="date"
            label="Date"
            defaultValue={photo.date?.toISOString()}
          />
        </div>
        <div>
          <Input
            name="location"
            label="Location"
            defaultValue={photo.location}
          />
        </div>
        <div>
          <Input
            name="exposure"
            label="Exposure"
            defaultValue={photo.exifData?.exposure}
          />
          <Input
            name="focalLength"
            label="Focal Length"
            defaultValue={photo.exifData?.focalLength?.toString()}
          />
          <Input
            name="fNumber"
            label="F Number"
            defaultValue={photo.exifData?.fNumber?.toString()}
          />
          <Input
            name="iso"
            label="ISO"
            defaultValue={photo.exifData?.iso?.toString()}
          />
        </div>
        <div>
          <Input
            name="width"
            label="width"
            defaultValue={photo.width.toString()}
          />
          <Input
            name="height"
            label="height"
            defaultValue={photo.height.toString()}
          />
        </div>
        <div>
          <SaveButton />
        </div>
      </div>
    </form>
  );
};
