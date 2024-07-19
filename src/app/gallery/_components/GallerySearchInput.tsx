import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";

type Props = {
  searchQuery?: string;
  onSearch: (formData: FormData) => void;
};

export const GallerySearchInput = ({ searchQuery, onSearch }: Props) => {
  return (
    <form action={onSearch}>
      <Input
        type="search"
        name="query"
        placeholder="Search photos..."
        startContent={<IconSearch size="1rem" />}
        endContent={
          <Button isIconOnly type="submit">
            <IconArrowRight size="1rem" />
          </Button>
        }
        defaultValue={searchQuery}
      />
    </form>
  );
};