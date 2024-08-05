import { getPhotos } from "@/lib/services/queries/getPhotos";
import { EditPhotoItem } from "./_components/EditPhotoItem";
import { getTags } from "@/lib/services/queries/getTags";
import NextLink from "next/link";
import { PATH_ADMIN_GALLERY_UPLOAD } from "@/config/path";
import { Metadata } from "next";
import { Button } from "@nextui-org/button";
import { IconUpload } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Admin - Gallery",
};

export default async function AdminGallery() {
  const photos = await getPhotos({ sort: "created_at" });
  const tags = await getTags();
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
      </div>
      <div className="divide-y">
        {photos.map((photo) => (
          <EditPhotoItem key={photo.id} photo={photo} tags={tags} />
        ))}
      </div>
    </div>
  );
}
