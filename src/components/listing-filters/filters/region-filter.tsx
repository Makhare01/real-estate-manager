"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FilterCheckbox } from "./filter-checkbox";
import { FilterDropdownWrapper } from "./filter-dropdown-wrapper";

const regions = [
  "აჭარა",
  "ქართლი",
  "გურია",
  "კახეთი",
  "რაჭა",
  "სვანეთი",
  "იმერეთი",
];

export const RegionFilter = () => {
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
            key={region}
            label={region}
            value={region}
            checked={searchParams.getAll("region").includes(region)}
            onCheckChanged={(checked) => {
              if (checked) {
                params.append("region", region);
                return;
              }

              params.delete("region", region);
            }}
          />
        ))}
      </div>
    </FilterDropdownWrapper>
  );
};
