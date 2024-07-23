import { Prisma } from "@prisma/client";
import prisma from "../prisma";

export const createPhotos = async (photosDB: Prisma.photosCreateInput[]) => {
  await prisma.photos.createMany({
    data: photosDB,
  });
};
