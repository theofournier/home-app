import { Metadata } from "next";
import { getAlbums } from "@/lib/services/queries/getAlbums";
import { EditAlbumItem } from "./_components/EditAlbumItem";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import { PATH_ADMIN_GALLERY } from "@/config/path";
import { CreateAlbumForm } from "./_components/CreateAlbumForm";

export const metadata: Metadata = {
  title: "Admin - Albums",
};

export default async function AdminAlbums() {
  const albums = await getAlbums({ sort: "created_at" });

  return (
    <div className="space-y-2">
      <div className="flex flex-row items-center gap-4">
        <h1 className="text-lg font-semibold">Manage albums</h1>
        <Button as={NextLink} href={PATH_ADMIN_GALLERY}>
          Go to admin gallery
        </Button>
      </div>
      <div>
        <h2 className="font-semibold">Create album</h2>
        <CreateAlbumForm />
      </div>

      <div>
        <h2 className="font-semibold">Update albums</h2>
        <div className="divide-y">
          {albums.map((album) => (
            <EditAlbumItem key={album.id} album={album} />
          ))}
        </div>
      </div>
    </div>
  );
}
