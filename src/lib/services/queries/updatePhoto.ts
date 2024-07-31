import { Prisma } from "@prisma/client";
import prisma from "../prisma";

export const updatePhoto = async (
  id: string,
  photo: Prisma.photosUpdateInput,
  tags?: string[]
): Promise<void> => {
  await prisma.photos.update({
    where: {
      id,
    },
    data: {
      ...photo,
    },
  });

  if (tags) {
    await prisma.$transaction([
      prisma.photos_tags.deleteMany({
        where: {
          photo_id: id,
        },
      }),
      prisma.photos_tags.createMany({
        data: tags.map((tag) => ({ photo_id: id, tag_value: tag })),
      }),
    ]);
  }
};
