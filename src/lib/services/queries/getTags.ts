import { tags } from "../mocks";
import { Tag } from "../types";

export const getTags = async (): Promise<Tag[]> => {
  return tags;
};
