import { Prisma } from "@prisma/client";
import prisma from "../prisma";
import { auth } from "@/lib/auth/auth";

export const createPhotos = async (photosDB: Prisma.photosCreateInput[]) => {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }
  await prisma.photos.createMany({
    data: photosDB,
  });
};
