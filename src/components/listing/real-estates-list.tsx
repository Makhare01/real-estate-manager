"use server";

import { getRealEstates } from "@/api/listing";
import { ListingCard } from "./listing-card";

type Props = {
  regions: Array<number>;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  bedrooms?: number;
};

export const RealEstatesList = async ({
  regions,
  minPrice,
  maxPrice,
  maxArea,
  minArea,
  bedrooms,
}: Props) => {
  const realEstates = await getRealEstates();

  let filteredItems = realEstates;

  if (regions.length > 0) {
    filteredItems = filteredItems.filter((item) =>
      regions.includes(item.city.region_id)
    );
  }

  if (maxPrice) {
    filteredItems = filteredItems.filter((item) => item.price <= maxPrice);
  }

  if (minPrice) {
    filteredItems = filteredItems.filter((item) => item.price >= minPrice);
  }

  if (maxArea) {
    filteredItems = filteredItems.filter((item) => item.area >= maxArea);
  }

  if (minArea) {
    filteredItems = filteredItems.filter((item) => item.area >= minArea);
  }

  if (minArea) {
    filteredItems = filteredItems.filter((item) => item.bedrooms === bedrooms);
  }

  return (
    <div className="flex items-start justify-between flex-wrap mt-5 gap-5">
      {filteredItems.map((realEstate) => (
        <ListingCard key={realEstate.id} realEstate={realEstate} />
      ))}
    </div>
  );
};
