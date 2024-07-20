import NextLink from "next/link";
import NextImage from "next/image";

import { Photo } from "@/lib/supabase/types";

type Props = {
  photo: Photo;
};

export const PhotoItem = ({ photo }: Props) => {
  return (
    <NextLink
      href={`/gallery/p/${photo.id}`}
      className="active:brightness-75 flex relative overflow-hidden aspect-[1.5/1]"
    >
      <NextImage
        alt={photo.title ?? photo.id}
        src={photo.url}
        style={{ objectFit: "cover" }}
        width={400}
        height={400 / 1.5}
      />
      <div className="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 text-white flex flex-col justify-between bg-black/40">
        <div className="p-1">
          <h2 className="text-2xl font-semibold">{photo.title}</h2>
        </div>
        <div className="flex flex-row justify-between items-end p-1">
          <p>{photo?.tags?.map((tag) => tag.title).join(", ")}</p>
          <div className="flex flex-col items-end">
            <h3 className="text-lg">{photo.location}</h3>
            <p>{photo.date}</p>
          </div>
        </div>
      </div>
    </NextLink>
  );
};
