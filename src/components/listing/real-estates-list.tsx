"use server";

import { getRealEstates, RealEstate } from "@/api/listing";
import { ListingCard } from "./listing-card";

const REAL_ESTATES: Array<RealEstate> = [
  {
    id: 1,
    address: "შარტავას 2ა",
    zip_code: "0101",
    price: 100000,
    area: 100.5,
    bedrooms: 3,
    is_rental: 0,
    image:
      "https://api.real-estate-manager.redberryinternship.ge/storage/agent_avatars/KXhmcUIaDo7TTkgfCBraeUhx3Nd6eTKrmsXOWkPh.png",
    city_id: 1,
    city: {
      id: 1,
      name: "სოხუმი",
      region_id: 1,
      region: {
        id: 1,
        name: "აფხაზეთი",
      },
    },
  },
  {
    id: 2,
    address: "შარტავას 2ა",
    zip_code: "0101",
    price: 100000,
    area: 100.5,
    bedrooms: 3,
    is_rental: 0,
    image:
      "https://api.real-estate-manager.redberryinternship.ge/storage/agent_avatars/KXhmcUIaDo7TTkgfCBraeUhx3Nd6eTKrmsXOWkPh.png",
    city_id: 1,
    city: {
      id: 1,
      name: "სოხუმი",
      region_id: 1,
      region: {
        id: 1,
        name: "აფხაზეთი",
      },
    },
  },
  {
    id: 3,
    address: "შარტავას 2ა",
    zip_code: "0101",
    price: 100000,
    area: 100.5,
    bedrooms: 3,
    is_rental: 0,
    image:
      "https://api.real-estate-manager.redberryinternship.ge/storage/agent_avatars/KXhmcUIaDo7TTkgfCBraeUhx3Nd6eTKrmsXOWkPh.png",
    city_id: 1,
    city: {
      id: 1,
      name: "სოხუმი",
      region_id: 1,
      region: {
        id: 1,
        name: "აფხაზეთი",
      },
    },
  },
  {
    id: 4,
    address: "შარტავას 2ა",
    zip_code: "0101",
    price: 100000,
    area: 100.5,
    bedrooms: 3,
    is_rental: 0,
    image:
      "https://api.real-estate-manager.redberryinternship.ge/storage/agent_avatars/KXhmcUIaDo7TTkgfCBraeUhx3Nd6eTKrmsXOWkPh.png",
    city_id: 1,
    city: {
      id: 1,
      name: "სოხუმი",
      region_id: 1,
      region: {
        id: 1,
        name: "აფხაზეთი",
      },
    },
  },
  {
    id: 5,
    address: "შარტავას 2ა",
    zip_code: "0101",
    price: 100000,
    area: 100.5,
    bedrooms: 3,
    is_rental: 0,
    image:
      "https://api.real-estate-manager.redberryinternship.ge/storage/agent_avatars/KXhmcUIaDo7TTkgfCBraeUhx3Nd6eTKrmsXOWkPh.png",
    city_id: 1,
    city: {
      id: 1,
      name: "სოხუმი",
      region_id: 1,
      region: {
        id: 1,
        name: "აფხაზეთი",
      },
    },
  },
  {
    id: 6,
    address: "შარტავას 2ა",
    zip_code: "0101",
    price: 100000,
    area: 100.5,
    bedrooms: 3,
    is_rental: 0,
    image:
      "https://api.real-estate-manager.redberryinternship.ge/storage/agent_avatars/KXhmcUIaDo7TTkgfCBraeUhx3Nd6eTKrmsXOWkPh.png",
    city_id: 1,
    city: {
      id: 1,
      name: "სოხუმი",
      region_id: 1,
      region: {
        id: 1,
        name: "აფხაზეთი",
      },
    },
  },
];

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

  if (regions) {
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
