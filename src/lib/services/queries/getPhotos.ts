import { mapPhotoFullDB, Photo } from "../types";
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
    try {
      const photosDB = await prisma.photos.findMany({
        include: {
          photos_tags: {
            include: {
              tags: true,
            },
          },
          photos_albums: {
            include: {
              albums: true,
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


      const photos: Photo[] = photosDB.map(mapPhotoFullDB);

      return photos;
    } catch (error) {
      console.log(`Error fetching photos: ${error}`);
      return [];
    }
  }
);
