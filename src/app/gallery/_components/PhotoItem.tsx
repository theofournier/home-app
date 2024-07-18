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
      <div className="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 text-white flex flex-col justify-between bg-black/40">
        <div className="p-1 mx-auto">
          <h2 className="text-2xl font-semibold">{photo.title}</h2>
        </div>
        <div className="flex flex-row justify-between items-end p-1">
          <p>{photo?.tags?.map((tag) => tag.description).join(", ")}</p>
          <div className="flex flex-col items-end">
            <h3 className="text-lg">{photo.location}</h3>
            <p>{photo.date}</p>
          </div>
        </div>
      </div>
    </NextLink>
  );
};
