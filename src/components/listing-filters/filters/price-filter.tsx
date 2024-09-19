"use client";

import { Input } from "@/components/ui/input";
import { FilterDropdownWrapper } from "./filter-dropdown-wrapper";
import { HelperText } from "@/components/helper-text";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { RangeSelectItem } from "./range-select-item";

const PREDEFINED_PRICES = [50000, 100000, 150000, 200000, 300000];

const TPriceFilterSchema = z
  .object({
    minPrice: z.number().nonnegative().nullable(),
    maxPrice: z.number().nonnegative().nullable(),
  })
  .refine(
    (data) => {
      if (data.minPrice && data.maxPrice) {
        return data.minPrice <= data.maxPrice;
      }
      return true;
    },
    {
      message: "მინიმალური მნიშვნელობა არ უნდა იყოს მაქსიმალურზე მეტი",
      path: ["minPrice"],
    }
  );

type PriceFilterSchema = z.infer<typeof TPriceFilterSchema>;

export const PriceFilter = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PriceFilterSchema>({
    defaultValues: {
      minPrice: minPrice ? Number(minPrice) : null,
      maxPrice: maxPrice ? Number(maxPrice) : null,
    },
    resolver: zodResolver(TPriceFilterSchema),
  });

  return (
    <FilterDropdownWrapper
      filterName="საფასო კატეგორია"
      filterLabel="ფასის მიხედვით"
      onChoose={handleSubmit((values) => {
        if (values.minPrice) {
          params.set("minPrice", String(values.minPrice));
        } else {
          params.delete("minPrice");
        }

        if (values.maxPrice) {
          params.set("maxPrice", String(values.maxPrice));
        } else {
          params.delete("maxPrice");
        }

        router.push(`?${params.toString()}`);
      })}
    >
      <div className="max-w-[382px]">
        <div className="flex gap-5">
          <div>
            <Controller
              control={control}
              name="minPrice"
              render={({ field, fieldState }) => (
                <Input
                  type="number"
                  placeholder="დან"
                  defaultValue={Number(minPrice)}
                  value={field.value ?? undefined}
                  onChange={(event) => {
                    const value = event.target.value;
                    field.onChange(value ? Number(value) : undefined);
                  }}
                  endAdornment={<p className="pr-2">₾</p>}
                  className="w-full"
                  error={Boolean(fieldState.error)}
                />
              )}
            />

            <RangeSelectItem
              label="მინ. ფასი"
              values={PREDEFINED_PRICES}
              onClick={(price) => {
                setValue("minPrice", price);
              }}
              symbol="₾"
            />
          </div>
          <div>
            <Controller
              control={control}
              name="maxPrice"
              render={({ field, fieldState }) => (
                <Input
                  type="number"
                  placeholder="მდე"
                  defaultValue={Number(maxPrice)}
                  value={field.value ?? undefined}
                  onChange={(event) => {
                    const value = event.target.value;
                    field.onChange(value ? Number(value) : undefined);
                  }}
                  endAdornment={<p className="pr-2">₾</p>}
                  className="w-full"
                  error={Boolean(fieldState.error)}
                />
              )}
            />

            <RangeSelectItem
              label="მაქს. ფასი"
              values={PREDEFINED_PRICES}
              onClick={(price) => {
                setValue("maxPrice", price);
              }}
              symbol="₾"
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
