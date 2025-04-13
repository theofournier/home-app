import { mapPhotoFullDB, Photo } from "../../types";
import { cache } from "react";
import _ from "lodash";
import prisma from "../../prisma";

type GetPhotosParams = {
  query?: string;
  tags?: string[];
  locations?: string[];
  sort?: string;
  page?: number;
  pageSize?: number;
};

type GetPhotosResponse = {
  photos: Photo[];
  totalCount: number;
  page: number;
  pageSize: number;
  pageCount: number;
};

const PAGE_SIZE = 30;

export const getPhotos = cache(
  async ({
    query,
    tags,
    locations,
    sort = "date",
    page = 1,
    pageSize = PAGE_SIZE,
  }: GetPhotosParams): Promise<GetPhotosResponse> => {
    try {
      const where = {
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
      };

      const [photosDB, totalCount] = await prisma.$transaction([
        prisma.photos.findMany({
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
          where,
          orderBy: [{ [sort]: "desc" }],
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
        prisma.photos.count({ where }),
      ]);

      const photos: Photo[] = photosDB.map(mapPhotoFullDB);

      return {
        photos,
        page,
        pageSize,
        totalCount,
        pageCount: _.ceil(totalCount / pageSize),
      };
    } catch (error) {
      console.log(`Error fetching photos: ${error}`);
      return { photos: [], page, pageSize, totalCount: 0, pageCount: 0 };
    }
  }
);
