import { ComponentProps } from "react";

export const IconClose = (props: ComponentProps<"svg">) => {
  return (
    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" {...props}>
      <path
        d="M10.5 4L3.5 11"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 4L10.5 11"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
