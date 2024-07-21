import NextLink from "next/link";
import NextImage from "next/image";

import { Photo } from "@/lib/services/types";

type Props = {
  photo: Photo;
};

export const PhotoItem = ({ photo }: Props) => {
  return (
    <NextLink
      href={`/gallery/p/${photo.id}`}
      className="active:brightness-75 flex relative aspect-[1.5/1]"
    >
      <NextImage
        alt={photo.title ?? photo.id}
        src={photo.url}
        style={{ objectFit: "cover" }}
        width={400}
        height={400 / 1.5}
      />
      <div className="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 text-white flex flex-col justify-between bg-black/30 px-2 py-1">
        <div>
          <span className="text-xl">{photo.title}</span>
        </div>
        <div className="flex flex-row justify-between items-end">
          <p>{photo?.tags?.map((tag) => tag.title).join(" · ")}</p>
          <div className="flex flex-col items-end text-end">
            <span>{photo.location}</span>
            {photo.date && <span>{new Date(photo.date).toDateString()}</span>}
          </div>
        </div>
      </div>
    </NextLink>
  );
};
