import { Album, Photo } from "@/lib/services/types";

export const PATH_ROOT = "/";
export const PATH_GALLERY = "/gallery";
export const PATH_GALLERY_ALBUMS = `${PATH_GALLERY}/albums`;
export const PATH_SIGN_IN = "/sign-in";
export const PATH_ADMIN = "/admin";
export const PATH_ADMIN_GALLERY = `${PATH_ADMIN}/gallery`;
export const PATH_ADMIN_GALLERY_UPLOAD = `${PATH_ADMIN_GALLERY}/upload`;
export const PATH_ADMIN_GALLERY_ALBUMS = `${PATH_ADMIN_GALLERY}/albums`;

export const PREFIX_PHOTO = `${PATH_GALLERY}/p`;

export const pathForPhoto = (photo: Photo) => `${PREFIX_PHOTO}/${photo.id}`;
export const pathForAlbum = (album: Album) =>
  `${PATH_GALLERY_ALBUMS}/${album.id}`;

export const checkPathPrefix = (pathname = "", prefix: string) =>
  pathname.toLowerCase().startsWith(prefix);

export const isPathProtected = (pathname?: string) =>
  checkPathPrefix(pathname, PATH_ADMIN);
