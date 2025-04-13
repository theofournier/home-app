import { Prisma } from "@prisma/client";
import prisma from "../../prisma";

export const updateTag = async (
  value: string,
  tag: Prisma.tagsUpdateInput
): Promise<void> => {
  await prisma.tags.update({
    where: {
      value,
    },
    data: {
      ...tag,
    },
  });
};
