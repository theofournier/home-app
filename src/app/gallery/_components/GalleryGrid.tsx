import { Photo } from "@/lib/supabase/types";
import { PhotoItem } from "./PhotoItem";

type Props = {
  photos: Photo[];
};

export const GalleryGrid = ({ photos }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
      {Array.from({ length: 3 }, (_, i) => i).map((i) => (
        <div key={`grid-${i}`} className="grid gap-2">
          {photos
            .filter((_, index) => index % 3 === i)
            .map((photo) => (
              <PhotoItem key={photo.id} photo={photo} />
            ))}
        </div>
      ))}
    </div>
  );
};
