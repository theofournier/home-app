import { GalleryFilterItem } from "./GalleryFilterItem";
import { ReactNode } from "react";

type Props = {
  title: string;
  icon: ReactNode;
  category: string;
  values: { value: string; title?: string }[];
};

export const GalleryFilter = async ({
  title,
  icon,
  category,
  values,
}: Props) => {
  return (
    <div>
      <div className="flex flex-row gap-1">
        {icon}
        <h3>{title}</h3>
      </div>
      <div className="flex flex-col item-start">
        {values.map((value) => (
          <GalleryFilterItem
            key={value.value}
            category={category}
            value={value.value}
            title={value.title}
          />
        ))}
      </div>
    </div>
  );
};
