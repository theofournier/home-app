import { sql } from "@vercel/postgres";
import { PhotoDB } from "../types";

export const editPhoto = async (
  photo: Omit<PhotoDB, "created_at">
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
};
