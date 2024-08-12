"use client";

import NextImage from "next/image";
import NextLink from "next/link";

import { Album } from "@/lib/services/types";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { pathForAlbum } from "@/config/path";
import { useFormState, useFormStatus } from "react-dom";
import { DeleteAlbum } from "./DeleteAlbum";
import { editAlbumAction } from "@/lib/actions/album/editAlbumAction";

type Props = {
  album: Album;
};

const SaveButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending} color="primary">
      Save
    </Button>
  );
};

export const EditAlbumItem = ({ album }: Props) => {
  const [state, formAction] = useFormState(editAlbumAction, {
    errorMessage: "",
    successMessage: "",
  });
  return (
    <form action={formAction}>
      <input name="albumId" value={album.id} hidden aria-hidden readOnly />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2 md:p-4">
        <div className="space-y-1">
          <NextLink
            href={pathForAlbum(album)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <NextImage
              alt={album.title ?? album.id}
              src={album.coverUrl ?? "/album-cover.png"}
              style={{ objectFit: "cover", aspectRatio: "1.5/1" }}
              width={200}
              height={200 / 1.5}
            />
          </NextLink>
          <Input
            name="coverUrl"
            label="Cover URL"
            defaultValue={album.coverUrl}
          />
        </div>
        <div className="space-y-1">
          <Input
            name="title"
            label="Title"
            defaultValue={album.title}
            isRequired
          />
          <Textarea
            name="description"
            label="Description"
            defaultValue={album.description}
          />
          <Input
            name="date"
            label="Date"
            defaultValue={album.date?.toISOString()}
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
          <DeleteAlbum id={album.id} />
        </div>
      </div>
    </form>
  );
};
