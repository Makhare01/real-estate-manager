import { ComponentProps } from "react";

export const IconArrow = ({
  direction,
  ...props
}: ComponentProps<"svg"> & {
  direction?: "right" | "left" | "up" | "down";
}) => {
  let rotateValue;

  switch (direction) {
    case "up": {
      rotateValue = "rotate(0deg)";
      break;
    }
    case "down": {
      rotateValue = "rotate(180deg)";
      break;
    }
    case "left": {
      rotateValue = "rotate(-90deg)";
      break;
    }
    case "right": {
      rotateValue = "rotate(90deg)";
      break;
    }
  }

  return (
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      {...props}
      style={{ transform: rotateValue, ...props.style }}
    >
      <path
        d="M10.0876 9.66215C10.3154 9.88996 10.6847 9.88996 10.9125 9.66215C11.1403 9.43435 11.1403 9.065 10.9125 8.8372L7.41252 5.3372C7.18471 5.10939 6.81537 5.10939 6.58756 5.3372L3.08756 8.8372C2.85976 9.065 2.85976 9.43435 3.08756 9.66215C3.31537 9.88996 3.68471 9.88996 3.91252 9.66215L7.00004 6.57463L10.0876 9.66215Z"
        fill="currentColor"
      />
    </svg>
  );
};
