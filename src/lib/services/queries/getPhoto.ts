import { mapPhotoTagsDB, Photo } from "../types";
import { cache } from "react";
import prisma from "../prisma";

export const getPhoto = cache(
  async (id: string): Promise<Photo | undefined> => {
    const photoDB = await prisma.photos.findUnique({
      include: {
        photos_tags: {
          include: { tags: true },
        },
      },
      where: {
        id,
      },
    });

    if (!photoDB) {
      return undefined;
    }

    return mapPhotoTagsDB(photoDB);
  }
);
