import { pathForPhoto } from "@/config/path";
import { getRandomPhoto } from "@/lib/services/queries/photo/getRandomPhoto";
import NextImage from "next/image";
import NextLink from "next/link";

export default async function Home() {
  const randomPhoto = await getRandomPhoto();

  if (!randomPhoto) {
    return <div>Welcome</div>;
  }

  return (
    <NextLink href={pathForPhoto(randomPhoto)}>
      <div className="relative h-full">
        <NextImage
          fill
          sizes="100vw"
          alt={randomPhoto.title ?? randomPhoto.id}
          src={randomPhoto.urlCompressed ?? randomPhoto.url}
          style={{
            objectFit: "cover",
          }}
          priority
        />
      </div>
    </NextLink>
  );
}
