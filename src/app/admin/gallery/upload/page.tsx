import { UploadPhotoForm } from "./_components/UploadPhotoForm";
import NextLink from "next/link";
import { PATH_ADMIN_GALLERY } from "@/config/path";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Upload",
};

export default async function AdminGalleryAddUpload() {
  return (
    <div>
      <p>Upload photos </p>
      <NextLink href={PATH_ADMIN_GALLERY}>Go to admin gallery</NextLink>
      <UploadPhotoForm />
    </div>
  );
}
