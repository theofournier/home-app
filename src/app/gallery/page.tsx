import NextImage from "next/image";

import { getPhotos } from "@/lib/supabase/queries/getPhotos";

export default async function GalleryPage() {
  const photos = await getPhotos();

  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative w-full h-96">
              <NextImage
                fill
                alt={photo.title ?? photo.id}
                sizes="100vw"
                src={photo.url}
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
