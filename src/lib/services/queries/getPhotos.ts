import { sql } from "@vercel/postgres";
import { mapPhotoTagsDB, Photo, PhotoTagsDB } from "../types";
import { cache } from "react";

type GetPhotosParams = {
  query?: string;
  tags?: string[];
  locations?: string[];
};

export const getPhotos = cache(
  async ({ query, tags, locations }: GetPhotosParams): Promise<Photo[]> => {
    const { rows } = await sql<PhotoTagsDB>`
  SELECT *, 
  (SELECT array_agg(json_build_object('value', t.value, 'title', t.title, 'description', t.description)) 
    FROM photos_tags pt JOIN tags t ON t.value = pt.tag_value 
    WHERE p.id = pt.photo_id)  as tags
  FROM photos p
  ORDER BY date DESC;`;

    const photos: Photo[] = rows.map(mapPhotoTagsDB);

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
  }
);
