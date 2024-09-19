import { IconArrow } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBoolean } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  filterName: string;
  filterLabel: string;
  children: ReactNode;
  onChoose: () => void;
  disabled?: boolean;
};

export const FilterDropdownWrapper = ({
  filterName,
  filterLabel,
  children,
  onChoose,
  disabled,
}: Props) => {
  const isOpen = useBoolean();

  return (
    <DropdownMenu
      onOpenChange={(value) => {
        isOpen.setValue(value);
      }}
      open={isOpen.isTrue}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn({
            "bg-accent": isOpen.isTrue,
          })}
        >
          {filterName}
          <IconArrow
            direction={isOpen.isTrue ? "up" : "down"}
            className="ml-2"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-auto p-7 rounded-[10px] mt-2 shadow-[5px_5px_12px_0px_#02152614]"
        align="start"
      >
        <DropdownMenuLabel className="p-0 font-semibold">
          {filterLabel}
        </DropdownMenuLabel>

        <div className="w-full my-7">{children}</div>

        <div className="w-full flex justify-end">
          <Button
            className="font-semibold text-white bg-pomegranate-500 hover:bg-pomegranate-600"
            onClick={() => {
              isOpen.setFalse();
              onChoose();
            }}
            disabled={disabled}
          >
            არჩევა
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
