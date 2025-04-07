import React, { FC } from "react";

interface CheckIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
}

export const CheckIcon: FC<CheckIconProps> = ({
  width = "20",
  height = "20",
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.875 5.62537L8.125 14.375L3.75 10.0004"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
