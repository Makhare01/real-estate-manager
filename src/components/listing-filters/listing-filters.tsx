import { getRegions } from "@/api/locations";
import { FilterBadges } from "./filter-badges";
import {
  AreaFilter,
  PriceFilter,
  RegionFilter,
  BedroomsFilter,
} from "./filters";
import { Suspense } from "react";

export const ListingFilters = async () => {
  const regions = await getRegions();

  return (
    <Suspense>
      <div>
        <div className="border p-1 rounded-[10px] flex gap-3 flex-wrap justify-stretch min-h-[47px] w-auto">
          <RegionFilter regions={regions} />
          <PriceFilter />
          <AreaFilter />
          <BedroomsFilter />
        </div>

        <FilterBadges />
      </div>
    </Suspense>
  );
};
