import { sql } from "@vercel/postgres";
import { cache } from "react";

export const getLocations = cache(async (): Promise<string[]> => {
  const { rows } = await sql<{
    location: string;
  }>`SELECT DISTINCT(location) FROM photos ORDER BY location;`;

  return rows.map(({ location }) => location);
});
