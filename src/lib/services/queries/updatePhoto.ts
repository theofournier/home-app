import { Prisma } from "@prisma/client";
import prisma from "../prisma";

export const updatePhoto = async (
  id: string,
  photo: Prisma.photosUpdateInput,
  tags?: string[],
  albums?: string[]
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

  if (albums) {
    await prisma.$transaction([
      prisma.photos_albums.deleteMany({
        where: {
          photo_id: id,
        },
      }),
      prisma.photos_albums.createMany({
        data: albums.map((album) => ({ photo_id: id, album_id: album })),
      }),
    ]);
  }
};
