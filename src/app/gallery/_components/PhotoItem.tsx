import NextLink from "next/link";
import NextImage from "next/image";

import { Photo } from "@/lib/supabase/types";

type Props = {
  photo: Photo;
};

export const PhotoItem = ({ photo }: Props) => {
  return (
    <NextLink href={`/gallery/${photo.id}`} className="relative my-auto">
      <NextImage
        alt={photo.title ?? photo.id}
        src={photo.url}
        height={photo.height}
        width={photo.width}
        className="max-h-[600px]"
        style={{ objectFit: "cover" }}
      />
      <div className="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 text-white flex flex-col justify-between">
        <div className="bg-gradient-to-b  from-black/50 p-1">
          <h2 className="text-2xl font-semibold">{photo.title}</h2>
          <h3 className="text-lg">{photo.location}</h3>
        </div>
        {photo.tags && photo.tags.length > 0 ? (
          <div className="bg-gradient-to-t  from-black/50 p-1">
            <p>{photo.tags.map((tag) => tag.description).join(", ")}</p>
          </div>
        ) : null}
      </div>
    </NextLink>
  );
};
