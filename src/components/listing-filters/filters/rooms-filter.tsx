"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FilterDropdownWrapper } from "./filter-dropdown-wrapper";
import { useState } from "react";
import { cn } from "@/lib/utils";

const RoomSelectItem = ({
  value,
  onClick,
  isSelected,
}: {
  value: number;
  onClick: () => void;
  isSelected: boolean;
}) => {
  return (
    <div
      className={cn(
        "w-[42px] h-[42px] flex items-center justify-center rounded-md border border-input cursor-pointer group",
        {
          "border-green-500 border-2": isSelected,
          "hover:border-gray-600": !isSelected,
        }
      )}
      onClick={onClick}
    >
      <p
        className={cn("text-sm text-blue-charcoal-800 opacity-40", {
          "text-green-500 font-semibold opacity-100": isSelected,
          "group-hover:text-gray-600 group-hover:opacity-100 group-hover:font-semibold":
            !isSelected,
        })}
      >
        {value}
      </p>
    </div>
  );
};

export const RoomsFilter = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const rooms = searchParams.get("rooms");

  const [selectedRoom, setSelectedRoom] = useState<number | undefined>(
    rooms ? Number(rooms) : undefined
  );

  return (
    <FilterDropdownWrapper
      filterName="საძინებლების რაოდენობა"
      filterLabel="საძინებლების რაოდენობა"
      onChoose={() => {
        if (selectedRoom) {
          params.set("rooms", String(selectedRoom));
        } else {
          params.delete("rooms");
        }

        router.push(`?${params.toString()}`);
      }}
    >
      <div className="grid grid-cols-4 gap-5">
        {Array.from({ length: 10 }).map((_, index) => {
          const room = index + 1;
          return (
            <RoomSelectItem
              key={`room-${room}`}
              value={room}
              onClick={() => {
                if (selectedRoom === room) {
                  setSelectedRoom(undefined);
                  return;
                }
                setSelectedRoom(room);
              }}
              isSelected={selectedRoom === room}
            />
          );
        })}
      </div>
    </FilterDropdownWrapper>
  );
};
