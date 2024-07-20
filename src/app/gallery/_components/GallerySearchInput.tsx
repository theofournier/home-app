"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@nextui-org/input";
import { IconSearch } from "@tabler/icons-react";
import { useDebouncedCallback } from "use-debounce";

export const GallerySearchInput = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Input
      type="search"
      variant="bordered"
      placeholder="Search photos..."
      startContent={<IconSearch />}
      defaultValue={searchParams.get("query")?.toString()}
      onValueChange={(value) => handleSearch(value)}
    />
  );
};
