import { cache } from "react";
import prisma from "../../prisma";

export const getLocations = cache(async (): Promise<string[]> => {
  try {
    const locationsDB = await prisma.photos.findMany({
      select: {
        location: true,
      },
      distinct: ["location"],
      where: {
        location: { not: null },
      },
      orderBy: [{ location: "asc" }],
    });

    return locationsDB.map(({ location }) => location!);
  } catch (error) {
    console.log(`Error fetching locations: ${error}`);
    return [];
  }
});
