import { getTags } from "@/lib/supabase/queries/getTags";
import { Tag } from "@/lib/supabase/types";
import { Button } from "@nextui-org/button";
import { IconCheck } from "@tabler/icons-react";

type Props = {
  searchTags?: string[];
  onSearch: (formData: FormData) => void;
};

const SearchTag = ({ selected, tag }: { selected: boolean; tag: Tag }) => {
  return (
    <div>
      <input
        name="tags"
        defaultValue={selected ? undefined : tag.value}
        hidden
        aria-hidden
        readOnly
      />
      <Button
        radius="full"
        variant={selected ? "solid" : "bordered"}
        size="sm"
        startContent={selected ? <IconCheck /> : undefined}
        type="submit"
      >
        {tag.title ?? tag.title}
      </Button>
    </div>
  );
};

export const GallerySearchTags = async ({ searchTags, onSearch }: Props) => {
  const tags = await getTags();

  return (
    <form action={onSearch}>
      <div className="flex flex-row">
        {tags
          .map((tag) => ({
            ...tag,
            selected: Boolean(
              searchTags?.some((searchTag) => searchTag === tag.value)
            ),
          }))
          .toSorted((a, b) =>
            a.selected === b.selected ? 0 : a.selected ? -1 : 1
          )
          .map((tag) => (
            <SearchTag key={tag.value} tag={tag} selected={tag.selected} />
          ))}
      </div>
    </form>
  );
};
