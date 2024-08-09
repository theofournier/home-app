import {
  photos,
  photos_tags,
  tags,
  albums,
  photos_albums,
} from "@prisma/client";

export type PhotoTagsDB = photos & {
  photos_tags: (photos_tags & { tags: tags })[];
};

export type AlbumPhotosDB = albums & {
  photos_albums: (photos_albums & { photos: PhotoTagsDB })[];
};

export interface Photo {
  id: string;
  url: string;
  urlCompressed?: string;
  height: number;
  width: number;
  title?: string;
  description?: string;
  location?: string;
  exifData?: ExifData;
  date?: Date;
  tags?: Tag[];
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

export const mapPhotoTagsDB = (photoTagsDB: PhotoTagsDB): Photo => {
  return {
    ...mapPhotoDB(photoTagsDB),
    tags: photoTagsDB.photos_tags?.map((photoTag) => mapTagDB(photoTag.tags)),
  };
};

export const mapPhotoDB = (photoDB: photos): Photo => ({
  id: photoDB.id,
  url: photoDB.url,
  urlCompressed: photoDB.url_compressed ?? undefined,
  height: photoDB.height,
  width: photoDB.width,
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

export const mapAlbumPhotosDB = (albumPhotosDB: AlbumPhotosDB): Album => ({
  ...mapAlbumDB(albumPhotosDB),
  photos: albumPhotosDB.photos_albums?.map((photoAlbum) =>
    mapPhotoTagsDB(photoAlbum.photos)
  ),
});
