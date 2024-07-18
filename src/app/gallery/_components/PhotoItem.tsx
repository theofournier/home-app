import NextLink from "next/link";
import NextImage from "next/image";

import { Photo } from "@/lib/supabase/types";

type Props = {
  photo: Photo;
};

export const PhotoItem = ({ photo }: Props) => {
  return (
    <NextLink href={`/gallery/${photo.id}`} className="hover:opacity-75">
      <NextImage
        alt={photo.title ?? photo.id}
        src={photo.url}
        height={photo.height}
        width={photo.width}
        className="max-h-[600px]"
        style={{ objectFit: "contain" }}
      />
    </NextLink>
  );
};
