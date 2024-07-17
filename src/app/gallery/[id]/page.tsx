import NextImage from "next/image";

import { getPhoto } from "@/lib/supabase/queries/getPhoto";
import { notFound } from "next/navigation";

export default async function Photo({
  params: { id },
}: {
  params: { id: string };
}) {
  const photo = await getPhoto(id);

  if (!photo) {
    return notFound();
  }

  return (
    <NextImage
      alt={photo.title ?? photo.id}
      src={photo.url}
      height={photo.height}
      width={photo.width}
    />
  );
}
