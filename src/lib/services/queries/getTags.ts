import { sql } from "@vercel/postgres";
import { mapTagDB, Tag, TagDB } from "../types";
import { cache } from "react";

export const getTags = cache(async (): Promise<Tag[]> => {
  const { rows } = await sql<TagDB>`SELECT * FROM tags ORDER BY value;`;

  return rows.map(mapTagDB);
});
