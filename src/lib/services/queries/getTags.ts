import { sql } from "@vercel/postgres";
import { mapTagDB, Tag, TagDB } from "../types";

export const getTags = async (): Promise<Tag[]> => {
  const { rows } = await sql<TagDB>`SELECT * FROM tags ORDER BY value;`;

  return rows.map(mapTagDB);
};
