import { photos } from "../mocks";
import { Photo } from "../types";

export const getPhotos = async (): Promise<Photo[]> => {
  return photos;
};
