import prisma from "../../prisma";

export const deleteTag = async (value: string) => {
  return await prisma.tags.delete({
    where: { value },
  });
};
