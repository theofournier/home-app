import { getPhotos } from "@/lib/services/queries/getPhotos";
import { NextPageProps } from "@/lib/types";
import { GallerySearchInput } from "./_components/GallerySearchInput";
import { GalleryFilterTags } from "./_components/GalleryFilterTags";
import { GalleryGrid } from "./_components/GalleryGrid";
import { GalleryFilterLocations } from "./_components/GalleryFilterLocations";
import { Metadata } from "next";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IconLayoutGrid, IconLayoutList } from "@tabler/icons-react";
import { GalleryDisplayButton } from "./_components/GalleryDisplayButton";
import { GalleryList } from "./_components/GalleryList";

type Props = {
  query?: string;
  tags?: string;
  locations?: string;
  display?: "list" | "grid";
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
  const display = searchParams.display ?? "grid";

  const photos = await getPhotos({
    query: searchQuery,
    tags: filterTags,
    locations: filterLocations,
  });

  return (
    <div className="container mb-4 mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-x-6">
      <div className="col-span-1 md:order-last">
        <div className="space-y-2 px-2 md:px-0 md:space-y-4 md:sticky md:top-16">
          <GalleryDisplayButton display={display} />
          <GallerySearchInput />
          <GalleryFilterTags />
          <GalleryFilterLocations />
        </div>
      </div>
      <div className="col-span-1 md:col-span-3">
        {display === "grid" ? (
          <GalleryGrid photos={photos} />
        ) : (
          <GalleryList photos={photos} />
        )}
      </div>
    </div>
  );
}
