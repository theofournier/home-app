import { photos } from "@prisma/client";
import prisma from "../prisma";
import { auth } from "@/lib/auth/auth";

export const updatePhoto = async (
  { id, ...photo }: Omit<photos, "created_at">,
  tags: string[]
): Promise<void> => {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }

  await prisma.photos.update({
    where: {
      id,
    },
    data: {
      ...photo,
    },
  });

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
};
