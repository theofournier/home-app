import { getPhotos } from "@/lib/services/queries/photo/getPhotos";
import { NextPageProps } from "@/lib/types";
import { GallerySearchInput } from "./_components/GallerySearchInput";
import { GalleryFilterTags } from "./_components/GalleryFilterTags";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryFilterLocations } from "./_components/GalleryFilterLocations";
import { Metadata } from "next";
import NextLink from "next/link";
import { PATH_GALLERY_ALBUMS } from "@/config/path";
import { Button } from "@nextui-org/button";
import { IconArrowRight, IconLibraryPhoto } from "@tabler/icons-react";

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
    <div className="container mb-4 mx-auto space-y-4">
      <Button
        as={NextLink}
        href={PATH_GALLERY_ALBUMS}
        startContent={<IconLibraryPhoto />}
        endContent={<IconArrowRight />}
        variant="solid"
        color="primary"
      >
        Go to Albums
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-x-6">
        <div className="col-span-1 md:order-last">
          <div className="space-y-2 px-2 md:px-0 md:space-y-4 md:sticky md:top-0">
            <GallerySearchInput />
            <GalleryFilterTags />
            <GalleryFilterLocations />
          </div>
        </div>
        <div className="col-span-1 md:col-span-3">
          <GalleryGrid photos={photos} />
        </div>
      </div>
    </div>
  );
}
