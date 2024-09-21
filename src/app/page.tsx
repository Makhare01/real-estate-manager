import { RealEstatesList } from "@/components/listing";
import { ListingFilters } from "@/components/listing-filters";
import {
  AddAgentButton,
  AddListingButton,
} from "@/components/navigation-buttons";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const regions = searchParams?.region
    ? Array.isArray(searchParams.region)
      ? searchParams.region
      : [searchParams.region]
    : [];

  return (
    <div>
      <div className="flex items-start justify-between gap-5">
        <ListingFilters />

        <div className="flex gap-3 flex-wrap justify-end flex-1">
          <AddListingButton />
          <AddAgentButton />
        </div>
      </div>

      <RealEstatesList
        regions={regions.map((region) => Number(region))}
        bedrooms={
          searchParams?.bedrooms ? Number(searchParams.bedrooms) : undefined
        }
        minArea={
          searchParams?.minArea ? Number(searchParams.minArea) : undefined
        }
        maxArea={
          searchParams?.maxArea ? Number(searchParams.maxArea) : undefined
        }
        maxPrice={
          searchParams?.maxPrice ? Number(searchParams.maxPrice) : undefined
        }
        minPrice={
          searchParams?.minPrice ? Number(searchParams.minPrice) : undefined
        }
      />
    </div>
  );
}
