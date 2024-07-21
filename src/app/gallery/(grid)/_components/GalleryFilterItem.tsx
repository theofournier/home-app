"use client";

import { Button } from "@nextui-org/button";
import { IconCheck } from "@tabler/icons-react";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useMemo } from "react";

type Props = {
  category: string;
  value: string;
  title?: string;
};

const isSelected = (
  value: string,
  searchParams: ReadonlyURLSearchParams,
  category: string
) => {
  const params = new URLSearchParams(searchParams);
  const currentCategory = params.get(category);

  return Boolean(currentCategory?.split(",").includes(value));
};

export const GalleryFilterItem = ({ category, value, title }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const selected = useMemo(
    () => isSelected(value, searchParams, category),
    [searchParams, category]
  );

  const onPress = () => {
    const params = new URLSearchParams(searchParams);
    const currentCategory = params.get(category);
    if (!currentCategory) {
      params.set(category, value);
    } else {
      const arrayCurrentCategory = currentCategory.split(",");
      const valueIndex = arrayCurrentCategory.indexOf(value);
      if (valueIndex === -1) {
        params.set(category, currentCategory.concat(`,${value}`));
      } else {
        if (arrayCurrentCategory.length === 1) {
          params.delete(category);
        } else {
          arrayCurrentCategory.splice(valueIndex, 1);
          params.set(category, arrayCurrentCategory.join(","));
        }
      }
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <Button
        color={selected ? "primary" : undefined}
        size="sm"
        startContent={selected ? <IconCheck /> : undefined}
        type="button"
        onPress={onPress}
      >
        {title ?? value}
      </Button>
    </div>
  );
};
