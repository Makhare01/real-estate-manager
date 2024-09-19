import { IconPlus } from "@/assets/icons";
import { Button } from "../ui/button";
import Link from "next/link";

export const AddListingButton = () => {
  return (
    <div>
      <Link href="/add-listing">
        <Button className="h-[47px] w-[230px]">
          <IconPlus />
          ლისტინგის დამატება
        </Button>
      </Link>
    </div>
  );
};
