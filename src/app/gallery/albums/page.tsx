import { NextPageProps } from "@/lib/types";
import { Metadata } from "next";
import { getAlbums } from "@/lib/services/queries/album/getAlbums";
import { AlbumItem } from "./_components/AlbumItem";

type Props = {
  query?: string;
};

export const metadata: Metadata = {
  title: "Albums",
};

export default async function AlbumsPage({
  searchParams,
}: NextPageProps<Props>) {
  const searchQuery = searchParams.query;

  const albums = await getAlbums({
    query: searchQuery,
  });

  return (
    <div className="container mb-4 mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5 sm:gap-1">
        {albums.map((album) => (
          <AlbumItem key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
}
