import { sql } from "@vercel/postgres";
import { mapPhotoDB, Photo, PhotoDB } from "../types";

type GetPhotosParams = {
  query?: string;
  tags?: string[];
  locations?: string[];
};

export const getPhotos = async ({
  query,
  tags,
  locations,
}: GetPhotosParams): Promise<Photo[]> => {
  const { rows } = await sql<PhotoDB>`SELECT * FROM photos;`;

  const photos: Photo[] = rows.map(mapPhotoDB);

  return photos
    .filter((photo) => (query ? photo.title === query : true))
    .filter((photo) =>
      tags && tags.length > 0
        ? photo.tags?.some((tag) => tags?.includes(tag.value ?? ""))
        : true
    )
    .filter((photo) =>
      locations && locations.length > 0
        ? locations.includes(photo.location ?? "")
        : true
    );
};
