import prisma from "../prisma";

export const deleteAlbum = async (id: string) => {
  return await prisma.albums.delete({
    where: { id },
  });
};
