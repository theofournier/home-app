import { mapPhotoFullDB, Photo } from "../../types";
import { cache } from "react";
import prisma from "../../prisma";

export const getPhoto = cache(
  async (id: string): Promise<Photo | undefined> => {
    try {
      const photoDB = await prisma.photos.findUnique({
        include: {
          photos_tags: {
            include: { tags: true },
          },
          photos_albums: {
            include: {
              albums: true,
            },
          },
        },
        where: {
          id,
        },
      });

      if (!photoDB) {
        return undefined;
      }

      return mapPhotoFullDB(photoDB);
    } catch (error) {
      console.log(`Error fetching photo id ${id}: ${error}`);
      return undefined;
    }
  }
);
