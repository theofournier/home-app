import { mapPhotoDB, Photo } from "../types";
import { cache } from "react";
import prisma from "../prisma";

export const getRandomPhoto = cache(async (): Promise<Photo | undefined> => {
  const photosCount = await prisma.photos.count();

  const randomPhoto = await prisma.photos.findFirst({
    skip: Math.max(0, Math.floor(Math.random() * photosCount)),
  });

  if (!randomPhoto) {
    return undefined;
  }

  return mapPhotoDB(randomPhoto);
});
