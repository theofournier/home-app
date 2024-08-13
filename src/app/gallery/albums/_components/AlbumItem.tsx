import { Album } from "@/lib/services/types";
import NextLink from "next/link";
import { pathForAlbum } from "@/config/path";
import { CldImage } from "@/components/gallery/CldImage";

type Props = {
  album: Album;
};

export const AlbumItem = ({ album }: Props) => {
  return (
    <div>
      <NextLink
        href={pathForAlbum(album)}
        className="active:brightness-75 relative flex justify-center aspect-[1.5/1]"
      >
        <CldImage
          alt={album.title ?? album.id}
          src={album.coverUrl ?? "/album-cover.png"}
          style={{ objectFit: "cover" }}
          width={400}
          height={400 / 1.5}
        />
        <div className="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 bg-black/30" />
      </NextLink>
      <div className="mx-2">
        <h3 className="text-lg">{album.title}</h3>
        <span className="text-sm">{album.date?.toDateString()}</span>
      </div>
    </div>
  );
};
