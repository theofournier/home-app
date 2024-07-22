import { sql } from "@vercel/postgres";
import { PhotoDB } from "../types";
import { expand } from "../helpers";

export const updatePhoto = async (
  photo: Omit<PhotoDB, "created_at">,
  tags: string[]
): Promise<void> => {
  await sql`UPDATE photos
    SET url = ${photo.url}, height = ${photo.height}, width = ${photo.width},
    title = ${photo.title}, description = ${photo.description}, location = ${
    photo.location
  },
    exposure = ${photo.exposure}, focal_length = ${
    photo.focal_length
  }, f_number = ${photo.f_number},
    iso = ${photo.iso}, date = ${photo.date?.toISOString()}
    WHERE id = ${photo.id};`;

  if (tags.length > 0) {
    await sql.query(
      `INSERT INTO photos_tags (photo_id, tag_value) VALUES ${expand(
        tags.length,
        2
      )} ON CONFLICT (photo_id, tag_value) DO NOTHING;`,
      tags.map((tag) => [photo.id, tag]).flat()
    );

    console.log([photo.id, ...tags.map((tag) => tag)]);

    await sql.query(
      `DELETE FROM photos_tags
              WHERE photo_id = $1
              AND tag_value NOT IN (${expand(1, tags.length, 2)});`,
      [photo.id, ...tags.map((tag) => tag)]
    );
  } else {
    await sql`DELETE FROM photos_tags
              WHERE photo_id = ${photo.id};`;
  }
};
