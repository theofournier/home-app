import { getPhotos } from "@/lib/supabase/queries/getPhotos";
import { NextPageProps } from "@/lib/types";
import { redirect } from "next/navigation";
import { GallerySearchInput } from "./_components/GallerySearchInput";
import { GallerySearchTags } from "./_components/GallerySearchTags";
import { GalleryGrid } from "./_components/GalleryGrid";

type Props = {
  query?: string;
  tags?: string;
};

export default async function GalleryPage({
  searchParams,
}: NextPageProps<Props>) {
  const searchQuery = searchParams.query;
  const searchTags = searchParams.tags?.split(",");

  const photos = await getPhotos({
    query: searchQuery,
    tags: searchTags,
  });

  const onSearch = async (formData: FormData) => {
    "use server";

    const query = formData.get("query") ?? searchQuery;
    const tags = formData.getAll("tags") ?? searchTags;

    const params = Object.entries({ query, tags: tags.join(",") })
      .filter(([key, value]) => Boolean(value) === true)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    redirect(`/gallery?${params}`);
  };

  return (
    <div className="container mx-auto px-4">
      <GallerySearchInput onSearch={onSearch} searchQuery={searchQuery} />
      <GallerySearchTags onSearch={onSearch} searchTags={searchTags} />
      <GalleryGrid photos={photos} />
    </div>
  );
}
