"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FilterCheckbox } from "./filter-checkbox";
import { FilterDropdownWrapper } from "./filter-dropdown-wrapper";
import { Regions } from "@/api/listing";

type Props = {
  regions: Regions;
};

export const RegionFilter = ({ regions }: Props) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  return (
    <FilterDropdownWrapper
      filterName="რეგიონი"
      filterLabel="რეგიონის მიხედვით"
      onChoose={() => {
        router.push(`?${params.toString()}`);
      }}
    >
      <div className="grid grid-cols-4 gap-5 gap-x-16">
        {regions.map((region) => (
          <FilterCheckbox
            key={region.id}
            label={region.name}
            value={String(region.id)}
            checked={searchParams.getAll("region").includes(String(region.id))}
            onCheckChanged={(checked) => {
              if (checked) {
                params.append("region", String(region.id));
                return;
              }

              params.delete("region", String(region.id));
            }}
          />
        ))}
      </div>
    </FilterDropdownWrapper>
  );
};
