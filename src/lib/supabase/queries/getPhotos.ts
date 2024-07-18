import { photos } from "../mocks";
import { Photo } from "../types";

type GetPhotosParams = {
  query?: string;
  tags?: string[];
};

export const getPhotos = async ({
  query,
  tags,
}: GetPhotosParams): Promise<Photo[]> => {
  return photos
    .filter((photo) => (query ? photo.title === query : true))
    .filter((photo) =>
      tags && tags.length > 0
        ? photo.tags?.some((tag) => tags?.includes(tag.description ?? ""))
        : true
    );
};
