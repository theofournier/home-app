import { getPhotos } from "@/lib/supabase/queries/getPhotos";
import NextImage from "next/image";
import NextLink from "next/link";

export default async function GalleryPage() {
  const photos = await getPhotos();

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
        {photos.map((photo) => (
          <NextLink
            key={photo.id}
            href={`/gallery/${photo.id}`}
            className="hover:opacity-75"
          >
            <NextImage
              alt={photo.title ?? photo.id}
              src={photo.url}
              height={photo.height}
              width={photo.width}
            />
          </NextLink>
        ))}
      </div>
    </div>
  );
}
