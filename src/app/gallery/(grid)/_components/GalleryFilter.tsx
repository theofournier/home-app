import { TablerIcon } from "@tabler/icons-react";
import { GalleryFilterItem } from "./GalleryFilterItem";
import { ReactNode } from "react";

type Props = {
  title: string;
  Icon: TablerIcon;
  category: string;
  values: { value: string; title?: string }[];
};

export const GalleryFilter = async ({
  title,
  Icon,
  category,
  values,
}: Props) => {
  return (
    <div className="space-y-1">
      <div className="flex flex-row gap-1 mb-2 uppercase items-center">
        <Icon size="1.2rem" />
        <h3>{title}</h3>
      </div>
      {values.map((value) => (
        <GalleryFilterItem
          key={value.value}
          category={category}
          value={value.value}
          title={value.title}
        />
      ))}
    </div>
  );
};
