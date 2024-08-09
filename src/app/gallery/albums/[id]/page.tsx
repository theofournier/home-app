import { Metadata, ResolvingMetadata } from "next";
import { getAlbum } from "@/lib/services/queries/getAlbum";
import { notFound } from "next/navigation";
import { NextPageProps } from "@/lib/types";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export async function generateMetadata(
  { params }: NextPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const album = await getAlbum(id);

  return {
    title: album?.title || "Album",
  };
}

export default async function AlbumPage({ params: { id } }: NextPageProps) {
  const album = await getAlbum(id);
  const photos = album?.photos;

  if (!album) {
    return notFound();
  }

  return (
    <div className="container mb-4 mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-x-6">
      <div className="col-span-1 md:order-last">
        <div className="space-y-3 px-2 md:px-0 md:sticky md:top-0">
          <h1 className="text-lg font-bold">{album.title}</h1>
          <p>{album.description}</p>
          <p>{album.date?.toDateString()}</p>
        </div>
      </div>
      <div className="col-span-1 md:col-span-3">
        {photos && photos.length > 0 ? (
          <GalleryGrid photos={photos} />
        ) : (
          <div>No photos</div>
        )}
      </div>
    </div>
  );
}
