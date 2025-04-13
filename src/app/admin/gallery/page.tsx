import { getPhotos } from "@/lib/services/queries/photo/getPhotos";
import { EditPhotoItem } from "./_components/EditPhotoItem";
import { getTags } from "@/lib/services/queries/tag/getTags";
import NextLink from "next/link";
import {
  PATH_ADMIN_GALLERY_ALBUMS,
  PATH_ADMIN_GALLERY_TAGS,
  PATH_ADMIN_GALLERY_UPLOAD,
} from "@/config/path";
import { Metadata } from "next";
import { Button } from "@nextui-org/button";
import { IconLibraryPhoto, IconTag, IconUpload } from "@tabler/icons-react";
import { getAlbums } from "@/lib/services/queries/album/getAlbums";
import { GallerySearchInput } from "@/app/gallery/(gallery)/_components/GallerySearchInput";
import { GalleryFilterTags } from "@/app/gallery/(gallery)/_components/GalleryFilterTags";
import { GalleryFilterLocations } from "@/app/gallery/(gallery)/_components/GalleryFilterLocations";
import { NextPageProps } from "@/lib/types";
import { GalleryPagination } from "@/components/gallery/GalleryPagination";

type Props = {
  query?: string;
  tags?: string;
  locations?: string;
  page?: string;
};

export const metadata: Metadata = {
  title: "Admin - Gallery",
};

export default async function AdminGallery({
  searchParams,
}: NextPageProps<Props>) {
  const searchQuery = searchParams.query;
  const filterTags = searchParams.tags?.split(",");
  const filterLocations = searchParams.locations?.split(",");
  const page = +(searchParams.page ?? 1);

  const { photos, pageCount } = await getPhotos({
    sort: "created_at",
    query: searchQuery,
    tags: filterTags,
    locations: filterLocations,
    page,
  });
  const tags = await getTags();
  const albums = await getAlbums({});

  return (
    <div className="space-y-2">
      <div className="flex flex-row items-center gap-4 px-2 md:px-4">
        <h1 className="text-lg font-semibold">Admin gallery</h1>
        <Button
          startContent={<IconUpload />}
          as={NextLink}
          href={PATH_ADMIN_GALLERY_UPLOAD}
        >
          Upload photos
        </Button>
        <Button
          startContent={<IconLibraryPhoto />}
          as={NextLink}
          href={PATH_ADMIN_GALLERY_ALBUMS}
        >
          Manage albums
        </Button>
        <Button
          startContent={<IconTag />}
          as={NextLink}
          href={PATH_ADMIN_GALLERY_TAGS}
        >
          Manage tags
        </Button>
      </div>
      <div className="space-y-4">
        <GallerySearchInput />
        <GalleryFilterTags />
        <GalleryFilterLocations />
      </div>
      <div className="divide-y">
        {photos.map((photo) => (
          <EditPhotoItem
            key={photo.id}
            photo={photo}
            tags={tags}
            albums={albums}
          />
        ))}
      </div>
      <GalleryPagination page={page} total={pageCount} />
    </div>
  );
}
