import { IconBuilding } from "@tabler/icons-react";
import { GalleryFilter } from "./GalleryFilter";
import { getLocations } from "@/lib/supabase/queries/getLocations";

export const GalleryFilterLocations = async () => {
  const locations = await getLocations();

  return (
    <GalleryFilter
      title="Locations"
      icon={<IconBuilding />}
      category="locations"
      values={locations.map((location) => ({ value: location }))}
    />
  );
};
