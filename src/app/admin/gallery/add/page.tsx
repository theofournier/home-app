import { PATH_ADMIN_GALLERY_ADD_UPLOAD } from "@/config/path";
import NextLink from "next/link";

export default async function AdminGalleryAdd() {
  return (
    <div>
      <p>Add photos </p>
      <NextLink href={PATH_ADMIN_GALLERY_ADD_UPLOAD}>Upload photos</NextLink>
    </div>
  );
}
