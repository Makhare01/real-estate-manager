"use client";

import { IconClose } from "@/assets/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";

const FilterBadge = ({
  content,
  onClick,
}: {
  content: string | ReactNode;
  onClick: () => void;
}) => {
  return (
    <div className="p-1 px-2 rounded-[43px] border flex items-center gap-1">
      <p className="text-sm text-blue-charcoal-800 opacity-80">{content}</p>
      <IconClose
        className="cursor-pointer color-blue-charcoal-900 w-[14px]"
        onClick={onClick}
      />
    </div>
  );
};

const AreaFilterBadgeContent = ({
  min,
  max,
  symbol,
}: {
  min: string | null;
  max: string | null;
  symbol: string | ReactNode;
}) => {
  const leftSide = (
    <span>
      {min ?? 0}
      {symbol}
    </span>
  );

  const rightSide = (
    <span>
      - {max} {max ? symbol : "მდე"}
    </span>
  );

  return (
    <span className="text-ellipsis whitespace-nowrap">
      {leftSide} {rightSide}
    </span>
  );
};

export const FilterBadges = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const regionParams = params.getAll("region");

  const minPrice = params.get("minPrice");
  const maxPrice = params.get("maxPrice");

  const minArea = params.get("minArea");
  const maxArea = params.get("maxArea");

  const rooms = params.get("rooms");

  return (
    <div className="flex flex-wrap items-center gap-3 p-1 mt-3">
      {regionParams.map((region) => {
        return (
          <FilterBadge
            key={region}
            content={region}
            onClick={() => {
              params.delete("region", region);
              router.push(`?${params.toString()}`);
            }}
          />
        );
      })}

      {(minArea || maxArea) && (
        <FilterBadge
          content={
            <AreaFilterBadgeContent
              min={minArea}
              max={maxArea}
              symbol={
                <span>
                  მ<sup>2</sup>
                </span>
              }
            />
          }
          onClick={() => {
            params.delete("minArea");
            params.delete("maxArea");
            router.push(`?${params.toString()}`);
          }}
        />
      )}

      {(minPrice || maxPrice) && (
        <FilterBadge
          content={
            <AreaFilterBadgeContent min={minPrice} max={minPrice} symbol="₾" />
          }
          onClick={() => {
            params.delete("minPrice");
            params.delete("maxPrice");
            router.push(`?${params.toString()}`);
          }}
        />
      )}

      {rooms && (
        <FilterBadge
          content={rooms}
          onClick={() => {
            params.delete("rooms", String(rooms));
            router.push(`?${params.toString()}`);
          }}
        />
      )}

      {(regionParams.length > 0 ||
        minPrice ||
        maxPrice ||
        minArea ||
        maxArea ||
        rooms) && (
        <p
          className="text-sm font-medium text-blue-charcoal-800 cursor-pointer"
          onClick={() => {
            router.replace("/", undefined);
          }}
        >
          გასუფთავება
        </p>
      )}
    </div>
  );
};
