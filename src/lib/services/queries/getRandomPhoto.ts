import { sql } from "@vercel/postgres";
import { mapPhotoDB, Photo, PhotoDB } from "../types";

export const getRandomPhoto = async (): Promise<Photo | undefined> => {
  const { rows } = await sql<PhotoDB>`
  SELECT *
  FROM photos
  ORDER BY RANDOM() LIMIT 1;`;

  const photos: Photo[] = rows.map(mapPhotoDB);

  if (rows.length === 0) {
    return undefined;
  }

  return photos[0];
};
