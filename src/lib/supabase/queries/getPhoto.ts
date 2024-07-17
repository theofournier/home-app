import { photos } from "../mocks";
import { Photo } from "../types";

export const getPhoto = async (id: string): Promise<Photo | undefined> => {
  return photos.find((photo) => photo.id === id);
};
