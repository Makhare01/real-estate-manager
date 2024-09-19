import { FilterBadges } from "./filter-badges";
import { AreaFilter, PriceFilter, RegionFilter, RoomsFilter } from "./filters";

export const ListingFilters = () => {
  return (
    <div>
      <div className="border p-1 rounded-[10px] flex gap-3 flex-wrap justify-stretch min-h-[47px] w-auto">
        <RegionFilter />
        <PriceFilter />
        <AreaFilter />
        <RoomsFilter />
      </div>

      <FilterBadges />
    </div>
  );
};
