import { ListingFilters } from "@/components/listing-filters";
import {
  AddAgentButton,
  AddListingButton,
} from "@/components/navigation-buttons";

export default function Home() {
  return (
    <div className="flex items-center justify-between">
      <ListingFilters />

      <div className="flex gap-3">
        <AddListingButton />
        <AddAgentButton />
      </div>
    </div>
  );
}
