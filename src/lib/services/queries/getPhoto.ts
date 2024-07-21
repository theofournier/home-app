import { sql } from "@vercel/postgres";
import { mapPhotoDB, mapPhotoTagsDB, Photo, PhotoTagsDB } from "../types";

export const getPhoto = async (id: string): Promise<Photo | undefined> => {
  const { rows } = await sql<PhotoTagsDB>`SELECT *, 
    (SELECT array_agg(json_build_object('value', t.value, 'title', t.title, 'description', t.description)) 
    FROM photos_tags pt JOIN tags t ON t.value = pt.tag_value 
    WHERE p.id = pt.photo_id)  as tags 
    FROM photos p 
    WHERE id = ${id};`;

  if (rows.length === 0) {
    return undefined;
  }

  return mapPhotoTagsDB(rows[0]);
};
