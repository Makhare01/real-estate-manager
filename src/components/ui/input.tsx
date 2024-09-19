import * as React from "react";

import { cn } from "@/lib/utils";
import { HelperText, HelperTextState } from "../helper-text";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  endAdornment?: React.ReactNode;
  error?: boolean;
  helperText?: string;
  helperTextState?: HelperTextState;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      endAdornment,
      error,
      helperText,
      helperTextState,
      ...props
    },
    ref
  ) => {
    return (
      <div>
        <div className="flex items-stretch">
          <input
            type={type}
            className={cn(
              "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              {
                "border-r-0 rounded-r-none pr-0": endAdornment,
                "border-pomegranate-500": error,
              },
              className
            )}
            ref={ref}
            {...props}
          />
          {endAdornment && (
            <div
              className={cn(
                "border border-input border-l-0 rounded-r-md px-2 flex items-center justify-center",
                {
                  "border-pomegranate-500": error,
                }
              )}
            >
              {endAdornment}
            </div>
          )}
        </div>
        {helperText && (
          <HelperText
            state={helperTextState ?? "error"}
            text={helperText}
            className="mt-2"
          />
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
