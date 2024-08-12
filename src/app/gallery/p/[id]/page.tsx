import NextImage from "next/image";
import NextLink from "next/link";

import { getPhoto } from "@/lib/services/queries/getPhoto";
import { notFound } from "next/navigation";
import {
  IconBuilding,
  IconLibraryPhoto,
  IconTagFilled,
} from "@tabler/icons-react";
import { Metadata, ResolvingMetadata } from "next";
import { pathForAlbum } from "@/config/path";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const photo = await getPhoto(id);

  return {
    title: photo?.title || "Gallery",
  };
}

export default async function Photo({ params: { id } }: Props) {
  const photo = await getPhoto(id);

  if (!photo) {
    return notFound();
  }

  const photoAspectRatio = photo.width / photo.height;

  return (
    <div className="container mb-4 mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
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
              src={photo.urlCompressed ?? photo.url}
              style={{
                objectFit: "contain",
              }}
              height={600}
              width={photoAspectRatio * 600}
            />
          </NextLink>
        </div>
      </div>
      <div className="col-span-1 px-2 md:p-0">
        <div className="grid grid-cols-2 md:grid-cols-1 gap-x-1 gap-y-4 md:sticky md:top-0">
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
            {photo.albums && photo.albums?.length > 0 && (
              <div className="flex flex-row items-center gap-2">
                <IconLibraryPhoto size="1.1rem" />
                <div className="flex flex-col items-start">
                  {photo.albums.map((album) => (
                    <NextLink key={album.id} href={pathForAlbum(album)}>
                      {album.title}
                    </NextLink>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <ul>
              {photo.exifData?.focalLength && (
                <li>{photo.exifData?.focalLength}mm</li>
              )}
              {photo.exifData?.fNumber && <li>ƒ/{photo.exifData?.fNumber}</li>}
              {photo.exifData?.exposure && <li>{photo.exifData?.exposure}s</li>}
              {photo.exifData?.iso && <li>ISO {photo.exifData?.iso}</li>}
              <li>
                {photo.width} x {photo.height}
              </li>
            </ul>
            {photo.date && <p>{photo.date.toDateString()}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
