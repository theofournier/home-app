import { Prisma } from "@prisma/client";
import prisma from "../prisma";

export const updateAlbum = async (
  id: string,
  album: Prisma.albumsUpdateInput
): Promise<void> => {
  await prisma.albums.update({
    where: {
      id,
    },
    data: {
      ...album,
    },
  });
};
