export interface PhotoDB {
  id: string;
  url: string;
  height: number;
  width: number;
  title: string | null;
  description: string | null;
  location: string | null;
  exposure: string | null;
  focal_length: number | null;
  f_number: number | null;
  iso: number | null;
  date: Date | null;
  created_at: Date;
}
export interface TagDB {
  value: string;
  title: string | null;
  description: string | null;
}

export interface Photo {
  id: string;
  url: string;
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

export const mapPhotoDB = (photoDB: PhotoDB): Photo => ({
  id: photoDB.id,
  url: photoDB.url,
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
  tags: [],
  createdAt: photoDB.created_at,
});

export const mapTagDB = (tagDB: TagDB): Tag => ({
  value: tagDB.value,
  title: tagDB.title ?? undefined,
  description: tagDB.description ?? undefined,
});
