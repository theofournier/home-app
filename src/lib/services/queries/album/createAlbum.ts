import { Prisma } from "@prisma/client";
import prisma from "../../prisma";

export const createAlbum = async (
  album: Prisma.albumsCreateInput
): Promise<void> => {
  await prisma.albums.create({
    data: album,
  });
};
