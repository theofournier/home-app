import { getPhotos } from "@/lib/services/queries/photo/getPhotos";
import { EditPhotoItem } from "./_components/EditPhotoItem";
import { getTags } from "@/lib/services/queries/tag/getTags";
import NextLink from "next/link";
import {
  PATH_ADMIN_GALLERY,
  PATH_ADMIN_GALLERY_ALBUMS,
  PATH_ADMIN_GALLERY_UPLOAD,
} from "@/config/path";
import { Metadata } from "next";
import { Button } from "@nextui-org/button";
import { IconLibraryPhoto, IconUpload } from "@tabler/icons-react";
import { getAlbums } from "@/lib/services/queries/album/getAlbums";

export const metadata: Metadata = {
  title: "Admin - Gallery",
};

export default async function AdminGallery() {
  const photos = await getPhotos({ sort: "created_at" });
  const tags = await getTags();
  const albums = await getAlbums({});

  return (
    <div className="space-y-2">
      <div className="flex flex-row items-center gap-4 px-2 md:px-4">
        <h1 className="text-lg font-semibold">Admin gallery</h1>
        <Button
          startContent={<IconUpload />}
          as={NextLink}
          href={PATH_ADMIN_GALLERY_UPLOAD}
        >
          Upload photos
        </Button>
        <Button
          startContent={<IconLibraryPhoto />}
          as={NextLink}
          href={PATH_ADMIN_GALLERY_ALBUMS}
        >
          Manage albums
        </Button>
      </div>
      <div className="divide-y">
        {photos.map((photo) => (
          <EditPhotoItem
            key={photo.id}
            photo={photo}
            tags={tags}
            albums={albums}
          />
        ))}
      </div>
    </div>
  );
}
