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
    <section className="relative h-full">
      <NextImage
        fill
        alt={photo.title ?? photo.id}
        sizes="100vw"
        src={photo.url}
        style={{
          objectFit: "cover",
        }}
      />
    </section>
  );
}
