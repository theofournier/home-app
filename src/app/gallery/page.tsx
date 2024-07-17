import { getPhotos } from "@/lib/supabase/queries/getPhotos";
import { Gallery } from "./_components/gallery";

export default async function GalleryPage() {
  const photos = await getPhotos();

  return (
    <div className="container mx-auto px-4">
      <Gallery photos={photos} />
    </div>
  );
}
