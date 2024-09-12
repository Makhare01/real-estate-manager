import { IconPlus } from "@/assets/icons";
import { Button } from "../ui/button";
import Link from "next/link";

export const AddListingButton = () => {
  return (
    <div>
      <Link href="/add-listing">
        <Button>
          <IconPlus />
          ლისტინგის დამატება
        </Button>
      </Link>
    </div>
  );
};
