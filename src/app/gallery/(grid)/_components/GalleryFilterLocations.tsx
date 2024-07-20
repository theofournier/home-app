import { IconBuilding } from "@tabler/icons-react";
import { GalleryFilter } from "./GalleryFilter";
import { getLocations } from "@/lib/services/queries/getLocations";

export const GalleryFilterLocations = async () => {
  const locations = await getLocations();

  return (
    <GalleryFilter
      title="Locations"
      Icon={IconBuilding}
      category="locations"
      values={locations.map((location) => ({ value: location }))}
    />
  );
};
