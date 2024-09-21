"use client";

import { useBoolean } from "@/lib/hooks";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import { deleteListing } from "@/api/listing";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  listingId: number;
};

export const DeleteListingDialog = ({ listingId }: Props) => {
  const router = useRouter();
  const isOpen = useBoolean();

  return (
    <Dialog
      open={isOpen.isTrue}
      onOpenChange={(value) => {
        isOpen.setValue(value);
      }}
    >
      <Button variant="outline" className="mt-5" onClick={isOpen.setTrue}>
        ლისტინგის წაშლა
      </Button>
      <DialogContent className="p-16">
        <p className="text-center text-xl text-blue-charcoal-700">
          გსურთ წაშალოთ ლისტინგი {listingId}?
        </p>

        <div className="flex items-center gap-5 justify-center mt-3">
          <Button variant="destructive" onClick={isOpen.setFalse}>
            გაუქმება
          </Button>
          <Button
            onClick={async () => {
              try {
                await deleteListing({ estateId: String(listingId) });

                isOpen.setFalse();
                toast.success("ლისტინგი წაიშალა");
                router.push("/");
              } catch (e) {
                toast.error("ლისტინგის წაშლა ვერ მოხერხდა");
              }
            }}
          >
            დადასტურება
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
