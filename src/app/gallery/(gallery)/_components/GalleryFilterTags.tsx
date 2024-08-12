import { getTags } from "@/lib/services/queries/tag/getTags";
import { IconTagFilled } from "@tabler/icons-react";
import { GalleryFilter } from "./GalleryFilter";

export const GalleryFilterTags = async () => {
  const tags = await getTags();

  return (
    <GalleryFilter
      title="Tags"
      Icon={IconTagFilled}
      category="tags"
      values={tags}
    />
  );
};
