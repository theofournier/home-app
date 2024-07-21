import { sql } from "@vercel/postgres";
import { mapPhotoDB, Photo, PhotoDB } from "../types";
import { cache } from "react";

export const getRandomPhoto = cache(async (): Promise<Photo | undefined> => {
  const { rows } = await sql<PhotoDB>`
  SELECT *
  FROM photos
  ORDER BY RANDOM() LIMIT 1;`;

  const photos: Photo[] = rows.map(mapPhotoDB);

  if (rows.length === 0) {
    return undefined;
  }

  return photos[0];
});
