import { Photo } from "@/lib/services/types";
import NextLink from "next/link";
import NextImage from "next/image";
import { pathForPhoto } from "@/config/path";

type PhotoItemProps = {
  photo: Photo;
};

const PhotoItem = ({ photo }: PhotoItemProps) => {
  return (
    <div>
      <NextLink
        href={pathForPhoto(photo)}
        className="active:brightness-75 flex justify-center"
      >
        <NextImage
          alt={photo.title ?? photo.id}
          src={photo.urlCompressed ?? photo.url}
          style={{ objectFit: "cover" }}
          width={400}
          height={400 / 1.5}
        />
      </NextLink>
      <div className="mx-2">
        <h3 className="text-lg">{photo.title}</h3>
        <div className="flex flex-row gap-2">
          <span className="text-sm">{photo.location}</span>
          {photo.date && (
            <span className="text-sm">
              · {new Date(photo.date).toDateString()}
            </span>
          )}
        </div>
        <p className="text-sm">
          {photo?.tags?.map((tag) => tag.title).join(" · ")}
        </p>
      </div>
    </div>
  );
};

type Props = {
  photos: Photo[];
};

export const GalleryList = ({ photos }: Props) => {
  return (
    <div className="space-y-4">
      {photos.map((photo) => (
        <PhotoItem key={photo.id} photo={photo} />
      ))}
    </div>
  );
};
