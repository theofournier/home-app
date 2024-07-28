import { mapTagDB, Tag } from "../types";
import { cache } from "react";
import prisma from "../prisma";

export const getTags = cache(async (): Promise<Tag[]> => {
  try {
    const tagsDB = await prisma.tags.findMany({
      orderBy: [{ title: "asc" }],
    });

    return tagsDB.map(mapTagDB);
  } catch (error) {
    console.log(`Error fetching tags: ${error}`);
    return [];
  }
});
