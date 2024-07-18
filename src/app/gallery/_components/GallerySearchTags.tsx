import { getTags } from "@/lib/supabase/queries/getTags";
import { Tag } from "@/lib/supabase/types";
import { Button } from "@nextui-org/button";
import { IconCheck } from "@tabler/icons-react";

type Props = {
  searchTags?: string[];
  onSearch: (formData: FormData) => void;
};

const SearchTag = ({
  selected,
  tag,
  onSearch,
}: {
  selected: boolean;
  tag: Tag;
  onSearch: (formData: FormData) => void;
}) => {
  return (
    <form action={onSearch}>
      <input
        name="tags"
        defaultValue={selected ? undefined : tag.value}
        hidden
        aria-hidden
        readOnly
      />
      <Button
        radius="full"
        variant={selected ? "full" : "bordered"}
        size="sm"
        startContent={selected ? <IconCheck /> : undefined}
        type="submit"
      >
        {tag.description ?? tag.description}
      </Button>
    </form>
  );
};

export const GallerySearchTags = async ({ searchTags, onSearch }: Props) => {
  const tags = await getTags();

  return (
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
          <SearchTag onSearch={onSearch} tag={tag} selected={tag.selected} />
        ))}
    </div>
  );
};
