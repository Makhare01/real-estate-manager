"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FilterDropdownWrapper } from "./filter-dropdown-wrapper";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { HelperText } from "@/components/helper-text";
import { Input } from "@/components/ui/input";
import { RangeSelectItem } from "./range-select-item";

const PREDEFINED_AREAS = [50000, 100000, 150000, 200000, 300000];

const TAreaFilterSchema = z
  .object({
    minArea: z.number().nonnegative().nullable(),
    maxArea: z.number().nonnegative().nullable(),
  })
  .refine(
    (data) => {
      if (data.minArea && data.maxArea) {
        return data.minArea <= data.maxArea;
      }
      return true;
    },
    {
      message: "მინიმალური მნიშვნელობა არ უნდა იყოს მაქსიმალურზე მეტი",
      path: ["minArea"],
    }
  );

type AreaFilterSchema = z.infer<typeof TAreaFilterSchema>;

export const AreaFilter = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const minArea = searchParams.get("minArea");
  const maxArea = searchParams.get("maxArea");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AreaFilterSchema>({
    defaultValues: {
      minArea: minArea ? Number(minArea) : null,
      maxArea: maxArea ? Number(maxArea) : null,
    },
    resolver: zodResolver(TAreaFilterSchema),
  });

  return (
    <FilterDropdownWrapper
      filterName="ფართობი"
      filterLabel="ფართობის მიხედვით"
      onChoose={handleSubmit((values) => {
        if (values.minArea) {
          params.set("minArea", String(values.minArea));
        } else {
          params.delete("minArea");
        }

        if (values.maxArea) {
          params.set("maxArea", String(values.maxArea));
        } else {
          params.delete("maxArea");
        }

        router.push(`?${params.toString()}`);
        // reset();
      })}
    >
      <div className="max-w-[382px]">
        <div className="flex gap-5">
          <div>
            <Controller
              control={control}
              name="minArea"
              render={({ field, fieldState }) => {
                return (
                  <Input
                    type="number"
                    placeholder="დან"
                    value={field.value ?? undefined}
                    onChange={(event) => {
                      const value = event.target.value;

                      field.onChange(value ? Number(value) : null);
                    }}
                    endAdornment={
                      <p className="pr-1 pt-1">
                        მ<sup>2</sup>
                      </p>
                    }
                    className="w-full"
                    error={Boolean(fieldState.error)}
                  />
                );
              }}
            />

            <RangeSelectItem
              label={
                <p>
                  მინ. მ<sup>2</sup>
                </p>
              }
              values={PREDEFINED_AREAS}
              onClick={(price) => {
                setValue("minArea", price);
              }}
              symbol={
                <span className="text-base text-blue-charcoal-800 opacity-70">
                  მ<sup>2</sup>
                </span>
              }
            />
          </div>
          <div>
            <Controller
              control={control}
              name="maxArea"
              render={({ field, fieldState }) => (
                <Input
                  type="number"
                  placeholder="მდე"
                  value={field.value ?? undefined}
                  onChange={(event) => {
                    const value = event.target.value;
                    field.onChange(value ? Number(value) : null);
                  }}
                  endAdornment={
                    <p className="pr-1 pt-1">
                      მ<sup>2</sup>
                    </p>
                  }
                  className="w-full"
                  error={Boolean(fieldState.error)}
                />
              )}
            />

            <RangeSelectItem
              label={
                <p>
                  მაქს. მ<sup>2</sup>
                </p>
              }
              values={PREDEFINED_AREAS}
              onClick={(price) => {
                setValue("maxArea", price);
              }}
              symbol={
                <span className="text-base text-blue-charcoal-800 opacity-70">
                  მ<sup>2</sup>
                </span>
              }
            />
          </div>
        </div>

        {Object.values(errors).map((error, index) => {
          return (
            <HelperText
              key={error.message + index.toString()}
              className="mt-5"
              state="error"
              text={error.message ?? ""}
            />
          );
        })}
      </div>
    </FilterDropdownWrapper>
  );
};
