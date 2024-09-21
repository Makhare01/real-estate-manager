import { IconPlusCircle, IconTrashBin } from "@/assets/icons";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  value?: File;
  onChange: (value?: File) => void;
  error?: boolean;
};

export const UploadFileInput = ({ value, onChange, error }: Props) => {
  return (
    <div>
      <p className="text-sm font-semibold text-blue-charcoal-800 mb-2 mt-5">
        ატვირთეთ ფოტო *
      </p>

      <Input
        type="file"
        id="file-image"
        className="hidden"
        accept="image/*"
        onChange={(event) => {
          const files = event.target.files;
          const file = files && files[0];

          if (file) {
            onChange(file);
          }
        }}
      />

      {value ? (
        <div className="w-full h-[120px]  border border-input border-dashed flex items-center justify-center rounded-lg">
          <div className="relative w-[90px] p-3">
            <Image
              src={URL.createObjectURL(value)}
              alt="uploaded image"
              className="rounded-sm"
              width={0}
              height={0}
              layout="responsive"
            />

            <IconTrashBin
              className="absolute bottom-1.5 right-1.5 cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                onChange(undefined);
              }}
            />
          </div>
        </div>
      ) : (
        <Label
          htmlFor="file-image"
          className={cn(
            "w-full h-[120px] border border-input border-dashed flex items-center justify-center rounded-lg",
            {
              "border-pomegranate-500": error,
            }
          )}
        >
          <IconPlusCircle
            className={cn("text-blue-charcoal-700", {
              "text-pomegranate-500": error,
            })}
          />
        </Label>
      )}
    </div>
  );
};
