import { getRandomPhoto } from "@/lib/services/queries/getRandomPhoto";
import NextImage from "next/image";
import NextLink from "next/link";

export default async function Home() {
  const randomPhoto = await getRandomPhoto();

  if (!randomPhoto) {
    return <div>Welcome</div>;
  }

  return (
    <section className="relative h-full">
      <NextLink href={`/gallery/p/${randomPhoto.id}`}>
        <NextImage
          fill
          sizes="100vw"
          alt={randomPhoto.title ?? randomPhoto.id}
          src={randomPhoto.url}
          style={{
            objectFit: "cover",
          }}
          priority
        />
      </NextLink>
    </section>
  );
}
