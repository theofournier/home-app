import { getPhotos } from "@/lib/services/queries/getPhotos";
import { EditPhotoItem } from "./_components/EditPhotoItem";
import { getTags } from "@/lib/services/queries/getTags";

export default async function AdminGallery() {
  const photos = await getPhotos({});
  const tags = await getTags();
  return (
    <div>
      Admin gallery
      <div className="divide-y">
        {photos.map((photo) => (
          <EditPhotoItem key={photo.id} photo={photo} tags={tags} />
        ))}
      </div>
    </div>
  );
}
