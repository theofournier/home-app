import { getPhotos } from "@/lib/services/queries/getPhotos";
import { NextPageProps } from "@/lib/types";
import { GallerySearchInput } from "./_components/GallerySearchInput";
import { GalleryFilterTags } from "./_components/GalleryFilterTags";
import { GalleryGrid } from "./_components/GalleryGrid";
import { GalleryFilterLocations } from "./_components/GalleryFilterLocations";
import { Metadata } from "next";

type Props = {
  query?: string;
  tags?: string;
  locations?: string;
};

export const metadata: Metadata = {
  title: "Gallery",
};

export default async function GalleryPage({
  searchParams,
}: NextPageProps<Props>) {
  const searchQuery = searchParams.query;
  const filterTags = searchParams.tags?.split(",");
  const filterLocations = searchParams.locations?.split(",");

  const photos = await getPhotos({
    query: searchQuery,
    tags: filterTags,
    locations: filterLocations,
  });

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-x-6">
      <div className="col-span-1 md:order-last">
        <div className="space-y-2 px-2 md:px-0 md:space-y-4 md:sticky md:top-16">
          <GallerySearchInput />
          <GalleryFilterTags />
          <GalleryFilterLocations />
        </div>
      </div>
      <div className="col-span-1 md:col-span-3">
        <GalleryGrid photos={photos} />
      </div>
    </div>
  );
}
