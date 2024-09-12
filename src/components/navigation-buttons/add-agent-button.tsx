import { IconPlus } from "@/assets/icons";
import { Button } from "../ui/button";
import Link from "next/link";

export const AddAgentButton = () => {
  return (
    <div>
      <Link href="/add-agent">
        <Button variant="outline">
          <IconPlus />
          აგენტის დამატება
        </Button>
      </Link>
    </div>
  );
};
