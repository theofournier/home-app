import { Prisma } from "@prisma/client";
import prisma from "../../prisma";

export const createTag = async (tag: Prisma.tagsCreateInput): Promise<void> => {
  await prisma.tags.create({
    data: tag,
  });
};
