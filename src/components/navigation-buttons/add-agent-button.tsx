import { IconPlus } from "@/assets/icons";
import { Button } from "../ui/button";
import Link from "next/link";

export const AddAgentButton = () => {
  return (
    <div>
      <Link href="/add-agent">
        <Button variant="outline" className="h-[47px] w-[230px]">
          <IconPlus />
          აგენტის დამატება
        </Button>
      </Link>
    </div>
  );
};
