import { getPhotos } from "@/lib/supabase/queries/getPhotos";
import { NextPageProps } from "@/lib/types";
import { GallerySearchInput } from "./_components/GallerySearchInput";
import { GalleryFilterTags } from "./_components/GalleryFilterTags";
import { GalleryGrid } from "./_components/GalleryGrid";
import { GalleryFilterLocations } from "./_components/GalleryFilterLocations";

type Props = {
  query?: string;
  tags?: string;
  locations?: string;
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
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-x-4 lg:gap-x-6">
      <div className="col-span-1 md:col-span-3">
        <GalleryGrid photos={photos} />
      </div>
      <div className="col-span-1 hidden md:block">
        <div className="space-y-4 sticky top-16">
          <GallerySearchInput />
          <GalleryFilterTags />
          <GalleryFilterLocations />
        </div>
      </div>
    </div>
  );
}
