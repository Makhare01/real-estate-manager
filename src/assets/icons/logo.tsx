import { ComponentProps } from "react";

export const IconLogo = (props: ComponentProps<"svg">) => {
  return (
    <svg width="150" height="24" viewBox="0 0 150 24" fill="none" {...props}>
      <rect width="150" height="24" fill="url(#pattern0_46313_147)" />
      <defs>
        <pattern
          id="pattern0_46313_147"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use transform="matrix(0.000244141 0 0 0.00152588 0 -0.0065918)" />
        </pattern>
        <image id="image0_46313_147" width="4096" height="664" />
      </defs>
    </svg>
  );
};
