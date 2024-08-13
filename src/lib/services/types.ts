import {
  photos,
  photos_tags,
  tags,
  albums,
  photos_albums,
} from "@prisma/client";

export type PhotoFullDB = photos & {
  photos_tags?: (photos_tags & { tags: tags })[];
  photos_albums?: (photos_albums & { albums: albums })[];
};

export type AlbumFullDB = albums & {
  photos_albums?: (photos_albums & { photos: PhotoFullDB })[];
};

export interface Photo {
  id: string;
  url: string;
  assetId?: string;
  height?: number;
  width?: number;
  title?: string;
  description?: string;
  location?: string;
  exifData?: ExifData;
  date?: Date;
  tags?: Tag[];
  albums?: Album[];
  createdAt: Date;
}

export interface ExifData {
  exposure?: string;
  focalLength?: number;
  fNumber?: number;
  iso?: number;
}

export interface Tag {
  value: string;
  title?: string;
  description?: string;
}

export interface Album {
  id: string;
  title: string;
  description?: string;
  coverUrl?: string;
  date?: Date;
  photos?: Photo[];
  createdAt: Date;
}

export const mapPhotoDB = (photoDB: photos): Photo => ({
  id: photoDB.id,
  url: photoDB.url,
  assetId: photoDB.asset_id ?? undefined,
  height: photoDB.height ?? undefined,
  width: photoDB.width ?? undefined,
  title: photoDB.title ?? undefined,
  description: photoDB.description ?? undefined,
  location: photoDB.location ?? undefined,
  exifData: {
    exposure: photoDB.exposure ?? undefined,
    fNumber: photoDB.f_number ?? undefined,
    focalLength: photoDB.focal_length ?? undefined,
    iso: photoDB.iso ?? undefined,
  },
  date: photoDB.date ?? undefined,
  createdAt: photoDB.created_at,
});

export const mapTagDB = (tagDB: tags): Tag => ({
  value: tagDB.value,
  title: tagDB.title ?? undefined,
  description: tagDB.description ?? undefined,
});

export const mapAlbumDB = (albumDB: albums): Album => ({
  id: albumDB.id,
  title: albumDB.title,
  description: albumDB.description ?? undefined,
  coverUrl: albumDB.cover_url ?? undefined,
  date: albumDB.date ?? undefined,
  createdAt: albumDB.created_at,
});

export const mapPhotoFullDB = (photoFullDB: PhotoFullDB): Photo => {
  return {
    ...mapPhotoDB(photoFullDB),
    tags: photoFullDB.photos_tags?.map((photoTag) => mapTagDB(photoTag.tags)),
    albums: photoFullDB.photos_albums?.map((photoAlbum) =>
      mapAlbumDB(photoAlbum.albums)
    ),
  };
};

export const mapAlbumFullDB = (albumFullDB: AlbumFullDB): Album => ({
  ...mapAlbumDB(albumFullDB),
  photos: albumFullDB.photos_albums?.map((photoAlbum) =>
    mapPhotoFullDB(photoAlbum.photos)
  ),
});
