import { getPhotos } from "@/lib/services/queries/getPhotos";
import { EditPhotoItem } from "./_components/EditPhotoItem";
import { getTags } from "@/lib/services/queries/getTags";
import NextLink from "next/link";
import { PATH_ADMIN_GALLERY_ADD } from "@/config/path";

export default async function AdminGallery() {
  const photos = await getPhotos({});
  const tags = await getTags();
  return (
    <div>
      Admin gallery
      <NextLink href={PATH_ADMIN_GALLERY_ADD}>Add photos</NextLink>
      <div className="divide-y">
        {photos.map((photo) => (
          <EditPhotoItem key={photo.id} photo={photo} tags={tags} />
        ))}
      </div>
    </div>
  );
}
