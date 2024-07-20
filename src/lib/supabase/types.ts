export interface Photo {
  id: string;
  url: string;
  name: string;
  height: number;
  width: number;
  title?: string;
  description?: string;
  location?: string;
  exifData?: ExifData;
  date?: string;
  tags?: Tag[];
  createdAt: string;
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
