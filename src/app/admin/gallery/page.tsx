import { getPhotos } from "@/lib/services/queries/getPhotos";
import { EditPhotoItem } from "./_components/EditPhotoItem";

export default async function AdminGallery() {
  const photos = await getPhotos({});
  return (
    <div>
      Admin gallery
      <div className="divide-y">
        {photos.map((photo) => (
          <EditPhotoItem key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
}
