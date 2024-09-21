import { FilterBadges } from "./filter-badges";
import {
  AreaFilter,
  PriceFilter,
  RegionFilter,
  BedroomsFilter,
} from "./filters";

export const ListingFilters = () => {
  return (
    <div>
      <div className="border p-1 rounded-[10px] flex gap-3 flex-wrap justify-stretch min-h-[47px] w-auto">
        <RegionFilter />
        <PriceFilter />
        <AreaFilter />
        <BedroomsFilter />
      </div>

      <FilterBadges />
    </div>
  );
};
