import { Photo } from "@/lib/supabase/types";
import { PhotoItem } from "./PhotoItem";

type Props = {
  photos: Photo[];
};

export const GalleryGrid = ({ photos }: Props) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
      {photos.map((photo) => (
        <PhotoItem key={photo.id} photo={photo} />
      ))}
    </div>
  );
};
