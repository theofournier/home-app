import { TablerIcon } from "@tabler/icons-react";
import { GalleryFilterItem } from "./GalleryFilterItem";

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
    <div className="space-y-1 space-x-1 flex flex-row md:flex-col items-center md:items-start overflow-x-auto no-scrollbar">
      <div className="flex flex-row gap-1 mr-2 md:mb-2 uppercase items-center">
        <Icon size="1.2rem" />
        <h3 className="text-sm md:text-medium">{title}</h3>
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
