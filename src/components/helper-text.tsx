import { IconCheck } from "@/assets/icons";
import { cn } from "@/lib/utils";

export type HelperTextState = "default" | "error" | "success";

type Props = {
  state: HelperTextState;
  text: string;
  className?: string;
};

export const HelperText = ({ state, text, className }: Props) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <IconCheck
        className={cn("mb-1 min-w-[10px]", {
          "text-apple-800": state === "success",
          "text-pomegranate-500": state === "error",
        })}
      />
      <p
        className={cn("text-sm", {
          "text-apple-800": state === "success",
          "text-pomegranate-500": state === "error",
        })}
      >
        {text}
      </p>
    </div>
  );
};
