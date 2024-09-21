"use client";

import { IconPlus } from "@/assets/icons";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { useBoolean } from "@/lib/hooks";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInput, MAX_FILE_SIZE } from "../add-listing-form";
import { UploadFileInput } from "../upload-file-input";
import { HelperText } from "../helper-text";
import { addAgent } from "@/api/agents";
import toast from "react-hot-toast";

const AddAgentFormSchema = z.object({
  name: z.string().min(2),
  surname: z.string().min(2),
  email: z
    .string()
    .email()
    .refine((value) => value.endsWith("@redberry.ge"), {
      message: "ელ-ფოსტა უნდა მთავრდებოდეს @redberry.ge-თ",
    }),
  avatar: z.instanceof(File, {
    message: "გთხოვთ აირჩიოთ ფაილი",
  }),
  phone: z.string().regex(/^5\d{8}$/, {
    message: "ტელ-ნომერი უნდა იყოს ფორმატის 5XXXXXXXX",
  }),
});

export type AddAgentFormValues = z.infer<typeof AddAgentFormSchema>;

export const AddAgentButton = () => {
  const isOpen = useBoolean();

  const { control, handleSubmit, setError, clearErrors } =
    useForm<AddAgentFormValues>({
      defaultValues: {
        name: "",
        surname: "",
        email: "",
        avatar: undefined,
        phone: "",
      },
      resolver: zodResolver(AddAgentFormSchema),
    });

  return (
    <Dialog
      open={isOpen.isTrue}
      onOpenChange={(value) => {
        isOpen.setValue(value);
      }}
    >
      <Button
        variant="destructive"
        className="h-[47px] w-[230px]"
        onClick={isOpen.setTrue}
      >
        <IconPlus />
        აგენტის დამატება
      </Button>
      <DialogContent className="p-16 w-full max-w-[1000px]">
        <p className="text-center text-[32px] font-semibold text-blue-charcoal-700">
          აგენტის დამატება
        </p>

        <form
          onSubmit={handleSubmit(async (values) => {
            try {
              await addAgent(values);
              toast.success("აგენტი დამატებულია");
              isOpen.setFalse();
            } catch (e) {
              toast.error("აგენტის დამატება ვერ მოხერხდა");
            }
          })}
        >
          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => {
                return (
                  <CustomInput
                    label="სახელი *"
                    value={field.value ?? undefined}
                    onChange={(event) => {
                      const value = event.target.value;
                      field.onChange(value ?? null);
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
              name="surname"
              render={({ field, fieldState }) => {
                return (
                  <CustomInput
                    label="გვარი"
                    value={field.value ?? undefined}
                    onChange={(event) => {
                      const value = event.target.value;
                      field.onChange(value ?? null);
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
              name="email"
              render={({ field, fieldState }) => {
                return (
                  <CustomInput
                    label="ელ-ფოსტა *"
                    value={field.value ?? undefined}
                    onChange={(event) => {
                      const value = event.target.value;
                      field.onChange(value ?? null);
                    }}
                    error={Boolean(fieldState.error)}
                    isDirty={fieldState.isDirty}
                    helperText="გამოიყენეთ @redberry.ge ფოსტა"
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field, fieldState }) => {
                return (
                  <CustomInput
                    label="ტელეფონის ნომერი"
                    type="number"
                    value={field.value ?? undefined}
                    onChange={(event) => {
                      const value = event.target.value;
                      field.onChange(value ?? null);
                    }}
                    error={Boolean(fieldState.error)}
                    isDirty={fieldState.isDirty}
                    helperText={fieldState.error?.message ?? "მხოლოდ რიცხვები"}
                  />
                );
              }}
            />
          </div>
          <Controller
            control={control}
            name="avatar"
            render={({ field, fieldState }) => {
              return (
                <div>
                  <UploadFileInput
                    value={field.value}
                    onChange={(file) => {
                      if (file && file?.size > MAX_FILE_SIZE) {
                        setError("avatar", {
                          message: "ფოტო არ უნდა აღებმატებოდეს 1mb-ს ზომაში",
                        });
                        return;
                      }

                      clearErrors("avatar");
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

          <div className="flex items-center gap-5 justify-end mt-16">
            <Button variant="destructive" onClick={isOpen.setFalse}>
              გაუქმება
            </Button>
            <Button type="submit">დაამატე აგენტი</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
