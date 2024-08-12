"use client";

import NextImage from "next/image";
import NextLink from "next/link";

import { Album, Photo, Tag } from "@/lib/services/types";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { pathForPhoto } from "@/config/path";
import { useFormState, useFormStatus } from "react-dom";
import { editPhotoAction } from "@/lib/actions/photo/editPhotoAction";
import { Select, SelectItem } from "@nextui-org/select";
import { CompressPhoto } from "./CompressPhoto";
import { DeletePhoto } from "./DeletePhoto";

type Props = {
  photo: Photo;
  tags: Tag[];
  albums: Album[];
};

const SaveButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending} color="primary">
      Save
    </Button>
  );
};

export const EditPhotoItem = ({ photo, tags, albums }: Props) => {
  const [state, formAction] = useFormState(editPhotoAction, {
    errorMessage: "",
    successMessage: "",
  });
  return (
    <form action={formAction}>
      <input name="photoId" value={photo.id} hidden aria-hidden readOnly />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2 p-2 md:p-4">
        <div className="space-y-1">
          <NextLink
            href={pathForPhoto(photo)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <NextImage
              alt={photo.title ?? photo.id}
              src={photo.urlCompressed ?? photo.url}
              style={{ objectFit: "cover", aspectRatio: "1.5/1" }}
              width={200}
              height={200 / 1.5}
            />
          </NextLink>
          <Input name="url" label="URL" defaultValue={photo.url} />
          <Input
            name="urlCompressed"
            label="URL Compressed"
            defaultValue={photo.urlCompressed}
          />
        </div>
        <div className="space-y-1">
          <Input name="title" label="Title" defaultValue={photo.title} />
          <Textarea
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
        <div className="space-y-1">
          <Input
            name="location"
            label="Location"
            defaultValue={photo.location}
          />
          <Select
            name="tags"
            label="Tags"
            placeholder="Select tags"
            selectionMode="multiple"
            className="max-w-xs"
            defaultSelectedKeys={photo.tags?.map((tag) => tag.value)}
          >
            {tags.map((tag) => (
              <SelectItem key={tag.value} value={tag.value}>
                {tag.title ?? tag.value}
              </SelectItem>
            ))}
          </Select>
          <Select
            name="albums"
            label="Albums"
            placeholder="Select albums"
            selectionMode="multiple"
            className="max-w-xs"
            defaultSelectedKeys={photo.albums?.map((album) => album.id)}
          >
            {albums.map((album) => (
              <SelectItem key={album.id} value={album.id}>
                {album.title}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="space-y-1">
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
        <div className="space-y-1">
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
        <div className="space-y-1">
          <SaveButton />
          {state.errorMessage && (
            <p className="text-danger">{state.errorMessage}</p>
          )}
          {state.successMessage && (
            <p className="text-success">{state.successMessage}</p>
          )}
          <CompressPhoto id={photo.id} url={photo.url} title={photo.title} />
          <DeletePhoto id={photo.id} />
        </div>
      </div>
    </form>
  );
};
