import { sql } from "@vercel/postgres";
import { mapPhotoDB, Photo, PhotoDB } from "../types";

export const getPhoto = async (id: string): Promise<Photo | undefined> => {
  const { rows } =
    await sql<PhotoDB>`SELECT * FROM photos WHERE id = ${id};`;

  if (rows.length === 0) {
    return undefined;
  }

  return mapPhotoDB(rows[0]);
};
