import { FilterCheckbox } from "./filter-checkbox";
import { FilterDropdownWrapper } from "./filter-dropdown-wrapper";

export const RegionFilter = () => {
  return (
    <FilterDropdownWrapper filterName="რეგიონი" filterLabel="რეგიონის მიხედვით">
      <div className="grid grid-cols-4 gap-5">
        <FilterCheckbox label="ქართლი" value="ქართლი" />
        <FilterCheckbox label="გურია" value="გურია" />
        <FilterCheckbox label="აჭარა" value="აჭარა" />
        <FilterCheckbox label="კახეთი" value="კახეთი" />
        <FilterCheckbox label="რაჭა" value="რაჭა" />
        <FilterCheckbox label="სვანეთი" value="სვანეთი" />
        <FilterCheckbox label="იმერეთი" value="იმერეთი" />
      </div>
    </FilterDropdownWrapper>
  );
};
