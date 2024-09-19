import { ListingFilters } from "@/components/listing-filters";
import {
  AddAgentButton,
  AddListingButton,
} from "@/components/navigation-buttons";

export default function Home() {
  return (
    <div className="flex items-start justify-between gap-5">
      <ListingFilters />

      <div className="flex gap-3 flex-wrap justify-end flex-1">
        <AddListingButton />
        <AddAgentButton />
      </div>
    </div>
  );
}
