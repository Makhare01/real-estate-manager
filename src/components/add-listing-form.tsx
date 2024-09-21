"use client";

import { Agents } from "@/api/agents";
import { addListing, Regions } from "@/api/listing";
import { Cities } from "@/api/locations";
import { HelperText } from "@/components/helper-text";
import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UploadFileInput } from "@/components/upload-file-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export const MAX_FILE_SIZE = 1 * 1024 * 1024;

export const CustomInput = ({
  label,
  helperText,
  isDirty,
  ...inputProps
}: InputProps & {
  label: string;
  helperText: string;
  isDirty: boolean;
}) => {
  const helperTextState = inputProps.error
    ? "error"
    : isDirty
    ? "success"
    : "default";

  return (
    <div>
      <p className="text-sm font-semibold text-blue-charcoal-800 mb-2">
        {label}
      </p>
      <Input {...inputProps} />

      <HelperText state={helperTextState} text={helperText} className="mt-2" />
    </div>
  );
};

const TAddListingFormSchema = z.object({
  is_rental: z.number(),
  address: z.string().min(2),
  zip_code: z.number().min(1),
  region_id: z.number().int(),
  city_id: z.number().int(),
  price: z.number().min(1),
  area: z.number().min(1),
  bedrooms: z.number().min(1),
  description: z.string().min(5),
  image: z.instanceof(File, {
    message: "გთხოვთ აირჩიოთ ფაილი",
  }),
  agent_id: z.number().int().nullable(),
});

export type AddListingFormValues = z.infer<typeof TAddListingFormSchema>;

type Props = {
  cities: Cities;
  regions: Regions;
  agents: Agents;
};

export const AddListingForm = ({ cities, regions, agents }: Props) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const onValueChange = (key: string, value: string | null) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  };

  const is_rental = searchParams.get("is_rental");
  const address = searchParams.get("address");
  const zip_code = searchParams.get("zip_code");
  const default_region_id = searchParams.get("region_id");
  const city_id = searchParams.get("city_id");
  const price = searchParams.get("price");
  const area = searchParams.get("area");
  const bedrooms = searchParams.get("bedrooms");
  const description = searchParams.get("description");
  const agent_id = searchParams.get("agent_id");

  const { control, handleSubmit, setError, clearErrors, watch } =
    useForm<AddListingFormValues>({
      defaultValues: {
        is_rental: is_rental ? Number(is_rental) : 0,
        address: address ?? "",
        zip_code: zip_code ? Number(zip_code) : undefined,
        region_id: default_region_id ? Number(default_region_id) : undefined,
        city_id: city_id ? Number(city_id) : undefined,
        price: price ? Number(price) : undefined,
        area: area ? Number(area) : undefined,
        bedrooms: bedrooms ? Number(bedrooms) : undefined,
        description: description ?? "",
        image: undefined,
        agent_id: agent_id ? Number(agent_id) : undefined,
      },
      resolver: zodResolver(TAddListingFormSchema),
    });

  const region_id = watch("region_id");

  return (
    <div className="w-full flex items-start justify-center">
      <form
        className="w-full max-w-[790px]"
        onSubmit={handleSubmit(async (values) => {
          try {
            const realEstate = await addListing(values);
            router.push(`/real-estate/${realEstate.id}`);
            toast.success("ლისტინგი დამატებულია");
          } catch (e) {
            toast.error("Failed to create real estate");
          }
        })}
      >
        <p className="text-[32px] font-semibold text-blue-charcoal-800 text-center mb-5">
          ლისტინგის დამატება
        </p>

        <div className="w-full">
          <p className="text-base text-shark mb-3 font-semibold uppercase font-helvetica">
            ᲒᲐᲠᲘᲒᲔᲑᲘᲡ ᲢᲘᲞᲘ
          </p>
          <Controller
            control={control}
            name="is_rental"
            render={({ field }) => {
              return (
                <RadioGroup
                  defaultValue={String(field.value)}
                  className="flex gap-16"
                  onValueChange={(value) => {
                    field.onChange(Number(value));
                    onValueChange("is_rental", value);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="option-one" />
                    <Label
                      htmlFor="option-one"
                      className="text-sm text-blue-charcoal-800"
                    >
                      იყიდება
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="option-two" />
                    <Label
                      htmlFor="option-two"
                      className="text-sm text-blue-charcoal-800"
                    >
                      ქირავდება
                    </Label>
                  </div>
                </RadioGroup>
              );
            }}
          />
        </div>

        <div className="w-full mt-20">
          <p className="text-base text-shark mb-5 font-semibold uppercase font-helvetica">
            ᲛᲓᲔᲑᲐᲠᲔᲝᲑᲐ
          </p>

          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={control}
              name="address"
              render={({ field, fieldState }) => {
                return (
                  <CustomInput
                    label="მისამართი *"
                    value={field.value ?? undefined}
                    onChange={(event) => {
                      const value = event.target.value;
                      field.onChange(value ?? null);
                      onValueChange("address", value ?? null);
                    }}
                    error={Boolean(fieldState.error)}
                    isDirty={fieldState.isDirty}
                    helperText="მინიმუმ ორი სიმბოლო"
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="zip_code"
              render={({ field, fieldState }) => {
                return (
                  <CustomInput
                    label="საფოსტო ინდექსი *"
                    type="number"
                    value={field.value ?? undefined}
                    onChange={(event) => {
                      const value = event.target.value;
                      field.onChange(value ? Number(value) : undefined);
                      onValueChange("zip_code", value ?? null);
                    }}
                    error={Boolean(fieldState.error)}
                    isDirty={fieldState.isDirty}
                    helperText="მხოლოდ რიცხვები"
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="region_id"
              render={({ field, fieldState }) => {
                return (
                  <div>
                    <p className="text-sm font-semibold text-blue-charcoal-800 mb-2">
                      რეგიონი
                    </p>
                    <Select
                      value={field.value ? String(field.value) : undefined}
                      onValueChange={(value) => {
                        field.onChange(Number(value));
                        onValueChange("region_id", value);
                      }}
                    >
                      <SelectTrigger className="w-full h-[42px]">
                        <SelectValue placeholder="რეგიონი" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {regions.map((region) => (
                          <SelectItem key={region.id} value={String(region.id)}>
                            {region.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {fieldState.error && (
                      <HelperText
                        state="error"
                        text="გთხოვთ აირჩიოთ ქალაქი"
                        className="mt-2"
                      />
                    )}
                  </div>
                );
              }}
            />

            <Controller
              control={control}
              name="city_id"
              render={({ field, fieldState }) => {
                return (
                  <div>
                    <p className="text-sm font-semibold text-blue-charcoal-800 mb-2">
                      ქალაქი
                    </p>
                    <Select
                      value={field.value ? String(field.value) : undefined}
                      onValueChange={(value) => {
                        field.onChange(Number(value));
                        onValueChange("city_id", value);
                      }}
                      defaultValue={undefined}
                      disabled={region_id === undefined}
                    >
                      <SelectTrigger
                        className="w-full h-[42px]"
                        error={Boolean(fieldState.error)}
                      >
                        <SelectValue placeholder="ქალაქი" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {cities
                          .filter((city) => city.region_id === region_id)
                          .map((filteredCity) => (
                            <SelectItem
                              key={filteredCity.id}
                              value={String(filteredCity.id)}
                            >
                              {filteredCity.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>

                    {fieldState.error && (
                      <HelperText
                        state="error"
                        text="გთხოვთ აირჩიოთ ქალაქი"
                        className="mt-2"
                      />
                    )}
                  </div>
                );
              }}
            />
          </div>
        </div>

        <div className="w-full mt-20">
          <p className="text-base text-shark mb-5 font-semibold uppercase font-helvetica">
            ᲑᲘᲜᲘᲡ ᲓᲔᲢᲐᲚᲔᲑᲘ
          </p>

          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={control}
              name="price"
              render={({ field, fieldState }) => {
                return (
                  <CustomInput
                    label="ფასი"
                    type="number"
                    value={field.value ?? undefined}
                    onChange={(event) => {
                      const value = event.target.value;
                      field.onChange(value ? Number(value) : undefined);
                      onValueChange("price", value ?? null);
                    }}
                    error={Boolean(fieldState.error)}
                    isDirty={fieldState.isDirty}
                    helperText="მხოლოდ რიცხვები"
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="area"
              render={({ field, fieldState }) => {
                return (
                  <CustomInput
                    label="ფართობი"
                    type="number"
                    value={field.value ?? undefined}
                    onChange={(event) => {
                      const value = event.target.value;
                      field.onChange(value ? Number(value) : undefined);
                      onValueChange("area", value ?? null);
                    }}
                    error={Boolean(fieldState.error)}
                    isDirty={fieldState.isDirty}
                    helperText="მხოლოდ რიცხვები"
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="bedrooms"
              render={({ field, fieldState }) => {
                return (
                  <CustomInput
                    label="საძინებლების რაოდენობა *"
                    type="number"
                    value={field.value}
                    onChange={(event) => {
                      const value = event.target.value;
                      field.onChange(value ? Number(value) : undefined);
                      onValueChange("bedrooms", value ?? null);
                    }}
                    error={Boolean(fieldState.error)}
                    isDirty={fieldState.isDirty}
                    helperText="მხოლოდ რიცხვები"
                  />
                );
              }}
            />
          </div>

          <Controller
            control={control}
            name="description"
            render={({ field, fieldState }) => {
              const helperTextState = fieldState.error
                ? "error"
                : fieldState.isDirty
                ? "success"
                : "default";

              return (
                <div className="mt-5">
                  <p className="text-sm font-semibold text-blue-charcoal-800 mb-2">
                    აღწერა *
                  </p>
                  <Textarea
                    value={field.value}
                    onChange={(event) => {
                      const value = event.target.value;
                      field.onChange(value);
                      onValueChange("description", value ?? null);
                    }}
                    rows={5}
                    error={Boolean(fieldState.error)}
                  />

                  <HelperText
                    state={helperTextState}
                    text="მინიმუმ ხუთი სიტყვა"
                    className="mt-2"
                  />
                </div>
              );
            }}
          />

          <Controller
            control={control}
            name="image"
            render={({ field, fieldState }) => {
              return (
                <div>
                  <UploadFileInput
                    value={field.value}
                    onChange={(file) => {
                      if (file && file?.size > MAX_FILE_SIZE) {
                        setError("image", {
                          message: "ფოტო არ უნდა აღებმატებოდეს 1mb-ს ზომაში",
                        });
                        return;
                      }

                      clearErrors("image");
                      field.onChange(file);
                    }}
                    error={Boolean(fieldState.error)}
                  />

                  {fieldState.error?.message && (
                    <HelperText
                      state="error"
                      text={fieldState.error.message}
                      className="mt-2"
                    />
                  )}
                </div>
              );
            }}
          />
        </div>

        <div className="w-full mt-20">
          <p className="text-base text-shark mb-5 font-semibold uppercase font-helvetica">
            ᲐᲒᲔᲜᲢᲘ
          </p>

          <Controller
            control={control}
            name="agent_id"
            render={({ field, fieldState }) => {
              return (
                <div className="w-1/2 pr-4">
                  <p className="text-sm font-semibold text-blue-charcoal-800 mb-2">
                    აირჩიე
                  </p>
                  <Select
                    value={field.value ? String(field.value) : undefined}
                    onValueChange={(value) => {
                      field.onChange(Number(value));
                      onValueChange("agent_id", value);
                    }}
                  >
                    <SelectTrigger
                      className="w-full h-[42px]"
                      error={Boolean(fieldState.error)}
                    >
                      <SelectValue placeholder="აგენტი" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {agents.map((agent) => (
                        <SelectItem key={agent.id} value={String(agent.id)}>
                          {agent.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {fieldState.error && (
                    <HelperText
                      state="error"
                      text="გთხოვთ აირჩიოთ აგენტი"
                      className="mt-2"
                    />
                  )}
                </div>
              );
            }}
          />
        </div>

        <div className="flex items-center justify-end gap-3 mt-10">
          <Button variant="destructive">გაუქმება</Button>

          <Button type="submit">დაამატე ლისტინგი</Button>
        </div>
      </form>
    </div>
  );
};
