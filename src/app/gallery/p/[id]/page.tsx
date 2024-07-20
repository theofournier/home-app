import NextImage from "next/image";
import NextLink from "next/link";

import { getPhoto } from "@/lib/supabase/queries/getPhoto";
import { notFound } from "next/navigation";

export default async function Photo({
  params: { id },
}: {
  params: { id: string };
}) {
  const photo = await getPhoto(id);

  if (!photo) {
    return notFound();
  }

  const photoAspectRatio = photo.width / photo.height;

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="col-span-1 md:col-span-3">
        <div className="flex justify-center">
          <NextLink
            href={photo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-zoom-in"
          >
            <NextImage
              alt={photo.title ?? photo.id}
              src={photo.url}
              style={{
                objectFit: "contain",
              }}
              height={600}
              width={photoAspectRatio * 600}
            />
          </NextLink>
        </div>
      </div>
      <div className="col-span-1 md:col-span-1">
        <div className="grid grid-cols-2 md:grid-cols-1 gap-1 sticky top-16">
          <div>
            <h1>{photo.title}</h1>
            <p>{photo.description}</p>
            <p>{photo.tags?.map((tag) => tag.title).join(", ")}</p>
            <p>{photo.location}</p>
          </div>
          <div>
            <h1>{photo.exposure}</h1>
            <p>
              w: {photo.width} x h:{photo.height}
            </p>
            <p>{photo.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
