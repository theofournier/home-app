import { Photo } from "@/lib/services/types";
import NextLink from "next/link";
import { pathForPhoto } from "@/config/path";
import { CldImage } from "./CldImage";

type PhotoItemProps = {
  photo: Photo;
};

const PhotoItem = ({ photo }: PhotoItemProps) => {
  return (
    <NextLink
      href={pathForPhoto(photo)}
      className="active:brightness-75 flex relative aspect-[1.5/1]"
    >
      <CldImage
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
            {photo.date && <span>{photo.date.toDateString()}</span>}
          </div>
        </div>
      </div>
    </NextLink>
  );
};

type Props = {
  photos: Photo[];
};

export const GalleryGrid = ({ photos }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5 sm:gap-1">
      {photos.map((photo) => (
        <PhotoItem key={photo.id} photo={photo} />
      ))}
    </div>
  );
};
