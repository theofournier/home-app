import { mapPhotoTagsDB, Photo } from "../types";
import { cache } from "react";
import prisma from "../prisma";

type GetPhotosParams = {
  query?: string;
  tags?: string[];
  locations?: string[];
  sort?: string;
};

export const getPhotos = cache(
  async ({
    query,
    tags,
    locations,
    sort = "date",
  }: GetPhotosParams): Promise<Photo[]> => {
    const photosDB = await prisma.photos.findMany({
      include: {
        photos_tags: {
          include: {
            tags: true,
          },
        },
      },
      where: {
        title: {
          search: query,
        },
        location: {
          in: locations,
        },
        ...(tags && tags.length > 0
          ? {
              photos_tags: {
                some: {
                  tag_value: {
                    in: tags,
                  },
                },
              },
            }
          : undefined),
      },
      orderBy: [{ [sort]: "desc" }],
    });

    const photos: Photo[] = photosDB.map(mapPhotoTagsDB);

    return photos;
  }
);
