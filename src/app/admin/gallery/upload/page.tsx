import { UploadPhotoForm } from "./_components/UploadPhotoForm";
import NextLink from "next/link";
import { PATH_ADMIN_GALLERY } from "@/config/path";
import { Metadata } from "next";
import { Button } from "@nextui-org/button";

export const metadata: Metadata = {
  title: "Admin - Upload",
};

export default async function AdminGalleryAddUpload() {
  return (
    <div className="px-2 md:px-4 space-y-4">
      <div className="flex flex-row items-center gap-4">
        <h1 className="text-lg font-semibold">Upload photos</h1>
        <Button>
          <NextLink href={PATH_ADMIN_GALLERY}>Go to admin gallery</NextLink>
        </Button>
      </div>
      <UploadPhotoForm />
    </div>
  );
}
