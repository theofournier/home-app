import { Photo } from "@/lib/services/types";

export const PATH_ROOT = "/";
export const PATH_GALLERY = "/gallery";
export const PATH_SIGN_IN = "/sign-in";
export const PATH_ADMIN = "/admin";

export const PREFIX_PHOTO = `${PATH_GALLERY}/p`;

export const PATHS_ADMIN = [PATH_ADMIN];

export const pathForPhoto = (photo: Photo) => `${PREFIX_PHOTO}/${photo.id}`;

export const checkPathPrefix = (pathname = "", prefix: string) =>
  pathname.toLowerCase().startsWith(prefix);

export const isPathProtected = (pathname?: string) =>
  checkPathPrefix(pathname, PATH_ADMIN);
