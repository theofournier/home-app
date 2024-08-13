import { CldImage } from "@/components/gallery/CldImage";
import { pathForPhoto } from "@/config/path";
import { getRandomPhoto } from "@/lib/services/queries/photo/getRandomPhoto";
import NextLink from "next/link";

export default async function Home() {
  const randomPhoto = await getRandomPhoto();

  if (!randomPhoto) {
    return <div>Welcome</div>;
  }

  return (
    <NextLink href={pathForPhoto(randomPhoto)}>
      <div className="relative h-full">
        <CldImage
          fill
          sizes="100vw"
          alt={randomPhoto.title ?? randomPhoto.id}
          src={randomPhoto.url}
          style={{
            objectFit: "cover",
          }}
          priority
        />
      </div>
    </NextLink>
  );
}
