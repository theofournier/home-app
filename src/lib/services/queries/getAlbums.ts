import { Album, mapAlbumDB } from "../types";
import { cache } from "react";
import prisma from "../prisma";

type GetAlbumsParams = {
  query?: string;
  sort?: "date" | "created_at";
};

export const getAlbums = cache(
  async ({ query, sort = "date" }: GetAlbumsParams): Promise<Album[]> => {
    try {
      const albumsDB = await prisma.albums.findMany({
        where: {
          title: {
            search: query,
          },
        },
        orderBy: [{ [sort]: "desc" }],
      });

      const albums: Album[] = albumsDB.map(mapAlbumDB);

      return albums;
    } catch (error) {
      console.log(`Error fetching albums: ${error}`);
      return [];
    }
  }
);
