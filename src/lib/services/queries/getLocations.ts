import { sql } from "@vercel/postgres";

export const getLocations = async (): Promise<string[]> => {
  const { rows } = await sql<{
    location: string;
  }>`SELECT DISTINCT(location) FROM photos ORDER BY location;`;

  return rows.map(({ location }) => location);
};
