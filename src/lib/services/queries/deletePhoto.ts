import prisma from "../prisma";

export const deletePhoto = async (id: string) => {
  return await prisma.photos.delete({
    where: { id },
  });
};
