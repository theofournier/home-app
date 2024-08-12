import { Album, mapAlbumFullDB } from "../types";
import { cache } from "react";
import prisma from "../prisma";

export const getAlbum = cache(
  async (id: string): Promise<Album | undefined> => {
    try {
      const albumDB = await prisma.albums.findUnique({
        include: {
          photos_albums: {
            include: {
              photos: {
                include: {
                  photos_tags: {
                    include: {
                      tags: true,
                    },
                  },
                },
              },
            },
          },
        },
        where: {
          id,
        },
      });

      if (!albumDB) {
        return undefined;
      }

      return mapAlbumFullDB(albumDB);
    } catch (error) {
      console.log(`Error fetching album id ${id}: ${error}`);
      return undefined;
    }
  }
);
