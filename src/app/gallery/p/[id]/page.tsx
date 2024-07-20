import NextImage from "next/image";
import NextLink from "next/link";

import { getPhoto } from "@/lib/supabase/queries/getPhoto";
import { notFound } from "next/navigation";
import { IconBuilding, IconTagFilled } from "@tabler/icons-react";

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
      <div className="col-span-1">
        <div className="grid grid-cols-2 md:grid-cols-1 gap-x-1 gap-y-4 sticky top-16">
          <div className="space-y-4">
            <div>
              <h1 className="text-lg font-bold">{photo.title}</h1>
              <p>{photo.description}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <IconBuilding size="1.1rem" />
              <p>{photo.location}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <IconTagFilled size="1.1rem" />
              <p>{photo.tags?.map((tag) => tag.title).join(" · ")}</p>
            </div>
          </div>
          <div className="space-y-4">
            <ul>
              <li>{photo.exifData?.focalLength}mm</li>
              <li>ƒ/{photo.exifData?.fNumber}</li>
              <li>{photo.exifData?.exposure}s</li>
              <li>ISO {photo.exifData?.iso}</li>
              <li>
                {photo.width} x {photo.height}
              </li>
            </ul>
            {photo.date && <p>{new Date(photo.date).toDateString()}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
