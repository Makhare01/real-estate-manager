import { AreaFilter, PriceFilter, RegionFilter, RoomsFilter } from "./filters";

export const ListingFilters = () => {
  return (
    <div className="border p-1 rounded-[10px]">
      <RegionFilter />
      <PriceFilter />
      <AreaFilter />
      <RoomsFilter />
    </div>
  );
};
